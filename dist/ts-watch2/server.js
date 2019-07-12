"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ts = require("typescript");
require("./modify-ts-method");
var path = require("path");
var fs = require("fs");
var tool_1 = require("./tool");
require("./watch-assets");
/**
 * wts命令主服务，监听代码并转换成对应平台代码
 */
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
        // process.stdout.write(process.platform === 'win32' ? '\x1Bc' : '\x1B[2J\x1B[3J\x1B[H')
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
    //创建小程序所需文件
    // copyFile(path.join(process.cwd(),'dist','project.config.json'), ts.sys.readFile(wxConfigJsonPath))
    // copyFile(path.join(process.cwd(),'dist','sitemap.json'), ts.sys.readFile(wxSitemapJsonPath));
    tool_1.copyFile(path.join(process.cwd(), 'dist', 'method.js'), ts.sys.readFile(path.join(__dirname, '../../bin/template-method.js')));
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
    // setTimeout(function(){
    //   host.watchFile('C:\\资源\\文档\\git\\小程序js模板语法\\src\\app.ts', function(){
    //     console.log('监听')
    //   })
    //   // host.createProgram(['C:\\资源\\文档\\git\\小程序js模板语法\\src\\app.ts'], {});
    //   console.log('---')
    // },4000)
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
