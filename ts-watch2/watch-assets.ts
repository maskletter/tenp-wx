
import * as path from 'path';
import * as chokidar from 'chokidar';
import * as fs from 'fs';

/**
 * 监听assets目录，将assets目录内的文件复制到dist/assets目录中
 */

const cwd: string = process.cwd();
const rootUrl: string = path.join(cwd,'assets');
const srcUrl: string = path.join(cwd,'src');
const wxUrl: string = path.join(cwd,'dist','assets');
const distUrl: string = path.join(cwd,'dist');
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


const watcher2 = chokidar.watch([
	path.join(cwd,'src'),
	path.join(cwd,'project.config.json'),
	path.join(cwd,'sitemap.json'),
], {
	ignored: /^(\s|\S)+(ts|js|tsx|jsx|scss|html)+$/,
	persistent: true
  }),
  fileMap: string[] = ['project.config.json', 'sitemap.json']

  watcher2.on('all', (event: string, _path: string) => {
	if(event == 'add' || event == 'change'){
		const replaceUrl: string = fileMap.indexOf(path.basename(_path)) == -1 ? srcUrl : cwd;
		const url: string = _path.replace(replaceUrl,'');
		if(!url) return;
		const f: string = path.join(distUrl,url);
		mkdirsSync(path.dirname(f))
		fs.copyFileSync(_path, f)
	}
  })