
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
        page{ width:100%;height:100%; }
        .welcome-container{ height:100%;display:flex;align-items:flex-end;justify-content:center;padding-bottom:300rpx;box-sizing:border-box; }
        .title-container{ text-align:center;color:#fff;position:relative; }


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


