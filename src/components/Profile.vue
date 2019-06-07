<template>
<div style="margin-left:200px;margin-right:200px;">
  <el-card class="box-card">
    <el-row>
      <el-col :span="4">
        <img src="../assets/avatar.png" height="50px"/>
      </el-col>
        <el-col :span="20">
          <div style="font-size:28px;">username</div>
          <el-row>
            <el-col :span="6">
              <div>0</div>
            </el-col>
            <el-col :span="6">
              <div>0</div>
            </el-col>
            <el-col :span="6">

              <div>0</div>
            </el-col>
            <el-col :span="6">

              <div>1</div>
            </el-col>

          </el-row>
          <el-row>
            <el-col :span="6">
              <div>回答数</div>
            </el-col>
            <el-col :span="6">
              <div>被采纳</div>
            </el-col>
            <el-col :span="6">

              <div>已求助</div>
            </el-col>
            <el-col :span="6">
              <div>我的余额</div>
            </el-col>

          </el-row>
        </el-col>
    </el-row>
  </el-card>
  <el-row :gutter="20">
    <el-col :span="18">
      <el-card style="height:500px;">
        <el-menu :default-active="$route.path" router class="el-menu-demo" mode="horizontal" @select="handleSelect">
          <el-menu-item index="/profile/all">全部</el-menu-item>
          <el-menu-item index="/profile/survey">我的问卷</el-menu-item>
          <el-menu-item index="/profile/question">我的提问</el-menu-item>
          <el-menu-item index="/profile/answer">我的回答</el-menu-item>
          <el-menu-item index="/profile/balance">收益细则</el-menu-item>
        </el-menu>
         <router-view></router-view>
      </el-card>
      
    </el-col>
   
    <el-col :span="6">
      <el-card class="user-info">
        <div>user info</div>
        <div>姓名：李小涛</div>
        <div>学号：1234567</div>
        <div>年龄：20</div>
        <div></div>
        <div></div>

        <el-button>个人信息编辑</el-button>
      </el-card>
    </el-col>
  </el-row>
</div>
</template>

<script>
export default {
  name: 'profile',
  data() {
    return {
      activeIndex: '1',
    }
  },
  methods: {
    handleSelect: function () {

    }
  },
  mounted() {

  },
}
</script>

<style scoped>

 .el-row {
    margin-bottom: 8px;

  }


.user-info {
  height:500px;
  line-height: 20px;
  border-radius: 10px;
  text-align: center;
  box-shadow: 0px 0px 0px 0px rgba(170, 170, 170, 1);
  border: 1px solid rgba(204, 204, 204, 0.6);
}
</style>
