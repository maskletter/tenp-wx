"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("./index");
exports.default = (function (content, options) {
    var outPut = {};
    var _a = index_1.default(content, options), js = _a.js, wxss = _a.wxss, wxml = _a.wxml, json = _a.json;
    outPut.js = { content: js };
    json != '{}' && (outPut.json = { content: json });
    wxss && (outPut.wxss = { content: wxss });
    wxml && (outPut.wxml = { content: wxml });
    return outPut;
});
//# sourceMappingURL=wx.loader.js.map