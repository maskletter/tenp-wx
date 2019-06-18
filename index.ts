
import tenp from './lib/interface';

export const Component = function (config: tenp.ComponentConfig): any {
	return (target: Function) => {
		
	}
}
export class WxComponent{
	/**组件生命周期函数-在组件实例刚刚被创建时执行，注意此时不能调用 setData ) */
	created?(...argv: any): void;
	/**组件生命周期函数-在组件实例进入页面节点树时执行) */
	attached?(...argv: any): void;
	/**组件生命周期函数-在组件布局完成后执行) */
	ready?(...argv: any): void;
	/**组件生命周期函数-在组件实例被移动到节点树另一个位置时执行) */
	moved?(...argv: any): void;
	/**组件生命周期函数-在组件实例被从页面节点树移除时执行) */
	detached?(...argv: any): void;
	/**设置data并执行视图层渲染 */
	setData?(data: {[prop: string]: any}, callback?: Function): void
	/**检查组件是否具有 behavior （检查时会递归检查被直接或间接引入的所有behavior） */
	hasBehavior?(behavior: any): void;
	/**触发事件，参见 [组件间通信与事件](https://developers.weixin.qq.com/miniprogram/dev/framework/custom-component/events.html) */
	triggerEvent?(name?: string, detail?: any, options?: any): void;
	/**创建一个 [SelectorQuery](https://developers.weixin.qq.com/miniprogram/dev/api/wxml/SelectorQuery.html) 对象，选择器选取范围为这个组件实例内 */
	createSelectorQuery?(): void;
	/**创建一个 [IntersectionObserver](https://developers.weixin.qq.com/miniprogram/dev/api/wxml/IntersectionObserver.html) 对象，选择器选取范围为这个组件实例内 */
	createIntersectionObserver?(): void;
	/**使用选择器选择组件实例节点，返回匹配到的第一个组件实例对象（会被 wx://component-export 影响） */
	selectComponent?<T>(selector: string): any
	/**使用选择器选择组件实例节点，返回匹配到的全部组件实例对象组成的数组 */
	selectAllComponents?<T>(selector: string): any
	/**获取这个关系所对应的所有关联节点，参见 [组件间关系](https://developers.weixin.qq.com/miniprogram/dev/framework/custom-component/relations.html) */
	getRelationNodes?(relationKey: string): any
	/**立刻执行 callback ，其中的多个 setData 之间不会触发界面绘制（只有某些特殊场景中需要，如用于在不同组件同时 setData 时进行界面绘制同步） */
	groupSetData?(callback: Function): void
	/**返回当前页面的 custom-tab-bar 的组件实例，详见自定义 [tabBar](https://developers.weixin.qq.com/miniprogram/dev/framework/ability/custom-tabbar.html) */
	getTabBar?(): any
	/**返回页面标识符（一个字符串），可以用来判断几个自定义组件实例是不是在同一个页面内 */
	getPageId?(): any
	/**组件接受的外部样式类，参见 [外部样式类](https://developers.weixin.qq.com/miniprogram/dev/framework/custom-component/wxml-wxss.html) */
	externalClasses?: string[]
	/**一些选项 */
	options?: tenp.ComponentOptions
	/**组件间关系定义，参见 [组件间关系](https://developers.weixin.qq.com/miniprogram/dev/framework/custom-component/relations.html) */
	relations?: {
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
	/**类似于mixins和traits的组件间代码复用机制，参见 [behaviors](https://developers.weixin.qq.com/miniprogram/dev/framework/custom-component/behaviors.html) */
	behaviors?: any[]
}
export class WxPage{

	/**生命周期回调—监听页面加载 */
	onLoad?(options?: any): void
	/**生命周期回调—监听页面初次渲染完成 */
	onReady?(options?: any): void;
	/**生命周期回调—监听页面显示 */
	onShow?(options?: any): void;
	/**生命周期回调—监听页面隐藏 */
	onHide?(options?: any): void;
	/**生命周期回调—监听页面卸载 */
	onUnload?(options?: any): void;
	/**监听用户下拉动作 */
	onPullDownRefresh?(options?: any): void;
	/**页面上拉触底事件的处理函数 */
	onReachBottom?(options?: any): void;
	/**用户点击右上角转发 */
	onShareAppMessage?(from?: 'button'|'menu',target?:any,webViewUrl?:string): {
		title?: string
		path?: string
		imageUrl?: string
	};
	/**页面滚动触发事件的处理函数 */
	onPageScroll?(options?: any): void;
	/**页面尺寸改变时触发，详见 [响应显示区域变化](https://developers.weixin.qq.com/miniprogram/dev/framework/view/resizable.html#%E5%9C%A8%E6%89%8B%E6%9C%BA%E4%B8%8A%E5%90%AF%E7%94%A8%E5%B1%8F%E5%B9%95%E6%97%8B%E8%BD%AC%E6%94%AF%E6%8C%81) */
	onResize?(options?: any): void;
	/**当前是 tab 页时，点击 tab 时触发 */
	onTabItemTap?(options?: any): void;
	/**到当前页面的路径，类型为String */
	route: string
	/**setData 函数用于将数据从逻辑层发送到视图层（异步），同时改变对应的 this.data 的值（同步） */
	setData?(data: {[prop: string]: any}, callback?: Function): void
	/**selectComponent 方法获取子组件实例对象，这样就可以直接访问组件的任意数据和方法 */
	selectComponent?<T>(selector: string): any
	/**selectComponent 方法获取子组件实例对象，这样就可以直接访问组件的任意数据和方法 */
	selectAllComponents?<T>(selector: string): any
	/**用于获取tabBar数值 */
	getTabBar?(): any

}


export const Page = function (config: tenp.PageConfig): any {
	return (target: Function) => {
		
	}
}

export const App = function(config: tenp.AppConfig): any {
	
}


export const Input = function(defaultValue?: any): any {
	
}

export const Watch = function(option: { type?: 'get'|'set', name: string }): any {

}


export const ImgToBase64 = function(src: string): any {

}

export default tenp;