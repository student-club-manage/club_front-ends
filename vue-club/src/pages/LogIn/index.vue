<script>
const OK = 200
export default {
  data() {
    return {
      rules: {},
      user: {},
      code: '',
      token: '',
      captchaUrl: ''
    }
  },
  methods: {
    login: function() {
      this.$axios
        .post('/other/users/login1', this.user)
        .then(res => {
          // this.$layer.msg(res.data);
          if (res.data.code === OK) {
            this.$message.success('登录成功')
            console.log('user', res.data)
          } else {
            this.$message.error(res.data.message)
            this.refreshCode()
          }
        })
        .catch(function(error) {
          this.$message.error(error)
        })
    },
    refreshCode: function() {
      this.captchaUrl = '/other/users/getKaptcha?time=' + new Date().getTime()
    },
    resetForm: function() {},
    tryToAminPage: function() {
      var token = this.$cookies.get('token')
      if (token != null) this.$router.push({ name: 'Home' })
    }
  },
  created() {
    this.refreshCode()
  }
}
</script>

<template>
  <div class="justify-between page">
    <div class="flex-col group">
      <div class="flex-col items-start group_2">
        <div class="flex-row group_17">
          <span class="text_3">Welcome</span>
          <span class="text_4">back! Please login to your account.</span>
        </div>
      </div>
      <el-form
        :model="user"
        status-icon
        ref="user"
        label-width="100px"
        class="userForm"
      >
        <el-form-item label="账号"
          ><el-input
            v-model="user.account"
            placeholder="请输入你的邮箱"
          ></el-input
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

        <el-form-item>
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="primary" @click="resetForm('user')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="flex-col section_3">
      <img
        src="https://codefun-proj-user-res-1256085488.cos.ap-guangzhou.myqcloud.com/6266504e5a7e3f03106ffb8e/6274b8cb3051170011fb085d/16527963987939193108.png"
        class="image_7 picture image-jjq67nzE"
      />
    </div>
  </div>
</template>

<style scoped>
* {
  box-sizing: border-box;
  flex-shrink: 0;
  border: none;
  text-decoration: none;
}

.flex-row {
  display: flex;
  flex-direction: row;
}

.flex-col {
  display: flex;
  flex-direction: column;
}

.justify-between {
  display: flex;
  justify-content: space-between;
}

.items-start {
  display: flex;
  align-items: flex-start;
}

.userForm {
  width: 550px;
  margin: 0 auto;
  padding: 80px;
}

.page {
  width: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  height: 100%;
  justify-content: center;
  align-items: center;
}
.group {
  margin-top: 0;
  width: 720px;
  justify-content: center;
  align-items: center;
  align-self: center;
  max-width: 1200px;
}
.group_2 {
  margin-top: 110.85px;
}
.image_7 {
  margin-top: 63.5px;
  width: 839px;
  height: 583px;
  transition: 1.5s cubic-bezier(0.075, 0.82, 0.165, 1);
}
.group_17 {
  margin-left: 7.54px;
}
.image-jjq67nzE:hover {
  transform: translateX(50px);
}
.image-jjq67nzE:checked {
  transform: translateX(50px);
}
</style>
