export interface PageConfig {
    render?: any[];
    template?: string;
    style?: string[] | string;
    filters?: Function[];
    components?: {};
    /**
     * 导航栏背景颜色，如 #000000
     * @type {[type]}
     */
    navigationBarBackgroundColor?: string;
    /**
     * 导航栏标题颜色，仅支持 black / white
     * 默认white
     */
    navigationBarTextStyle?: 'black' | 'white';
    /**
     * 导航栏标题文字内容
     * @type {[type]}
     */
    navigationBarTitleText?: string;
    /**
     * 导航栏样式，仅支持以下值：
     * default 默认样式
     * custom 自定义导航栏，只保留右上角胶囊按钮
     */
    navigationStyle?: 'default' | 'custom';
    /**
     * 窗口的背景色
     * @type {[type]}
     */
    backgroundColor?: string;
    /**
     * 下拉 loading 的样式，仅支持 dark / light
     */
    backgroundTextStyle?: 'dark' | 'light';
    /**
     * 顶部窗口的背景色，仅 iOS 支持
     * @type {[type]}
     */
    backgroundColorTop?: string;
    /**
     * 底部窗口的背景色，仅 iOS 支持
     * @type {[type]}
     */
    backgroundColorBottom?: string;
    /**
     * 是否开启当前页面下拉刷新
     * @type {[type]}
     */
    enablePullDownRefresh?: boolean;
    /**
     * 页面上拉触底事件触发时距页面底部距离，单位为px。
     * 默认值:50
     * @type {[type]}
     */
    onReachBottomDistance?: number;
    /**
     * 屏幕旋转设置，支持 auto / portrait / landscape
     */
    pageOrientation?: 'auto' | 'portrait' | 'landscape';
    /**
     * 设置为 true 则页面整体不能上下滚动。
     * 只在页面配置中有效，无法在 app.json 中设置
     * @type {[type]}
     */
    disableScroll?: boolean;
    /**
     * 禁止页面右滑手势返回
     * @type {[type]}
     */
    disableSwipeBack?: boolean;
}
export interface AppConfig {
    pages: any[];
    plugins?: {
        [prop: string]: {
            version: string;
            provider: string;
        };
    };
    style?: string[] | string;
    components?: {};
    window?: {
        navigationBarBackgroundColor?: string;
        navigationBarTextStyle?: string;
        navigationBarTitleText?: string;
        navigationStyle?: string;
        backgroundColor?: string;
        backgroundTextStyle?: string;
        backgroundColorTop?: string;
        backgroundColorBottom?: string;
        enablePullDownRefresh?: boolean;
        onReachBottomDistance?: number;
        pageOrientation?: string;
    };
    tabBar?: {
        color?: string;
        selectedColor?: string;
        backgroundColor?: string;
        borderStyle?: 'blac' | 'white';
        list?: {
            pagePath: string;
            text: string;
            iconPath?: string;
            selectedIconPath?: string;
        }[];
        position?: 'bottom' | 'top';
        custom?: boolean;
    };
    networkTimeout?: {
        request?: number;
        connectSocket?: number;
        uploadFile?: number;
        downloadFile?: number;
    };
    debug?: boolean;
    functionalPages?: boolean;
    subpackages?: any;
    workers?: string;
    requiredBackgroundModes?: string[];
    preloadRule?: any;
    resizable?: boolean;
    navigateToMiniProgramAppIdList?: string[];
    permission?: any;
    sitemapLocation?: string;
}
export interface ComponentOptions {
    /**
     * isolated 表示启用样式隔离，在自定义组件内外，使用 class 指定的样式将不会相互影响（一般情况下的默认值）；
     * apply-shared 表示页面 wxss 样式将影响到自定义组件，但自定义组件 wxss 中指定的样式不会影响页面；
     * shared 表示页面 wxss 样式将影响到自定义组件，自定义组件 wxss 中指定的样式也会影响页面和其他设置了 apply-shared 或 shared 的自定义组件。（这个选项在插件中不可用。）
     * @type {[type]}
     */
    styleIsolation?: 'isolated' | 'apply-shared' | 'shared';
    /**
     *  这个选项等价于设置 styleIsolation: apply-shared ，但设置了 styleIsolation 选项后这个选项会失效
     * @type {[type]}
     */
    addGlobalClass?: boolean;
    /**
     * 有时，组件希望接受外部传入的样式类。此时可以在 Component 中用 externalClasses 定义段定义若干个外部样式类。这个特性从小程序基础库版本 1.9.90 开始支持。
     */
    externalClasses?: string[];
    /**
     * 在组件定义时的选项中启用多slot支持
     * @type {[type]}
     */
    multipleSlots?: boolean;
}
export interface ComponentConfig {
    render?: any[];
    template?: string;
    filters?: Function[];
    style?: string[] | string;
    components?: {};
}
export declare const getCommonMethod: (name: string) => {
    [prop: string]: Function;
};
export declare const install: (name: string, callback: Function) => void;
export declare const Component: (name: string, callback: Function) => void;
export declare const Page: (name: string, callback: Function) => void;
export declare const App: (name: string, callback: Function) => void;
export declare const beforeRouter: (call: Function) => void;
export declare const afterRouter: (call: Function) => void;
export declare class Dep {
    list: any;
    add(name: string, /*string*/ data: any): void;
    remove(name: string): void;
    watch($this: any, prop: string, value: string): void;
}
export declare const watch: (params: any, type: string) => any;
/**
 * 判断小程序的API，回调，参数，组件等是否在当前版本可用
 *
 * @version 1.1.1
 */
export declare const canIUse: (schema: string) => boolean;
/**
 * 将 Base64 字符串转成 ArrayBuffer 对象
 *
 * 从基础库 2.4.0 开始，本接口停止维护
 *
 * @version 1.1.1
 */
export declare const base64ToArrayBuffer: (base: string) => ArrayBuffer;
/**
 * 将 ArrayBuffer 对象转成 Base64 字符串
 *
 * 从基础库 2.4.0 开始，本接口停止维护
 *
 * @version 1.1.0
 */
export declare const arrayBufferToBase64: (buffer: ArrayBuffer) => string;
export declare const getSystemInfoSync: () => any;
/**获取系统信息 */
export declare const getSystemInfo: () => Promise<any>;
/**
 * 获取全局唯一的版本更新管理器，用于管理小程序更新。关于小程序的更新机制，可以查看[运行机制](https://developers.weixin.qq.com/miniprogram/dev/framework/runtime/operating-mechanism.html)文档
 *
 * @version 1.9.90
 */
export declare const getUpdateManager: () => any;
/**
 * 获取小程序启动时的参数。与 [App.onLaunch](https://developers.weixin.qq.com/miniprogram/dev/reference/api/App.html#onlaunchobject-object) 的回调参数一致
 *
 * @version 2.1.2
 */
export declare const getLaunchOptionsSync: (call: (params: any) => void) => void;
/**
 * 监听小程序要打开的页面不存在事件
 *
 * @version 2.1.2
 */
export declare const onPageNotFound: (call: (params: {
    path: string;
    query: any;
    isEntryPage: boolean;
}) => void) => void;
/**
 * 监听小程序错误事件。如脚本错误或 API 调用报错等
 *
 * @version 2.1.2
 */
export declare const onError: (call: (error: any) => void) => void;
/**
 * 监听音频中断结束事件。在收到 onAudioInterruptionBegin 事件之后，小程序内所有音频会暂停，收到此事件之后才可再次播放成功
 *
 * @version 2.6.2
 */
export declare const onAudioInterruptionEnd: (call: () => void) => void;
/**
 * 监听音频因为受到系统占用而被中断开始事件。以下场景会触发此事件：闹钟、电话、FaceTime 通话、微信语音聊天、微信视频聊天。此事件触发后，小程序内所有音频会暂停。
 *
 * @version 2.6.2
 */
export declare const onAudioInterruptionBegin: (call: () => void) => void;
/**
 * 监听小程序要打开的页面不存在事件
 *
 * @version 2.1.2
 */
