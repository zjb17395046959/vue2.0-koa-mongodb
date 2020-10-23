<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
body,html,div,li,ul,p,img,h1,h3,h2,h4{
  margin: 0;
  padding: 0;
  list-style: none;
  vertical-align: middle;
}
body,html{
  height: 100%;
}
#app{
  height: 100%;
  width: 100%;
  box-sizing: border-box;
}

</style>
