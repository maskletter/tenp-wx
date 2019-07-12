"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path = require("path");
var jsdomTotemplate_1 = require("./jsdomTotemplate");
var global_config_1 = require("../../global.config");
/**
 * 用于将解析好的结构树转为微信小程序代码
 */
var Global_Template = "let NextTickCallbackMap = null;let $This = null;let $ElementMethod = null;\n\t\t\tvar logHandler = {\n\t\t\t   get: function(target, key) {\n\t\t\t   \t if (watchParam[key] && watchParam[key].set){\n            \t\t watchParam[key].set.apply($ElementMethod, ['get'])\n          \t\t }\n\t\t\t     if (typeof (target[key]) != 'undefined'){\n\t\t             return target[key]\n\t\t         }else{\n\t\t             return properties[key] ? properties[key].value : undefined;\n\t\t         }\n\t\t\t   },\n\t\t\t   set: function(target, key, value) {\n\t\t\t   \t if (watchParam[key] && watchParam[key].set){\n            \t\t watchParam[key].set.apply($ElementMethod, ['set', value])\n          \t\t }\n\t\t\t     target[key] = value;\n\t\t\t     if($This){\n\t\t\t     \t$This.setData({ [key]: value }, () => {\n\t\t\t\t     \tNextTickCallbackMap && NextTickCallbackMap();\n\t\t\t\t     \tNextTickCallbackMap = null;\n\t\t\t\t     })\n\t\t\t     }\n\t\t\t     return true;\n\t\t\t   }\n\t\t\t };\n\t\t\t function createMethods($this, key, data){\n\t\t\t \t$ElementMethod=$this;\n\t\t\t \tif(!$This){$this.setData({[key]:data})};\n             }";
//Component存在跟目录的参数值
var noIsData = ['options', 'relations', 'behaviors', 'observers', 'externalClasses'];
exports.ClearOtherConfig = function (removeKey, config) {
    var data = Object.assign({}, config);
    if (data.components) {
        data.usingComponents = data.components;
    }
    removeKey.forEach(function (key) {
        delete data[key];
    });
    return JSON.stringify(data, null, 2);
};
exports.default = (function (content, data) {
    // const data = parse(content);
    var tenp = data.find(function (v) { return v.value == "@tenp/wx"; });
    var type = data[0];
    if (type == 'Component') {
        return createComponent(data, tenp);
    }
    else if (type == 'Page') {
        return createPage(data, tenp);
    }
    else if (type == 'App') {
        return createApp(data, tenp);
    }
    else {
        return { js: content.replace(/require\("@tenp\/wx"\)/, "{ default: wx.tenp }") };
    }
});
//判断当前组件或者页面是否引用了组件的js
function hasCurrentComponent(url, components) {
    var is = false;
    components.forEach(function (data) {
        if (data.indexOf(url) != -1) {
            is = true;
        }
    });
    return is;
}
//转换方法内this对象
function transThis(data, propertiesKey, dataKey) {
    var b = null;
    data.value = data.value.replace(/\bthis.(.+?)[.|)|,|\[\]|(|\s|;]/g, function (a, b, c) {
        if (propertiesKey.concat(dataKey).indexOf(b) != -1) {
            return "targetWithLog." + b + a.substr(-1);
        }
        else {
            return a;
        }
    }).replace(/var[\s](.+?) =[\s]this\b/, function (a, _b) {
        b = _b;
        return a;
    }).replace(new RegExp('\\b' + b + '.(.+?) =', 'g'), function (a, b) {
        if (dataKey.indexOf(b) != -1) {
            return "targetWithLog." + b + a.substr(-1);
        }
        else {
            return a;
        }
    });
    return data;
}
function createComponent(data, tenp) {
    // let template: string = `const ${tenp.name} = { default: getApp().tenp };`+Global_Template;
    var template = "const " + tenp.name + " = { default: wx.tenp };" + Global_Template;
    var functionValue = {};
    var tree = [];
    var config = data.find(function (v) { return v.type == 'config'; }).value;
    var wxml = config.template || '';
    var components = config.components || {};
    var componentsValue = Object.values(components);
    var dataKey = [], propertiesKey = [], options = '', relations = '';
    data.forEach(function (value) {
        if (value.type == 'text') {
            template += value.value;
        }
        else if (value.type == 'Function') {
            functionValue = value;
        }
        else if (value.type == 'require') {
            if (value.value.substr(0, 5) != '@tenp' && !hasCurrentComponent(path.basename(value.value), componentsValue)) {
                template += "const " + value.name + " = require(\"" + value.value + "\");";
            }
            tenp = value.value;
        }
        else if (value.type == 'config') {
            config = value.value;
            wxml = value.value.template;
            components = config.components || {};
        }
        else if (value.type == 'tree') {
            tree = value.value;
        }
    });
    //过滤掉data中options和relations中的参数
    functionValue.data = functionValue.data.filter(function (v) {
        if (noIsData.indexOf(v.key) == -1)
            return true;
        else {
            functionValue.methods.push(v);
            return false;
        }
    });
    //添加data参数
    var _data = 'const _pageData = {' + functionValue.data.map(function (data) {
        if (global_config_1.Keyword_Proto.indexOf(data.key) != -1)
            return '';
        dataKey.push(data.key);
        return data.key + ": " + data.value;
    }).filter(function (v) { return v.replace(/\s/g, ''); }).join(',') + '};';
    //添加监听参数
    var _input = 'const properties = {' + functionValue.input.map(function (data) {
        propertiesKey.push(data.key);
        return data.key + ": {value:" + data.value + ",type:" + data.type + ", observer(data){ targetWithLog['" + data.key + "'] = data;createMethods(this, \"" + data.key + "\", data); }}";
    }).filter(function (v) { return v.replace(/\s/g, ''); }).join(',') + '};';
    //获取$this对象并赋值给全局对象
    var ready = functionValue.methods.find(function (_a) {
        var key = _a.key;
        return key == 'ready';
    });
    if (ready) {
        ready.value = ready.value.replace('{', '{$This=this;');
    }
    else {
        functionValue.methods.push({ key: 'ready', value: 'function () {$This=this;}' });
    }
    //筛选事件方法并添加进去
    var _methods = exports.FormatMethods2('Component', functionValue.methods.map(function (data) {
        var b = null;
        var datas = propertiesKey.concat(dataKey);
        data.value = data.value.replace(/\bthis.(.+?)[.|)|,|\[\]|(|\s|;]/g, function (a, b, c) {
            if (datas.indexOf(b) != -1) {
                return "targetWithLog." + b + a.substr(-1);
            }
            else {
                return a;
            }
        }).replace(/var[\s](.+?) =[\s]this\b/, function (a, _b) {
            b = _b;
            return a;
        }).replace(new RegExp('\\b' + b + '.(.+?)\\b', 'g'), function (a, b) {
            if (datas.indexOf(b) != -1) {
                return "targetWithLog." + b;
            }
            else {
                return a;
            }
        });
        return data;
    }));
    //添加监听事件
    var _watch = functionValue.watch.map(function (data) {
        var value = global_config_1.toValueFunction(data.value);
        var type = value.type;
        return value.name + ": {\n            get: " + (!type || type == 'get' ? "Colul.methods." + data.key : undefined) + ",\n            set: " + (!type || type == 'post' ? "Colul.methods." + data.key : undefined) + "\n        }";
    }).join(',');
    if (functionValue.options.length) {
        options = 'options: ' + functionValue.options.map(function (__data) {
            var result = functionValue.data.find(function (v) { return v.key == __data.key; });
            return result ? result.value : '{}';
        }).join(',');
    }
    if (functionValue.relations.length) {
        relations = 'relations: ' + functionValue.relations.map(function (__data) {
            var result = functionValue.data.find(function (v) { return v.key == __data.key; });
            return result ? result.value : '{}';
        }).join(',');
    }
    template += _data;
    template += _input;
    template += 'let targetWithLog = new Proxy(_pageData, logHandler);';
    template += "const Colul = { data:targetWithLog,properties," + (relations ? relations + ',' : '') + " " + (options ? options + ',' : '') + " " + _methods + " };";
    template += "const watchParam = { " + _watch + " };";
    template += "Component(Colul);";
    template = template.replace(/exports.default = (.+?)\;/g, function (a, b) {
        return 'exports.default = Colul;';
    });
    config.component = true;
    return {
        wxml: tree.length ? jsdomTotemplate_1.default(tree) : wxml,
        wxss: config.style,
        js: template,
        json: exports.ClearOtherConfig(['style', 'template', 'components'], config)
    };
}
function createPage(data, tenp) {
    // let template: string = `const ${tenp.name} = { default: getApp().tenp };`+Global_Template;
    var template = "const " + tenp.name + " = { default: wx.tenp };" + Global_Template;
    var functionValue = {};
    var tree = [];
    var config = data.find(function (v) { return v.type == 'config'; }).value;
    var wxml = config.template || '';
    var components = config.components || {};
    var componentsValue = Object.values(components);
    var dataKey = [];
    data.forEach(function (value) {
        if (value.type == 'text') {
            template += value.value;
        }
        else if (value.type == 'Function') {
            functionValue = value;
        }
        else if (value.type == 'require') {
            if (value.value.substr(0, 5) != '@tenp' && !hasCurrentComponent(path.basename(value.value), componentsValue)) {
                template += "const " + value.name + " = require(\"" + value.value + "\");";
            }
            tenp = value.value;
        }
        else if (value.type == 'config') {
            // config = value.value;
            // wxml = value.value.template;
            // components = config.components||{};
        }
        else if (value.type == 'tree') {
            tree = value.value;
        }
    });
    //添加data参数
    var _data = 'const _pageData = {' + functionValue.data.map(function (data) {
        if (global_config_1.Keyword_Proto.indexOf(data.key) != -1)
            return '';
        dataKey.push(data.key);
        return data.key + ": " + data.value;
    }).filter(function (v) { return v.replace(/\s/g, ''); }).join(',') + '};';
    //获取$this对象并赋值给全局对象
    var onLoad = functionValue.methods.find(function (_a) {
        var key = _a.key;
        return key == 'onLoad';
    });
    if (onLoad) {
        onLoad.value = onLoad.value.replace('{', '{$This=this;');
    }
    else {
        functionValue.methods.push({ key: 'onLoad', value: 'function () {$This=this;}' });
    }
    //筛选事件方法并添加进去
    var _methods = exports.FormatMethods2('Page', functionValue.methods.map(function (data) {
        var b = null;
        data.value = data.value.replace(/\bthis.(.+?)[.|)|,|\[\]|(|\s|;]/g, function (a, b, c) {
            if (dataKey.indexOf(b) != -1) {
                return "targetWithLog." + b + a.substr(-1);
            }
            else {
                return a;
            }
        }).replace(/var[\s](.+?) =[\s]this\b/, function (a, _b) {
            b = _b;
            return a;
        }).replace(new RegExp('\\b' + b + '.(.+?) =', 'g'), function (a, b) {
            if (dataKey.indexOf(b) != -1) {
                return "targetWithLog." + b + a.substr(-1);
            }
            else {
                return a;
            }
        });
        return data;
    }));
    //添加监听事件
    var _watch = functionValue.watch.map(function (data) {
        var value = global_config_1.toValueFunction(data.value);
        var type = value.type;
        return value.name + ": {\n            get: " + (!type || type == 'get' ? "Colul." + data.key : undefined) + ",\n            set: " + (!type || type == 'post' ? "Colul." + data.key : undefined) + "\n        }";
    }).join(',');
    template += _data;
    template += 'let targetWithLog = new Proxy(_pageData, logHandler);';
    template += "let properties = {};const Colul = { data:targetWithLog, " + _methods + " };";
    template += "const watchParam = { " + _watch + " };";
    template += "Page(Colul);";
    template = template.replace(/exports.default = (.+?)\;/g, function (a, b) {
        return 'exports.default = Colul;';
    });
    return {
        wxml: tree.length ? jsdomTotemplate_1.default(tree) : wxml,
        wxss: config.style,
        js: template,
        json: exports.ClearOtherConfig(['style', 'template', 'components'], config)
    };
}
function createApp(data, tenp) {
    var template = "const " + tenp.name + " = {default:require('./method.js')};wx.tenp = " + tenp.name + ".default;" + Global_Template;
    var functionValue = {};
    var config = {};
    var libName = tenp.name;
    var components = {};
    var dataKey = [];
    data.forEach(function (value) {
        if (value.type == 'text') {
            template += value.value;
        }
        else if (value.type == 'Function') {
            functionValue = value;
        }
        else if (value.type == 'require') {
            if (value.value.substr(0, 5) != '@tenp') {
                template += "const " + value.name + " = require(\"" + value.value + "\");";
            }
            tenp = value.value;
        }
        else if (value.type == 'config') {
            config = value.value;
            components = config.components || {};
        }
    });
    functionValue.methods.push({ key: 'tenp', value: libName });
    //添加data参数
    var _data = 'const _pageData = {' + functionValue.data.map(function (data) {
        if (global_config_1.Keyword_Proto.indexOf(data.key) != -1)
            return '';
        dataKey.push(data.key);
        return data.key + ": " + data.value;
    }).filter(function (v) { return v.replace(/\s/g, ''); }).join(',') + '};';
    //获取$this对象并赋值给全局对象
    var onLaunch = functionValue.methods.find(function (_a) {
        var key = _a.key;
        return key == 'onLaunch';
    });
    if (onLaunch) {
        onLaunch.value = onLaunch.value.replace('{', '{$This=this;');
    }
    else {
        functionValue.methods.push({ key: 'onLaunch', value: 'function () {$This=this;}' });
    }
    //筛选事件方法并添加进去
    var _methods = exports.FormatMethods2('App', functionValue.methods.map(function (data) {
        var b = null;
        data.value = data.value.replace(/\bthis.(.+?)[.|)|,|\[\]|(|\s|;]/g, function (a, b, c) {
            if (dataKey.indexOf(b) != -1) {
                return "targetWithLog." + b + a.substr(-1);
            }
            else {
                return a;
            }
        }).replace(/var[\s](.+?) =[\s]this\b/, function (a, _b) {
            b = _b;
            return a;
        }).replace(new RegExp('\\b' + b + '.(.+?) =', 'g'), function (a, b) {
            if (dataKey.indexOf(b) != -1) {
                return "targetWithLog." + b + a.substr(-1);
            }
            else {
                return a;
            }
        });
        return data;
    }));
    //添加监听事件
    var _watch = functionValue.watch.map(function (data) {
        var value = global_config_1.toValueFunction(data.value);
        var type = value.type;
        return value.name + ": {\n            get: " + (!type || type == 'get' ? "Colul." + data.key : undefined) + ",\n            set: " + (!type || type == 'post' ? "Colul." + data.key : undefined) + "\n        }";
    }).join(',');
    template += _data;
    template += 'let targetWithLog = new Proxy(_pageData, logHandler);';
    template += "const Colul = { data:targetWithLog, " + _methods + " };";
    template += "const watchParam = { " + _watch + " };";
    template += "App(Colul);";
    template = template.replace(/exports.default = (.+?)\;/g, function (a, b) {
        return 'exports.default = Colul;';
    });
    return {
        wxss: config.style,
        js: template,
        json: exports.ClearOtherConfig(['style', 'components'], config)
    };
}
//筛选不同的事件存放到不同的对象中
exports.FormatMethods2 = function (type, data) {
    var str = '';
    var methods = [];
    var lifetimes = [];
    var pageLifetimes = [];
    var $nextTick = '$nextTick: function(callback){NextTickCallbackMap = callback;}';
    if (type == 'App' || type == 'Page') {
        data.forEach(function (__) {
            str += __.key + ": " + __.value + ",";
        });
        str += $nextTick;
    }
    else {
        var rootValues_1 = [];
        data.forEach(function (__) {
            var type = global_config_1.Component_Event[__.key];
            if (type == 'lifetimes') {
                lifetimes.push(__.key + ": " + __.value);
            }
            else if (type == 'pageLifetimes') {
                pageLifetimes.push(__.key + ": " + __.value);
            }
            else if (noIsData.indexOf(__.key) == -1) {
                methods.push(__.key + ": " + __.value);
            }
            else {
                rootValues_1.push(__.key + ": " + __.value);
            }
        });
        methods.push($nextTick);
        if (rootValues_1.length) {
            str += rootValues_1.join(',') + ",";
        }
        str += "\n\t\t\tlifetimes:{" + lifetimes.join(',') + "},\n\t\t\tpageLifetimes:{" + pageLifetimes.join(',') + "},\n            methods:{" + methods.join(',') + "},\n\t\t";
    }
    return str;
};
