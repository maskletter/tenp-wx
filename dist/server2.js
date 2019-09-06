"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ts = require("typescript");
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
    var createProgram = ts.createSemanticDiagnosticsBuilderProgram;
    // Note that there is another overload for `createWatchCompilerHost` that takes
    // a set of root files.
    var host = ts.createWatchCompilerHost(configPath, {}, ts.sys, createProgram, reportDiagnostic, reportWatchStatusChanged);
    // You can technically override any given hook on the host, though you probably
    // don't need to.
    // Note that we're assuming `origCreateProgram` and `origPostProgramCreate`
    // doesn't use `this` at all.
    var origCreateProgram = host.createProgram;
    host.createProgram = function (rootNames, options, host, oldProgram) {
        console.log("** We're about to create the program! **");
        return origCreateProgram(rootNames, options, host, oldProgram);
    };
    var origPostProgramCreate = host.afterProgramCreate;
    host.afterProgramCreate = function (program) {
        console.log("** We finished making the program! **");
        origPostProgramCreate(program);
    };
    // `createWatchProgram` creates an initial program, watches files, and updates
    // the program over time.
    ts.createWatchProgram(host);
}
function reportDiagnostic(diagnostic) {
    console.error("Error", diagnostic.code, ":", ts.flattenDiagnosticMessageText(diagnostic.messageText, formatHost.getNewLine()));
}
/**
 * Prints a diagnostic every time the watch status changes.
 * This is mainly for messages like "Starting compilation" or "Compilation completed".
 */
function reportWatchStatusChanged(diagnostic) {
    console.info(ts.formatDiagnostic(diagnostic, formatHost));
}
watchMain();
//# sourceMappingURL=server2.js.map