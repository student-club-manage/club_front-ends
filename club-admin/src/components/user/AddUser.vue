<template>
  <el-form class="" :model="user" label-width="100px">
    <el-form-item label="用户名称"
      ><el-input v-model="user.name"></el-input
    ></el-form-item>
<<<<<<< Updated upstream
    <el-form-item label="用户性别">
      <el-select v-model="user.sex" placeholder="请选择性别">
        <el-option label="保密" value="0"></el-option>
        <el-option label="男" value="1"></el-option>
        <el-option label="女" value="2"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="用户账号"
      ><el-input v-model="user.account" placeholder="请输入您的邮箱"></el-input
    ></el-form-item>
    <el-form-item label="用户密码"
      ><el-input
        v-model="user.password"
        placeholder="请输入不少于6位数的密码"
      ></el-input
=======
    <el-form-item label="用户性别"
      ><el-input v-model="user.sex"></el-input
    ></el-form-item>
    <el-form-item label="用户账号"
      ><el-input v-model="user.account"></el-input
    ></el-form-item>
    <el-form-item label="用户密码"
      ><el-input v-model="user.password"></el-input
>>>>>>> Stashed changes
    ></el-form-item>
    <quill-editor
      v-model="user.introduce"
      :options="editorOption"
    ></quill-editor>

    <el-form-item label="用户类型" prop="userTypeId">
      <el-select v-model="user.userTypeId" placeholder="请选择用户类型">
        <el-option
          v-for="userType in userTypeList"
          :key="userType.id"
<<<<<<< Updated upstream
          :label="userType.roleName"
=======
          :label="userType.type"
>>>>>>> Stashed changes
          :value="userType.id"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="add">添加</el-button>
      <el-button>取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
const OK = 200;
export default {
  data() {
    return {
<<<<<<< Updated upstream
      user: {
        sex: "" // 设置初始值为空，这样在下拉框中没有默认选项
      },
=======
      user: {},
>>>>>>> Stashed changes
      userTypeList: [],
      editorOption: {
        placeholder: "输入用户简介：",
        // 编辑器的配置
        // something config
        theme: "snow"
      }
    };
  },
  methods: {
    add: function() {
      console.log(this.user);
<<<<<<< Updated upstream
      this.$axios
        .post("/api/users/", this.user)
        .then(res => {
          console.log(this.user);
          // this.$layer.msg(res.data);
          console.log(res.data);
          if (res.data.code == OK) {
            this.$message({
              message: "注册新用户成功",
              type: "success"
            });
            setTimeout(() => {
              this.$router.push({ name: "UserList" });
            }, 2000);
          } else {
            this.$message({
              message: res.data.message,
              type: "error"
            });
          }
        })
        .catch(function(error) {
          this.$message.error(error);
        });
=======
      this.$axios.post("/api/users/", this.user).then(res => {
        console.log(this.user);
        // this.$layer.msg(res.data);
        console.log(res.data);
        if (res.data.code == OK) {
          this.$message({
            message: "添加用户成功",
            type: "success"
          });
        } else {
          this.$message({
            message: res.data.message,
            type: "error"
          });
        }
      });
      this.$router.push({ name: "UserList" });
>>>>>>> Stashed changes
    },
    getuserTypeList: function() {
      this.$axios.get("/api/userRoles").then(res => {
        if (res.data.code == OK) {
<<<<<<< Updated upstream
          console.log(this.userTypeList);
=======
>>>>>>> Stashed changes
          this.userTypeList = res.data.data;
        } else {
          this.$message.error(res.data.data);
        }
      });
    }
  },
  created() {
    this.getuserTypeList();
  },
  watch: {
    $route(to, from) {
      this.getuserTypeList();
    }
  }
};
</script>

<style scoped="scoped"></style>
