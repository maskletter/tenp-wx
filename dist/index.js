"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var wx_method_1 = require("../lib/wx-method");
const fs = require('fs')
const path = require('path')
exports.Component = function (config) {
    return function (target) {
    };
};
var WxComponent = (function () {
    function WxComponent() {
    }
    return WxComponent;
}());
exports.WxComponent = WxComponent;
var WxPage = (function () {
    function WxPage() {
    }
    return WxPage;
}());
exports.WxPage = WxPage;
exports.Page = function (config) {
    return function (target) {
    };
};
exports.App = function (config) {
};
exports.Prop = function (defaultValue) {
};
exports.Prop_Analysis = function(options, params){
    if(!options.page.methods.properties) options.page.methods.properties = {};
    let data = options.page.data;
    options.page.methods.properties[params.methodName] = `{value:${data[params.methodName]||'undefined'},type:${params.type}}`
    delete options.page.data[params.methodName]
}
exports.Wxml = function (defaultValue) {
};
exports.Watch = function (option) {
};
exports.Filter = function (name) {
};
exports.ImgToBase64 = function (src) {
};
exports.ImgToBase64_Analysis = function (options, params) {
    const buffer = fs.readFileSync(path.join(options.srcDirectoryUrl,params.data));
    options.page.data[params.methodName] = '"data:image/png;base64,' + new Buffer(buffer).toString('base64') + '"'
};
exports.default = wx_method_1.default;
//# sourceMappingURL=index.js.map