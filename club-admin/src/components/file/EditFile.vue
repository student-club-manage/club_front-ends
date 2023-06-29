<template>
  <el-form class="" :model="file" label-width="80px">
    <el-form-item label="文件名称"
      ><el-input v-model="file.fileName" disabled></el-input
    ></el-form-item>
    <el-form-item label="下载文件"
      ><a
        :href="'http://192.168.43.162:8013/fileServer/' + file.filePath"
        class="download-link"
        >下载</a
      ></el-form-item
    >
    <el-form-item label="文件类型">
      <el-select v-model="fileTypeId" placeholder="请选择文件类型">
        <el-option
          v-for="fileType in fileTypeList"
          :key="fileType.id"
          :label="fileType.type"
          :value="fileType.id"
        >
        </el-option>
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
      file: {},
      fileTypeList: [],
      fileTypeId: 3
    };
  },
  components: {},
  methods: {
    get: function(id) {
      this.$axios.get("/api/files/" + id).then(res => {
        if (res.data.code == OK) {
          this.file = res.data.data;
        } else {
          this.$layer.msg(res.data.message, { icon: 5 });
        }
      });
    },

    update: function() {
      this.$axios
        .put(
          "/api/files/update/" + this.file.id + "/" + this.fileTypeId,
          this.file
        )
        .then(res => {
          if (res.data.code == OK) {
            this.$message.success("更新文章成功");
            this.$router.push({ name: "FileList" });
          } else {
            this.$message.error(res.data.message);
          }
        })
        .catch(function(error) {
          this.$message.error(error);
        });
    },
    getFileTypeList: function() {
      this.$axios.get("/api/fileTypes").then(res => {
        if (res.data.code == OK) {
          this.fileTypeList = res.data.data;
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
    this.getFileTypeList();
  },
  watch: {
    $route(to, from) {
      var id = this.$route.params.id;
      this.get(id);
    }
  }
};
</script>

<style scoped="scoped">
.download-link {
  color: #409eff; /* 链接颜色 */
  text-decoration: none; /* 移除下划线 */
  font-weight: bold; /* 字体加粗 */
  transition: all 0.3s ease; /* 平滑的过渡效果 */
}

.download-link:hover {
  color: #66b1ff; /* 鼠标悬停时的链接颜色 */
}
</style>
