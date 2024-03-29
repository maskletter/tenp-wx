export declare const cwd: string;
/** 搜寻目录内的文件 */
export declare const findFiles: ({ type, value, path: _path, callback }: {
    type: "name" | "suffix";
    value: string[];
    path: string;
    callback: Function;
}, reg?: RegExp) => void;
export declare const mkdirsSync: (dirname: string) => boolean;
export declare const getDirectoryContent: (url: string, suffix?: boolean) => Set<string>;
export declare function findArgv(name: string): string | boolean;
export declare function runSpawn(cwd: string): void;
export declare function startWxTool(cwd: string, project: string): void;
export declare function closeWxTool(cwd: string, project: string, resolve?: Function): void;
