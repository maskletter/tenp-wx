
import * as ts from 'typescript'
import * as tslint from 'tslint'
import * as fs from 'fs';
import * as path from 'path';
import { cwd } from '../tool'
import { WatchOptions } from '../server'


ts.sys.writeFile = function(){}

const tsconfig: ts.TranspileOptions = ts.readConfigFile(path.join(cwd,'tsconfig.json'), ts.sys.readFile).config;
const configurationFilename = path.join(cwd, 'tslint.json');

function tslintCheck(fileName: string, fileContents: string,callback: Function){
    const options = {
        fix: false,
        out: true,
        formatter: "prose",
        project: "tsconfig.json",
        // formatter: "json",
    };
    const linter: tslint.Linter = new tslint.Linter(options);
    const configuration: tslint.Configuration.IConfigurationFile = tslint.Configuration.findConfiguration(configurationFilename, fileName).results;
    linter.lint(fileName, fileContents, configuration);
    const result = linter.getResult();
    if(result.output == '\n'){
        compile3(fileName, fileContents, callback)  
    }else{
        callback({
            type: 'error',
            msg: [result.output]
        })
        // console.log('\x1B[31m'+result.output+'\x1B[39m')
    }
}

function compile2(fileName: string, fileContents: string, callback: Function){
    const typescript = require("typescript");

    const options = {};
    const file: any = {fileName: fileName, content: fileContents };

    const compilerHost = typescript.createCompilerHost({options: tsconfig});
    const originalGetSourceFile = compilerHost.getSourceFile;
    compilerHost.getSourceFile = (fileName: string) => {
        if (fileName === file.fileName) {
            file.sourceFile = file.sourceFile || typescript.createSourceFile(fileName, file.content, typescript.ScriptTarget.ES2015, true);
            return file.sourceFile;
        }
        else  return originalGetSourceFile.call(compilerHost, fileName);
    };
    let data = '';
    compilerHost.writeFile = (_fileName: string, _data: string, writeByteOrderMark: boolean, onError: any, sourceFiles: any) => {
        _fileName = path.normalize(_fileName);
        _fileName = _fileName.substr(0,_fileName.lastIndexOf('.'))+'.ts';
        if(fileName == _fileName){
            data = _data;
        }
    };

    const program = typescript.createProgram([file.fileName], options, compilerHost);
    let emitResult = program.emit();
    var allDiagnostics = ts
        .getPreEmitDiagnostics(program)
        .concat(emitResult.diagnostics);

    const message = allDiagnostics.map(function (diagnostic) {
        if (diagnostic.file) {
            var _a = diagnostic.file.getLineAndCharacterOfPosition(diagnostic.start), line = _a.line, character = _a.character;
            var message = ts.flattenDiagnosticMessageText(diagnostic.messageText, "\n");
            return diagnostic.file.fileName + " (" + (line + 1) + "," + (character + 1) + "): " + message;
        }
        else {
            return ts.flattenDiagnosticMessageText(diagnostic.messageText, "\n");
        }
    });
   
    if(message.length == 0){
        callback({ type: 'success', data: data })
    }else{
        callback({ type: 'error', msg: message })
    }
}

function compile3(fileName: string, fileContents: string, callback: Function){
    // const typescript = require("typescript");
    const parseConfigHost: any = {
        // fileExists: fs.existsSync,
        readDirectory: ts.sys.readDirectory,
        // readFile: (file: any) => fs.readFileSync(file, 'utf8'),
        // useCaseSensitiveFileNames: true,
      };
    const parsed  = ts.parseJsonConfigFileContent(tsconfig, parseConfigHost, '')
   
    const file: any = {fileName: fileName, content: fileContents };
   
    const program = ts.createProgram([file.fileName], parsed.options);
    let emitResult = program.emit();
    var allDiagnostics = ts
        .getPreEmitDiagnostics(program)
        .concat(emitResult.diagnostics);
    const message = allDiagnostics.map(function (diagnostic) {
        if (diagnostic.file) {
            var _a = diagnostic.file.getLineAndCharacterOfPosition(diagnostic.start), line = _a.line, character = _a.character;
            var message = ts.flattenDiagnosticMessageText(diagnostic.messageText, "\n");
            return diagnostic.file.fileName + " (" + (line + 1) + "," + (character + 1) + "): " + message;
        }
        else {
            return ts.flattenDiagnosticMessageText(diagnostic.messageText, "\n");
        }
    });
   
    if(message.length == 0){
        callback({ type: 'success', data: ts.transpileModule(fileContents, tsconfig) })
    }else{
        callback({ type: 'error1', msg: message })
    }
}

export default (file: Buffer, options: WatchOptions): Promise<any> => {

	return new Promise((resolve, reject) => {
		const content: string = file.toString();	
		tslintCheck(options.fileName, content, (result: any) => {
            if(result.type == 'error'){
                reject(result.msg);
            }else{
                resolve([
                    {  type: 'js', content: result.data.outputText }
                ])
            }
		})
	})
	


}