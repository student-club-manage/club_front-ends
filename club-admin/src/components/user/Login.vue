<template>
  <el-form
    :model="user"
    status-icon
    ref="user"
    label-width="100px"
    class="userForm"
  >
    <el-form-item label="账号"
      ><el-input v-model="user.account" placeholder="请输入你的邮箱"></el-input
    ></el-form-item>

    <el-form-item label="密码" prop="pass"
      ><el-input
        placeholder="请输入输入密码"
        type="password"
        v-model="user.password"
      ></el-input>
    </el-form-item>

    <el-form-item label="验证码">
      <el-input
        v-model="user.code"
        placeholder="请输入验证码"
        autocomplete="off"
      />
      <img :src="captchaUrl" alt="验证码" @click="refreshCode" />
    </el-form-item>

    <!-- <div><img :src="captchaUrl" alt="验证码" @click="refreshCode" /></div> -->
    <el-form-item>
      <el-button type="primary" @click="login">提交</el-button>
      <el-button @click="resetForm('user')">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
const OK = 200;
export default {
  data() {
    return {
      rules: {},
      user: {},
      code: "",
      token: "",
      captchaUrl: ""
    };
  },
  methods: {
    login: function() {
      this.$axios
        .post("/api/users/login", this.user)
        .then(res => {
          if (res.data.code == OK) {
            this.$cookies.set("token", res.data.data, 60 * 300);
            this.token = res.data.data;
            this.$axios
              .get("/api/users/getUser", {
                params: {
                  token: this.token
                }
              })
              .then(res => {
                this.userRole = res.data.data.roleId;
                if (this.userRole !== 4) {
                  setTimeout(() => {
                    this.$message({
                      message: "登陆成功",
                      type: "success"
                    });
                  }, 900);
                  this.$router.push({ name: "Home" });
                } else {
                  this.$message.error("您没有权限访问后台噢~");
                }
              });
          } else {
            this.$message.error(res.data.message);
            this.refreshCode();
          }
        })
        .catch(function(error) {
          this.$message.error(error);
        });
    },
    refreshCode: function() {
      this.captchaUrl = "/api/users/getKaptcha?time=" + new Date().getTime();
    },
    resetForm: function() {},
    tryToAminPage: function() {
      var token = this.$cookies.get("token");
      if (token != null) this.$router.push({ name: "Home" });
    }
  },
  created() {
    this.refreshCode();
  }
};
</script>

<style scoped="scoped">
.userForm {
  width: 550px;
  margin: 0 auto;
  padding: 80px;
}
</style>
