import 'nprogress/nprogress.css'
import 'font-awesome/css/font-awesome.css'
import 'PLUGINS/uikit/css/uikit.min.css'
import 'PLUGINS/uikit/js/uikit.min.js'
import 'PLUGINS/jquery-extend/resize.js'
import 'PLUGINS/skyfutils.js'
import Vue from 'vue'
import App from '../apps/App.vue'
import Store from '../vuex/index'
import config from '../commons/config'
import frame from 'FRAME'

// TODO: 开发环境打开，生产环境需要注释掉
Vue.config.debug = true
Vue.config.devtools = true

Vue.use(frame)

const run = function () {
  // Vue实例中可直接通过v+Name访问对应模块，例如：this.vLogs访问logs模块
  frame.vueInstall({ module: 'v', name: 'config' }, config) // 在Vue实例中通过this.vConfig进行使

  // Vue.http.options.emulateHTTP = true
  // Vue.http.options.emulateJSON = true
  return new Vue({
    el: 'body',
    replace: false,
    components: {
      App
    },
    store: Store
  })
}

run()
