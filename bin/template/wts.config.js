
const sass = require('node-sass');

module.exports = {

    attrData: [
        ['Numk',['Hello,World']]
    ],

    /**
     * 修改json文件
     */
    json: function(type, data){
        
        if(type == 'Page'){
            if(!data.navigationBarBackgroundColor){
                data.navigationBarBackgroundColor = 'white'
            }
            if(!data.navigationBarTextStyle){
                data.navigationBarTextStyle = 'black'
            }
        }
        
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
        }).css.toString()
            .replace(/\b(\d+?)px/g, function(a,b){ return Number(b*2.1)+'rpx' })
            .replace(/\b(\d+?)dpx/g, function(a,b){ return b+'px' });
    },

    xml: function(type, content){
        // console.log(type)
        if(type == 'Page' && !content.match(/navigation-title-border/g)){
            content = '<view class="navigation-title-border"></view>'+content
        }
        return content
    }

}