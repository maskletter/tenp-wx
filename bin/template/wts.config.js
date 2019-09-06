
const sass = require('node-sass');

module.exports = {

   
    /**
     * 修改json文件
     */
    json: function(type, data){
        
        
        
    },


    /**
     * 此方法可以修改style(Function|Function[])
     * 返回值为string,
     * 此为配置sass支持
     * @param {修改} style 
     */
    style: function(style,filepath){
        return sass.renderSync({ 
            data: style, 
            includePaths: [filepath],
            outputStyle: 'compressed'
        }).css.toString();
    },

    xml: function(type, content){
        
        return content
    }

}