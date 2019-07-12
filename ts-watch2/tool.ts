
import * as fs from 'fs';


/**
 * 一些工具
 * @param str_path 
 */

export function writeFile(fileName: string, fd: any, data: string) {
	fd = fs.openSync(fileName, "w");

	fs.writeSync(fd, data||'', /*position*/ undefined, "utf8");
	return fd;
}

export function isPresence(str_path: string){
	return fs.existsSync(str_path);
}

export function isDirectory(str_path: string){
	if(!isPresence(str_path)){
		return false;
	}else{
		const stat = fs.statSync(str_path);
		return stat.isDirectory();
	}
}
export function isFiles(str_path: string){
	if(!isPresence(str_path)){
		return false;
	}else{
		const stat = fs.statSync(str_path);
		return !stat.isDirectory();
	}
}
export function copyFile(str1: string, str2: string){
	let fd;
      fd = writeFile(str1, fd, str2);
      fs.closeSync(fd);
}
// export const copyFile: (str1: string, str2: string) => void = (str1: string, str2: string) => {
// 	let fd;
//       fd = writeFile(str1, fd, str2);
//       fs.closeSync(fd);
// }