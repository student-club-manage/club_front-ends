<template>
  <div v-if="userPage != null">
    <el-form :inline="true" size="small">
      <el-form-item label="用户名称">
        <el-input
          placeholder="请输入用户名称"
          prefix-icon="el-icon-search"
          v-model="userInfo.userName"
          class="input-with-select"
          width="120px"
        ></el-input>
      </el-form-item>
      <el-form-item label="用户类型">
        <el-select v-model="userInfo.roleId" placeholder="请选择用户类型">
          <el-option label="所有" value=""></el-option>
          <el-option
            v-for="userType in userTypeList"
            :key="userType.id"
            :label="getRole(userType.id)"
            :value="userType.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="find" icon="el-icon-search"
          >查询</el-button
        >
        <el-button
          class="add-user-btn"
          type="success"
          icon="el-icon-plus"
          @click="addPage"
          size="mini"
        >
          注册新用户
        </el-button>
        <el-button
          type="primary"
          icon="el-icon-refresh"
          circle
          @click="refresh"
        />
      </el-form-item>
    </el-form>
    <el-table :data="userData" stripe style="width:100%" size="mini" border>
      <el-table-column prop="id" label="id" width="90"></el-table-column>
      <el-table-column
        prop="name"
        label="用户姓名"
        width="90"
        :sortable="true"
      ></el-table-column>
      <el-table-column
        prop="sex"
        label="性别"
        width="90"
        :sortable="true"
      ></el-table-column>
      <el-table-column
        prop="account"
        label="用户账号"
        width="190"
        :sortable="true"
      ></el-table-column>
      <el-table-column
        prop="institute"
        label="学院"
        width="100"
        :sortable="true"
      ></el-table-column>
      <el-table-column
        prop="createTime"
        label="用户创建时间"
        width="180"
        :sortable="true"
      ></el-table-column>
      <el-table-column
        prop="lastLoginTime"
        label="最后次登录时间"
        width="180"
        :sortable="true"
      ></el-table-column>
      <el-table-column
        prop="roleId"
        label="角色"
        width="180"
        :sortable="true"
      ></el-table-column>
      <el-table-column
        prop="clubName"
        label="社团"
        width="180"
        :sortable="true"
      ></el-table-column>
      <el-table-column fixed="right" label="操作" width="270">
        <template slot-scope="scope">
          <el-button
            type="primary"
            icon="el-icon-edit"
            @click="editPage(scope.row)"
            size="mini"
            >编辑</el-button
          >
          <el-button
            type="danger"
            icon="el-icon-delete"
            @click="deleteUser(scope.row)"
            size="mini"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="page"
      background
      layout="total, sizes, prev, pager, next"
      :current-page.sync="currentPage"
      :total="userPage.total"
      @current-change="refreshuserPage"
      @size-change="handleSizeChange"
      :page-size="userPage.pageSize"
      :page-sizes="GLOBAL.pageSizeArray"
    ></el-pagination>
  </div>
</template>

