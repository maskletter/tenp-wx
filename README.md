# tenp-wx
<ul>
   <li>typescript支持</li>
   <li>sass支持(可自行配置less支持)</li>
   <li>支持读取本地图片并转为base64格式</li>
   <li>重写了部分微信方法，采用Promise方式</li>
   <li>完美支持async/await</li>
   <li>写着玩的</li>
</ul>

<p align="center">
   <img src='https://github.com/maskletter/assets/blob/master/u=1469907756,2885285955&fm=26&gp=0.jpg' width='400' />
</p>

```ts

import tenp, { Page, ImgToBase64 } from '@tenp/wx';
import { View, Text, Button } from '@tenp/wx/component'
import { Loading } from '../component/loading.component'


@Page({
    render: [
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
    //这样等与render等同，但是如果存在render，就不会调用template
    template: `
      <view style='background:url({{imgBase64}}) center / cover' class='welcome-container'>
         <view>
            <loading class='xxxx'></loading>
            <view style="text-align:center;color:#fff;"><text>资源加载中</text></view>
         </view>
      </view> 
    `,
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
    // 抛出错误阻止路由跳转
    // return new Promise((resolve, reject) => {
    //     reject('error')
    // })
})
```
### 监听数据变化
```ts
import { Page, Input, Watch, WxPage } from '@tenp/wx';
@Page({
   template: '<view>Hello, world</view>'
})
export default class TestPage extends WxPage{
   private name: string = '张三';
   @Watch({name:'name'})
   onNameChange(type: string, value?: string){
      //type: 'get'|'set'
      console.log(value)
   }
}
```
### 创建一个组件demo
```ts
import { Component, Input, WxComponent } from '@tenp/wx';
import { View, Text, CommonParams } from '@tenp/wx/component'
import tenp from '@tenp/wx'

@Component({
    render: [
        View({
            class: 'loadEffect',
            child: [
                Text({text:'', style: 'background:{{color}}'}),
                Text({text:'', style: 'background:{{color}}'}),
                Text({text:'', style: 'background:{{color}}'}),
                Text({text:'', style: 'background:{{color}}'}),
                Text({text:'', style: 'background:{{color}}'}),
                Text({text:'', style: 'background:{{color}}'}),
                Text({text:'', style: 'background:{{color}}'}),
                Text({text:'', style: 'background:{{color}}'})
            ]
        })
    ],
    style: `
        .loadEffect{
            width: 100px;
            height: 100px;
            position: relative;
            transform:scale(0.4);
            margin: 0 auto;
        }
        .loadEffect text{
            display: inline-block;
            width: 16px;
            height: 16px;
            border-radius: 50%;
            background: lightgreen;
            position: absolute;
            -webkit-animation: load 1.04s ease infinite;
        }
        @-webkit-keyframes load{
            0%{
                opacity: 1;
            }
            100%{
                opacity: 0.2;
            }
        }
        .loadEffect text:nth-child(1){
            left: 0;
            top: 50%;
            margin-top:-8px;
            -webkit-animation-delay:0.13s;
        }
        .loadEffect text:nth-child(2){
            left: 14px;
            top: 14px;
            -webkit-animation-delay:0.26s;
        }
        .loadEffect text:nth-child(3){
            left: 50%;
            top: 0;
            margin-left: -8px;
            -webkit-animation-delay:0.39s;
        }
        .loadEffect text:nth-child(4){
            top: 14px;
            right:14px;
            -webkit-animation-delay:0.52s;
        }
        .loadEffect text:nth-child(5){
            right: 0;
            top: 50%;
            margin-top:-8px;
            -webkit-animation-delay:0.65s;
        }
        .loadEffect text:nth-child(6){
            right: 14px;
            bottom:14px;
            -webkit-animation-delay:0.78s;
        }
        .loadEffect text:nth-child(7){
            bottom: 0;
            left: 50%;
            margin-left: -8px;
            -webkit-animation-delay:0.91s;
        }
        .loadEffect text:nth-child(8){
            bottom: 14px;
            left: 14px;
            -webkit-animation-delay:1.04s;
        }
    `
})
export default class LoadingComponent extends WxComponent {
   
    /**
     * @Input等同于properties，第一个参数为默认值
     * color: {value:'lightgreen',type:String }
    */
    @Input('lightgreen') private color: string;

    options: tenp.ComponentOptions = {
        
    }
    

    relations: tenp.ComponentRelations = {
        
    }
   

}

//创建组件的参数
interface LoadingParams extends CommonParams{
    color?: string
}
//对外抛出组件定义
export function Loading(params: LoadingParams){}
```
### 其他
```html
<wxs module='it'>
   module.exports = {
        test1: function(value,v2){
            return value+'xxx'+v2;
        }
   }
</wxs>

<view>{{data|it.test1:2}}</view>
<!-- 上面的代码会被转为下面的代码 -->
<view>{{it.test(data, 2)</view>
```
