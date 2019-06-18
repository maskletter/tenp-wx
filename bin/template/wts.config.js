
const sass = require('node-sass');

module.exports = {

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

    /**
     * 此方法可以修改template，(Function|Function[])
     * 返回值为string
     * @param {修改} template 
     */
    // template: function(template){
    //     return template
    // },

    /**
     * template为返回的ts转换之后的js文件，parse为返回的经过修改的ast树
     * 此方法会覆盖掉系统自带的生成微信小程序代码的程序，可以用来创建其他版本代码
     * @param {*} template 
     * @param {*} parse 
     */
    // parse: function(template, parse){
    //     console.log(parse)
    // }

}