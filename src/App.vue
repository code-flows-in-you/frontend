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
      this.$router.beforeEach((to, from, next) =>
      {
        // router guard
        if (to.path != '/signin' && to.path != '/signup')
        {
          if (this.$store.getters.isSignedIn)
            next()
          else
            // if the user has not signen in,
            // he can only visit signin and signup
            next('/signin')
        }
        else
          next()
      })
      console.log(response)
    })
    .catch(e =>
    {
      //session expired
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
