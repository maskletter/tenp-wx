
const wx_key = ['if','for','key','forIndex','forItem'];
const system_key = ['attr','data','event','catch','child'];

/**
 * 将json树转为wxml
 * @param name 
 */

//将标签转为小写(TestLabel=>test-lable)
function FormatLabel(name: string){
    return name.replace(/[A-Z]/g, function(a,b,c,d){ return (b==0?'':'-')+a.toLocaleLowerCase() })
}


export default (data: any) => {
    let wxml = '';
    function createWxml(element: any[]){

		element.forEach(value => {
			if(!value.label){
				wxml += value;
				return;
			}

			const label = FormatLabel(value.label);


			wxml += '<'+label;
			const attr = value.attr || {};
			const data = value.data || {};
			const event = value.event || {};
			const catchs = value.catch || {};

			for(let key in attr){
				// wxml += ' '+key+'="'+attr[key]+'"'
				wxml += ' data-'+key+'="'+attr[key]+'"'
			}
			for(let key in data){
				wxml += ' '+FormatLabel(key)+'="{{'+data[key]+'}}"'
			}
			for(let key in event){
				wxml += ' bind'+key+'="'+event[key]+'"'
			}
			for(let key in catchs){
				wxml += ' catch'+key+'="'+catchs[key]+'"'
			}
			for(let key in value){
				if(wx_key.indexOf(key) != -1){
					if(key == 'for'||key == 'if') wxml += ' wx:'+key+'="{{'+value[key]+'}}"';
					else wxml += ' wx:'+FormatLabel(key)+'="'+value[key]+'"';
				} else if(system_key.indexOf(key) == -1){
					wxml += ' '+FormatLabel(key)+'="'+value[key]+'"'
				}
			}
		
			wxml += '>';
			if(value.text) wxml += value.text;
			if(value.child){
				createWxml(value.child)
			}

			wxml += '</'+label+'>'
			

		})

    };
    createWxml(data);
    return wxml;
}