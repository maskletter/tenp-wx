import { Duplex } from 'stream';
const browserify = require('browserify');
import * as fs from 'fs';
import * as path from 'path';

/**打包npm中的 模块 */

let directoryMaps: Set<string> = new Set();
let modulesMap: Map<string, string> = new Map();
const cwd: string = process.cwd();

function resolve (url: string, dir: string, dir2?: string) {
	if(dir2) return path.join(url, dir, dir2)
	else return path.join(url, dir)
}

//读取文件夹中的文件
export const getDirectoryContent = (url: string, rootDir: string): Set<string> => {
	let data = fs.readdirSync(url);
	data = data.map((v: string) => {
		
		let stats = fs.statSync(resolve(url, rootDir, v));
		if(stats.isDirectory()) return v;
		else {
			/**
			 * 如果文件名为xx.xx.ts，删除最后一个文件拓展名
			 */
			const map: string[] = v.split('.');
			map.pop();
			return map.join('.')
		}
	})
	return new Set(data)
}

export const setDirectory = (directory?: string[]) => {
	
	directoryMaps = getDirectoryContent(resolve(cwd,'src',''),'')
	
}

function createStream(): Duplex{
	var buf: any[] = [];
	class TenpDuplex extends Duplex {
		constructor(options: any){
			super(options);
		}
		_write(chunk: Buffer, encoding: string, callback: Function){
			buf.push(chunk);
			callback();
		}
		_read(size: any){
			this.push(buf);
			this.push(null);
		}
		clear(){
			buf = [];
		}
	}
	const dp = new TenpDuplex({
		readableObjectMode: true
	})
	return dp;
}

function buildModules(str: string, modulesLibName: string, libName: string){
	var b = browserify();
	tenpStream.write(`${str}TenpModule.exports = ${libName};`)
	b.add(tenpStream);
	let buff: string = '';
	const tt = b.bundle();
	tt.on('data', (data: Buffer,v: any) => {
		buff += data
	})
	tt.on('end', () => {
		fs.writeFileSync(path.join(cwd,'./dist/tenp_modules/'+modulesLibName), 'const TenpModule = module;'+buff)
		tenpStream.clear();
	})
	
	modulesMap.set(libName, modulesLibName);

}

const tenpStream: any = createStream();
const rootl: string = path.join(cwd,'src');
export default (str: string,rootDir: string) => {
	const requireLib: string[] = str.match(/require\('(.+?)'\)/);
	
	if(requireLib){
		const requireNameMaps: string[] = str.match(/var (.+?) /);
		const libName: any = requireNameMaps?requireNameMaps[1]: parseInt((Math.random()*600 as any))+new Date().getTime() ;
		const lib: string = requireLib[1];
		let libMap: string[] = [];
		if(lib[0] == '.' || lib[1] == '/') return str;
		libMap = lib.split('/');
		if(directoryMaps.has(libMap[0])){
			let l: string[] = rootDir.replace(rootl,'').split('\\');
			l.shift();
			let moduleStr: string = l.map(v => '../').join('');
			if(moduleStr){
				return `var ${libName} = require('${moduleStr+lib}')`
			}else
				return `var ${libName} = require('./${lib}')`
		}else{
			let l: string[] = rootDir.replace(rootl,'').split('\\');
			// l.shift();
			let moduleStr: string = l.map(v => '../').join('');
			let modulesLibName: string = `${lib.replace(/\//g,'_')}_tenp_modules.js`;
			if(!modulesMap.get(libName)){
				console.log(str, modulesLibName, libName)
				// buildModules(str, modulesLibName, libName);
			}
			if(moduleStr)
				return `var ${libName} = require('${moduleStr+'tenp_modules/'+modulesLibName}')`
			else
				return `var ${libName} = require('./tenp_modules/${modulesLibName}')`
		}
	}else{
		return str;
	}
}

