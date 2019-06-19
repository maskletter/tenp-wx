// import  '@types/weixin-app'
/// <reference path="../../../@types/weixin-app/index.d.ts" />


namespace tenp{
	export interface AppConfig {
		pages: any[]
		plugins?: {[prop:string]:{ version: string, provider: string }}
		style?: string[]|string
		components?: {}
		window?: {
			navigationBarBackgroundColor?: string
			navigationBarTextStyle?: string
			navigationBarTitleText?: string
			navigationStyle?: string
			backgroundColor?: string
			backgroundTextStyle?: string
			backgroundColorTop?: string
			backgroundColorBottom?: string
			enablePullDownRefresh?: boolean
			onReachBottomDistance?: number
			pageOrientation?: string
		}
		tabBar?: {
			color?: string
			selectedColor?: string
			backgroundColor?: string
			borderStyle?: 'blac'|'white'
			list?: { pagePath: string, text: string, iconPath?: string, selectedIconPath?: string }[]
			position?: 'bottom'|'top'
			custom?: boolean
		}
		networkTimeout?: {
			request?: number
			connectSocket?: number
			uploadFile?: number
			downloadFile?: number
		}
		debug?: boolean
		functionalPages?: boolean
		subpackages?: any
		workers?: string
		requiredBackgroundModes?: string[]
		preloadRule?: any
		resizable?: boolean
		navigateToMiniProgramAppIdList?: string[]
		permission?: any
	}
	export interface PageConfig{
		template?: any[]
		templateStr?: string
		style?: string[]|string
		components?: {}
		/**
		 * 导航栏背景颜色，如 #000000
		 * @type {[type]}
		 */
		navigationBarBackgroundColor?: string
		/**
		 * 导航栏标题颜色，仅支持 black / white
		 * 默认white
		 */
		navigationBarTextStyle?: 'black'|'white'
		/**
		 * 导航栏标题文字内容
		 * @type {[type]}
		 */
		navigationBarTitleText?: string
		/**
		 * 导航栏样式，仅支持以下值：
		 * default 默认样式
		 * custom 自定义导航栏，只保留右上角胶囊按钮
		 */
		navigationStyle?: 'default'|'custom'
		/**
		 * 窗口的背景色
		 * @type {[type]}
		 */
		backgroundColor?: string
		/**
		 * 下拉 loading 的样式，仅支持 dark / light
		 */
		backgroundTextStyle?: 'dark'|'light'
		/**
		 * 顶部窗口的背景色，仅 iOS 支持
		 * @type {[type]}
		 */
		backgroundColorTop?: string
		/**
		 * 底部窗口的背景色，仅 iOS 支持
		 * @type {[type]}
		 */
		backgroundColorBottom?: string
		/**
		 * 是否开启当前页面下拉刷新
		 * @type {[type]}
		 */
		enablePullDownRefresh?: boolean
		/**
		 * 页面上拉触底事件触发时距页面底部距离，单位为px。
		 * 默认值:50
		 * @type {[type]}
		 */
		onReachBottomDistance?: number
		/**
		 * 屏幕旋转设置，支持 auto / portrait / landscape 
		 */
		pageOrientation?: 'auto'|'portrait'|'landscape'
		/**
		 * 设置为 true 则页面整体不能上下滚动。
		 * 只在页面配置中有效，无法在 app.json 中设置
		 * @type {[type]}
		 */
		disableScroll?: boolean
		/**
		 * 禁止页面右滑手势返回
		 * @type {[type]}
		 */
		disableSwipeBack?: boolean
	}
	export interface ComponentConfig {
		template?: any[]
		templateStr?: string
        style?: string[]|string,
        components?: {}
	}
	export interface ComponentRelations{
		[prop: string]: {
			type: 'child'|'parent'|'ancestor'|'descendant'
			/**关系生命周期函数，当关系被建立在页面节点树中时触发，触发时机在组件attached生命周期之后 */
			linked?(): void
			/**关系生命周期函数，当关系在页面节点树中发生改变时触发，触发时机在组件moved生命周期之后 */
			linkChanged?(): void
			/**关系生命周期函数，当关系脱离页面节点树时触发，触发时机在组件detached生命周期之后 */
			unlinked?(): void
			/**如果这一项被设置，则它表示关联的目标节点所应具有的behavior，所有拥有这一behavior的组件节点都会被关联 */
			target?: string
		}
	}
	export interface ComponentOptions{
		/**
		 * isolated 表示启用样式隔离，在自定义组件内外，使用 class 指定的样式将不会相互影响（一般情况下的默认值）；
		 * apply-shared 表示页面 wxss 样式将影响到自定义组件，但自定义组件 wxss 中指定的样式不会影响页面；
		 * shared 表示页面 wxss 样式将影响到自定义组件，自定义组件 wxss 中指定的样式也会影响页面和其他设置了 apply-shared 或 shared 的自定义组件。（这个选项在插件中不可用。）
		 * @type {[type]}
		 */
		styleIsolation?: 'isolated'|'apply-shared'|'shared'
		/**
		 *  这个选项等价于设置 styleIsolation: apply-shared ，但设置了 styleIsolation 选项后这个选项会失效
		 * @type {[type]}
		 */
		addGlobalClass?: boolean
		/**
		 * 有时，组件希望接受外部传入的样式类。此时可以在 Component 中用 externalClasses 定义段定义若干个外部样式类。这个特性从小程序基础库版本 1.9.90 开始支持。
		 */
		externalClasses?: string[]
		/**
		 * 在组件定义时的选项中启用多slot支持
		 * @type {[type]}
		 */
		multipleSlots?: boolean
	}

