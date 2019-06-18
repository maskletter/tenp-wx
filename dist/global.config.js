"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//不需要转为字符串的属性
exports.Final_System_Attr = ['attr', 'data', 'event', 'catch'];
//属性是否需要加{{}}
exports.Final_System_attrData = {
    Map: ['markers', 'covers', 'polyline', 'circles', 'controls', 'includePoints', 'polygons']
};
//Component和App的关键字
exports.Keyword_Proto = ['setData', 'selectComponent', '$nextTick', 'triggerEvent', 'hasBehavior', 'createSelectorQuery', 'createIntersectionObserver', 'selectAllComponents', 'getRelationNodes', 'groupSetData', 'getTabBar'];
//Component内的方法所属位置
exports.Component_Event = {
    created: 'lifetimes',
    attached: 'lifetimes',
    ready: 'lifetimes',
    moved: 'lifetimes',
    detached: 'lifetimes',
    error: 'lifetimes',
    show: 'pageLifetimes',
    hide: 'pageLifetimes',
    resize: 'pageLifetimes',
};
//字符串转变量
function toValueFunction(value) {
    return new Function('', 'return ' + value)();
}
exports.toValueFunction = toValueFunction;
//抛出设置Final_System_attrData的方法
exports.setSystemDataAttr = function (label, attr) {
    if (exports.Final_System_attrData[label]) {
        exports.Final_System_attrData[label] = exports.Final_System_attrData[label].concat(attr);
    }
    else {
        exports.Final_System_attrData[label] = attr;
    }
};
