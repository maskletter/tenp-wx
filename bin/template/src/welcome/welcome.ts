
import tenp, { Page, WxPage } from '@tenp/wx';
import { View, Text } from '@tenp/wx/component'


@Page({
    render: [
        View({ class: 'wrapper',
            child: [
                Text({text: '{{test}}'}),
                View({ child: ['这是一个瞎jb写的框架'] })
             ]
        }),
    ],
    style: `
        page{ display: flex;justify-content: center;align-items: center;height: 100vh; }
        .wrapper{ text-align: center; 
            view{ margin-top: 10px;color: scale-color(#666, $alpha: - 20%);font-size: 50rpx; }
        }
    `,
    navigationBarBackgroundColor: 'white',
    navigationStyle: 'custom'
})
export default class WelcomePage extends WxPage {

    private test: string = 'Hello,world';

}


