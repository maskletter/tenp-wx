
const acorn = require('acorn');
import * as path from 'path'
import * as fs from 'fs'
const escodegen = require('escodegen');
const cwd: string = process.cwd();
import { Final_System_Attr, Final_System_attrData, toValueFunction } from '../global.config';

/**
 * 将js代码转为ast树
 */

export default (content: string): any[] => {
// console.log(content)
	let defaultClassName = '';
	content.replace(/exports.default = (.+?)\;/g, function(a: string,_defaultClassName: string){
		defaultClassName = _defaultClassName;
		return ``
	})
	let wxTree: any[] = [];
    const parseContent = acorn.parse(content);
    
    parseContent.body.forEach((data: any) => {
        if(data.kind == 'var'){
            const declarations = data.declarations[0];
            const init = declarations.init;
            if(init && init.callee && init.callee.name == 'require'){
				wxTree.push({
					type: 'require',
					name: declarations.id.name,
					value: init.arguments[0].value
				})
			}else if(declarations.id.name == defaultClassName) {
				let obj: any = {
					type: 'Function',
					data: [],
					input: [],
					methods: [],
					watch: [],
                    options: [],
                    relations: []
				};
				wxTree.push(obj);
				formatFunction(init.callee.body.body, obj)		
			}else{
				wxTree.push({ type: 'text', value: escodegen.generate(data) })
			}
        }else{
            wxTree.push({ type: 'text', value: escodegen.generate(data) })
        }
    });

	// 解析主函数内的方法事件
	function formatFunction(body: any, obj: any){
		body.forEach((data: any) => {
			//主函数
			if(data.id && data.id.name == defaultClassName){
				obj.data = obj.data.concat(data.body.body.map((data:any) => {
					if(!data.expression){
						return ''
					}
					return { key: data.expression.left.property.name, value: escodegen.generate(data.expression.right) }
				})).filter((v:any) => v);
			}else if(data.expression && data.expression.left && data.expression.left.type == 'MemberExpression'){
				obj.methods.push({
					key: data.expression.left.property.name,
					value: escodegen.generate(data.expression.right)	
				})
			} else if(data.expression && data.expression.callee && data.expression.callee.name == '__decorate'){
				const template = escodegen.generate(data);
				let defValue = '',
					name = '',
					type = '',
					EventType = '';;
				template.replace(/.Input\((.+?)\)/g, function(a: string,b: string){
					EventType = 'Input';
					defValue = b;
				}).replace(/.Input\(()\)/g, function(a: string,b: string){
					EventType = 'Input';
				}).replace(/.Watch\((.+?)\)/g, function(a: string,b: string){
					EventType = 'Watch';
					defValue = b;
				}).replace(/.Watch\(()\)/g, function(a: string,b: string){
					EventType = 'Watch';
				}).replace(/.Relations\(()\)/g, function(a: string,b: string){
					EventType = 'Relations';
				}).replace(/.Options\(()\)/g, function(a: string,b: string){
					EventType = 'Options';
				}).replace(/.ImgToBase64\(["'](.+?)["']\)/g, function(a: string,b: string){
					EventType = 'ImgToBase64';
					defValue = b;
				}).replace(/prototype, ['"](.+?)['"], [void 0|null]/, function(a: string,b: string){
					name = b;
				}).replace(/__metadata\('design:type', (.+?)\)/g, function(a: string,b: string){
					type = b;
				})
				if(EventType == 'Input'){
					obj.input.push({
						key: name,
						type,
						value: defValue||'undefined',
					})
				}else if(EventType == 'Options'){
					obj.options.push({
						key: name,
					})
				}else if(EventType == 'Relations'){
					obj.relations.push({
						key: name,
					})
                }else if(EventType == 'ImgToBase64'){
					// obj.data.push({ key: name, value: defValue });
					obj.data.push({
						key: name,
						value: '"data:image/png;base64,'+new Buffer(fs.readFileSync(path.join(cwd,'src',defValue))).toString('base64')+'"'
					})
				} else{
					obj.watch.push({
						key: name,
						value: defValue||undefined
					})
				}

					
				// console.log(template)
			} else if(data.expression && data.expression.right && data.expression.right.callee.name == "__decorate"){
                const column = data.expression.right.arguments[0].elements[0];
                wxTree.unshift(column.callee.property.name)
                //格式化@Component
                const tree = data.expression.right.arguments[0].elements[0].arguments[0].properties;
                let config: any = {};
                tree.forEach((data: any) => {
					
                    if(data.key.name == 'template'){
                        const template = tree.find((v: any) => v.key.name == 'template');
                        let treeArray: any[] = [];
                        formatTree(template.value.elements, treeArray);
                        wxTree.push({
                            type: 'tree',
                            value: treeArray
                        })
                    }else{
						if(data.value.elements){
							config[data.key.name] = toValueFunction(escodegen.generate(data.value))
						}else if(data.value.properties){
                            let _arr: any = {};
                            data.value.properties.forEach((data: any) => {
                                _arr[data.key.name] = data.value.value
                            })
                            config[data.key.name] = _arr;
                        }else{
                            config[data.key.name] = data.value.value;
                        }
                        
                    }
                })
                wxTree.push({
                    type: 'config',
                    value: config
                })
            }
		})
	}
	
    function formatTree(elements: any[], treeArray: any[]){
        elements.forEach((data) => {
			let {name: label} = data.callee.property;
			let  _treeArray: any = { label: label };
			
            data.arguments[0] && data.arguments[0].properties.forEach((_d1: any) => {
                
                if(_d1.key.name != "child"){
					
                    if(_d1.value.raw){
                        _treeArray[_d1.key.name] = _d1.value.value;
                    }else if(Final_System_Attr.indexOf(_d1.key.name) != -1){
                        let __data: any = {};
                        _d1.value.properties.forEach((v: any) => {
                            __data[v.key.name||v.key.value] = v.value.value;
                        })
                        _treeArray[_d1.key.name] = __data;
                    }else{
						if(Final_System_attrData[label]&&Final_System_attrData[label].indexOf(_d1.key.name) != -1){
							_treeArray[_d1.key.name] = '{{'+escodegen.generate(_d1.value).replace(/[\r\n]/g,'')+'}}';
						}
						
					}
                    
                }else{
                    
                    let childTree: any = [];
                    _treeArray.child = childTree;
                    formatTree(_d1.value.elements, childTree);
                }
            })
            treeArray.push(_treeArray)
        })
    }

	return	wxTree
}
