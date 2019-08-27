import ts = require("typescript");
import * as fs from 'fs';
import * as path from 'path';
import * as tslint from 'tslint'
import { cwd, findArgv, runSpawn, startWxTool, closeWxTool } from './tool'
import wxLoader from './loader/wx/wx.loader'
import { watchFiles } from './watch';


const wxToolUrl: string = (findArgv('--wxurl') as string).replace(/tenp_nbsp/g,' ');
let programInit:  boolean = false;
const configurationFilename = path.join(process.cwd(),"./tslint.json");
const StatusPath = path.join(cwd, 'src');
const ConversionPath  = path.join(cwd, 'dist');


export const methodAssociation: Map<string,{ type: string, name: string }> = new Map();
export const getAssociation = (name: string) => {
  return methodAssociation.get(name)
}

const logErrors = (content: string|object|string[], alert: string = '$error'): void => {
  if(content instanceof Array){
    content.forEach((msg: string) => {
      console.log('\x1B[31m '+alert+'  '+msg+'\x1B[39m')    
    })
  }else if(typeof(content) == 'string'){
    console.log(`\x1B[31m ${alert}  ${content}\x1B[39m`)    
  }else if(typeof(content) == 'object'){  
    console.log('\x1B[31m '+alert+'  '+JSON.stringify(content, null, 2)+'\x1B[39m')  
  }
}
const logMessage = (message: string): void => {
  console.log(' $message  '+message)
}


function tslintCheck(fileName: any, fileContents: string){
    var options = {
        fix: false,
        out: true,
        formatter: "prose",
        project: "tsconfig.json",
        // formatter: "json",
    };
    var linter = new tslint.Linter(options);
    var configuration = tslint.Configuration.findConfiguration(configurationFilename, fileName).results;
    linter.lint(fileName, fileContents, configuration);
    var result = linter.getResult();
    if(result.output == '\n'){
        return {
            type: 'success',
            msg: result
        }
    }else{
        return {
            type: 'error',
            msg: [result.output]
        }
    }
}

function readFile(fileName: string, _encoding: string) {
  
    if(!path.isAbsolute(fileName)){
      fileName = path.join(cwd,fileName)
    }

    if (!ts.sys.fileExists(fileName)) {
        return undefined;
    }
    var buffer: any = fs.readFileSync(fileName);
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
    if(path.normalize(fileName).indexOf(path.join(process.cwd(),'src')) == 0){
      const result: any = tslintCheck(fileName,buffer)
      if(result.type == 'error'){
        result.msg.forEach((v: string) => logErrors(v,''));
        buffer = '`'+result.msg+'`';
      }
    }
    buffer.replace(/@(.+?)\(([\s\S]+?)export default class (.+?)(\{|\extends|implements)/g, function(a:string,b:string,c:string,d:string){
      
      methodAssociation.set(path.normalize(fileName), { type: b, name: d.trim() })
      // packageName = d;
      return '';
    })
    
    // Default is UTF-8 with no byte order mark
    return buffer;
}
ts.sys.readFile = readFile;

const writeFile = function (fileName: string, data: string, writeByteOrderMark: boolean) {


      // If a BOM is required, emit one
      if (writeByteOrderMark) {
          // data = byteOrderMarkIndicator + data;
      }
      let fileUrl: string = path.normalize(fileName);
      let relativeUrl: string = fileUrl.replace(ConversionPath,'');
      const statusPath: string = path.join(StatusPath, relativeUrl);
      const _fileName: string = path.basename(fileName).split('.js')[0];
      const dir: string = path.dirname(statusPath);
      const buildDirectoryUrl: string = path.dirname(fileName);
      let a = {
        fileName: fileUrl, 
        buildDirectoryUrl: buildDirectoryUrl,
        srcDirectoryUrl: dir,
        fileNoSuffixName: _fileName
       }

      if(watchFiles.has('init') && !watchFiles.has(fileUrl)){
        return ;
      }

       let fileMap = wxLoader(data,a);
       // console.log(fileName)
       for(let key in fileMap){
          fs.writeFileSync(path.join(a.buildDirectoryUrl, (fileMap[key].name||_fileName)+'.'+key), fileMap[key].content);
        }
       watchFiles.delete(fileUrl)
  }

const formatHost: ts.FormatDiagnosticsHost = {
  getCanonicalFileName: path => path,
  getCurrentDirectory: ts.sys.getCurrentDirectory,
  getNewLine: () => ts.sys.newLine
};

function watchMain() {
  const configPath = ts.findConfigFile(
    /*searchPath*/ "./",
    ts.sys.fileExists,
    "tsconfig.json"
  );
  if (!configPath) {
    throw new Error("Could not find a valid 'tsconfig.json'.");
  }

 
  const createProgram = ts.createSemanticDiagnosticsBuilderProgram;

  // Note that there is another overload for `createWatchCompilerHost` that takes
  // a set of root files.
  const host = ts.createWatchCompilerHost(
    configPath,
    {},
    { ...ts.sys, writeFile: writeFile },
    createProgram,
    reportDiagnostic,
    reportWatchStatusChanged
  );

  const origCreateProgram = host.createProgram;
  host.createProgram = (
    rootNames: ReadonlyArray<string>,
    options,
    host,
    oldProgram
  ) => {
    console.log("** We're about to create the program! **");
    return origCreateProgram(rootNames, options, host, oldProgram);
  };
  const origPostProgramCreate = host.afterProgramCreate;

  host.afterProgramCreate = program => {
    console.log("** We finished making the program! **");
    if(programInit == false){
      if(findArgv('--open') == 'true') startWxTool(wxToolUrl,path.join(cwd, 'dist'));
      programInit = true;
    }
    origPostProgramCreate!(program);
  };

  ts.createWatchProgram(host);
}

function reportDiagnostic(diagnostic: ts.Diagnostic) {
  const title: string = diagnostic.file ? diagnostic.file.fileName.replace(cwd,'') : ''
  console.error(
    "Error",
    title,
    ":",
    ts.flattenDiagnosticMessageText(
      diagnostic.messageText,
      formatHost.getNewLine()
    )
  );
}

/**
 * Prints a diagnostic every time the watch status changes.
 * This is mainly for messages like "Starting compilation" or "Compilation completed".
 */
function reportWatchStatusChanged(diagnostic: ts.Diagnostic) {
    
    // if(diagnostic.messageText.indexOf('Starting') != 0)
    //   watchFiles.add('init');
  console.info(ts.formatDiagnostic(diagnostic, formatHost));
}

watchMain();


/*---------------------------全局错误监听---------------------------------*/
process.on('SIGINT', function(){
  closeNode();
})
process.on('uncaughtException', function (err) {
    //打印出错误
    console.log(err);
    //打印出错误的调用栈方便调试
    console.log(err.stack); 
  closeNode();
});

/*---------------------------关闭进程---------------------------------*/
function closeNode(){
  // console.log()
  // process_server.kill();
  logMessage('等待系统退出中...')
  if(findArgv('--open') == 'true') closeWxTool(wxToolUrl, path.join(cwd, 'dist'))
  setTimeout(() => {
    process.exit()
  }, 500)
}