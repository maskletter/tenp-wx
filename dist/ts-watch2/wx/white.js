"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var path = require("path");
var parse_1 = require("../parse");
var creation_wx_1 = require("./creation-wx");
var modify_ts_method_1 = require("../modify-ts-method");
function writeFile(fileName, fd, data) {
    fd = fs.openSync(fileName, "w");
    fs.writeSync(fd, data || '', /*position*/ undefined, "utf8");
    return fd;
}
exports.writeFile = writeFile;
exports.default = (function (fileName, data) {
    var fd, fd_wxml, fd_wxss, fd_json;
    var url = path.dirname(fileName);
    var filePath = path.normalize(url).replace(process.cwd(), '').split(path.sep);
    filePath.splice(0, 2);
    var _Name = path.basename(fileName, '.js');
    var wxData = creation_wx_1.default(data, parse_1.default(data));
    var fileOrigin = path.join(process.cwd(), 'src', filePath.join(path.sep));
    try {
        fd = writeFile(fileName, fd, wxData.js);
        if (wxData.wxml) {
            fd_wxml = writeFile(path.join(url, _Name + '.wxml'), fd_wxml, modify_ts_method_1.getFinalResults('template', wxData.wxml.replace(/{{(.+?)\|(.+?)}}/g, function (a, b, c) {
                var fun = c.split(':');
                return "{{" + fun.shift() + "(" + b + (fun.length ? ',' : '') + fun.join(',') + ")}}";
            }), fileOrigin));
        }
        if (wxData.wxss)
            fd_wxss = writeFile(path.join(url, _Name + '.wxss'), fd_wxss, modify_ts_method_1.getFinalResults('style', wxData.wxss, fileOrigin));
        if (wxData.json)
            fd_json = writeFile(path.join(url, _Name + '.json'), fd_json, wxData.json);
    }
    catch (e) {
        console.log(e);
    }
    finally {
        if (fd !== undefined) {
            fs.closeSync(fd);
        }
        if (fd_wxml !== undefined) {
            fs.closeSync(fd_wxml);
        }
        if (fd_wxss !== undefined) {
            fs.closeSync(fd_wxss);
        }
        if (fd_json !== undefined) {
            fs.closeSync(fd_json);
        }
    }
});
