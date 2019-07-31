"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var acorn = require("acorn");
var escodegen = require("escodegen");
var path = require("path");
var method_1 = require("./method");
var include_modules_1 = require("../include-modules");
var Final_System_Attr = ['attr', 'data', 'event', 'catch'];
var Final_System_attrData = new Map([
    ['Map', ['markers', 'covers', 'polyline', 'circles', 'controls', 'includePoints', 'polygons']]
].concat(method_1.default.attrData));
function parse(content, rootDir) {
    var parseContent = acorn.parse(content);
    var packageName = '';
    content.replace(/exports.default = (.+?)\;/g, function (a, b) {
        packageName = b;
        return '';
    });
    var tree = [];
    if (packageName) {
        var split = packageName.split('(');
        if (split.length == 2) {
        }
        else {
            tree.push({ type: 'ExpressionStatement', value: "let " + packageName + " = {}" });
        }
    }
    parseContent.body.forEach(function (data) {
        if (data.type == 'ExpressionStatement') {
            tree.push({
                type: 'ExpressionStatement',
                value: escodegen.generate(data.expression)
            });
        }
        else if (data.type == 'VariableDeclaration') {
            var declaration = data.declarations[0];
            if (declaration.id.name != packageName) {
                var value = escodegen.generate(data);
                if (value.indexOf('@tenp/wx') != -1) {
                    tree.push({
                        type: 'tenp',
                        value: declaration.id.name
                    });
                }
                else {
                    tree.push({
                        type: 'ExpressionStatement',
                        value: value
                    });
                }
            }
            else if (declaration.id.name == packageName) {
                var methods_1 = [];
                var decorators_1 = [];
                var config_1 = {};
                var parent_data_1 = [];
                var treeArray_1 = [];
                var type_1 = '';
                if (!declaration.init.callee.body) {
                    tree.push({
                        type: 'ExpressionStatement',
                        value: escodegen.generate(declaration)
                    });
                    return;
                }
                declaration.init.callee.body.body.forEach(function (data) {
                    if (data.type == 'BlockStatement')
                        return;
                    if (data.type == 'FunctionDeclaration') {
                        parent_data_1 = data.body.body.map(function (_a) {
                            var expression = _a.expression;
                            if (!expression)
                                return false;
                            return { key: expression.left.property.name, value: expression.right.raw || escodegen.generate(expression.right) };
                        }).filter(function (v) { return v; });
                    }
                    else if (data.expression && data.expression.right && data.expression.right.type == 'FunctionExpression') {
                        methods_1.push({
                            key: data.expression.left.property.name,
                            method: escodegen.generate(data.expression.right)
                        });
                    }
                    else if (data.expression && data.expression.callee && data.expression.callee.name == '__decorate') {
                        var _a = data.expression.arguments, decorator = _a[0], main = _a[1], key = _a[2];
                        decorators_1.push({
                            type: decorator.elements[0].callee.property.name,
                            params: decorator.elements[0].arguments.length ? escodegen.generate(decorator.elements[0].arguments[0]) : '',
                            method: key.value,
                            valueType: decorator.elements[1].arguments[1].name
                        });
                    }
                    else if (data.expression && data.expression.left && data.expression.left.name == packageName) {
                        var $config = data.expression.right.arguments[0].elements[0];
                        var render = $config.arguments[0].properties.find(function (v) { return v.key.name == 'render'; }) || { value: { elements: [] } };
                        $config.arguments[0].properties = $config.arguments[0].properties.filter(function (v) { return v.key.name != 'render'; });
                        type_1 = $config.callee.property.name;
                        tree.unshift(type_1);
                        readRenderTransTemplate(render.value.elements, treeArray_1);
                        config_1 = new Function('return ' + escodegen.generate($config.arguments[0]))();
                    }
                });
                var value = { methods: methods_1, decorators: decorators_1, config: config_1, data: parent_data_1, render: treeArray_1 };
                method_1.default.tree(type_1, value, rootDir);
                tree.push({
                    type: 'main',
                    value: value
                });
            }
        }
        else if (data.type == 'FunctionDeclaration') {
            tree.push({
                type: 'ExpressionStatement',
                value: escodegen.generate(data)
            });
        }
    });
    return tree;
}
function readRenderTransTemplate(render, treeArray) {
    if (render === void 0) { render = []; }
    if (treeArray === void 0) { treeArray = []; }
    render.forEach(function (data) {
        if (!data.callee) {
            return treeArray.push(data.value);
        }
        var label = (data.callee.property ? data.callee.property : data.callee).name;
        var _treeArray = { __labelName: label };
        data.arguments[0] && data.arguments[0].properties.forEach(function (_d1) {
            if (_d1.key.name != "child") {
                if (Final_System_attrData.get(label) && Final_System_attrData.get(label).indexOf(_d1.key.name) != -1) {
                    _treeArray[_d1.key.name] = '{{' + escodegen.generate(_d1.value).replace(/[\r\n]/g, '') + '}}';
                }
                else if (_d1.value.raw) {
                    _treeArray[_d1.key.name || _d1.key.value] = _d1.value.value;
                }
                else if (Final_System_Attr.indexOf(_d1.key.name) != -1) {
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
                readRenderTransTemplate(_d1.value.elements, childTree);
            }
        });
        treeArray.push(_treeArray);
    });
}
var categoryMap = new Map([
    ["App", []],
    ["Page", []],
    ["Component", ['ready', 'properties', 'data', 'pageLifetimes', 'lifetimes', 'behaviors', 'relations']]
]);
function createApp(type, _a, rootDir) {
    var methods = _a.methods, decorators = _a.decorators, properties = _a.properties, config = _a.config, data = _a.data, render = _a.render;
    var template = type + "({data:{" + createData(data) + "}, " + distributionMethods(type, { methods: methods, properties: properties, decorators: decorators, config: config, data: data, render: render }) + " });";
    template = template.replace('$data$', data);
    var css = method_1.default.style && config.style ? method_1.default.style(config.style, rootDir) : config.style ? config.style : '';
    var wxml = renderTransTemplate(render) || config.template || '';
    var json = formatJson(type, config);
    return {
        js: template,
        css: css,
        wxml: wxml,
        json: json
    };
}
function createData(data) {
    return data.map(function (v) { return v.key + ":" + v.value; }).join(',');
}
function distributionMethods(type, _a) {
    var methods = _a.methods, properties = _a.properties, decorators = _a.decorators, config = _a.config, data = _a.data, render = _a.render;
    var category = categoryMap.get(type) || [];
    var template = '';
    var method = ['properties', 'data', 'pageLifetimes', 'lifetimes', 'behaviors', 'relations'];
    function transMethod(key, content) {
        if (method.indexOf(key) == -1)
            return method_1.default.method(key, { content: content, properties: properties, data: data });
        else
            return content;
    }
    methods.forEach(function (data) {
        if (data.key) {
            template += data.key + ":" + transMethod(data.key, data.method || data.value) + ",";
        }
        else {
            for (var key in data) {
                template += key + ":{";
                data[key].forEach(function (data) {
                    template += data.key + ":" + transMethod(data.key, data.method) + ",";
                });
                template += '},';
            }
        }
    });
    return template;
}
function formatJson(type, config) {
    delete config.style;
    if (type == 'Component') {
        config.component = true;
    }
    method_1.default.json(type, config);
    return config;
}
var wx_key = ['if', 'for', 'key', 'forIndex', 'forItem', 'else', 'elif'];
var system_key = ['attr', 'data', 'event', 'catch', 'child'];
function FormatLabel(name) {
    return name.replace(/[A-Z]/g, function (a, b, c, d) { return (b == 0 ? '' : '-') + a.toLocaleLowerCase(); });
}
function renderTransTemplate(render) {
    var wxml = '';
    function qE(str) {
        try {
            return str.replace(/"/g, '\\"');
        }
        catch (error) {
            return str;
        }
    }
    function createWxml(element) {
        element.forEach(function (value) {
            if (!value.__labelName) {
                wxml += value;
                return;
            }
            var label = FormatLabel(value.__labelName);
            delete value.__labelName;
            wxml += '<' + label;
            var attr = value.attr || {};
            var data = value.data || {};
            var event = value.event || {};
            var catchs = value.catch || {};
            for (var key in attr) {
                wxml += ' data-' + key + '="' + qE(attr[key]) + '"';
            }
            for (var key in data) {
                wxml += ' ' + FormatLabel(key) + '="{{' + qE(data[key]) + '}}"';
            }
            for (var key in event) {
                wxml += ' bind' + key + '="' + event[key] + '"';
            }
            for (var key in catchs) {
                wxml += ' catch' + key + '="' + catchs[key] + '"';
            }
            for (var key in value) {
                if (wx_key.indexOf(key) != -1) {
                    if (key == 'for' || key == 'if' || key == 'elif')
                        wxml += ' wx:' + key + '="{{' + qE(value[key]) + '}}"';
                    else
                        wxml += ' wx:' + FormatLabel(key) + '="' + value[key] + '"';
                }
                else if (system_key.indexOf(key) == -1) {
                    wxml += ' ' + FormatLabel(key) + '="' + qE(value[key]) + '"';
                }
            }
            wxml += '>';
            if (value.text)
                wxml += value.text;
            if (value.child) {
                createWxml(value.child);
            }
            wxml += '</' + label + '>';
        });
    }
    ;
    createWxml(render);
    return wxml;
}
var saveAppComponents = {};
exports.default = (function (content, rootDir) {
    var element = parse(content, rootDir);
    var createType = '';
    var template = '';
    var tenpKey = '';
    var css = '';
    var wxml = '';
    var json = {};
    element.forEach(function (data) {
        if (typeof (data) == 'string') {
            createType = data;
        }
        else if (data.type == 'ExpressionStatement') {
            template += include_modules_1.default(data.value, rootDir) + ';';
        }
        else if (data.type == 'tenp') {
            tenpKey = data.value;
            if (createType == 'App') {
                template += "const " + data.value + " = require(\"./method.js\");wx.tenp = " + data.value + ".default;";
            }
            else {
                template += "const " + data.value + " = { default: wx.tenp };";
            }
        }
        else if (data.type == 'main') {
            var code = createApp(createType, data.value, rootDir);
            template += code.js;
            css = code.css;
            wxml = code.wxml;
            json = code.json;
        }
    });
    if (createType == 'App') {
        saveAppComponents = json.usingComponents;
    }
    var allComponents = Object.assign({}, saveAppComponents, (json.usingComponents || {}));
    if (wxml) {
        wxml = wxml.replace(/{{(.+?)\|(.+?)}}/g, function (a, b, c) {
            var fun = c.split(':');
            return "{{" + fun.shift() + "(" + b + (fun.length ? ',' : '') + fun.join(',') + ")}}";
        });
    }
    for (var data in allComponents) {
        template = template.replace(new RegExp("require\\('([A-Za-z0-9./]+)" + path.basename(allComponents[data]) + "'\\)"), '{}');
    }
    return { js: template, css: css, wxml: wxml, json: JSON.stringify(json) };
});
//# sourceMappingURL=index.js.map