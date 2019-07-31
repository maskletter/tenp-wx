"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var chokidar = require("chokidar");
var fs = require("fs");
var path = require("path");
var typescript_loader_1 = require("./loader/typescript.loader");
var tool_1 = require("./tool");
var StatusPath = path.join(tool_1.cwd, 'src');
var ConversionPath = path.join(tool_1.cwd, 'dist');
var Formatter = {
    ".ts": [typescript_loader_1.default]
};
var logErrors = function (content) {
    if (content instanceof Array) {
        content.forEach(function (msg) {
            console.log('\x1B[31m' + msg + '\x1B[39m');
        });
    }
    else if (typeof (content) == 'string') {
        console.log("\u001B[31m+" + content + "+\u001B[39m");
    }
    else if (typeof (content) == 'object') {
        console.log('\x1B[31m' + JSON.stringify(content, null, 2) + '\x1B[39m');
    }
};
var logMessage = function (message) {
    console.log('$message  ' + message);
};
var watcher = chokidar.watch(path.join(process.cwd(), 'src'), {
    persistent: true
});
var isInitSuccess = false;
logMessage('服务启动中....');
watcher.on('ready', function (e) {
    logMessage('服务完成....\r\n');
    isInitSuccess = true;
});
watcher.on('all', function (event, _path) { return __awaiter(_this, void 0, void 0, function () {
    var extname, file_1, fileMap, statusPath, dir_1, fileName_1, _a, _b, _i, i, e_1;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                if (!(event == 'add' || event == 'change')) return [3, 7];
                if (isInitSuccess) {
                    logMessage("\u6587\u4EF6\u7F16\u8BD1\u4E2D...");
                }
                extname = path.extname(_path);
                file_1 = fs.readFileSync(_path);
                fileMap = [];
                if (!Formatter[extname]) return [3, 7];
                _c.label = 1;
            case 1:
                _c.trys.push([1, 6, , 7]);
                statusPath = path.join(ConversionPath, _path.replace(StatusPath, ''));
                dir_1 = path.dirname(statusPath);
                fileName_1 = path.basename(_path).split(extname)[0];
                mkdirsSync(dir_1);
                _a = [];
                for (_b in Formatter[extname])
                    _a.push(_b);
                _i = 0;
                _c.label = 2;
            case 2:
                if (!(_i < _a.length)) return [3, 5];
                i = _a[_i];
                return [4, Formatter[extname][i](file_1, { logErrors: logErrors, fileName: _path, directoryUrl: dir_1 })];
            case 3:
                fileMap = _c.sent();
                _c.label = 4;
            case 4:
                _i++;
                return [3, 2];
            case 5:
                fileMap.forEach(function (data) {
                    fs.writeFileSync(path.join(dir_1, (data.name || fileName_1) + '.' + data.type), file_1);
                });
                if (isInitSuccess)
                    logMessage("\u7F16\u8BD1\u5B8C\u6210\r\n");
                return [3, 7];
            case 6:
                e_1 = _c.sent();
                logErrors(e_1);
                return [3, 7];
            case 7: return [2];
        }
    });
}); });
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
//# sourceMappingURL=server.js.map