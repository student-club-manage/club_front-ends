<template>
  <el-table :data="userRoleList" stripe style="width:100%" border size="mini">
    <el-table-column prop="id" label="角色id"></el-table-column>
    <el-table-column prop="roleName" label="用户角色名称"></el-table-column>
    <el-table-column fixed="right" label="操作" width="360">
      <template slot-scope="scope">
        <el-button
          type="primary"
          icon="el-icon-edit"
          @click="editPage(scope.row)"
          size="mini"
          >编辑</el-button
        >
        <el-button
          type="success"
          icon="el-icon-plus"
          @click="addPage()"
          size="mini"
          >添加</el-button
        >
        <el-button
          type="danger"
          icon="el-icon-delete"
          @click="deletePassage(scope.row)"
          size="mini"
          >删除</el-button
        >
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
const OK = 200;
export default {
  data() {
    return {
      userRoleList: [],
      activeIndex: "1"
    };
  },
  methods: {
    getNewsTypeList: function() {
      this.$axios.get("/api/userRoles").then(res => {
        if (res.data.code == OK) {
          this.userRoleList = res.data.data;
        } else {
          this.$layer.alert(res.data.data);
        }
      });
    },
    editPage: function(row) {
      var id = row.id;
      console.log(row.id);
      this.$router.push({ name: "EditUserRole", query: { id: id } });
    },
    addPage() {
      // 弹出添加表单
      this.$layer.open({
        type: 1,
        title: "添加用户角色",
        content: "<user-role-form></user-role-form>",
        area: ["400px", "300px"]
      });
    },
    deletePassage: function(row) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$axios
            .delete(`/api/userRoles/${row.id}`)
            .then(response => {
              if (response.data.code === OK) {
                this.$message.success("删除成功");
                this.getNewsTypeList(); // 刷新列表
              } else {
                this.$message.error("删除失败");
              }
            })
            .catch(error => {
              console.error(error);
              this.$message.error("删除失败");
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  },
  created() {
    this.getNewsTypeList();
  }
};
</script>

<style scoped="scoped">
.news-list li {
  height: 32px;
  line-height: 32px;
}

.news-list li > a {
  display: inline-block;
  width: 270px;
  height: 32px;
  line-height: 32px;
  margin: 2px 25px;
  text-align: left;

  -webkit-line-clamp: 1;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  white-space: normal;
}
.router-link-exact-active.router-link-active {
  display: block;
  width: 100%;
  background-color: #1F51FF;
}
</style>
