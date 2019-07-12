"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
/**
 * 一些工具
 * @param str_path
 */
function writeFile(fileName, fd, data) {
    fd = fs.openSync(fileName, "w");
    fs.writeSync(fd, data || '', /*position*/ undefined, "utf8");
    return fd;
}
exports.writeFile = writeFile;
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
function copyFile(str1, str2) {
    var fd;
    fd = writeFile(str1, fd, str2);
    fs.closeSync(fd);
}
exports.copyFile = copyFile;
// export const copyFile: (str1: string, str2: string) => void = (str1: string, str2: string) => {
// 	let fd;
//       fd = writeFile(str1, fd, str2);
//       fs.closeSync(fd);
// }
