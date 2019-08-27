
import * as path from 'path';
import * as chokidar from 'chokidar';
import * as fs from 'fs';


export let watchFiles: Set<string> = new Set();

const cwd: string = process.cwd();
const rootUrl: string = path.join(cwd,'assets');
const srcUrl: string = path.join(cwd,'src');
const distUrl: string = path.join(cwd,'dist');


mkdirsSync(distUrl);
mkdirsSync(path.join(distUrl,'tenp_modules'));
fs.copyFileSync(path.join(__dirname,'../lib/wx-method.js'), path.join(distUrl, 'method.js'))

const watcher = chokidar.watch(srcUrl, {
  // ignored: /^(\s|\S)+(ts|js|tsx|jsx|scss)+$/,
  ignored: /^(\s|\S)+(tsx|jsx|scss)+$/,
  persistent: true
})

watcher.on('unlink', function(_path){
	const url: string = _path.replace(path.join(cwd,'src'),'');
	try{
		fs.unlinkSync(path.join(cwd,'dist',url));
	}catch(e){

	}
})

watcher.on('ready', () => watchFiles.add('init'));
watcher.on('all', (event: string, _path: string) => {

	if(event == 'add' || event == 'change'){
		const url: string = _path.replace(path.join(cwd, 'src'),'');
		if(!url) return;
		const f: string = path.join(distUrl,url);
		if(/^(\s|\S)+(ts)+$/.test(_path)){
			if(watchFiles.has('init')){
				watchFiles.add(f.substr(0, f.length-2)+'js')	
			}
			return;
		}
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