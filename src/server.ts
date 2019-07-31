
import * as chokidar from 'chokidar';
import * as fs from 'fs';
import * as path from 'path';
import tsLoader from './loader/typescript.loader'
import { cwd } from './tool'

const StatusPath = path.join(cwd, 'src');
const ConversionPath  = path.join(cwd, 'dist');

export interface WatchOptions{
	logErrors(content: string|object|string[]): void
	directoryUrl: string
	fileName: string
}

const Formatter: any = {
	".ts": [tsLoader]
};

const logErrors = (content: string|object|string[]): void => {
	if(content instanceof Array){
		content.forEach((msg: string) => {
			console.log('\x1B[31m'+msg+'\x1B[39m')		
		})
	}else if(typeof(content) == 'string'){
		console.log(`\x1B[31m+${content}+\x1B[39m`)		
	}else if(typeof(content) == 'object'){	
		console.log('\x1B[31m'+JSON.stringify(content, null, 2)+'\x1B[39m')	
	}
}
const logMessage = (message: string): void => {
	console.log('$message  '+message)
}

const watcher: chokidar.FSWatcher = chokidar.watch(path.join(process.cwd(),'src'), {
  // ignored: /^(\s|\S)+(ts|js|tsx|jsx|scss)+$/,
  // ignored: /^(\s|\S)+(tsx|jsx|scss)+$/,
  persistent: true
});
let isInitSuccess: boolean = false;


logMessage('服务启动中....')
watcher.on('ready', (e: any) => {
	logMessage('服务完成....\r\n');
	isInitSuccess = true;
})
watcher.on('all', async (event, _path: string) => {
	// if(_path.substr(_path.lastIndexOf('.'),2))
	if(event == 'add' || event == 'change'){
		if(isInitSuccess){
			logMessage(`文件编译中...`)
		}
		const extname: string = path.extname(_path);

		let file: Buffer = fs.readFileSync(_path);
		let fileMap: any = [];
		if(Formatter[extname]){
			try{
				const statusPath: string = path.join(ConversionPath, _path.replace(StatusPath,''));
				const dir: string = path.dirname(statusPath);
				const fileName: string = path.basename(_path).split(extname)[0];
				mkdirsSync(dir)
				for(let i in Formatter[extname]){
					fileMap = await Formatter[extname][i](file, { logErrors, fileName: _path, directoryUrl: dir })	
				}
				fileMap.forEach((data: any) => {
					fs.writeFileSync(path.join(dir, (data.name||fileName)+'.'+data.type), file);
				})
			
				if(isInitSuccess) logMessage(`编译完成\r\n`)
				// console.log(file)
			}catch(e){
				logErrors(e);
			}
			
		}
		
	}
})

function mkdirsSync(dirname: string) {  
    if (fs.existsSync(dirname)) {  
        return true;  
    } else {  
        if (mkdirsSync(path.dirname(dirname))) {  
            fs.mkdirSync(dirname);  
            return true;  
        }  
    }  
} 