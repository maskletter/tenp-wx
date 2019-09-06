"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tenp = require("./assets/wx/wx-method");
var fs = require("fs");
var path = require("path");
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
}
exports.Component = function (config) {
    return function (target) {
    };
};
var WxComponent = /** @class */ (function () {
    function WxComponent() {
    }
    return WxComponent;
}());
exports.WxComponent = WxComponent;
var WxPage = /** @class */ (function () {
    function WxPage() {
    }
    return WxPage;
}());
exports.WxPage = WxPage;
exports.Page = function (config) {
    return function (target) {
    };
};
exports.Prop_Analysis = function (options, params) {
    if (!options.page.methods.properties)
        options.page.methods.properties = {};
    var data = options.page.data;
    options.page.methods.properties[params.methodName] = "{value:" + (data[params.methodName] || 'undefined') + ",type:" + params.type + "}";
    delete options.page.data[params.methodName];
};
exports.App = function (config) {
};
exports.Prop = function (defaultValue) {
};
exports.Wxml = function (defaultValue) {
};
exports.Watch = function (option) {
};
exports.Watch_Analysis = function (options, params) {
    if (!options.page.methods.observers)
        options.page.methods.observers = {};
    var data = Object.keys(options.page.data).concat((options.page.methods.properties ? Object.keys(options.page.methods.properties) : []));
    options.page.methods.observers[params.data.name] = _formatMethodData(options.page.methods[params.methodName], data);
    delete options.page.methods[params.methodName];
};
exports.Filter = function (name) {
};
exports.ImgToBase64 = function (src) {
};
exports.ImgToBase64_Analysis = function (options, params) {
    var buffer = fs.readFileSync(path.join(options.srcDirectoryUrl, params.data));
    options.page.data[params.methodName] = '"data:image/png;base64,' + new Buffer(buffer).toString('base64') + '"';
};
exports.default = tenp;
//# sourceMappingURL=index.js.map