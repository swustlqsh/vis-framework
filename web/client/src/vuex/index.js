import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/logger'
import * as types from './mutations'
import frame from 'FRAME'

// module mutations
Vue.use(Vuex)
// 在Vue实例中通过this.vxMutations进行使用
frame.vueInstall({ module: 'vx', name: 'mutations' }, types)

const state = {
  pageWidth: 0,
  pageHeight: 0,
  event: {},
  comparedMessage: {},
  selections: {},
  lassoArea: [],
  featureColors: [],
  pageSize: {
    pageWidth: 0,
    pageHeight: 0
  },
  selectedImage: {},
  addedFeatures: {},
  transedFeatures: {},
  hoveringEvent: {}
}

const mutations = Object.assign({})

export default new Vuex.Store({
  strict: true,
  state,
  mutations,
  plugins: [createLogger()]
})
