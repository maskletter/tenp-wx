"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var wx_key = ['if', 'for', 'key', 'forIndex', 'forItem'];
var system_key = ['attr', 'data', 'event', 'catch', 'child'];
function FormatLabel(name) {
    return name.replace(/[A-Z]/g, function (a, b, c, d) { return (b == 0 ? '' : '-') + a.toLocaleLowerCase(); });
}
exports.default = (function (data) {
    var wxml = '';
    function createWxml(element) {
        element.forEach(function (value) {
            var label = FormatLabel(value.label);
            if (label == 'text' && value.isCreate == false) {
                wxml += value.text;
                return;
            }
            wxml += '<' + label;
            var attr = value.attr || {};
            var data = value.data || {};
            var event = value.event || {};
            var catchs = value.catch || {};
            for (var key in attr) {
                // wxml += ' '+key+'="'+attr[key]+'"'
                wxml += ' data-' + key + '="' + attr[key] + '"';
            }
            for (var key in data) {
                wxml += ' ' + FormatLabel(key) + '="{{' + data[key] + '}}"';
            }
            for (var key in event) {
                wxml += ' bind' + key + '="' + event[key] + '"';
            }
            for (var key in catchs) {
                wxml += ' catch' + key + '="' + catchs[key] + '"';
            }
            for (var key in value) {
                if (wx_key.indexOf(key) != -1) {
                    if (key == 'for' || key == 'if')
                        wxml += ' wx:' + key + '="{{' + value[key] + '}}"';
                    else
                        wxml += ' wx:' + FormatLabel(key) + '="' + value[key] + '"';
                }
                else if (system_key.indexOf(key) == -1) {
                    wxml += ' ' + FormatLabel(key) + '="' + value[key] + '"';
                }
            }
            wxml += '>';
            if (value.text)
                wxml += value.text;
            if (value.child) {
                createWxml(value.child);
            }
            wxml += '</' + label + '>';
        });
    }
    ;
    createWxml(data);
    return wxml;
});
