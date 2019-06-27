<template>
  <div style="margin-left:200px;margin-right:200px;">
    <el-card class="box-card" shadow="never">
      <el-row>
        <el-col :span="4">
          <el-upload
            class="avatar-uploader"
            action="fornone"
            :show-file-list="false"
            :auto-upload="false"
            element-loading-text="拼命上传中"
            element-loading-spinner="el-icon-loading"
            v-loading="avatarLoading"
            :on-change="changeUpload"
          >
            <el-tooltip class="item" effect="dark" content="更换头像" placement="top-start">
              <img :src="userInfo.Avatar" class="avatar">
            </el-tooltip>
          </el-upload>
        </el-col>
        <el-col :span="16" :offset="2">
          <div class="vcard-username">{{ this.$store.state.user.Nickname }}</div>
          <el-row style="margin-top:5%">
            <el-col :span="3">
              <div class="amount-num">{{amountData.answerCount}}</div>
            </el-col>
            <el-col :span="3">
              <el-divider direction="vertical"></el-divider>
            </el-col>
            <el-col :span="3">
              <div class="amount-num">{{amountData.bestCount}}</div>
            </el-col>
            <el-col :span="3">
              <el-divider direction="vertical"></el-divider>
            </el-col>
            <el-col :span="3">
              <div class="amount-num">{{amountData.assignmentCount}}</div>
            </el-col>
            <el-col :span="3">
              <el-divider direction="vertical"></el-divider>
            </el-col>
            <el-col :span="3">
              <div class="amount-num">{{ this.$store.state.coin }}</div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6">
              <div class="amount-item">回答数</div>
            </el-col>

            <el-col :span="6">
              <div class="amount-item">被采纳</div>
            </el-col>
            <el-col :span="6">
              <div class="amount-item">已求助</div>
            </el-col>
            <el-col :span="6">
              <div class="amount-item">我的余额</div>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </el-card>
    <el-row :gutter="20">
      <el-col :span="18">
        <el-card shadow="never">
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
          <div style="margin-top:15px;width:800px;height:500px;">
            <happy-scroll>
              <router-view></router-view>
            </happy-scroll>
          </div>
        </el-card>
      </el-col>

      <el-col :span="6">
        <el-card class="user-info" shadow="never">
          <div slot="header" class="clearfix">
            <span>我的信息</span>
          </div>

          <el-form
            :model="userInfo"
            status-icon
            ref="userForm"
            :rules="rules"
            :disabled="disableForm"
            label-width="85px"
            size="small"
            class="demo-ruleForm"
          >
            <el-form-item label="昵称" prop="Nickname">
              <el-input type="text" v-model="userForm.Nickname" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="姓名" prop="RealName">
              <el-input type="text" v-model="userForm.RealName" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop="Email">
              <el-input type="text" v-model="userForm.Email" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="大学" prop="College">
              <el-input type="text" v-model="userForm.College" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="专业" prop="Major">
              <el-input type="text" v-model="userForm.Major" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="性别" prop="Gender">
              <el-select v-model="userForm.Gender">
                <el-option label="男" value="male"></el-option>
                <el-option label="女" value="female"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="年级" prop="Grade">
              <el-input v-model="userForm.Grade"></el-input>
            </el-form-item>
            <el-form-item label="学号" prop="StudentID">
              <el-input v-model="userForm.StudentID"></el-input>
            </el-form-item>
          </el-form>
          <el-button type="primary" @click="enableEdit('userForm')">{{this.infoButtonText}}</el-button>
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
      userInfo: {},
      amountData: {},
      userForm: {},
      disableForm: true,
      infoButtonText: "修改信息",
      rules: {
        Nickname: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        RealName: [],
        Email: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          {
            pattern: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
            message: "请输入合法的邮箱",
            trigger: "blur"
          }
        ],
        College: [],
        Major: [],
        Grade: [
          {
            pattern: /^\d{4}$/,
            message: "请输入合法的年级，如2016",
            trigger: "blur"
          }
        ],
        StudentID: [
          { pattern: /^\d{8}$/, message: "请输入合法的学号", trigger: "blur" }
        ]
      },
      avatarLoading: false
    };
  },
  methods: {
    handleSelect: function() {},
    // 获取用户信息
    getUserData: function() {
      this.$store.dispatch("getUserInfo");
      this.userInfo = this.$store.state.user;
      this.userForm = this.$store.state.user;
      if (this.userForm.StudentID == 0) {
        this.userForm.StudentID = "未填写";
      }
    },
    enableEdit: function(formName) {
      if (this.disableForm) {
        this.disableForm = false;
        this.infoButtonText = "确认修改";
      } else {
        //请求修改个人信息

        this.$refs[formName].validate(valid => {
          if (valid) {
            console.log(this.userForm);
            this.$http
              .put("/api/account/self", this.userForm)
              .then(response => {
                this.$message.success("修改成功");
                //
                // this.getUserData();
                this.$store.dispatch("getUserInfo");
                this.userInfo = this.userForm;
              })
              .catch(e => {
                // this.$message.error("修改失败");
                console.log(e);
              });
            this.infoButtonText = "修改信息";
            this.disableForm = true;
          } else {
            this.userForm = this.userInfo;
            console.log("error submit!!");
            return false;
          }
        });
      }
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
      this.avatarLoading = true;
      const formData = new FormData();
      formData.append("file", file.raw);
      console.log(formData);
      this.$http
        .post("/api/account/avatar", formData)
        .then(response => {
          this.$message.success("修改成功");
          this.$store.dispatch("updateAvatar", response.data.url);
          this.getUserData();
          this.avatarLoading = false;
        })
        .catch(e => {
          console.log(e);
        });

      return isJPG && isLt2M;
    },
    getAmountData: function() {
      this.$http.get("/api/account/self/amount").then(
        response => {
          console.log(response.data);
          this.amountData = response.data;
          console.log(response);
        },
        response => console.log(response)
      );
    }
  },
  mounted() {
    this.getUserData();
    this.getAmountData();
  }
};
</script>

<style scoped>
.el-row {
  margin-bottom: 8px;
}

.user-info {
  height: 550px;
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

.amount-item {
  font-size: 18px;
  color: #606266;
}

.amount-num {
  margin-left: 15px;
  font-size: 18px;
  color: #303133;
}
</style>
