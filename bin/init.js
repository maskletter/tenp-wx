
const { spawn } = require('child_process')
const cwd = process.cwd();
const fs = require('fs');
const path = require('path');
const npm_cmd = process.platform === "win32" ? "npm.cmd" : "npm";

function isPresence(str_path){
	return fs.existsSync(str_path);
}

//判断是否为目录
function isDirectory(str_path){
	if(!isPresence(str_path)){
		return false;
	}else{
		const stat = fs.statSync(str_path);
		return stat.isDirectory();
	}
}

//创建项目基础目录
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

//安装npm包
function installDependencies( url, callback) {

 	const spwan = spawn(npm_cmd, ['install'], {
      cwd: url,
      stdio: 'inherit',
      shell: true,
    })
    spwan.on('exit', callback)
}

//初始化创建程序
async function InitProject(name, awaitInput){

	const str_path = path.join(cwd,name);
	
	if(isDirectory(str_path)) 
		return console.log(' $error: 文件夹已存在');
	
	const appid = await awaitInput('请输入项目appid:');
	const title = await awaitInput('请输入项目名:');
	if(!appid || !title){
		console.log(' $error 请输入完整信息\r\n');
		await InitProject(name, awaitInput);
	}else{
		CopyFiles(str_path, function(){
			const configUrl = path.join(process.cwd(),name,'src','project.config.json');
			const config = JSON.parse(fs.readFileSync(configUrl,'utf-8'));
			config.appid = appid;
			config.description = title;
			config.projectname = title;
			fs.writeFileSync(configUrl,JSON.stringify(config,null,2))
			installDependencies(str_path, function(){
				console.log('下载npm包完成')
				console.log('$ cd '+name)
				console.log('$ wts serve');
				process.exit();
			})
		})
	}
	
	
	


}
// InitProject('test-projeect');
module.exports = function(name, awaitInput){
	
	InitProject(name, awaitInput);

}