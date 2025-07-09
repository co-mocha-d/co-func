/**
 * 判断微信浏览器
 */
export const isWechatBrowser = () => {
    //#ifdef H5
    let status = navigator.userAgent.toLowerCase()
    if (status.match(/MicroMessenger/i) == 'micromessenger') {
        //微信浏览器
        return true
    } else {
        return false
    }
    //#endif
}

/**
 * @description: 小程序更新提示
 */
export default function xcxCheckUpdate () {
    const updateManager = uni.getUpdateManager();

    updateManager.onCheckForUpdate(function (res) {
        // 请求完新版本信息的回调
    });

    updateManager.onUpdateReady(function (res) {
        uni.showModal({
            title: '更新提示',
            content: '新版本已经准备好，是否重启应用？',
            success (res) {
                if (res.confirm) {
                    // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
                    updateManager.applyUpdate();
                }
            }
        });

    });

    updateManager.onUpdateFailed(function (res) {
        // 新的版本下载失败
    });
}


/**
 * @description: 保存图片到本地
 * @param {string} img 图片地址
 */
export function saveImage (img, callback) {
    if (!img) return new Error('图片地址不能为空')

    // #ifdef MP-WEIXIN
    uni.getSetting({
        success (res) {
            // console.log(res.authSetting)
            const auths = res.authSetting
            // 如果有读写相册权限，则保存图片，如果没有提示用户授权
            if (auths['scope.writePhotosAlbum']) {
                save(img).then(res => {
                    callback && callback({
                        code: 1,
                        msg: '保存成功'
                    })
                }).catch(err => {
                    callback && callback({
                        code: 2,
                        msg: '保存失败'
                    })
                })
            } else {
                uni.showModal({
                    title: '提示',
                    content: '您已关闭小程序保存图片的权限！去开启权限？',
                    success (res) {
                        if (res.confirm) {
                            uni.authorize({
                                scope: 'scope.writePhotosAlbum',
                                success: () => {
                                    save(img).then(res => {
                                        callback && callback({
                                            code: 1,
                                            msg: '保存成功'
                                        })
                                    }).catch(err => {
                                        callback && callback({
                                            code: 2,
                                            msg: '保存失败'
                                        })
                                    })
                                },
                                fail: () => {
                                    openWritePhotosSetting().then(res => {
                                        save(img).then(res => {
                                            callback && callback({
                                                code: 1,
                                                msg: '保存成功'
                                            })
                                        }).catch(err => {
                                            callback && callback({
                                                code: 2,
                                                msg: '保存失败'
                                            })
                                        })
                                    }).catch(err => {
                                        uni.showToast({
                                            title: '您已关闭相册读写权限，需手动点击右上角设置->打开相册使用权限',
                                            icon: 'none'
                                        })
                                        callback && callback({
                                            code: 0
                                        })
                                    })
                                }
                            })

                        } else if (res.cancel) {
                            callback && callback({
                                code: 0,
                                msg: '无权限'
                            })
                            console.log('取消授权');
                        }
                    }
                })
            }
        },
        fail (err) {
            callback && callback({
                code: 0,
                msg: '获取授权失败'
            })
        }
    })
    // #endif

    // #ifdef APP-PLUS 
    uni.saveImageToPhotosAlbum({
        filePath: img,
        success: () => {
            uni.showToast({
                title: "保存成功"
            })

        },
        fail: (err) => {
            uni.showToast({
                title: "保存失败",
                icon: "none"
            })

        }
    })
    // #endif

    // #ifdef H5
    var a = document.createElement("a");
    // 检测是否以http 或者https开头
    if (img.indexOf('http') === 0 || img.indexOf('https') === 0) {
        a.href = img;
        a.download = img.replace(/(.*\/)*([^.]+.*)/gi, "$2").split("?")[0]; // 图片文件名
        var e = new MouseEvent("click", { bubbles: true, cancelable: false, view: window });
        a.dispatchEvent(e);
        return
    }

    // base64ToPath(img).then(path => {
    // 	a.href = path;
    // 	console.log('a.href=====',path)
    // 	a.download = path.replace(/(.*\/)*([^.]+.*)/gi, "$2").split("?")[0]; // 图片文件名
    // 	var e = new MouseEvent("click", {bubbles: true, cancelable: false, view: window});
    // 	a.dispatchEvent(e);
    // })
    // #endif
}