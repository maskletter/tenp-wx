import format from './index';
// import { WatchOptions } from '../../server'

export default (content: string, options: any): any => {
	
	let outPut: { [prop: string]: { content: string, name?: string } } = {};

	const { js,wxss,wxml,json } = format(content,options);

	outPut.js = { content: js }
// console.log(options)
	json != '{}' && (outPut.json = { content: json });
	wxss && (outPut.qss = { content: wxss });
	wxml && (outPut.qml = { content: wxml });

	return outPut

}