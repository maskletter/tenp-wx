"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path = require("path");
var chokidar = require("chokidar");
var fs = require("fs");
/**
 * 监听assets目录，将assets目录内的文件复制到dist/assets目录中
 */
var cwd = process.cwd();
var rootUrl = path.join(cwd, 'assets');
var srcUrl = path.join(cwd, 'src');
var wxUrl = path.join(cwd, 'dist', 'assets');
var distUrl = path.join(cwd, 'dist');
var watcher = chokidar.watch(path.join(cwd, 'assets'), {
    // ignored: /^(\s|\S)+(ts|js|tsx|jsx)+$/,
    persistent: true
});
// watcher.on('unlinkDir', function(_path){
// 	console.log(`${_path}删除目录`)
// })
watcher.on('unlink', function (_path) {
    var url = _path.replace(path.join(cwd, 'assets'), '');
    try {
        fs.unlinkSync(path.join(cwd, 'dist', 'assets', url));
    }
    catch (e) {
    }
});
watcher.on('all', function (event, _path) {
    if (event == 'add' || event == 'change') {
        var url = _path.replace(rootUrl, '');
        if (!url)
            return;
        var f = path.join(wxUrl, url);
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
var watcher2 = chokidar.watch([
    path.join(cwd, 'src'),
    path.join(cwd, 'project.config.json'),
    path.join(cwd, 'sitemap.json'),
], {
    ignored: /^(\s|\S)+(ts|js|tsx|jsx|scss|html)+$/,
    persistent: true
}), fileMap = ['project.config.json', 'sitemap.json'];
watcher2.on('all', function (event, _path) {
    if (event == 'add' || event == 'change') {
        var replaceUrl = fileMap.indexOf(path.basename(_path)) == -1 ? srcUrl : cwd;
        var url = _path.replace(replaceUrl, '');
        if (!url)
            return;
        var f = path.join(distUrl, url);
        mkdirsSync(path.dirname(f));
        fs.copyFileSync(_path, f);
    }
});
