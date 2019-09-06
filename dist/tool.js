"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var path = require("path");
var child_process_1 = require("child_process");
exports.cwd = process.cwd();
var argv = process.argv.slice(2, process.argv.length);
/** 搜寻目录内的文件 */
exports.findFiles = function (_a, reg) {
    var type = _a.type, value = _a.value, _path = _a.path, callback = _a.callback;
    reg = reg || (type == 'suffix' ? new RegExp('^(\\s|\\S)+(' + value.join('|') + ')+$') : new RegExp('^' + value.join('|') + '+$'));
    var list = fs.readdirSync(_path);
    list.forEach(function (file) {
        var fileName = path.join(_path, file);
        var stat = fs.statSync(fileName);
        if (stat && stat.isDirectory()) {
            exports.findFiles({ type: type, value: value, path: fileName, callback: callback }, reg);
        }
        else if (reg.test(file)) {
            callback({ fileName: fileName });
            // fileSet.add(fileName)
        }
    });
};
exports.mkdirsSync = function (dirname) {
    if (fs.existsSync(dirname)) {
        return true;
    }
    else {
        if (exports.mkdirsSync(path.dirname(dirname))) {
            fs.mkdirSync(dirname);
            return true;
        }
    }
};
//读取文件夹中的文件
exports.getDirectoryContent = function (url, suffix) {
    var data = fs.readdirSync(url);
    data = data.map(function (v) {
        var stats = fs.statSync(path.join(url, v));
        if (stats.isDirectory())
            return v;
        else {
            if (suffix == true)
                return v;
            var map = v.split('.');
            map.pop();
            return map.join('.');
        }
    });
    return new Set(data);
};
function findArgv(name) {
    if (argv.indexOf(name) == -1) {
        return undefined;
    }
    else {
        return argv[argv.indexOf(name) + 1];
    }
}
exports.findArgv = findArgv;
function runSpawn(cwd) {
    child_process_1.spawn('cli', ['-o'], {
        cwd: cwd,
        stdio: 'inherit',
        shell: true,
    });
}
exports.runSpawn = runSpawn;
function startWxTool(cwd, project) {
    // return;
    child_process_1.spawn('cli', ['-o', project], {
        cwd: cwd,
        // stdio: 'inherit',
        shell: true,
    });
}
exports.startWxTool = startWxTool;
function closeWxTool(cwd, project, resolve) {
    // return;
    var _spwan = child_process_1.spawn('cli', ['--close', project], {
        cwd: cwd,
        // stdio: 'inherit',
        shell: true,
    });
    _spwan.on('message', function () {
        resolve();
    });
}
exports.closeWxTool = closeWxTool;
//# sourceMappingURL=tool.js.map