"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var acorn = require("acorn");
var escodegen = require("escodegen");
var path = require("path");
var fs = require("fs");
var tool_1 = require("../../tool");
var stream_1 = require("stream");
var browserify = require('browserify');
var server_1 = require("../../server");
var Final_System_Attr = ['attr', 'data', 'event', 'catch'];
var Terser = require("terser");
var modulesMap = new Map();
var wtsConfig = (function () {
    try {
        return require(path.join(process.cwd(), 'wts.config.js'));
    }
    catch (e) {
        return {};
    }
}());
var AppConfigComponent = [];
var Final_System_attrData = new Map([
    ['Map', ['markers', 'covers', 'polyline', 'circles', 'controls', 'includePoints', 'polygons']],
]);
var ComponentSetMethod = ['$$externalClasses', '$$observers', '$$relations', '$$behaviors', '$$options'];
var FormatMethod = new Map([
    ["App", null],
    ["Page", null],
    ["Component", ComponentSetMethod.concat(['lifetimes', 'properties', 'attached', 'detached', 'created', 'attached', 'ready', 'moved', 'detached', 'error', 'pageLifetimes', 'show', 'hide', 'resize'])],
]);
var FormatMethodMerge = {
    Component: {
        show: 'pageLifetimes',
        hide: 'pageLifetimes',
        resize: 'pageLifetimes',
        attached: 'lifetimes',
        detached: 'lifetimes'
    }
};
var DecoratorSort = new Map([
    ["System", ['Prop']],
    ["Browser", []]
]);
var MainFloder = tool_1.getDirectoryContent(path.join(tool_1.cwd, 'src'));
function createStream() {
    var buf = [];
    var TenpDuplex = (function (_super) {
        __extends(TenpDuplex, _super);
        function TenpDuplex(options) {
            return _super.call(this, options) || this;
        }
        TenpDuplex.prototype._write = function (chunk, encoding, callback) {
            buf.push(chunk);
            callback();
        };
        TenpDuplex.prototype._read = function (size) {
            this.push(buf);
            this.push(null);
        };
        TenpDuplex.prototype.clear = function () {
            buf = [];
        };
        return TenpDuplex;
    }(stream_1.Duplex));
    var dp = new TenpDuplex({
        readableObjectMode: true
    });
    return dp;
}
function buildModules(str, modulesLibName, libName) {
    var tenpStream = createStream();
    var b = browserify();
    tenpStream.write(str + "TenpModule.exports = " + libName + ";");
    b.add(tenpStream);
    var buff = '';
    var tt = b.bundle();
    tt.on('data', function (data, v) {
        buff += data;
    });
    tt.on('end', function () {
        var content = 'const TenpModule = module;' + buff;
        var result  = Terser.minify(content);
        if(result.error){
            console.error(' $UglifyJS error ',result.error)
        }else{
            content = result.code;
        }
        fs.writeFileSync(path.join(tool_1.cwd, './dist/tenp_modules/' + modulesLibName), content);
        tenpStream.destroy();
    });
    modulesMap.set(libName, modulesLibName);
}

