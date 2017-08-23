<template>
  <div id="App" class="uk-width-1-1" namespace="App">
    <div class="uk-navbar uk-width-1-1">
        <app-header></app-header>
    </div>
     <div v-el:graph class="uk-width-1-1 uk-grid app-content clear-grid-margin">
      <svg width="1566px" height="854px"></svg>
    </div>
    <app-left-menu></app-left-menu>
  </div>
</template>
<script>
  import AppHeader from '../components/AppHeader.vue'
  import AppLeftMenu from '../components/AppLeftMenu.vue'
  import config from '../commons/config'
  import GraphChart from '../charts/GraphChart'
  import graph from '../../data/miserables.json' 

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
    components: { AppHeader, AppLeftMenu },
    ready () {
      this.graph = new GraphChart(this.$els.graph)
      this.graph.draw(graph)
    }
  }
</script>
<style lang="less" scoped>
  #App {
    height: 100%;
    width: 100%;
    .app-content {
      position: absolute;
      height: calc(~"100% - 35px");
      margin: 0;
      padding: 0;
      border: 1px solid #ddd;
      svg {
        background: #fcfcfc;
      }
      .app-content-left {
        height: 700px;
        background: #faa732;
      }
      .app-content-right {
        height: 700px;
        background: #2f6fad;
      }
    }
  }

</style>