export declare const onAppShow: (call: (params: {
    /** 小程序切前台的路径 */
    path: string;
    /** 小程序切前台的场景值 */
    scene: number;
    /** 小程序切前台的 query 参数 */
    query: Object;
    /** shareTicket，详见获取更多转发信息 */
    shareTicket: string;
    /** 来源信息。从另一个小程序、公众号或 App 进入小程序时返回。否则返回 {}。(参见后文注意) */
    referrerInfo: {
        appId: string;
        extraData: any;
    };
}) => void) => void;
/**
 * 监听小程序要打开的页面不存在事件
 *
 * @version 2.1.2
 */
export declare const onAppHide: (call: () => void) => void;
/**
 * 取消监听小程序要打开的页面不存在事件
 *
 * @version 2.1.2
 */
export declare const offPageNotFound: (call: () => void) => void;
/**
 * 取消监听小程序错误事件
 *
 * @version 2.1.2
 */
export declare const offError: (call: () => void) => void;
/**
 * 取消监听音频中断结束事件
 *
 * @version 2.6.2
 */
export declare const offAudioInterruptionEnd: (call: () => void) => void;
/**
 * 取消监听音频因为受到系统占用而被中断开始事件
 *
 * @version 2.6.2
 */
export declare const offAudioInterruptionBegin: (call: () => void) => void;
/**
 * 取消监听小程序切前台事件
 *
 * @version 2.1.2
 */
export declare const offAppShow: (call: () => void) => void;
/**
 * 取消监听小程序切后台事件
 *
 * @version 2.1.2
 */
export declare const offAppHide: (call: () => void) => void;
/**
 * 设置是否打开调试开关。此开关对正式版也能生效
 *
 * @version 1.4.0
 */
export declare const setEnableDebug: (params: {
    enableDebug: boolean;
}) => Promise<any>;
/**
 * 获取日志管理器对象。
 *
 * @version 2.1.0
 */
export declare const getLogManager: (params: {
    level: number;
}) => any;
/**
 * 跳转到 tabBar 页面，并关闭其他所有非 tabBar 页面
 */
export declare const switchTab: (params: {
    url: string;
}) => Promise<any>;
/**
 * 关闭所有页面，打开到应用内的某个页面
 *
 * @version 1.1.0
 */
export declare const reLaunch: (params: {
    url: string;
}) => Promise<any>;
/**关闭当前页面，跳转到应用内的某个页面。但是不允许跳转到 tabbar 页面 */
export declare const redirectTo: (params: {
    url: string;
}) => Promise<any>;
/**
 * 保留当前页面，跳转到应用内的某个页面。但是不能跳到 tabbar 页面。
 *
 * 使用 [wx.navigateBack](https://developers.weixin.qq.com/miniprogram/dev/api/route/wx.navigateBack.html) 可以返回到原页面。小程序中页面栈最多十层
 */
export declare const navigateTo: (params: {
    url: string;
}) => Promise<any>;
/**
 * 关闭当前页面，返回上一页面或多级页面。可通过 [getCurrentPages](https://developers.weixin.qq.com/miniprogram/dev/reference/api/getCurrentPages.html) 获取当前的页面栈，决定需要返回几层
 */
export declare const navigateBack: (params?: {
    delta: number;
}) => Promise<any>;
/**
 * 显示消息提示框
 */
export declare const showToast: (params: {
    title?: string;
    icon?: string;
    image?: string;
    duration?: number;
    mask?: boolean;
}) => Promise<any>;
/**
 * 显示模态对话框
 */
export declare const showModal: (params: {
    title?: string;
    content?: string;
    showCancel?: boolean;
    cancelText?: string;
    cancelColor?: string;
    confirmText?: string;
    confirmColor?: string;
}) => Promise<any>;
/**
 * 显示 loading 提示框。需主动调用 wx.hideLoading 才能关闭提示框
 */
export declare const showLoading: (params: {
    title?: string;
    mask?: boolean;
}) => Promise<any>;
/**
 * 显示操作菜单
 */
export declare const showActionSheet: (params: {
    itemList: string[];
    itemColor?: string;
}) => Promise<any>;
/**
 * 隐藏 loading 提示框
 */
export declare const hideLoading: () => Promise<any>;
/**
 * 隐藏消息提示框
 */
export declare const hideToast: () => Promise<any>;
/**
 * 在当前页面显示导航条加载动画
 */
export declare const showNavigationBarLoading: () => Promise<any>;
/**
 * 动态设置当前页面的标题
 */
export declare const setNavigationBarTitle: (params: {
    title: string;
}) => Promise<any>;
/**
 * 设置页面导航条颜色
 *
 * @version 1.4.0
 */
export declare const setNavigationBarColor: (params: {
    frontColor: string;
    backgroundColor: string;
    animation: {
        duration: number;
        timingFunc: "linear" | "easeIn" | "easeOut" | "easeInOut  ";
    };
}) => Promise<any>;
/**
 * 在当前页面隐藏导航条加载动画
 */
export declare const hideNavigationBarLoading: () => Promise<any>;
/**
 * 动态设置下拉背景字体、loading 图的样式
 *
 * @version 2.1.0
 */
export declare const setBackgroundTextStyle: (params: {
    textStyle: "dark" | "light";
}) => Promise<any>;
/**
 * 显示 tabBar 某一项的右上角的红点
 *
 * @version 1.9.0
 */
export declare const showTabBarRedDot: (params: {
    index?: number;
}) => Promise<any>;
/**
 * 显示 tabBar
 *
 * @version 1.9.0
 */
export declare const showTabBar: (params?: {
    animation?: boolean;
}) => Promise<any>;
/**
 * 动态设置 tabBar 的整体样式
 *
 * @version 1.9.0
 */
export declare const setTabBarStyle: (params: {
    color: string;
    selectedColor: string;
    backgroundColor: string;
    borderStyle: any;
}) => Promise<any>;
/**
 * 动态设置 tabBar 某一项的内容，2.7.0 起图片支持临时文件和网络文件
 *
 * @version 1.9.0
 */
export declare const setTabBarItem: (params: {
    index: number;
    text?: string;
    iconPath?: string;
    selectedIconPath?: string;
}) => Promise<any>;
/**
 * 为 tabBar 某一项的右上角添加文本
 *
 * @version 1.9.0
 */
export declare const setTabBarBadge: (params: {
    index: number;
    text: string;
}) => Promise<any>;
/**
 * 移除 tabBar 某一项右上角的文本
 *
 * @version 1.9.0
 */
export declare const removeTabBarBadge: (params: {
    index: number;
}) => Promise<any>;
/**
 * 隐藏 tabBar 某一项的右上角的红点
 *
 * @version 1.9.0
 */
export declare const hideTabBarRedDot: (params: {
    index: number;
}) => Promise<any>;
/**
 * 移除 tabBar 某一项右上角的文本
 *
 * @version 1.9.0
 */
export declare const hideTabBar: (params?: {
    animation?: boolean;
}) => Promise<any>;
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
export declare const loadFontFace: (params: {
    family: string;
    source: string;
    desc?: {
        style?: "normal" | "italic" | "oblique";
        weight?: "normal" | "bold" | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;
        variant?: "normal" | "inherit" | "small-caps";
    };
}) => Promise<any>;
/**
 * 停止当前页面下拉刷新
 *
 * @version 1.5.0
 */
export declare const stopPullDownRefresh: () => Promise<any>;
/**
 * 开始下拉刷新。调用后触发下拉刷新动画，效果与用户手动下拉刷新一致
 *
 * @version 1.5.0
 */
export declare const startPullDownRefresh: () => Promise<any>;
/**
 * 将页面滚动到目标位置，支持选择器和滚动距离两种方式定位
 *
 * @version 1.4.0
 */
export declare const pageScrollTo: (params: {
    scrollTop: number;
    duration?: number;
    selector?: string;
}) => Promise<any>;
/**
 * 将页面滚动到目标位置，支持选择器和滚动距离两种方式定位
 *
 */
