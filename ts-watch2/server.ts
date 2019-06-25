import * as ts from 'typescript';

import * as path from 'path';
import * as fs from 'fs';
import { writeFile } from './modify-ts-method';
import { isDirectory } from './tool'
import './watch-assets'

/**
 * wts命令主服务，监听代码并转换成对应平台代码
 */

// https://astexplorer.net/

const formatHost: any = {
    getCanonicalFileName: function (path: string) { return path; },
    getCurrentDirectory: ts.sys.getCurrentDirectory,
    getNewLine: function () { return ts.sys.newLine; }
};

tsWatch(function(){ 
  // process.exit();
    
}, (err: any) => {
    const text = ts.flattenDiagnosticMessageText(err.messageText, formatHost.getNewLine());
    console.log(`Error ${text}`)
});


function tsWatch(process_server: any, error: any){

    let CompileError = false;
    var configPath: any = ts.findConfigFile(

    /*searchPath*/ "./", ts.sys.fileExists, "tsconfig.json");
    if (!configPath) {
        return console.log(' tenp error: 未发现tsconfig配置文件')
    }

    var createProgram = ts.createSemanticDiagnosticsBuilderProgram;

    var host = ts.createWatchCompilerHost(configPath, {}, ts.sys, createProgram, <any>reportDiagnostic, reportWatchStatusChanged);
    var origCreateProgram = host.createProgram;
    var createProgramConfig: any = {};
    host.createProgram = function (rootNames: any, options: any, host: any, oldProgram: any) {
        process.stdout.write(process.platform === 'win32' ? '\x1Bc' : '\x1B[2J\x1B[3J\x1B[H')
        console.log("** 即将开始typescript文件监听! **");
        CompileError = false;
        createProgramConfig = { rootNames, options, host, oldProgram };
        return origCreateProgram(rootNames, options, host, oldProgram);
    };

    const wxConfigJsonPath = path.join(process.cwd(),'project.config.json');
    const wxSitemapJsonPath = path.join(process.cwd(),'sitemap.json');
    if(!isDirectory(path.join(process.cwd(),'dist'))){
      fs.mkdirSync(path.join(process.cwd(),'dist'));
    }
    let fd;
      fd = writeFile(path.join(process.cwd(),'dist','project.config.json'), fd, ts.sys.readFile(wxConfigJsonPath));
      fs.closeSync(fd);
    let fd2;
      fd2 = writeFile(path.join(process.cwd(),'dist','sitemap.json'), fd2, ts.sys.readFile(wxSitemapJsonPath));
      fs.closeSync(fd2);
    let fd3;
      fd3 = writeFile(path.join(process.cwd(),'dist','method.js'), fd3, ts.sys.readFile(path.join(__dirname,'../../bin/template-method.js')));
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

    host.afterProgramCreate = function (program: any) {
        console.log("** typescript文件监听已完成! **");
        origPostProgramCreate(program);
        if(process.argv.indexOf('--build') != -1){
          process.exit();
        }else{
          process_server();
        }
    };
    // `createWatchProgram` creates an initial program, watches files, and updates
    // the program over time.
    // ts.createWatchProgram(host);
    watcherChangeEvent(wxConfigJsonPath)

    function reportDiagnostic(diagnostic: any, loaderOptions: any, colors: any, compiler: any, merge: any) {
          CompileError = true;
         let message = ts.flattenDiagnosticMessageText(diagnostic.messageText, "\n");
          if (diagnostic.file) {
            let { line, character } = diagnostic.file.getLineAndCharacterOfPosition(
              diagnostic.start
            );
           console.error(
              `  Error ${diagnostic.file.fileName} (${line + 1},${character +
                1}): ${message}`
            );
          } else {
            console.error(`  Error: ${message}`);
          }
      
        error(diagnostic)
    }
    function watcherChangeEvent(filePath: string) {
      ts.createWatchProgram(host);
    }
    /**
     * Prints a diagnostic every time the watch status changes.
     * This is mainly for messages like "Starting compilation" or "Compilation completed".
     */
    function reportWatchStatusChanged(diagnostic: any) {
        const error = ts.formatDiagnostic(diagnostic, formatHost);
        console.log('\r\n '+error);
    }

}

