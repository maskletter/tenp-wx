"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var ts = require("typescript");
var fs = require("fs");
var path = require("path");
var tslint = require("tslint");
var tool_1 = require("./tool");
var wx_loader_1 = require("./loader/wx/wx.loader");
var watch_1 = require("./watch");
var wxToolUrl = tool_1.findArgv('--wxurl').replace(/tenp_nbsp/g, ' ');
var programInit = false;
var configurationFilename = path.join(process.cwd(), "./tslint.json");
var StatusPath = path.join(tool_1.cwd, 'src');
var ConversionPath = path.join(tool_1.cwd, 'dist');
exports.methodAssociation = new Map();
exports.getAssociation = function (name) {
    return exports.methodAssociation.get(name);
};
var logErrors = function (content, alert) {
    if (alert === void 0) { alert = '$error'; }
    if (content instanceof Array) {
        content.forEach(function (msg) {
            console.log('\x1B[31m ' + alert + '  ' + msg + '\x1B[39m');
        });
    }
    else if (typeof (content) == 'string') {
        console.log("\u001B[31m " + alert + "  " + content + "\u001B[39m");
    }
    else if (typeof (content) == 'object') {
        console.log('\x1B[31m ' + alert + '  ' + JSON.stringify(content, null, 2) + '\x1B[39m');
    }
};
var logMessage = function (message) {
    console.log(' $message  ' + message);
};
function tslintCheck(fileName, fileContents) {
    var options = {
        fix: false,
        out: true,
        formatter: "prose",
        project: "tsconfig.json",
    };
    var linter = new tslint.Linter(options);
    var configuration = tslint.Configuration.findConfiguration(configurationFilename, fileName).results;
    linter.lint(fileName, fileContents, configuration);
    var result = linter.getResult();
    if (result.output == '\n') {
        return {
            type: 'success',
            msg: result
        };
    }
    else {
        return {
            type: 'error',
            msg: [result.output]
        };
    }
}
function readFile(fileName, _encoding) {
    if (!path.isAbsolute(fileName)) {
        fileName = path.join(tool_1.cwd, fileName);
    }
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
        buffer = buffer.toString("utf16le", 2);
    }
    if (len >= 2 && buffer[0] === 0xFF && buffer[1] === 0xFE) {
        // Little endian UTF-16 byte order mark detected
        buffer = buffer.toString("utf16le", 2);
    }
    if (len >= 3 && buffer[0] === 0xEF && buffer[1] === 0xBB && buffer[2] === 0xBF) {
        // UTF-8 byte order mark detected
        buffer = buffer.toString("utf8", 3);
    }
    buffer = buffer.toString("utf8");
    if (path.normalize(fileName).indexOf(path.join(process.cwd(), 'src')) == 0) {
        var result = tslintCheck(fileName, buffer);
        if (result.type == 'error') {
            result.msg.forEach(function (v) { return logErrors(v, ''); });
            buffer = '`' + result.msg + '`';
        }
    }
    buffer.replace(/@(.+?)\(([\s\S]+?)export default class (.+?)(\{|\extends|implements)/g, function (a, b, c, d) {
        exports.methodAssociation.set(path.normalize(fileName), { type: b, name: d.trim() });
        // packageName = d;
        return '';
    });
    // Default is UTF-8 with no byte order mark
    return buffer;
}
ts.sys.readFile = readFile;
var writeFile = function (fileName, data, writeByteOrderMark) {
    // If a BOM is required, emit one
    if (writeByteOrderMark) {
        // data = byteOrderMarkIndicator + data;
    }
    var fileUrl = path.normalize(fileName);
    var relativeUrl = fileUrl.replace(ConversionPath, '');
    var statusPath = path.join(StatusPath, relativeUrl);
    var _fileName = path.basename(fileName).split('.js')[0];
    var dir = path.dirname(statusPath);
    var buildDirectoryUrl = path.dirname(fileName);
    var a = {
        fileName: fileUrl,
        buildDirectoryUrl: buildDirectoryUrl,
        srcDirectoryUrl: dir,
        fileNoSuffixName: _fileName
    };
    if (watch_1.watchFiles.has('init') && !watch_1.watchFiles.has(fileUrl)) {
        return;
    }
    var fileMap = wx_loader_1.default(data, a);
    // console.log(fileName)
    for (var key in fileMap) {
        fs.writeFileSync(path.join(a.buildDirectoryUrl, (fileMap[key].name || _fileName) + '.' + key), fileMap[key].content);
    }
    watch_1.watchFiles.delete(fileUrl);
};
var formatHost = {
    getCanonicalFileName: function (path) { return path; },
    getCurrentDirectory: ts.sys.getCurrentDirectory,
    getNewLine: function () { return ts.sys.newLine; }
};
function watchMain() {
    var configPath = ts.findConfigFile(
    /*searchPath*/ "./", ts.sys.fileExists, "tsconfig.json");
    if (!configPath) {
        throw new Error("Could not find a valid 'tsconfig.json'.");
    }
    var createProgram = ts.createSemanticDiagnosticsBuilderProgram;
    // Note that there is another overload for `createWatchCompilerHost` that takes
    // a set of root files.
    var host = ts.createWatchCompilerHost(configPath, {}, __assign({}, ts.sys, { writeFile: writeFile }), createProgram, reportDiagnostic, reportWatchStatusChanged);
    var origCreateProgram = host.createProgram;
    host.createProgram = function (rootNames, options, host, oldProgram) {
        console.log("** We're about to create the program! **");
        return origCreateProgram(rootNames, options, host, oldProgram);
    };
    var origPostProgramCreate = host.afterProgramCreate;
    host.afterProgramCreate = function (program) {
        console.log("** We finished making the program! **");
        if (programInit == false) {
            if (tool_1.findArgv('--open') == 'true')
                tool_1.startWxTool(wxToolUrl, path.join(tool_1.cwd, 'dist'));
            programInit = true;
        }
        origPostProgramCreate(program);
    };
    ts.createWatchProgram(host);
}
function reportDiagnostic(diagnostic) {
    var title = diagnostic.file ? diagnostic.file.fileName.replace(tool_1.cwd, '') : '';
    console.error("Error", title, ":", ts.flattenDiagnosticMessageText(diagnostic.messageText, formatHost.getNewLine()));
}
/**
 * Prints a diagnostic every time the watch status changes.
 * This is mainly for messages like "Starting compilation" or "Compilation completed".
 */
function reportWatchStatusChanged(diagnostic) {
    // if(diagnostic.messageText.indexOf('Starting') != 0)
    //   watchFiles.add('init');
    console.info(ts.formatDiagnostic(diagnostic, formatHost));
}
watchMain();
/*---------------------------全局错误监听---------------------------------*/
process.on('SIGINT', function () {
    closeNode();
});
process.on('uncaughtException', function (err) {
    //打印出错误
    console.log(err);
    //打印出错误的调用栈方便调试
    console.log(err.stack);
    closeNode();
});
/*---------------------------关闭进程---------------------------------*/
function closeNode() {
    // console.log()
    // process_server.kill();
    logMessage('等待系统退出中...');
    if (tool_1.findArgv('--open') == 'true')
        tool_1.closeWxTool(wxToolUrl, path.join(tool_1.cwd, 'dist'));
    setTimeout(function () {
        process.exit();
    }, 500);
}
//# sourceMappingURL=server.js.map