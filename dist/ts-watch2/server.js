"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ts = require("typescript");
var path = require("path");
var fs = require("fs");
var modify_ts_method_1 = require("./modify-ts-method");
var tool_1 = require("./tool");
require("./watch-assets");
// https://astexplorer.net/
var formatHost = {
    getCanonicalFileName: function (path) { return path; },
    getCurrentDirectory: ts.sys.getCurrentDirectory,
    getNewLine: function () { return ts.sys.newLine; }
};
tsWatch(function () {
    // process.exit();
}, function (err) {
    var text = ts.flattenDiagnosticMessageText(err.messageText, formatHost.getNewLine());
    console.log("Error " + text);
});
function tsWatch(process_server, error) {
    var CompileError = false;
    var configPath = ts.findConfigFile(
    /*searchPath*/ "./", ts.sys.fileExists, "tsconfig.json");
    if (!configPath) {
        return console.log(' tenp error: 未发现tsconfig配置文件');
    }
    var createProgram = ts.createSemanticDiagnosticsBuilderProgram;
    var host = ts.createWatchCompilerHost(configPath, {}, ts.sys, createProgram, reportDiagnostic, reportWatchStatusChanged);
    var origCreateProgram = host.createProgram;
    var createProgramConfig = {};
    host.createProgram = function (rootNames, options, host, oldProgram) {
        process.stdout.write(process.platform === 'win32' ? '\x1Bc' : '\x1B[2J\x1B[3J\x1B[H');
        console.log("** 即将开始typescript文件监听! **");
        CompileError = false;
        createProgramConfig = { rootNames: rootNames, options: options, host: host, oldProgram: oldProgram };
        return origCreateProgram(rootNames, options, host, oldProgram);
    };
    var wxConfigJsonPath = path.join(process.cwd(), 'project.config.json');
    var wxSitemapJsonPath = path.join(process.cwd(), 'sitemap.json');
    if (!tool_1.isDirectory(path.join(process.cwd(), 'dist'))) {
        fs.mkdirSync(path.join(process.cwd(), 'dist'));
    }
    var fd;
    fd = modify_ts_method_1.writeFile(path.join(process.cwd(), 'dist', 'project.config.json'), fd, ts.sys.readFile(wxConfigJsonPath));
    fs.closeSync(fd);
    var fd2;
    fd2 = modify_ts_method_1.writeFile(path.join(process.cwd(), 'dist', 'sitemap.json'), fd2, ts.sys.readFile(wxSitemapJsonPath));
    fs.closeSync(fd2);
    var fd3;
    fd3 = modify_ts_method_1.writeFile(path.join(process.cwd(), 'dist', 'method.js'), fd3, ts.sys.readFile(path.join(__dirname, '../../bin/template-method.js')));
    fs.closeSync(fd3);
    // const watcher = chokidar.watch([path.join(process.cwd(),'src'),wxConfigJsonPath], {
    //   ignored: /^(\s|\S)+(ts|js|tsx|jsx)+$/,
    //   persistent: true
    // })
    // watcher.on('change', function(path){;
    //   console.log(`${path}发生了变化`)
    //   watcherChangeEvent(path) 
    // });
    var origPostProgramCreate = host.afterProgramCreate;
    host.afterProgramCreate = function (program) {
        console.log("** typescript文件监听已完成! **");
        origPostProgramCreate(program);
        if (process.argv.indexOf('--build') != -1) {
            process.exit();
        }
        else {
            process_server();
        }
    };
    // `createWatchProgram` creates an initial program, watches files, and updates
    // the program over time.
    // ts.createWatchProgram(host);
    watcherChangeEvent(wxConfigJsonPath);
    function reportDiagnostic(diagnostic, loaderOptions, colors, compiler, merge) {
        CompileError = true;
        var message = ts.flattenDiagnosticMessageText(diagnostic.messageText, "\n");
        if (diagnostic.file) {
            var _a = diagnostic.file.getLineAndCharacterOfPosition(diagnostic.start), line = _a.line, character = _a.character;
            console.error("  Error " + diagnostic.file.fileName + " (" + (line + 1) + "," + (character +
                1) + "): " + message);
        }
        else {
            console.error("  Error: " + message);
        }
        error(diagnostic);
    }
    function watcherChangeEvent(filePath) {
        ts.createWatchProgram(host);
    }
    /**
     * Prints a diagnostic every time the watch status changes.
     * This is mainly for messages like "Starting compilation" or "Compilation completed".
     */
    function reportWatchStatusChanged(diagnostic) {
        var error = ts.formatDiagnostic(diagnostic, formatHost);
        console.log('\r\n ' + error);
    }
}
