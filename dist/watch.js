"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path = require("path");
var chokidar = require("chokidar");
var fs = require("fs");
var tool_1 = require("./tool");
exports.watchFiles = new Set();
var cwd = process.cwd();
var rootUrl = path.join(cwd, 'assets');
var srcUrl = path.join(cwd, 'src');
var distUrl = path.join(cwd, 'dist');
mkdirsSync(distUrl);
mkdirsSync(path.join(distUrl, 'tenp_modules'));
var ProjectType = tool_1.findArgv('--type') || 'wx';
fs.copyFileSync(path.join(__dirname, './assets/' + ProjectType + '/wx-method.js'), path.join(distUrl, 'method.js'));
var configFiles = tool_1.getDirectoryContent(path.join(process.cwd(), 'config/' + ProjectType), true);
Array.from(configFiles).forEach(function (data) {
    fs.copyFileSync(path.join(path.join(process.cwd(), 'config/' + ProjectType + '/' + data)), path.join(distUrl, data));
});
var watcher = chokidar.watch(srcUrl, {
    // ignored: /^(\s|\S)+(ts|js|tsx|jsx|scss)+$/,
    ignored: /^(\s|\S)+(tsx|jsx|scss)+$/,
    persistent: true
});
watcher.on('unlink', function (_path) {
    var url = _path.replace(path.join(cwd, 'src'), '');
    try {
        fs.unlinkSync(path.join(cwd, 'dist', url));
    }
    catch (e) {
    }
});
watcher.on('ready', function () { return exports.watchFiles.add('init'); });
watcher.on('all', function (event, _path) {
    if (event == 'add' || event == 'change') {
        var url = _path.replace(path.join(cwd, 'src'), '');
        if (!url)
            return;
        var f = path.join(distUrl, url);
        if (/^(\s|\S)+(ts)+$/.test(_path)) {
            if (exports.watchFiles.has('init')) {
                exports.watchFiles.add(f.substr(0, f.length - 2) + 'js');
            }
            return;
        }
        mkdirsSync(path.dirname(f));
        fs.copyFileSync(_path, f);
    }
});
function mkdirsSync(dirname) {
    if (fs.existsSync(dirname)) {
        return true;
    }
    else {
        if (mkdirsSync(path.dirname(dirname))) {
            fs.mkdirSync(dirname);
            return true;
        }
    }
}
//# sourceMappingURL=watch.js.map