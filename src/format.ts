
import wtsConfig from './tool'
import includeModules from './include-modules'
const acorn = require('acorn');
const path = require('path');
const escodegen = require('escodegen');
const Final_System_Attr: any = ['attr','data','event','catch'];
let  Final_System_attrData: Map<string, string[]> = new Map([
	['Map',['markers','covers','polyline','circles','controls','includePoints','polygons']],
	...wtsConfig.attrData
])



function parse(content: string){

	const parseContent = acorn.parse(content);

	let packageName = '';
	content.replace(/exports.default = (.+?)\;/g, function(a: string,b: string){
		packageName = b;
		return '';
	})

	let tree: any[] = [
		
	];
	if(packageName){
		let split: string[] = packageName.split('(');
		if(split.length == 2){
			
		}else{
			tree.push({ type: 'ExpressionStatement', value: `let ${packageName} = {}` })
		}
	}
	parseContent.body.forEach((data: any) => {

		if(data.type == 'ExpressionStatement'){
			tree.push({
				type: 'ExpressionStatement',
				value:  escodegen.generate(data.expression)
			})
		}else if(data.type == 'VariableDeclaration'){
			const declaration = data.declarations[0];

			if(declaration.id.name != packageName){
				const value = escodegen.generate(data);
				if(value.indexOf('@tenp/wx') != -1){
					tree.push({
						type: 'tenp',
						value: declaration.id.name
					})
				}else{
					tree.push({
						type: 'ExpressionStatement',
						value:  value
					})
				}
			}else if(declaration.id.name == packageName){

				let methods: any = [];
				let decorators: any = [];
				let config: any = {};
				let parent_data: any = [];
				let treeArray: any = [];
				let type: any = '';
				if(!declaration.init.callee.body){
					tree.push({
						type: 'ExpressionStatement',
						value:  escodegen.generate(declaration)
					})
					return ;
				}
				declaration.init.callee.body.body.forEach((data: any) => {
					if(data.type == 'BlockStatement') return;
					if(data.type == 'FunctionDeclaration'){
						//读取data参数

						parent_data = data.body.body.map(({expression}: any) => {
							if(!expression) return false;
							return { key: expression.left.property.name, value: expression.right.raw || escodegen.generate(expression.right) }
						}).filter((v: any) => v)
					}else if(data.expression && data.expression.right && data.expression.right.type == 'FunctionExpression'){
						//读取方法
						methods.push({
							key: data.expression.left.property.name,
							method: escodegen.generate(data.expression.right)
						})
					}else if(data.expression && data.expression.callee && data.expression.callee.name == '__decorate'){
						//读取装饰器
						const [decorator, main, key ] = data.expression.arguments;

						decorators.push({
							type: decorator.elements[0].callee.property.name,
							params: decorator.elements[0].arguments.length ? escodegen.generate(decorator.elements[0].arguments[0]) : '',
							method: key.value,
							// valueType: 'String'
							valueType: decorator.elements[1].arguments[1].name
						})
						
					}else if(data.expression && data.expression.left && data.expression.left.name == packageName){
						//读取config
						let $config = data.expression.right.arguments[0].elements[0];
						const render = $config.arguments[0].properties.find((v: any) => v.key.name == 'render') || {value: {elements: []}};
						$config.arguments[0].properties = $config.arguments[0].properties.filter((v: any) => v.key.name != 'render')
						type = $config.callee.property.name;
						tree.unshift(type);
						
						readRenderTransTemplate(render.value.elements, treeArray);
						
						config = new Function('return '+escodegen.generate($config.arguments[0]))()
					}

				})
				const value = { methods, decorators, config, data: parent_data, render: treeArray };

				wtsConfig.tree(type, value)
				tree.push({
					type: 'main',
					value: value
				})

			} 
			
		}else if(data.type == 'FunctionDeclaration'){
			tree.push({
				type: 'ExpressionStatement',
				value: escodegen.generate(data)
			})
		}
	})
	return tree;
}

function readRenderTransTemplate(render: any = [], treeArray: any = []){
	
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
                            __data[v.key.name||v.key.value] = v.value.value;
                        })
                        _treeArray[_d1.key.name] = __data;
                    }else{
				
						
					}
                    
                }else{
                    
                    let childTree: any = [];
                    _treeArray.child = childTree;
                    readRenderTransTemplate(_d1.value.elements, childTree);
                }
            })
            treeArray.push(_treeArray)
        })
	
}

const categoryMap = new Map([
	[ "App", [] ],
	[ "Page", [] ],
	[ "Component", ['ready','properties','data','pageLifetimes', 'lifetimes','behaviors', 'relations'] ]
])


