"use strict";
declare const exports;
// declare const wx: any;
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

let Final_RouterBefore = [];
let Final_RouterAfter = [];

Object.defineProperty(exports, "__esModule", { value: true });
function removeKeyword(data) {
    var _data = Object.assign({}, data);
    delete _data.success;
    delete _data.error;
    delete _data.fail;
    return _data;
}
exports.routerBefore = function(callback){
    Final_RouterBefore.push(callback);
}
exports.routerAfter = function(callback){
    Final_RouterAfter.push(callback)
}
function arrayEndAsync(aims,type, to?:string){
    const form = getCurrentPages().pop().route;
    return new Promise((resolve,reject) => {
        let index = 0;
        let isError = false;
        if(aims.length == 0){
            resolve();
        }
        aims.forEach(async(data) => {
           if(isError) return;
            try{
                await data({type,to,form});
            }catch(e){
                isError = true;
            }
            if(index == aims.length-1){
                if(isError) reject('error');
                else resolve('success');
            }
            index++;
        })
    })
}

exports.canIUse = function () {
    return wx.canIUse('openBluetoothAdapter');
};
exports.SystemInfo = function () {
    return new Promise(function (resolve, reject) {
        wx.getSystemInfo({
            success: function (result) {
                resolve(result);
            },
            fail: function (error) {
                reject(error);
            }
        });
    });
};
exports.getUpdateManager = function () {
    return wx.getUpdateManager();
};
exports.getLaunchOptionsSync = function () {
    return wx.getLaunchOptionsSync();
};
exports.onPageNotFound = function (callback) {
    wx.onPageNotFound(callback);
};
exports.onError = function (callback) {
    wx.onError(callback);
};
exports.onAudioInterruptionEnd = function (callback) {
    wx.onAudioInterruptionEnd(callback);
};
exports.onAudioInterruptionBegin = function (callback) {
    wx.onAudioInterruptionBegin(callback);
};
exports.onAppShow = function (callback) {
    wx.onAppShow(callback);
};
exports.onAppHide = function (callback) {
    wx.onAppHide(callback);
};
exports.offPageNotFound = function (callback) {
    wx.offPageNotFound(callback);
};
exports.offError = function (callback) {
    wx.offError(callback);
};
exports.offAudioInterruptionEnd = function (callback) {
    wx.offAudioInterruptionEnd(callback);
};
exports.offAudioInterruptionBegin = function (callback) {
    wx.offAudioInterruptionBegin(callback);
};
exports.offAppShow = function (callback) {
    wx.offAppShow(callback);
};
exports.offAppHide = function (callback) {
    wx.offAppHide(callback);
};
exports.setEnableDebug = function (data) {
    return new Promise(function (resolve, reject) {
        wx.setEnableDebug({
            enableDebug: data.enableDebug,
            success: function (result) {
                resolve(result);
            },
            fail: function (error) {
                reject(error);
            }
        });
    });
};
exports.getLogManager = function (data) {
    return wx.getLogManager({ level: data.level });
};
exports.switchTab = function (data) {
    return new Promise(function (resolve, reject) {
        arrayEndAsync(Final_RouterBefore,'switch',data.url).then(result => {
            wx.switchTab({
                url: data.url,
                success: function (result) {
                    arrayEndAsync(Final_RouterAfter,'switch',data.url).then(() => resolve(result))
                },
                fail: function (error) {
                    reject(error);
                }
            });
        })
            
    });
};
exports.reLaunch = function (data) {
    return new Promise(function (resolve, reject) {
        arrayEndAsync(Final_RouterBefore,'reLaunch',data.url).then(result => {
            wx.reLaunch({
                url: data.url,
                success: function (result) {
                    arrayEndAsync(Final_RouterAfter,'reLaunch',data.url).then(() => resolve(result))
                },
                fail: function (error) {
                    reject(error);
                }
            });
        })
            
    });
};
exports.redirectTo = function (data) {
    return new Promise(function (resolve, reject) {
        arrayEndAsync(Final_RouterBefore,'redirect',data.url).then(result => {
            wx.redirectTo({
                url: data.url,
                success: function (result) {
                    arrayEndAsync(Final_RouterAfter,'redirect',data.url).then(() => resolve(result))
                },
                fail: function (error) {
                    reject(error);
                }
            });
        })
            
    });
};
exports.navigateTo = function (data) {
    return new Promise(function (resolve, reject) {
        arrayEndAsync(Final_RouterBefore,'navigate',data.url).then(result => {
            wx.navigateTo({
                url: data.url,
                success: function (result) {
                    arrayEndAsync(Final_RouterAfter,'navigate',data.url).then(() => resolve(result))
                },
                fail: function (error) {
                    reject(error);
                }
            });
        })
            
    });
};
exports.navigateBack = function (data) {
    return new Promise(function (resolve, reject) {
        arrayEndAsync(Final_RouterBefore,'back').then(result => {
            wx.navigateBack({
                delta: data.delta,
                success: function (result) {
                    arrayEndAsync(Final_RouterAfter,'back').then(() => resolve(result))
                },
                fail: function (error) {
                    reject(error);
                }
            });
        })
            
    });
};
exports.showToast = function (data) {
    return new Promise(function (resolve, reject) {
        wx.showToast(__assign({}, removeKeyword(data), { success: function (result) {
                resolve(result);
            },
            fail: function (error) {
                reject(error);
            } }));
    });
};
exports.showModal = function (data) {
    return new Promise(function (resolve, reject) {
        wx.showModal(__assign({}, removeKeyword(data), { success: function (result) {
                resolve(result);
            },
            fail: function (error) {
                reject(error);
            } }));
    });
};
exports.showLoading = function (data) {
    return new Promise(function (resolve, reject) {
        wx.showLoading(__assign({}, removeKeyword(data), { success: function (result) {
                resolve(result);
            },
            fail: function (error) {
                reject(error);
            } }));
    });
};
exports.showActionSheet = function (data) {
    return new Promise(function (resolve, reject) {
        wx.showActionSheet(__assign({}, removeKeyword(data), { success: function (result) {
                resolve(result);
            },
            fail: function (error) {
                reject(error);
            } }));
    });
};
exports.hideToast = function () {
    return new Promise(function (resolve, reject) {
        wx.hideToast({
            success: function (result) {
                resolve(result);
            },
            fail: function (error) {
                reject(error);
            }
        });
    });
};
exports.hideLoading = function () {
    return new Promise(function (resolve, reject) {
        wx.hideLoading({
            success: function (result) {
                resolve(result);
            },
            fail: function (error) {
                reject(error);
            }
        });
    });
};
exports.showNavigationBarLoading = function () {
    return new Promise(function (resolve, reject) {
        wx.showNavigationBarLoading({
            success: function (result) {
                resolve(result);
            },
            fail: function (error) {
                reject(error);
            }
        });
    });
};
exports.setNavigationBarTitle = function (data) {
    return new Promise(function (resolve, reject) {
        wx.setNavigationBarTitle({
            title: data.title,
            success: function (result) {
                resolve(result);
            },
            fail: function (error) {
                reject(error);
            }
        });
    });
};
exports.setNavigationBarColor = function (data) {
    return new Promise(function (resolve, reject) {
        wx.setNavigationBarColor(__assign({}, removeKeyword(data), { success: function (result) {
                resolve(result);
            },
            fail: function (error) {
                reject(error);
            } }));
    });
};
exports.hideNavigationBarLoading = function () {
    return new Promise(function (resolve, reject) {
        wx.hideNavigationBarLoading({
            success: function (result) {
                resolve(result);
            },
            fail: function (error) {
                reject(error);
            }
        });
    });
};
exports.setBackgroundTextStyle = function (data) {
    return new Promise(function (resolve, reject) {
        wx.setBackgroundTextStyle({
            textStyle: data.textStyle,
            success: function (result) {
                resolve(result);
            },
            fail: function (error) {
                reject(error);
            }
        });
    });
};
exports.setBackgroundColor = function (data) {
    return new Promise(function (resolve, reject) {
        wx.setBackgroundColor(__assign({}, removeKeyword(data), { success: function (result) {
                resolve(result);
            },
            fail: function (error) {
                reject(error);
            } }));
    });
};
exports.showTabBarRedDot = function (data) {
    return new Promise(function (resolve, reject) {
        wx.showTabBarRedDot({
            index: data.index,
            success: function (result) {
                resolve(result);
            },
            fail: function (error) {
                reject(error);
            }
        });
    });
};
exports.downloadFile = function (data) {
    return new Promise(function (resolve, reject) {
        wx.downloadFile(__assign({}, removeKeyword(data), { success: function (result) {
                resolve(result);
            },
            fail: function (error) {
                reject(error);
            } }));
    });
};
exports.showTabBar = function (data) {
    return new Promise(function (resolve, reject) {
        wx.showTabBar({
            animation: data.animation,
            success: function (result) {
                resolve(result);
            },
            fail: function (error) {
                reject(error);
            }
        });
    });
};
exports.setTabBarStyle = function (data) {
    return new Promise(function (resolve, reject) {
        wx.setTabBarStyle(__assign({}, removeKeyword(data), { success: function (result) {
                resolve(result);
            },
            fail: function (error) {
                reject(error);
            } }));
    });
};
exports.setTabBarItem = function (data) {
    return new Promise(function (resolve, reject) {
        wx.setTabBarItem(__assign({}, removeKeyword(data), { success: function (result) {
                resolve(result);
            },
            fail: function (error) {
                reject(error);
            } }));
    });
};
exports.setTabBarBadge = function (data) {
    return new Promise(function (resolve, reject) {
        wx.setTabBarBadge(__assign({}, removeKeyword(data), { success: function (result) {
                resolve(result);
            },
            fail: function (error) {
                reject(error);
            } }));
    });
};
exports.removeTabBarBadge = function (data) {
    return new Promise(function (resolve, reject) {
        wx.removeTabBarBadge({
            index: data.index,
            success: function (result) {
                resolve(result);
            },
            fail: function (error) {
                reject(error);
            }
        });
    });
};
exports.hideTabBarRedDot = function (data) {
    return new Promise(function (resolve, reject) {
        wx.hideTabBarRedDot({
            index: data.index,
            success: function (result) {
                resolve(result);
            },
            fail: function (error) {
                reject(error);
            }
        });
    });
};
exports.hideTabBar = function (data) {
    return new Promise(function (resolve, reject) {
        wx.hideTabBar({
            animation: data.animation,
            success: function (result) {
                resolve(result);
            },
            fail: function (error) {
                reject(error);
            }
        });
    });
};
exports.loadFontFace = function (data) {
    return new Promise(function (resolve, reject) {
        wx.loadFontFace(__assign({}, removeKeyword(data), { success: function (result) {
                resolve(result);
            },
            fail: function (error) {
                reject(error);
            } }));
    });
};
exports.stopPullDownRefresh = function () {
    return new Promise(function (resolve, reject) {
        wx.stopPullDownRefresh({
            success: function(result){
                resolve(result)
            },
            fail: function (error) {
                reject(error);
            }
        });
    })
    
};
exports.startPullDownRefresh = function () {
    return new Promise(function (resolve, reject) {
        wx.startPullDownRefresh({
            success: function(result){
                resolve(result)
            },
            fail: function (error) {
                reject(error);
            }
        });
    })
};
exports.pageScrollTo = function (data) {
    return new Promise(function (resolve, reject) {
        wx.pageScrollTo(__assign({}, removeKeyword(data), { success: function (result) {
                resolve(result);
            },
            fail: function (error) {
                reject(error);
            } }));
    });
};
exports.createAnimation = function (data) {
    return wx.createAnimation(data);
};
exports.setTopBarText = function (data) {
    return new Promise(function (resolve, reject) {
        wx.setTopBarText({
            text: data.text,
            success: function (result) {
                resolve(result);
            },
            fail: function (error) {
                reject(error);
            }
        });
    });
};
exports.nextTick = function (call) {
    wx.nextTick(call);
};
exports.getMenuButtonBoundingClientRect = function () {
    return wx.getMenuButtonBoundingClientRect();
};
exports.onWindowResize = function (call) {
    wx.onWindowResize(call);
};
exports.offWindowResize = function (call) {
    wx.offWindowResize(call);
};
exports.setStorageSync = function (key, data) {
    wx.setStorageSync(key, data);
};
exports.getStorageSync = function (key) {
    return wx.getStorageSync(key);
};
exports.removeStorageSync = function (key) {
    wx.removeStorageSync(key);
};
exports.clearStorageSync = function (key) {
    wx.clearStorageSync(key);
};
exports.setStorage = function (data) {
    return new Promise(function (resolve, reject) {
        wx.setStorage(__assign({}, removeKeyword(data), { success: function (result) {
                resolve(result);
            },
            fail: function (error) {
                reject(error);
            } }));
    });
};
exports.removeStorage = function (data) {
    return new Promise(function (resolve, reject) {
        wx.removeStorage({
            key: data.key,
            success: function (result) {
                resolve(result);
            },
            fail: function (error) {
                reject(error);
            }
        });
    });
};
exports.getStorage = function (data) {
    return new Promise(function (resolve, reject) {
        wx.getStorage({
            key: data.key,
            success: function (result) {
                resolve(result);
            },
            fail: function (error) {
                reject(error);
            }
        });
    });
};
exports.clearStorage = function () {
    return new Promise(function (resolve, reject) {
        wx.hideToast({
            success: function (result) {
                resolve(result);
            },
            fail: function (error) {
                reject(error);
            }
        });
    });
};
exports.saveImageToPhotosAlbum = function (data) {
    return new Promise(function (resolve, reject) {
        wx.saveImageToPhotosAlbum({
            filePath: data.filePath,
            success: function (result) {
                resolve(result);
            },
            fail: function (error) {
                reject(error);
            }
        });
    });
};
exports.previewImage = function (data) {
    return new Promise(function (resolve, reject) {
        wx.previewImage(__assign({}, removeKeyword(data), { success: function (result) {
                resolve(result);
            },
            fail: function (error) {
                reject(error);
            } }));
    });
};
exports.getImageInfo = function (data) {
    return new Promise(function (resolve, reject) {
        wx.getImageInfo({
            src: data.src,
            success: function (result) {
                resolve(result);
            },
            fail: function (error) {
                reject(error);
            }
        });
    });
};
exports.compressImage = function (data) {
    return new Promise(function (resolve, reject) {
        wx.compressImage(__assign({}, removeKeyword(data), { success: function (result) {
                resolve(result);
            },
            fail: function (error) {
                reject(error);
            } }));
    });
};
exports.chooseMessageFile = function (data) {
    return new Promise(function (resolve, reject) {
        wx.chooseMessageFile(__assign({}, removeKeyword(data), { success: function (result) {
                resolve(result);
            },
            fail: function (error) {
                reject(error);
            } }));
    });
};
exports.chooseImage = function (data) {
    return new Promise(function (resolve, reject) {
        wx.chooseImage(__assign({}, removeKeyword(data), { success: function (result) {
                resolve(result);
            },
            fail: function (error) {
                reject(error);
            } }));
    });
};
exports.saveVideoToPhotosAlbum = function (data) {
    return new Promise(function (resolve, reject) {
        wx.saveVideoToPhotosAlbum({
            filePath: data.filePath,
            success: function (result) {
                resolve(result);
            },
            fail: function (error) {
                reject(error);
            }
        });
    });
};
exports.chooseVideo = function (data) {
    return new Promise(function (resolve, reject) {
        wx.chooseVideo(__assign({}, removeKeyword(data), { success: function (result) {
                resolve(result);
            },
            fail: function (error) {
                reject(error);
            } }));
    });
};
exports.stopVoice = function () {
    return new Promise(function (resolve, reject) {
        wx.stopVoice({
            success: function (result) {
                resolve(result);
            },
            fail: function (error) {
                reject(error);
            }
        });
    });
};
exports.setInnerAudioOption = function (data) {
    return new Promise(function (resolve, reject) {
        wx.setInnerAudioOption(__assign({}, removeKeyword(data), { success: function (result) {
                resolve(result);
            },
            fail: function (error) {
                reject(error);
            } }));
    });
};
exports.playVoice = function (data) {
    return new Promise(function (resolve, reject) {
        wx.playVoice(__assign({}, removeKeyword(data), { success: function (result) {
                resolve(result);
            },
            fail: function (error) {
                reject(error);
            } }));
    });
};
exports.pauseVoice = function () {
    return new Promise(function (resolve, reject) {
        wx.saveVide({
            success: function (result) {
                resolve(result);
            },
            fail: function (error) {
                reject(error);
            }
        });
    });
};
exports.getAvailableAudioSources = function () {
    return new Promise(function (resolve, reject) {
        wx.getAvailableAudioSources({
            success: function (result) {
                resolve(result);
            },
            fail: function (error) {
                reject(error);
            }
        });
    });
};
exports.stopBackgroundAudio = function () {
    return new Promise(function (resolve, reject) {
        wx.stopBackgroundAudio({
            success: function (result) {
                resolve(result);
            },
            fail: function (error) {
                reject(error);
            }
        });
    });
};
exports.seekBackgroundAudio = function (data) {
    return new Promise(function (resolve, reject) {
        wx.seekBackgroundAudio({
            position: data.position,
            success: function (result) {
                resolve(result);
            },
            fail: function (error) {
                reject(error);
            }
        });
    });
};
exports.playBackgroundAudio = function (data) {
    return new Promise(function (resolve, reject) {
        wx.playBackgroundAudio(__assign({}, removeKeyword(data), { success: function (result) {
                resolve(result);
            },
            fail: function (error) {
                reject(error);
            } }));
    });
};
exports.onBackgroundAudioStop = function (call) {
    wx.onBackgroundAudioStop(call);
};
exports.onBackgroundAudioPlay = function (call) {
    wx.onBackgroundAudioPlay(call);
};
exports.onBackgroundAudioPause = function (call) {
    wx.onBackgroundAudioPause(call);
};
exports.getBackgroundAudioPlayerState = function () {
    return new Promise(function (resolve, reject) {
        wx.getBackgroundAudioPlayerState({
            success: function (result) {
                resolve(result);
            },
            fail: function (error) {
                reject(error);
            }
        });
    });
};
exports.getBackgroundAudioManager = function () {
    return wx.getBackgroundAudioManager();
};
exports.getRecorderManager = function () {
    return wx.getRecorderManager();
};
exports.createCameraContext = function () {
    return wx.createCameraContext();
};
exports.openLocation = function (data) {
    return new Promise(function (resolve, reject) {
        wx.openLocation(__assign({}, removeKeyword(data), { success: function (result) {
                resolve(result);
            },
            fail: function (error) {
                reject(error);
            } }));
    });
};
exports.getLocation = function (data) {
    return new Promise(function (resolve, reject) {
        wx.getLocation(__assign({}, removeKeyword(data), { success: function (result) {
                resolve(result);
            },
            fail: function (error) {
                reject(error);
            } }));
    });
};
exports.chooseLocation = function () {
    return new Promise(function (resolve, reject) {
        wx.chooseLocation({
            success: function (result) {
                resolve(result);
            },
            fail: function (error) {
                reject(error);
            }
        });
    });
};
exports.updateShareMenu = function (data) {
    return new Promise(function (resolve, reject) {
        wx.updateShareMenu(__assign({}, removeKeyword(data), { success: function (result) {
                resolve(result);
            },
            fail: function (error) {
                reject(error);
            } }));
    });
};
exports.showShareMenu = function (data) {
    return new Promise(function (resolve, reject) {
        wx.showShareMenu({
            withShareTicket: data.withShareTicket,
            success: function (result) {
                resolve(result);
            },
            fail: function (error) {
                reject(error);
            }
        });
    });
};
exports.hideShareMenu = function () {
    return new Promise(function (resolve, reject) {
        wx.hideShareMenu({
            success: function (result) {
                resolve(result);
            },
            fail: function (error) {
                reject(error);
            }
        });
    });
};
exports.getShareInfo = function (data) {
    return new Promise(function (resolve, reject) {
        wx.getShareInfo(__assign({}, removeKeyword(data), { success: function (result) {
                resolve(result);
            },
            fail: function (error) {
                reject(error);
            } }));
    });
};
exports.saveFile = function (data) {
    return new Promise(function (resolve, reject) {
        wx.saveFile({
            tempFilePath: data.tempFilePath,
            success: function (result) {
                resolve(result);
            },
            fail: function (error) {
                reject(error);
            }
        });
    });
};
exports.removeSavedFile = function (data) {
    return new Promise(function (resolve, reject) {
        wx.removeSavedFile({
            filePath: data.filePath,
            success: function (result) {
                resolve(result);
            },
            fail: function (error) {
                reject(error);
            }
        });
    });
};
exports.openDocument = function (data) {
    return new Promise(function (resolve, reject) {
        wx.openDocument(__assign({}, removeKeyword(data), { success: function (result) {
                resolve(result);
            },
            fail: function (error) {
                reject(error);
            } }));
    });
};
exports.getSavedFileList = function () {
    return new Promise(function (resolve, reject) {
        wx.getSavedFileList({
            success: function (result) {
                resolve(result);
            },
            fail: function (error) {
                reject(error);
            }
        });
    });
};
exports.getSavedFileInfo = function (data) {
    return new Promise(function (resolve, reject) {
        wx.getSavedFileInfo({
            filePath: data.filePath,
            success: function (result) {
                resolve(result);
            },
            fail: function (error) {
                reject(error);
            }
        });
    });
};
exports.getFileSystemManager = function () {
    return wx.getFileSystemManager();
};
exports.getFileInfo = function (data) {
    return new Promise(function (resolve, reject) {
        wx.getFileInfo(__assign({}, removeKeyword(data), { success: function (result) {
                resolve(result);
            },
            fail: function (error) {
                reject(error);
            } }));
    });
};
exports.login = function (data) {
    if (data === void 0) { data = {}; }
    return new Promise(function (resolve, reject) {
        wx.login({
            timeout: data.timeout,
            success: function (result) {
                resolve(result);
            },
            fail: function (error) {
                reject(error);
            }
        });
    });
};
exports.checkSession = function () {
    return new Promise(function (resolve, reject) {
        wx.checkSession({
            success: function (result) {
                resolve(result);
            },
            fail: function (error) {
                reject(error);
            }
        });
    });
};
exports.navigateToMiniProgram = function (data) {
    return new Promise(function (resolve, reject) {
        wx.navigateToMiniProgram(__assign({}, removeKeyword(data), { success: function (result) {
                resolve(result);
            },
            fail: function (error) {
                reject(error);
            } }));
    });
};
exports.navigateBackMiniProgram = function (data) {
    return new Promise(function (resolve, reject) {
        wx.navigateBackMiniProgram({
            extraData: data.extraData,
            success: function (result) {
                resolve(result);
            },
            fail: function (error) {
                reject(error);
            }
        });
    });
};
exports.getAccountInfoSync = function () {
    wx.getAccountInfoSync();
};
exports.getUserInfo = function (data) {
    return new Promise(function (resolve, reject) {
        wx.getUserInfo(__assign({}, removeKeyword(data), { success: function (result) {
                resolve(result);
            },
            fail: function (error) {
                reject(error);
            } }));
    });
};
exports.requestPayment = function (data) {
    return new Promise(function (resolve, reject) {
        wx.requestPayment(__assign({}, removeKeyword(data), { success: function (result) {
                resolve(result);
            },
            fail: function (error) {
                reject(error);
            } }));
    });
};
exports.authorize = function (data) {
    return new Promise(function (resolve, reject) {
        wx.authorize({
            scope: data.scope,
            success: function (result) {
                resolve(result);
            },
            fail: function (error) {
                reject(error);
            }
        });
    });
};
exports.openSetting = function () {
    return new Promise(function (resolve, reject) {
        wx.openSetting({
            success: function (result) {
                resolve(result);
            },
            fail: function (error) {
                reject(error);
            }
        });
    });
};
exports.getSetting = function () {
    return new Promise(function (resolve, reject) {
        wx.getSetting({
            success: function (result) {
                resolve(result);
            },
            fail: function (error) {
                reject(error);
            }
        });
    });
};
exports.chooseAddress = function () {
    return new Promise(function (resolve, reject) {
        wx.chooseAddress({
            success: function (result) {
                resolve(result);
            },
            fail: function (error) {
                reject(error);
            }
        });
    });
};
exports.openCard = function (data) {
    return new Promise(function (resolve, reject) {
        wx.openCard({
            cardList: data.cardList,
            success: function (result) {
                resolve(result);
            },
            fail: function (error) {
                reject(error);
            }
        });
    });
};
exports.addCard = function (data) {
    return new Promise(function (resolve, reject) {
        wx.addCard({
            cardList: data.cardList,
            success: function (result) {
                resolve(result);
            },
            fail: function (error) {
                reject(error);
            }
        });
    });
};
exports.chooseInvoiceTitle = function () {
    return new Promise(function (resolve, reject) {
        wx.chooseInvoiceTitle({
            success: function (result) {
                resolve(result);
            },
            fail: function (error) {
                reject(error);
            }
        });
    });
};
exports.chooseInvoice = function () {
    return new Promise(function (resolve, reject) {
        wx.chooseInvoice({
            success: function (result) {
                resolve(result);
            },
            fail: function (error) {
                reject(error);
            }
        });
    });
};
exports.startSoterAuthentication = function (data) {
    return new Promise(function (resolve, reject) {
        wx.startSoterAuthentication(__assign({}, removeKeyword(data), { success: function (result) {
                resolve(result);
            },
            fail: function (error) {
                reject(error);
            } }));
    });
};
exports.checkIsSupportSoterAuthentication = function () {
    return new Promise(function (resolve, reject) {
        wx.checkIsSupportSoterAuthentication({
            success: function (result) {
                resolve(result);
            },
            fail: function (error) {
                reject(error);
            }
        });
    });
};
exports.checkIsSoterEnrolledInDevice = function (data) {
    return new Promise(function (resolve, reject) {
        wx.checkIsSoterEnrolledInDevice({
            checkAuthMode: data.checkAuthMode,
            success: function (result) {
                resolve(result);
            },
            fail: function (error) {
                reject(error);
            }
        });
    });
};
exports.getWeRunData = function (data) {
    return new Promise(function (resolve, reject) {
        wx.getWeRunData({
            success: function (result) {
                resolve(result);
            },
            fail: function (error) {
                reject(error);
            }
        });
    });
};
exports.stopBeaconDiscovery = function () {
    return new Promise(function (resolve, reject) {
        wx.stopBeaconDiscovery({
            success: function (result) {
                resolve(result);
            },
            fail: function (error) {
                reject(error);
            }
        });
    });
};
exports.startBeaconDiscovery = function (data) {
    return new Promise(function (resolve, reject) {
        wx.startBeaconDiscovery(__assign({}, removeKeyword(data), { success: function (result) {
                resolve(result);
            },
            fail: function (error) {
                reject(error);
            } }));
    });
};
exports.onBeaconUpdate = function (call) {
    wx.onBeaconUpdate(call);
};
exports.onBeaconServiceChange = function (call) {
    wx.onBeaconServiceChange(call);
};
exports.getBeacons = function () {
    return new Promise(function (resolve, reject) {
        wx.getBeacons({
            success: function (result) {
                resolve(result);
            },
            fail: function (error) {
                reject(error);
            }
        });
    });
};
exports.stopWifi = function () {
    return new Promise(function (resolve, reject) {
        wx.stopWifi({
            success: function (result) {
                resolve(result);
            },
            fail: function (error) {
                reject(error);
            }
        });
    });
};
exports.startWifi = function () {
    return new Promise(function (resolve, reject) {
        wx.startWifi({
            success: function (result) {
                resolve(result);
            },
            fail: function (error) {
                reject(error);
            }
        });
    });
};
exports.setWifiList = function (data) {
    return new Promise(function (resolve, reject) {
        wx.setWifiList({
            wifiList: data.wifiList,
            success: function (result) {
                resolve(result);
            },
            fail: function (error) {
                reject(error);
            }
        });
    });
};
exports.onWifiConnected = function (call) {
    wx.onWifiConnected(call);
};
exports.onGetWifiList = function (call) {
    wx.onGetWifiList(call);
};
exports.getWifiList = function () {
    return new Promise(function (resolve, reject) {
        wx.getWifiList({
            success: function (result) {
                resolve(result);
            },
            fail: function (error) {
                reject(error);
            }
        });
    });
};
exports.getConnectedWifi = function () {
    return new Promise(function (resolve, reject) {
        wx.getConnectedWifi({
            success: function (result) {
                resolve(result);
            },
            fail: function (error) {
                reject(error);
            }
        });
    });
};
exports.connectWifi = function (data) {
    return new Promise(function (resolve, reject) {
        wx.connectWifi(__assign({}, removeKeyword(data), { success: function (result) {
                resolve(result);
            },
            fail: function (error) {
                reject(error);
            } }));
    });
};
exports.readBLECharacteristicValue = function (data) {
    return new Promise(function (resolve, reject) {
        wx.readBLECharacteristicValue(__assign({}, removeKeyword(data), { success: function (result) {
                resolve(result);
            },
            fail: function (error) {
                reject(error);
            } }));
    });
};
exports.onBLEConnectionStateChange = function (call) {
    wx.onBLEConnectionStateChange(call);
};
exports.onBLECharacteristicValueChange = function (call) {
    wx.onBLECharacteristicValueChange(call);
};
exports.notifyBLECharacteristicValueChange = function (data) {
    return new Promise(function (resolve, reject) {
        wx.notifyBLECharacteristicValueChange(__assign({}, removeKeyword(data), { success: function (result) {
                resolve(result);
            },
            fail: function (error) {
                reject(error);
            } }));
    });
};
exports.getBLEDeviceServices = function (data) {
    return new Promise(function (resolve, reject) {
        wx.getBLEDeviceServices({
            deviceId: data.deviceId,
            success: function (result) {
                resolve(result);
            },
            fail: function (error) {
                reject(error);
            }
        });
    });
};
exports.getBLEDeviceCharacteristics = function (data) {
    return new Promise(function (resolve, reject) {
        wx.getBLEDeviceCharacteristics({
            deviceId: data.deviceId,
            serviceId: data.serviceId,
            success: function (result) {
                resolve(result);
            },
            fail: function (error) {
                reject(error);
            }
        });
    });
};
exports.createBLEConnection = function (data) {
    return new Promise(function (resolve, reject) {
        wx.createBLEConnection({
            deviceId: data.deviceId,
            timeout: data.timeout,
            success: function (result) {
                resolve(result);
            },
            fail: function (error) {
                reject(error);
            }
        });
    });
};
exports.closeBLEConnection = function (data) {
    return new Promise(function (resolve, reject) {
        wx.closeBLEConnection({
            deviceId: data.deviceId,
            success: function (result) {
                resolve(result);
            },
            fail: function (error) {
                reject(error);
            }
        });
    });
};
exports.writeBLECharacteristicValue = function (data) {
    return new Promise(function (resolve, reject) {
        wx.writeBLECharacteristicValue(__assign({}, removeKeyword(data), { success: function (result) {
                resolve(result);
            },
            fail: function (error) {
                reject(error);
            } }));
    });
};
exports.addPhoneContact = function (data) {
    return new Promise(function (resolve, reject) {
        wx.addPhoneContact(__assign({}, removeKeyword(data), { success: function (result) {
                resolve(result);
            },
            fail: function (error) {
                reject(error);
            } }));
    });
};
exports.stopBluetoothDevicesDiscovery = function () {
    return new Promise(function (resolve, reject) {
        wx.stopBluetoothDevicesDiscovery({
            success: function (result) {
                resolve(result);
            },
            fail: function (error) {
                reject(error);
            }
        });
    });
};
exports.startBluetoothDevicesDiscovery = function (data) {
    return new Promise(function (resolve, reject) {
        wx.startBluetoothDevicesDiscovery(__assign({}, removeKeyword(data), { success: function (result) {
                resolve(result);
            },
            fail: function (error) {
                reject(error);
            } }));
    });
};
exports.openBluetoothAdapter = function () {
    return new Promise(function (resolve, reject) {
        wx.openBluetoothAdapter({
            success: function (result) {
                resolve(result);
            },
            fail: function (error) {
                reject(error);
            }
        });
    });
};
exports.onBluetoothDeviceFound = function (call) {
    wx.onBluetoothDeviceFound(call);
};
exports.onBluetoothAdapterStateChange = function (call) {
    wx.onBluetoothAdapterStateChange(call);
};
exports.getConnectedBluetoothDevices = function (data) {
    return new Promise(function (resolve, reject) {
        wx.getConnectedBluetoothDevices({
            services: data.services,
            success: function (result) {
                resolve(result);
            },
            fail: function (error) {
                reject(error);
            }
        });
    });
};
exports.getBluetoothDevices = function () {
    return new Promise(function (resolve, reject) {
        wx.getBluetoothDevices({
            success: function (result) {
                resolve(result);
            },
            fail: function (error) {
                reject(error);
            }
        });
    });
};
exports.getBluetoothAdapterState = function () {
    return new Promise(function (resolve, reject) {
        wx.getBluetoothAdapterState({
            success: function (result) {
                resolve(result);
            },
            fail: function (error) {
                reject(error);
            }
        });
    });
};
exports.closeBluetoothAdapter = function () {
    return new Promise(function (resolve, reject) {
        wx.closeBluetoothAdapter({
            success: function (result) {
                resolve(result);
            },
            fail: function (error) {
                reject(error);
            }
        });
    });
};
exports.getBatteryInfo = function () {
    return new Promise(function (resolve, reject) {
        wx.getBatteryInfo({
            success: function (result) {
                resolve(result);
            },
            fail: function (error) {
                reject(error);
            }
        });
    });
};
exports.setClipboardData = function (data) {
    return new Promise(function (resolve, reject) {
        wx.setClipboardData({
            data: data.data,
            success: function (result) {
                resolve(result);
            },
            fail: function (error) {
                reject(error);
            }
        });
    });
};
exports.getClipboardData = function () {
    return new Promise(function (resolve, reject) {
        wx.getClipboardData({
            success: function (result) {
                resolve(result);
            },
            fail: function (error) {
                reject(error);
            }
        });
    });
};
exports.stopHCE = function () {
    return new Promise(function (resolve, reject) {
        wx.stopHCE({
            success: function (result) {
                resolve(result);
            },
            fail: function (error) {
                reject(error);
            }
        });
    });
};
exports.startHCE = function (data) {
    return new Promise(function (resolve, reject) {
        wx.startHCE({
            aid_list: data.aid_list,
            success: function (result) {
                resolve(result);
            },
            fail: function (error) {
                reject(error);
            }
        });
    });
};
exports.sendHCEMessage = function (data) {
    return new Promise(function (resolve, reject) {
        wx.sendHCEMessage({
            data: data.data,
            success: function (result) {
                resolve(result);
            },
            fail: function (error) {
                reject(error);
            }
        });
    });
};
exports.onHCEMessage = function (call) {
    wx.onHCEMessage(call);
};
exports.getHCEState = function () {
    return new Promise(function (resolve, reject) {
        wx.getHCEState({
            success: function (result) {
                resolve(result);
            },
            fail: function (error) {
                reject(error);
            }
        });
    });
};
exports.onNetworkStatusChange = function (call) {
    wx.onNetworkStatusChange(call);
};
exports.getNetworkType = function () {
    return new Promise(function (resolve, reject) {
        wx.getNetworkType({
            success: function (result) {
                resolve(result);
            },
            fail: function (error) {
                reject(error);
            }
        });
    });
};
exports.setScreenBrightness = function (data) {
    return new Promise(function (resolve, reject) {
        wx.setScreenBrightness({
            value: data.value,
            success: function (result) {
                resolve(result);
            },
            fail: function (error) {
                reject(error);
            }
        });
    });
};
exports.setKeepScreenOn = function (data) {
    return new Promise(function (resolve, reject) {
        wx.setKeepScreenOn({
            keepScreenOn: data.keepScreenOn,
            success: function (result) {
                resolve(result);
            },
            fail: function (error) {
                reject(error);
            }
        });
    });
};
exports.onUserCaptureScreen = function (call) {
    wx.onUserCaptureScreen(call);
};
exports.getScreenBrightness = function (data) {
    return new Promise(function (resolve, reject) {
        wx.getScreenBrightness({
            success: function (result) {
                resolve(result);
            },
            fail: function (error) {
                reject(error);
            }
        });
    });
};
exports.makePhoneCall = function (data) {
    return new Promise(function (resolve, reject) {
        wx.makePhoneCall({
            phoneNumber: data.phoneNumber,
            success: function (result) {
                resolve(result);
            },
            fail: function (error) {
                reject(error);
            }
        });
    });
};
exports.stopAccelerometer = function () {
    return new Promise(function (resolve, reject) {
        wx.stopAccelerometer({
            success: function (result) {
                resolve(result);
            },
            fail: function (error) {
                reject(error);
            }
        });
    });
};
exports.startAccelerometer = function () {
    return new Promise(function (resolve, reject) {
        wx.startAccelerometer({
            success: function (result) {
                resolve(result);
            },
            fail: function (error) {
                reject(error);
            }
        });
    });
};
exports.onAccelerometerChange = function (call) {
    wx.onAccelerometerChange(call);
};
exports.stopCompass = function () {
    return new Promise(function (resolve, reject) {
        wx.stopCompass({
            success: function (result) {
                resolve(result);
            },
            fail: function (error) {
                reject(error);
            }
        });
    });
};
exports.startCompass = function () {
    return new Promise(function (resolve, reject) {
        wx.startCompass({
            success: function (result) {
                resolve(result);
            },
            fail: function (error) {
                reject(error);
            }
        });
    });
};
exports.onCompassChange = function (call) {
    wx.onCompassChange(call);
};
exports.stopDeviceMotionListening = function (data) {
    return new Promise(function (resolve, reject) {
        wx.stopDeviceMotionListening({
            success: function (result) {
                resolve(result);
            },
            fail: function (error) {
                reject(error);
            }
        });
    });
};
exports.startDeviceMotionListening = function (data) {
    return new Promise(function (resolve, reject) {
        wx.startDeviceMotionListening({
            interval: data.interval,
            success: function (result) {
                resolve(result);
            },
            fail: function (error) {
                reject(error);
            }
        });
    });
};
exports.onDeviceMotionChange = function (call) {
    wx.onDeviceMotionChange(call);
};
exports.stopGyroscope = function (data) {
    return new Promise(function (resolve, reject) {
        wx.stopGyroscope({
            success: function (result) {
                resolve(result);
            },
            fail: function (error) {
                reject(error);
            }
        });
    });
};
exports.startGyroscope = function (data) {
    return new Promise(function (resolve, reject) {
        wx.startGyroscope({
            interval: data.interval,
            success: function (result) {
                resolve(result);
            },
            fail: function (error) {
                reject(error);
            }
        });
    });
};
exports.onGyroscopeChange = function (call) {
    wx.onGyroscopeChange(call);
};
exports.onMemoryWarning = function (call) {
    wx.onMemoryWarning(call);
};
exports.scanCode = function (data) {
    return new Promise(function (resolve, reject) {
        wx.scanCode({
            onlyFromCamera: data.onlyFromCamera,
            scanType: data.scanType,
            success: function (result) {
                resolve(result);
            },
            fail: function (error) {
                reject(error);
            }
        });
    });
};
exports.vibrateShort = function (data) {
    return new Promise(function (resolve, reject) {
        wx.vibrateShort({
            success: function (result) {
                resolve(result);
            },
            fail: function (error) {
                reject(error);
            }
        });
    });
};
exports.vibrateLong = function (data) {
    return new Promise(function (resolve, reject) {
        wx.vibrateLong({
            success: function (result) {
                resolve(result);
            },
            fail: function (error) {
                reject(error);
            }
        });
    });
};
