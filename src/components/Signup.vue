<template>
  <div id="sign-wrap">
    <el-row>
      <el-col :span="4" :offset="6">
        <img src="../assets/logo.png" height="50px">
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="6" :offset="4">
        <el-form :model="userForm" :rules="rules" ref="userForm" label-width="80px">
          <el-form-item label="用户名" prop="username">
            <el-input prefix-icon="el-icon-user" v-model="userForm.username" placeholder="请输入用户名"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input
              prefix-icon="el-icon-lock"
              v-model="userForm.password"
              placeholder="请设置密码"
              type="password"
            ></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="confirmPassword">
            <el-input
              prefix-icon="el-icon-lock"
              v-model="userForm.confirmPassword"
              placeholder="确认密码"
              type="password"
            ></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input prefix-icon="el-icon-message" v-model="userForm.email" placeholder="请输入邮箱"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button style="width:90%" type="primary" @click="Signup">注册</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <el-col :span="4" :offset="6">
      <div>
        已有账号？
        <el-button type="text" @click="goToSignin">登录</el-button>
      </div>
    </el-col>
  </div>
</template>

<script>
export default {
  name: "signup",
  data() {
    return {
      userForm: {
        username: "",
        telephone: "",
        email: "",
        password: "",
        nickname: "",
        confirmPassword: "",
        type: ""
      },
      rules: {
        username: [
          {
            required: true,
            message: "请输入用户名",
            trigger: "blur"
          },
          {
            min: 6,
            max: 12,
            message: "长度在 6 到 12 个字符",
            trigger: "blur"
          }
        ],
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
        password: [
          {
            required: true,
            message: "请设置密码",
            trigger: "blur"
          },
          {
            min: 6,
            max: 12,
            message: "长度在 6 到 18 个字符",
            trigger: "blur"
          }
        ],
        confirmPassword: [
          {
            required: true,
            message: "请确认密码",
            trigger: "blur"
          },
          {
            min: 6,
            max: 12,
            message: "长度在 6 到 18 个字符",
            trigger: "blur"
          }
        ]
      }
    };
  },
  mounted: function() {},
  methods: {
    Signup: function() {
      //检测确认密码是否一致
      if (this.userForm.password != this.userForm.confirmPassword) {
        this.$message.error("密码不一致");
        return;
      }

      let user = {
        email: this.userForm.email,
        password: this.userForm.password,
        gender: "male",
        nickname: this.userForm.username
      };

      //请求后台
      this.$store.dispatch("signup", user)
      .then(response => {
        console.log(response);
        this.$message.success("注册成功");
        this.$router.push("/signin");
      })
      .catch(e => {
        console.log(e.response);
        console.log(e.response.data.msg);
        if (e.response.data.msg == "repeat email")
        {
          this.$message.error("邮箱已被注册");
        }
      });



    },
    goToSignin: function() {
      this.$router.push("/signin");
    }
  }
};
</script>

<style scoped>
#sign-wrap {
  margin: auto;
}
</style>