export declare const createAnimation: (params: {
    timingFunction?: "linear" | "ease" | "ease-in" | "ease-in-out" | "ease-out" | "step-start" | "step-end";
    delay?: number;
    transformOrigin?: string;
    duration?: number;
    selector?: string;
}) => any;
/**
 * 将页面滚动到目标位置，支持选择器和滚动距离两种方式定位
 *
 * 从基础库 1.9.9 开始，本接口停止维护
 *
 * @version 1.4.3
 */
export declare const setTopBarText: (params: {
    text: string;
}) => Promise<any>;
/**
 * 延迟一部分操作到下一个时间片再执行。（类似于 setTimeout）
 *
 * @version 2.2.3
 */
export declare const nextTick: (call: () => void) => void;
/**
 * 获取菜单按钮（右上角胶囊按钮）的布局位置信息。坐标信息以屏幕左上角为原点
 *
 * @version 2.1.0
 */
export declare const getMenuButtonBoundingClientRect: () => {
    width: number;
    height: number;
    left: number;
    top: number;
    right: number;
    bottom: number;
};
/**
 * 监听窗口尺寸变化事件
 *
 * @version 2.3.0
 */
export declare const onWindowResize: (call: (res: {
    size: {
        windowWidth: number;
        windowHeight: number;
    };
}) => void) => void;
/**
 * 取消监听窗口尺寸变化事件
 *
 * @version 2.3.0
 */
export declare const offWindowResize: () => void;
/**
 * 监听键盘高度变化
 *
 * @version 2.7.0
 */
export declare const onKeyboardHeightChange: (call: (res: {
    height: number;
}) => void) => void;
/**
 * 在input、textarea等focus之后，获取输入框的光标位置。注意：只有在focus的时候调用此接口才有效
 *
 * @version 2.7.0
 */
export declare const getSelectedTextRange: (call: (res: any) => void) => void;
/**
 * 下载文件资源到本地。客户端直接发起一个 HTTPS GET 请求，返回文件的本地临时路径，单次下载允许的最大文件为 50MB。使用前请注意阅读[相关说明](https://developers.weixin.qq.com/miniprogram/dev/framework/ability/network.html)
 *
 * 注意：请在服务端响应的 header 中指定合理的 Content-Type 字段，以保证客户端正确处理文件类型
 */
export declare const downloadFile: (params: {
    url: string;
    header?: any;
    filePath?: string;
}) => Promise<any>;
/**
 * 将本地资源上传到服务器。客户端发起一个 HTTPS POST 请求，其中 content-type 为 multipart/form-data。使用前请注意阅读[相关说明](https://developers.weixin.qq.com/miniprogram/dev/framework/ability/network.html)
 *
 */
export declare const uploadFile: (params: {
    url: string;
    filePath: string;
    name: string;
    formData: any;
    header?: any;
}) => Promise<any>;
/**
 * 经过修改过的request方法,采用Promise形式,支持全局transformResponse/transformRequest/transformError处理
 * @param request
 * @version 0.0.0
 */
export declare const request: (optios: any) => any;
/**
 * [wx.setStorage](https://developers.weixin.qq.com/miniprogram/dev/api/storage/wx.setStorage.html) 的同步版本
 */
export declare const setStorageSync: (key: string, value: any) => void;
/**
 * [wx.removeStorage](https://developers.weixin.qq.com/miniprogram/dev/api/storage/wx.removeStorage.html) 的同步版本
 */
export declare const removeStorageSync: (key: string) => void;
/**
 * [wx.getStorage]() 的同步版本
 */
export declare const getStorageSync: (key: string) => any;
/**
 * [wx.clearStorage]() 的同步版本
 */
export declare const clearStorageSync: () => void;
/**
 * 将数据存储在本地缓存中指定的 key 中。会覆盖掉原来该 key 对应的内容。除非用户主动删除或因存储空间原因被系统清理，否则数据都一直可用。单个 key 允许存储的最大数据长度为 1MB，所有数据存储上限为 10MB
 */
export declare const setStorage: (params: {
    key: string;
    data: any;
}) => Promise<any>;
/**
 * 从本地缓存中移除指定 key
 */
export declare const removeStorage: (params: {
    key: string;
}) => Promise<any>;
/**从本地缓存中异步获取指定 key 的内容 */
export declare const getStorage: (params: {
    key: string;
}) => Promise<any>;
/**
 * 清理本地数据缓存
 */
export declare const clearStorage: () => Promise<any>;
/**异步获取当前storage的相关信息 */
export declare const getStorageInfo: () => Promise<any>;
/**wx.getStorageInfo 的同步版本 */
export declare const getStorageInfoSync: () => any;
/**
 * 创建 map 上下文 [MapContext](https://developers.weixin.qq.com/miniprogram/dev/api/media/map/MapContext.html) 对象。
 */
export declare const createMapContext: (mapId: string) => any;
/**
 * 保存图片到系统相册
 *
 * 调用前需要 [用户授权](https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/authorize.html) scope.writePhotosAlbum
 *
 * @version 1.2.0
 */
export declare const saveImageToPhotosAlbum: (params: {
    filePath: string;
}) => Promise<any>;
/**
 * 在新页面中全屏预览图片。预览的过程中用户可以进行保存图片、发送给朋友等操作
 *
 */
export declare const previewImage: (params: {
    urls: string[];
    current?: string;
}) => Promise<any>;
/**
 * 获取图片信息。网络图片需先配置download域名才能生效
 */
export declare const getImageInfo: (params: {
    src: string;
}) => Promise<any>;
/**
 * 压缩图片接口，可选压缩质量
 *
 * @version 2.4.0
 */
export declare const compressImage: (params: {
    src: string;
    quality?: number;
}) => Promise<any>;
/**
 * 从客户端会话选择文件
 *
 * @version 2.5.0
 */
export declare const chooseMessageFile: (params: {
    count: number;
    type?: "all" | "video" | "image" | "file";
    extension?: string[];
}) => Promise<{
    tempFiles: {
        /**本地临时文件路径*/
        path: string;
        /**本地临时文件大小，单位 B*/
        size: number;
        /**选择的文件名称*/
        name: string;
        /**选择的文件类型*/
        type: string;
        /**选择的文件的会话发送时间，Unix时间戳，工具暂不支持此属性*/
        time: number;
    }[];
}>;
/**关闭 WebSocket 连接 */
export declare const closeSocket: (params?: {
    code?: number;
    reason?: string;
}) => Promise<any>;
/**
 * 从本地相册选择图片或使用相机拍照
 *
 */
export declare const chooseImage: (params: {
    count: number;
    sizeType?: ("original" | "compressed")[];
    sourceType?: ("album" | "camera")[];
}) => Promise<any>;
/**
 * 保存视频到系统相册。支持mp4视频格式
 *
 * 调用前需要 [用户授权](https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/authorize.html) scope.writePhotosAlbum
 *
 * @version 1.2.0
 */
export declare const saveVideoToPhotosAlbum: (params: {
    filePath: string;
}) => Promise<any>;
/**
 * 创建 video 上下文 [VideoContext](https://developers.weixin.qq.com/miniprogram/dev/api/media/video/VideoContext.html) 对象
 *
 */
export declare const createVideoContext: (videoId: string) => any;
/**
 * 拍摄视频或从手机相册中选视频
 *
 */
export declare const chooseVideo: (params?: {
    compressed?: boolean;
    maxDuration?: number;
    camera?: "back" | "front";
    sourceType?: ("album" | "camera")[];
}) => Promise<any>;
/**
 * 结束播放语音
 *
 * 从基础库 1.6.0 开始，本接口停止维护，请使用 [wx.createInnerAudioContext](https://developers.weixin.qq.com/miniprogram/dev/api/media/audio/wx.createInnerAudioContext.html) 代替
 *
 */
export declare const stopVoice: () => Promise<any>;
/**
 * 设置 [InnerAudioContext](https://developers.weixin.qq.com/miniprogram/dev/api/media/audio/InnerAudioContext.html) 的播放选项。设置之后对当前小程序全局生效
 *
 * @version 2.3.0
 */
