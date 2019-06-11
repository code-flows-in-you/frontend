<template>
<div>
  <el-row :gutter="20" style="height:50px;">
    <el-col :span="2" :offset="5">
      <img src="../assets/logo.png" height="50px"/>
    </el-col>
    <el-col :span="4" :offset="5">
      <el-select style="margin-top:10px;" v-model="searchText" multiple filterable placeholder="请输入关键词">
      </el-select>
    </el-col>
      <!-- <el-col :span="1">
      <el-button type="text">问卷</el-button>
    </el-col>
    <el-col :span="1">
      <el-button type="text">问答</el-button>
    </el-col> -->
    <el-col :span="4">
      <el-menu :default-active="$route.path" router mode="horizontal" @select="handleSelect">
        <el-menu-item index="/">全部</el-menu-item>
        <el-menu-item index="/quroa">问答</el-menu-item>
        <el-menu-item index="/survey">问卷</el-menu-item>
      </el-menu>
    </el-col>
    <el-col :span="1">
      <!-- <img src="../assets/avatar.png" /> -->
      <el-popover placement="top-start" width="40" trigger="hover">
        <el-row>
          <el-button type="text" icon="el-icon-user" @click="goToProfile">个人主页</el-button>
        </el-row>
        <el-row>
          <el-button type="text" icon="el-icon-switch-button" @click="logout">退出</el-button>
        </el-row>
        <el-button style="margin-top:10px;" slot="reference" icon="el-icon-user-solid" circle></el-button>
      </el-popover>
    </el-col>
  </el-row>
  <el-row :gutter="20" style="margin-bottom:50px;">
    <el-col :span="19" :offset="3">
      <el-menu :default-active="$route.path" router mode="horizontal" @select="handleSelect">
        <el-menu-item index="/quroa/technology">科技</el-menu-item>
        <el-menu-item index="/quroa/entertainment">娱乐</el-menu-item>
        <el-menu-item index="/quroa/cate">美食</el-menu-item>
        <el-menu-item index="/quroa/history">历史</el-menu-item>
        <el-menu-item index="/quroa/fashion">时尚</el-menu-item>
        <el-menu-item index="/quroa/sports">体育</el-menu-item>
        <el-menu-item index="/quroa/society">社会</el-menu-item>
        <el-submenu index="6">
          <template slot="title">更多</template>
          <el-menu-item index="6-1">选项1</el-menu-item>
          <el-menu-item index="6-2">选项2</el-menu-item>
          <el-menu-item index="6-3">选项3</el-menu-item>
        </el-submenu>
      </el-menu>
    </el-col>
  </el-row>
</div>
</template>

<script>
export default {
  name: 'topbar',
  data() {
    return {
      searchText: "",
    }
  },
  mounted: function () {},
  methods: {
    logout: function () {
      this.$http.delete('/api/account/session').then(
        response => {
          console.log(response)
          this.$message({
            message: '注销成功',
            type: 'success'
          }).catch(e => {
            console.log(e)
          })
        },error=>console.log(error.response)
      )
    },
    search() {},
    handleSelect() {},
    //跳转到个人主页
    goToProfile: function () {
      this.$router.push('/profile')
    }
  },
}
</script>

<style scoped>
/* 未生效，需调整 */
.item-list {
  opacity: 0.67;
  background-color: rgba(153, 204, 255, 1);
  text-align: center;
  box-shadow: 0px 5px 6px 0px rgba(170, 170, 170, 1);
}
</style>
