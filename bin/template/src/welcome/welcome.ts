
import tenp, { Page, WxPage } from '@tenp/wx';
import { View, Text } from '@tenp/wx/component'


@Page({
    render: [
        View({
            child: [
                Text({text: '{{test}}'})
             ]
        }),
    ],
    template: `
    
    `,
    style: `
        

    `,
    navigationBarBackgroundColor: 'white',
    navigationStyle: 'custom'
})
export default class WelcomePage extends WxPage {

    private test: string = 'Hello,world';


    onLoad(){
        
    }

}


