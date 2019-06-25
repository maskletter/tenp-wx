
import * as fs from 'fs';

/**
 * 一些工具
 * @param str_path 
 */

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