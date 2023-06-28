<template>
  <div v-if="clubPage != null">
    <el-form :inline="true" size="small">
      <el-form-item label="用户">
        <el-input
          placeholder="请输入用户Id"
          prefix-icon="el-icon-search"
          v-model="userId"
          class="input-with-select"
          width="120px"
        ></el-input>
      </el-form-item>
      <el-form-item label="社团类型">
        <el-select v-model="clubTypeId" placeholder="请选择社团类型">
          <el-option label="所有" value=""></el-option>
          <el-option
            v-for="clubType in clubTypeList"
            :key="clubType.id"
            :label="clubType.type"
            :value="clubType.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="find" icon="el-icon-search"
          >查询</el-button
        >
      </el-form-item>
    </el-form>
    <el-table
      :data="clubData"
      stripe
      style="width:100%"
      :height="GLOBAL.tableHeight"
      border
      size="mini"
    >
      <el-table-column
        prop="userId"
        label="用户Id"
        :sortable="true"
      ></el-table-column>
      <el-table-column
        prop="clubId"
        label="社团Id"
        :sortable="true"
      ></el-table-column>
      <el-table-column
        prop="isJoin"
        label="是否通过"
        width="140"
        :sortable="true"
      ></el-table-column>
      <el-table-column fixed="right" label="操作">
        <template slot-scope="scope">
          <el-button
            :disabled="!scope.row.operation"
            type="primary"
            icon="el-icon-success"
            @click="setAdmit(scope.row)"
            size="mini"
            >同意</el-button
          >
          <el-button
            :disabled="!scope.row.operation"
            type="danger"
            icon="el-icon-delete"
            @click="refuse(scope.row)"
            size="mini"
            >拒绝</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="page"
      background
      layout="total, sizes, prev, pager, next"
      :current-page.sync="currentPage"
      :total="clubPage.total"
      @current-change="refreshClubPage"
      @size-change="handleSizeChange"
      :page-size="pageSize"
      :page-sizes="GLOBAL.pageSizeArray"
    ></el-pagination>
  </div>
</template>

<script>
const OK = 200;
export default {
  data() {
    return {
      clubPage: {},
      input: "",
      token: null,
      clubData: [],
      clubTypeList: [],
      userId: null,
      clubTypeId: null,
      currentPage: 1,
      pageSize: this.GLOBAL.pageSize,
      adminInfo: null
    };
  },
  components: {},
  methods: {
    setAdmit: function(row) {
      this.$axios
        .put("/api/clubApply", {
          id: row.id,
          userId: row.userId,
          clubId: row.clubId,
          isJoin: 1
        })
        .then(res => {
          console.log(res);
          const {
            status,
            data: { data }
          } = res;

          if (status === OK) {
            this.$message.success("操作成功");
            row.operation = false;
          } else {
            this.$message.error(data);
          }
        });
    },
    refuse: function(row) {
      this.$axios
        .put("/api/clubApply", {
          id: row.id,
          userId: row.userId,
          clubId: row.clubId,
          isJoin: -1
        })
        .then(res => {
          console.log(res);
          const {
            status,
            data: { data }
          } = res;

          if (status === OK) {
            this.$message.success("操作成功");
            row.operation = false;
            row.isJoin = "已拒绝";
          } else {
            this.$message.error(data);
          }
        });
    },
    getClubPage: function(pageNum, pageSize) {
      this.$axios
        .get("/api/clubs", {
          params: {
            clubTypeId: this.clubTypeId,
            name: this.clubName,
            pageNum: pageNum,
            pageSize: pageSize
          }
        })
        .then(res => {
          if (res.data.code === OK) {
            this.clubPage = res.data.data;
            this.clubData = this.clubPage.list;
            this.pages = this.clubPage.pages;
          } else {
            this.$message.error(res.data.data);
          }
        });
    },
    editPage: function(row) {
      var num = row.num;
      this.$router.push({ name: "EditClub", query: { num: num } });
    },
    addPage: function() {
      this.$router.push({ name: "AddClub" });
    },
    deleteDao: function(clubId) {
      this.$axios.delete("/api/clubs/" + clubId).then(res => {
        if (res.data.code == OK) {
          this.$message.success("删除成功");
        } else {
          this.$message.error(res.data.data);
        }
      });
    },
    deleteClub: function(row) {
      var num = row.num;
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.deleteDao(num);
        this.getClubPage(this.currentPage, 8);
      });
    },
    find: function() {
      console.log(this.userId, this.clubTypeId);
    },
    refreshClubPage: function(page) {
      this.currentPage = page;
      this.getClubPage(page, this.pageSize);
    },
    handleSizeChange: function(size) {
      this.pageSize = size;
      this.getClubPage(this.currentPage, this.pageSize);
    },
    getClubTypeList: function() {
      this.$axios.get("/api/clubTypes").then(res => {
        if (res.data.code === OK) {
          this.clubTypeList = res.data.data;
        } else {
          this.$message.error(res.data.data);
        }
      });
    }
  },
  mounted() {
    this.getClubPage(this.currentPage, this.pageSize);
    this.getClubTypeList();
  },
  watch: {
    $route(to, from) {
      this.getClubPage(this.currentPage, this.pageSize);
    }
  },
  created() {
    this.token = this.$cookies.get("token");

    this.$axios
      .get("/api/users/getUser", {
        params: {
          token: this.token
        }
      })
      .then(res => {
        const { data, code } = res.data;

        if (code === OK) {
          this.adminInfo = data;
          this.$axios
            .get(`/api/clubApply/get_all_apply/${data.id}`)
            .then(res => {
              const {
                status,
                data: { data }
              } = res;

              if (status === OK) {
                console.log(data);
                data.forEach(item => {
                  if (item.isJoin === 0) {
                    item.isJoin = "待审核";
                    item.operation = true;
                  } else if (item.isJoin === 1) {
                    item.isJoin = "已加入";
                    item.operation = false;
                  } else if (item.isJoin === -1) {
                    item.isJoin = "已拒绝";
                    item.operation = false;
                  }
                });
                console.log(data);
                this.clubData = data;
              } else {
                this.$message.error(res.data.data);
              }
            });
        } else {
          this.$message.error(res.data.data);
        }
      });
  }
};
</script>
<style scoped="scoped">
.add-club-btn {
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

.add-club-btn:hover {
  background-color: #35a16c;
  border-color: #35a16c;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}
@import "../../css/common.css";
</style>
