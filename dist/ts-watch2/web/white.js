"use strict";
/**
 * 未完成
 */
Object.defineProperty(exports, "__esModule", { value: true });
var parse_1 = require("../parse");
var creation_wx_1 = require("./creation-wx");
exports.default = (function (fileName, data) {
    creation_wx_1.default(data, parse_1.default(data));
});
