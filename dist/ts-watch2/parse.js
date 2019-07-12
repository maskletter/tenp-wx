"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var acorn = require('acorn');
var path = require("path");
var fs = require("fs");
var escodegen = require('escodegen');
var cwd = process.cwd();
var global_config_1 = require("../global.config");
var Final_System_attrData;
/**
 * 将js代码转为ast树
 */
exports.default = (function (content) {
    if (!Final_System_attrData)
        Final_System_attrData = require('../global.config').Final_System_attrData;
    var defaultClassName = '';
    content.replace(/exports.default = (.+?)\;/g, function (a, _defaultClassName) {
        defaultClassName = _defaultClassName;
        return "";
    });
    var wxTree = [];
    var parseContent = acorn.parse(content);
    parseContent.body.forEach(function (data) {
        if (data.kind == 'var') {
            var declarations = data.declarations[0];
            var init = declarations.init;
            if (init && init.callee && init.callee.name == 'require') {
                wxTree.push({
                    type: 'require',
                    name: declarations.id.name,
                    value: init.arguments[0].value
                });
            }
            else if (declarations.id.name == defaultClassName) {
                var obj = {
                    type: 'Function',
                    data: [],
                    input: [],
                    methods: [],
                    watch: [],
                    options: [],
                    relations: []
                };
                wxTree.push(obj);
                formatFunction(init.callee.body.body, obj);
            }
            else {
                wxTree.push({ type: 'text', value: escodegen.generate(data) });
            }
        }
        else {
            wxTree.push({ type: 'text', value: escodegen.generate(data) });
        }
    });
    // 解析主函数内的方法事件
    function formatFunction(body, obj) {
        body.forEach(function (data) {
            //主函数
            if (data.id && data.id.name == defaultClassName) {
                obj.data = obj.data.concat(data.body.body.map(function (data) {
                    if (!data.expression) {
                        return '';
                    }
                    return { key: data.expression.left.property.name, value: escodegen.generate(data.expression.right) };
                })).filter(function (v) { return v; });
            }
            else if (data.expression && data.expression.left && data.expression.left.type == 'MemberExpression') {
                obj.methods.push({
                    key: data.expression.left.property.name,
                    value: escodegen.generate(data.expression.right)
                });
            }
            else if (data.expression && data.expression.callee && data.expression.callee.name == '__decorate') {
                var template = escodegen.generate(data);
                var defValue_1 = '', name_1 = '', type_1 = '', EventType_1 = '';
                ;
                template.replace(/.Input\((.+?)\)/g, function (a, b) {
                    EventType_1 = 'Input';
                    defValue_1 = b;
                }).replace(/.Input\(()\)/g, function (a, b) {
                    EventType_1 = 'Input';
                }).replace(/.Watch\((.+?)\)/g, function (a, b) {
                    EventType_1 = 'Watch';
                    defValue_1 = b;
                }).replace(/.Watch\(()\)/g, function (a, b) {
                    EventType_1 = 'Watch';
                }).replace(/.Relations\(()\)/g, function (a, b) {
                    EventType_1 = 'Relations';
                }).replace(/.Options\(()\)/g, function (a, b) {
                    EventType_1 = 'Options';
                }).replace(/.ImgToBase64\(["'](.+?)["']\)/g, function (a, b) {
                    EventType_1 = 'ImgToBase64';
                    defValue_1 = b;
                }).replace(/prototype, ['"](.+?)['"], [void 0|null]/, function (a, b) {
                    name_1 = b;
                }).replace(/__metadata\('design:type', (.+?)\)/g, function (a, b) {
                    type_1 = b;
                });
                if (EventType_1 == 'Input') {
                    obj.input.push({
                        key: name_1,
                        type: type_1,
                        value: defValue_1 || 'undefined',
                    });
                }
                else if (EventType_1 == 'Options') {
                    obj.options.push({
                        key: name_1,
                    });
                }
                else if (EventType_1 == 'Relations') {
                    obj.relations.push({
                        key: name_1,
                    });
                }
                else if (EventType_1 == 'ImgToBase64') {
                    // obj.data.push({ key: name, value: defValue });
                    obj.data.push({
                        key: name_1,
                        value: '"data:image/png;base64,' + new Buffer(fs.readFileSync(path.join(cwd, 'src', defValue_1))).toString('base64') + '"'
                    });
                }
                else {
                    obj.watch.push({
                        key: name_1,
                        value: defValue_1 || undefined
                    });
                }
                // console.log(template)
            }
            else if (data.expression && data.expression.right && data.expression.right.callee.name == "__decorate") {
                var column = data.expression.right.arguments[0].elements[0];
                wxTree.unshift(column.callee.property.name);
                //格式化@Component
                var tree_1 = data.expression.right.arguments[0].elements[0].arguments[0].properties;
                var config_1 = {};
                tree_1.forEach(function (data) {
                    if (data.key.name == 'render') {
                        var template = tree_1.find(function (v) { return v.key.name == 'render'; });
                        var treeArray = [];
                        formatTree(template.value.elements, treeArray);
                        wxTree.push({
                            type: 'tree',
                            value: treeArray
                        });
                    }
                    else {
                        if (data.value.elements) {
                            config_1[data.key.name] = global_config_1.toValueFunction(escodegen.generate(data.value));
                        }
                        else if (data.value.properties) {
                            var _arr_1 = {};
                            data.value.properties.forEach(function (data) {
                                _arr_1[data.key.name] = data.value.value;
                            });
                            config_1[data.key.name] = _arr_1;
                        }
                        else {
                            config_1[data.key.name] = data.value.value;
                        }
                    }
                });
                wxTree.push({
                    type: 'config',
                    value: config_1
                });
            }
        });
    }
    function formatTree(elements, treeArray) {
        elements.forEach(function (data) {
            if (!data.callee) {
                return treeArray.push(data.value);
            }
            var label = data.callee.property.name;
            var _treeArray = { label: label };
            data.arguments[0] && data.arguments[0].properties.forEach(function (_d1) {
                if (_d1.key.name != "child") {
                    if (Final_System_attrData[label] && Final_System_attrData[label].indexOf(_d1.key.name) != -1) {
                        _treeArray[_d1.key.name] = '{{' + escodegen.generate(_d1.value).replace(/[\r\n]/g, '') + '}}';
                    }
                    else if (_d1.value.raw) {
                        _treeArray[_d1.key.name] = _d1.value.value;
                    }
                    else if (global_config_1.Final_System_Attr.indexOf(_d1.key.name) != -1) {
                        var __data_1 = {};
                        _d1.value.properties.forEach(function (v) {
                            __data_1[v.key.name || v.key.value] = v.value.value;
                        });
                        _treeArray[_d1.key.name] = __data_1;
                    }
                    else {
                    }
                }
                else {
                    var childTree = [];
                    _treeArray.child = childTree;
                    formatTree(_d1.value.elements, childTree);
                }
            });
            treeArray.push(_treeArray);
        });
    }
    return wxTree;
});
