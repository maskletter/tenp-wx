
import tenp, { Page, ImgToBase64 } from '@tenp/wx';
import { View, Text } from '@tenp/wx/component'
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
    templateStr: `
    
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

    @ImgToBase64('../assets/welcome-bg.jpg') private imgBase64: string;

    onLoad(){
        const clientRect = tenp.getMenuButtonBoundingClientRect();
        this.titleStyle = { height: clientRect.height, top: clientRect.top }
    }

}