export declare const setInnerAudioOption: (params?: {
    mixWithOther?: boolean;
    obeyMuteSwitch?: boolean;
}) => Promise<any>;
/**
 * 开始播放语音。同时只允许一个语音文件正在播放，如果前一个语音文件还没播放完，将中断前一个语音播放
 *
 * 从基础库 1.6.0 开始，本接口停止维护，请使用 [wx.createInnerAudioContext](https://developers.weixin.qq.com/miniprogram/dev/api/media/audio/wx.createInnerAudioContext.html) 代替
 */
export declare const playVoice: (params: {
    filePath: string;
    duration?: number;
}) => Promise<any>;
/**
 * 暂停正在播放的语音。再次调用 [wx.playVoice](https://developers.weixin.qq.com/miniprogram/dev/api/media/audio/wx.playVoice.html) 播放同一个文件时，会从暂停处开始播放。如果想从头开始播放，需要先调用 [wx.stopVoice](https://developers.weixin.qq.com/miniprogram/dev/api/media/audio/wx.stopVoice.html)
 *
 * 从基础库 1.6.0 开始，本接口停止维护，请使用 [wx.createInnerAudioContext](https://developers.weixin.qq.com/miniprogram/dev/api/media/audio/wx.createInnerAudioContext.html) 代替
 */
export declare const pauseVoice: () => Promise<any>;
/**
 * 获取当前支持的音频输入源
 *
 * @version 2.1.0
 */
export declare const getAvailableAudioSources: () => Promise<any>;
/**
 * 创建内部 audio 上下文 [InnerAudioContext](https://developers.weixin.qq.com/miniprogram/dev/api/media/audio/InnerAudioContext.html) 对象
 *
 * @version 1.6.0
 */
export declare const createInnerAudioContext: () => any;
/**
 * 创建 audio 上下文 [AudioContext](https://developers.weixin.qq.com/miniprogram/dev/api/media/audio/AudioContext.html) 对象
 *
 * 从基础库 1.6.0 开始，本接口停止维护，请使用 [wx.createInnerAudioContext](https://developers.weixin.qq.com/miniprogram/dev/api/media/audio/wx.createInnerAudioContext.html) 代替
 */
export declare const createAudioContext: (id: string, instance: any) => any;
/**
 * 停止播放音乐
 *
 * 从基础库 1.2.0 开始，本接口停止维护，请使用 [wx.getBackgroundAudioManager](https://developers.weixin.qq.com/miniprogram/dev/api/media/background-audio/wx.getBackgroundAudioManager.html) 代替
 */
export declare const stopBackgroundAudio: () => Promise<any>;
/**
 * 控制音乐播放进度
 *
 * 从基础库 1.2.0 开始，本接口停止维护，请使用 [wx.getBackgroundAudioManager](https://developers.weixin.qq.com/miniprogram/dev/api/media/background-audio/wx.getBackgroundAudioManager.html) 代替
 */
export declare const seekBackgroundAudio: (params: {
    position: number;
}) => Promise<any>;
/**
 * 使用后台播放器播放音乐。对于微信客户端来说，只能同时有一个后台音乐在播放。当用户离开小程序后，音乐将暂停播放；当用户在其他小程序占用了音乐播放器，原有小程序内的音乐将停止播放
 *
 * 从基础库 1.2.0 开始，本接口停止维护，请使用 [wx.getBackgroundAudioManager](https://developers.weixin.qq.com/miniprogram/dev/api/media/background-audio/wx.getBackgroundAudioManager.html) 代替
 */
export declare const playBackgroundAudio: (params: {
    dataUrl: string;
    title?: string;
    coverImgUrl?: string;
}) => Promise<any>;
/**
 * 暂停播放音乐
 *
 * 从基础库 1.2.0 开始，本接口停止维护，请使用 [wx.getBackgroundAudioManager](https://developers.weixin.qq.com/miniprogram/dev/api/media/background-audio/wx.getBackgroundAudioManager.html) 代替
 */
export declare const pauseBackgroundAudio: () => Promise<any>;
/**
 * 监听音乐停止事件
 *
 * 从基础库 1.2.0 开始，本接口停止维护，请使用 [wx.getBackgroundAudioManager](https://developers.weixin.qq.com/miniprogram/dev/api/media/background-audio/wx.getBackgroundAudioManager.html) 代替
 */
export declare const onBackgroundAudioStop: (call: () => void) => void;
/**
 * 监听音乐播放事件
 *
 * 从基础库 1.2.0 开始，本接口停止维护，请使用 [wx.getBackgroundAudioManager](https://developers.weixin.qq.com/miniprogram/dev/api/media/background-audio/wx.getBackgroundAudioManager.html) 代替
 */
export declare const onBackgroundAudioPlay: (call: () => void) => void;
/**
 * 监听音乐暂停事件
 *
 * 从基础库 1.2.0 开始，本接口停止维护，请使用 [wx.getBackgroundAudioManager](https://developers.weixin.qq.com/miniprogram/dev/api/media/background-audio/wx.getBackgroundAudioManager.html) 代替
 */
export declare const onBackgroundAudioPause: (call: () => void) => void;
/**
 * 获取后台音乐播放状态
 *
 * 从基础库 1.2.0 开始，本接口停止维护，请使用 [wx.getBackgroundAudioManager](https://developers.weixin.qq.com/miniprogram/dev/api/media/background-audio/wx.getBackgroundAudioManager.html) 代替
 */
export declare const getBackgroundAudioPlayerState: () => Promise<any>;
/**
 * 获取全局唯一的背景音频管理器。 小程序切入后台，如果音频处于播放状态，可以继续播放。但是后台状态不能通过调用API操纵音频的播放状态
 *
 * 从微信客户端6.7.2版本开始，若需要在小程序切后台后继续播放音频，需要在 [app.json](https://developers.weixin.qq.com/miniprogram/dev/reference/configuration/app.html) 中配置 requiredBackgroundModes 属性。开发版和体验版上可以直接生效，正式版还需通过审核
 *
 * @version 1.2.0
 */
export declare const getBackgroundAudioManager: () => any;
interface LivePusherContext {
    /**开始推流，同时开启摄像头预览 */
    start(): void;
    /**停止推流，同时停止摄像头预览 */
    stop(): void;
    /**暂停推流 */
    pause(): void;
    /**恢复推流 */
    resume(): void;
    /**切换前后摄像头 */
    switchCamera(): void;
    /**快照 */
    snapshot(): void;
    /**切换手电筒 */
    toggleTorch(): void;
    /**播放背景音 */
    playBGM(obj: any): void;
    pauseBGM(): void;
    /**恢复背景音 */
    resumeBGM(): void;
    /**设置背景音音量 */
    setBGMVolume(obj: any): void;
    /**开启摄像头预览 */
    startPreview(): void;
    /**关闭摄像头预览 */
    stopPreview(): void;
}
/**
 * 创建 [live-pusher](https://developers.weixin.qq.com/miniprogram/dev/component/live-pusher.html) 上下文 [LivePusherContext](https://developers.weixin.qq.com/miniprogram/dev/api/media/live/LivePusherContext.html) 对象
 *
 * @version 1.7.0
 */
export declare const createLivePusherContext: () => LivePusherContext;
export declare const createLivePlayerContext: (id: string, instance?: any) => any;
/**
 * 停止录音
 *
 * 从基础库 1.6.0 开始，本接口停止维护，请使用 [wx.getRecorderManager](https://developers.weixin.qq.com/miniprogram/dev/api/media/recorder/wx.getRecorderManager.html) 代替
 */
export declare const stopRecord: () => Promise<any>;
/**
 * 开始录音。当主动调用 [wx.stopRecord](https://developers.weixin.qq.com/miniprogram/dev/api/media/recorder/wx.stopRecord.html)，或者录音超过1分钟时自动结束录音。当用户离开小程序时，此接口无法调用
 *
 * 调用前需要 [用户授权](https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/authorize.html) scope.record
 *
 * 从基础库 1.6.0 开始，本接口停止维护，请使用 [wx.getRecorderManager](https://developers.weixin.qq.com/miniprogram/dev/api/media/recorder/wx.getRecorderManager.html) 代替
 */
