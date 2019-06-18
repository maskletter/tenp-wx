
import jsdomTotemplate from './jsdomTotemplate'
import { Keyword_Proto, Component_Event, toValueFunction } from '../global.config'

const Global_Template: string = `let NextTickCallbackMap = null;let $This = null;let $ElementMethod = null;
			var logHandler = {
			   get: function(target, key) {
			   	 if (watchParam[key] && watchParam[key].set){
            		 watchParam[key].set.apply($ElementMethod, ['get'])
          		 }
			     if (typeof (target[key]) != 'undefined'){
		             return target[key]
		         }else{
		             return properties[key] ? properties[key].value : undefined;
		         }
			   },
			   set: function(target, key, value) {
			   	 if (watchParam[key] && watchParam[key].set){
            		 watchParam[key].set.apply($ElementMethod, ['set', value])
          		 }
			     target[key] = value;
			     if($This){
			     	$This.setData({ [key]: value }, () => {
				     	NextTickCallbackMap && NextTickCallbackMap();
				     	NextTickCallbackMap = null;
				     })
			     }
			     return true;
			   }
			 };
			 function createMethods($this, key, data){
			 	$ElementMethod=$this;
			 	if(!$This){$this.setData({[key]:data})};
             }`;
//Component存在跟目录的参数值
const noIsData: string[] = ['options', 'relations', 'behaviors','observers','externalClasses'];

export const ClearOtherConfig = (removeKey: any[],config: any) => {
	const data: any = Object.assign({}, config);
	if(data.components){
		data.usingComponents = data.components;
	}
	removeKey.forEach(key => {
		delete data[key]
	})
	return JSON.stringify(data, null, 2);
}

export default (content: string, data: any[]) => {
    // const data = parse(content);
    const tenp = data.find((v: any) => v.value == "@tenp/wx");
    const type: string = data[0];
    if(type == 'Component'){
        return createComponent(data,tenp);
    }else if(type == 'Page'){
        return createPage(data,tenp);
    }else if(type == 'App'){
        return createApp(data,tenp);
    }else{
        return {js:content};
    }
}

function createComponent(data: any,tenp: any){

    let template: string = `const ${tenp.name} = { default: getApp().tenp };`+Global_Template;
    let functionValue: any = {};
    let tree: any = [];
    let wxml: string = '';
    let config: any = {};
    let components = {};
    let dataKey: string[] = [], propertiesKey: string[] = [], options: any = '', relations = '';
    data.forEach((value: any) => {
        if(value.type == 'text'){
            template += value.value;
        }else if(value.type == 'Function'){
            functionValue = value;
        }else if(value.type == 'require'){
            tenp = value.value;
        }else if(value.type == 'config'){
            config = value.value;
            wxml = value.value.templateStr;
            components = config.components||{};
        }else if(value.type == 'tree'){
            tree = value.value;
        }
    })
    
    
    //过滤掉data中options和relations中的参数
    functionValue.data = functionValue.data.filter((v: any) => {
        if(noIsData.indexOf(v.key) == -1) return true
        else {
            functionValue.methods.push(v)
            return false
        }
    })

    //添加data参数
    const _data = 'const _pageData = {' +functionValue.data.map((data: any) => {
        if(Keyword_Proto.indexOf(data.key) != -1) return '';
        dataKey.push(data.key);
        return `${data.key}: ${data.value}`
    }).filter((v:string) => v.replace(/\s/g,'')).join(',') + '};';
    //添加监听参数
    const _input = 'const properties = {' + functionValue.input.map((data: any) => {
        propertiesKey.push(data.key);
        return `${data.key}: {value:${data.value},type:${data.type}, observer(data){ targetWithLog['${data.key}'] = data;createMethods(this, "${data.key}", data); }}`;
    }).filter((v:string) => v.replace(/\s/g,'')).join(',') + '};';

    //获取$this对象并赋值给全局对象
    let ready = functionValue.methods.find(({key}: any) => key == 'ready');
    if(ready){
        ready.value = ready.value.replace('{','{$This=this;');
    }else{
        functionValue.methods.push({ key: 'ready', value: 'function () {$This=this;}' })
    }


    //筛选事件方法并添加进去
    let _methods = FormatMethods2('Component', functionValue.methods.map((data: any) => {
        data.value = data.value.replace(/\bthis.(.+?)[.|)|,|\[\]|(|\s|;]/g, function(a:string,b:string,c:number){
            if(propertiesKey.concat(dataKey).indexOf(b) != -1){
                return `targetWithLog.${b}${a.substr(-1)}`;
            }else{ return a; }
        })
        return data;
    }));

    //添加监听事件
    const _watch = functionValue.watch.map((data: any) => {
        const value = toValueFunction(data.value);
        const type = value.type;
        return `${value.name}: {
            get: ${!type||type=='get'?"Colul.methods."+data.key:undefined},
            set: ${!type||type=='post'?"Colul.methods."+data.key:undefined}
        }`
    }).join(',')

    
    if(functionValue.options.length){
        options = 'options: '+functionValue.options.map((__data: any) => {
            const result = functionValue.data.find((v: any) => v.key == __data.key);
            return result ? result.value : '{}';
        }).join(',');
    }

    if(functionValue.relations.length){
        relations = 'relations: '+functionValue.relations.map((__data: any) => {
            const result = functionValue.data.find((v: any) => v.key == __data.key);
            return result ? result.value : '{}';
        }).join(',');
    }
    template += _data;
    template += _input;
    template += 'let targetWithLog = new Proxy(_pageData, logHandler);';
    template += `const Colul = { data:targetWithLog,properties,${relations?relations+',':''} ${options?options+',':''} ${_methods} };`;
    template += `const watchParam = { ${_watch} };`;
    template += `Component(Colul);`;
    template = template.replace(/exports.default = (.+?)\;/g, (a:string,b:string) => {
		return 'exports.default = Colul;'
    })
    config.component = true;
    return {
        wxml: tree.length ? jsdomTotemplate(tree) : wxml,
        wxss: config.style,
        js: template,
        json: ClearOtherConfig(['style','template','components','templateStr'],config)
    }

}

