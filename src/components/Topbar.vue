<template>
  <div class="header">
    <el-menu :default-active="$route.path" router class="el-menu-demo" mode="horizontal">
      <el-menu-item index="/article">首页</el-menu-item>
      <el-menu-item index="/admin/articleList">管理</el-menu-item>
      <el-menu-item v-show='this.admin.name!==loginUser' index="/admin/articleEdit">写文章</el-menu-item>
      <el-input type="text" placeholder="搜索一下" class='search' v-model="text" ></el-input>
         <el-button plain @click="search">搜索</el-button>
        <el-button plain @click="logout">注销 {{loginUser}}</el-button>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: 'topbar',
  mounted: function () {},
  methods: {
    logout: function () {
      this.$message({
        message: '注销成功',
        type: 'success'
      })
    },
    search() {
    }

  },
}
</script>
