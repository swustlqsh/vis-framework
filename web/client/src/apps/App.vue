<template>
  <div id="App" class="uk-width-1-1" namespace="App">
    <div class="uk-navbar uk-width-1-1">
        <app-header></app-header>
    </div>
    <div class="uk-width-1-1 uk-grid app-content clear-grid-margin">
      <div class="uk-width-1-2 app-content-left">
          <b>1/2 left content</b>
      </div>
      <div class="uk-width-1-2 app-content-right">
          <b>1/2 right content</b>
      </div>
    </div>
  </div>
</template>
<script>
  import AppHeader from '../components/AppHeader.vue'
  import config from '../commons/config'
  // import $ from 'jquery'

  import {} from '../vuex/getters'
  import {} from '../vuex/actions'

  let {debug} = config

  export default {
    vuex: {
      getters: {},
      actions: {}
    },
    data () {
      return {
        timer: false
      }
    },
    watch: {
    },
    components: { AppHeader },
    ready () {
      console.log('debug', debug)
    }
  }
</script>
<style lang="less" scoped>
  @import "./App.less";
  #App {
    height: 100%;
  }
  .app-content {
    height: 60%;
    width: 100%;
    margin: 0;
    padding: 0;
    border: 1px solid cornflowerblue;
    .app-content-left {
      height: 700px;
      background: #faa732;
    }
    .app-content-right {
      height: 700px;
      background: #2f6fad;
    }
  }
</style>