function createPage(data: any,tenp:any){
    let template: string = `const ${tenp.name} = { default: getApp().tenp };`+Global_Template;
    let functionValue: any = {};
    let tree: any = [];
    let wxml: string = '';
    let config: any = {};
    let components = {};
    let dataKey: string[] = [];
    
    data.forEach((value: any) => {
        if(value.type == 'text'){
            template += value.value;
        }else if(value.type == 'Function'){
            functionValue = value;
        }else if(value.type == 'require'){
            tenp = value.value;
        }else if(value.type == 'config'){
            config = value.value;
            wxml = value.value.templateStr;
            components = config.components||{};
        }else if(value.type == 'tree'){
            tree = value.value;
        }
    })
    
    //添加data参数
    const _data = 'const _pageData = {' +functionValue.data.map((data: any) => {
        if(Keyword_Proto.indexOf(data.key) != -1) return '';
        dataKey.push(data.key);
        return `${data.key}: ${data.value}`
    }).filter((v:string) => v.replace(/\s/g,'')).join(',') + '};';
   

    //获取$this对象并赋值给全局对象
    let onLoad = functionValue.methods.find(({key}: any) => key == 'onLoad');
    if(onLoad){
        onLoad.value = onLoad.value.replace('{','{$This=this;');
    }else{
        functionValue.methods.push({ key: 'onLoad', value: 'function () {$This=this;}' })
    }

    //筛选事件方法并添加进去
    let _methods = FormatMethods2('Page', functionValue.methods.map((data: any) => {
        data.value = data.value.replace(/\bthis.(.+?)[.|)|,|\[\]|(|\s|;]/g, function(a:string,b:string,c:number){
            if(dataKey.indexOf(b) != -1){
                return `targetWithLog.${b}${a.substr(-1)}`;
            }else{ return a; }
        })
        return data;
    }));

    //添加监听事件
    const _watch = functionValue.watch.map((data: any) => {
        const value = toValueFunction(data.value);
        const type = value.type;
        return `${value.name}: {
            get: ${!type||type=='get'?"Colul."+data.key:undefined},
            set: ${!type||type=='post'?"Colul."+data.key:undefined}
        }`
    }).join(',')

    template += _data;
    template += 'let targetWithLog = new Proxy(_pageData, logHandler);';
    template += `let properties = {};const Colul = { data:targetWithLog, ${_methods} };`;
    template += `const watchParam = { ${_watch} };`;
    template += `Page(Colul);`;
    template = template.replace(/exports.default = (.+?)\;/g, (a:string,b:string) => {
		return 'exports.default = Colul;'
    })
    
    return {
        wxml: tree.length ? jsdomTotemplate(tree) : wxml,
        wxss: config.style,
        js: template,
        json: ClearOtherConfig(['style','template','components','templateStr'],config)
    }

}

