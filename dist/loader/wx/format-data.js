"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var recast = require('recast');
var Parser = require("acorn").Parser;
var estraverse = require('estraverse');
var escodegen = require('escodegen');
function createSetDataJson(data, $thisName) {
    var json = {
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
    };
    var dataJson = {
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
    };
    for (var key in data) {
        var _json = Object.assign({}, dataJson);
        _json.key = Object.assign({}, dataJson.key);
        _json.value = Object.assign({}, dataJson.value);
        _json.key.name = key;
        if (typeof (data[key]) == 'object') {
            _json.value = data[key];
        }
        else {
            _json.value.value = data[key];
            _json.value.raw = data[key];
        }
        json.expression.arguments[0].properties.push(_json);
    }
    if ($thisName) {
        json.expression.callee.object.type = 'Identifier';
        json.expression.callee.object.name = $thisName;
    }
    return json;
}
function dealWith(arrayThis, data, content) {
    var left = content.split('.');
    var thisName = left.shift();
    if (!arrayThis.has(thisName))
        return;
    if (!left.length)
        return;
    if (data.indexOf(left[0]) == -1)
        return;
    console.log(content);
}
function fromatMethods($method1, data) {
    var arrayThis = new Set(['this', 'ThisExpression']);
    estraverse.traverse($method1, {
        enter: function (node, parent) {
            if (node.type == 'VariableDeclarator' && node.init) {
                if (arrayThis.has(node.init.name || node.init.type)) {
                    arrayThis.add(node.id.name);
                }
            }
            else if (node.type == 'ExpressionStatement' && node.expression.arguments) {
                var left = escodegen.generate(node.expression.callee);
            }
            else if (node.type == 'VariableDeclaration' && node.declarations) {
                var declarations = node.declarations[0];
                if (declarations.init)
                    dealWith(arrayThis, data, escodegen.generate(declarations.init));
            }
        }
    });
}
exports.default = fromatMethods;
//# sourceMappingURL=format-data.js.map