function createApp(type: string, { methods, decorators, properties, config, data, render }: any, rootDir: string){

	let template = `${type}({data:{${createData(data)}}, ${distributionMethods(type, { methods, properties, decorators, config, data, render })} });`
	template = template.replace('$data$', data);

	const css = wtsConfig.style && config.style ? wtsConfig.style(config.style, rootDir) : config.style?config.style:'';
	const wxml = renderTransTemplate(render) || config.template || '';
	
	const json: any = formatJson(type, config);

	return {
		js: template,
		css, 
		wxml,
		json
	};

}
function createPage(){

}
function createComponent(){

}
function createData(data: any[]){
	return data.map(v => `${v.key}:${v.value}`).join(',')
}

function distributionMethods(type: string, { methods, properties, decorators, config, data, render }: any){
	const category = categoryMap.get(type) || [];
	let template = '';
	let method = ['properties','data','pageLifetimes', 'lifetimes','behaviors', 'relations']
	function transMethod(key: string, content: string){
		if(method.indexOf(key) == -1)
			return wtsConfig.method(key, {content, properties:properties, data})
		else
			return content;
	}

	methods.forEach((data: any) => {
		if(data.key){
			template += `${data.key}:${transMethod(data.key, data.method||data.value)},`
		}else{
			for(let key in data){
				template += `${key}:{`
				data[key].forEach((data: any) => {
					template += `${data.key}:${transMethod(data.key, data.method)},`		
				})
				template += '},'
			}
		}
	})

	return template;
}

//格式化json对象
function formatJson(type: any, config: any){
	delete config.style;
	if(type == 'Component'){
		config.component = true;
	}
	wtsConfig.json(type, config);
	return config;
}


const wx_key = ['if','for','key','forIndex','forItem'];
const system_key = ['attr','data','event','catch','child'];

//将标签转为小写(TestLabel=>test-lable)
function FormatLabel(name: string){
    return name.replace(/[A-Z]/g, function(a: string,b: number,c: string,d: string){ return (b==0?'':'-')+a.toLocaleLowerCase() })
}
//将render转为wxml
function renderTransTemplate(render: any[]){
	let wxml = '';
	function qE(str: string): string{
		return str.replace(/"/g,'\\"')
	}
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
				wxml += ' data-'+key+'="'+attr[key]+'"'
			}
			for(let key in data){
				wxml += ' '+FormatLabel(key)+'="{{'+data[key]+'}}"'
			}
			for(let key in event){
				wxml += ' bind'+key+'="'+event[key]+'"'
			}
			for(let key in catchs){
				wxml += ' catch'+key+'="'+catchs[key]+'"'
			}
			for(let key in value){
				if(wx_key.indexOf(key) != -1){
					if(key == 'for'||key == 'if') wxml += ' wx:'+key+'="{{'+qE(value[key])+'}}"';
					else wxml += ' wx:'+FormatLabel(key)+'="'+value[key]+'"';
				} else if(system_key.indexOf(key) == -1){
					wxml += ' '+FormatLabel(key)+'="'+value[key]+'"'
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
	
    return wxml;
}
//存储app.js里的component组件
let saveAppComponents: any = {};
export default  (content: string, rootDir: string) => {
	// console.log(content)
	// parse(content)
	var element = parse(content)
	let createType = '';
	let template = '';
	let tenpKey = '';
	let css = '';
	let wxml = '';
	let json: any = {};
	
	element.forEach((data: any) => {
		if(typeof(data) == 'string'){
			createType = data;
		}else if(data.type == 'ExpressionStatement'){
			template += includeModules(data.value, rootDir)+';';
		}else if(data.type == 'tenp'){
			tenpKey = data.value;
			if(createType == 'App'){
				template += `const ${data.value} = require("./method.js");wx.tenp = ${data.value}.default;wx.Watch = require("./logHandler.js");`	
			}else{
				template += `const ${data.value} = { default: wx.tenp };`
			}
			
		}else if(data.type == 'main'){
			const code = createApp(createType,data.value, rootDir);
			template += code.js;
			css = code.css;
			wxml = code.wxml;
			json = code.json;
		}
	})

	if(createType == 'App'){
		saveAppComponents = json.usingComponents;
	}

	
	let allComponents: any = Object.assign({}, saveAppComponents, (json.usingComponents||{}));

	
	// if(createType == 'Page') console.log(allComponents)
	for(let data in allComponents){
		template = template.replace(new RegExp(`require\\('([A-Za-z0-9./]+)${path.basename(allComponents[data])}'\\)`), '{}')
	}
		
	
	return { js: template, css, wxml, json: JSON.stringify(json) };
}
// module.exports = function(content: string, rootDir: string){
	
// }
