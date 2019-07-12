/// <reference path="../../../../@types/weixin-app/index.d.ts" />
declare namespace tenp {
    interface AppConfig {
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
    }
    interface PageConfig {
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
    interface ComponentConfig {
        render?: any[];
        template?: string;
        filters?: Function[];
        style?: string[] | string;
        components?: {};
    }
    interface ComponentRelations {
        [prop: string]: {
            type: 'child' | 'parent' | 'ancestor' | 'descendant';
            /**关系生命周期函数，当关系被建立在页面节点树中时触发，触发时机在组件attached生命周期之后 */
            linked?(): void;
            /**关系生命周期函数，当关系在页面节点树中发生改变时触发，触发时机在组件moved生命周期之后 */
            linkChanged?(): void;
            /**关系生命周期函数，当关系脱离页面节点树时触发，触发时机在组件detached生命周期之后 */
            unlinked?(): void;
            /**如果这一项被设置，则它表示关联的目标节点所应具有的behavior，所有拥有这一behavior的组件节点都会被关联 */
            target?: string;
        };
    }
    interface ComponentOptions {
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
    let getMenuButtonBoundingClientRect: () => {
        bottom: number;
        height: number;
        left: number;
        right: number;
        top: number;
        width: number;
    };
    interface WxShowParams {
        path: string;
        scene: number;
        query: any;
        shareTicket: string;
        referrerInfo: {
            appId: string;
            extraData: any;
        };
    }
    interface WxAppParams {
        path: string;
        scene: number;
        query: any;
        shareTicket: string;
        referrerInfo: {
            appId: string;
            extraData: any;
        };
    }
    /**判断小程序的API，回调，参数，组件等是否在当前版本可用。 String参数说明： 使用 ${API}.${method}.${param}.${options} 或者 ${component}.${attribute}.${option}方式来调用 例如： ${API} 代表 API 名字 ${method} 代表调用方式，有效值为return, success, object, callback ${param} 代表参数或者返回值 ${options} 代表参数的可选值 ${component} 代表组件名字 ${attribute} 代表组件属性 ${option} 代表组件属性的可选值 */
    let canIUse: (api: string) => boolean;
    /**获取系统信息 */
    let SystemInfo: () => Promise<wx.SystemInfo>;
    /**获取全局唯一的版本更新管理器，用于管理小程序更新。关于小程序的更新机制，可以查看运行机制文档 */
    let getUpdateManager: () => wx.UpdateManager;
    /**获取小程序启动时的参数。与 App.onLaunch 的回调参数一致 */
    let getLaunchOptionsSync: () => WxAppParams;
    /**取消监听小程序要打开的页面不存在事件 */
    let onPageNotFound: (callback: (params?: {
        path: string;
        query: any;
        isEntryPage: boolean;
    }) => void) => void;
    /**监听小程序错误事件。如脚本错误或 API 调用报错等。该事件与 App.onError 的回调时机与参数一致 */
    let onError: (callback: Function) => void;
    /**监听音频中断结束事件。在收到 onAudioInterruptionBegin 事件之后，小程序内所有音频会暂停，收到此事件之后才可再次播放成功 */
    let onAudioInterruptionEnd: (callback: Function) => void;
    /**监听音频因为受到系统占用而被中断开始事件。以下场景会触发此事件：闹钟、电话、FaceTime 通话、微信语音聊天、微信视频聊天。此事件触发后，小程序内所有音频会暂停 */
    let onAudioInterruptionBegin: (callback: Function) => void;
    /**监听小程序切前台事件。该事件与 App.onShow 的回调参数一致 */
    let onAppShow: (callback: (params?: WxShowParams) => void) => {};
    /**监听小程序切后台事件。该事件与 App.onHide 的回调时机一致 */
    let onAppHide: (callback: Function) => void;
    /**取消监听小程序要打开的页面不存在事件 */
    let offPageNotFound: (callback: Function) => void;
    /**取消监听小程序错误事件 */
    let offError: (callback: Function) => void;
    /**取消监听音频中断结束事件 */
    let offAudioInterruptionEnd: (callback: Function) => void;
    /**取消监听音频因为受到系统占用而被中断开始事件 */
    let offAudioInterruptionBegin: (callback: Function) => void;
    /**取消监听小程序切前台事件 */
    let offAppShow: (callback: Function) => void;
    /**取消监听小程序切后台事件 */
    let offAppHide: (callback: Function) => void;
    /**设置是否打开调试开关。此开关对正式版也能生效 */
    let setEnableDebug: (params: {
        enableDebug: boolean;
    }) => Promise<any>;
    /**获取日志管理器对象 */
    let getLogManager: (params?: {
        level?: number;
    }) => wx.Logger;
    /**跳转到 tabBar 页面，并关闭其他所有非 tabBar 页面 */
    let switchTab: (params: {
        url: string;
    }) => Promise<any>;
    /**关闭所有页面，打开到应用内的某个页面 */
    let reLaunch: (params: {
        url: string;
    }) => Promise<any>;
    /**关闭当前页面，跳转到应用内的某个页面。但是不允许跳转到 tabbar 页面 */
    let redirectTo: (params: {
        url: string;
    }) => Promise<any>;
    /**保留当前页面，跳转到应用内的某个页面。但是不能跳到 tabbar 页面。使用 [wx.navigateBack](https://developers.weixin.qq.com/miniprogram/dev/api/route/wx.navigateBack.html) 可以返回到原页面。小程序中页面栈最多十层 */
    let navigateTo: (params: {
        url: string;
    }) => Promise<any>;
    /**关闭当前页面，返回上一页面或多级页面。可通过 [getCurrentPages](https://developers.weixin.qq.com/miniprogram/dev/reference/api/getCurrentPages.html) 获取当前的页面栈，决定需要返回几层 */
    let navigateBack: (params: {
        delta: number;
    }) => Promise<any>;
    /**显示消息提示框 */
    let showToast: (params: {
        /**提示的内容 */
        title: string;
        /**图标 */
        icon?: 'success' | 'loading' | 'none';
        /**自定义图标的本地路径，image 的优先级高于 icon */
        image?: string;
        /**提示的延迟时间 */
        duration?: number;
        /**是否显示透明蒙层，防止触摸穿透 */
        mask?: boolean;
    }) => Promise<any>;
    /**显示模态对话框 */
    let showModal: (params: {
        /**提示的标题 */
        title: string;
        /**提示的内容 */
        content: string;
        /**是否显示取消按钮 */
        showCancel?: boolean;
        /**取消按钮的文字，最多 4 个字符 */
        cancelText?: string;
        /**取消按钮的文字颜色，必须是 16 进制格式的颜色字符串 */
        cancelColor?: string;
        /**确认按钮的文字，最多 4 个字符 */
        confirmText?: string;
        /**确认按钮的文字颜色，必须是 16 进制格式的颜色字符串 */
        confirmColor?: string;
    }) => Promise<{
        confirm: boolean;
        cancel: boolean;
    }>;
    /**显示 loading 提示框。需主动调用 wx.hideLoading 才能关闭提示框 */
    let showLoading: (params: {
        /**提示的内容 */
        title: string;
        /**是否显示透明蒙层，防止触摸穿透 */
        mask?: boolean;
    }) => Promise<any>;
    /**显示操作菜单 */
    let showActionSheet: (params: {
        /**按钮的文字数组，数组长度最大为 6 */
        itemList: string[];
        /**按钮的文字颜色 */
        itemColor?: string;
    }) => Promise<any>;
    /**隐藏消息提示框 */
    let hideToast: () => Promise<any>;
    /**隐藏 loading 提示框 */
    let hideLoading: () => Promise<any>;
    /**在当前页面显示导航条加载动画 */
    let showNavigationBarLoading: (params: {}) => Promise<any>;
    /**动态设置当前页面的标题 */
    let setNavigationBarTitle: (params: {
        title: string;
    }) => Promise<any>;
    /**设置页面导航条颜色 */
    let setNavigationBarColor: (params: {
        frontColor: '#ffffff' | '#000000';
        backgroundColor: string;
        animation: {
            duration?: number;
            timingFunc?: 'linear' | 'easeIn' | 'easeOut' | 'easeInOut';
        };
    }) => Promise<any>;
    /**在当前页面隐藏导航条加载动画 */
    let hideNavigationBarLoading: () => Promise<any>;
    /**动态设置下拉背景字体、loading 图的样式 */
    let setBackgroundTextStyle: (params: {
        textStyle: string;
    }) => Promise<any>;
    /**动态设置窗口的背景色 */
    let setBackgroundColor: (params?: {
        backgroundColor?: string;
        backgroundColorTop?: string;
        backgroundColorBottom?: string;
    }) => Promise<any>;
    /**下载文件资源到本地。客户端直接发起一个 HTTPS GET 请求，返回文件的本地临时路径，单次下载允许的最大文件为 50MB。使用前请注意阅读相关说明。
        注意：请在服务端响应的 header 中指定合理的 Content-Type 字段，以保证客户端正确处理文件类型。 */
    let downloadFile: (params: {
        url: string;
        header?: any;
        filePath?: string;
    }) => Promise<{
        tempFilePath: string;
        filePath: string;
        statusCode: string;
    }>;
    /**显示 tabBar 某一项的右上角的红点 */
    let showTabBarRedDot: (params: {
        index: number;
    }) => Promise<any>;
    /**显示 tabBar */
    let showTabBar: (params?: {
        animation?: boolean;
    }) => Promise<any>;
    /**动态设置 tabBar 的整体样式 */
    let setTabBarStyle: (params: {
        color: string;
        selectedColor: string;
        backgroundColor: string;
        borderStyle: string;
    }) => Promise<any>;
    /**动态设置 tabBar 某一项的内容，2.7.0 起图片支持临时文件和网络文件 */
    let setTabBarItem: (params: {
        index: number;
        text?: string;
        iconPath?: string;
        selectedIconPath?: string;
    }) => Promise<any>;
    /**为 tabBar 某一项的右上角添加文本 */
    let setTabBarBadge: (params: {
        index: number;
        text: string;
    }) => Promise<any>;
    /**移除 tabBar 某一项右上角的文本 */
    let removeTabBarBadge: (params: {
        index: number;
    }) => Promise<any>;
    /**隐藏 tabBar 某一项的右上角的红点 */
    let hideTabBarRedDot: (params: {
        index: number;
    }) => Promise<any>;
    /**隐藏 tabBar */
    let hideTabBar: (params?: {
        animation: boolean;
    }) => Promise<any>;
    /**
     * 动态加载网络字体。文件地址需为下载类型。iOS 仅支持 https 格式文件地址
     * 注意：
     *   1.引入中文字体，体积过大时会发生错误，建议抽离出部分中文，减少体积，或者用图片替代
     *   2.字体链接必须是https（ios不支持http)
     *   3.字体链接必须是同源下的，或开启了cors支持，小程序的域名是servicewechat.com
     *   4.canvas等原生组件不支持使用接口添加的字体
     *   5.工具里提示 Faild to load font可以忽略
     */
    let loadFontFace: (params: {
        family: string;
        source: string;
        desc?: {
            style?: 'normal' | 'italic' | 'oblique';
            weight?: 'normal' | 'bold' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900';
            variant?: 'normal' | 'small-caps' | 'inherit';
        };
    }) => Promise<any>;
    /**停止当前页面下拉刷新 */
    let stopPullDownRefresh: () => Promise<any>;
    /**开始下拉刷新。调用后触发下拉刷新动画，效果与用户手动下拉刷新一致 */
    let startPullDownRefresh: () => Promise<any>;
    /**将页面滚动到目标位置 */
    let pageScrollTo: (params: {
        scrollTop: number;
        duration?: number;
    }) => Promise<any>;
    /**创建一个动画实例 [animation](https://developers.weixin.qq.com/miniprogram/dev/api/ui/animation/Animation.html)。调用实例的方法来描述动画。最后通过动画实例的 export 方法导出动画数据传递给组件的 animation 属性。 */
    let createAnimation: (params?: {
        duration?: number;
        timingFunction?: 'linear' | 'ease' | 'ease-in' | 'ease-in-out' | 'ease-out' | 'step-start' | 'step-end';
        delay?: number;
        transformOrigin?: string;
    }) => wx.Animation;
    /**动态设置置顶栏文字内容。只有当前小程序被置顶时能生效，如果当前小程序没有被置顶，也能调用成功，但是不会立即生效，只有在用户将这个小程序置顶后才换上设置的文字内容. */
    let setTopBarText: (params: {
        text: string;
    }) => Promise<any>;
    /**延迟一部分操作到下一个时间片再执行。（类似于 setTimeout） */
    let nextTick: (call: Function) => void;
    /**监听窗口尺寸变化事件 */
    let onWindowResize: (call: Function) => void;
    /**取消监听窗口尺寸变化事件 */
    let offWindowResize: (call: Function) => void;
    /**[wx.setStorage](https://developers.weixin.qq.com/miniprogram/dev/api/storage/wx.setStorage.html) 的同步版本 */
    let setStorageSync: (key: string, data: any) => void;
    /**[wx.getStorage](https://developers.weixin.qq.com/miniprogram/dev/api/storage/wx.getStorage.html) 的同步版本 */
    let getStorageSync: (call: Function) => void;
    /**从本地缓存中移除指定 key */
    let removeStorage: (params: {
        key: string;
    }) => void;
    /**[wx.clearStorage](https://developers.weixin.qq.com/miniprogram/dev/api/storage/wx.clearStorage.html) 的同步版本 */
    let clearStorageSync: (call: Function) => void;
    /**将数据存储在本地缓存中指定的 key 中。会覆盖掉原来该 key 对应的内容。数据存储生命周期跟小程序本身一致，即除用户主动删除或超过一定时间被自动清理，否则数据都一直可用。单个 key 允许存储的最大数据长度为 1MB，所有数据存储上限为 10MB */
    let setStorage: (params: {
        key: string;
        data: any;
    }) => void;
    /**[wx.removeStorage](https://developers.weixin.qq.com/miniprogram/dev/api/storage/wx.removeStorage.html) 的同步版本 */
    let removeStorageSync: (key: string) => void;
    /**从本地缓存中异步获取指定 key 的内容 */
    let getStorage: (params: {
        key: string;
    }) => any;
    /**清理本地数据缓存 */
    let clearStorage: () => void;
    /**保存图片到系统相册 */
    let saveImageToPhotosAlbum: (params: {
        filePath: string;
    }) => Promise<any>;
    /**在新页面中全屏预览图片。预览的过程中用户可以进行保存图片、发送给朋友等操作 */
    let previewImage: (params: {
        urls: string[];
        current?: string;
    }) => Promise<any>;
    /**获取图片信息。网络图片需先配置download域名才能生效 */
    let getImageInfo: (params: {
        src: string;
    }) => Promise<any>;
    /**压缩图片接口，可选压缩质量 */
    let compressImage: (params: {
        src: string;
        quality?: number;
    }) => Promise<any>;
    /**从客户端会话选择文件 */
    let chooseMessageFile: (params: {
        count: number;
        type: 'all' | 'video' | 'image' | 'file';
    }) => Promise<{
        tempFiles: {
            path: string;
            size: number;
            name: string;
            type: string;
            time: number;
        }[];
    }>;
    /**从本地相册选择图片或使用相机拍照 */
    let chooseImage: (params: {
        count: number;
        sizeType: string[];
        sourceType: string[];
    }) => Promise<any>;
    /**保存视频到系统相册。支持mp4视频格式 */
    let saveVideoToPhotosAlbum: (params: {
        filePath: string;
    }) => Promise<any>;
    /**拍摄视频或从手机相册中选视频 */
    let chooseVideo: (params: {
        sourceType?: string[];
        compressed?: boolean;
        maxDuration: number;
        camera: 'back' | 'front';
    }) => Promise<any>;
    /**结束播放语音 */
    let stopVoice: () => Promise<any>;
    /**设置 [InnerAudioContext](https://developers.weixin.qq.com/miniprogram/dev/api/media/audio/InnerAudioContext.html) 的播放选项。设置之后对当前小程序全局生效 */
    let setInnerAudioOption: (params: {
        mixWithOther?: boolean;
        obeyMuteSwitch?: boolean;
    }) => Promise<any>;
    /**开始播放语音。同时只允许一个语音文件正在播放，如果前一个语音文件还没播放完，将中断前一个语音播放 */
    let playVoice: (params: {
        filePath: string;
        duration?: number;
    }) => Promise<any>;
    /**暂停正在播放的语音。再次调用 [wx.playVoice](https://developers.weixin.qq.com/miniprogram/dev/api/media/audio/wx.playVoice.html) 播放同一个文件时，会从暂停处开始播放。如果想从头开始播放，需要先调用 [wx.stopVoice](https://developers.weixin.qq.com/miniprogram/dev/api/media/audio/wx.stopVoice.html) */
    let pauseVoice: () => Promise<any>;
    /**获取当前支持的音频输入源 */
    let getAvailableAudioSources: () => Promise<any>;
    /**停止播放音乐 */
    let stopBackgroundAudio: () => Promise<any>;
    /**控制音乐播放进度 */
    let seekBackgroundAudio: (params: {
        position: number;
    }) => Promise<any>;
    /**
     * 使用后台播放器播放音乐。
     *
     * 对于微信客户端来说，只能同时有一个后台音乐在播放。当用户离开小程序后，音乐将暂停播放；当用户在其他小程序占用了音乐播放器，原有小程序内的音乐将停止播放 */
    let playBackgroundAudio: (params: {
        dataUrl: string;
        title?: string;
        coverImgUrl?: string;
    }) => Promise<any>;
    /**监听音乐停止事件 */
    let onBackgroundAudioStop: (call: Function) => Promise<any>;
    /**监听音乐播放事件 */
    let onBackgroundAudioPlay: (call: Function) => Promise<any>;
    /**监听音乐暂停事件 */
    let onBackgroundAudioPause: (call: Function) => Promise<any>;
    /**获取后台音乐播放状态 */
    let getBackgroundAudioPlayerState: () => Promise<{
        duration: number;
        currentPosition: number;
        status: number;
        downloadPercent: number;
        dataUrl: string;
    }>;
    /**
     * 获取全局唯一的背景音频管理器。
     *
     * 小程序切入后台，如果音频处于播放状态，可以继续播放。但是后台状态不能通过调用API操纵音频的播放状态.
     *
     * 从微信客户端6.7.2版本开始，若需要在小程序切后台后继续播放音频，需要在 app.json 中配置 requiredBackgroundModes 属性。开发版和体验版上可以直接生效，正式版还需通过审核
     */
    let getBackgroundAudioManager: () => wx.BackgroundAudioManager;
    /**获取全局唯一的录音管理器 RecorderManager */
    let getRecorderManager: () => wx.RecorderManager;
    /**创建 camera 上下文 CameraContext 对象 */
    let createCameraContext: () => wx.CameraContext;
    /**使用微信内置地图查看位置 */
    let openLocation: (params: {
        latitude: number;
        longitude: number;
        scale?: number;
        name?: string;
        address?: string;
    }) => Promise<any>;
    /**获取当前的地理位置、速度。当用户离开小程序后，此接口无法调用 */
    let getLocation: (params: {
        type?: 'wgs84' | 'gcj02';
        altitude?: number;
    }) => Promise<{
        latitude: number;
        longitude: number;
        speed: number;
        accuracy: number;
        altitude: number;
        verticalAccuracy: number;
        horizontalAccuracy: number;
    }>;
    /**打开地图选择位置 */
    let chooseLocation: () => Promise<{
        name: string;
        address: string;
        latitude: string;
        longitude: string;
    }>;
    /**更新转发属性 */
    let updateShareMenu: (params?: {
        withShareTicket?: boolean;
        isUpdatableMessage?: boolean;
        activityId?: string;
        templateInfo?: {
            parameterList: {
                name: string;
                value: string;
            }[];
        };
    }) => Promise<any>;
    /**显示当前页面的转发按钮 */
    let showShareMenu: (params?: {
        withShareTicket?: number;
    }) => Promise<{
        errMsg: string;
        encryptedData: string;
        iv: string;
        cloudID: string;
    }>;
    /**隐藏转发按钮 */
    let hideShareMenu: () => Promise<any>;
    /**获取转发详细信息 */
    let getShareInfo: (params: {
        shareTicket: string;
        timeout?: number;
    }) => Promise<any>;
    /**保存文件到本地。注意：saveFile 会把临时文件移动，因此调用成功后传入的 tempFilePath 将不可用 */
    let saveFile: (params: {
        tempFilePath: string;
    }) => Promise<any>;
    /**删除本地缓存文件 */
    let removeSavedFile: (params: {
        filePath: string;
    }) => Promise<any>;
    /**新开页面打开文档 */
    let openDocument: (params: {
        filePath: string;
        fileType?: 'doc' | 'docx' | 'xls' | 'xlsx' | 'ppt' | 'pptx' | 'pdf';
    }) => Promise<any>;
    /**获取该小程序下已保存的本地缓存文件列表 */
    let getSavedFileList: () => Promise<{
        fileList: {
            filePath: string;
            size: number;
            createTime: number;
        }[];
    }>;
    /**
     * 获取本地文件的文件信息。
     *
     * 此接口只能用于获取已保存到本地的文件，若需要获取临时文件信息，请使用 [wx.getFileInfo()](https://developers.weixin.qq.com/miniprogram/dev/api/file/wx.getFileInfo.html) 接口 */
    let getSavedFileInfo: (params: {
        filePath: string;
    }) => Promise<{
        size: number;
        createTime: number;
    }>;
    /**获取全局唯一的文件管理器 */
    let getFileSystemManager: () => wx.FileSystemManager;
    /**获取文件信息 */
    let getFileInfo: (params: {
        filePath: string;
        digestAlgorithm?: 'md5' | 'sha1';
    }) => Promise<{
        size: number;
        digest: string;
    }>;
    /**调用接口获取登录凭证（code）。
     *
     * 通过凭证进而换取用户登录态信息，包括用户的唯一标识（openid）及本次登录的会话密钥（session_key）等。
     *
     * 用户数据的加解密通讯需要依赖会话密钥完成。更多使用方法详见 [小程序登录](https://developers.weixin.qq.com/miniprogram/dev/dev_wxwork/dev-doc/qywx-api/login.html) */
    let login: (params?: {
        timeout?: number;
    }) => Promise<{
        code: string;
    }>;
    /**
     * 检查登录态是否过期
     *
     * 通过 wx.login 接口获得的用户登录态拥有一定的时效性。用户越久未使用小程序，用户登录态越有可能失效。反之如果用户一直在使用小程序，则用户登录态一直保持有效。具体时效逻辑由微信维护，对开发者透明。开发者只需要调用 wx.checkSession 接口检测当前用户登录态是否有效
     *
     * 登录态过期后开发者可以再调用 wx.login 获取新的用户登录态。调用成功说明当前 session_key 未过期，调用失败说明 session_key 已过期。
     *
     * 更多使用方法详见 [小程序登录](https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/login.html)
     */
    let checkSession: () => Promise<any>;
    /**打开另一个小程序
     * @version 1.3.0
    */
    let navigateToMiniProgram: (params: {
        appId: string;
        path?: string;
        extraData?: any;
        envVersion?: 'develop' | 'trial' | 'release';
    }) => Promise<any>;
    /**返回到上一个小程序。只有在当前小程序是被其他小程序打开时可以调用成功
     * @version 1.3.0
    */
    let navigateBackMiniProgram: (params?: {
        extraData?: any;
    }) => Promise<any>;
    /**获取当前帐号信息 */
    let getAccountInfoSync: () => Promise<any>;
    interface UserInfo {
        nickName: string;
        avatarUrl: string;
        /**0:未知，1:男性，2:女性 */
        gender: 0 | 1 | 2;
        country: string;
        province: string;
        city: string;
        language: 'en' | 'zh_CN' | 'zh_TW';
    }
    /**获取用户信息 */
    let getUserInfo: (params?: {
        withCredentials?: boolean;
        lang?: 'en' | 'zh_CN' | 'zh_TW';
    }) => Promise<{
        userInfo: UserInfo;
        rawData: string;
        signature: string;
        encryptedData: string;
        iv: string;
        cloudID: string;
    }>;
    /**发起微信支付。了解更多信息，请查看[微信支付接口文档](https://pay.weixin.qq.com/wiki/doc/api/wxa/wxa_api.php?chapter=7_3&index=1) */
    let requestPayment: (params: {
        timeStamp: string;
        nonceStr: string;
        package: string;
        signType: 'MD5' | 'HMAC-SHA256';
        paySign: string;
    }) => Promise<any>;
    /**
     * 提前向用户发起授权请求。
     *
     * 调用后会立刻弹窗询问用户是否同意授权小程序使用某项功能或获取用户的某些数据，但不会实际调用对应接口。如果用户之前已经同意授权，则不会出现弹窗，直接返回成功。
     *
     * 更多用法详见 [用户授权](https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/authorize.html)
     * @version 1.2.0
     * */
    let authorize: (params: {
        scope: 'scope.userInfo' | 'scope.userLocation' | 'scope.address' | 'scope.invoiceTitle' | 'scope.invoice' | 'scope.werun' | 'scope.record' | 'scope.writePhotosAlbum' | 'scope.camera';
    }) => Promise<any>;
    interface AuthSetting {
        /**是否授权用户信息，对应接口 [wx.getUserInfo](https://developers.weixin.qq.com/miniprogram/dev/api/open-api/user-info/wx.getUserInfo.html) */
        'scope.userInfo': boolean;
        /**是否授权地理位置，对应接口 [wx.getLocation](https://developers.weixin.qq.com/miniprogram/dev/api/location/wx.getLocation.html), [wx.chooseLocation](https://developers.weixin.qq.com/miniprogram/dev/api/location/wx.chooseLocation.html) */
        'scope.userLocation': boolean;
        /**是否授权通讯地址，对应接口 [wx.chooseAddress](https://developers.weixin.qq.com/miniprogram/dev/api/open-api/address/wx.chooseAddress.html) */
        'scope.address': boolean;
        /**是否授权发票抬头，对应接口 [wx.chooseInvoiceTitle](https://developers.weixin.qq.com/miniprogram/dev/api/open-api/invoice/wx.chooseInvoice.html) */
        'scope.invoiceTitle': boolean;
        /**是否授权获取发票，对应接口 [wx.chooseInvoice](https://developers.weixin.qq.com/miniprogram/dev/api/open-api/invoice/wx.chooseInvoice.html) */
        'scope.invoice': boolean;
        /**是否授权微信运动步数，对应接口 [wx.getWeRunData](https://developers.weixin.qq.com/miniprogram/dev/api/open-api/werun/wx.getWeRunData.html) */
        'scope.werun': boolean;
        /**是否授权录音功能，对应接口 [wx.startRecord](https://developers.weixin.qq.com/miniprogram/dev/api/media/recorder/wx.startRecord.html) */
        'scope.record': boolean;
        /**是否授权保存到相册 [wx.saveImageToPhotosAlbum](https://developers.weixin.qq.com/miniprogram/dev/api/media/image/wx.saveImageToPhotosAlbum.html), [wx.saveVideoToPhotosAlbum](https://developers.weixin.qq.com/miniprogram/dev/api/media/video/wx.saveVideoToPhotosAlbum.html) */
        'scope.writePhotosAlbum': boolean;
        /**是否授权摄像头，对应[[camera](https://developers.weixin.qq.com/miniprogram/dev/component/camera.html)]((camera)) 组件 */
        'scope.camera': boolean;
    }
    /**
     * 调起客户端小程序设置界面，返回用户设置的操作结果。
     *
     * 设置界面只会出现小程序已经向用户请求过的[权限](https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/authorize.html)
     *
     * 注意：2.3.0 版本开始，用户发生点击行为后，才可以跳转打开设置页，管理授权信息
     * @version 1.1.0
     * */
    let openSetting: () => Promise<{
        authSetting: AuthSetting;
    }>;
    /**
     * 获取用户的当前设置。返回值中只会出现小程序已经向用户请求过的[权限](https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/authorize.html)
     * @version 1.2.0
     * */
    let getSetting: () => Promise<{
        authSetting: AuthSetting;
    }>;
    /**
     * 调用前需要 用户授权 scope.address
     *
     * 获取用户收货地址。调起用户编辑收货地址原生界面，并在编辑完成后返回用户选择的地址
     * @version 1.1.0
     */
    let chooseAddress: (params: {
        position: number;
    }) => Promise<{
        userName: string;
        postalCode: string;
        provinceName: string;
        cityName: string;
        countyName: string;
        detailInfo: string;
        nationalCode: string;
        telNumber: string;
        errMsg: string;
    }>;
    /**
     * 查看微信卡包中的卡券。只有通过 [认证](https://developers.weixin.qq.com/miniprogram/product/renzheng.html) 的小程序或文化互动类目的小游戏才能使用。更多文档请参考 [微信卡券接口文档](https://mp.weixin.qq.com/cgi-bin/announce?action=getannouncement&key=1490190158&version=1&lang=zh_CN&platform=2)
     * @version 1.1.0
     * */
    let openCard: (params: {
        cardList: {
            cardId: string;
            code: string;
        }[];
    }) => Promise<any>;
    /**
     * 批量添加卡券。只有通过 [认证](https://developers.weixin.qq.com/miniprogram/product/renzheng.html) 的小程序或文化互动类目的小游戏才能使用。更多文档请参考 [微信卡券接口文档](https://mp.weixin.qq.com/cgi-bin/announce?action=getannouncement&key=1490190158&version=1&lang=zh_CN&platform=2)
     * @version 1.1.0
     * */
    let addCard: (params: {
        cardList: {
            cardId: string;
            cardExt: string;
        }[];
    }) => Promise<{
        cardList: {
            code: string;
            cardId: string;
            cardExt: string;
            isSuccess: boolean;
        }[];
    }>;
    /**
     * 调用前需要 用户授权 scope.invoiceTitle
     *
     * 选择用户的发票抬头。当前小程序必须关联一个公众号，且这个公众号是完成了[微信认证](https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1496554031_RD4xe)的，才能调用 chooseInvoiceTitle
     * @version 1.5.0
     */
    let chooseInvoiceTitle: () => Promise<{
        /**0:单位,1:个人 */
        type: 0 | 1;
        title: string;
        taxNumber: string;
        companyAddress: string;
        telephone: string;
        bankName: string;
        bankAccount: string;
        errMsg: string;
    }>;
    /**
     * 调用前需要 用户授权 scope.invoice
     *
     * 选择用户已有的发票
     * @version 1.5.0
     */
    let chooseInvoice: () => Promise<{
        invoiceInfo: any;
    }>;
    /**
     * 开始 SOTER 生物认证。验证流程请参考[说明](https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/bio-auth.html)
     * @version 1.5.0
     */
    let startSoterAuthentication: (params: {
        requestAuthModes: [];
        challenge: string;
        authContent: string;
    }) => Promise<{
        authMode: string;
        resultJSON: string;
        resultJSONSignature: string;
        errCode: number;
        errMsg: string;
    }>;
    /**
     * 获取本机支持的 SOTER 生物认证方式
     * @version 1.5.0
     */
    let checkIsSupportSoterAuthentication: () => Promise<{
        supportMode: ['fingerPrint', 'facial', 'speech'][];
    }>;
    /**
     * 获取设备内是否录入如指纹等生物信息的接口
     * @version 1.6.0
     */
    let checkIsSoterEnrolledInDevice: (params: {
        checkAuthMode: 'fingerPrint' | 'facial' | 'speech';
    }) => Promise<{
        isEnrolled: boolean;
        errMsg: string;
    }>;
    /**
     * 获取用户过去三十天微信运动步数。需要先调用 [wx.login](https://developers.weixin.qq.com/miniprogram/dev/api/open-api/login/wx.login.html) 接口。步数信息会在用户主动进入小程序时更新
     * @version 1.2.0
     */
    let getWeRunData: () => Promise<{
        encryptedData: string;
        iv: string;
        cloudID: string;
    }>;
    /**
     * 停止搜索附近的 iBeacon 设备
     * @version 1.2.0
     */
    let stopBeaconDiscovery: () => Promise<any>;
    /**
     * 开始搜索附近的 iBeacon 设备
     * @version 1.2.0
     */
    let startBeaconDiscovery: (params: {
        uuids: string[];
        ignoreBluetoothAvailable?: boolean;
    }) => Promise<any>;
    interface IBeaconInfo {
        uuid: string;
        major: string;
        minor: string;
        proximity: string;
        accuracy: string;
        rssi: string;
    }
    /**
     * 监听 iBeacon 设备更新事件
     * @version 1.2.0
     */
    let onBeaconUpdate: (call: (res: IBeaconInfo) => void) => void;
    /**
     * 监听 iBeacon 服务状态变化事件
     * @version 1.2.0
     */
    let onBeaconServiceChange: (call: (res: {
        available: boolean;
        discovering: boolean;
    }) => void) => void;
    /**
     * 获取所有已搜索到的 iBeacon 设备
     * @version 1.2.0
     */
    let getBeacons: () => Promise<{
        beacons: IBeaconInfo[];
    }>;
    /**
     * 关闭 Wi-Fi 模块
     * @version 1.6.0
     */
    let stopWifi: () => Promise<any>;
    /**
     * 初始化 Wi-Fi 模块
     * @version 1.6.0
     */
    let startWifi: () => Promise<any>;
    /**
     * 设置 wifiList 中 AP 的相关信息。在 onGetWifiList 回调后调用，iOS特有接口
     * @version 1.6.0
     */
    let setWifiList: (params: {
        wifiList: string[];
    }) => Promise<any>;
    interface WifiInfo {
        SSID: string;
        BSSID: string;
        secure: boolean;
        signalStrength: number;
    }
    /**
     * 监听连接上 Wi-Fi 的事件
     * @version 1.6.0
     */
    let onWifiConnected: (call: (wifi: WifiInfo) => void) => void;
    /**
     * 监听获取到 Wi-Fi 列表数据事件
     * @version 1.6.0
     */
    let onGetWifiList: (call: (wifiList: WifiInfo[]) => void) => void;
    /**
     * 请求获取 Wi-Fi 列表。在 onGetWifiList 注册的回调中返回 wifiList 数据。 Android 调用前需要 [用户授权](https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/authorize.html) scope.userLocation
     *
     * iOS 将跳转到系统的 Wi-Fi 界面，Android 不会跳转。 iOS 11.0 及 iOS 11.1 两个版本因系统问题，该方法失效。但在 iOS 11.2 中已修复
     * @version 1.6.0
     */
    let getWifiList: () => Promise<any>;
    /**
     * 获取已连接中的 Wi-Fi 信息
     * @version 1.6.0
     */
    let getConnectedWifi: (params: {
        position: number;
    }) => Promise<{
        wifi: WifiInfo;
    }>;
    /**
     * 连接 Wi-Fi。若已知 Wi-Fi 信息，可以直接利用该接口连接。仅 Android 与 iOS 11 以上版本支持
     * @version 1.6.0
     */
    let connectWifi: (params: {
        SSID: string;
        BSSID?: string;
        password: string;
    }) => Promise<any>;
    /**
     * 读取低功耗蓝牙设备的特征值的二进制数据值。注意：必须设备的特征值支持 read 才可以成功调用
     * @version 1.1.0
     */
    let readBLECharacteristicValue: (params: {
        deviceId: string;
        serviceId: string;
        characteristicId: string;
    }) => Promise<any>;
    /**
     * 监听低功耗蓝牙连接状态的改变事件。包括开发者主动连接或断开连接，设备丢失，连接异常断开等等
     * @version 1.1.0
     */
    let onBLEConnectionStateChange: (call: (result: {
        deviceId: string;
        connected: boolean;
    }) => void) => void;
    /**
     * 监听低功耗蓝牙设备的特征值变化事件。必须先启用 notifyBLECharacteristicValueChange 接口才能接收到设备推送的 notification
     * @version 1.1.0
     */
    let onBLECharacteristicValueChange: (call: (result: {
        deviceId: string;
        serviceId: string;
        characteristicId: string;
        value: ArrayBuffer;
    }) => void) => void;
    /**
     * 启用低功耗蓝牙设备特征值变化时的 notify 功能，订阅特征值。注意：必须设备的特征值支持 notify 或者 indicate 才可以成功调用
     *
     * 另外，必须先启用 notifyBLECharacteristicValueChange 才能监听到设备 characteristicValueChange 事件
     * @version 1.1.0
     */
    let notifyBLECharacteristicValueChange: (params: {
        deviceId: string;
        serviceId: string;
        characteristicId: string;
        state: string;
    }) => Promise<any>;
    /**
     * 获取蓝牙设备所有服务(service)
     * @version 1.1.0
     */
    let getBLEDeviceServices: (params: {
        deviceId: string;
    }) => Promise<{
        services: {
            uuid: string;
            isPrimary: boolean;
        }[];
    }>;
    /**
     * 获取蓝牙设备某个服务中所有特征值(characteristic)
     * @version 1.1.0
     */
    let getBLEDeviceCharacteristics: (params: {
        deviceId: string;
        serviceId: string;
    }) => Promise<any>;
    /**
     * 连接低功耗蓝牙设备
     *
     * 若小程序在之前已有搜索过某个蓝牙设备，并成功建立连接，可直接传入之前搜索获取的 deviceId 直接尝试连接该设备，无需进行搜索操作
     * @version 1.1.0
     */
    let createBLEConnection: (params: {
        deviceId: string;
        timeout?: number;
    }) => Promise<any>;
    /**
     * 断开与低功耗蓝牙设备的连接
     * @version 1.1.0
     */
    let closeBLEConnection: (params: {
        deviceId: string;
    }) => Promise<any>;
    /**
     * 向低功耗蓝牙设备特征值中写入二进制数据。注意：必须设备的特征值支持 write 才可以成功调用
     * @version 1.1.0
     */
    let writeBLECharacteristicValue: (params: {
        deviceId: string;
        serviceId: string;
        characteristicId: string;
        value: ArrayBuffer;
    }) => Promise<any>;
    /**
     * 添加手机通讯录联系人。用户可以选择将该表单以「新增联系人」或「添加到已有联系人」的方式，写入手机系统通讯录
     * @version 1.2.0
     */
    let addPhoneContact: (params: {
        firstName: string;
        photoFilePath?: string;
        nickName?: string;
        lastName?: string;
        middleName?: string;
        remark?: string;
        mobilePhoneNumber?: string;
        weChatNumber?: string;
        addressCountry?: string;
        addressState?: string;
        addressCity?: string;
        addressStreet?: string;
        addressPostalCode?: string;
        organization?: string;
        workFaxNumber?: string;
        workPhoneNumber?: string;
        hostNumber?: string;
        email?: string;
        url?: string;
        workAddressCountry?: string;
        workAddressState?: string;
        workAddressCity?: string;
        workAddressStreet?: string;
        workAddressPostalCode?: string;
        homeFaxNumber?: string;
        homePhoneNumber?: string;
        homeAddressCountry?: string;
        homeAddressState?: string;
        homeAddressCity?: string;
        homeAddressStreet?: string;
        homeAddressPostalCode?: string;
    }) => Promise<any>;
    /**
     * 停止搜寻附近的蓝牙外围设备。若已经找到需要的蓝牙设备并不需要继续搜索时，建议调用该接口停止蓝牙搜索
     * @version 1.1.0
     */
    let stopBluetoothDevicesDiscovery: () => Promise<any>;
    /**
     * 开始搜寻附近的蓝牙外围设备。此操作比较耗费系统资源，请在搜索并连接到设备后调用 [wx.stopBluetoothDevicesDiscovery](https://developers.weixin.qq.com/miniprogram/dev/api/device/bluetooth/wx.stopBluetoothDevicesDiscovery.html) 方法停止搜索
     * @version 1.1.0
     */
    let startBluetoothDevicesDiscovery: (params: {
        services?: string[];
        allowDuplicatesKey?: boolean;
        interval?: number;
    }) => Promise<any>;
    /**
     * 初始化蓝牙模块
     * @version 1.1.0
     */
    let openBluetoothAdapter: () => Promise<any>;
    /**
     * 监听寻找到新设备的事件
     * @version 1.1.0
     */
    let onBluetoothDeviceFound: (call: (res: {
        devices: {
            name: string;
            deviceId: string;
            RSSI: number;
            advertisData: ArrayBuffer;
            advertisServiceUUIDs: string[];
            localName: string;
            serviceData: any;
        }[];
    }) => void) => Promise<any>;
    /**
     * 监听蓝牙适配器状态变化事件
     * @version 1.1.0
     */
    let onBluetoothAdapterStateChange: (call: (res: {
        available: boolean;
        discovering: boolean;
    }) => void) => Promise<any>;
    /**
     * 根据 uuid 获取处于已连接状态的设备
     * @version 1.1.0
     */
    let getConnectedBluetoothDevices: (params: {
        services: string[];
    }) => Promise<any>;
    /**
     * 获取在蓝牙模块生效期间所有已发现的蓝牙设备。包括已经和本机处于连接状态的设备
     * @version 1.1.0
     */
    let getBluetoothDevices: () => Promise<any>;
    /**
     * 获取本机蓝牙适配器状态
     * @version 1.1.0
     */
    let getBluetoothAdapterState: () => Promise<{
        discovering: boolean;
        available: boolean;
    }>;
    /**
     * 关闭蓝牙模块。调用该方法将断开所有已建立的连接并释放系统资源。建议在使用蓝牙流程后，与 [wx.openBluetoothAdapter](https://developers.weixin.qq.com/miniprogram/dev/api/device/bluetooth/wx.openBluetoothAdapter.html) 成对调用
     * @version 1.1.0
     */
    let closeBluetoothAdapter: () => Promise<any>;
    /**
     * 获取设备电量。同步 API [wx.getBatteryInfoSync](https://developers.weixin.qq.com/miniprogram/dev/api/device/battery/wx.getBatteryInfoSync.html) 在 iOS 上不可用
     */
    let getBatteryInfo: () => Promise<{
        level: string;
        isCharging: boolean;
    }>;
    /**
     * 设置系统剪贴板的内容
     * @version 1.1.0
     */
    let setClipboardData: (params: {
        data: string;
    }) => Promise<any>;
    /**
     * 获取系统剪贴板的内容
     * @version 1.1.0
     */
    let getClipboardData: () => Promise<{
        data: string;
    }>;
    /**
     * 关闭 NFC 模块。仅在安卓系统下有效
     * @version 1.7.0
     */
    let stopHCE: () => Promise<any>;
    /**
     * 初始化 NFC 模块
     * @version 1.7.0
     */
    let startHCE: (params: {
        aid_list: string[];
    }) => Promise<any>;
    /**
     * 发送 NFC 消息。仅在安卓系统下有效
     * @version 1.7.0
     */
    let sendHCEMessage: (params: {
        data: ArrayBuffer;
    }) => Promise<any>;
    /**
     * 监听接收 NFC 设备消息事件
     * @version 1.7.0
     */
    let onHCEMessage: (call: (res: {
        messageType: number;
        data: ArrayBuffer;
        reason: number;
    }) => void) => void;
    /**
     * 判断当前设备是否支持 HCE 能力
     * @version 1.7.0
     */
    let getHCEState: () => Promise<any>;
    /**
     * 监听网络状态变化事件
     * @version 1.1.0
     */
    let onNetworkStatusChange: (call: (res: {
        isConnected: boolean;
        networkType: string;
    }) => void) => void;
    /**
     * 获取网络类型
     */
    let getNetworkType: () => Promise<{
        networkType: string;
    }>;
    /**
     * 设置屏幕亮度
     * @version 1.2.0
     */
    let setScreenBrightness: (params: {
        value: number;
    }) => Promise<any>;
    /**
     * 设置是否保持常亮状态。仅在当前小程序生效，离开小程序后设置失效
     * @version 1.4.0
     */
    let setKeepScreenOn: (params: {
        keepScreenOn: boolean;
    }) => Promise<any>;
    /**
     * 监听用户主动截屏事件。用户使用系统截屏按键截屏时触发
     * @version 1.4.0
     */
    let onUserCaptureScreen: (call: () => void) => void;
    /**
     * 获取屏幕亮度
     * @version 1.2.0
     */
    let getScreenBrightness: (params: {
        position: number;
    }) => Promise<{
        value: number;
    }>;
    /**
     * 拨打电话
     */
    let makePhoneCall: (params: {
        phoneNumber: string;
    }) => Promise<any>;
    /**
     * 停止监听加速度数据
     * @version 1.1.0
     */
    let stopAccelerometer: () => Promise<any>;
    /**
     * 开始监听加速度数据
     * @version 1.1.0
     */
    let startAccelerometer: (params?: {
        interval?: 'game' | 'ui' | 'normal';
    }) => Promise<any>;
    /**
     * 监听加速度数据事件。频率根据 [wx.startAccelerometer()](https://developers.weixin.qq.com/miniprogram/dev/api/device/accelerometer/wx.startAccelerometer.html) 的 interval 参数。可使用 [wx.stopAccelerometer()](https://developers.weixin.qq.com/miniprogram/dev/api/device/accelerometer/wx.stopAccelerometer.html) 停止监听。
     * @version 1.1.0
     */
    let onAccelerometerChange: (call: (res: {
        x: number;
        y: number;
        z: number;
    }) => void) => void;
    /**
     * 停止监听罗盘数据
     * @version 1.1.0
     */
    let stopCompass: () => Promise<any>;
    /**
     * 开始监听罗盘数据
     * @version 1.1.0
     */
    let startCompass: () => Promise<any>;
    /**
     * 监听罗盘数据变化事件。频率：5 次/秒，接口调用后会自动开始监听，可使用 wx.stopCompass 停止监听
     * @version 1.1.0
     */
    let onCompassChange: (call: (res: {
        direction: number;
        accuracy: number | string;
    }) => void) => void;
    /**
     * 停止监听设备方向的变化
     * @version 2.3.0
     */
    let stopDeviceMotionListening: () => Promise<any>;
    /**
     * 开始监听设备方向的变化
     * @version 2.3.0
     */
    let startDeviceMotionListening: (params?: {
        interval?: 'game' | 'ui' | 'normal';
    }) => Promise<any>;
    /**
     * 监听设备方向变化事件。频率根据 wx.startDeviceMotionListening() 的 interval 参数。可以使用 wx.stopDeviceMotionListening() 停止监听
     * @version 2.3.0
     */
    let onDeviceMotionChange: (call: (res: {
        alpha: number;
        beta: number;
        gamma: number;
    }) => void) => void;
    /**
     * 停止监听陀螺仪数据
     * @version 2.3.0
     */
    let stopGyroscope: () => Promise<any>;
    /**
     * 开始监听陀螺仪数据
     * @version 2.3.0
     */
    let startGyroscope: (params: {
        interval?: 'game' | 'ui' | 'normal';
    }) => Promise<any>;
    /**
     * 监听陀螺仪数据变化事件。频率根据 wx.startGyroscope() 的 interval 参数。可以使用 wx.stopGyroscope() 停止监听。
     * @version 2.3.0
     */
    let onGyroscopeChange: (call: (res: {
        x: number;
        y: number;
        z: number;
    }) => void) => void;
    /**
     * 监听内存不足告警事件
     *
     * 当 iOS/Android 向小程序进程发出内存警告时，触发该事件。触发该事件不意味小程序被杀，大部分情况下仅仅是告警，开发者可在收到通知后回收一些不必要资源避免进一步加剧内存紧张
     * @version 2.0.2
     */
    let onMemoryWarning: (call: (res: {
        level: number;
    }) => void) => void;
    /**
     * 调起客户端扫码界面进行扫码
     */
    let scanCode: (params?: {
        onlyFromCamera?: boolean;
        scanType?: string[];
    }) => Promise<any>;
    /**
     * 使手机发生较短时间的振动（15 ms）。仅在 iPhone 7 / 7 Plus 以上及 Android 机型生效
     * @version 1.2.0
     */
    let vibrateShort: () => Promise<any>;
    /**
     * 使手机发生较长时间的振动（400 ms)
     * @version 1.2.0
     */
    let vibrateLong: () => Promise<any>;
    /**
     * 监听路由变动，在路由改变之前执行
     */
    let routerBefore: (call: (res: {
        form: string;
        to: string;
    }) => any) => void;
    /**
     * 监听路由变动，在路由改变之后执行
     */
    let routerAfter: (call: (res: {
        form: string;
        to: string;
    }) => any) => void;
}
export default tenp;
