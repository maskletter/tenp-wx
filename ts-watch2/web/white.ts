
/**
 * 未完成
 */

import parse from '../parse'
import creationWx from './creation-wx';

export default (fileName: string, data: string) => {

    creationWx(data, parse(data))
}