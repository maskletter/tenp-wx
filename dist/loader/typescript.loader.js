"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ts = require("typescript");
var tslint = require("tslint");
var path = require("path");
var tool_1 = require("../tool");
ts.sys.writeFile = function () { };
var tsconfig = ts.readConfigFile(path.join(tool_1.cwd, 'tsconfig.json'), ts.sys.readFile).config;
var configurationFilename = path.join(tool_1.cwd, 'tslint.json');
function tslintCheck(fileName, fileContents, callback) {
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
        compile3(fileName, fileContents, callback);
    }
    else {
        callback({
            type: 'error',
            msg: [result.output]
        });
    }
}
function compile2(fileName, fileContents, callback) {
    var typescript = require("typescript");
    var options = {};
    var file = { fileName: fileName, content: fileContents };
    var compilerHost = typescript.createCompilerHost({ options: tsconfig });
    var originalGetSourceFile = compilerHost.getSourceFile;
    compilerHost.getSourceFile = function (fileName) {
        if (fileName === file.fileName) {
            file.sourceFile = file.sourceFile || typescript.createSourceFile(fileName, file.content, typescript.ScriptTarget.ES2015, true);
            return file.sourceFile;
        }
        else
            return originalGetSourceFile.call(compilerHost, fileName);
    };
    var data = '';
    compilerHost.writeFile = function (_fileName, _data, writeByteOrderMark, onError, sourceFiles) {
        _fileName = path.normalize(_fileName);
        _fileName = _fileName.substr(0, _fileName.lastIndexOf('.')) + '.ts';
        if (fileName == _fileName) {
            data = _data;
        }
    };
    var program = typescript.createProgram([file.fileName], options, compilerHost);
    var emitResult = program.emit();
    var allDiagnostics = ts
        .getPreEmitDiagnostics(program)
        .concat(emitResult.diagnostics);
    var message = allDiagnostics.map(function (diagnostic) {
        if (diagnostic.file) {
            var _a = diagnostic.file.getLineAndCharacterOfPosition(diagnostic.start), line = _a.line, character = _a.character;
            var message = ts.flattenDiagnosticMessageText(diagnostic.messageText, "\n");
            return diagnostic.file.fileName + " (" + (line + 1) + "," + (character + 1) + "): " + message;
        }
        else {
            return ts.flattenDiagnosticMessageText(diagnostic.messageText, "\n");
        }
    });
    if (message.length == 0) {
        callback({ type: 'success', data: data });
    }
    else {
        callback({ type: 'error', msg: message });
    }
}
function compile3(fileName, fileContents, callback) {
    var parseConfigHost = {
        readDirectory: ts.sys.readDirectory,
    };
    var parsed = ts.parseJsonConfigFileContent(tsconfig, parseConfigHost, '');
    var file = { fileName: fileName, content: fileContents };
    var program = ts.createProgram([file.fileName], parsed.options);
    var emitResult = program.emit();
    var allDiagnostics = ts
        .getPreEmitDiagnostics(program)
        .concat(emitResult.diagnostics);
    var message = allDiagnostics.map(function (diagnostic) {
        if (diagnostic.file) {
            var _a = diagnostic.file.getLineAndCharacterOfPosition(diagnostic.start), line = _a.line, character = _a.character;
            var message = ts.flattenDiagnosticMessageText(diagnostic.messageText, "\n");
            return diagnostic.file.fileName + " (" + (line + 1) + "," + (character + 1) + "): " + message;
        }
        else {
            return ts.flattenDiagnosticMessageText(diagnostic.messageText, "\n");
        }
    });
    if (message.length == 0) {
        callback({ type: 'success', data: ts.transpileModule(fileContents, tsconfig) });
    }
    else {
        callback({ type: 'error1', msg: message });
    }
}
exports.default = (function (file, options) {
    return new Promise(function (resolve, reject) {
        var content = file.toString();
        tslintCheck(options.fileName, content, function (result) {
            if (result.type == 'error') {
                reject(result.msg);
            }
            else {
                resolve([
                    { type: 'js', content: result.data.outputText }
                ]);
            }
        });
    });
});
//# sourceMappingURL=typescript.loader.js.map