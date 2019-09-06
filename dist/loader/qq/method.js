"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path = require("path");
var fs = require("fs");
var wtsConfig = (function () {
    try {
        return require(path.join(process.cwd(), 'wts.config.js'));
    }
    catch (error) {
        return {};
    }
}());
exports.default = {
    attrData: wtsConfig.attrData || {},
    /**
     * 修改json文件
     */
    json: function (type, data) {
        if (data.components) {
            data.usingComponents = data.components;
            delete data.components;
        }
        wtsConfig.json && wtsConfig.json(type, data);
    },
    tree: function (type, tree, rootDir) {
        var _a;
        var componentProps = ['externalClasses', 'relations', 'observers'];
        var componentMethods = new Map([
            ['attached', 'lifetimes'],
            ['detached', 'lifetimes'],
            ['show', 'pageLifetimes'],
            ['hide', 'pageLifetimes'],
            ['resize', 'pageLifetimes'],
            ['created', 'root'],
            ['moved', 'root'],
            ['ready', 'root']
        ]);
        tree.data = tree.data.filter(function (v) {
            if (componentProps.indexOf(v.key) == -1)
                return true;
            else {
                tree.methods.push(v);
                return false;
            }
        });
        var splitMethod = { methods: [], lifetimes: [], pageLifetimes: [] };
        var watchData = { key: 'systemWatchEvent', method: 'function(){ return {' };
        tree.methods.push(watchData);
        if (type == 'Component') {
            var attached = tree.methods.filter(function (v) { return v.key == 'attached'; });
            var t = 'wx.tenp.watch.init(this);';
            // let t = '';
            if (attached.length) {
                attached[0].method = attached[0].method.replace(/[\r\n]/, t);
            }
            else {
                tree.methods.push({ key: 'attached', method: "function(){" + t + "}" });
            }
            tree.methods = tree.methods.filter(function (v) {
                var type = componentMethods.get(v.key);
                if (componentProps.indexOf(v.key) != -1) {
                    return true;
                }
                if (type) {
                    if (type != 'root') {
                        splitMethod[type].push(v);
                        if (type == 'pageLifetimes')
                            return false;
                    }
                    return true;
                }
                else {
                    splitMethod.methods.push(v);
                    return false;
                }
            });
        }
        else {
            var event_1 = type == 'App' ? 'onLaunch' : 'onLoad';
            var load = tree.methods.filter(function (v) { return v.key == event_1; });
            var t = 'wx.tenp.watch.init(this);';
            // let t = '';
            if (load.length) {
                load[0].method = load[0].method.replace(/[\r\n]/, t);
            }
            else {
                tree.methods.push({ key: event_1, method: "function(){" + t + "}" });
            }
        }
        for (var methodsKey in splitMethod) {
            tree.methods.push((_a = {}, _a[methodsKey] = splitMethod[methodsKey], _a));
        }
        var properties = [];
        tree.properties = [];
        // const methods = tree.methods
        tree.decorators.forEach(function (data) {
            if (data.type == 'Prop') {
                var defaultValue_1 = '';
                tree.properties.push({ key: data.method });
                tree.data = tree.data.filter(function (v) {
                    if (v.key == data.method) {
                        defaultValue_1 = v.value;
                        return false;
                    }
                    else {
                        return true;
                    }
                });
                properties.push(data.method + ":{value:" + (defaultValue_1 || 'undefined') + ",type:" + data.valueType + "}");
            }
            else if (data.type == 'Watch') {
                var params = new Function('return ' + data.params)();
                watchData.method += params.name + ":{type:" + (params.type || '"all"') + ", method: '" + data.method + "' },";
            }
            else if (data.type == 'ImgToBase64') {
                var buffer = fs.readFileSync(path.join(rootDir, new Function('return ' + data.params)()));
                tree.data.push({
                    key: data.method,
                    value: '"data:image/png;base64,' + new Buffer(buffer).toString('base64') + '"'
                });
            }
        });
        watchData.method += '}}';
        if (properties.length)
            tree.methods.push({ key: 'properties', value: '{' + properties.join(',') + '}' });
        // wtsConfig.tree && wtsConfig.tree(type, tree)
    },
    method: function (key, _a) {
        // const dataKey = [...properties.map((v: any) => v.key), ...data.map((v: any) => v.key)];
        // let b: string = null;
        // content = content.replace(/\bthis.(.+?)[.|)|,|\[\]|(|\s|;]/g, (a: string, b: string) => {
        //     if(dataKey.indexOf(b) == -1)
        //         return a;
        //     else{
        //         return 'this.data.'+b+a.substr(-1)
        //     }
        // }).replace(/var[\s](.+?) =[\s]this\b/, (a: string,_b: string) => {
        //     b = _b;
        //     return a;
        // }).replace(new RegExp('\\b'+b+'.(.+?)\\b','g'), (a: string,_b: string) => {
        //     if(dataKey.indexOf(_b) != -1){
        //         return `${b}.data.${_b}`;
        //     }else{ return a; }
        // })
        var content = _a.content, properties = _a.properties, data = _a.data;
        return content;
    },
    style: wtsConfig.style
};
//# sourceMappingURL=method.js.map