	//事件
	export let getMenuButtonBoundingClientRect:() => {
		bottom: number
		height:number
		left:number
		right:number
		top:number
		width:number
	}

	export interface WxShowParams{
		path: string
		scene: number
		query: any
		shareTicket: string
		referrerInfo: { appId: string, extraData: any }
	}
	export interface WxAppParams{
		path: string
		scene: number
		query: any
		shareTicket: string
		referrerInfo: { appId: string, extraData: any }
	}

	/**判断小程序的API，回调，参数，组件等是否在当前版本可用。 String参数说明： 使用 ${API}.${method}.${param}.${options} 或者 ${component}.${attribute}.${option}方式来调用 例如： ${API} 代表 API 名字 ${method} 代表调用方式，有效值为return, success, object, callback ${param} 代表参数或者返回值 ${options} 代表参数的可选值 ${component} 代表组件名字 ${attribute} 代表组件属性 ${option} 代表组件属性的可选值 */
	export let canIUse: (api: string ) => boolean;
	/**获取系统信息 */
	export let SystemInfo: () => Promise<wx.SystemInfo>;
	/**获取全局唯一的版本更新管理器，用于管理小程序更新。关于小程序的更新机制，可以查看运行机制文档 */
	export let getUpdateManager: () => wx.UpdateManager;
	/**获取小程序启动时的参数。与 App.onLaunch 的回调参数一致 */
	export let getLaunchOptionsSync: () => WxAppParams;
	/**取消监听小程序要打开的页面不存在事件 */
	export let onPageNotFound: (callback: (params?: { path: string, query: any, isEntryPage: boolean }) => void) => void;
	/**监听小程序错误事件。如脚本错误或 API 调用报错等。该事件与 App.onError 的回调时机与参数一致 */
	export let onError: (callback: Function) => void;
	/**监听音频中断结束事件。在收到 onAudioInterruptionBegin 事件之后，小程序内所有音频会暂停，收到此事件之后才可再次播放成功 */
	export let onAudioInterruptionEnd: (callback: Function) => void;
	/**监听音频因为受到系统占用而被中断开始事件。以下场景会触发此事件：闹钟、电话、FaceTime 通话、微信语音聊天、微信视频聊天。此事件触发后，小程序内所有音频会暂停 */
	export let onAudioInterruptionBegin: (callback: Function) => void;
	/**监听小程序切前台事件。该事件与 App.onShow 的回调参数一致 */
	export let onAppShow: (callback: (params?: WxShowParams)  => void) => {};
	/**监听小程序切后台事件。该事件与 App.onHide 的回调时机一致 */
	export let onAppHide: (callback: Function) => void;
	/**取消监听小程序要打开的页面不存在事件 */
	export let offPageNotFound: (callback: Function) => void;
	/**取消监听小程序错误事件 */
	export let offError: (callback: Function) => void;
	/**取消监听音频中断结束事件 */
	export let offAudioInterruptionEnd: (callback: Function) => void;
	/**取消监听音频因为受到系统占用而被中断开始事件 */
	export let offAudioInterruptionBegin: (callback: Function) => void;
	/**取消监听小程序切前台事件 */
	export let offAppShow: (callback: Function) => void;
	/**取消监听小程序切后台事件 */
	export let offAppHide: (callback: Function) => void;
	/**设置是否打开调试开关。此开关对正式版也能生效 */
	export let setEnableDebug: (params: { enableDebug: boolean }) => Promise<any>
	/**获取日志管理器对象 */
	export let getLogManager: (params?: { level?: number }) => wx.Logger;
	/**跳转到 tabBar 页面，并关闭其他所有非 tabBar 页面 */
	export let switchTab: (params: { url: string }) => Promise<any>
	/**关闭所有页面，打开到应用内的某个页面 */
	export let reLaunch: (params: { url: string }) => Promise<any>
	/**关闭当前页面，跳转到应用内的某个页面。但是不允许跳转到 tabbar 页面 */
	export let redirectTo: (params: { url: string }) => Promise<any>
	/**保留当前页面，跳转到应用内的某个页面。但是不能跳到 tabbar 页面。使用 [wx.navigateBack](https://developers.weixin.qq.com/miniprogram/dev/api/route/wx.navigateBack.html) 可以返回到原页面。小程序中页面栈最多十层 */
	export let navigateTo: (params: { url: string }) => Promise<any>
	/**关闭当前页面，返回上一页面或多级页面。可通过 [getCurrentPages](https://developers.weixin.qq.com/miniprogram/dev/reference/api/getCurrentPages.html) 获取当前的页面栈，决定需要返回几层 */
	export let navigateBack: (params: { delta: number }) => Promise<any>
	/**显示消息提示框 */
	export let showToast: (params: { 
		/**提示的内容 */
		title: string
		/**图标 */
		icon?: 'success'|'loading'|'none'
		/**自定义图标的本地路径，image 的优先级高于 icon */
		image?: string
		/**提示的延迟时间 */
		duration?: number
		/**是否显示透明蒙层，防止触摸穿透 */
		mask?: boolean
	}) => Promise<any>
	/**显示模态对话框 */
	export let showModal: (params: {
		/**提示的标题 */
		title: string
		/**提示的内容 */
		content: string
		/**是否显示取消按钮 */
		showCancel?: boolean
		/**取消按钮的文字，最多 4 个字符 */
		cancelText?: string
		/**取消按钮的文字颜色，必须是 16 进制格式的颜色字符串 */
		cancelColor?: string
		/**确认按钮的文字，最多 4 个字符 */
		confirmText?: string
		/**确认按钮的文字颜色，必须是 16 进制格式的颜色字符串 */
		confirmColor?: string
	}) => Promise<{ confirm: boolean, cancel: boolean }>
	/**显示 loading 提示框。需主动调用 wx.hideLoading 才能关闭提示框 */
	export let showLoading: (params: {
		/**提示的内容 */
		title: string
		/**是否显示透明蒙层，防止触摸穿透 */
		mask?: boolean
	}) => Promise<any>
	/**显示操作菜单 */
	export let showActionSheet: (params: {
		/**按钮的文字数组，数组长度最大为 6 */
		itemList: string[]
		/**按钮的文字颜色 */
		itemColor?: string
	}) => Promise<any>
	/**隐藏消息提示框 */
	export let hideToast: () => Promise<any>
	/**隐藏 loading 提示框 */
	export let hideLoading: () => Promise<any>
	/**在当前页面显示导航条加载动画 */
	export let showNavigationBarLoading: (params: {}) => Promise<any>
	/**动态设置当前页面的标题 */
	export let setNavigationBarTitle: (params: { title: string }) => Promise<any>
	/**设置页面导航条颜色 */
	export let setNavigationBarColor: (params: {
		frontColor: '#ffffff'|'#000000'
		backgroundColor: string
		animation: {
			duration?: number
			timingFunc?: 'linear'|'easeIn'|'easeOut'|'easeInOut'
		}
	}) => Promise<any>
	/**在当前页面隐藏导航条加载动画 */
	export let hideNavigationBarLoading: () => Promise<any>
	/**动态设置下拉背景字体、loading 图的样式 */
	export let setBackgroundTextStyle: (params: { textStyle: string }) => Promise<any>
	/**动态设置窗口的背景色 */
	export let setBackgroundColor: (params?: { 
		backgroundColor?: string, 
		backgroundColorTop?: string, 
		backgroundColorBottom?: string
	}) => Promise<any>
	/**下载文件资源到本地。客户端直接发起一个 HTTPS GET 请求，返回文件的本地临时路径，单次下载允许的最大文件为 50MB。使用前请注意阅读相关说明。
		注意：请在服务端响应的 header 中指定合理的 Content-Type 字段，以保证客户端正确处理文件类型。 */
    export let downloadFile: (params: {
		url: string
		header?: any
		filePath?: string
	}) => Promise<{ tempFilePath: string, filePath: string, statusCode: string }>
   
}


export default tenp;