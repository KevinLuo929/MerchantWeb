<template>
  <div class="container">
    <span class="version">版本V1.2.3</span>
    <div class="align-center">
      <h2 class="header">AI云印系统操作台</h2>
      <p class="title">门店专属系统注册验证</p>
      <p class="sub-title">请输入门店ID数字</p>
      <el-form
        ref="loginForm"
        :model="loginForm"
        :rules="loginRules"
        class="login-form"
        auto-complete="on"
        label-position="left"
      >
        <el-input
          v-model="loginForm.username"
          placeholder=""
          class="width300px"
        ></el-input>
        <div class="align-center">
          <el-button
            :loading="loading"
            type="primary"
            style="width: 200px; margin-top: 30px"
            @click.native.prevent="handleLogin"
            >Login</el-button
          >
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import { validUsername } from "@/utils/validate";

export default {
  name: "Login",
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!validUsername(value)) {
        callback(new Error("Please enter the correct user name"));
      } else {
        callback();
      }
    };
    return {
      loginForm: {
        username: "12345",
      },
      loginRules: {
        username: [{ required: true, trigger: "blur" }],
      },
      loading: false,
      redirect: undefined,
    };
  },
  watch: {
    $route: {
      handler: function (route) {
        this.redirect = route.query && route.query.redirect;
      },
      immediate: true,
    },
  },
  methods: {
    showPwd() {
      if (this.passwordType === "password") {
        this.passwordType = "";
      } else {
        this.passwordType = "password";
      }
      this.$nextTick(() => {
        this.$refs.password.focus();
      });
    },
    handleLogin() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.loading = true;
          this.$store
            .dispatch("user/login", this.loginForm)
            .then(() => {
              this.$router.push({ path: this.redirect || "/" });
              this.loading = false;
            })
            .catch(() => {
              this.loading = false;
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
};
</script>

<style scoped>
.container {
  background-color: white;
  padding: 20px;
}
.align-center {
  text-align: center;
}
.version {
  color: rgba(255, 255, 255, 1);
  font-size: 10px;
  font-family: Helvetica;
}
.header {
  color: rgba(64, 219, 152, 1);
  font-size: 32px;
  font-family: PingFangSC-Regular;
}
.title {
  color: rgba(0, 0, 0, 1);
  font-size: 16px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
}
.sub-title {
  color: rgba(0, 0, 0, 1);
  font-size: 14px;
  font-family: PingFangSC-Regular;
}
.width300px {
  width: 300px;
}
</style>