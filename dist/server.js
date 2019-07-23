"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ts = require("typescript");
var fs = require("fs");
var path = require("path");
var format_1 = require("./format");
require("./watch");
var watch_1 = require("./watch");
function whiteFile(fileName, data) {
    var fd;
    try {
        fd = fs.openSync(fileName, "w");
        fs.writeSync(fd, data, undefined, "utf8");
    }
    finally {
        if (fd !== undefined) {
            fs.closeSync(fd);
        }
    }
}
ts.sys.writeFile = function (fileName, data, writeByteOrderMark) {
    if (writeByteOrderMark) {
    }
    var fileUrl = path.normalize(fileName);
    if (watch_1.watchFiles.has('init') && !watch_1.watchFiles.has(fileUrl)) {
        return;
    }
    var filename = path.basename(fileUrl, 'js');
    var folderUrl = path.dirname(fileUrl);
    var distUrl = path.join(process.cwd(), 'dist');
    var srcUrl = path.join(process.cwd(), 'src', folderUrl.replace(distUrl, ''));
    var _a = format_1.default(data, srcUrl), js = _a.js, css = _a.css, json = _a.json, wxml = _a.wxml;
    whiteFile(fileName, js);
    css && whiteFile(path.join(folderUrl, filename + 'wxss'), css);
    json != '{}' && whiteFile(path.join(folderUrl, filename + 'json'), json);
    wxml && whiteFile(path.join(folderUrl, filename + 'wxml'), wxml);
    watch_1.watchFiles.delete(fileUrl);
};
var formatHost = {
    getCanonicalFileName: function (path) { return path; },
    getCurrentDirectory: ts.sys.getCurrentDirectory,
    getNewLine: function () { return ts.sys.newLine; }
};
function watchMain() {
    var configPath = ts.findConfigFile("./", ts.sys.fileExists, "tsconfig.json");
    if (!configPath) {
        throw new Error("Could not find a valid 'tsconfig.json'.");
    }
    var createProgram = ts.createSemanticDiagnosticsBuilderProgram;
    var host = ts.createWatchCompilerHost(configPath, {}, ts.sys, createProgram, reportDiagnostic, reportWatchStatusChanged);
    var origCreateProgram = host.createProgram;
    host.createProgram = function (rootNames, options, host, oldProgram) {
        console.log("** We're about to create the program! **");
        return origCreateProgram(rootNames, options, host, oldProgram);
    };
    var origPostProgramCreate = host.afterProgramCreate;
    host.afterProgramCreate = function (program) {
        console.log("** We finished making the program! **");
        origPostProgramCreate(program);
        watch_1.watchFiles.add('init');
    };
    ts.createWatchProgram(host);
}
function reportDiagnostic(diagnostic) {
    console.error("Error", diagnostic.code, ":", ts.flattenDiagnosticMessageText(diagnostic.messageText, formatHost.getNewLine()));
}
function reportWatchStatusChanged(diagnostic) {
    console.info(ts.formatDiagnostic(diagnostic, formatHost));
}
watchMain();
//# sourceMappingURL=server.js.map