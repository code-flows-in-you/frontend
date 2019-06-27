<template>
  <!-- <div id="app"> -->
    <el-container>
     <el-header style="height:100px"><router-view name="topbar"></router-view></el-header>
    <el-main><router-view></router-view></el-main>
    </el-container>
  <!-- </div> -->
</template>

<script>


export default {
  name: 'app',
  methods: {

  },
  created: function ()
  {
    //持久化登录

    this.$store.dispatch('getUserInfo')
    .then(response =>
    {
      console.log(response)
    })
    .catch(e =>
    {
      console.log(e.response)
    })
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

</style>
