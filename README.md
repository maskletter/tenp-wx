# tenp-wx
为了浪而浪



<p align="center">
   <img src='https://github.com/maskletter/assets/blob/master/u=1469907756,2885285955&fm=26&gp=0.jpg' width='400' />
</p>

```ts

import tenp, { Page, ImgToBase64 } from '@tenp/wx';
import { View, Text, Button } from '@tenp/wx/component'
import { Loading } from '../component/loading.component'


@Page({
    template: [
        View({
            child: [
                View({
                    child: [
                        Loading({
                            class: 'xxxx',
                            attr: {
                                
                            },
                            color: '#fff',
                        }),
                        View({ child: [ Text({ text: '资源加载中' }) ], style: 'text-align:center;color:#fff;' })
                    ]
                })
            ],
            class: 'welcome-container',
            style: 'background:url({{imgBase64}}) center / cover'
        }),
    ],
    style: `
        $full: null;
        $full: 100% !default;

        @mixin boxFill($selector: null){

            @if $selector {
                #{$selector}{ width:$full;height:$full; }   
            } @else {
                width:$full;height:$full;
            }
        }

        @mixin flexCenter{
            display:flex;align-items:flex-end;justify-content:center;
        }

        page{ @include boxFill;
            .welcome-container{ height:$full;@include flexCenter;padding-bottom:300rpx;box-sizing:border-box; }
            .title-container{ color:#fff;position:relative; 
                text:{ align:center; }
            }
        }

    `,
    navigationBarBackgroundColor: 'white',
    navigationStyle: 'custom',
    components: {
        loading: '../component/loading.component'
    },
})
export default class WelcomePage {

    private testData: string = 'a';
    private titleStyle = { height: 0,top: 0 }
    
    //将图片转为base64
    @ImgToBase64('../assets/welcome-bg.jpg') private imgBase64: string;

   async onLoad(){
        const clientRect = tenp.getMenuButtonBoundingClientRect();
        this.titleStyle = { height: clientRect.height, top: clientRect.top }
        const setttings = await tenp.getSetting();
        if(!setttings.authSetting['scope.userInfo']){
            
        }
        tenp.login().then(res => {
            console.log(res)
        })
    }

    getUserInfo(res: wx.UserInfoResponse){
        console.log(res)
        tenp.authorize({scope:'scope.record'})
    }

}

```
### 监听路由变化
```ts
import tenp from '@tenp/wx';

tenp.routerBefore(async function(res){
    console.log('路由发生了变化',res)
    // return new Promise((resolve, reject) => {
    //     reject('error')
    // })
})
```
### 其他
```ts
@Input('lightgreen') private color: string;
@Watch({name:'name'})
onNameChange(){

}
```
