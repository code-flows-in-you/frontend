<template>
  <div style="margin-left:200px;margin-right:200px;">
    <el-card class="box-card" shadow="never">
      <el-row>
        <el-col :span="4">
          <!-- <img src="../assets/avatar.png" height="50px"/> -->
          <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :auto-upload="false"
            :on-change="changeUpload"
          >
            <el-tooltip class="item" effect="dark" content="更换头像" placement="top-start">
              <img :src="userInfo.Avatar" class="avatar">
            </el-tooltip>
            <!-- <i v-else class="el-icon-plus avatar-uploader-icon"></i> -->
          </el-upload>
        </el-col>
        <el-col :span="20">
          <div style="font-size:28px;">{{ this.$store.state.user.Nickname }}</div>
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
        
        <el-card style="height:600px;" shadow="never">
          <el-menu
            :default-active="$route.path"
            router
            class="el-menu-demo"
            mode="horizontal"
            @select="handleSelect"
          >
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
        <el-card class="user-info" shadow="never">
          <div>user info</div>
          <div>姓名：{{ this.$store.state.user.RealName }}</div>
          <div>学号：{{ this.$store.state.user.StudentID }}</div>
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
  name: "profile",
  data() {
    return {
      activeIndex: "1",
      userInfo: {}

    };
  },
  methods: {
    handleSelect: function() {},
    // 获取用户信息
    getUserData: function() {
      this.userInfo = this.$store.state.user;
    },

    changeUpload(file) {
      const isJPG = file.raw.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
        return;
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
        return;
      }
      //请求修改头像
      const formData = new FormData();
      formData.append("file", file.raw);
      console.log(formData);
      this.$http
        .post("/api/account/avatar", formData)
        .then(response => {
          this.$message.success("修改成功");
          this.$store.dispatch("updateAvatar",response.data.url);
          this.getUserData();
        })
        .catch(e => {
          console.log(e);
        });

      return isJPG && isLt2M;
    }
  },
  mounted() {
    this.getUserData();
  }
};
</script>

<style scoped>
.el-row {
  margin-bottom: 8px;
}

.user-info {
  height: 500px;
  line-height: 20px;
  border-radius: 10px;
  text-align: center;
  box-shadow: 0px 0px 0px 0px rgba(170, 170, 170, 1);
  border: 1px solid rgba(204, 204, 204, 0.6);
}

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.cropper {
  width: auto;
  height: 300px;
}
</style>
