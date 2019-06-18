
import { App } from '@tenp/wx';

@App({
    pages: ["welcome/welcome"],
    style: `
        .navigation-box{ position:fixed;top:-10rpx;width:100%;height:10rpx;z-index:99;box-shadow:0px 0px 30rpx rgba(0,0,0,1) }
        .ellipsis-2{ text-overflow: ellipsis;display: -webkit-box;-webkit-line-clamp: 2;-webkit-box-orient: vertical;overflow: hidden; }
    `,
    debug: false,
    subpackages: [
        {
            root: '',
            pages: []
        }
    ]
})
export default class WxApp{

    onShow(){
        
    }

}

