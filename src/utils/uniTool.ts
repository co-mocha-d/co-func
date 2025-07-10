// 声明uni
declare const uni: any;

/**
 * 判断微信浏览器
 */
export function isWechatBrowser() {
  //#ifdef H5
  let status = navigator.userAgent.toLowerCase();
  if (
    status.match(/MicroMessenger/i) &&
    status.match(/MicroMessenger/i)![0] === 'micromessenger'
  ) {
    //微信浏览器
    return true;
  } else {
    return false;
  }
  //#endif
}

/**
 * @description: 小程序更新提示
 */
export function xcxCheckUpdate() {
  const updateManager = uni.getUpdateManager();

  updateManager.onCheckForUpdate(function () {
    // 请求完新版本信息的回调
  });

  updateManager.onUpdateReady(function () {
    uni.showModal({
      title: '更新提示',
      content: '新版本已经准备好，是否重启应用？',
      success(res: any) {
        if (res.confirm) {
          // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
          updateManager.applyUpdate();
        }
      },
    });
  });

  updateManager.onUpdateFailed(function () {
    // 新的版本下载失败
  });
}

/**
 * @description: 保存图片到本地
 * @param {string} img 图片地址
 */
export function saveImage(img: string, callback?: (result: any) => void) {
  if (!img) return new Error('图片地址不能为空');

  // #ifdef MP-WEIXIN
  uni.getSetting({
    success(res: any) {
      // console.log(res.authSetting)
      const auths = res.authSetting;
      // 如果有读写相册权限，则保存图片，如果没有提示用户授权
      if (auths['scope.writePhotosAlbum']) {
        save(img)
          .then(() => {
            callback &&
              callback({
                code: 1,
                msg: '保存成功',
              });
          })
          .catch(() => {
            callback &&
              callback({
                code: 2,
                msg: '保存失败',
              });
          });
      } else {
        uni.showModal({
          title: '提示',
          content: '您已关闭小程序保存图片的权限！去开启权限？',
          success(res: any) {
            if (res.confirm) {
              uni.authorize({
                scope: 'scope.writePhotosAlbum',
                success: () => {
                  save(img)
                    .then(() => {
                      callback &&
                        callback({
                          code: 1,
                          msg: '保存成功',
                        });
                    })
                    .catch(() => {
                      callback &&
                        callback({
                          code: 2,
                          msg: '保存失败',
                        });
                    });
                },
                fail: () => {
                  openWritePhotosSetting()
                    .then(() => {
                      save(img)
                        .then(() => {
                          callback &&
                            callback({
                              code: 1,
                              msg: '保存成功',
                            });
                        })
                        .catch(() => {
                          callback &&
                            callback({
                              code: 2,
                              msg: '保存失败',
                            });
                        });
                    })
                    .catch(() => {
                      uni.showToast({
                        title:
                          '您已关闭相册读写权限，需手动点击右上角设置->打开相册使用权限',
                        icon: 'none',
                      });
                      callback &&
                        callback({
                          code: 0,
                        });
                    });
                },
              });
            } else if (res.cancel) {
              callback &&
                callback({
                  code: 0,
                  msg: '无权限',
                });
              console.log('取消授权');
            }
          },
        });
      }
    },
    fail() {
      callback &&
        callback({
          code: 0,
          msg: '获取授权失败',
        });
    },
  });
  // #endif

  // #ifdef APP-PLUS
  uni.saveImageToPhotosAlbum({
    filePath: img,
    success: () => {
      uni.showToast({
        title: '保存成功',
      });
    },
    fail: () => {
      uni.showToast({
        title: '保存失败',
        icon: 'none',
      });
    },
  });
  // #endif

  // #ifdef H5
  var a = document.createElement('a');
  // 检测是否以http 或者https开头
  if (img.indexOf('http') === 0 || img.indexOf('https') === 0) {
    a.href = img;
    a.download = img.replace(/(.*\/)*([^.]+.*)/gi, '$2').split('?')[0]; // 图片文件名
    var e = new MouseEvent('click', {
      bubbles: true,
      cancelable: false,
      view: window,
    });
    a.dispatchEvent(e);
    return;
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

export function openWritePhotosSetting() {
  return new Promise<void>((r, j) => {
    uni.openSetting({
      success: (authRes: any) => {
        const auths = authRes.authSetting;
        if (auths['scope.writePhotosAlbum']) {
          r();
        } else {
          j();
        }
      },
      fail: (err: any) => {
        j(err);
      },
    });
  });
}

export function save(img: string) {
  return new Promise<void>((r, j) => {
    uni.saveImageToPhotosAlbum({
      filePath: img,
      success: () => {
        uni.showToast({
          title: '保存成功',
        });
        r();
      },
      fail: () => {
        uni.showToast({
          title: '保存失败',
          icon: 'none',
        });
        j();
      },
    });
  });
}

export default {
  isWechatBrowser,
  xcxCheckUpdate,
  saveImage,
  openWritePhotosSetting,
  save,
};
