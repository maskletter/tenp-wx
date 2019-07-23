"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
exports.__esModule = true;
var Final_RouterBefores = [];
var Final_RouterAfters = [];
function arrayEndAsync(aims, type, to) {
    var _this = this;
    var form = getCurrentPages().pop().route;
    return new Promise(function (resolve, reject) {
        var index = 0;
        var isError = false;
        if (aims.length == 0) {
            resolve();
        }
        aims.forEach(function (data) { return __awaiter(_this, void 0, void 0, function () {
            var e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (isError)
                            return [2 /*return*/];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, data({ type: type, to: to, form: form })];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        e_1 = _a.sent();
                        isError = true;
                        return [3 /*break*/, 4];
                    case 4:
                        if (index == aims.length - 1) {
                            if (isError)
                                reject('error');
                            else
                                resolve('success');
                        }
                        index++;
                        return [2 /*return*/];
                }
            });
        }); });
    });
}
function removeKeyword(data) {
    var _data = Object.assign({}, data);
    delete _data.success;
    delete _data.error;
    delete _data.fail;
    return _data;
}
function runEachFunction(list, res) {
    return __awaiter(this, void 0, void 0, function () {
        var data, _i, list_1, fun;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    data = null;
                    _i = 0, list_1 = list;
                    _a.label = 1;
                case 1:
                    if (!(_i < list_1.length)) return [3 /*break*/, 4];
                    fun = list_1[_i];
                    return [4 /*yield*/, fun(res)];
                case 2:
                    data = res = _a.sent();
                    _a.label = 3;
                case 3:
                    _i++;
                    return [3 /*break*/, 1];
                case 4: return [2 /*return*/, data];
            }
        });
    });
}
var tenp;
(function (tenp) {
    var _this = this;
    /**
     * 判断小程序的API，回调，参数，组件等是否在当前版本可用
     *
     * @version 1.1.1
     */
    tenp.canIUse = function (schema) {
        return wx.canIUse(schema);
    };
    /**
     * 将 Base64 字符串转成 ArrayBuffer 对象
     *
     * 从基础库 2.4.0 开始，本接口停止维护
     *
     * @version 1.1.1
     */
    tenp.base64ToArrayBuffer = function (base) {
        return wx.base64ToArrayBuffer(base);
    };
    /**
     * 将 ArrayBuffer 对象转成 Base64 字符串
     *
     * 从基础库 2.4.0 开始，本接口停止维护
     *
     * @version 1.1.0
     */
    tenp.arrayBufferToBase64 = function (buffer) {
        return wx.arrayBufferToBase64(buffer);
    };
    tenp.getSystemInfoSync = function () {
        return wx.getSystemInfoSync();
    };
    /**获取系统信息 */
    tenp.getSystemInfo = function () {
        return new Promise(function (resolve, reject) {
            wx.getSystemInfo({ success: resolve, fail: reject });
        });
    };
    /**
     * 获取全局唯一的版本更新管理器，用于管理小程序更新。关于小程序的更新机制，可以查看[运行机制](https://developers.weixin.qq.com/miniprogram/dev/framework/runtime/operating-mechanism.html)文档
     *
     * @version 1.9.90
     */
    tenp.getUpdateManager = function () {
        return wx.getUpdateManager();
    };
    /**
     * 获取小程序启动时的参数。与 [App.onLaunch](https://developers.weixin.qq.com/miniprogram/dev/reference/api/App.html#onlaunchobject-object) 的回调参数一致
     *
     * @version 2.1.2
     */
    tenp.getLaunchOptionsSync = function (call) {
        wx.getLaunchOptionsSync(call);
    };
    /**
     * 监听小程序要打开的页面不存在事件
     *
     * @version 2.1.2
     */
    tenp.onPageNotFound = function (call) {
        wx.onPageNotFound(call);
    };
    /**
     * 监听小程序错误事件。如脚本错误或 API 调用报错等
     *
     * @version 2.1.2
     */
    tenp.onError = function (call) {
        wx.onError(call);
    };
    /**
     * 监听音频中断结束事件。在收到 onAudioInterruptionBegin 事件之后，小程序内所有音频会暂停，收到此事件之后才可再次播放成功
     *
     * @version 2.6.2
     */
    tenp.onAudioInterruptionEnd = function (call) {
        wx.onAudioInterruptionEnd(call);
    };
    /**
     * 监听音频因为受到系统占用而被中断开始事件。以下场景会触发此事件：闹钟、电话、FaceTime 通话、微信语音聊天、微信视频聊天。此事件触发后，小程序内所有音频会暂停。
     *
     * @version 2.6.2
     */
    tenp.onAudioInterruptionBegin = function (call) {
        wx.onAudioInterruptionBegin(call);
    };
    /**
     * 监听小程序要打开的页面不存在事件
     *
     * @version 2.1.2
     */
    tenp.onAppShow = function (call) {
        wx.onAppShow(call);
    };
    /**
     * 监听小程序要打开的页面不存在事件
     *
     * @version 2.1.2
     */
    tenp.onAppHide = function (call) {
        wx.onAppHide(call);
    };
    /**
     * 取消监听小程序要打开的页面不存在事件
     *
     * @version 2.1.2
     */
    tenp.offPageNotFound = function (call) {
        wx.offPageNotFound(call);
    };
    /**
     * 取消监听小程序错误事件
     *
     * @version 2.1.2
     */
    tenp.offError = function (call) {
        wx.offError(call);
    };
    /**
     * 取消监听音频中断结束事件
     *
     * @version 2.6.2
     */
    tenp.offAudioInterruptionEnd = function (call) {
        wx.offAudioInterruptionEnd(call);
    };
    /**
     * 取消监听音频因为受到系统占用而被中断开始事件
     *
     * @version 2.6.2
     */
    tenp.offAudioInterruptionBegin = function (call) {
        wx.offAudioInterruptionBegin(call);
    };
    /**
     * 取消监听小程序切前台事件
     *
     * @version 2.1.2
     */
    tenp.offAppShow = function (call) {
        wx.offAppShow(call);
    };
    /**
     * 取消监听小程序切后台事件
     *
     * @version 2.1.2
     */
    tenp.offAppHide = function (call) {
        wx.offAppHide(call);
    };
    /**
     * 设置是否打开调试开关。此开关对正式版也能生效
     *
     * @version 1.4.0
     */
    tenp.setEnableDebug = function (params) {
        return new Promise(function (resolve, reject) {
            wx.setEnableDebug(__assign({}, removeKeyword(params), { success: resolve, fail: reject }));
        });
    };
    /**
     * 获取日志管理器对象。
     *
     * @version 2.1.0
     */
    tenp.getLogManager = function (params) {
        return wx.getLogManager({ level: params.level });
    };
    /**
     * 跳转到 tabBar 页面，并关闭其他所有非 tabBar 页面
     */
    tenp.switchTab = function (params) {
        return new Promise(function (resolve, reject) {
            arrayEndAsync(Final_RouterBefores, 'switch', params.url).then(function (result) {
                wx.switchTab({ url: params.url, success: function (result) { arrayEndAsync(resolve, 'switch', params.url).then(resolve); }, fail: reject });
            });
        });
    };
    /**
     * 关闭所有页面，打开到应用内的某个页面
     *
     * @version 1.1.0
     */
    tenp.reLaunch = function (params) {
        return new Promise(function (resolve, reject) {
            arrayEndAsync(Final_RouterBefores, 'reLaunch', params.url).then(function (result) {
                wx.reLaunch({ url: params.url, success: function (result) { arrayEndAsync(resolve, 'reLaunch', params.url).then(resolve); }, fail: reject });
            });
        });
    };
    /**关闭当前页面，跳转到应用内的某个页面。但是不允许跳转到 tabbar 页面 */
    tenp.redirectTo = function (params) {
        return new Promise(function (resolve, reject) {
            arrayEndAsync(Final_RouterBefores, 'redirect', params.url).then(function (result) {
                wx.redirectTo({ url: params.url, success: function (result) { arrayEndAsync(resolve, 'redirect', params.url).then(resolve); }, fail: reject });
            });
        });
    };
    /**
     * 保留当前页面，跳转到应用内的某个页面。但是不能跳到 tabbar 页面。
     *
     * 使用 [wx.navigateBack](https://developers.weixin.qq.com/miniprogram/dev/api/route/wx.navigateBack.html) 可以返回到原页面。小程序中页面栈最多十层
     */
    tenp.navigateTo = function (params) {
        return new Promise(function (resolve, reject) {
            arrayEndAsync(Final_RouterBefores, 'navigate', params.url).then(function (result) {
                wx.navigateTo({ url: params.url, success: function (result) { arrayEndAsync(resolve, 'navigate', params.url).then(resolve); }, fail: reject });
            });
        });
    };
    /**
     * 关闭当前页面，返回上一页面或多级页面。可通过 [getCurrentPages](https://developers.weixin.qq.com/miniprogram/dev/reference/api/getCurrentPages.html) 获取当前的页面栈，决定需要返回几层
     */
    tenp.navigateBack = function (params) {
        return new Promise(function (resolve, reject) {
            wx.navigateBack({ delta: params.delta, success: function (result) { arrayEndAsync(resolve, 'back').then(resolve); }, fail: reject });
        });
    };
    /**
     * 显示消息提示框
     */
    tenp.showToast = function (params) {
        return new Promise(function (resolve, reject) {
            wx.showToast(__assign({}, removeKeyword(params), { success: resolve, fail: reject }));
        });
    };
    /**
     * 显示模态对话框
     */
    tenp.showModal = function (params) {
        return new Promise(function (resolve, reject) {
            wx.showModal(__assign({}, removeKeyword(params), { success: resolve, fail: reject }));
        });
    };
    /**
     * 显示 loading 提示框。需主动调用 wx.hideLoading 才能关闭提示框
     */
    tenp.showLoading = function (params) {
        return new Promise(function (resolve, reject) {
            wx.showLoading({ title: params.title, mask: params.mask, success: resolve, fail: reject });
        });
    };
    /**
     * 显示操作菜单
     */
    tenp.showActionSheet = function (params) {
        return new Promise(function (resolve, reject) {
            wx.showActionSheet({ itemList: params.itemList, itemColor: params.itemColor, success: resolve, fail: reject });
        });
    };
    /**
     * 隐藏 loading 提示框
     */
    tenp.hideLoading = function () {
        return new Promise(function (resolve, reject) {
            wx.hideLoading({ success: resolve, fail: reject });
        });
    };
    /**
     * 隐藏消息提示框
     */
    tenp.hideToast = function () {
        return new Promise(function (resolve, reject) {
            wx.hideToast({ success: resolve, fail: reject });
        });
    };
    /**
     * 在当前页面显示导航条加载动画
     */
    tenp.showNavigationBarLoading = function () {
        return new Promise(function (resolve, reject) {
            wx.showNavigationBarLoading({ success: resolve, fail: reject });
        });
    };
    /**
     * 动态设置当前页面的标题
     */
    tenp.setNavigationBarTitle = function (params) {
        return new Promise(function (resolve, reject) {
            wx.setNavigationBarTitle({ title: params.title, success: resolve, fail: reject });
        });
    };
    /**
     * 设置页面导航条颜色
     *
     * @version 1.4.0
     */
    tenp.setNavigationBarColor = function (params) {
        return new Promise(function (resolve, reject) {
            wx.setNavigationBarColor(__assign({}, removeKeyword(params), { success: resolve, fail: reject }));
        });
    };
    /**
     * 在当前页面隐藏导航条加载动画
     */
    tenp.hideNavigationBarLoading = function () {
        return new Promise(function (resolve, reject) {
            wx.hideNavigationBarLoading({ success: resolve, fail: reject });
        });
    };
    /**
     * 动态设置下拉背景字体、loading 图的样式
     *
     * @version 2.1.0
     */
    tenp.setBackgroundTextStyle = function (params) {
        return new Promise(function (resolve, reject) {
            wx.setBackgroundTextStyle({ textStyle: params.textStyle, success: resolve, fail: reject });
        });
    };
    /**
     * 显示 tabBar 某一项的右上角的红点
     *
     * @version 1.9.0
     */
    tenp.showTabBarRedDot = function (params) {
        return new Promise(function (resolve, reject) {
            wx.showTabBarRedDot({ index: params.index, success: resolve, fail: reject });
        });
    };
    /**
     * 显示 tabBar
     *
     * @version 1.9.0
     */
    tenp.showTabBar = function (params) {
        return new Promise(function (resolve, reject) {
            wx.showTabBar({ animation: params.animation, success: resolve, fail: reject });
        });
    };
    /**
     * 动态设置 tabBar 的整体样式
     *
     * @version 1.9.0
     */
    tenp.setTabBarStyle = function (params) {
        return new Promise(function (resolve, reject) {
            wx.setTabBarStyle(__assign({}, params, { success: resolve, fail: reject }));
        });
    };
    /**
     * 动态设置 tabBar 某一项的内容，2.7.0 起图片支持临时文件和网络文件
     *
     * @version 1.9.0
     */
    tenp.setTabBarItem = function (params) {
        return new Promise(function (resolve, reject) {
            wx.setTabBarItem(__assign({}, params, { success: resolve, fail: reject }));
        });
    };
    /**
     * 为 tabBar 某一项的右上角添加文本
     *
     * @version 1.9.0
     */
    tenp.setTabBarBadge = function (params) {
        return new Promise(function (resolve, reject) {
            wx.setTabBarBadge(__assign({}, params, { success: resolve, fail: reject }));
        });
    };
    /**
     * 移除 tabBar 某一项右上角的文本
     *
     * @version 1.9.0
     */
    tenp.removeTabBarBadge = function (params) {
        return new Promise(function (resolve, reject) {
            wx.removeTabBarBadge({ index: params.index, success: resolve, fail: reject });
        });
    };
    /**
     * 隐藏 tabBar 某一项的右上角的红点
     *
     * @version 1.9.0
     */
    tenp.hideTabBarRedDot = function (params) {
        return new Promise(function (resolve, reject) {
            wx.hideTabBarRedDot({ index: params.index, success: resolve, fail: reject });
        });
    };
    /**
     * 移除 tabBar 某一项右上角的文本
     *
     * @version 1.9.0
     */
    tenp.hideTabBar = function (params) {
        return new Promise(function (resolve, reject) {
            wx.hideTabBar({ animation: params.animation, success: resolve, fail: reject });
        });
    };
    /**
     * 动态加载网络字体。文件地址需为下载类型。iOS 仅支持 https 格式文件地址
     *
     * 注意:
     *
     *   1. 引入中文字体，体积过大时会发生错误，建议抽离出部分中文，减少体积，或者用图片替代
     *   2. 字体链接必须是https（ios不支持http)
     *   3. 字体链接必须是同源下的，或开启了cors支持，小程序的域名是servicewechat.com
     *   4. canvas等原生组件不支持使用接口添加的字体
     *   5. 工具里提示 Faild to load font可以忽略
     *
     * @version 2.1.0
     */
    tenp.loadFontFace = function (params) {
        return new Promise(function (resolve, reject) {
            wx.loadFontFace({ family: params.family, success: resolve, fail: reject });
        });
    };
    /**
     * 停止当前页面下拉刷新
     *
     * @version 1.5.0
     */
    tenp.stopPullDownRefresh = function () {
        return new Promise(function (resolve, reject) {
            wx.stopPullDownRefresh({ success: resolve, fail: reject });
        });
    };
    /**
     * 开始下拉刷新。调用后触发下拉刷新动画，效果与用户手动下拉刷新一致
     *
     * @version 1.5.0
     */
    tenp.startPullDownRefresh = function () {
        return new Promise(function (resolve, reject) {
            wx.startPullDownRefresh({ success: resolve, fail: reject });
        });
    };
    /**
     * 将页面滚动到目标位置，支持选择器和滚动距离两种方式定位
     *
     * @version 1.4.0
     */
    tenp.pageScrollTo = function (params) {
        return new Promise(function (resolve, reject) {
            wx.pageScrollTo(__assign({}, params, { success: resolve, fail: reject }));
        });
    };
    /**
     * 将页面滚动到目标位置，支持选择器和滚动距离两种方式定位
     *
     */
    tenp.createAnimation = function (params) {
        return wx.createAnimation(params);
    };
    /**
     * 将页面滚动到目标位置，支持选择器和滚动距离两种方式定位
     *
     * 从基础库 1.9.9 开始，本接口停止维护
     *
     * @version 1.4.3
     */
    tenp.setTopBarText = function (params) {
        return new Promise(function (resolve, reject) {
            wx.setTopBarText(__assign({}, params, { success: resolve, fail: reject }));
        });
    };
    /**
     * 延迟一部分操作到下一个时间片再执行。（类似于 setTimeout）
     *
     * @version 2.2.3
     */
    tenp.nextTick = function (call) {
        wx.nextTick(call);
    };
    /**
     * 获取菜单按钮（右上角胶囊按钮）的布局位置信息。坐标信息以屏幕左上角为原点
     *
     * @version 2.1.0
     */
    tenp.getMenuButtonBoundingClientRect = function () {
        return wx.getMenuButtonBoundingClientRect();
    };
    /**
     * 监听窗口尺寸变化事件
     *
     * @version 2.3.0
     */
    tenp.onWindowResize = function (call) {
        wx.onWindowResize(call);
    };
    /**
     * 取消监听窗口尺寸变化事件
     *
     * @version 2.3.0
     */
    tenp.offWindowResize = function () {
        wx.offWindowResize();
    };
    /**
     * 监听键盘高度变化
     *
     * @version 2.7.0
     */
    tenp.onKeyboardHeightChange = function (call) {
        wx.onKeyboardHeightChange(call);
    };
    /**
     * 在input、textarea等focus之后，获取输入框的光标位置。注意：只有在focus的时候调用此接口才有效
     *
     * @version 2.7.0
     */
    tenp.getSelectedTextRange = function (call) {
        wx.getSelectedTextRange({
            complete: call
        });
    };
    /**
     * 下载文件资源到本地。客户端直接发起一个 HTTPS GET 请求，返回文件的本地临时路径，单次下载允许的最大文件为 50MB。使用前请注意阅读[相关说明](https://developers.weixin.qq.com/miniprogram/dev/framework/ability/network.html)
     *
     * 注意：请在服务端响应的 header 中指定合理的 Content-Type 字段，以保证客户端正确处理文件类型
     */
    tenp.downloadFile = function (params) {
        return new Promise(function (resolve, reject) {
            wx.downloadFile(__assign({}, params, { success: resolve, fail: reject }));
        });
    };
    /**
     * 将本地资源上传到服务器。客户端发起一个 HTTPS POST 请求，其中 content-type 为 multipart/form-data。使用前请注意阅读[相关说明](https://developers.weixin.qq.com/miniprogram/dev/framework/ability/network.html)
     *
     */
    tenp.uploadFile = function (params) {
        return new Promise(function (resolve, reject) {
            wx.uploadFile(__assign({}, params, { success: resolve, fail: reject }));
        });
    };
    /**
     * 经过修改过的request方法,采用Promise形式,支持全局transformResponse/transformRequest/transformError处理
     * @param request
     * @version 0.0.0
     */
    tenp.request = function (create) {
        if (create === void 0) { create = {}; }
        var transformRequest = create.transformRequest || [];
        var transformResponse = create.transformResponse || [];
        var transformError = create.transformError || [];
        //设置默认base
        var baseUrl = create.baseUrl || '';
        //设置默认header
        var header = create.header || {};
        //设置默认请求方式
        var method = create.method || 'POST';
        return function (params) {
            return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                var _a, _b, _c, _d, error_1;
                return __generator(this, function (_e) {
                    switch (_e.label) {
                        case 0:
                            _e.trys.push([0, 4, , 5]);
                            _b = (_a = wx).request;
                            _c = {
                                url: baseUrl + params.url,
                                method: params.method || method
                            };
                            if (!transformRequest.length) return [3 /*break*/, 2];
                            return [4 /*yield*/, runEachFunction(transformRequest, params.data || {})];
                        case 1:
                            _d = _e.sent();
                            return [3 /*break*/, 3];
                        case 2:
                            _d = params.data;
                            _e.label = 3;
                        case 3:
                            _b.apply(_a, [(_c.data = _d,
                                    _c.header = __assign({}, header, params.header),
                                    _c.success = function (res) {
                                        resolve(transformResponse.length ? runEachFunction(transformResponse, res) : res);
                                    },
                                    _c.fail = function (error) {
                                        reject(transformError.length ? runEachFunction(transformError, error) : error);
                                    },
                                    _c)]);
                            return [3 /*break*/, 5];
                        case 4:
                            error_1 = _e.sent();
                            reject(error_1);
                            return [3 /*break*/, 5];
                        case 5: return [2 /*return*/];
                    }
                });
            }); });
        };
    };
    /**
     * [wx.setStorage](https://developers.weixin.qq.com/miniprogram/dev/api/storage/wx.setStorage.html) 的同步版本
     */
    tenp.setStorageSync = function (key, value) {
        wx.setStorageSync(key, value);
    };
    /**
     * [wx.removeStorage](https://developers.weixin.qq.com/miniprogram/dev/api/storage/wx.removeStorage.html) 的同步版本
     */
    tenp.removeStorageSyncSync = function (key) {
        wx.removeStorageSyncSync(key);
    };
    /**
     * [wx.getStorage]() 的同步版本
     */
    tenp.getStorageSync = function (key) {
        return wx.getStorageSync(key);
    };
    /**
     * [wx.clearStorage]() 的同步版本
     */
    tenp.clearStorageSync = function () {
        wx.clearStorageSync();
    };
    /**
     * 将数据存储在本地缓存中指定的 key 中。会覆盖掉原来该 key 对应的内容。除非用户主动删除或因存储空间原因被系统清理，否则数据都一直可用。单个 key 允许存储的最大数据长度为 1MB，所有数据存储上限为 10MB
     */
    tenp.setStorage = function (params) {
        return new Promise(function (resolve, reject) {
            wx.setStorage(__assign({}, params, { success: resolve, fail: reject }));
        });
    };
    /**
     * 从本地缓存中移除指定 key
     */
    tenp.removeStorage = function (params) {
        return new Promise(function (resolve, reject) {
            wx.removeStorage({ key: params.key, success: resolve, fail: reject });
        });
    };
    /**从本地缓存中异步获取指定 key 的内容 */
    tenp.getStorage = function (params) {
        return new Promise(function (resolve, reject) {
            wx.getStorage({ key: params.key, success: resolve, fail: reject });
        });
    };
    /**
     * 清理本地数据缓存
     */
    tenp.clearStorage = function () {
        return new Promise(function (resolve, reject) {
            wx.clearStorage({ success: resolve, fail: reject });
        });
    };
    /**异步获取当前storage的相关信息 */
    tenp.getStorageInfo = function () {
        return new Promise(function (resolve, reject) {
            wx.getStorageInfo({
                success: resolve,
                fail: reject
            });
        });
    };
    /**wx.getStorageInfo 的同步版本 */
    tenp.getStorageInfoSync = function () {
        return wx.getStorageInfoSync();
    };
    /**
     * 创建 map 上下文 [MapContext](https://developers.weixin.qq.com/miniprogram/dev/api/media/map/MapContext.html) 对象。
     */
    tenp.createMapContext = function (mapId) {
        return wx.createMapContext(mapId);
    };
    /**
     * 保存图片到系统相册
     *
     * 调用前需要 [用户授权](https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/authorize.html) scope.writePhotosAlbum
     *
     * @version 1.2.0
     */
    tenp.saveImageToPhotosAlbum = function (params) {
        return new Promise(function (resolve, reject) {
            wx.saveImageToPhotosAlbum({ filePath: params.filePath, success: resolve, fail: reject });
        });
    };
    /**
     * 在新页面中全屏预览图片。预览的过程中用户可以进行保存图片、发送给朋友等操作
     *
     */
    tenp.previewImage = function (params) {
        return new Promise(function (resolve, reject) {
            wx.previewImage({ urls: params.urls, current: params.current, success: resolve, fail: reject });
        });
    };
    /**
     * 获取图片信息。网络图片需先配置download域名才能生效
     */
    tenp.getImageInfo = function (params) {
        return new Promise(function (resolve, reject) {
            wx.getImageInfo({ src: params.src, success: resolve, fail: reject });
        });
    };
    /**
     * 压缩图片接口，可选压缩质量
     *
     * @version 2.4.0
     */
    tenp.compressImage = function (params) {
        return new Promise(function (resolve, reject) {
            wx.compressImage({ src: params.src, quality: params.quality, success: resolve, fail: reject });
        });
    };
    /**
     * 从客户端会话选择文件
     *
     * @version 2.5.0
     */
    tenp.chooseMessageFile = function (params) {
        return new Promise(function (resolve, reject) {
            wx.chooseMessageFile({ count: params.count, type: params.type, extension: params.extension, success: resolve, fail: reject });
        });
    };
    /**
     * 从本地相册选择图片或使用相机拍照
     *
     */
    tenp.chooseImage = function (params) {
        return new Promise(function (resolve, reject) {
            wx.chooseImage({ count: params.count, sizeType: params.sizeType, sourceType: params.sourceType, success: resolve, fail: reject });
        });
    };
    /**
     * 保存视频到系统相册。支持mp4视频格式
     *
     * 调用前需要 [用户授权](https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/authorize.html) scope.writePhotosAlbum
     *
     * @version 1.2.0
     */
    tenp.saveVideoToPhotosAlbum = function (params) {
        return new Promise(function (resolve, reject) {
            wx.saveVideoToPhotosAlbum({ filePath: params.filePath, success: resolve, fail: reject });
        });
    };
    /**
     * 创建 video 上下文 [VideoContext](https://developers.weixin.qq.com/miniprogram/dev/api/media/video/VideoContext.html) 对象
     *
     */
    tenp.createVideoContext = function (videoId) {
        return wx.createVideoContext(videoId);
    };
    /**
     * 拍摄视频或从手机相册中选视频
     *
     */
    tenp.chooseVideo = function (params) {
        if (params === void 0) { params = {}; }
        return new Promise(function (resolve, reject) {
            wx.chooseVideo({ compressed: params.compressed, maxDuration: params.maxDuration, camera: params.camera, sourceType: params.sourceType, success: resolve, fail: reject });
        });
    };
    /**
     * 结束播放语音
     *
     * 从基础库 1.6.0 开始，本接口停止维护，请使用 [wx.createInnerAudioContext](https://developers.weixin.qq.com/miniprogram/dev/api/media/audio/wx.createInnerAudioContext.html) 代替
     *
     */
    tenp.stopVoice = function () {
        return new Promise(function (resolve, reject) {
            wx.stopVoice({ success: resolve, fail: reject });
        });
    };
    /**
     * 设置 [InnerAudioContext](https://developers.weixin.qq.com/miniprogram/dev/api/media/audio/InnerAudioContext.html) 的播放选项。设置之后对当前小程序全局生效
     *
     * @version 2.3.0
     */
    tenp.setInnerAudioOption = function (params) {
        if (params === void 0) { params = {}; }
        return new Promise(function (resolve, reject) {
            wx.setInnerAudioOption({ mixWithOther: params.mixWithOther, obeyMuteSwitch: params.obeyMuteSwitch, success: resolve, fail: reject });
        });
    };
    /**
     * 开始播放语音。同时只允许一个语音文件正在播放，如果前一个语音文件还没播放完，将中断前一个语音播放
     *
     * 从基础库 1.6.0 开始，本接口停止维护，请使用 [wx.createInnerAudioContext](https://developers.weixin.qq.com/miniprogram/dev/api/media/audio/wx.createInnerAudioContext.html) 代替
     */
    tenp.playVoice = function (params) {
        return new Promise(function (resolve, reject) {
            wx.playVoice({ filePath: params.filePath, duration: params.duration, success: resolve, fail: reject });
        });
    };
    /**
     * 暂停正在播放的语音。再次调用 [wx.playVoice](https://developers.weixin.qq.com/miniprogram/dev/api/media/audio/wx.playVoice.html) 播放同一个文件时，会从暂停处开始播放。如果想从头开始播放，需要先调用 [wx.stopVoice](https://developers.weixin.qq.com/miniprogram/dev/api/media/audio/wx.stopVoice.html)
     *
     * 从基础库 1.6.0 开始，本接口停止维护，请使用 [wx.createInnerAudioContext](https://developers.weixin.qq.com/miniprogram/dev/api/media/audio/wx.createInnerAudioContext.html) 代替
     */
    tenp.pauseVoice = function () {
        return new Promise(function (resolve, reject) {
            wx.pauseVoice({ success: resolve, fail: reject });
        });
    };
    /**
     * 获取当前支持的音频输入源
     *
     * @version 2.1.0
     */
    tenp.getAvailableAudioSources = function () {
        return new Promise(function (resolve, reject) {
            wx.getAvailableAudioSources({ success: resolve, fail: reject });
        });
    };
    /**
     * 创建内部 audio 上下文 [InnerAudioContext](https://developers.weixin.qq.com/miniprogram/dev/api/media/audio/InnerAudioContext.html) 对象
     *
     * @version 1.6.0
     */
    tenp.createInnerAudioContext = function () {
        return wx.createInnerAudioContext();
    };
    /**
     * 创建 audio 上下文 [AudioContext](https://developers.weixin.qq.com/miniprogram/dev/api/media/audio/AudioContext.html) 对象
     *
     * 从基础库 1.6.0 开始，本接口停止维护，请使用 [wx.createInnerAudioContext](https://developers.weixin.qq.com/miniprogram/dev/api/media/audio/wx.createInnerAudioContext.html) 代替
     */
    tenp.createAudioContext = function (id, instance) {
        return wx.createAudioContext(id, instance);
    };
    /**
     * 停止播放音乐
     *
     * 从基础库 1.2.0 开始，本接口停止维护，请使用 [wx.getBackgroundAudioManager](https://developers.weixin.qq.com/miniprogram/dev/api/media/background-audio/wx.getBackgroundAudioManager.html) 代替
     */
    tenp.stopBackgroundAudio = function () {
        return new Promise(function (resolve, reject) {
            wx.stopBackgroundAudio({ success: resolve, fail: reject });
        });
    };
    /**
     * 控制音乐播放进度
     *
     * 从基础库 1.2.0 开始，本接口停止维护，请使用 [wx.getBackgroundAudioManager](https://developers.weixin.qq.com/miniprogram/dev/api/media/background-audio/wx.getBackgroundAudioManager.html) 代替
     */
    tenp.seekBackgroundAudio = function (params) {
        return new Promise(function (resolve, reject) {
            wx.seekBackgroundAudio({ position: params.position, success: resolve, fail: reject });
        });
    };
    /**
     * 使用后台播放器播放音乐。对于微信客户端来说，只能同时有一个后台音乐在播放。当用户离开小程序后，音乐将暂停播放；当用户在其他小程序占用了音乐播放器，原有小程序内的音乐将停止播放
     *
     * 从基础库 1.2.0 开始，本接口停止维护，请使用 [wx.getBackgroundAudioManager](https://developers.weixin.qq.com/miniprogram/dev/api/media/background-audio/wx.getBackgroundAudioManager.html) 代替
     */
    tenp.playBackgroundAudio = function (params) {
        return new Promise(function (resolve, reject) {
            wx.playBackgroundAudio({ dataUrl: params.dataUrl, title: params.title, coverImgUrl: params.coverImgUrl, success: resolve, fail: reject });
        });
    };
    /**
     * 暂停播放音乐
     *
     * 从基础库 1.2.0 开始，本接口停止维护，请使用 [wx.getBackgroundAudioManager](https://developers.weixin.qq.com/miniprogram/dev/api/media/background-audio/wx.getBackgroundAudioManager.html) 代替
     */
    tenp.pauseBackgroundAudio = function () {
        return new Promise(function (resolve, reject) {
            wx.pauseBackgroundAudio({ success: resolve, fail: reject });
        });
    };
    /**
     * 监听音乐停止事件
     *
     * 从基础库 1.2.0 开始，本接口停止维护，请使用 [wx.getBackgroundAudioManager](https://developers.weixin.qq.com/miniprogram/dev/api/media/background-audio/wx.getBackgroundAudioManager.html) 代替
     */
    tenp.onBackgroundAudioStop = function (call) {
        wx.onBackgroundAudioStop(call);
    };
    /**
     * 监听音乐播放事件
     *
     * 从基础库 1.2.0 开始，本接口停止维护，请使用 [wx.getBackgroundAudioManager](https://developers.weixin.qq.com/miniprogram/dev/api/media/background-audio/wx.getBackgroundAudioManager.html) 代替
     */
    tenp.onBackgroundAudioPlay = function (call) {
        wx.onBackgroundAudioPlay(call);
    };
    /**
     * 监听音乐暂停事件
     *
     * 从基础库 1.2.0 开始，本接口停止维护，请使用 [wx.getBackgroundAudioManager](https://developers.weixin.qq.com/miniprogram/dev/api/media/background-audio/wx.getBackgroundAudioManager.html) 代替
     */
    tenp.onBackgroundAudioPause = function (call) {
        wx.onBackgroundAudioPause(call);
    };
    /**
     * 获取后台音乐播放状态
     *
     * 从基础库 1.2.0 开始，本接口停止维护，请使用 [wx.getBackgroundAudioManager](https://developers.weixin.qq.com/miniprogram/dev/api/media/background-audio/wx.getBackgroundAudioManager.html) 代替
     */
    tenp.getBackgroundAudioPlayerState = function () {
        return new Promise(function (resolve, reject) {
            wx.getBackgroundAudioPlayerState({ success: resolve, fail: reject });
        });
    };
    /**
     * 获取全局唯一的背景音频管理器。 小程序切入后台，如果音频处于播放状态，可以继续播放。但是后台状态不能通过调用API操纵音频的播放状态
     *
     * 从微信客户端6.7.2版本开始，若需要在小程序切后台后继续播放音频，需要在 [app.json](https://developers.weixin.qq.com/miniprogram/dev/reference/configuration/app.html) 中配置 requiredBackgroundModes 属性。开发版和体验版上可以直接生效，正式版还需通过审核
     *
     * @version 1.2.0
     */
    tenp.getBackgroundAudioManager = function () {
        return wx.getBackgroundAudioManager();
    };
    /**
     * 创建 [live-pusher](https://developers.weixin.qq.com/miniprogram/dev/component/live-pusher.html) 上下文 [LivePusherContext](https://developers.weixin.qq.com/miniprogram/dev/api/media/live/LivePusherContext.html) 对象
     *
     * @version 1.7.0
     */
    tenp.createLivePusherContext = function () {
        return wx.createLivePusherContext();
    };
    tenp.createLivePlayerContext = function (id, instance) {
        return wx.createLivePlayerContext(id, instance);
    };
    /**
     * 停止录音
     *
     * 从基础库 1.6.0 开始，本接口停止维护，请使用 [wx.getRecorderManager](https://developers.weixin.qq.com/miniprogram/dev/api/media/recorder/wx.getRecorderManager.html) 代替
     */
    tenp.stopRecord = function () {
        return new Promise(function (resolve, reject) {
            wx.stopRecord({ success: resolve, fail: reject });
        });
    };
    /**
     * 开始录音。当主动调用 [wx.stopRecord](https://developers.weixin.qq.com/miniprogram/dev/api/media/recorder/wx.stopRecord.html)，或者录音超过1分钟时自动结束录音。当用户离开小程序时，此接口无法调用
     *
     * 调用前需要 [用户授权](https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/authorize.html) scope.record
     *
     * 从基础库 1.6.0 开始，本接口停止维护，请使用 [wx.getRecorderManager](https://developers.weixin.qq.com/miniprogram/dev/api/media/recorder/wx.getRecorderManager.html) 代替
     */
    tenp.startRecord = function () {
        return new Promise(function (resolve, reject) {
            wx.startRecord({ success: resolve, fail: reject });
        });
    };
    /**
     * 获取全局唯一的录音管理器 RecorderManager
     *
     * @version 1.6.0
     */
    tenp.getRecorderManager = function () {
        return wx.getRecorderManager();
    };
    /**
     * 创建 camera 上下文 [CameraContext](https://developers.weixin.qq.com/miniprogram/dev/api/media/camera/CameraContext.html) 对象
     *
     * @version 1.6.0
     */
    tenp.createCameraContext = function () {
        return wx.createCameraContext();
    };
    /**
     * 使用微信内置地图查看位置
     *
     */
    tenp.openLocation = function (params) {
        return new Promise(function (resolve, reject) {
            wx.openLocation(__assign({}, params, { success: resolve, fail: reject }));
        });
    };
    /**
     * 获取当前的地理位置、速度。当用户离开小程序后，此接口无法调用
     *
     * 调用前需要 [用户授权](https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/authorize.html) scope.userLocation
     */
    tenp.getLocation = function (params) {
        if (params === void 0) { params = {}; }
        return new Promise(function (resolve, reject) {
            wx.getLocation({ type: params.type, altitude: params.altitude, success: resolve, fail: reject });
        });
    };
    /**
     * 获取当前支持的音频输入源
     *
     */
    tenp.chooseLocation = function () {
        return new Promise(function (resolve, reject) {
            wx.chooseLocation({ success: resolve, fail: reject });
        });
    };
    /**
     * 更新转发属性
     *
     * @version 1.2.0
     */
    tenp.updateShareMenu = function (params) {
        if (params === void 0) { params = {}; }
        return new Promise(function (resolve, reject) {
            wx.updateShareMenu(__assign({}, params, { success: resolve, fail: reject }));
        });
    };
    /**显示当前页面的转发按钮 */
    tenp.showShareMenu = function (params) {
        if (params === void 0) { params = {}; }
        return new Promise(function (resolve, reject) {
            wx.showShareMenu({ withShareTicket: params.withShareTicket, success: resolve, fail: reject });
        });
    };
    /**隐藏转发按钮 */
    tenp.hideShareMenu = function () {
        return new Promise(function (resolve, reject) {
            wx.hideShareMenu({ success: resolve, fail: reject });
        });
    };
    /**获取转发详细信息 */
    tenp.getShareInfo = function (params) {
        return new Promise(function (resolve, reject) {
            wx.getShareInfo({ shareTicket: params.shareTicket, timeout: params.timeout, success: resolve, fail: reject });
        });
    };
    /**创建离屏 canvas 实例 */
    tenp.createOffscreenCanvas = function () {
        return wx.createOffscreenCanvas();
    };
    /**创建 canvas 的绘图上下文 [CanvasContext](https://developers.weixin.qq.com/miniprogram/dev/api/canvas/CanvasContext.html) 对象 */
    tenp.createCanvasContext = function (canvasId, $this) {
        return wx.createCanvasContext(canvasId, $this);
    };
    /**
     * 把当前画布指定区域的内容导出生成指定大小的图片。在 draw() 回调里调用该方法才能保证图片导出成功
     */
    tenp.canvasToTempFilePath = function (params) {
        return new Promise(function (resolve, reject) {
            wx.canvasToTempFilePath(__assign({}, params, { success: resolve, fail: reject }));
        });
    };
    /**
     * 将像素数据绘制到画布。在自定义组件下，第二个参数传入自定义组件实例 this，以操作组件内 <canvas> 组件
     */
    tenp.canvasPutImageData = function (params) {
        return new Promise(function (resolve, reject) {
            wx.canvasPutImageData(__assign({}, params, { success: resolve, fail: reject }));
        });
    };
    /**
     * 获取 canvas 区域隐含的像素数据
     *
     * @version 1.9.0
     */
    tenp.canvasGetImageData = function (params) {
        return new Promise(function (resolve, reject) {
            wx.canvasGetImageData(__assign({}, params, { success: resolve, fail: reject }));
        });
    };
    /**
     * 保存文件到本地。注意：saveFile 会把临时文件移动，因此调用成功后传入的 tempFilePath 将不可用
     *
     */
    tenp.saveFile = function (params) {
        return new Promise(function (resolve, reject) {
            wx.saveFile({ tempFilePath: params.tempFilePath, success: resolve, fail: reject });
        });
    };
    /**
     * 删除本地缓存文件
     *
     */
    tenp.removeSavedFile = function (params) {
        return new Promise(function (resolve, reject) {
            wx.removeSavedFile({ filePath: params.filePath, success: resolve, fail: reject });
        });
    };
    /**
     * 新开页面打开文档
     *
     */
    tenp.openDocument = function (params) {
        return new Promise(function (resolve, reject) {
            wx.openDocument({ filePath: params.filePath, fileType: params.filePath, success: resolve, fail: reject });
        });
    };
    /**
     * 获取该小程序下已保存的本地缓存文件列表
     *
     */
    tenp.getSavedFileList = function () {
        return new Promise(function (resolve, reject) {
            wx.getSavedFileList({ success: resolve, fail: reject });
        });
    };
    /**
     * 获取本地文件的文件信息。此接口只能用于获取已保存到本地的文件，若需要获取临时文件信息，请使用 [wx.getFileInfo()](https://developers.weixin.qq.com/miniprogram/dev/api/file/wx.getFileInfo.html) 接口
     *
     */
    tenp.getSavedFileInfo = function (params) {
        return new Promise(function (resolve, reject) {
            wx.getSavedFileInfo({ filePath: params.filePath, success: resolve, fail: reject });
        });
    };
    /**
     * 获取全局唯一的文件管理器
     *
     * @version 1.9.9
     */
    tenp.getFileSystemManager = function () {
        return wx.getFileSystemManager();
    };
    /**
     * 获取文件信息
     *
     * @version 1.4.0
     */
    tenp.getFileInfo = function (params) {
        return new Promise(function (resolve, reject) {
            wx.getFileInfo({ filePath: params.filePath, digestAlgorithm: params.digestAlgorithm, success: resolve, fail: reject });
        });
    };
    /**
     * 调用接口获取登录凭证（code）。通过凭证进而换取用户登录态信息，包括用户的唯一标识（openid）及本次登录的会话密钥（session_key）等。用户数据的加解密通讯需要依赖会话密钥完成。更多使用方法详见 [小程序登录](https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/login.html)
     *
     */
    tenp.login = function (params) {
        if (params === void 0) { params = {}; }
        return new Promise(function (resolve, reject) {
            wx.login({ timeout: params.timeout, success: resolve, fail: reject });
        });
    };
    /**
     * 检查登录态是否过期
     *
     * 通过 wx.login 接口获得的用户登录态拥有一定的时效性。用户越久未使用小程序，用户登录态越有可能失效。反之如果用户一直在使用小程序，则用户登录态一直保持有效。具体时效逻辑由微信维护，对开发者透明。开发者只需要调用 wx.checkSession 接口检测当前用户登录态是否有效
     *
     * 登录态过期后开发者可以再调用 wx.login 获取新的用户登录态。调用成功说明当前 session_key 未过期，调用失败说明 session_key 已过期。更多使用方法详见 [小程序登录](https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/login.html)
     */
    tenp.checkSession = function () {
        return new Promise(function (resolve, reject) {
            wx.checkSession({ success: resolve, fail: reject });
        });
    };
    /**
     * 打开另一个小程序
     *
     * @version 1.3.0
     */
    tenp.navigateToMiniProgram = function (params) {
        return new Promise(function (resolve, reject) {
            wx.navigateToMiniProgram(__assign({}, params, { success: resolve, fail: reject }));
        });
    };
    /**
     * 返回到上一个小程序。只有在当前小程序是被其他小程序打开时可以调用成功
     *
     * 注意：微信客户端 iOS 6.5.9，Android 6.5.10 及以上版本支持
     *
     * @version 1.3.0
     */
    tenp.navigateBackMiniProgram = function (params) {
        if (params === void 0) { params = {}; }
        return new Promise(function (resolve, reject) {
            wx.navigateBackMiniProgram({ extraData: params.extraData, success: resolve, fail: reject });
        });
    };
    /**
     * 获取当前帐号信息
     *
     * @version 2.2.2
     */
    tenp.getAccountInfoSync = function (params) {
        return wx.getAccountInfoSync();
    };
    /**
     * 获取用户信息
     *
     * 调用前需要 [用户授权](https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/authorize.html) scope.userInfo
     */
    tenp.getUserInfo = function (params) {
        if (params === void 0) { params = {}; }
        return new Promise(function (resolve, reject) {
            wx.getUserInfo(__assign({}, params, { success: resolve, fail: reject }));
        });
    };
    /**
     * 自定义业务数据监控上报接口
     *
     * @version 2.0.1
     */
    tenp.reportMonitor = function (name, value) {
        wx.reportMonitor(name, value);
    };
    /**
     * 自定义分析数据上报接口。使用前，需要在小程序管理后台自定义分析中新建事件，配置好事件名与字段
     */
    tenp.reportAnalytics = function (eventName, data) {
        wx.reportAnalytics(eventName, data);
    };
    /**
     * 发起微信支付。了解更多信息，请查看微信支付[接口文档](https://pay.weixin.qq.com/wiki/doc/api/wxa/wxa_api.php?chapter=7_3&index=1)
     *
     */
    tenp.requestPayment = function (params) {
        return new Promise(function (resolve, reject) {
            wx.requestPayment(__assign({}, params, { success: resolve, fail: reject }));
        });
    };
    /**
     * 提前向用户发起授权请求。调用后会立刻弹窗询问用户是否同意授权小程序使用某项功能或获取用户的某些数据，但不会实际调用对应接口。如果用户之前已经同意授权，则不会出现弹窗，直接返回成功。更多用法详见 [用户授权](https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/authorize.html)
     *
     * @version 1.2.0
     */
    tenp.authorize = function (params) {
        return new Promise(function (resolve, reject) {
            wx.authorize(__assign({}, params, { success: resolve, fail: reject }));
        });
    };
    /**
     * 调起客户端小程序设置界面，返回用户设置的操作结果。设置界面只会出现小程序已经向用户请求过的[权限](https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/authorize.html)
     *
     * 注意：2.3.0 版本开始，用户发生点击行为后，才可以跳转打开设置页，管理授权信息。[详情](https://developers.weixin.qq.com/community/develop/doc/000cea2305cc5047af5733de751008)
     */
    tenp.openSetting = function () {
        return new Promise(function (resolve, reject) {
            wx.openSetting({ success: resolve, fail: reject });
        });
    };
    /**
     * 获取用户的当前设置。返回值中只会出现小程序已经向用户请求过的权限
     *
     * @version 1.2.0
     */
    tenp.getSetting = function () {
        return new Promise(function (resolve, reject) {
            wx.getSetting({ success: resolve, fail: reject });
        });
    };
    /**
     * 获取用户收货地址。调起用户编辑收货地址原生界面，并在编辑完成后返回用户选择的地址
     *
     * 调用前需要 用户授权 [scope.address](https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/authorize.html)
     */
    tenp.chooseAddress = function () {
        return new Promise(function (resolve, reject) {
            wx.chooseAddress({ success: resolve, fail: reject });
        });
    };
    /**
     * 查看微信卡包中的卡券。只有通过 [认证](https://developers.weixin.qq.com/miniprogram/product/renzheng.html) 的小程序或文化互动类目的小游戏才能使用。更多文档请参考 [微信卡券接口文档](https://mp.weixin.qq.com/cgi-bin/announce?action=getannouncement&key=1490190158&version=1&lang=zh_CN&platform=2)
     *
     */
    tenp.openCard = function (params) {
        return new Promise(function (resolve, reject) {
            wx.openCard({ cardList: params.cardList, success: resolve, fail: reject });
        });
    };
    /**
     * 批量添加卡券。只有通过 [认证](https://developers.weixin.qq.com/miniprogram/product/renzheng.html) 的小程序或文化互动类目的小游戏才能使用。更多文档请参考 [微信卡券接口文档](https://mp.weixin.qq.com/cgi-bin/announce?action=getannouncement&key=1490190158&version=1&lang=zh_CN&platform=2)
     *
     */
    tenp.addCard = function (params) {
        return new Promise(function (resolve, reject) {
            wx.addCard({ cardList: params.cardList, success: resolve, fail: reject });
        });
    };
    /**
     * 选择用户的发票抬头。当前小程序必须关联一个公众号，且这个公众号是完成了[微信认证](https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1496554031_RD4xe)的，才能调用 chooseInvoiceTitle
     *
     * 调用前需要 [用户授权](https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/authorize.html) scope.invoiceTitle
     *
     * @version 1.5.0
     */
    tenp.chooseInvoiceTitle = function () {
        return new Promise(function (resolve, reject) {
            wx.chooseInvoiceTitle({ success: resolve, fail: reject });
        });
    };
    /**
     * 选择用户已有的发票
     *
     * 调用前需要 [用户授权](https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/authorize.html) scope.invoice
     */
    tenp.chooseInvoice = function () {
        return new Promise(function (resolve, reject) {
            wx.chooseInvoice({ success: resolve, fail: reject });
        });
    };
    /**
     * 开始 SOTER 生物认证。验证流程请参考[说明](https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/bio-auth.html)
     *
     * @version 1.5.0
     */
    tenp.startSoterAuthentication = function (params) {
        return new Promise(function (resolve, reject) {
            wx.startSoterAuthentication({ requestAuthModes: params.requestAuthModes, challenge: params.challenge, authContent: params.authContent, success: resolve, fail: reject });
        });
    };
    /**
     * 获取本机支持的 SOTER 生物认证方式
     *
     * @version 1.5.0
     */
    tenp.checkIsSupportSoterAuthentication = function () {
        return new Promise(function (resolve, reject) {
            wx.checkIsSupportSoterAuthentication({ success: resolve, fail: reject });
        });
    };
    /**
     * 获取设备内是否录入如指纹等生物信息的接口
     *
     * @version 1.6.0
     */
    tenp.checkIsSoterEnrolledInDevice = function (params) {
        return new Promise(function (resolve, reject) {
            wx.checkIsSoterEnrolledInDevice({ checkAuthMode: params.checkAuthMode, success: resolve, fail: reject });
        });
    };
    /**
     * 获取用户过去三十天微信运动步数。需要先调用 [wx.login](https://developers.weixin.qq.com/miniprogram/dev/api/open-api/login/wx.login.html) 接口。步数信息会在用户主动进入小程序时更新
     *
     * 调用前需要 用户授权 [scope.werun](https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/authorize.html)
     *
     * @version 1.2.0
     */
    tenp.getWeRunData = function (params) {
        return new Promise(function (resolve, reject) {
            wx.getWeRunData(__assign({}, params, { success: resolve, fail: reject }));
        });
    };
    /**
     * 停止搜索附近的 iBeacon 设备
     *
     * @version 1.2.0
     */
    tenp.stopBeaconDiscovery = function () {
        return new Promise(function (resolve, reject) {
            wx.stopBeaconDiscovery({ success: resolve, fail: reject });
        });
    };
    /**
     * 开始搜索附近的 iBeacon 设备
     *
     * @version 1.2.0
     */
    tenp.startBeaconDiscovery = function (params) {
        return new Promise(function (resolve, reject) {
            wx.startBeaconDiscovery({ uuids: params.uuids, ignoreBluetoothAvailable: params.ignoreBluetoothAvailable, success: resolve, fail: reject });
        });
    };
    /**
     * 监听 iBeacon 设备更新事件
     *
     * @version 1.2.0
     */
    tenp.onBeaconUpdate = function (call) {
        wx.onBeaconUpdate(call);
    };
    /**
     * 监听 iBeacon 服务状态变化事件
     *
     * @version 1.2.0
     */
    tenp.onBeaconServiceChange = function (call) {
        wx.onBeaconServiceChange(call);
    };
    /**
     * 获取所有已搜索到的 iBeacon 设备
     *
     * @version 1.2.0
     *
     */
    tenp.getBeacons = function () {
        return new Promise(function (resolve, reject) {
            wx.getBeacons({ success: resolve, fail: reject });
        });
    };
    /**
     * 关闭 Wi-Fi 模块
     *
     * @version 1.6.0
     */
    tenp.stopWifi = function () {
        return new Promise(function (resolve, reject) {
            wx.stopWifi({ success: resolve, fail: reject });
        });
    };
    /**
     * 初始化 Wi-Fi 模块
     *
     * @version 1.6.0
     */
    tenp.startWifi = function () {
        return new Promise(function (resolve, reject) {
            wx.startWifi({ success: resolve, fail: reject });
        });
    };
    /**
     * 设置 wifiList 中 AP 的相关信息。在 onGetWifiList 回调后调用，iOS特有接口
     *
     * @version 1.6.0
     */
    tenp.setWifiList = function (params) {
        return new Promise(function (resolve, reject) {
            wx.setWifiList(__assign({}, params, { success: resolve, fail: reject }));
        });
    };
    /**
     * 监听连接上 Wi-Fi 的事件
     *
     * @version 1.6.0
     */
    tenp.onWifiConnected = function (callback) {
        wx.onWifiConnected(callback);
    };
    /**
     * 监听获取到 Wi-Fi 列表数据事件
     *
     * @version 1.6.0
     */
    tenp.onGetWifiList = function (callback) {
        wx.onGetWifiList(callback);
    };
    /**
     * 请求获取 Wi-Fi 列表。在 onGetWifiList 注册的回调中返回 wifiList 数据。 Android 调用前需要 [用户授权](https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/authorize.html) scope.userLocation
     *
     * iOS 将跳转到系统的 Wi-Fi 界面，Android 不会跳转。 iOS 11.0 及 iOS 11.1 两个版本因系统问题，该方法失效。但在 iOS 11.2 中已修复
     *
     * @version 1.6.0
     */
    tenp.getWifiList = function () {
        return new Promise(function (resolve, reject) {
            wx.getWifiList({ success: resolve, fail: reject });
        });
    };
    /**
     * 获取已连接中的 Wi-Fi 信息
     *
     * @version 1.6.0
     */
    tenp.getConnectedWifi = function () {
        return new Promise(function (resolve, reject) {
            wx.getConnectedWifi({ success: resolve, fail: reject });
        });
    };
    /**
     * 连接 Wi-Fi。若已知 Wi-Fi 信息，可以直接利用该接口连接。仅 Android 与 iOS 11 以上版本支持
     *
     * @version 1.6.0
     */
    tenp.connectWifi = function (params) {
        return new Promise(function (resolve, reject) {
            wx.connectWifi(__assign({}, params, { success: resolve, fail: reject }));
        });
    };
    /**
     * 读取低功耗蓝牙设备的特征值的二进制数据值。注意：必须设备的特征值支持 read 才可以成功调用
     *
     */
    tenp.readBLECharacteristicValue = function (params) {
        return new Promise(function (resolve, reject) {
            wx.readBLECharacteristicValue(__assign({}, params, { success: resolve, fail: reject }));
        });
    };
    /**
     * 监听低功耗蓝牙连接状态的改变事件。包括开发者主动连接或断开连接，设备丢失，连接异常断开等等
     */
    tenp.onBLEConnectionStateChange = function (call) {
        wx.onBLEConnectionStateChange();
    };
    /**
     * 监听低功耗蓝牙连接状态的改变事件。包括开发者主动连接或断开连接，设备丢失，连接异常断开等等
     */
    tenp.onBLECharacteristicValueChange = function (callback) {
        wx.onBLECharacteristicValueChange(callback);
    };
    /**
     * 启用低功耗蓝牙设备特征值变化时的 notify 功能，订阅特征值。注意：必须设备的特征值支持 notify 或者 indicate 才可以成功调用
     *
     * 另外，必须先启用 notifyBLECharacteristicValueChange 才能监听到设备 characteristicValueChange 事件
     */
    tenp.notifyBLECharacteristicValueChange = function (params) {
        return new Promise(function (resolve, reject) {
            wx.notifyBLECharacteristicValueChange(__assign({}, params, { success: resolve, fail: reject }));
        });
    };
    /**
     * 获取蓝牙设备所有服务(service)
     *
     */
    tenp.getBLEDeviceServices = function (params) {
        return new Promise(function (resolve, reject) {
            wx.getBLEDeviceServices({ deviceId: params.deviceId, success: resolve, fail: reject });
        });
    };
    /**
     * 获取蓝牙设备某个服务中所有特征值(characteristic)
     *
     */
    tenp.getBLEDeviceCharacteristics = function (params) {
        return new Promise(function (resolve, reject) {
            wx.getBLEDeviceCharacteristics({ deviceId: params.deviceId, serviceId: params.serviceId, success: resolve, fail: reject });
        });
    };
    /**
     * 连接低功耗蓝牙设备
     *
     * 若小程序在之前已有搜索过某个蓝牙设备，并成功建立连接，可直接传入之前搜索获取的 deviceId 直接尝试连接该设备，无需进行搜索操作
     */
    tenp.createBLEConnection = function (params) {
        return new Promise(function (resolve, reject) {
            wx.createBLEConnection({ deviceId: params.deviceId, timeout: params.timeout, success: resolve, fail: reject });
        });
    };
    /**
     * 断开与低功耗蓝牙设备的连接
     *
     */
    tenp.closeBLEConnection = function (params) {
        return new Promise(function (resolve, reject) {
            wx.closeBLEConnection({ deviceId: params.deviceId, success: resolve, fail: reject });
        });
    };
    /**
     * 向低功耗蓝牙设备特征值中写入二进制数据。注意：必须设备的特征值支持 write 才可以成功调用
     *
     */
    tenp.writeBLECharacteristicValue = function (params) {
        return new Promise(function (resolve, reject) {
            wx.writeBLECharacteristicValue(__assign({}, params, { success: resolve, fail: reject }));
        });
    };
    /**
     * 添加手机通讯录联系人。用户可以选择将该表单以「新增联系人」或「添加到已有联系人」的方式，写入手机系统通讯录
     *
     * @version 1.2.0
     */
    tenp.addPhoneContact = function (params) {
        return new Promise(function (resolve, reject) {
            wx.addPhoneContact(__assign({}, params, { success: resolve, fail: reject }));
        });
    };
    /**
     * 停止搜寻附近的蓝牙外围设备。若已经找到需要的蓝牙设备并不需要继续搜索时，建议调用该接口停止蓝牙搜索
     *
     */
    tenp.stopBluetoothDevicesDiscovery = function () {
        return new Promise(function (resolve, reject) {
            wx.stopBluetoothDevicesDiscovery({ success: resolve, fail: reject });
        });
    };
    /**
     * 开始搜寻附近的蓝牙外围设备。此操作比较耗费系统资源，请在搜索并连接到设备后调用 [wx.stopBluetoothDevicesDiscovery](https://developers.weixin.qq.com/miniprogram/dev/api/device/bluetooth/wx.stopBluetoothDevicesDiscovery.html) 方法停止搜索
     *
     */
    tenp.startBluetoothDevicesDiscovery = function (params) {
        return new Promise(function (resolve, reject) {
            wx.startBluetoothDevicesDiscovery(__assign({}, params, { success: resolve, fail: reject }));
        });
    };
    /**
     * 初始化蓝牙模块
     *
     */
    tenp.openBluetoothAdapter = function () {
        return new Promise(function (resolve, reject) {
            wx.openBluetoothAdapter({ success: resolve, fail: reject });
        });
    };
    /**监听寻找到新设备的事件 */
    tenp.onBluetoothDeviceFound = function (callback) {
        wx.onBluetoothDeviceFound(callback);
    };
    /**监听蓝牙适配器状态变化事件 */
    tenp.onBluetoothAdapterStateChange = function (callback) {
        wx.onBluetoothAdapterStateChange(callback);
    };
    /**
     * 根据 uuid 获取处于已连接状态的设备
     *
     */
    tenp.getConnectedBluetoothDevices = function (params) {
        return new Promise(function (resolve, reject) {
            wx.getConnectedBluetoothDevices({ services: params.services, success: resolve, fail: reject });
        });
    };
    /**
     * 获取在蓝牙模块生效期间所有已发现的蓝牙设备。包括已经和本机处于连接状态的设备
     *
     */
    tenp.getBluetoothDevices = function () {
        return new Promise(function (resolve, reject) {
            wx.getBluetoothDevices({ success: resolve, fail: reject });
        });
    };
    /**
     * 获取本机蓝牙适配器状态
     *
     */
    tenp.getBluetoothAdapterState = function () {
        return new Promise(function (resolve, reject) {
            wx.getBluetoothAdapterState({ success: resolve, fail: reject });
        });
    };
    /**
     * 关闭蓝牙模块。调用该方法将断开所有已建立的连接并释放系统资源。建议在使用蓝牙流程后，与 [wx.openBluetoothAdapter](https://developers.weixin.qq.com/miniprogram/dev/api/device/bluetooth/wx.openBluetoothAdapter.html) 成对调用
     *
     */
    tenp.closeBluetoothAdapter = function () {
        return new Promise(function (resolve, reject) {
            wx.closeBluetoothAdapter({ success: resolve, fail: reject });
        });
    };
    /**wx.getBatteryInfo 的同步版本 */
    tenp.getBatteryInfoSync = function () {
        return wx.getBatteryInfoSync();
    };
    /**
     * 获取设备电量。同步 API [wx.getBatteryInfoSync](https://developers.weixin.qq.com/miniprogram/dev/api/device/battery/wx.getBatteryInfoSync.html) 在 iOS 上不可用
     *
     */
    tenp.getBatteryInfo = function (params) {
        return new Promise(function (resolve, reject) {
            wx.getBatteryInfo({ deviceId: params.deviceId, success: resolve, fail: reject });
        });
    };
    /**
     * 设置系统剪贴板的内容
     *
     */
    tenp.setClipboardData = function (params) {
        return new Promise(function (resolve, reject) {
            wx.setClipboardData({ data: params.data, success: resolve, fail: reject });
        });
    };
    /**
     * 获取系统剪贴板的内容
     *
     */
    tenp.getClipboardData = function () {
        return new Promise(function (resolve, reject) {
            wx.getClipboardData({ success: resolve, fail: reject });
        });
    };
    /**
     * 关闭 NFC 模块。仅在安卓系统下有效
     *
     * @version 1.7.0
     */
    tenp.stopHCE = function () {
        return new Promise(function (resolve, reject) {
            wx.stopHCE({ success: resolve, fail: reject });
        });
    };
    /**
     * 初始化 NFC 模块
     *
     * @version 1.7.0
     */
    tenp.startHCE = function (params) {
        return new Promise(function (resolve, reject) {
            wx.startHCE({ aid_list: params.aid_list, success: resolve, fail: reject });
        });
    };
    /**
     * 发送 NFC 消息。仅在安卓系统下有效
     *
     * @version 1.7.0
     */
    tenp.sendHCEMessage = function (params) {
        return new Promise(function (resolve, reject) {
            wx.sendHCEMessage({ data: params.data, success: resolve, fail: reject });
        });
    };
    /**
     * 监听接收 NFC 设备消息事件
     *
     * @version 1.7.0
     */
    tenp.onHCEMessage = function (call) {
        wx.onHCEMessage(call);
    };
    /**
     * 判断当前设备是否支持 HCE 能力
     *
     * @version 1.7.0
     */
    tenp.getHCEState = function () {
        return new Promise(function (resolve, reject) {
            wx.getHCEState({ success: resolve, fail: reject });
        });
    };
    /**监听网络状态变化事件 */
    tenp.onNetworkStatusChange = function (callback) {
        wx.onNetworkStatusChange(callback);
    };
    /**
     * 获取网络类型
     *
     */
    tenp.getNetworkType = function () {
        return new Promise(function (resolve, reject) {
            wx.getNetworkType({ success: resolve, fail: reject });
        });
    };
    /**
     * 设置屏幕亮度
     *
     * @version 1.2.0
     */
    tenp.setScreenBrightness = function (params) {
        return new Promise(function (resolve, reject) {
            wx.setScreenBrightness({ value: params.value, success: resolve, fail: reject });
        });
    };
    /**
     * 设置是否保持常亮状态。仅在当前小程序生效，离开小程序后设置失效
     *
     * @version 1.4.0
     */
    tenp.setKeepScreenOn = function (params) {
        return new Promise(function (resolve, reject) {
            wx.setKeepScreenOn({ keepScreenOn: params.keepScreenOn, success: resolve, fail: reject });
        });
    };
    /**
     * 监听用户主动截屏事件。用户使用系统截屏按键截屏时触发
     *
     * @version 1.4.0
     */
    tenp.onUserCaptureScreen = function (callback) {
        wx.onUserCaptureScreen(callback);
    };
    /**
     * 获取屏幕亮度
     *
     * @version 1.2.0
     */
    tenp.getScreenBrightness = function () {
        return new Promise(function (resolve, reject) {
            wx.getScreenBrightness({ success: resolve, fail: reject });
        });
    };
    /**
     * 拨打电话
     *
     */
    tenp.makePhoneCall = function (params) {
        return new Promise(function (resolve, reject) {
            wx.makePhoneCall({ phoneNumber: params.phoneNumber, success: resolve, fail: reject });
        });
    };
    /**
     * 停止监听加速度数据
     *
     */
    tenp.stopAccelerometer = function () {
        return new Promise(function (resolve, reject) {
            wx.stopAccelerometer({ success: resolve, fail: reject });
        });
    };
    /**
     * 开始监听加速度数据
     *
     */
    tenp.startAccelerometer = function (params) {
        if (params === void 0) { params = {}; }
        return new Promise(function (resolve, reject) {
            wx.startAccelerometer({ interval: params.interval, success: resolve, fail: reject });
        });
    };
    /**
     * 监听加速度数据事件。频率根据 [wx.startAccelerometer()](https://developers.weixin.qq.com/miniprogram/dev/api/device/accelerometer/wx.startAccelerometer.html) 的 interval 参数。可使用 [wx.stopAccelerometer()](https://developers.weixin.qq.com/miniprogram/dev/api/device/accelerometer/wx.stopAccelerometer.html) 停止监听
     */
    tenp.onAccelerometerChange = function (callback) {
        wx.onAccelerometerChange(callback);
    };
    /**
     * 停止监听罗盘数据
     *
     */
    tenp.stopCompass = function () {
        return new Promise(function (resolve, reject) {
            wx.stopCompass({ success: resolve, fail: reject });
        });
    };
    /**
     * 开始监听罗盘数据
     *
     */
    tenp.startCompass = function () {
        return new Promise(function (resolve, reject) {
            wx.startCompass({ success: resolve, fail: reject });
        });
    };
    /**监听罗盘数据变化事件。频率：5 次/秒，接口调用后会自动开始监听，可使用 wx.stopCompass 停止监听 */
    tenp.onCompassChange = function (callback) {
        wx.onCompassChange(callback);
    };
    /**
     * 停止监听设备方向的变化
     *
     * @version 2.3.0
     */
    tenp.stopDeviceMotionListening = function () {
        return new Promise(function (resolve, reject) {
            wx.stopDeviceMotionListening({ success: resolve, fail: reject });
        });
    };
    /**
     * 开始监听设备方向的变化
     *
     * @version 2.3.0
     */
    tenp.startDeviceMotionListening = function (params) {
        if (params === void 0) { params = {}; }
        return new Promise(function (resolve, reject) {
            wx.startDeviceMotionListening({ interval: params.interval, success: resolve, fail: reject });
        });
    };
    /**
     * 监听设备方向变化事件。频率根据 wx.startDeviceMotionListening() 的 interval 参数。可以使用 wx.stopDeviceMotionListening() 停止监听
     *
     * @version 2.3.0
     */
    tenp.onDeviceMotionChange = function (call) {
        wx.onDeviceMotionChange(call);
    };
    /**
     * 停止监听陀螺仪数据
     *
     * @version 2.3.0
     */
    tenp.stopGyroscope = function () {
        return new Promise(function (resolve, reject) {
            wx.stopGyroscope({ success: resolve, fail: reject });
        });
    };
    /**
     * 开始监听陀螺仪数据
     *
     * @version 2.3.0
     */
    tenp.startGyroscope = function (params) {
        return new Promise(function (resolve, reject) {
            wx.startGyroscope({ interval: params.interval, success: resolve, fail: reject });
        });
    };
    /**
     * 监听陀螺仪数据变化事件。频率根据 [wx.startGyroscope()](https://developers.weixin.qq.com/miniprogram/dev/api/device/gyroscope/wx.startGyroscope.html) 的 interval 参数。可以使用 [wx.stopGyroscope()](https://developers.weixin.qq.com/miniprogram/dev/api/device/gyroscope/wx.stopGyroscope.html) 停止监听
     *
     * @version 2.3.0
     */
    tenp.onGyroscopeChange = function (callback) {
        wx.onGyroscopeChange(callback);
    };
    /**
     * 监听内存不足告警事件
     *
     * 当 iOS/Android 向小程序进程发出内存警告时，触发该事件。触发该事件不意味小程序被杀，大部分情况下仅仅是告警，开发者可在收到通知后回收一些不必要资源避免进一步加剧内存紧张
     *
     * @version 2.0.2
     */
    tenp.onMemoryWarning = function (callback) {
        wx.onMemoryWarning(callback);
    };
    /**
     * 调起客户端扫码界面进行扫码
     *
     */
    tenp.scanCode = function (params) {
        return new Promise(function (resolve, reject) {
            wx.scanCode({ onlyFromCamera: params.onlyFromCamera, scanType: params.scanType, success: resolve, fail: reject });
        });
    };
    /**
     * 使手机发生较短时间的振动（15 ms）。仅在 iPhone 7 / 7 Plus 以上及 Android 机型生效
     *
     * @version 1.2.0
     */
    tenp.vibrateShort = function () {
        return new Promise(function (resolve, reject) {
            wx.vibrateShort({ success: resolve, fail: reject });
        });
    };
    /**
     * 使手机发生较长时间的振动（400 ms)
     *
     * @version 1.2.0
     */
    tenp.vibrateLong = function () {
        return new Promise(function (resolve, reject) {
            wx.vibrateLong({ success: resolve, fail: reject });
        });
    };
    /**
     * 创建一个 Worker 线程。目前限制最多只能创建一个 [Worker](https://developers.weixin.qq.com/miniprogram/dev/framework/workers.html)，创建下一个 Worker 前请先调用 [Worker.terminate](https://developers.weixin.qq.com/miniprogram/dev/api/worker/Worker.terminate.html)
     *
     * @version 1.9.90
     */
    tenp.createWorker = function (scriptPath) {
        return wx.createWorker(scriptPath);
    };
    /**wx.getExtConfig 的同步版本 */
    tenp.getExtConfigSync = function () {
        return wx.getExtConfigSync();
    };
    /**
     * 获取第三方平台自定义的数据字段
     *
     */
    tenp.getExtConfig = function () {
        return new Promise(function (resolve, reject) {
            wx.getExtConfig({ success: resolve, fail: reject });
        });
    };
    /**
     * 返回一个 SelectorQuery 对象实例。在自定义组件或包含自定义组件的页面中，应使用 this.createSelectorQuery() 来代替
     *
     * @version 1.4.0
     */
    tenp.createSelectorQuery = function () {
        return wx.createSelectorQuery();
    };
    /**
     * 创建并返回一个 IntersectionObserver 对象实例。在自定义组件或包含自定义组件的页面中，应使用 this.createIntersectionObserver([options]) 来代替
     *
     * @version 1.9.3
     */
    tenp.createIntersectionObserver = function (context, options) {
        return wx.createIntersectionObserver(context, options);
    };
    /**
     * 创建激励视频广告组件。请通过 [wx.getSystemInfoSync()](https://developers.weixin.qq.com/miniprogram/dev/api/base/system/system-info/wx.getSystemInfoSync.html) 返回对象的 SDKVersion 判断基础库版本号后再使用该 API（小游戏端要求 >= 2.0.4， 小程序端要求 >= 2.6.0）。调用该方法创建的激励视频广告是一个单例（小游戏端是全局单例，小程序端是页面内单例，在小程序端的单例对象不允许跨页面使用）
     *
     * @version 2.0.4
     */
    tenp.createRewardedVideoAd = function (adUnitId) {
        return wx.createRewardedVideoAd(adUnitId);
    };
    /**
     * 创建插屏广告组件。请通过 [wx.getSystemInfoSync()](https://developers.weixin.qq.com/miniprogram/dev/api/base/system/system-info/wx.getSystemInfoSync.html) 返回对象的 SDKVersion 判断基础库版本号后再使用该 API。每次调用该方法创建插屏广告都会返回一个全新的实例（小程序端的插屏广告实例不允许跨页面使用）
     *
     * @version 2.6.0
     */
    tenp.createInterstitialAd = function (adUnitId) {
        return wx.createInterstitialAd(adUnitId);
    };
})(tenp || (tenp = {}));
exports["default"] = tenp;
