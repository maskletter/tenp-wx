import * as path from 'path'
import * as fs from 'fs'

const wtsConfig = (function(){
    try {
        return require(path.join(process.cwd(), 'wts.config.js'))
    } catch (error) {
        return {};
    }
}())

export default {

    attrData: wtsConfig.attrData || {},

    /**
     * 修改json文件
     */
    json: function(type: string, data: any){
        if(data.components){
            data.usingComponents = data.components;
            delete data.components;
        }
        wtsConfig.json && wtsConfig.json(type, data)
    },

    tree: function(type: string, tree: any, rootDir: string){
        const componentProps = ['externalClasses','relations','observers'];
        const componentMethods = new Map([
            ['attached', 'lifetimes'],
            ['detached', 'lifetimes'],
            ['show', 'pageLifetimes'],
            ['hide', 'pageLifetimes'],
            ['resize', 'pageLifetimes'],
            ['created','root'],
            ['moved','root'],
            ['ready','root']
        ])
        tree.data = tree.data.filter((v: any) => {
            if(componentProps.indexOf(v.key) == -1) return true;
            else{
                tree.methods.push(v);
                return false;
            }
        })
        
        let splitMethod: any = { methods: [], lifetimes: [], pageLifetimes: [] };
        const watchData = {key: 'systemWatchEvent', method: 'function(){ return {'};
        tree.methods.push(watchData)
        if(type == 'Component'){
            const attached = tree.methods.filter((v: any) => v.key == 'attached');
            let t = 'wx.tenp.watch.init(this);';
            // let t = '';
            if(attached.length){
                attached[0].method = attached[0].method.replace(/[\r\n]/,t)
            }else{
                tree.methods.push({key: 'attached',method: `function(){${t}}`})
            }

            tree.methods = tree.methods.filter((v: any) => {
                const type = componentMethods.get(v.key);
                if(componentProps.indexOf(v.key) != -1){
                    return true;
                }
                if(type){
                    if(type != 'root'){
                        splitMethod[type].push(v)
                        if(type == 'pageLifetimes') return false;
                    }

                    return true;
                }else{
                    splitMethod.methods.push(v);
                    return false;
                }
            })
            
        }else{
            const event = type == 'App'?'onLaunch':'onLoad';
            const load = tree.methods.filter((v: any) => v.key == event);
            let t = 'wx.tenp.watch.init(this);';
            // let t = '';
            if(load.length){
                load[0].method = load[0].method.replace(/[\r\n]/,t)
            }else{
                tree.methods.push({key: event,method: `function(){${t}}`})
            }
        }
            
        for(let methodsKey in splitMethod){
            tree.methods.push({ [methodsKey]: splitMethod[methodsKey] })
        }

        let properties: any = [];
        tree.properties = [];
        // const methods = tree.methods
        tree.decorators.forEach((data: any) => {
            if(data.type == 'Prop'){
                let defaultValue = '';
                tree.properties.push({ key: data.method })
                tree.data = tree.data.filter((v: any) => {
                    if(v.key == data.method){
                        defaultValue = v.value
                        return false
                    }else {
                        return true;
                    }
                })
                properties.push(`${data.method}:{value:${defaultValue||'undefined'},type:${data.valueType}}`);
            }else if(data.type == 'Watch'){
                const params = new Function('return '+data.params)();
                watchData.method += `${params.name}:{type:${params.type||'"all"'}, method: '${data.method}' },`
            }else if(data.type == 'ImgToBase64'){
                const buffer: Buffer = fs.readFileSync(path.join(rootDir,new Function('return '+data.params)()));
                tree.data.push({
                    key: data.method,
                    value: '"data:image/png;base64,'+new Buffer(buffer).toString('base64')+'"'
                })
            }
        })
        watchData.method += '}}';
        if(properties.length) tree.methods.push({ key: 'properties', value: '{'+properties.join(',')+'}' })
        // wtsConfig.tree && wtsConfig.tree(type, tree)
    },

    
    method: function(key: string, {content,properties,data}: any){
        // const dataKey = [...properties.map((v: any) => v.key), ...data.map((v: any) => v.key)];
        // let b: string = null;
        // content = content.replace(/\bthis.(.+?)[.|)|,|\[\]|(|\s|;]/g, (a: string, b: string) => {
        //     if(dataKey.indexOf(b) == -1)
        //         return a;
        //     else{
        //         return 'this.data.'+b+a.substr(-1)
        //     }
        // }).replace(/var[\s](.+?) =[\s]this\b/, (a: string,_b: string) => {
        //     b = _b;
        //     return a;
        // }).replace(new RegExp('\\b'+b+'.(.+?)\\b','g'), (a: string,_b: string) => {
        //     if(dataKey.indexOf(_b) != -1){
        //         return `${b}.data.${_b}`;
        //     }else{ return a; }
        // })
        
        return content
    },

    style: wtsConfig.style


}