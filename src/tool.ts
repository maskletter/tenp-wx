import * as fs from 'fs';
import * as path from 'path';
import { spawn, ChildProcess } from 'child_process'

export const cwd: string = process.cwd();
const argv = process.argv.slice(2, process.argv.length);

/** 搜寻目录内的文件 */
export const findFiles = ({ type, value, path: _path, callback }: { type: 'name'|'suffix', value: string[], path: string, callback: Function }, reg?: RegExp) => {
	reg = reg || (type == 'suffix' ? new RegExp('^(\\s|\\S)+('+value.join('|')+')+$'): new RegExp('^'+value.join('|')+'+$'));
	let list =  fs.readdirSync(_path);

	list.forEach(file => {
		const fileName: string = path.join(_path, file);
		var stat = fs.statSync(fileName)
        if (stat && stat.isDirectory()) {
           findFiles({ type, value, path: fileName, callback}, reg)
        }else if(reg.test(file)){
        	callback({fileName})
        	// fileSet.add(fileName)
        }
  		
	})
}

export const mkdirsSync = function(dirname: string) {  
    if (fs.existsSync(dirname)) {  
        return true;  
    } else {  
        if (mkdirsSync(path.dirname(dirname))) {  
            fs.mkdirSync(dirname);  
            return true;  
        }  
    }  
} 

//读取文件夹中的文件
export const getDirectoryContent = (url: string, suffix?: boolean): Set<string> => {
    let data = fs.readdirSync(url);
    data = data.map((v: string) => {
        let stats = fs.statSync(path.join(url,v));
        if(stats.isDirectory()) return v;
        else {
            if(suffix == true) return v;
            const map: string[] = v.split('.');
            map.pop();
            return map.join('.')
        }
    })
    return new Set(data)
}

export function findArgv(name: string): string|boolean{
    if(argv.indexOf(name) == -1){
        return undefined;
    }else{
        return argv[argv.indexOf(name) + 1];
    }
}

export function runSpawn(cwd: string){
    spawn('cli', ['-o'], {
        cwd: cwd,
        stdio: 'inherit',
        shell: true,
    })
}

export function startWxTool(cwd: string,project: string){
    // return;
    spawn('cli', ['-o',project], {
        cwd: cwd,
        // stdio: 'inherit',
        shell: true,
    })
}

export function closeWxTool(cwd: string,project: string, resolve?: Function){
    // return;
    const _spwan: ChildProcess = spawn('cli', ['--close', project], {
        cwd: cwd,
        // stdio: 'inherit',
        shell: true,
    })
    _spwan.on('message', () => {
        resolve()
    })
}