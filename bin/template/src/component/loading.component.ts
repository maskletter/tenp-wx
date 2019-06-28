import { Component, Input } from '@tenp/wx';
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
export default class LoadingComponent {

    @Input('lightgreen') private color: string;
    

  
}


interface LoadingParams extends CommonParams{
    color?: string
}

export function Loading(params: LoadingParams){}