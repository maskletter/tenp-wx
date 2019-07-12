"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var path = require("path");
var tool_1 = require("../tool");
exports.default = (function (content, data) {
    if (!tool_1.isDirectory(path.join(__dirname, 'web-dist'))) {
        fs.mkdirSync(path.join(__dirname, 'web-dist'));
    }
    var type = data[0];
    if (type == 'App') {
        createIndexHtml(data);
        // console.log(data)
    }
});
function createIndexHtml(data) {
    console.log(data);
    var config = (data.find(function (v) { return v.type == 'config'; }) || { value: {} }).value;
    var indexTemplate = '';
    var htmlsrc = path.join(process.cwd(), 'src', 'index.html');
    if (tool_1.isFiles(htmlsrc)) {
        indexTemplate = fs.readFileSync(htmlsrc).toString();
    }
    indexTemplate = indexTemplate.replace('<body>', "<style>" + (config.style || '') + "</style><body><div id=\"app\"></div>");
    var functionStr = '';
    data.slice(0, data.length).forEach(function (value) {
        console.log(value);
        if (value.type == 'require') {
            if (value.value != '@tenp/wx') {
                functionStr += value.value;
            }
            else {
                console.log('准备打包');
            }
        }
        else if (value.type == 'text') {
            if (value.value.substr(0, 7) != 'require' && value.value.substr(0, 7) != 'exports') {
                functionStr += value.value;
            }
            else {
                console.log('准备打包');
            }
        }
        else {
        }
    });
    console.log(functionStr);
    // console.log(indexTemplate)
    // console.log(config)
}