export declare const startRecord: () => Promise<any>;
/**
 * 获取全局唯一的录音管理器 RecorderManager
 *
 * @version 1.6.0
 */
export declare const getRecorderManager: () => any;
/**
 * 创建 camera 上下文 [CameraContext](https://developers.weixin.qq.com/miniprogram/dev/api/media/camera/CameraContext.html) 对象
 *
 * @version 1.6.0
 */
export declare const createCameraContext: () => any;
/**
 * 使用微信内置地图查看位置
 *
 */
export declare const openLocation: (params: {
    latitude: number;
    longitude: number;
    scale?: number;
    name?: string;
    address?: string;
}) => Promise<any>;
/**
 * 获取当前的地理位置、速度。当用户离开小程序后，此接口无法调用
 *
 * 调用前需要 [用户授权](https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/authorize.html) scope.userLocation
 */
export declare const getLocation: (params?: {
    type?: "wgs84" | "gcj02";
    altitude?: boolean;
}) => Promise<any>;
/**
 * 获取当前支持的音频输入源
 *
 */
export declare const chooseLocation: () => Promise<any>;
/**
 * 更新转发属性
 *
 * @version 1.2.0
 */
export declare const updateShareMenu: (params?: {
    withShareTicket?: boolean;
    isUpdatableMessage?: boolean;
    activityId?: string;
    templateInfo?: {
        name: string;
        value: string;
    }[];
}) => Promise<any>;
/**显示当前页面的转发按钮 */
export declare const showShareMenu: (params?: {
    withShareTicket?: boolean;
}) => Promise<any>;
/**隐藏转发按钮 */
export declare const hideShareMenu: () => Promise<any>;
/**获取转发详细信息 */
export declare const getShareInfo: (params: {
    shareTicket: string;
    timeout?: number;
}) => Promise<any>;
/**创建离屏 canvas 实例 */
export declare const createOffscreenCanvas: () => any;
/**创建 canvas 的绘图上下文 [CanvasContext](https://developers.weixin.qq.com/miniprogram/dev/api/canvas/CanvasContext.html) 对象 */
export declare const createCanvasContext: (canvasId: string, $this: any) => any;
/**
 * 把当前画布指定区域的内容导出生成指定大小的图片。在 draw() 回调里调用该方法才能保证图片导出成功
 */
export declare const canvasToTempFilePath: (params: {
    x?: number;
    y?: number;
    width?: number;
    height?: number;
    destWidth?: number;
    destHeight?: number;
    canvasId: string;
    fileType?: "jpg" | "png";
    quality: number;
}) => Promise<any>;
/**
 * 将像素数据绘制到画布。在自定义组件下，第二个参数传入自定义组件实例 this，以操作组件内 <canvas> 组件
 */
export declare const canvasPutImageData: (params: {
    canvasId: string;
    data: Uint8ClampedArray;
    x: number;
    y: number;
    width: number;
    height: number;
}) => Promise<any>;
/**
 * 获取 canvas 区域隐含的像素数据
 *
 * @version 1.9.0
 */
export declare const canvasGetImageData: (params: {
    canvasId: string;
    x: number;
    y: number;
    width: number;
    height: number;
}) => Promise<any>;
/**
 * 保存文件到本地。注意：saveFile 会把临时文件移动，因此调用成功后传入的 tempFilePath 将不可用
 *
 */
export declare const saveFile: (params: {
    tempFilePath: string;
}) => Promise<any>;
/**
 * 删除本地缓存文件
 *
 */
export declare const removeSavedFile: (params: {
    filePath: string;
}) => Promise<any>;
/**
 * 新开页面打开文档
 *
 */
export declare const openDocument: (params: {
    filePath: string;
    fileType?: "doc" | "xls" | "ppt" | "pdf" | "docx" | "xlsx" | "pptx";
}) => Promise<any>;
/**
 * 获取该小程序下已保存的本地缓存文件列表
 *
 */
export declare const getSavedFileList: () => Promise<any>;
/**
 * 获取本地文件的文件信息。此接口只能用于获取已保存到本地的文件，若需要获取临时文件信息，请使用 [wx.getFileInfo()](https://developers.weixin.qq.com/miniprogram/dev/api/file/wx.getFileInfo.html) 接口
 *
 */
export declare const getSavedFileInfo: (params: {
    filePath: string;
}) => Promise<any>;
/**
 * 获取全局唯一的文件管理器
 *
 * @version 1.9.9
 */
export declare const getFileSystemManager: () => any;
/**
 * 获取文件信息
 *
 * @version 1.4.0
 */
export declare const getFileInfo: (params: {
    filePath: string;
    digestAlgorithm?: "md5" | "sha1";
}) => Promise<any>;
/**
 * 调用接口获取登录凭证（code）。通过凭证进而换取用户登录态信息，包括用户的唯一标识（openid）及本次登录的会话密钥（session_key）等。用户数据的加解密通讯需要依赖会话密钥完成。更多使用方法详见 [小程序登录](https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/login.html)
 *
 */
export declare const login: (params?: {
    timeout?: number;
}) => Promise<any>;
/**
 * 检查登录态是否过期
 *
 * 通过 wx.login 接口获得的用户登录态拥有一定的时效性。用户越久未使用小程序，用户登录态越有可能失效。反之如果用户一直在使用小程序，则用户登录态一直保持有效。具体时效逻辑由微信维护，对开发者透明。开发者只需要调用 wx.checkSession 接口检测当前用户登录态是否有效
 *
 * 登录态过期后开发者可以再调用 wx.login 获取新的用户登录态。调用成功说明当前 session_key 未过期，调用失败说明 session_key 已过期。更多使用方法详见 [小程序登录](https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/login.html)
 */
export declare const checkSession: () => Promise<any>;
/**
 * 打开另一个小程序
 *
 * @version 1.3.0
 */
export declare const navigateToMiniProgram: (params: {
    appId: string;
    path?: string;
    extraData?: any;
    envVersion?: "develop" | "trial" | "release";
}) => Promise<any>;
/**
 * 返回到上一个小程序。只有在当前小程序是被其他小程序打开时可以调用成功
 *
 * 注意：微信客户端 iOS 6.5.9，Android 6.5.10 及以上版本支持
 *
 * @version 1.3.0
 */
export declare const navigateBackMiniProgram: (params?: {
    extraData?: any;
}) => Promise<any>;
/**
 * 获取当前帐号信息
 *
 * @version 2.2.2
 */
export declare const getAccountInfoSync: (params: {
    tempFilePath: string;
}) => any;
/**
 * 获取用户信息
 *
 * 调用前需要 [用户授权](https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/authorize.html) scope.userInfo
 */
export declare const getUserInfo: (params?: {
    withCredentials?: boolean;
    lang?: "en" | "zh_CN" | "zh_TW";
}) => Promise<any>;
/**
 * 自定义业务数据监控上报接口
 *
 * @version 2.0.1
 */
export declare const reportMonitor: (name: string, value: number) => void;
/**
 * 自定义分析数据上报接口。使用前，需要在小程序管理后台自定义分析中新建事件，配置好事件名与字段
 */
export declare const reportAnalytics: (eventName: string, data: object) => void;
/**
 * 发起微信支付。了解更多信息，请查看微信支付[接口文档](https://pay.weixin.qq.com/wiki/doc/api/wxa/wxa_api.php?chapter=7_3&index=1)
 *
 */
export declare const requestPayment: (params: {
    timeStamp: string | number;
    nonceStr: string;
    package: string;
    signType: any;
    paySign: string;
}) => Promise<any>;
/**
 * 提前向用户发起授权请求。调用后会立刻弹窗询问用户是否同意授权小程序使用某项功能或获取用户的某些数据，但不会实际调用对应接口。如果用户之前已经同意授权，则不会出现弹窗，直接返回成功。更多用法详见 [用户授权](https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/authorize.html)
 *
 * @version 1.2.0
 */
export declare const authorize: (params: {
    scope: any;
}) => Promise<any>;
/**
 * 调起客户端小程序设置界面，返回用户设置的操作结果。设置界面只会出现小程序已经向用户请求过的[权限](https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/authorize.html)
 *
 * 注意：2.3.0 版本开始，用户发生点击行为后，才可以跳转打开设置页，管理授权信息。[详情](https://developers.weixin.qq.com/community/develop/doc/000cea2305cc5047af5733de751008)
 */
