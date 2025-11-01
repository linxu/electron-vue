const { FusesPlugin } = require('@electron-forge/plugin-fuses');
const { FuseV1Options, FuseVersion } = require('@electron/fuses');
const path = require('path');

module.exports = {
  packagerConfig: {
    asar: true,
    // MAC图标
    // icon: './src/assets/icons/app.icns',
    // WIN图标
    // icon: 'D:\\linxu\\github\\electron-vue\\src\\assets\\icons\\app.ico',
    // 多平台图标（Windows: app.ico Linux: app.png Mac: app.icns）
    icon: path.join(__dirname, 'src', 'assets', 'icons', 'app')
  },
  rebuildConfig: {},
  publishers: [
    // {
    //   name: '@electron-forge/publisher-github',
    //   config: {
    //     repository: {
    //       owner: 'linxu',
    //       name: 'electron-vue'
    //     },
    //     prerelease: false,
    //     draft: false,
    //   }
    // },
    {
      name: '@electron-forge/publisher-electron-release-server',
      config: {
        baseUrl: 'http://127.0.0.1:8080',
        username: 'username',
        password: process.env.PASSWORD,// string
        // channel: 'stable',
        // flavor: 'test',
      }
    }
  ],
  makers: [
    {
      name: '@electron-forge/maker-squirrel',
      config: {
        // 2. 安装包图标的 URL（本地路径需用 `file://` 协议）
        // iconUrl: `file://${path.join(__dirname, 'icons', 'app.ico')}`,
        // 3. 安装程序（setup.exe）的图标
        setupIcon: path.join(__dirname, 'src/assets/icons/app.ico'),
        // setupIcon: './src/assets/icons/app.ico',
        // setupIcon: 'D:\\linxu\\github\\electron-vue\\src\\assets\\icons\\app.ico',
        // 4. 可选：卸载程序的图标（默认与 setupIcon 一致）
        // uninstallIcon: path.join(__dirname, 'icons', 'uninstall.ico'),
        // 可选：安装过程中显示的加载动画（.gif 格式，无需求可省略）
        // loadingGif: path.join(__dirname, 'assets/loading.gif'),
        // 可选：开始菜单快捷方式的名称（默认使用 package.json 中的 name）
        name: 'Electron.Vue',
      },
    },
    {
      name: '@electron-forge/maker-zip',
      platforms: ['darwin'],
    },
    {
      name: '@electron-forge/maker-deb',
      config: {
        icon: path.join(__dirname, 'icons', 'app.png'),
      },
    },
    {
      name: '@electron-forge/maker-rpm',
      config: {},
    },
    {
      name: '@electron-forge/maker-dmg',
      config: {
        icon: path.join(__dirname, 'src/assets/icons/app.icns'),
        // icon: './src/assets/icons/app.icns',
        // background: './assets/dmg-background.png',
        // format: 'ULFO'
      }
    }
  ],
  plugins: [
    {
      name: '@electron-forge/plugin-auto-unpack-natives',
      config: {},
    },
    {
      name: '@electron-forge/plugin-webpack',
      config: {
        mainConfig: './webpack.main.config.js',
        renderer: {
          config: './webpack.renderer.config.js',
          entryPoints: [
            {
              html: './src/index.html',
              js: './src/renderer.js',
              name: 'main_window',
              preload: {
                js: './src/preload.js',
              },
            },
          ],
        },
      },
    },
    // Fuses are used to enable/disable various Electron functionality
    // at package time, before code signing the application
    new FusesPlugin({
      version: FuseVersion.V1,
      [FuseV1Options.RunAsNode]: false,
      [FuseV1Options.EnableCookieEncryption]: true,
      [FuseV1Options.EnableNodeOptionsEnvironmentVariable]: false,
      [FuseV1Options.EnableNodeCliInspectArguments]: false,
      [FuseV1Options.EnableEmbeddedAsarIntegrityValidation]: true,
      [FuseV1Options.OnlyLoadAppFromAsar]: true,
    }),
  ],
};
