"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ts = require("typescript");
var fs = require("fs");
var path = require("path");
var tool_1 = require("./tool");
var white_1 = require("./wx/white");
var white_2 = require("./web/white");
var global_config_1 = require("../global.config");
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
    if (module_1.SystemDataAttr) {
        for (var key in module_1.SystemDataAttr) {
            global_config_1.setSystemDataAttr(key, module_1.SystemDataAttr[key]);
        }
    }
}
function splitFile(fileName, content) {
    return content;
}
function getFinalResults(type, value, fileName) {
    var plugin = type == 'template' ? Template_Plugin : Style_Plugin;
    var __value = value;
    plugin.forEach(function (data) {
        __value = data(__value, fileName);
    });
    return __value;
}
exports.getFinalResults = getFinalResults;
ts.sys.writeFile = function (fileName, data, writeByteOrderMark) {
    // If a BOM is required, emit one
    if (writeByteOrderMark) {
        // data = byteOrderMarkIndicator + data;
    }
    //   const wxData: any = Render_Plugin ? Render_Plugin(data, parse(data)): creationWx(data, parse(data));
    if (process.argv.indexOf('--wx') != -1) {
        white_1.default(fileName, data);
    }
    else if (process.argv.indexOf('--web') != -1) {
        white_2.default(fileName, data);
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
