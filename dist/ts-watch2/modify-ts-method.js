"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ts = require("typescript");
var fs = require("fs");
var path = require("path");
var parse_1 = require("./parse");
var tool_1 = require("./tool");
var creation_wx_1 = require("./wx/creation-wx");
var Style_Plugin = [];
var Template_Plugin = [];
var Render_Plugin;
/**
 * 将转换之后的代码写入磁盘中
 */
if (tool_1.isFiles(path.join(process.cwd(), 'wts.config.js'))) {
    var module_1 = require(path.join(process.cwd(), 'wts.config.js')) || {};
    if (module_1.style) {
        Style_Plugin = (module_1.style instanceof Array) ? Style_Plugin.concat(module_1.style) : Style_Plugin.concat([module_1.style]);
    }
    if (module_1.template) {
        Template_Plugin = (module_1.template instanceof Array) ? Template_Plugin.concat(module_1.template) : Template_Plugin.concat([module_1.template]);
    }
    if (module_1.parse) {
        Render_Plugin = module_1.parse;
    }
}
function splitFile(fileName, content) {
    return content;
}
function getFinalResults(type, value, fileName) {
    var plugin = type == 'template' ? Template_Plugin : Style_Plugin;
    var __value = value;
    plugin.forEach(function (data) {
        __value = data(__value, path.dirname(fileName));
    });
    return __value;
}
function writeFile(fileName, fd, data) {
    fd = fs.openSync(fileName, "w");
    fs.writeSync(fd, data || '', /*position*/ undefined, "utf8");
    return fd;
}
exports.writeFile = writeFile;
ts.sys.writeFile = function (fileName, data, writeByteOrderMark) {
    // If a BOM is required, emit one
    if (writeByteOrderMark) {
        // data = byteOrderMarkIndicator + data;
    }
    var fd, fd_wxml, fd_wxss, fd_json;
    var url = path.dirname(fileName);
    var _Name = path.basename(fileName, '.js');
    var wxData = Render_Plugin ? Render_Plugin(data, parse_1.default(data)) : creation_wx_1.default(data, parse_1.default(data));
    //   Render_Plugin && Render_Plugin(data, parse(data))
    try {
        fd = writeFile(fileName, fd, wxData.js);
        if (wxData.wxml)
            fd_wxml = writeFile(path.join(url, _Name + '.wxml'), fd_wxml, getFinalResults('template', wxData.wxml, fileName));
        if (wxData.wxss)
            fd_wxss = writeFile(path.join(url, _Name + '.wxss'), fd_wxss, getFinalResults('style', wxData.wxss, fileName));
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
};
ts.sys.readFile = function (fileName, _encoding) {
    if (!ts.sys.fileExists(fileName)) {
        return undefined;
    }
    var buffer = fs.readFileSync(fileName);
    var len = buffer.length;
    if (len >= 2 && buffer[0] === 0xFE && buffer[1] === 0xFF) {
        // Big endian UTF-16 byte order mark detected. Since big endian is not supported by node.js,
        // flip all byte pairs and treat as little endian.
        len &= ~1; // Round down to a multiple of 2
        for (var i = 0; i < len; i += 2) {
            var temp = buffer[i];
            buffer[i] = buffer[i + 1];
            buffer[i + 1] = temp;
        }
        return splitFile(fileName, buffer.toString("utf16le", 2));
    }
    if (len >= 2 && buffer[0] === 0xFF && buffer[1] === 0xFE) {
        // Little endian UTF-16 byte order mark detected
        return splitFile(fileName, buffer.toString("utf16le", 2));
    }
    if (len >= 3 && buffer[0] === 0xEF && buffer[1] === 0xBB && buffer[2] === 0xBF) {
        // UTF-8 byte order mark detected
        return splitFile(fileName, buffer.toString("utf8", 3));
    }
    // Default is UTF-8 with no byte order mark 
    return splitFile(fileName, buffer.toString("utf8"));
};