function createApp(data: any, tenp:any){
    let template: string = "const tenp = require('./method.js');"+Global_Template;
    let functionValue: any = {};
    let config: any = {};
    let components = {};
    let dataKey: string[] = [];
    data.forEach((value: any) => {
        if(value.type == 'text'){
            template += value.value;
        }else if(value.type == 'Function'){
            functionValue = value;
        }else if(value.type == 'require'){
            tenp = value.value;
        }else if(value.type == 'config'){
            config = value.value;
            components = config.components||{};
        }
    })

    functionValue.methods.push({ key: 'tenp', value: 'tenp' })

    //添加data参数
    const _data = 'const _pageData = {' +functionValue.data.map((data: any) => {
        if(Keyword_Proto.indexOf(data.key) != -1) return '';
        dataKey.push(data.key);
        return `${data.key}: ${data.value}`
    }).filter((v:string) => v.replace(/\s/g,'')).join(',') + '};';

    //获取$this对象并赋值给全局对象
    let onLaunch = functionValue.methods.find(({key}: any) => key == 'onLaunch');
    if(onLaunch){
        onLaunch.value = onLaunch.value.replace('{','{$This=this;');
    }else{
        functionValue.methods.push({ key: 'onLaunch', value: 'function () {$This=this;}' })
    }

    //筛选事件方法并添加进去
    let _methods = FormatMethods2('App', functionValue.methods.map((data: any) => {
        data.value = data.value.replace(/\bthis.(.+?)[.|)|,|\[\]|(|\s|;]/g, function(a:string,b:string,c:number){
            if(dataKey.indexOf(b) != -1){
                return `targetWithLog.${b}${a.substr(-1)}`;
            }else{ return a; }
        })
        return data;
    }));

    //添加监听事件
    const _watch = functionValue.watch.map((data: any) => {
        const value = toValueFunction(data.value);
        const type = value.type;
        return `${value.name}: {
            get: ${!type||type=='get'?"Colul."+data.key:undefined},
            set: ${!type||type=='post'?"Colul."+data.key:undefined}
        }`
    }).join(',')

    template += _data;
    template += 'let targetWithLog = new Proxy(_pageData, logHandler);';
    template += `const Colul = { data:targetWithLog, ${_methods} };`;
    template += `const watchParam = { ${_watch} };`;
    template += `App(Colul);`;
    template = template.replace(/exports.default = (.+?)\;/g, (a:string,b:string) => {
		return 'exports.default = Colul;'
	})
    return {
        wxss: config.style,
        js: template,
        json: ClearOtherConfig(['style','components'],config)
    }
}

//筛选不同的事件存放到不同的对象中
export const FormatMethods2 = (type: string, data: any) => {
	let str: string = '';
	let methods: string[] = [];
	let lifetimes: string[] = [];
	let pageLifetimes: string[] = [];
	let $nextTick: string = '$nextTick: function(callback){NextTickCallbackMap = callback;}'

	if(type == 'App' || type == 'Page'){
		data.forEach((__: any) => {
			str += `${__.key}: ${__.value},`
		})
		str += $nextTick;
	}else{
        let rootValues: string[] = [];
		data.forEach((__: any) => {
			const type = Component_Event[__.key];
			if(type == 'lifetimes'){
				lifetimes.push(`${__.key}: ${__.value}`)
			}else if(type == 'pageLifetimes'){
				pageLifetimes.push(`${__.key}: ${__.value}`)
			}else if(noIsData.indexOf(__.key) == -1){
				methods.push(`${__.key}: ${__.value}`)
			}else{
                rootValues.push(`${__.key}: ${__.value}`)
            }
        })
        methods.push($nextTick);
        if(rootValues.length){
            str += `${rootValues.join(',')},`
        }
        str += `
			lifetimes:{${lifetimes.join(',')}},
			pageLifetimes:{${pageLifetimes.join(',')}},
            methods:{${methods.join(',')}},
		`
	}
	return str;
}
