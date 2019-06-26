<template>
  <div>
    <el-row :gutter="20" style="height:50px;">
      <el-col :span="2" :offset="5">
        <el-link href="/" :underline="false">
          <img src="../assets/logo.png" height="50px">
        </el-link>
      </el-col>
      <el-col :span="4" :offset="5">
        <el-select
          style="margin-top:10px;"
          v-model="searchText"
          multiple
          filterable
          placeholder="请输入关键词"
        ></el-select>
      </el-col>
      <el-col :span="3">
        <el-menu :default-active="$route.path" router mode="horizontal" @select="handleSelect">
          <el-menu-item index="/all">全部</el-menu-item>
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
            <el-button type="text" icon="el-icon-switch-button" @click="signout">退出</el-button>
          </el-row>
          <!-- <el-button style="margin-top:10px;" slot="reference" icon="el-icon-user-solid" @click="goToProfile" circle></el-button> -->
            <el-avatar size="large" slot="reference" style="margin-top:10px;" :src="this.$store.state.user.Avatar"></el-avatar>
        </el-popover>
      </el-col>
    </el-row>
    <el-row :gutter="20" style="margin-bottom:50px; margin-top:20px">
      <el-col :span="19" :offset="3">
      <el-divider></el-divider>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "topbar",
  data() {
    return {
      searchText: ""
    };
  },
  mounted: function() {},
  methods: {
    signout: function() {
      this.$store
        .dispatch("signout")
        .then(response => {
          console.log(response);
          this.$message.success("注销成功");
          this.$router.push("/signin");
        })
        .catch(e => {
          console.log(e.response);
        });
    },
    search() {},
    handleSelect() {},
    //跳转到个人主页
    goToProfile: function() {
      this.$router.push("/profile/all");
    }
  }
};
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
