import * as acorn from 'acorn'
import * as escodegen from 'escodegen';
import * as path from 'path';
import * as fs from 'fs';
import { getDirectoryContent, cwd } from '../../tool'
import { Duplex } from 'stream';
import fromatMethods from './format-data'
var Terser = require("terser");
const browserify = require('browserify');
// declare const browserify: any;
import { getAssociation } from '../../server'
const Final_System_Attr: any = ['attr','data','event','catch'];
let modulesMap: Map<string, string> = new Map();
const wtsConfig = (function(){
	try{
		return require(path.join(process.cwd(), 'wts.config.js'))
	}catch(e){
		return {};
	}
}())
let AppConfigComponent: any = [];
let  Final_System_attrData: Map<string, string[]> = new Map([
	['Map',['markers','covers','polyline','circles','controls','includePoints','polygons']],
	// ...wtsConfig.attrData
])
const ComponentSetMethod: string[] = ['$$externalClasses','$$observers','$$relations','$$behaviors','$$options'];
const FormatMethod: Map<string,Array<string|null>> = new Map([
	["App",null],
	["Page",null],
	["Component",[...ComponentSetMethod,'lifetimes','properties','attached','detached','created','attached','ready','moved','detached','error','pageLifetimes','show','hide','resize']],
])
const FormatMethodMerge: any = {
	Component: {
		show: 'pageLifetimes',
		hide: 'pageLifetimes',
		resize: 'pageLifetimes',
		attached: 'lifetimes',
		detached: 'lifetimes'
	}
}
const DecoratorSort: Map<string,string[]> = new Map([
	["System", ['Prop']],
	["Browser", []]
])

const MainFloder: Set<string> = getDirectoryContent(path.join(cwd,'src'));

function createStream(): Duplex{
	var buf: any[] = [];
	class TenpDuplex extends Duplex {
		constructor(options: any){
			super(options);
		}
		_write(chunk: Buffer, encoding: string, callback: Function){
			buf.push(chunk);
			callback();
		}
		_read(size: any){
			this.push(buf);
			this.push(null);
		}
		clear(){
			buf = [];
		}
	}
	const dp = new TenpDuplex({
		readableObjectMode: true
	})
	return dp;
}

function buildModules(str: string, modulesLibName: string, libName: string){
	const tenpStream: Duplex = createStream();
	var b = browserify();
	tenpStream.write(`${str}TenpModule.exports = ${libName};`)
	b.add(tenpStream);
	let buff: string = '';
	const tt = b.bundle();
	tt.on('data', (data: Buffer,v: any) => {
		buff += data
	})
	tt.on('end', () => {
		var content = 'const TenpModule = module;' + buff;
        var result  = Terser.minify(content);
        if(result.error){
            console.error(' $UglifyJS error ',result.error)
        }else{
            content = result.code;
        }
		fs.writeFileSync(path.join(cwd,'./dist/tenp_modules/'+modulesLibName), content)
		tenpStream.destroy();
	})
	
	modulesMap.set(libName, modulesLibName);

}


