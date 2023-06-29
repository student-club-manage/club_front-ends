<template>
  <el-form class="" :model="user" label-width="100px">
    <el-form-item label="用户名称"
      ><el-input v-model="user.name"></el-input
    ></el-form-item>
    <el-form-item label="用户性别"
      ><el-input v-model="user.sex"></el-input
    ></el-form-item>
    <!-- <quill-editor
      v-model="user.introduce"
      :options="editorOption"
    ></quill-editor> -->
    <el-form-item label="用户账号"
      ><el-input v-model="user.account"></el-input
    ></el-form-item>
    <el-form-item label="用户密码"
      ><el-input v-model="user.password"></el-input
    ></el-form-item>

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
      <el-button type="primary" @click="update">更新</el-button>
      <el-button @click="goBack">返回</el-button>
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
      imageUrl: "",
      fileList: [],
      file: { id: 0 },
      roleId: 0
    };
  },
  components: {
    props: ["id"]
  },
  methods: {
    get: function(id) {
      this.$axios.get("/api/users/" + id).then(res => {
        if (res.data.code == OK) {
          this.user = res.data.data;
        } else {
          this.$message({
            message: res.data.message,
            type: "error"
          });
        }
      });
    },
    update: function() {
      this.$axios
        .put("/api/users/", this.user)
        .then(res => {
          if (res.data.code == OK) {
            this.$message({
              message: "更新用户成功",
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
    var id = this.$route.query.id;
    this.get(id);
    this.getuserTypeList();
  },
  watch: {
    $route(to, from) {
      var id = this.$route.params.id;
      this.get(id);
      this.getuserTypeList();
    }
  }
};
</script>

<style scoped="scoped">
@import "../../css/common.css";
</style>
