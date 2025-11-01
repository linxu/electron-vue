const { autoUpdater } = require('electron-updater'); 
const { dialog } = require('electron');
var os = require('os');

class UpdateManager {
  constructor() {
    // this.initUpdateConfig();
    this.bindUpdateEvents();
  }

  // 初始化更新配置（设置更新源）
  initUpdateConfig() {
    // 配置 GitHub 作为更新源（替换为你的仓库信息）
    // autoUpdater.setFeedURL({
    //   provider: 'github',
    //   owner: 'linxu',
    //   repo: 'electron-vue',
    //   releaseType: 'release', // 正式版，如需预发布版设为 'prerelease'
    // });
    // var url = 'http://127.0.0.1:8080/update/';
    // if (os.platform() === 'darwin') {
    //   url += 'osx_' + os.arch()
    // } else {
    //   url += os.platform() + '_' + os.arch()
    // }
    // autoUpdater.setFeedURL({
    //   provider: 'generic',
    //   url: url
    // });
    // this.bindUpdateEvents();
  }

  // 绑定更新相关事件
  bindUpdateEvents() {
    // 发现可用更新
    autoUpdater.on('update-available', (info) => {
      dialog.showMessageBox({
        type: 'info',
        title: '发现更新',
        message: `检测到新版本 v${info.version}，是否立即下载？`,
        buttons: ['立即下载', '稍后再说']
      }).then(({ response }) => {
        if (response === 0) {
          // 用户选择下载，开始下载更新
          autoUpdater.downloadUpdate();
        }
      });
    });

    // 更新下载完成
    autoUpdater.on('update-downloaded', (info) => {
      dialog.showMessageBox({
        type: 'info',
        title: '更新完成',
        message: `新版本 v${info.version} 已下载完成，是否立即重启应用？`,
        buttons: ['立即重启', '稍后重启']
      }).then(({ response }) => {
        if (response === 0) {
          // 退出并安装更新
          autoUpdater.quitAndInstall();
        }
      });
    });

    // 无可用更新
    autoUpdater.on('update-not-available', () => {
      dialog.showMessageBox({
        type: 'info',
        title: '已是最新版',
        message: '当前应用已是最新版本，无需更新。'
      });
    });

    // 更新错误
    autoUpdater.on('error', (err) => {
      console.error('更新失败:', err);
      dialog.showMessageBox({
        type: 'error',
        title: '更新失败',
        message: `更新过程出错：${err.message || '未知错误'}`
      });
    });
  }

  // 手动检查更新（供外部调用）
  checkForUpdates() {
    autoUpdater.checkForUpdates();
  }
}

// 导出单例实例（确保全局唯一）
module.exports = new UpdateManager();