function parse(content, options) {
    if (!content)
        return {
            tree: [],
            modules: [],
            page: {
                data: {},
                xml: [],
                config: {},
                decorator: [],
                type: ''
            }
        };
    var parseContent = acorn.parse(content);
    var packageName = '';
    var MainFunction = server_1.getAssociation(path.join(options.srcDirectoryUrl, options.fileNoSuffixName) + '.ts');
    if (MainFunction) {
        packageName = MainFunction.name;
    }
    var tree = [];
    if (packageName)
        tree.push({ type: 'ExpressionStatement', value: 'const ' + packageName + ' = {};' });
    var modules = [];
    var page = {
        data: {},
        xml: [],
        config: {},
        decorator: [],
        type: ''
    };
    parseContent.body.forEach(function (data) {
        if (data.type == 'ExpressionStatement') {
            if (data.expression && data.expression.callee && data.expression.callee.name == 'require') {
                modules.push({ type: 'module', value: data.expression.arguments[0].value });
            }
            else
                tree.push({ type: 'ExpressionStatement', value: escodegen.generate(data) });
        }
        else if (data.type == 'VariableDeclaration') {
            var declaration = data.declarations[0];
            if (declaration.init && declaration.init.type == 'CallExpression' && declaration.init.callee && declaration.init.callee.name == 'require') {
                modules.push({ type: 'module', value: declaration.init.arguments[0].value, key: declaration.id.name });
            }
            else if (declaration.id.name == packageName) {
                tree.push({ type: 'null' });
                page = readPage(declaration.init.callee.body.body, packageName);
            }
            else
                tree.push({ type: 'ExpressionStatement', value: escodegen.generate(data) });
        }
        else
            tree.push({ type: 'ExpressionStatement', value: escodegen.generate(data) });
    });
    return { tree: tree, modules: modules, page: page };
}
var readPage = function (body, packageName) {
    var data = {};
    var methods = {};
    var config = {};
    var xml = [];
    var decorator = [];
    var type = '';
    body.forEach(function (value) {
        if (value.type == 'FunctionDeclaration' && value.id.name == packageName) {
            value.body.body.forEach(function (_value2) {
                if (_value2.type == 'ExpressionStatement') {
                    var name_1 = _value2.expression.left.property.name;
                    if (ComponentSetMethod.indexOf(name_1) != -1) {
                        methods[name_1] = _value2.expression.right.raw ? _value2.expression.right.raw : escodegen.generate(_value2.expression.right);
                    }
                    else {
                        data[name_1] = _value2.expression.right.raw || escodegen.generate(_value2.expression.right);
                    }
                }
            });
        }
        else if (value.type == 'ExpressionStatement' && value.expression && value.expression.operator == '=') {
            if (value.expression.left && value.expression.left.object) {
                methods[value.expression.left.property.name] = escodegen.generate(value.expression.right);
            }
            else if (value.expression.left && value.expression.left.name == packageName) {
                var _body = value.expression.right.arguments[0].elements[0].arguments[0].properties;
                type = value.expression.right.arguments[0].elements[0].callee.property.name;
                _body.forEach(function (_value2) {
                    if (_value2.key.name == 'render') {
                        readRenderTransTemplate(methods, _value2.value.elements, xml);
                    }
                    else if (_value2.value.elements || _value2.value.properties) {
                        config[_value2.key.name] = new Function('return ' + escodegen.generate(_value2.value))();
                    }
                    else {
                        config[_value2.key.name] = _value2.value.value;
                    }
                });
            }
        }
        else if (value.type == 'ExpressionStatement' && value.expression.callee.name == '__decorate') {
            var __decorator = {};
            var first = value.expression.arguments[0];
            var method = value.expression.arguments[2].value;
            __decorator.methodName = method;
            __decorator.run = escodegen.generate(first.elements[0]);
            __decorator.name = __decorator.run.match(/\.([A-z\d]+?)\(/)[1];
            __decorator.type = first.elements[1].arguments[1].name;
            decorator.push(__decorator);
        }
    });
    return { data: data, methods: methods, config: config, xml: xml, decorator: decorator, type: type };
};
function readRenderTransTemplate(methods, render, treeArray) {
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
                        var value = v.value.value;
                        if (value == void 0) {
                            var name_2 = '_private_' + Math.ceil(Math.random() * 1000000);
                            if (v.value.params.length >= 1) {
                                var data_1 = v.value.params.splice(0, 1);
                                v.value.body.body.splice(0, 0, {
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
                                                "name": data_1[0].name
                                            },
                                            "init": {
                                                "type": "ThisExpression",
                                                "start": 62,
                                                "end": 66
                                            }
                                        }
                                    ],
                                    "kind": "var"
                                });
                            }
                            methods[name_2] = escodegen.generate(v.value);
                            value = name_2;
                        }
                        __data_1[v.key.name || v.key.value] = value;
                    });
                    _treeArray[_d1.key.name] = __data_1;
                }
                else {
                }
            }
            else {
                var childTree = [];
                _treeArray.child = childTree;
                readRenderTransTemplate(methods, _d1.value.elements, childTree);
            }
        });
        treeArray.push(_treeArray);
    });
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
function _formatMethodData(method, data) {
    if (!method.replace)
        return method;
    var thisMap = ['this'];
    method.replace(/[var|let] (.+?) = this;/g, function (a, b) { thisMap.push(b); });
    return method.replace(/([$a-zA-Z0-9_]+?)\.(.+?)[.|)|,|\[\]|(|\s|;]/g, function (a, b, c) {
        if (thisMap.indexOf(b) == -1)
            return a;
        if (data.indexOf(c) != -1)
            return b + ".data." + c + a.substr(-1);
        else
            return a;
    })
        .replace(/\b([a-z0-9]+?)\.(.+?)\.push\(/, function (a, b, c) {
        if (thisMap.indexOf(b) == -1)
            return a;
        if (data.indexOf(c.split('.')[1]) != -1) {
            return b + "." + c + ".push(" + b + ",";
        }
        else
            return a;
    });
    var b = null;
    return method.replace(/\bthis.(.+?)[.|)|,|\[\]|(|\s|;]/g, function (a, b) {
        if (data.indexOf(b) == -1)
            return a;
        else {
            return 'this.data.' + b + a.substr(-1);
        }
    }).replace(/var[\s](.+?) =[\s]this\b/, function (a, _b) {
        b = _b;
        return a;
    }).replace(new RegExp('\\b' + b + '.(.+?)\\b', 'g'), function (a, _b) {
        if (data.indexOf(_b) != -1) {
            return b + ".data." + _b;
        }
        else {
            return a;
        }
    }).replace(new RegExp('\\b' + b + '\\.(.+?)\\.push\\(', 'g'), function (a, _b) {
        console.log('aaaaaaaaaaaaaaaaaadwad', _b.split('.')[1]);
        if (data.indexOf(_b.split('.')[1]) != -1) {
            return b + "." + _b + ".push(\"dawd\",";
        }
        else {
            return a;
        }
    });
}
function formatMethodsPosition(methods, page, fileName) {
    var properties = page.methods ? Object.keys(page.methods.properties || {}) : [];
    var data = Object.keys(page.data).concat(properties);
    var rootParam = FormatMethod.get(page.type);
    var classification = FormatMethodMerge[page.type];
    var __me = {};
    for (var key in methods) {
        var method = _formatMethodData(methods[key], data);
        if (rootParam && rootParam.indexOf(key) == -1) {
            var own = classification[key];
            var isOwn = own ? own : 'methods';
            if (!__me[isOwn])
                __me[isOwn] = {};
            __me[isOwn][key] = method;
        }
        else {
            __me[key.replace(/\$\$/, '')] = method;
        }
    }
    var str = [];
    for (var key in __me) {
        if (typeof (__me[key]) == 'string') {
            str.push(key + ":" + __me[key]);
        }
        else {
            var __s = key + ":{";
            for (var key2 in __me[key]) {
                __s += key2 + ": " + __me[key][key2] + ",";
            }
            __s += '}';
            str.push(__s);
        }
    }
    return str.join(',');
}
function FormatDecorator(page, modules, options) {
    page.decorator.forEach(function (data) {
        if (DecoratorSort.get('Browser')[data.name]) {
        }
        else {
            var requireName_1 = data.run.split('.')[0];
            var lib = modules.find(function (v) { return v.key == requireName_1; });
            if (!lib) {
                throw new Error('为寻找到${lib.key}');
            }
            if (lib.value[0] != '.' && lib.value[0] != '/') {
                var runTemplate = data.run.replace(/\(((.+?)|)\)/, function (a, b) { return '_Analysis(page, {...data, data: ' + (b || undefined) + '})'; });
                var params = __assign({ page: page,
                    modules: modules }, options);
                new Function('page', 'data', 'require', "const " + requireName_1 + " = require('" + lib.value + "');return " + runTemplate)(params, data, require);
            }
        }
    });
}
function FormatData(data) {
    var str = [];
    for (var key in data) {
        str.push(key + ": " + data[key]);
    }
    return "data:{" + str.join(',') + "},";
}
function FormatRequire(modules, page, fileName, buildDirectoryUrl, usingComponents) {
    if (usingComponents === void 0) { usingComponents = {}; }
    var str = '';
    function createInclude(data) {
        var urlMaps = data.value.split('/');
        var reuqireUrl = '';
        if (urlMaps[0][0] == '.') {
            reuqireUrl = urlMaps.join('/');
        }else{
            var f = fileName.replace(path.join(tool_1.cwd, 'dist/'), '').split('\\');
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
        if (reuqireUrl[0] != '.')
            reuqireUrl = './' + reuqireUrl;
        if (data.key)
            return "const " + data.key + " = require('" + reuqireUrl + "');";
        else
            return "require('" + reuqireUrl + "');";
    }
    modules.forEach(function (data) {
        if (usingComponents.indexOf(data.value.split('/').pop()) != -1)
            return;
        if (data.value.substr(0, 8) == '@tenp/wx') {
            if (page.type == 'App') {
                str += "const tenp = require(\"./method.js\");const " + data.key + " = {default: tenp};wx.tenp = " + data.key + ".default;";
            }
            else {
                str += "const " + data.key + " = { default: wx.tenp };";
            }
        }
        else {
            str += createInclude(data);
        }
    });
    return str;
}
exports.default = (function (content, options) {
    var jsTemplate = '';
    var cssTemplate = '';
    var htmlTemplate = '';
    var jsonTemplate = '';
    var _a = parse(content, options), page = _a.page, modules = _a.modules, tree = _a.tree;
    var usingComponents = page.config.components;
    var tenpModule = modules.find(function (v) { return v.value.indexOf('@tenp/wx') != -1; });
    tree.forEach(function (data) {
        if (data.type == 'null')
            jsTemplate += page.type + '(' + (tenpModule ? tenpModule.key + '.default.watch(' : '') + '{ ${MainPositon} ';
        else
            jsTemplate += data.value;
    });
    FormatDecorator(page, modules, options);
    jsTemplate = FormatRequire(modules, page, options.fileName, options.buildDirectoryUrl, (function () {
        if (usingComponents) {
            return AppConfigComponent.concat(Object.values(usingComponents)).map(function (v) { return v.split('/').pop(); });
        }
        else
            return AppConfigComponent.map(function (v) { return v.split('/').pop(); });
    }())) + jsTemplate;
    FormatData(page.data);
    jsTemplate = jsTemplate.replace('${MainPositon}', FormatData(page.data) + formatMethodsPosition(page.methods, page, options.fileName) + ' }' + (tenpModule ? ',"' + page.type + '")' : '') + ');');
    if (page.type == 'App') {
        AppConfigComponent = Object.values(usingComponents || {});
    }
    else if (page.type == 'Component') {
        page.config.component = true;
    }
    if (page.config.style) {
        cssTemplate = wtsConfig.style ? wtsConfig.style(page.config.style, options.srcDirectoryUrl) : wtsConfig.style;
        delete page.config.style;
    }
    if (usingComponents) {
        page.config.usingComponents = usingComponents;
        delete page.config.components;
    }
    wtsConfig.json && wtsConfig.json(page.type, page.config);
    htmlTemplate = renderTransTemplate(page.xml) || page.config.template || '';
    if (htmlTemplate) {
        delete page.config.template;
        htmlTemplate = htmlTemplate.replace(/{{([A-Za-z0-9\s"'.]+?)\|([A-Za-z0-9\s"'.:]+?)}}/g, function (a, b, c) {
            var fun = c.split(':');
            return "{{" + fun.shift() + "(" + b + (fun.length ? ',' : '') + fun.join(',') + ")}}";
        });
        wtsConfig.xml && (htmlTemplate = wtsConfig.xml(page.type, htmlTemplate));
    }
    jsonTemplate = JSON.stringify(page.config);
    return {
        js: jsTemplate,
        wxml: htmlTemplate,
        wxss: cssTemplate,
        json: jsonTemplate
    };
});
//# sourceMappingURL=index.js.map