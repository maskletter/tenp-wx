
import * as ts from 'typescript';
import * as fs from 'fs';
import * as path from 'path';
import { isFiles } from './tool'
import creationWx from './wx/white';
import creationWeb from './web/white'
import { setSystemDataAttr } from '../global.config'
let Style_Plugin: Function[] = [];
let Template_Plugin: Function[] = [];
let Render_Plugin: Function;

/**
 * 将转换之后的代码写入磁盘中
 */

if(isFiles(path.join(process.cwd(),'wts.config.js'))){
    const module = require(path.join(process.cwd(),'wts.config.js'))||{};
    if(module.style){
        Style_Plugin = (module.style instanceof Array)?Style_Plugin.concat(module.style):Style_Plugin.concat([module.style])
    }
    if(module.template){
        Template_Plugin = (module.template instanceof Array)?Template_Plugin.concat(module.template):Template_Plugin.concat([module.template])
    }
    if(module.parse){
        Render_Plugin = module.parse;
    }
    if(module.SystemDataAttr){
        for(let key in module.SystemDataAttr){
            setSystemDataAttr(key, module.SystemDataAttr[key]);
        }
    }
}


function splitFile(fileName: string, content: string) {


  return content;
}

export function getFinalResults(type: string, value: string,fileName?:string){

    const plugin: Function[] = type == 'template'? Template_Plugin : Style_Plugin;

    let __value: string = value;

    plugin.forEach(data => {
        __value = data(__value,fileName)
    })

    return __value;

}


ts.sys.writeFile = function(fileName: string, data: any, writeByteOrderMark: any) {
      // If a BOM is required, emit one
      if (writeByteOrderMark) {
          // data = byteOrderMarkIndicator + data;
      }

 
    //   const wxData: any = Render_Plugin ? Render_Plugin(data, parse(data)): creationWx(data, parse(data));
      if(process.argv.indexOf('--wx') != -1){
        creationWx(fileName, data);
 
      }else if(process.argv.indexOf('--web') != -1){
        creationWeb(fileName, data);
      }

}

ts.sys.readFile = function(fileName: any, _encoding: any) {
    if (!ts.sys.fileExists(fileName)) {
        return undefined;
    }
    var buffer = fs.readFileSync(fileName);
    var len = buffer.length;
    if (len >= 2 && buffer[0] === 0xFE && buffer[1] === 0xFF) {
        // Big endian UTF-16 byte order mark detected. Since big endian is not supported by node.js,
        // flip all byte pairs and treat as little endian.
        len &= ~1; // Round down to a multiple of 2
        for (var i = 0; i < len; i += 2) {
            var temp = buffer[i];
            buffer[i] = buffer[i + 1];
            buffer[i + 1] = temp;
        }
        return splitFile(fileName,buffer.toString("utf16le", 2));
    }
    if (len >= 2 && buffer[0] === 0xFF && buffer[1] === 0xFE) {
        // Little endian UTF-16 byte order mark detected
        return splitFile(fileName,buffer.toString("utf16le", 2));
    }
    if (len >= 3 && buffer[0] === 0xEF && buffer[1] === 0xBB && buffer[2] === 0xBF) {
        // UTF-8 byte order mark detected
        return splitFile(fileName,buffer.toString("utf8", 3));
    }
    // Default is UTF-8 with no byte order mark 
    return splitFile(fileName, buffer.toString("utf8"));
}