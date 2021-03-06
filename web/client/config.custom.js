/**
 * 初次使用，请首先配置
 * buildDist: {
 *   public: '', // script src 或 link href 链接静态文件时路径前缀（一般多为绝对路径），例如：/static/dist/
 *   bundle: '', // entry产生的文件路径（一般多为相对路径），例如：path.resolve(__dirname, 'path/to/your/static/dist')
 *   template: '' // html模板（一般多为相对路径），例如：path.resolve(__dirname, 'path/to/your/template')
 * }
 * 自定义配置, 有几点说明如下:
 * 1. 请合理使用`vendor`和`externals`, 目标是为了提高webpack性能和减少文件碎片化,
 *    说明: `externals`不会被watch, `vendor`会被watch
 *    注意: `externals`和`vendor`定义好之后, 请根据你的定义来控制其在模板中的加载顺序
 *
 * 2. 配置资源文件(externals, assets)路径时, 请写绝对路径, 比如favicon的路径为`/assets/images/favicon.png`
 *
 * 3. 配置`assets.css`时, 请务必确保CSS文件中没有外部资源引入比如: 引入字体, 引入图片等,
 *    注意: 通常该选项是针对体积较大且不包含资源引用的纯CSS文件, `assets`选项中的资源都不会被watch, 目标是为了提高webpack性能
 *
 * 4. 模板中的变量是有: `name`, `router`, `assets`, 其中`name`和`router`就是`entryArray`中的属性
 *    特殊说明: `assets`, 包含`(String)favicon`, `(Array)css`, `(Array)externals`, `(Object)webpack`
 *    `(String)favicon`: path
 *    `(Array)css`: [path1, path2, path3, ...]
 *    `(Array)externals`: [path1, path2, path3, ...]
 *    `(Array)webpack`: 请参照根目录的`webpack-assets.json`
 */
var path = require('path')
var localConfig = require('./local.config')
var PACKAGE_JSON = require('./package.json')

var config = {
  esLint: true, // 是否开启js代码检验
  styleLint: true, // 是否开启样式代码检验
  styleHash: true, // 是否开启样式Hash(避免样式名称重复)
  defineVars: null, // 通过DefinePlugin定义的变量, 用于在编译环境中使用, 通过process.SkyEye.defineVars进行访问
  // 入口文件
  entryArray: [ {
    name: 'index',
    router: [ '/', '/page', '/page/*' ]
  }, {
    name: 'index.test',
    router: [ '/mochatest/index' ]
  } ],
  // 公共资源
  // 通常用于第三方体积较小的包
  vendor: [
    'lodash',
    'nprogress',
    'page',
    'postal',
    'vue',
    'vuex'
  ],
  // 外部资源
  // 通常用于第三方体积较大的包, 比如jquery
  // 请注意引入的顺序, 尤其是针对有依赖的
  externals: [
    {
      package: 'jquery',
      var: 'window.$',
      path: '/node_modules/jquery/dist/jquery.min.js',
      chunk: [ 'index', 'index.test' ],
      CDN: false
    },
    {
      package: 'jquery-ui',
      var: 'window.$',
      path: '/plugins/jquery-ui-1.12.1/jquery-ui.min.js',
      chunk: [ 'index', 'index.test' ],
      CDN: false
    },
    {
      package: 'd3',
      var: 'window.d3',
      path: '/node_modules/d3/build/d3.min.js',
      chunk: [ 'index', 'index.test' ],
      CDN: false
    },
    {
      package: 'moment',
      var: 'window.moment',
      path: '/node_modules/moment/min/moment.min.js',
      chunk: [ 'index', 'index.test' ],
      CDN: false
    },
    {
      package: 'mocha',
      var: 'mocha',
      path: '/plugins/mocha/mocha.js',
      chunk: [ 'index.test' ]
    }, {
      package: 'chai',
      var: 'chai',
      path: '/plugins/mocha/chai.js',
      chunk: [ 'index.test' ]
    }],
  // 变量提供, 对于一些非模块化的包, 为了解决模块化引入时包依赖加载的问题, 需要将该包暴露到全局变量
  // 比如`'$': 'jquery'`, 全局变量为`$`, 包名为`jquery`, 有些时候为了可靠性还需要暴露几种常见的名称
  provide: {
    // '$': 'jquery',
    // 'window.$': 'jquery',
    // 'jQuery': 'jquery',
    // 'window.jQuery': 'jquery',
    // 'd3': 'd3',
    // 'window.d3': 'd3',
    // '_': 'lodash',
    // 'window._': 'lodash'
  },
  // 静态资源favicon和css, 直接通过`<link>`标签引入不需要在模块中引入, 不会被打包进对应的bundle
  assets: {
    favicon: [ {
      path: '/assets/images/favicon.png',
      chunk: [ 'index', 'index.test' ],
      CDN: false
    } ],
    css: [ {
      path: '/plugins/mocha/mocha.css',
      chunk: [ 'index.test' ],
      CDN: false
    } ]
  },
  // 资源重定向, `key`要区别于普通字符, 配置参考webpack alias http://webpack.github.io/docs/configuration.html#resolve
  alias: {
    'FRAME': 'frame',
    'COMPONENTS': 'src/components',
    'COMMONS': 'src/commons',
    'ENGINES': 'src/engines',
    'PLUGINS': 'plugins',
    'RESOURCE': 'resource',
    'VUEX': 'src/vuex',
  },
  // pro编译输出文件相关路径配置, 请填写绝对路径
  buildDist: {
    // public: '/vastchallenge/2017/mc3/static/', // script src 或 link href 链接静态文件时路径前缀 发布的是够
    public: '/static/', // script src 或 link href 链接静态文件时路径前缀
    bundle: path.resolve(__dirname, '../public/static'), // entry产生的文件
    template: path.resolve(__dirname, '../public/templates') // html模板
  },
  devServer: localConfig.devServer,
  PACKAGE_JSON: PACKAGE_JSON
}
module.exports = config