<script>
const OK = 200;
export default {
  data() {
    return {
      userPage: {},
      userData: [],
      currentPage: 1,
      userSearch: {},
      userName: "",
      roleId: "",
      userTypeList: [],
      currentUsers: [],
      userInfo: {
        userName: "",
        roleId: ""
      },
      pageSize: this.GLOBAL.pageSize,
      clubUserList: []
    };
  },
  components: {},
  methods: {
    getRole: function(type) {
      switch (type) {
        case 1:
          return "超级管理员";
        case 2:
          return "社团负责人";
        case 3:
          return "社团助理";
        default:
          return "一般用户";
      }
    },
    getUserPage: function(pageNum, pageSize) {
      this.$axios
        .get("/api/users", {
          params: {
            pageNum: pageNum,
            pageSize: pageSize,
            roleId: this.roleId,
            userName: this.userName, // 添加 userName 到请求参数
            clubName: this.clubName
          }
        })
        .then(res => {
          if (res.data.code == OK) {
            this.userPage = res.data.data;
            this.userData = this.userPage.list;

            this.userPage.list.forEach(item => {
              console.log(item);
              item.roleId = this.getRole(item.roleId);
              item.lastLoginTime = item.lastLoginTime || "未知";
              item.institute = item.institute || "未记录";

              this.$axios.get(`/api/clubApply/userid/${item.id}`).then(res => {
                if (res.data.code === OK) {
                  this.clubUserList = res.data.data;

                  res.data.data.forEach(it => {
                    this.$axios.get(`/api/clubs/${it.clubId}`).then(tmp => {
                      if (tmp.data.code === OK) {
                        item.clubName = tmp.data.data.name || "未进入社团";
                      } else {
                        this.$message.error(tmp.data.data);
                      }
                    });
                  });
                } else {
                  this.$message.error(res.data.data);
                }
              });
            });
            this.pages = this.userPage.pages;
            this.total = this.userPage.total;
            this.currentPage = this.userPage.pageNum;
          } else {
            this.$message.error(res.data.data);
          }
        });
    },
    getNewsTypeList: function() {
      this.$axios.get("/api/users").then(res => {
        if (res.data.code == OK) {
          this.userRoleList = res.data.data;
        } else {
          this.$layer.alert(res.data.data);
        }
      });
    },
    getuserTypeList: function(id) {
      this.$axios.get("/api/userRoles").then(res => {
        if (res.data.code == OK) {
          this.userTypeList = res.data.data;
        } else {
          this.$message.error(res.data.data);
        }
      });
    },
    getClubNameByUserId: async function(id) {
      await this.$axios.get(`/api/clubApply/userid/${id}`).then(res => {
        if (res.data.code === OK) {
          this.clubUserList = res.data.data;
          const clubName = "";

          res.data.data.forEach(item => {
            const id = item.clubId;
            this.$axios.get(`/api/clubs/${id}`).then(tmp => {
              if (tmp.data.code === OK) {
                this.clubName = tmp.data.data.name;
                console.log("clubName:", tmp.data.data.name);
              } else {
                this.$message.error(tmp.data.data);
              }
            });
          });
          return clubName;
        } else {
          this.$message.error(res.data.data);
        }
      });
    },
    getClubNameByUserId: async function(id) {
      await this.$axios.get(`/api/clubApply/userid/${id}`).then(res => {
        if (res.data.code === OK) {
          this.clubUserList = res.data.data;

          res.data.data.forEach(item => {
            const id = item.clubId;
            this.$axios.get(`/api/clubs/${id}`).then(tmp => {
              if (tmp.data.code === OK) {
                this.clubName = tmp.data.data.name;
                console.log("clubName:", this.clubName);
              } else {
                this.$message.error(tmp.data.data);
              }
            });
          });
          // return res.data.data.clubName;
        } else {
          this.$message.error(res.data.data);
        }
      });
    },
    editPage: function(row) {
      var id = row.id;
      this.getClubNameByUserId(id);
      this.$router.push({
        name: "EditUser",
        query: {
          id: id,
          clubName: this.clubName
        }
      });
    },
    addPage: function() {
      this.$router.push({ name: "AddUser" });
    },
    daleteDao: function(id) {
      this.$axios.delete("/api/users/" + id).then(res => {
        if (res.data.code == OK) {
          this.$message.success("删除成功");
        } else {
          this.$message.error(res.data.data);
        }
      });
    },
    deleteUser: function(row) {
      var num = row.id;
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.daleteDao(num);
        this.getUserPage(this.currentPage, 8);
      });
    },
    refreshuserPage: function() {
      this.currentPage = page;
      this.getUserPage(this.currentPage, 8);
    },
    handleSizeChange: function(size) {
      this.currentPage = page;
      this.getUserPage(page, this.pageSize);
    },
    find: function() {
      this.userInfo.userName = this.userInfo.userName || " ";
      this.userInfo.roleId = this.userInfo.roleId || " ";
      this.$axios
        .get(
          `/api/users/getByName_Role/${this.userInfo.userName}/${
            this.userInfo.roleId
          }`
        )
        .then(res => {
          const {
            status,
            data: { data }
          } = res;

          console.log(res);

          if (status === OK) {
            this.userData = data;
          } else {
            this.$message.error("查询失败");
          }
        });
    },
    refresh: function() {
      this.getuserTypeList();
      this.getUserPage(this.currentPage, 8);
    }
  },
  created() {
    this.getuserTypeList();
    this.getUserPage(this.currentPage, 8);
  }
};
</script>
<style scoped="scoped">
.add-user-btn {
  background-color: #42b983;
  border: 1px solid #42b983;
  color: #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin: 5px;
  padding: 8px 12px;
  font-weight: bold;
  border-radius: 4px;
  transition: all 0.3s ease;
}

.add-user-btn:hover {
  background-color: #35a16c;
  border-color: #35a16c;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

@import "../../css/common.css";
</style>
