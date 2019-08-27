"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var stream_1 = require("stream");
var browserify = require('browserify');
var fs = require("fs");
var path = require("path");
var directoryMaps = new Set();
var modulesMap = new Map();
var cwd = process.cwd();
function resolve(url, dir, dir2) {
    if (dir2)
        return path.join(url, dir, dir2);
    else
        return path.join(url, dir);
}
exports.getDirectoryContent = function (url, rootDir) {
    var data = fs.readdirSync(url);
    data = data.map(function (v) {
        var stats = fs.statSync(resolve(url, rootDir, v));
        if (stats.isDirectory())
            return v;
        else {
            var map = v.split('.');
            map.pop();
            return map.join('.');
        }
    });
    return new Set(data);
};
exports.setDirectory = function (directory) {
    directoryMaps = exports.getDirectoryContent(resolve(cwd, 'src', ''), '');
};
function createStream() {
    var buf = [];
    var TenpDuplex = (function (_super) {
        __extends(TenpDuplex, _super);
        function TenpDuplex(options) {
            return _super.call(this, options) || this;
        }
        TenpDuplex.prototype._write = function (chunk, encoding, callback) {
            buf.push(chunk);
            callback();
        };
        TenpDuplex.prototype._read = function (size) {
            this.push(buf);
            this.push(null);
        };
        TenpDuplex.prototype.clear = function () {
            buf = [];
        };
        return TenpDuplex;
    }(stream_1.Duplex));
    var dp = new TenpDuplex({
        readableObjectMode: true
    });
    return dp;
}
function buildModules(str, modulesLibName, libName) {
    var b = browserify();
    tenpStream.write(str + "TenpModule.exports = " + libName + ";");
    b.add(tenpStream);
    var buff = '';
    var tt = b.bundle();
    tt.on('data', function (data, v) {
        buff += data;
    });
    tt.on('end', function () {
        fs.writeFileSync(path.join(cwd, './dist/tenp_modules/' + modulesLibName), 'const TenpModule = module;' + buff);
        tenpStream.clear();
    });
    modulesMap.set(libName, modulesLibName);
}
var tenpStream = createStream();
var rootl = path.join(cwd, 'src');
exports.default = (function (str, rootDir) {
    var requireLib = str.match(/require\('(.+?)'\)/);
    if (requireLib) {
        var requireNameMaps = str.match(/var (.+?) /);
        var libName = requireNameMaps ? requireNameMaps[1] : parseInt(Math.random() * 600) + new Date().getTime();
        var lib = requireLib[1];
        var libMap = [];
        if (lib[0] == '.' || lib[1] == '/')
            return str;
        libMap = lib.split('/');
        if (directoryMaps.has(libMap[0])) {
            var l = rootDir.replace(rootl, '').split('\\');
            l.shift();
            var moduleStr = l.map(function (v) { return '../'; }).join('');
            if (moduleStr) {
                return "var " + libName + " = require('" + (moduleStr + lib) + "')";
            }
            else
                return "var " + libName + " = require('./" + lib + "')";
        }
        else {
            var l = rootDir.replace(rootl, '').split('\\');
            var moduleStr = l.map(function (v) { return '../'; }).join('');
            var modulesLibName = lib.replace(/\//g, '_') + "_tenp_modules.js";
            if (!modulesMap.get(libName)) {
                console.log(str, modulesLibName, libName);
            }
            if (moduleStr)
                return "var " + libName + " = require('" + (moduleStr + 'tenp_modules/' + modulesLibName) + "')";
            else
                return "var " + libName + " = require('./tenp_modules/" + modulesLibName + "')";
        }
    }
    else {
        return str;
    }
});
//# sourceMappingURL=include-modules.js.map