function parse(content: string, options: any){
	if(!content) return {
		tree: [],
		modules: [],
		page: {
			data: {},
			xml: [],
			config: {},
			decorator: [],
			type: ''
		}
	}
	const parseContent: any = acorn.parse(content);

	let packageName = '';

	const MainFunction = getAssociation(path.join(options.srcDirectoryUrl, options.fileNoSuffixName)+'.ts');
	
	if(MainFunction){
		packageName = MainFunction.name;
	}

	let tree: any = [];
	if(packageName) tree.push({ type: 'ExpressionStatement',value: 'const '+packageName+' = {};' })
	let modules: any = [];
	let page: any = {
			data: {},
			xml: [],
			config: {},
			decorator: [],
			type: ''};
	parseContent.body.forEach((data: any) => {
		if(data.type == 'ExpressionStatement'){
			if(data.expression &&  data.expression.callee && data.expression.callee.name == 'require'){
				modules.push({ type: 'module', value: data.expression.arguments[0].value })
			}else
				tree.push({ type: 'ExpressionStatement', value: escodegen.generate(data) })
		}else if(data.type == 'VariableDeclaration'){
			const declaration = data.declarations[0];
			if(declaration.init && declaration.init.type == 'CallExpression' && declaration.init.callee && declaration.init.callee.name == 'require'){
				modules.push({ type: 'module', value: declaration.init.arguments[0].value, key: declaration.id.name })
			}else if(declaration.id.name == packageName){
				tree.push({ type: 'null' })
				//读取class
				page = readPage(declaration.init.callee.body.body,packageName)

			}else
				tree.push({ type: 'ExpressionStatement', value: escodegen.generate(data) })
		}else
			tree.push({ type: 'ExpressionStatement', value: escodegen.generate(data) })
	})
	
	return {tree,modules,page};
}
const readPage = (body: any,packageName:string) => {
	let data: any = {};
	let methods: any = {};
	let config: any = {};
	let xml: any = []
	let decorator: any = [];
	let type: string = '';
	body.forEach((value: any) => {
		if(value.type == 'FunctionDeclaration' && value.id.name == packageName){
			value.body.body.forEach((_value2: any) => {
				if(_value2.type == 'ExpressionStatement'){
					let name = _value2.expression.left.property.name;
					if(ComponentSetMethod.indexOf(name) != -1){
						methods[name] = _value2.expression.right.raw ? _value2.expression.right.raw :  escodegen.generate(_value2.expression.right)
					}else{
						data[name] = _value2.expression.right.raw || escodegen.generate(_value2.expression.right);
					}
				}
					
			})
		}else if(value.type == 'ExpressionStatement'&& value.expression && value.expression.operator == '='){
			if(value.expression.left && value.expression.left.object){

				// fromatMethods(value.expression.right, Object.keys(data))
				methods[value.expression.left.property.name] = escodegen.generate(value.expression.right)
				
			}else if (value.expression.left && value.expression.left.name == packageName) {

				let _body = value.expression.right.arguments[0].elements[0].arguments[0].properties;
				type = value.expression.right.arguments[0].elements[0].callee.property.name;
				_body.forEach((_value2: any) => {
					if(_value2.key.name == 'render'){
						readRenderTransTemplate(methods, _value2.value.elements, xml);
					}else if(_value2.value.elements || _value2.value.properties){
						config[_value2.key.name] = new Function('return '+escodegen.generate(_value2.value))()
					}else{
						config[_value2.key.name] = _value2.value.value
					}
				})
			}
		}else if(value.type == 'ExpressionStatement' && value.expression.callee.name == '__decorate'){
			const __decorator: any = {};
			const first = value.expression.arguments[0];
			const method = value.expression.arguments[2].value;
			__decorator.methodName = method;
			__decorator.run = escodegen.generate(first.elements[0]);
			__decorator.name = __decorator.run.match(/\.([A-z\d]+?)\(/)[1]
			__decorator.type = first.elements[1].arguments[1].name
			decorator.push(__decorator)
		}
	})
	return { data,methods, config, xml, decorator, type }
}

function readRenderTransTemplate(methods: any, render: any = [], treeArray: any = []){
	
	render.forEach((data: any) => {
			if(!data.callee){
				return treeArray.push(data.value);
			}
			let {name: label} = data.callee.property ? data.callee.property : data.callee;
			let  _treeArray: any = { __labelName: label };
			
            data.arguments[0] && data.arguments[0].properties.forEach((_d1: any) => {
                
                if(_d1.key.name != "child"){
					
					if(Final_System_attrData.get(label)&&Final_System_attrData.get(label).indexOf(_d1.key.name) != -1){
						_treeArray[_d1.key.name] = '{{'+escodegen.generate(_d1.value).replace(/[\r\n]/g,'')+'}}';
					}else if(_d1.value.raw){
                        _treeArray[_d1.key.name||_d1.key.value] = _d1.value.value;
                    }else if(Final_System_Attr.indexOf(_d1.key.name) != -1){
                        let __data: any = {};
                        _d1.value.properties.forEach((v: any) => {

							let value = v.value.value;
                        	if(value == void 0){
								const name = '_private_'+Math.ceil((Math.random() as number)*1000000);
								if(v.value.params.length >= 1){
									const data = v.value.params.splice(0,1);
									v.value.body.body.splice(0,0, {
										"type": "VariableDeclaration",
										"start": 50,
										"end": 67,
										"declarations": [
										  {
											"type": "VariableDeclarator",
											"start": 54,
											"end": 66,
											"id": {
											  "type": "Identifier",
											  "start": 54,
											  "end": 59,
											  "name": data[0].name
											},
											"init": {
											  "type": "ThisExpression",
											  "start": 62,
											  "end": 66
											}
										  }
										],
										"kind": "var"
									  })
								}
								methods[name] = escodegen.generate(v.value);
								
								value = name;
                        	}
                            __data[v.key.name||v.key.value] = value;
                        })
                        _treeArray[_d1.key.name] = __data;
                    }else{
				
						
					}
                    
                }else{
                    
                    let childTree: any = [];
                    _treeArray.child = childTree;
                    readRenderTransTemplate(methods, _d1.value.elements, childTree);
                }
            })
            treeArray.push(_treeArray)
        })
	
}
const wx_key = ['if','for','key','forIndex','forItem','else','elif'];
const system_key = ['attr','data','event','catch','child'];

//将标签转为小写(TestLabel=>test-lable)
function FormatLabel(name: string){
    return name.replace(/[A-Z]/g, function(a: string,b: number,c: string,d: string){ return (b==0?'':'-')+a.toLocaleLowerCase() })
}
//将render转为wxml
function renderTransTemplate(render: any[]){
	let wxml = '';
	function qE(str: string): string{
		try {
			return str.replace(/"/g,'\\"')	
		} catch (error) {
			return str;
		}
		
	}
	// console.log(JSON.stringify(render))
    function createWxml(element: any[]){
		element.forEach(value => {
			if(!value.__labelName){
				wxml += value;
				return;
			}

			const label = FormatLabel(value.__labelName);
			delete value.__labelName;

			wxml += '<'+label;
			const attr = value.attr || {};
			const data = value.data || {};
			const event = value.event || {};
			const catchs = value.catch || {};

			for(let key in attr){
				// wxml += ' '+key+'="'+attr[key]+'"'
				wxml += ' data-'+key+'="'+qE(attr[key])+'"'
			}
			for(let key in data){
				wxml += ' '+FormatLabel(key)+'="{{'+qE(data[key])+'}}"'
			}
			for(let key in event){
				wxml += ' bind'+key+'="'+event[key]+'"'
			}
			for(let key in catchs){
				wxml += ' catch'+key+'="'+catchs[key]+'"'
			}
			for(let key in value){
			
				if(wx_key.indexOf(key) != -1){
					if(key == 'for'||key == 'if'||key=='elif') wxml += ' wx:'+key+'="{{'+qE(value[key])+'}}"';
					else wxml += ' wx:'+FormatLabel(key)+'="'+value[key]+'"';
				} else if(system_key.indexOf(key) == -1){
					wxml += ' '+FormatLabel(key)+'="'+qE(value[key])+'"'
				}
			}
		
			wxml += '>';
			if(value.text) wxml += value.text;
			if(value.child){
				createWxml(value.child)
			}

			wxml += '</'+label+'>'
			

		})

    };
	createWxml(render);
	// console.log(wxml)
    return wxml;
}
//将方法中的this.xx 转换成this.setData({xx:xx})
function _formatMethodData(method: any, data: any){
	if(!method.replace) return method
	
	const thisMap: string[] = ['this'];

	method.replace(/[var|let] (.+?) = this;/g, function(a: string,b: string){ thisMap.push(b) })

	
	return method.replace(/([$a-zA-Z0-9_]+?)\.(.+?)[.|)|,|\[\]|(|\s|;]/g, function(a: string,b: string,c: string){ 
	
			if(thisMap.indexOf(b) == -1) return a;
			if(data.indexOf(c) != -1) return `${b}.data.${c}`+a.substr(-1);
			else return a 
		  })
		  .replace(/\b([a-z0-9]+?)\.(.+?)\.push\(/, function(a: string,b: string,c: string){ 
			if(thisMap.indexOf(b) == -1) return a;
		  	if(data.indexOf(c.split('.')[1]) != -1){
		  		 return `${b}.${c}.push(${b},`;
		  	}
		  	else return a 
		  })

	let b: string = null;
	return method.replace(/\bthis.(.+?)[.|)|,|\[\]|(|\s|;]/g, (a: string, b: string) => {
            if(data.indexOf(b) == -1)
                return a;
            else{
                return 'this.data.'+b+a.substr(-1)
            }
        }).replace(/var[\s](.+?) =[\s]this\b/, (a: string,_b: string) => {
            b = _b;
            return a;
        }).replace(new RegExp('\\b'+b+'.(.+?)\\b','g'), (a: string,_b: string) => {
            if(data.indexOf(_b) != -1){
                return `${b}.data.${_b}`;
            }else{ return a; }
        }).replace(new RegExp('\\b'+b+'\\.(.+?)\\.push\\(','g'), (a: string, _b: string) => {
        	console.log('aaaaaaaaaaaaaaaaaadwad', _b.split('.')[1])
        	if(data.indexOf(_b.split('.')[1]) != -1){
                return `${b}.${_b}.push("dawd",`;
            }else{ return a; }
        })
	

}
//FormatMethodMerge
function formatMethodsPosition(methods: any, page: any, fileName: string){

	// _formatMethodData(methods, page)
	let properties = page.methods ? Object.keys(page.methods.properties||{}) : [];
	const data = Object.keys(page.data).concat(properties);
	let rootParam: any = FormatMethod.get(page.type);
	
	const classification = FormatMethodMerge[page.type];
	let __me: any = {};
	for(let key in methods){
		
		/**
			有可能ast不存在expression或者更换成了其他属性，
		*/
		const method = _formatMethodData(methods[key],data)//.expression ?  _formatMethodData(methods[key], data) : methods[key]
		
		if(rootParam && rootParam.indexOf(key) == -1){
			const own: string = classification[key];
			const isOwn: string = own ? own : 'methods'
			if( !__me[isOwn] ) __me[isOwn] = {};
			__me[isOwn][key] = method
		}else{
			
			__me[key.replace(/\$\$/,'')] = method;
		}
	}
	let str: string[] = [];
	for(let key in __me){
		if(typeof(__me[key]) == 'string'){
			str.push(`${key}:${__me[key]}`)
		}else{
			let __s: string = `${key}:{`;
			for(let key2 in __me[key]){
				__s += `${key2}: ${__me[key][key2]},`
			}
			__s += '}'
			str.push(__s);
		}
	}
	return str.join(',')
}
function FormatDecorator(page: any, modules: any, options: any){
	page.decorator.forEach((data: any) => {

		if(DecoratorSort.get('Browser')[data.name]){
			//浏览器级别
		}else{
			//系统级别
			// console.log(require('@tenp/wx'))
			const requireName = data.run.split('.')[0];
			const lib = modules.find((v: any) => v.key == requireName);

			if(!lib){
				throw new Error('为寻找到${lib.key}')
			}
			if(lib.value[0] != '.' && lib.value[0] != '/'){
				const runTemplate = data.run.replace(/\(((.+?)|)\)/, function(a: any,b:any){return '_Analysis(page, {...data, data: '+(b||undefined)+'})'})
				const params = {
					page,
					modules,
					...options
				}
				new Function('page','data','require', `const ${requireName} = require('${lib.value}');return ${runTemplate}`)(params, data,require)
			}
			
		}
	})
}
function FormatData(data: any){
	let str: string[] = [];
	for(let key in data){
		str.push(`${key}: ${data[key]}`)
	}
	return `data:{${str.join(',')}},`
}
function FormatRequire(modules: any, page: any, fileName: string, buildDirectoryUrl: string, usingComponents: any = {}){
	let str: string = '';
	function createInclude(data: any){

		const urlMaps = data.value.split('/');
		let reuqireUrl: string = '';
		if (urlMaps[0][0] == '.') {
            reuqireUrl = urlMaps.join('/');
        }else{
            var f = fileName.replace(path.join(cwd, 'dist/'), '').split('\\');
            f.shift();
            if(MainFloder.has(urlMaps[0])){
                reuqireUrl = f.map(function (v) { return '../'; }).join('') + data.value;    
            }else{
                var modulesLibName = urlMaps[0] + '_tenp_modules.js';
                if(!modulesMap.get(data.key)){
                    buildModules("const " + data.key + " = require(\"" + data.value + "\");", modulesLibName, data.key);
                }
                reuqireUrl = f.map(function (v) { return '../'; }).join('')+'tenp_modules/'+modulesLibName
            }
            
        }
	
		if(reuqireUrl[0] != '.') reuqireUrl =  './' + reuqireUrl;
		
		if(data.key) return `const ${data.key} = require('${reuqireUrl}');`
		else return `require('${reuqireUrl}');`;
	}

	modules.forEach((data: any) => {
		
		if(usingComponents.indexOf(data.value.split('/').pop()) != -1) return;
		if(data.value.substr(0,8) == '@tenp/wx'){
			if(page.type == 'App'){
				str += `const tenp = require("./method.js");const ${data.key} = {default: tenp};wx.tenp = ${data.key}.default;` 
			}else{
				str += `const ${data.key} = { default: wx.tenp };`
			}
		}else{
			str += createInclude(data);
		}
	})
	return str;
}

export default (content: string,options:any) => {

	let jsTemplate: string = '';
	let cssTemplate: string = '';
	let htmlTemplate: string = '';
	let jsonTemplate: string = '';
	
	const { page, modules, tree } = parse(content, options);
	const usingComponents: any = page.config.components;
	const tenpModule = modules.find((v: any) => v.value.indexOf('@tenp/wx') != -1);
	tree.forEach((data: any) => {
		if(data.type == 'null')
			jsTemplate += page.type+'('+(tenpModule?tenpModule.key+'.default.watch(':'')+'{ ${MainPositon} '
		else
			jsTemplate += data.value
	})
	FormatDecorator(page, modules, options)
	jsTemplate = FormatRequire(
		modules,page, 
		options.fileName,
		options.buildDirectoryUrl, 
		(function(){
			if(usingComponents){
				return [...AppConfigComponent,...Object.values(usingComponents)].map((v: any) => v.split('/').pop())
			}else return AppConfigComponent.map((v: any) => v.split('/').pop())
		}())
	) + jsTemplate;
	FormatData(page.data)

	jsTemplate = jsTemplate.replace('${MainPositon}', FormatData(page.data)+formatMethodsPosition(page.methods, page, options.fileName) + ' }'+(tenpModule?',"'+page.type+'")':'')+');')
	
	if(page.type == 'App'){
		AppConfigComponent = Object.values(usingComponents||{});
	}else if(page.type == 'Component'){
		page.config.component = true;
	}

	if(page.config.style) {
		cssTemplate = wtsConfig.style?wtsConfig.style(page.config.style,options.srcDirectoryUrl):wtsConfig.style;
		delete page.config.style;
	}

	if(usingComponents){
		page.config.usingComponents = usingComponents;
		delete page.config.components;
	}
	wtsConfig.json && wtsConfig.json(page.type,page.config)
	htmlTemplate = renderTransTemplate(page.xml) || page.config.template || '';
	if(htmlTemplate){
		delete page.config.template
		htmlTemplate = htmlTemplate.replace(/{{([A-Za-z0-9\s"'.]+?)\|([A-Za-z0-9\s"'.:]+?)}}/g, function(a:string,b:string,c:string){
			const fun = c.split(':');
			return `{{${fun.shift()}(${b}${fun.length?',':''}${fun.join(',')})}}`
		})

		wtsConfig.xml && (htmlTemplate = wtsConfig.xml(page.type, htmlTemplate))

	}

	jsonTemplate =  JSON.stringify(page.config)
	
	return {
		js: jsTemplate,
		wxml: htmlTemplate,
		wxss: cssTemplate,
		json: jsonTemplate
	}

}