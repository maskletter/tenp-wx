import tenp from '../lib/wx-method';
export declare const Component: (config: tenp.ComponentConfig) => any;
export declare class WxComponent {
    created?(...argv: any): void;
    attached?(...argv: any): void;
    ready?(...argv: any): void;
    moved?(...argv: any): void;
    detached?(...argv: any): void;
    setData?(data: {
        [prop: string]: any;
    }, callback?: Function): void;
    hasBehavior?(behavior: any): void;
    triggerEvent?(name?: string, detail?: any, options?: any): void;
    createSelectorQuery?(): void;
    createIntersectionObserver?(): void;
    selectComponent?<T>(selector: string): any;
    selectAllComponents?<T>(selector: string): any;
    getRelationNodes?(relationKey: string): any;
    groupSetData?(callback: Function): void;
    getTabBar?(): any;
    getPageId?(): any;
    externalClasses?: string[];
    options?: tenp.ComponentOptions;
    relations?: {
        [prop: string]: {
            type: 'child' | 'parent' | 'ancestor' | 'descendant';
            linked?(): void;
            linkChanged?(): void;
            unlinked?(): void;
            target?: string;
        };
    };
    behaviors?: any[];
}
export declare class WxPage {
    onLoad?(options?: any): void;
    onReady?(options?: any): void;
    onShow?(options?: any): void;
    onHide?(options?: any): void;
    onUnload?(options?: any): void;
    onPullDownRefresh?(options?: any): void;
    onReachBottom?(options?: any): void;
    onShareAppMessage?(from?: 'button' | 'menu', target?: any, webViewUrl?: string): {
        title?: string;
        path?: string;
        imageUrl?: string;
    };
    onPageScroll?(options?: any): void;
    onResize?(options?: any): void;
    onTabItemTap?(options?: any): void;
    route: string;
    setData?(data: {
        [prop: string]: any;
    }, callback?: Function): void;
    selectComponent?<T>(selector: string): any;
    selectAllComponents?<T>(selector: string): any;
    getTabBar?(): any;
}
export declare const Page: (config: tenp.PageConfig) => any;
export declare const App: (config: tenp.AppConfig) => any;
export declare const Prop: (defaultValue?: any) => any;
export declare const Wxml: (defaultValue?: any) => any;
export declare const Watch: (option: {
    type?: "get" | "set";
    name: string;
}) => any;
export declare const Filter: (name: string) => any;
export declare const ImgToBase64: (src: string) => any;
export default tenp;
