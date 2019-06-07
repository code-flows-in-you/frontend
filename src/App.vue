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
