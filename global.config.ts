

//不需要转为字符串的属性
export const Final_System_Attr: string[] = ['attr','data','event','catch'];
//属性是否需要加{{}}
export let Final_System_attrData: any = {
	Map: ['markers','covers','polyline','circles','controls','includePoints','polygons']
}

//Component和App的关键字
export const Keyword_Proto: string[] = ['setData','selectComponent', '$nextTick','triggerEvent','hasBehavior','createSelectorQuery','createIntersectionObserver','selectAllComponents','getRelationNodes','groupSetData','getTabBar'];
//Component内的方法所属位置
export const Component_Event: any = {
	created: 'lifetimes',
	attached: 'lifetimes',
	ready: 'lifetimes',
	moved: 'lifetimes',
	detached: 'lifetimes',
	error: 'lifetimes',
	show: 'pageLifetimes',
	hide: 'pageLifetimes',
	resize: 'pageLifetimes',
}

//字符串转变量
export function toValueFunction(value: string){
	return new Function('', 'return '+value)();
}

//抛出设置Final_System_attrData的方法
export const setSystemDataAttr = (label: string, attr: string[]): void => {
	if(Final_System_attrData[label]){
		Final_System_attrData[label] = Final_System_attrData[label].concat(attr)
	}else{
		Final_System_attrData[label] = attr;
	}
}
