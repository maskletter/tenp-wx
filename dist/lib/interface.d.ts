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
        template?: any[];
        templateStr?: string;
        style?: string[] | string;
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
        template?: any[];
        templateStr?: string;
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
}
export default tenp;