export declare const openSetting: () => Promise<any>;
/**
 * 获取用户的当前设置。返回值中只会出现小程序已经向用户请求过的权限
 *
 * @version 1.2.0
 */
export declare const getSetting: () => Promise<{
    authSetting: {
        [x: string]: boolean;
    };
}>;
/**
 * 获取用户收货地址。调起用户编辑收货地址原生界面，并在编辑完成后返回用户选择的地址
 *
 * 调用前需要 用户授权 [scope.address](https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/authorize.html)
 */
export declare const chooseAddress: () => Promise<{
    /**
     * 调用结果
     *
     */
    errMsg: string;
    /**
     * 收货人姓名
     *
     */
    userName: string;
    /**
     * 邮编
     *
     */
    postalCode: string;
    /**
     * 国标收货地址第一级地址
     *
     */
    provinceName: string;
    /**
     * 国标收货地址第二级地址
     *
     */
    cityName: string;
    /**
     * 国标收货地址第三级地址
     *
     */
    countyName: string;
    /**
     * 详细收货地址信息
     *
     */
    detailInfo: string;
    /**
     * 收货地址国家码
     *
     */
    nationalCode: string;
    /**
     * 收货人手机号码
     *
     */
    telNumber: string;
}>;
/**
 * 查看微信卡包中的卡券。只有通过 [认证](https://developers.weixin.qq.com/miniprogram/product/renzheng.html) 的小程序或文化互动类目的小游戏才能使用。更多文档请参考 [微信卡券接口文档](https://mp.weixin.qq.com/cgi-bin/announce?action=getannouncement&key=1490190158&version=1&lang=zh_CN&platform=2)
 *
 */
export declare const openCard: (params: {
    cardList: {
        cardId: string;
        code: string;
    }[];
}) => Promise<any>;
/**
 * 批量添加卡券。只有通过 [认证](https://developers.weixin.qq.com/miniprogram/product/renzheng.html) 的小程序或文化互动类目的小游戏才能使用。更多文档请参考 [微信卡券接口文档](https://mp.weixin.qq.com/cgi-bin/announce?action=getannouncement&key=1490190158&version=1&lang=zh_CN&platform=2)
 *
 */
export declare const addCard: (params: {
    cardList: any[];
}) => Promise<any>;
/**
 * 选择用户的发票抬头。当前小程序必须关联一个公众号，且这个公众号是完成了[微信认证](https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1496554031_RD4xe)的，才能调用 chooseInvoiceTitle
 *
 * 调用前需要 [用户授权](https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/authorize.html) scope.invoiceTitle
 *
 * @version 1.5.0
 */
export declare const chooseInvoiceTitle: () => Promise<{
    type: string;
    title: string;
    taxNumber: string;
    companyAddress: string;
    telephone: string;
    bankName: string;
    bankAccount: string;
    errMsg: string;
}>;
/**
 * 选择用户已有的发票
 *
 * 调用前需要 [用户授权](https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/authorize.html) scope.invoice
 */
export declare const chooseInvoice: () => Promise<{
    invoiceInfo: string;
}>;
/**
 * 开始 SOTER 生物认证。验证流程请参考[说明](https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/bio-auth.html)
 *
 * @version 1.5.0
 */
export declare const startSoterAuthentication: (params: {
    requestAuthModes: any[];
    challenge: string;
    authContent?: string;
}) => Promise<{
    errCode: number;
    authMode: string;
    resultJSON: string;
    resultJSONSignature: string;
    errMsg: string;
}>;
/**
 * 获取本机支持的 SOTER 生物认证方式
 *
 * @version 1.5.0
 */
export declare const checkIsSupportSoterAuthentication: () => Promise<{
    supportMode: any[];
    errMsg: string;
}>;
/**
 * 获取设备内是否录入如指纹等生物信息的接口
 *
 * @version 1.6.0
 */
export declare const checkIsSoterEnrolledInDevice: (params: {
    checkAuthMode: any;
}) => Promise<{
    isEnrolled: boolean;
    errMsg: string;
}>;
/**
 * 获取用户过去三十天微信运动步数。需要先调用 [wx.login](https://developers.weixin.qq.com/miniprogram/dev/api/open-api/login/wx.login.html) 接口。步数信息会在用户主动进入小程序时更新
 *
 * 调用前需要 用户授权 [scope.werun](https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/authorize.html)
 *
 * @version 1.2.0
 */
export declare const getWeRunData: (params: {
    tempFilePath: string;
}) => Promise<{
    errMsg: string;
    encryptedData: string;
    iv: string;
}>;
/**
 * 停止搜索附近的 iBeacon 设备
 *
 * @version 1.2.0
 */
export declare const stopBeaconDiscovery: () => Promise<any>;
/**
 * 开始搜索附近的 iBeacon 设备
 *
 * @version 1.2.0
 */
export declare const startBeaconDiscovery: (params: {
    uuids: string[];
    ignoreBluetoothAvailable?: boolean;
}) => Promise<any>;
/**
 * 监听 iBeacon 设备更新事件
 *
 * @version 1.2.0
 */
export declare const onBeaconUpdate: (call?: (beacons: any[]) => void) => void;
/**
 * 监听 iBeacon 服务状态变化事件
 *
 * @version 1.2.0
 */
export declare const onBeaconServiceChange: (call?: (available: boolean, discovering: boolean) => void) => void;
/**
 * 获取所有已搜索到的 iBeacon 设备
 *
 * @version 1.2.0
 *
 */
export declare const getBeacons: () => Promise<any>;
/**
 * 关闭 Wi-Fi 模块
 *
 * @version 1.6.0
 */
export declare const stopWifi: () => Promise<any>;
/**
 * 初始化 Wi-Fi 模块
 *
 * @version 1.6.0
 */
export declare const startWifi: () => Promise<any>;
/**
 * 设置 wifiList 中 AP 的相关信息。在 onGetWifiList 回调后调用，iOS特有接口
 *
 * @version 1.6.0
 */
export declare const setWifiList: (params: {
    wifiList: any[];
}) => Promise<any>;
/**
 * 监听连接上 Wi-Fi 的事件
 *
 * @version 1.6.0
 */
export declare const onWifiConnected: (callback?: (wifi: any) => void) => void;
/**
 * 监听获取到 Wi-Fi 列表数据事件
 *
 * @version 1.6.0
 */
export declare const onGetWifiList: (callback?: (res: any) => void) => void;
/**
 * 请求获取 Wi-Fi 列表。在 onGetWifiList 注册的回调中返回 wifiList 数据。 Android 调用前需要 [用户授权](https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/authorize.html) scope.userLocation
 *
 * iOS 将跳转到系统的 Wi-Fi 界面，Android 不会跳转。 iOS 11.0 及 iOS 11.1 两个版本因系统问题，该方法失效。但在 iOS 11.2 中已修复
 *
 * @version 1.6.0
 */
export declare const getWifiList: () => Promise<any>;
/**
 * 获取已连接中的 Wi-Fi 信息
 *
 * @version 1.6.0
 */
export declare const getConnectedWifi: () => Promise<any>;
/**
 * 连接 Wi-Fi。若已知 Wi-Fi 信息，可以直接利用该接口连接。仅 Android 与 iOS 11 以上版本支持
 *
 * @version 1.6.0
 */
export declare const connectWifi: (params: {
    SSID: string;
    BSSID?: string;
    password: string;
}) => Promise<any>;
/**
 * 读取低功耗蓝牙设备的特征值的二进制数据值。注意：必须设备的特征值支持 read 才可以成功调用
 *
 */
export declare const readBLECharacteristicValue: (params: {
    deviceId: string;
    serviceId: string;
    characteristicId: string;
}) => Promise<any>;
/**
 * 监听低功耗蓝牙连接状态的改变事件。包括开发者主动连接或断开连接，设备丢失，连接异常断开等等
 */
