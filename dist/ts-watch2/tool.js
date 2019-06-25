"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
/**
 * 一些工具
 * @param str_path
 */
function isPresence(str_path) {
    return fs.existsSync(str_path);
}
exports.isPresence = isPresence;
function isDirectory(str_path) {
    if (!isPresence(str_path)) {
        return false;
    }
    else {
        var stat = fs.statSync(str_path);
        return stat.isDirectory();
    }
}
exports.isDirectory = isDirectory;
function isFiles(str_path) {
    if (!isPresence(str_path)) {
        return false;
    }
    else {
        var stat = fs.statSync(str_path);
        return !stat.isDirectory();
    }
}
exports.isFiles = isFiles;
