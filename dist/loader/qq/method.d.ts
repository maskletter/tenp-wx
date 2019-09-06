declare const _default: {
    attrData: any;
    /**
     * 修改json文件
     */
    json: (type: string, data: any) => void;
    tree: (type: string, tree: any, rootDir: string) => void;
    method: (key: string, { content, properties, data }: any) => any;
    style: any;
};
export default _default;