export declare const onBLEConnectionStateChange: (call: (res: {
    deviceId: string;
    connected: boolean;
}) => void) => void;
/**
 * 监听低功耗蓝牙连接状态的改变事件。包括开发者主动连接或断开连接，设备丢失，连接异常断开等等
 */
export declare const onBLECharacteristicValueChange: (callback?: (res: {
    /**
     * 蓝牙设备 id，参考 device 对象
     */
    deviceId: string;
    /**
     * 特征值所属服务 uuid
     */
    serviceId: string;
    /**
     * 特征值 uuid
     */
    characteristicId: string;
    /**
     * 特征值最新的值
     */
    value: ArrayBuffer;
}) => void) => void;
/**
 * 启用低功耗蓝牙设备特征值变化时的 notify 功能，订阅特征值。注意：必须设备的特征值支持 notify 或者 indicate 才可以成功调用
 *
 * 另外，必须先启用 notifyBLECharacteristicValueChange 才能监听到设备 characteristicValueChange 事件
 */
export declare const notifyBLECharacteristicValueChange: (params: {
    deviceId: string;
    serviceId: string;
    characteristicId: string;
    state: boolean;
}) => Promise<any>;
/**
 * 获取蓝牙设备所有服务(service)
 *
 */
export declare const getBLEDeviceServices: (params: {
    deviceId: string;
}) => Promise<any>;
/**
 * 获取蓝牙设备某个服务中所有特征值(characteristic)
 *
 */
export declare const getBLEDeviceCharacteristics: (params: {
    deviceId: string;
    serviceId: string;
}) => Promise<any>;
/**
 * 连接低功耗蓝牙设备
 *
 * 若小程序在之前已有搜索过某个蓝牙设备，并成功建立连接，可直接传入之前搜索获取的 deviceId 直接尝试连接该设备，无需进行搜索操作
 */
export declare const createBLEConnection: (params: {
    deviceId: string;
    timeout?: number;
}) => Promise<any>;
/**
 * 断开与低功耗蓝牙设备的连接
 *
 */
export declare const closeBLEConnection: (params: {
    deviceId: string;
}) => Promise<any>;
/**
 * 向低功耗蓝牙设备特征值中写入二进制数据。注意：必须设备的特征值支持 write 才可以成功调用
 *
 */
export declare const writeBLECharacteristicValue: (params: {
    deviceId: string;
    serviceId: string;
    characteristicId: string;
    value: ArrayBuffer;
}) => Promise<any>;
/**
 * 添加手机通讯录联系人。用户可以选择将该表单以「新增联系人」或「添加到已有联系人」的方式，写入手机系统通讯录
 *
 * @version 1.2.0
 */
export declare const addPhoneContact: (params: {
    /** 头像本地文件路径 */
    photoFilePath?: string;
    /** 昵称 */
    nickName?: string;
    /** 姓氏 */
    lastName?: string;
    /** 中间名 */
    middleName?: string;
    /** 名字 */
    firstName: string;
    /** 备注 */
    remark?: string;
    /** 手机号 */
    mobilePhoneNumber?: string;
    /** 微信号 */
    weChatNumber?: string;
    /** 联系地址国家 */
    addressCountry?: string;
    /** 联系地址省份 */
    addressState?: string;
    /** 联系地址城市 */
    addressCity?: string;
    /** 联系地址街道 */
    addressStreet?: string;
    /** 联系地址邮政编码 */
    addressPostalCode?: string;
    /** 公司 */
    organization?: string;
    /** 职位 */
    title?: string;
    /** 工作传真 */
    workFaxNumber?: string;
    /** 工作电话 */
    workPhoneNumber?: string;
    /** 公司电话 */
    hostNumber?: string;
    /** 电子邮件 */
    email?: string;
    /** 网站 */
    url?: string;
    /** 工作地址国家 */
    workAddressCountry?: string;
    /** 工作地址省份 */
    workAddressState?: string;
    /** 工作地址城市 */
    workAddressCity?: string;
    /** 工作地址街道 */
    workAddressStreet?: string;
    /** 工作地址邮政编码 */
    workAddressPostalCode?: string;
    /** 住宅传真 */
    homeFaxNumber?: string;
    /** 住宅电话 */
    homePhoneNumber?: string;
    /** 住宅地址国家 */
    homeAddressCountry?: string;
    /** 住宅地址省份 */
    homeAddressState?: string;
    /** 住宅地址城市 */
    homeAddressCity?: string;
    /** 住宅地址街道 */
    homeAddressStreet?: string;
    /** 住宅地址邮政编码 */
    homeAddressPostalCode?: string;
}) => Promise<any>;
/**
 * 停止搜寻附近的蓝牙外围设备。若已经找到需要的蓝牙设备并不需要继续搜索时，建议调用该接口停止蓝牙搜索
 *
 */
export declare const stopBluetoothDevicesDiscovery: () => Promise<any>;
/**
 * 开始搜寻附近的蓝牙外围设备。此操作比较耗费系统资源，请在搜索并连接到设备后调用 [wx.stopBluetoothDevicesDiscovery](https://developers.weixin.qq.com/miniprogram/dev/api/device/bluetooth/wx.stopBluetoothDevicesDiscovery.html) 方法停止搜索
 *
 */
export declare const startBluetoothDevicesDiscovery: (params: {
    services: string[];
    allowDuplicatesKey: boolean;
    interval: number;
}) => Promise<any>;
/**
 * 初始化蓝牙模块
 *
 */
export declare const openBluetoothAdapter: () => Promise<any>;
/**监听寻找到新设备的事件 */
export declare const onBluetoothDeviceFound: (callback?: (res: {
    devices: any[];
}) => void) => void;
/**监听蓝牙适配器状态变化事件 */
export declare const onBluetoothAdapterStateChange: (callback?: (res: any) => void) => void;
/**
 * 根据 uuid 获取处于已连接状态的设备
 *
 */
export declare const getConnectedBluetoothDevices: (params: {
    services: string[];
}) => Promise<{
    devices: any[];
}>;
/**
 * 获取在蓝牙模块生效期间所有已发现的蓝牙设备。包括已经和本机处于连接状态的设备
 *
 */
export declare const getBluetoothDevices: () => Promise<{
    devices: any[];
}>;
/**
 * 获取本机蓝牙适配器状态
 *
 */
export declare const getBluetoothAdapterState: () => Promise<any>;
/**
 * 关闭蓝牙模块。调用该方法将断开所有已建立的连接并释放系统资源。建议在使用蓝牙流程后，与 [wx.openBluetoothAdapter](https://developers.weixin.qq.com/miniprogram/dev/api/device/bluetooth/wx.openBluetoothAdapter.html) 成对调用
 *
 */
export declare const closeBluetoothAdapter: () => Promise<any>;
/**wx.getBatteryInfo 的同步版本 */
export declare const getBatteryInfoSync: () => {
    level: number;
    isCharging: boolean;
};
/**
 * 获取设备电量。同步 API [wx.getBatteryInfoSync](https://developers.weixin.qq.com/miniprogram/dev/api/device/battery/wx.getBatteryInfoSync.html) 在 iOS 上不可用
 *
 */
export declare const getBatteryInfo: (params: {
    deviceId: string;
}) => Promise<{
    level: number;
    isCharging: boolean;
}>;
/**
 * 设置系统剪贴板的内容
 *
 */
export declare const setClipboardData: (params: {
    data: string;
}) => Promise<any>;
/**
 * 获取系统剪贴板的内容
 *
 */
export declare const getClipboardData: () => Promise<{
    data: string;
}>;
/**
 * 关闭 NFC 模块。仅在安卓系统下有效
 *
 * @version 1.7.0
 */
export declare const stopHCE: () => Promise<any>;
/**
 * 初始化 NFC 模块
 *
 * @version 1.7.0
 */
export declare const startHCE: (params: {
    aid_list: string[];
}) => Promise<any>;
/**
 * 发送 NFC 消息。仅在安卓系统下有效
 *
 * @version 1.7.0
 */
export declare const sendHCEMessage: (params: {
    data: ArrayBuffer;
}) => Promise<any>;
/**
 * 监听接收 NFC 设备消息事件
 *
 * @version 1.7.0
 */
