import * as fs from 'fs';
import * as path from 'path';
import parse from '../parse'
import creationWx from './creation-wx';
import { getFinalResults } from '../modify-ts-method'
export function writeFile(fileName: string, fd: any, data: string) {
    fd = fs.openSync(fileName, "w");

    fs.writeSync(fd, data||'', /*position*/ undefined, "utf8");
    return fd;
}

export default (fileName: string, data: string) => {

    var fd,fd_wxml, fd_wxss, fd_json;
    const url = path.dirname(fileName);
    let filePath: string[] = path.normalize(url).replace(process.cwd(),'').split(path.sep);
    filePath.splice(0,2)
    const _Name = path.basename(fileName,'.js');
    const wxData: any = creationWx(data, parse(data));
    const fileOrigin: string = path.join(process.cwd(),'src',filePath.join(path.sep))
    try {
        fd = writeFile(fileName, fd, wxData.js);
        if(wxData.wxml) {
            fd_wxml = writeFile(path.join(url,_Name+'.wxml'),fd_wxml,getFinalResults('template',wxData.wxml.replace(/{{(.+?)\|(.+?)}}/g, function(a:string,b:string,c:string){
                const fun = c.split(':');
                return `{{${fun.shift()}(${b}${fun.length?',':''}${fun.join(',')})}}`
              }),fileOrigin))
        }
        if(wxData.wxss) fd_wxss = writeFile(path.join(url,_Name+'.wxss'),fd_wxss,getFinalResults('style',wxData.wxss,fileOrigin))
        if(wxData.json) fd_json = writeFile(path.join(url,_Name+'.json'),fd_json,wxData.json)  
      }
      catch(e){
        console.log(e)
      }
      finally {
          if (fd !== undefined) {
              fs.closeSync(fd);
          }
          if (fd_wxml !== undefined) {
              fs.closeSync(fd_wxml);
          }
          if (fd_wxss !== undefined) {
              fs.closeSync(fd_wxss);
          }
          if (fd_json !== undefined) {
              fs.closeSync(fd_json);
          }
      }
}