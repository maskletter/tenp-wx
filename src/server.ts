import ts = require("typescript");
import * as fs from 'fs';
import * as path from 'path';
import format from './format';
import './watch';
import { watchFiles } from './watch';
import { setDirectory } from './include-modules'


function whiteFile(fileName: string, data: string){
  var fd;
  try {
      fd = fs.openSync(fileName, "w");
      fs.writeSync(fd, data, /*position*/ undefined, "utf8");
  }
  finally {
      if (fd !== undefined) {
          fs.closeSync(fd);
      }
  }
}


ts.sys.writeFile = function (fileName: string, data: string, writeByteOrderMark: boolean) {


      // If a BOM is required, emit one
      if (writeByteOrderMark) {
          // data = byteOrderMarkIndicator + data;
      }
      let fileUrl: string = path.normalize(fileName);


      if(watchFiles.has('init') && !watchFiles.has(fileUrl)){
        return ;
      }

      let filename: string = path.basename(fileUrl,'js')
      let folderUrl: string = path.dirname(fileUrl)
      let distUrl: string = path.join(process.cwd(), 'dist')
      let srcUrl: string = path.join(process.cwd(),'src',folderUrl.replace(distUrl, ''))
      const { js, css, json, wxml } = format(data,srcUrl)
      whiteFile(fileName, js)
      css && whiteFile(path.join(folderUrl,filename+'wxss'), css)
      json != '{}' && whiteFile(path.join(folderUrl,filename+'json'), json)
      wxml && whiteFile(path.join(folderUrl,filename+'wxml'), wxml)
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

  // TypeScript can use several different program creation "strategies":
  //  * ts.createEmitAndSemanticDiagnosticsBuilderProgram,
  //  * ts.createSemanticDiagnosticsBuilderProgram
  //  * ts.createAbstractBuilder
  // The first two produce "builder programs". These use an incremental strategy
  // to only re-check and emit files whose contents may have changed, or whose
  // dependencies may have changes which may impact change the result of prior
  // type-check and emit.
  // The last uses an ordinary program which does a full type check after every
  // change.
  // Between `createEmitAndSemanticDiagnosticsBuilderProgram` and
  // `createSemanticDiagnosticsBuilderProgram`, the only difference is emit.
  // For pure type-checking scenarios, or when another tool/process handles emit,
  // using `createSemanticDiagnosticsBuilderProgram` may be more desirable.
  const createProgram = ts.createSemanticDiagnosticsBuilderProgram;

  // Note that there is another overload for `createWatchCompilerHost` that takes
  // a set of root files.
  const host = ts.createWatchCompilerHost(
    configPath,
    {},
    ts.sys,
    createProgram,
    reportDiagnostic,
    reportWatchStatusChanged
  );

  // You can technically override any given hook on the host, though you probably
  // don't need to.
  // Note that we're assuming `origCreateProgram` and `origPostProgramCreate`
  // doesn't use `this` at all.
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
    origPostProgramCreate!(program);
    watchFiles.add('init');
  };

  // `createWatchProgram` creates an initial program, watches files, and updates
  // the program over time.
  ts.createWatchProgram(host);
}

function reportDiagnostic(diagnostic: ts.Diagnostic) {
  console.error(
    "Error",
    diagnostic.code,
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
  setDirectory();
  console.info(ts.formatDiagnostic(diagnostic, formatHost));
}

watchMain();