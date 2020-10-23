<template>
  <div class="hello">
    <!-- 左侧菜单列表 -->
    <LeftMenu></LeftMenu>
    <div>
      <router-view ></router-view>
    </div>
  </div>
</template>

<script>
import LeftMenu from './left'
export default {
  name: 'HelloWorld',
  components:{
    LeftMenu
  },
  data () {
    return {
      msg: '我是主页面'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello{
  width: 100%;
  height: 100%;
  display: flex;
}
</style>
