<template>
  <el-form class="" :model="club" label-width="80px">
    <el-form-item label="社团编号"
      ><el-input v-model="club.num"></el-input
    ></el-form-item>
    <el-form-item label="社团名称"
      ><el-input v-model="club.name"></el-input
    ></el-form-item>
    <el-form-item label="社团创建时间"
      ><el-date-picker
        type="date"
        placeholder="选择日期"
        v-model="club.createTime"
      ></el-date-picker
    ></el-form-item>
    <quill-editor
      v-model="club.introduce"
      ref="myQuillEditor"
      :options="editorOption"
      @blur="onEditorBlur($event)"
      @focus="onEditorFocus($event)"
      @change="onEditorChange($event)"
    ></quill-editor>
    <el-upload
      style="margin: 20px;"
      ref="upload"
      class="upload-demo"
      :action="'/api/files/uploadImg?relativePath=' + relativePath"
      :on-change="handleChange"
      :file-list="fileList"
      :on-remove="beforeRemove"
      :auto-upload="false"
    >
      <el-button slot="trigger" size="small" type="primary">选取图片</el-button>
      <div slot="tip" class="el-upload__tip">
        选择要上传的图片，且不超过1M
      </div>
    </el-upload>
    <el-form-item label="社团类型">
      <el-select v-model="club.clubTypeId" placeholder="请选择社团类型">
        <el-option
          v-for="clubType in clubTypeList"
          :key="clubType.id"
          :label="clubType.type"
          :value="clubType.id"
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
      club: {},
      clubTypeList: [],
      editorOption: {
        placeholder: "输入社团简介：",
        // 编辑器的配置
        // something config
        theme: "snow"
      },
      relativePath: "/images/club/",
      imageUrl: "",
      fileList: [],
      file: { clubId: 0 }
    };
  },
  components: {
    props: ["id"]
  },
  methods: {
    handleChange: function(file, fileList) {
      let response = file.response;
      if (response != null && response.code == OK) {
        this.file.fileName = this.club.num;
        this.file.filePath = response.data;
        this.saveFile();
        this.$message.success("上传文件成功");
      }
      this.fileList = fileList.slice(-3);
    },

    handlePreview: function(file) {},
    saveFile: function() {
      this.$axios.post("/api/files/club", this.file).then(res => {
        if (res.data.code === OK) {
        } else {
          this.$message({
            message: res.data.message,
            type: "error"
          });
        }
      });
    },
    handleExceed: function(files, fileList) {
      this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      );
    },
    beforeRemove: function(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    getFileName: function(filePath) {
      var fileName = null;
      if (filePath != null) {
        if (filePath.indexOf("/") != -1) {
          fileName = filePath.substring(filePath.lastIndexOf("/") + 1);
        }
      }
      return fileName;
    },
    add: function() {
      this.$axios.post("/api/clubs/", this.club).then(res => {
        if (res.data.code == OK) {
          this.file.clubId = res.data.data;
          this.$refs.upload.submit();
          setTimeout(() => {
            this.$message({
              message: "添加社团成功",
              type: "success"
            });
          }, 900);
          setTimeout(() => {
            this.$router.push({ name: "ClubList" });
          }, 1500);
        } else {
          this.$message({
            message: res.data.message,
            type: "error"
          });
        }
      });
    },
    getClubTypeList: function() {
      this.$axios.get("/api/clubTypes").then(res => {
        if (res.data.code == OK) {
          this.clubTypeList = res.data.data;
        } else {
          this.$message.error(res.data.data);
        }
      });
    },
    onEditorBlur() {
      //失去焦点事件
    },
    onEditorFocus() {
      //获得焦点事件
    },
    onEditorChange() {
      //内容改变事件
    }
  },
  created() {
    this.getClubTypeList();
  },
  watch: {
    $route(to, from) {
      var id = this.$route.params.id;
    }
  }
};
</script>

<style scoped="scoped"></style>
