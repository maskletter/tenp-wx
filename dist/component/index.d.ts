export interface CommonParams {
    /**设置元素的id */
    id?: string;
    /**设置元素的class */
    class?: string;
    /**
     * 设置元素的传值
     * data: { name: "testName" }
     *
     *  => <view name='{{testName}}'></view>
     */
    data?: {
        [prop: string]: string | number | boolean;
    };
    /**
     * 设置元素样式
     */
    style?: string;
    /**
     * 设置元素的data-*属性
     * attr: { name: "testName" }
     *
     *  => <view name='testName'></view>
     */
    attr?: {
        [prop: string]: string | number | boolean;
    };
    /**
     * 设置元素的bind事件
     * event: { tap: "testTap" }
     * => <view bindtap='testTap'></view>
     */
    event?: {
        tap?: string;
        [prop: string]: string;
    };
    /**
     * 设置元素的catch事件
     * event: { tap: "testTap" }
     *
     *  => <view catchtap='testTap'></view>
     */
    catch?: {
        [prop: string]: string;
    };
    /**
     * 设置元素的if属性
     */
    if?: string;
    /**
     * 设置元素的for循环
     */
    for?: string;
    /**
     * 设置元素for循环的下标
     */
    forIndex?: string;
    /**
     * 设置元素for循环的值
     */
    forItem?: string;
    /**
     * 设置元素for循环的key
     */
    key?: string;
}
export interface BlockCommonParams extends CommonParams {
    /**设置子元素 */
    child?: any[];
}
export declare namespace MapInterface {
    interface Marker {
        id?: number;
        latitude: number;
        longitude: number;
        title?: string;
        name?: string;
        zIndex?: number;
        iconPath?: string;
        rotate?: number;
        alpha?: number;
        width?: string | number;
        height?: string | number;
        callout?: {
            content?: string;
            color?: string;
            fontSize?: number;
            borderRadius?: number;
            borderWidth?: number;
            borderColor?: number;
            bgColor?: number;
            padding?: number;
            display?: 'BYCLICK' | 'ALWAYS';
            textAlign?: 'left' | 'right' | 'center';
        };
        label?: {
            content?: string;
            color?: string;
            fontSize?: number;
            anchorX?: number;
            anchorY?: number;
            borderWidth?: number;
            borderColor?: string;
            borderRadius?: number;
            bgColor?: string;
            padding?: number;
            textAlign?: 'left' | 'right' | 'center';
        };
        anchor?: any;
        ariaLabel?: any;
    }
    interface Polyline {
        points?: {
            latitude: number;
            longitude: number;
        }[];
        color?: string;
        width?: number;
        dottedLine?: boolean;
        arrowLine?: boolean;
        arrowIconPath?: string;
        borderColor?: string;
        borderWidth?: number;
    }
    interface Polygon {
        points?: {
            latitude: number;
            longitude: number;
        }[];
        strokeWidth?: number;
        strokeColor?: string;
        fillColor?: string;
        zIndex?: number;
    }
    interface Circle {
        latitude?: number;
        longitude?: number;
        color?: string;
        fillColor?: string;
        radius?: number;
        strokeWidth?: number;
    }
    interface Control {
        id?: string;
        position: {
            left?: number;
            top?: number;
            width?: number;
            height?: number;
        };
        iconPath: string;
        clickable?: boolean;
    }
    type Markers = Marker[];
    type Polylines = Polyline[];
    type Polygons = Polygon[];
    type Circles = Circle[];
    type Controls = Control[];
}
export declare namespace params {
    interface ViewParams extends BlockCommonParams {
    }
    interface ScrollViewParams extends BlockCommonParams {
        scrollX?: boolean;
        scrollY?: boolean;
        upperThreshold?: number | string;
        lowerThreshold?: number | string;
        scrollTop?: number | string;
        scrollLeft?: number | string;
        scrollIntoView?: string;
        scrollWithAnimation?: boolean;
        enableBackToTop?: boolean;
        event?: {
            scrolltoupper?: string;
            scrolltolower?: string;
            scroll?: string;
        };
    }
    interface NavigatorParams extends BlockCommonParams {
        target?: 'self' | 'miniProgram';
        url?: string;
        openType?: 'navigate' | 'redirect' | 'switchTab' | 'reLaunch' | 'navigateBack' | 'exit';
        delta?: number;
        appId?: string;
        path?: string;
        extraData?: any;
        version?: 'develop' | 'trial' | 'release';
        hoverClass?: string;
        hoverStopPropagation?: string;
        hoverStartTime?: number;
        hoverStayTime?: number;
        event?: {
            success?: string;
            fail?: string;
            complete?: string;
        };
    }
    interface TextParams extends CommonParams {
        text: string;
    }
    interface WxsParams extends BlockCommonParams {
        module: string;
        src?: string;
    }
    interface ImageParams extends CommonParams {
        src?: string;
        mode?: 'scaleToFill' | 'aspectFit' | 'aspectFill' | 'widthFix' | 'top' | 'bottom' | 'center' | 'left' | 'right' | 'top left' | 'top right' | 'bottom left' | 'bottom right';
        lazyLoad?: boolean;
        showMenuByLongpress?: boolean;
    }
    interface SwiperParams extends BlockCommonParams {
        indicatorDots?: boolean;
        indicatorColor?: string;
        indicatorActiveColor?: string;
        autoplay?: boolean;
        current?: number;
        interval?: number;
        duration?: number;
        circular?: boolean;
        vertical?: boolean;
        previousMargin?: string;
        nextMargin?: string;
        displayMultipleItems?: number;
        skipHiddenItemLayout?: boolean;
        easingFunction?: 'default' | 'linear' | 'easeInCubic' | 'easeOutCubic' | 'easeInOutCubic';
        event?: {
            change?: string;
            transition?: string;
            animationfinish?: string;
        };
    }
    interface SwiperItemParams extends BlockCommonParams {
        itemId?: string;
    }
    interface MovableView extends BlockCommonParams {
        direction?: 'all' | 'vertical' | 'horizontal' | 'none';
        inertia?: boolean;
        outOfBounds?: boolean;
        x?: number;
        y?: number;
        damping?: number;
        friction?: number;
        disabled?: boolean;
        scale?: boolean;
        scaleMin?: number;
        scaleMax?: number;
        scaleValue?: number;
        animation?: boolean;
        event?: {
            change?: string;
            scale?: string;
        };
        htouchmove?: string;
        vtouchmove?: string;
    }
    interface CoverImage extends CommonParams {
        src: string;
        event?: {
            load?: string;
            error?: string;
        };
    }
    interface CoverView extends BlockCommonParams {
        scrollTop?: number | string;
    }
    interface MovableArea extends BlockCommonParams {
        movableArea?: boolean;
    }
    interface Icon extends CommonParams {
        type?: string;
        size?: string | number;
        color?: string;
    }
    interface Progress extends CommonParams {
        percent?: number;
        showInfo?: boolean;
        borderRadius?: number | string;
        fontSize?: number | string;
        strokeWidth?: number | string;
        color?: string;
        activeColor?: string;
        backgroundColor?: string;
        active?: boolean;
        activeMode?: string;
        event?: {
            activeend?: string;
        };
    }
    interface RichText extends CommonParams {
        nodes?: any[] | string;
        space?: string;
    }
    interface Button extends BlockCommonParams {
        size?: 'default' | 'mini';
        type?: 'primary' | 'default' | 'warn';
        plain?: boolean;
        disabled?: boolean;
        loading?: boolean;
        formType?: 'submit' | 'reset';
        openType?: 'contact' | 'share' | 'getPhoneNumber' | 'getUserInfo' | 'launchApp' | 'openSetting' | 'feedback';
        hoverClass?: string;
        hoverStopPropagation?: boolean;
        hoverStartTime?: number;
        hoverStayTime?: number;
        lang?: 'en' | 'zh_CN' | 'zh_TW';
        sessionFrom?: string;
        sendMessageTitle?: string;
        sendMessagePath?: string;
        sendMessageImg?: string;
        appParameter?: string;
        showMessageCard?: boolean;
        event?: {
            getuserinfo?: string;
            contact?: string;
            getphonenumber?: string;
            error?: string;
            opensetting?: string;
            launchapp?: string;
            [key: string]: string;
        };
    }
    interface Checkbox extends CommonParams {
        value?: string;
        disabled?: boolean;
        checked?: boolean;
        color?: string;
    }
    interface CheckboxGroup extends BlockCommonParams {
        event?: {
            change?: string;
        };
    }
    interface Editor extends CommonParams {
        readOnly?: boolean;
        placeholder?: string;
        showImgSize?: boolean;
        showImgToolbar?: boolean;
        showImgResize?: boolean;
        event?: {
            ready?: string;
            focus?: string;
            blur?: string;
            input?: string;
            statuschange?: string;
        };
    }
    interface Form extends BlockCommonParams {
        reportSubmit?: boolean;
        reportSubmitTimeout?: number;
        event?: {
            submit?: string;
            reset?: string;
        };
    }
    interface Input extends CommonParams {
        value?: string;
        type?: 'text' | 'number' | 'idcard' | 'digit';
        password?: boolean;
        placeholder?: string;
        placeholderStyle?: string;
        placeholderClass?: string;
        disabled?: boolean;
        maxlength?: number;
        cursorSpacing?: number;
        autoFocus?: boolean;
        focus?: boolean;
        confirmType?: 'send' | 'search' | 'next' | 'go' | 'done';
        confirmHold?: boolean;
        cursor?: number;
        selectionStart?: number;
        selectionEnd?: number;
        adjustPosition?: boolean;
        event?: {
            input?: string;
            focus?: string;
            blur?: string;
            confirm?: string;
            keyboardheightchange?: string;
        };
    }
    interface Label extends BlockCommonParams {
        for?: string;
    }
    interface Picker extends BlockCommonParams {
        mode?: 'selector' | 'multiSelector' | 'time' | 'date' | 'region';
        disabled?: boolean;
        range?: any[];
        rangeKey?: string;
        value?: string;
        start?: string;
        end?: string;
        fields?: 'year' | 'month' | 'day';
        customItem?: string;
        event?: {
            change?: string;
            columnchange?: string;
            cancel?: string;
        };
    }
    interface PickerView extends BlockCommonParams {
        value?: number[];
        indicatorStyle?: string;
        indicatorClass?: string;
        maskStyle?: string;
        maskClass?: string;
        event?: {
            change?: string;
            pickstart?: string;
            pickend?: string;
        };
    }
    interface PickerViewColumn extends BlockCommonParams {
    }
    interface Radio extends CommonParams {
        value?: string;
        checked?: boolean;
        disabled?: boolean;
        color?: string;
    }
    interface RadioGroup extends BlockCommonParams {
        event?: {
            change?: string;
        };
    }
    interface Slider extends CommonParams {
        min?: number;
        max?: number;
        step?: number;
        disabled?: boolean;
        value?: number;
        color?: string;
        selectedColor?: string;
        activeColor?: string;
        backgroundColor?: string;
        blockSize?: number;
        blockColor?: string;
        showValue?: string;
        event?: {
            change?: string;
            changing?: string;
        };
    }
    interface Switch extends CommonParams {
        checked?: boolean;
        disabled?: boolean;
        type?: 'switch' | 'checkbox';
        color?: string;
        event?: {
            change?: string;
        };
    }
    interface Textarea extends CommonParams {
        value?: string;
        placeholder?: string;
        placeholderStyle?: string;
        placeholderClass?: string;
        disabled?: boolean;
        maxlength?: number;
        autoFocus?: boolean;
        focus?: boolean;
        autoHeight?: boolean;
        fixed?: boolean;
        cursorSpacing?: number;
        cursor?: number;
        showConfirmBar?: boolean;
        selectionStart?: number;
        selectionEnd?: number;
        adjustPosition?: boolean;
        event?: {
            focus?: string;
            blur?: string;
            linechange?: string;
            input?: string;
            confirm?: string;
            keyboardheightchange?: string;
        };
    }
    interface FunctionalPageNavigator extends BlockCommonParams {
        version?: 'develop' | 'trial' | 'release';
        name?: 'loginAndGetUserInfo' | 'requestPayment';
        args?: any;
        event?: {
            success?: string;
            fail?: string;
        };
    }
    interface Audio extends CommonParams {
        src?: string;
        loop?: boolean;
        controls?: boolean;
        poster?: string;
        name?: string;
        author?: string;
        event?: {
            error?: string;
            play?: string;
            pause?: string;
            timeupdate?: string;
            ended?: string;
        };
    }
    interface Camera extends CommonParams {
        mode?: 'normal' | 'scanCode';
        devicePosition?: 'back' | 'front';
        flash?: 'auto' | 'on' | 'off';
        frameSize?: 'small' | 'medium' | 'large';
        event?: {
            stop?: string;
            error?: string;
            initdone?: string;
            scancode?: string;
        };
    }
    interface LivePlayer extends BlockCommonParams {
        src?: string;
        mode?: 'live' | 'RTC';
        autoplay?: boolean;
        muted?: boolean;
        orientation?: 'vertical' | 'horizontal';
        objectFit?: 'contain' | 'fillCrop';
        backgroundMute?: boolean;
        minCache?: number;
        maxCache?: number;
        soundMode?: 'speaker' | 'ear';
        autoPauseIfNavigate?: boolean;
        autoPauseIfOpenNative?: boolean;
        event?: {
            statechange?: string;
            fullscreenchange?: string;
            netstatus?: string;
        };
    }
    interface LivePusher extends BlockCommonParams {
        url?: string;
        mode?: 'SD' | 'HD' | 'FHD' | 'RTC';
        autopush?: boolean;
        muted?: boolean;
        enableCamera?: boolean;
        autoFocus?: boolean;
        orientation?: 'vertical' | 'horizontal';
        beauty?: number;
        whiteness?: number;
        aspect?: string;
        minBitrate?: number;
        maxBitrate?: number;
        waitingImage?: string;
        waitingImageHash?: string;
        zoom?: boolean;
        devicePosition?: string;
        backgroundMute?: boolean;
        mirror?: boolean;
        event?: {
            statechange?: string;
            netstatus?: string;
            error?: string;
            bgmstart?: string;
            bgmprogress?: string;
            bgmcomplete?: string;
        };
    }
    interface Video extends CommonParams {
        src: string;
        duration?: 0 | 90 | -90;
        controls?: boolean;
        danmuList?: any[];
        danmuBtn?: boolean;
        enableDanmu?: boolean;
        autoplay?: boolean;
        loop?: boolean;
        muted?: boolean;
        initialTime?: number;
        pageGesture?: boolean;
        direction?: number;
        showProgress?: boolean;
        showFullscreenBtn?: boolean;
        showPlayBtn?: boolean;
        showCenterPlayBtn?: boolean;
        enableProgressGesture?: boolean;
        objectFit?: 'contain' | 'fill' | 'cover';
        poster?: string;
        showMuteBtn?: boolean;
        title?: string;
        playBtnPosition?: 'bottom' | 'center';
        enablePlayGesture?: boolean;
        autoPauseIfNavigate?: boolean;
        autoPauseIfOpenNative?: boolean;
        vslideGesture?: boolean;
        vslideGestureInFullscreen?: boolean;
        event?: {
            play?: string;
            pause?: string;
            ended?: string;
            timeupdate?: string;
            fullscreenchange?: string;
            waiting?: string;
            error?: string;
            progress?: string;
        };
    }
    interface Map extends CommonParams {
        longitude: number;
        latitude: number;
        scale?: number;
        markers?: MapInterface.Markers;
        covers?: any[];
        polyline?: MapInterface.Polylines;
        circles?: MapInterface.Circles;
        controls?: MapInterface.Controls;
        includePoints?: any[];
        showLocation?: boolean;
        polygons?: MapInterface.Polygons[];
        subkey?: string;
        layerStyle?: number;
        rotate?: number;
        skew?: number;
        'enable-3D'?: boolean;
        showCompass?: boolean;
        enableOverlooking?: boolean;
        enableZoom?: boolean;
        enableScroll?: boolean;
        enableRotate?: boolean;
        enableSatellite?: boolean;
        enableTraffic?: boolean;
        event?: {
            markertap?: string;
            controltap?: string;
            callouttap?: string;
            updated?: string;
            regionchange?: string;
            poitap?: string;
        };
    }
    interface Canvas extends CommonParams {
        type?: string;
        canvasId?: string;
        disableScroll?: boolean;
        event?: {
            touchstart?: string;
            touchmove?: string;
            touchend?: string;
            touchcancel?: string;
            longtap?: string;
            error?: string;
        };
    }
    interface Ad extends CommonParams {
        unitId?: string;
        event?: {
            load?: string;
            error?: string;
            close?: string;
        };
    }
    interface OfficialAccount extends CommonParams {
        event?: {
            load?: string;
            error?: string;
            close?: string;
        };
    }
    interface OpenData extends CommonParams {
        type?: 'groupName' | 'userNickName' | 'userAvatarUrl' | 'userGender' | 'userCity' | 'userProvince' | 'userCountry' | 'userLanguage';
        lang?: 'en' | 'zh_CN' | 'zh_TW';
        openGid?: string;
    }
    interface WebView extends CommonParams {
        src?: string;
        event?: {
            load?: string;
            error?: string;
            message?: string;
        };
    }
}
export declare function Template(params: {
    name: string;
    child?: any[];
} | {
    is: string;
    data?: any;
}): void;
export declare function Include(params: {
    src: string;
}): void;
export declare function Import(params: {
    src: string;
}): void;
export declare function View(params: params.ViewParams): void;
export declare function ScrollView(params: params.ScrollViewParams): void;
export declare function Text(params: params.TextParams): void;
export declare function Image(params: params.ImageParams): void;
export declare function Wxs(params: params.WxsParams): void;
export declare function Swiper(params: params.SwiperParams): void;
export declare function SwiperItem(params: params.SwiperItemParams): void;
export declare function Navigator(params: params.NavigatorParams): void;
export declare function MovableView(params: params.MovableView): void;
export declare function CoverImage(params: params.CoverImage): void;
export declare function CoverView(params: params.CoverView): void;
export declare function MovableArea(params: params.MovableArea): void;
export declare function Icon(params: params.Icon): void;
export declare function Progress(params: params.Progress): void;
export declare function RichText(params: params.RichText): void;
export declare function Button(params: params.Button): void;
export declare function Checkbox(params: params.Checkbox): void;
export declare function CheckboxGroup(params: params.CheckboxGroup): void;
export declare function Editor(params: params.Editor): void;
export declare function Form(params: params.Form): void;
export declare function Input(params: params.Input): void;
export declare function Label(params: params.Label): void;
export declare function Picker(params: params.Picker): void;
export declare function PickerView(params: params.Button): void;
export declare function PickerViewColumn(params: params.PickerViewColumn): void;
export declare function Radio(params: params.Radio): void;
export declare function RadioGroup(params: params.RadioGroup): void;
export declare function Slider(params: params.Slider): void;
export declare function Switch(params: params.Switch): void;
export declare function Textarea(params: params.Textarea): void;
export declare function FunctionalPageNavigator(params: params.FunctionalPageNavigator): void;
export declare function Audio(params: params.Audio): void;
export declare function Camera(params: params.Camera): void;
export declare function LivePlayer(params: params.LivePlayer): void;
export declare function LivePusher(params: params.LivePusher): void;
export declare function Video(params: params.Video): void;
export declare function Map(params: params.Map): void;
export declare function Canvas(params: params.Canvas): void;
export declare function Ad(params: params.Ad): void;
export declare function OfficialAccount(params: params.OfficialAccount): void;
export declare function OpenData(params: params.OpenData): void;
export declare function WebView(params: params.WebView): void;
