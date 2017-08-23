<template>
  <!-- content left -->
  <div class="content-left-wraper">
     <h3 class="left-subtitle">{{messages}}</h3>
     <div class="nav-side">
       <ul class="nav-side-list">
          <span class="nav-header">Favorite Graphs</span>
          <li id="TEST1"><a href="#HB/blckhole">HB/TEST1</a></li>
       </ul>
     </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        messages: 'Select Graph: '
      }
    },
    ready () {}
  }
</script>
<style lang="less" scoped>
  .content-left-wraper {
    height: calc(~"100% - 40px");
    width: 170px;
    position: absolute;
    top: 30px;
    padding-top: 10px;
    margin-bottom: 0;
    margin-left: 0;
    background-color: #f5f5f5;
    .left-subtitle {
      padding-left: 6px;
      border-left: 3px solid #324057;
      font-size: 15px;
      line-height: 15px;
      text-transform: uppercase;
    }
    .nav-side {
      .nav-side-list {
        padding-right: 15px;
        padding-left: 15px;
        margin-bottom: 0;
        list-style: none;
        .nav-header {
          margin-right: -15px;
          margin-left: -15px;
          display: block;
          padding: 3px 15px;
          font-size: 11px;
          font-weight: bold;
          line-height: 18px;
          color: #999;
          text-shadow: 0 1px 0 rgba(255, 255, 255, 0.5);
          text-transform: uppercase;
        }
        li {
          line-height: 18px;
          a {
            display: block;
            color: #08c;
            text-decoration: none;
          }
          a:hover {
            background: #999;
          }
        }
      }
    }
  }

</style>