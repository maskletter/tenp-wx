
const { spawn } = require('child_process')
const cwd = process.cwd();
const fs = require('fs');
const path = require('path');
const npm_cmd = process.platform === "win32" ? "npm.cmd" : "npm";

function isPresence(str_path){
	return fs.existsSync(str_path);
}

function isDirectory(str_path){
	if(!isPresence(str_path)){
		return false;
	}else{
		const stat = fs.statSync(str_path);
		return stat.isDirectory();
	}
}

function CopyFiles(str_path, callback){
	if(process.platform === "win32"){
		const _spwan = spawn('xcopy', ['/S','/d', path.join(__dirname,'template','*'), str_path+'\\'], {
			cwd: process.cwd(),
	        stdio: 'inherit',
	        shell: true, 
		})
		_spwan.on('exit', function(){
			callback();
		})
	}else{
		//linux的cp命令没办法直接创建文件夹，所有需要手动创建
		fs.mkdirSync(str_path)
		const _spwan = spawn('cp', ['-r', path.join(__dirname,'template','*'), str_path], {
			cwd: process.cwd(),
	        stdio: 'inherit',
	        shell: true, 
		})
		_spwan.on('exit', function(){
			callback();
		})
	}
}

function installDependencies( url, callback) {

 	const spwan = spawn(npm_cmd, ['install'], {
      cwd: url,
      stdio: 'inherit',
      shell: true,
    })
    spwan.on('exit', callback)
}


function InitProject(name){

	const str_path = path.join(cwd,name);
	console.log(str_path)
	if(isDirectory(str_path)) 
		return console.log(' $error: 项目目录已存在');
	
	CopyFiles(str_path, function(){
		installDependencies(str_path, function(){
			console.log('下载npm包完成')
			console.log('$ cd '+name)
			console.log('$ wts serve');
			process.exit();
		})
	})
	


}
// InitProject('test-projeect');
module.exports = function(name){
	
	InitProject(name);

}