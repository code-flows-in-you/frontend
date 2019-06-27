<template>
  <div>
    <div class="wrapper">
      <el-row type="flex" justify="center">
        <img src="../assets/logo.png" height="50px">
      </el-row>
      <el-row>
        <el-col :span="22" :offset="1">
          <el-form :model="userForm" :rules="rules" ref="userForm" label-width="60px">
            <el-form-item label="邮箱" prop="email">
              <el-input type="text" v-model="userForm.email" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input type="password" v-model="userForm.password" autocomplete="off"></el-input>
            </el-form-item>
            <el-row>
              <el-form-item>
                <el-checkbox checked class="remember">记住密码</el-checkbox>
              </el-form-item>
            </el-row>
          </el-form>
          <el-row type="flex" justify="center">
            <el-button type="primary" style="width:70%;" @click="Signin">登录</el-button>
          </el-row>
          <el-col :offset="8">
            没有账号？去
            <el-button type="text" @click="goToSignup">注册</el-button>
          </el-col>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  name: "signin",
  created: function() {
    
  },
  beforeDestroy: function() {
    document.body.removeAttribute("class", "main");
  },
  data() {
    return {
      userForm: {
        email: "",
        password: ""
      },
      rules: {
        email: [
          {
            required: true,
            message: "请输入邮箱",
            trigger: "blur"
          },
          {
            pattern: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
            message: "请输入合法的邮箱",
            trigger: "blur"
          }
        ],
        password: {
          required: true,
          message: "请输入密码",
          trigger: "blur"
        }
      }
    };
  },
  mounted: function() {
    document.body.setAttribute("class","main");
  },
  methods: {
    Signin: function() {
      let user = {
        email: this.userForm.email,
        password: this.userForm.password
      };

      this.$store
        .dispatch("signin", user)
        .then(response => {
          console.log(response);
          this.$message.success("登录成功");
          this.$router.push("/");
        })
        .catch(e => {
          console.log(e.response);
          this.$message.error("用户名或密码不正确");
        });
    },
    goToSignup: function() {
      this.$router.push("/signup");
    },
    forgetPassword: function() {
      //to do
    }
  }
};
</script>

<style>
.main {
  background-image: url("../assets/船背景图.jpg");
  background-repeat: no-repeat;
  background-size: cover;
}
.wrapper {
  background-color: rgba(255, 255, 255, 0.5);
  width: 25%;
  margin-left: 10%;
  padding-top: 50px;
  padding-bottom: 50px;
  border-radius: 10px;
}
</style>
