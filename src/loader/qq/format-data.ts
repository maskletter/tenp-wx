const recast = require('recast');
const { Parser } = require("acorn");
const estraverse = require('estraverse');
const escodegen = require('escodegen')


function createSetDataJson(data: any, $thisName: any){
    const json: any = {
        "type": "ExpressionStatement",
        "start": 937,
        "end": 975,
        "expression": {
            "type": "CallExpression",
            "start": 937,
            "end": 974,
            "callee": {
                "type": "MemberExpression",
                "start": 937,
                "end": 949,
                "object": {
                    "type": "ThisExpression",
                    "start": 937,
                    "end": 941
                },
                "property": {
                    "type": "Identifier",
                    "start": 942,
                    "end": 949,
                    "name": "setData"
                },
                "computed": false
            },
            "arguments": [{
                "type": "ObjectExpression",
                "start": 950,
                "end": 973,
                "properties": []
            }]
        }
    }
    const dataJson: any = {
        "type": "Property",
        "start": 952,
        "end": 971,
        "method": false,
        "shorthand": false,
        "computed": false,
        "key": {
            "type": "Identifier",
            "start": 952,
            "end": 956,
            "name": ""
        },
        "value": {
            "type": "Literal",
            "start": 958,
            "end": 971,
            "value": "",
            "raw": ""
        },
        "kind": "init"
    }
    for(let key in data){
        const _json = Object.assign({}, dataJson);
        _json.key = Object.assign({},dataJson.key);
        _json.value = Object.assign({},dataJson.value)
        _json.key.name = key;
        if(typeof(data[key]) == 'object'){
            _json.value = data[key]
        }else{
            _json.value.value = data[key]
            _json.value.raw = data[key]
        }
            
        json.expression.arguments[0].properties.push(_json)
    }
    if($thisName){
        json.expression.callee.object.type = 'Identifier'
        json.expression.callee.object.name = $thisName;
    }
    // console.log(JSON.stringify(json))
    return json;
}

// const ast = Parser.parse(template);


// const $method1 = ast.body[0].expression.arguments[0].properties[1];

function dealWith(arrayThis: Set<string>, data: string, content: string){
    // if(!content.split) return console.log(content)
    let left = content.split('.');
    let thisName = left.shift();
    if(!arrayThis.has(thisName)) return
    if(!left.length) return
    // let valueKey = left[0].split('[');
    if(data.indexOf(left[0]) == -1) return;
    // let key = left[left.length-1];
    // if(key != 'push') return;
    console.log(content)
}

function fromatMethods($method1: any, data: any){
    let arrayThis = new Set(['this','ThisExpression']);

    
    estraverse.traverse($method1, {
        enter: (node: any, parent: any) => {
            if(node.type == 'VariableDeclarator' && node.init){
                if(arrayThis.has(node.init.name||node.init.type)){
                    arrayThis.add(node.id.name)
                }
            // }else if(node.type == 'ExpressionStatement' && node.expression.arguments){
            }else if(node.type == 'ExpressionStatement' && node.expression.arguments){
                const left = escodegen.generate(node.expression.callee);
                // console.log(left)
                // let thisName = left.shift();
                // if(!arrayThis.has(thisName)) return
                    // console.log(left)
                // let valueKey = left[0].split('[');
                // if(data.indexOf(valueKey[0]) == -1) return;
                // let key = left[left.length-1];
                // if(key != 'push') return;
                // left.pop();
                // console.log(node.expression.arguments)
                // console.log(escodegen.generate(node))
                // left[left.length-1] += `[${thisName+'.'+left.join('.')}.length]`
                // left[left.length-1] = `[\`${valueKey[0]}[$\{${thisName+'.'+left.join('.')}.length\}]\`]`
                // return createSetDataJson({ [left.join('.')]: node.expression.arguments[0] }, thisName)
            }else if(node.type == 'VariableDeclaration' && node.declarations){
                const declarations = node.declarations[0];
                if(declarations.init)
                    dealWith(arrayThis, data, escodegen.generate(declarations.init))
            }
            
        }
    })
}

export default fromatMethods;
// ast.body[0].expression.arguments[0].properties.forEach(data => {
//     fromatMethods(data, ['name', 'ag2e', 'nuke2']);    
// })
// console.log(escodegen.generate([0]))
// escodegen.generate(ast).
// console.log()
// function each(elements){
//     elements.value
// }
// console.log()
// each($method1)