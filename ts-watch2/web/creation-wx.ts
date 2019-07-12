import * as fs from 'fs';
import * as path from 'path';
import { isDirectory, isFiles } from '../tool'



export default (content: string, data: any[]) => {

    if(!isDirectory(path.join(__dirname,'web-dist'))){
        fs.mkdirSync(path.join(__dirname,'web-dist'));
    }

    const type: string = data[0];

    

    if(type == 'App'){

        createIndexHtml(data)
        // console.log(data)

    }

}

function createIndexHtml(data: any){

    console.log(data)
    const {value: config} = data.find((v: any) => v.type == 'config') || {value:{}};

    let indexTemplate: string = '';
    let htmlsrc = path.join(process.cwd(),'src', 'index.html');
    if(isFiles(htmlsrc)){
        indexTemplate = fs.readFileSync(htmlsrc).toString();
    }
    indexTemplate = indexTemplate.replace('<body>', `<style>${(config.style||'')}</style><body><div id="app"></div>`);
    let functionStr: string = '';
    data.slice(0,data.length).forEach((value: any) => {
        console.log(value)
        if(value.type == 'require'){
            if(value.value != '@tenp/wx'){
                functionStr += value.value;
            }else{
                console.log('准备打包')
            }
        } else if(value.type == 'text'){
            if(value.value.substr(0, 7) != 'require' && value.value.substr(0, 7) != 'exports'){
                functionStr += value.value;
            }else{
                console.log('准备打包')
            }
        } else {
            
        }
        
        
    })
    console.log(functionStr)
    // console.log(indexTemplate)
    // console.log(config)

}