
import * as path from 'path';
import * as chokidar from 'chokidar';
import * as fs from 'fs';
import * as ts from 'typescript';

const cwd: string = process.cwd();
const rootUrl: string = path.join(cwd,'assets');
const wxUrl: string = path.join(cwd,'dist','assets');
const watcher = chokidar.watch(path.join(cwd,'assets'), {
  // ignored: /^(\s|\S)+(ts|js|tsx|jsx)+$/,
  persistent: true
})


// watcher.on('unlinkDir', function(_path){
// 	console.log(`${_path}删除目录`)
// })
watcher.on('unlink', function(_path){
	const url: string = _path.replace(path.join(cwd,'assets'),'');
	try{
		fs.unlinkSync(path.join(cwd,'dist','assets',url));
	}catch(e){

	}
})

watcher.on('all', (event: string, _path: string) => {
	if(event == 'add' || event == 'change'){
		const url: string = _path.replace(rootUrl,'');
		if(!url) return;
		const f: string = path.join(wxUrl,url);
		mkdirsSync(path.dirname(f))
		fs.copyFileSync(_path, f)
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