export declare const onHCEMessage: (call?: (res: {
    messageType: string;
    data: ArrayBuffer;
    reason: number;
}) => void) => void;
/**
 * 判断当前设备是否支持 HCE 能力
 *
 * @version 1.7.0
 */
export declare const getHCEState: () => Promise<any>;
/**监听网络状态变化事件 */
export declare const onNetworkStatusChange: (callback: (res: {
    isConnected: boolean;
    networkType: any;
}) => void) => void;
/**
 * 获取网络类型
 *
 */
export declare const getNetworkType: () => Promise<any>;
/**
 * 设置屏幕亮度
 *
 * @version 1.2.0
 */
export declare const setScreenBrightness: (params: {
    value: number;
}) => Promise<any>;
/**
 * 设置是否保持常亮状态。仅在当前小程序生效，离开小程序后设置失效
 *
 * @version 1.4.0
 */
export declare const setKeepScreenOn: (params: {
    keepScreenOn: boolean;
}) => Promise<any>;
/**
 * 监听用户主动截屏事件。用户使用系统截屏按键截屏时触发
 *
 * @version 1.4.0
 */
export declare const onUserCaptureScreen: (callback?: (res: any) => void) => void;
/**
 * 获取屏幕亮度
 *
 * @version 1.2.0
 */
export declare const getScreenBrightness: () => Promise<any>;
/**
 * 拨打电话
 *
 */
export declare const makePhoneCall: (params: {
    phoneNumber: string;
}) => Promise<any>;
/**
 * 停止监听加速度数据
 *
 */
export declare const stopAccelerometer: () => Promise<any>;
/**
 * 开始监听加速度数据
 *
 */
export declare const startAccelerometer: (params?: {
    interval?: string;
}) => Promise<any>;
/**
 * 监听加速度数据事件。频率根据 [wx.startAccelerometer()](https://developers.weixin.qq.com/miniprogram/dev/api/device/accelerometer/wx.startAccelerometer.html) 的 interval 参数。可使用 [wx.stopAccelerometer()](https://developers.weixin.qq.com/miniprogram/dev/api/device/accelerometer/wx.stopAccelerometer.html) 停止监听
 */
export declare const onAccelerometerChange: (callback: any) => void;
/**
 * 停止监听罗盘数据
 *
 */
export declare const stopCompass: () => Promise<any>;
/**
 * 开始监听罗盘数据
 *
 */
export declare const startCompass: () => Promise<any>;
/**监听罗盘数据变化事件。频率：5 次/秒，接口调用后会自动开始监听，可使用 wx.stopCompass 停止监听 */
export declare const onCompassChange: (callback: any) => void;
/**
 * 停止监听设备方向的变化
 *
 * @version 2.3.0
 */
export declare const stopDeviceMotionListening: () => Promise<any>;
/**
 * 开始监听设备方向的变化
 *
 * @version 2.3.0
 */
export declare const startDeviceMotionListening: (params?: {
    interval?: "normal" | "game" | "ui";
}) => Promise<any>;
/**
 * 监听设备方向变化事件。频率根据 wx.startDeviceMotionListening() 的 interval 参数。可以使用 wx.stopDeviceMotionListening() 停止监听
 *
 * @version 2.3.0
 */
export declare const onDeviceMotionChange: (call: (res: {
    alpha: number;
    beta: number;
    gamma: number;
}) => void) => void;
/**
 * 停止监听陀螺仪数据
 *
 * @version 2.3.0
 */
export declare const stopGyroscope: () => Promise<any>;
/**
 * 开始监听陀螺仪数据
 *
 * @version 2.3.0
 */
export declare const startGyroscope: (params: {
    interval?: "normal" | "game" | "ui";
}) => Promise<any>;
/**
 * 监听陀螺仪数据变化事件。频率根据 [wx.startGyroscope()](https://developers.weixin.qq.com/miniprogram/dev/api/device/gyroscope/wx.startGyroscope.html) 的 interval 参数。可以使用 [wx.stopGyroscope()](https://developers.weixin.qq.com/miniprogram/dev/api/device/gyroscope/wx.stopGyroscope.html) 停止监听
 *
 * @version 2.3.0
 */
export declare const onGyroscopeChange: (callback: (res: {
    x: number;
    y: number;
    z: number;
}) => void) => void;
/**
 * 监听内存不足告警事件
 *
 * 当 iOS/Android 向小程序进程发出内存警告时，触发该事件。触发该事件不意味小程序被杀，大部分情况下仅仅是告警，开发者可在收到通知后回收一些不必要资源避免进一步加剧内存紧张
 *
 * @version 2.0.2
 */
export declare const onMemoryWarning: (callback: (res: {
    level: number;
}) => void) => void;
/**
 * 调起客户端扫码界面进行扫码
 *
 */
export declare const scanCode: (params: {
    onlyFromCamera?: boolean;
    scanType?: ("barCode" | "qrCode")[];
}) => Promise<any>;
/**
 * 使手机发生较短时间的振动（15 ms）。仅在 iPhone 7 / 7 Plus 以上及 Android 机型生效
 *
 * @version 1.2.0
 */
export declare const vibrateShort: () => Promise<any>;
/**
 * 使手机发生较长时间的振动（400 ms)
 *
 * @version 1.2.0
 */
export declare const vibrateLong: () => Promise<any>;
interface Worker {
    /**向主线程/Worker 线程发送的消息 */
    postMessage(message: any): void;
    /**结束当前 Worker 线程。仅限在主线程 worker 对象上调用 */
    terminate(): void;
    /**监听主线程/Worker 线程向当前线程发送的消息的事件 */
    onMessage(callback: Function): void;
}
/**
 * 创建一个 Worker 线程。目前限制最多只能创建一个 [Worker](https://developers.weixin.qq.com/miniprogram/dev/framework/workers.html)，创建下一个 Worker 前请先调用 [Worker.terminate](https://developers.weixin.qq.com/miniprogram/dev/api/worker/Worker.terminate.html)
 *
 * @version 1.9.90
 */
export declare const createWorker: (scriptPath: string) => Worker;
/**wx.getExtConfig 的同步版本 */
export declare const getExtConfigSync: () => any;
/**
 * 获取第三方平台自定义的数据字段
 *
 */
export declare const getExtConfig: () => Promise<any>;
/**
 * 返回一个 SelectorQuery 对象实例。在自定义组件或包含自定义组件的页面中，应使用 this.createSelectorQuery() 来代替
 *
 * @version 1.4.0
 */
export declare const createSelectorQuery: () => wx.SelectorQuery & {
    in: any
};
/**
 * 创建并返回一个 IntersectionObserver 对象实例。在自定义组件或包含自定义组件的页面中，应使用 this.createIntersectionObserver([options]) 来代替
 *
 * @version 1.9.3
 */
export declare const createIntersectionObserver: (context: any, options?: any) => any;
/**
 * 创建激励视频广告组件。请通过 [wx.getSystemInfoSync()](https://developers.weixin.qq.com/miniprogram/dev/api/base/system/system-info/wx.getSystemInfoSync.html) 返回对象的 SDKVersion 判断基础库版本号后再使用该 API（小游戏端要求 >= 2.0.4， 小程序端要求 >= 2.6.0）。调用该方法创建的激励视频广告是一个单例（小游戏端是全局单例，小程序端是页面内单例，在小程序端的单例对象不允许跨页面使用）
 *
 * @version 2.0.4
 */
export declare const createRewardedVideoAd: (adUnitId: any) => any;
/**
 * 创建插屏广告组件。请通过 [wx.getSystemInfoSync()](https://developers.weixin.qq.com/miniprogram/dev/api/base/system/system-info/wx.getSystemInfoSync.html) 返回对象的 SDKVersion 判断基础库版本号后再使用该 API。每次调用该方法创建插屏广告都会返回一个全新的实例（小程序端的插屏广告实例不允许跨页面使用）
 *
 * @version 2.6.0
 */
export declare const createInterstitialAd: (adUnitId: any) => any;
export {};
