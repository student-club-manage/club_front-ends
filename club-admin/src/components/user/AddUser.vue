<template>
  <el-form class="" :model="user" label-width="100px">
    <el-form-item label="用户名称"
      ><el-input v-model="user.name"></el-input
    ></el-form-item>
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
    ></el-form-item>
    <!-- <quill-editor
      v-model="user.introduce"
      :options="editorOption"
    ></quill-editor> -->

    <el-form-item label="用户类型" prop="roleId">
      <el-select v-model="user.roleId" placeholder="请选择用户类型">
        <el-option
          v-for="userType in userTypeList"
          :key="userType.id"
          :label="userType.roleName"
          :value="userType.id"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="add">添加</el-button>
      <el-button @click="goBack">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
const OK = 200;
export default {
  data() {
    return {
      user: {},
      userTypeList: [],
      editorOption: {
        placeholder: "输入用户简介：",
        // 编辑器的配置
        // something config
        theme: "snow"
      },
      roleId: 0
    };
  },
  methods: {
    add: function() {
      this.$axios
        .post("/api/users/", this.user)
        .then(res => {
          if (res.data.code == OK) {
            this.$message({
              message: "添加用户成功",
              type: "success"
            });
            setTimeout(() => {
              this.$router.push({ name: "UserList" });
            }, 1500);
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
    },
    getuserTypeList: function() {
      this.$axios.get("/api/userRoles").then(res => {
        if (res.data.code == OK) {
          this.userTypeList = res.data.data;
        } else {
          this.$message.error(res.data.data);
        }
      });
    },
    goBack: function() {
      this.$router.back(-1);
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
