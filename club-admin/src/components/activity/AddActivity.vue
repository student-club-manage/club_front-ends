<template>
  <el-form class="" :model="activity" label-width="100px">
    <el-form-item label="活动名称"
      ><el-input v-model="activity.activityName"></el-input
    ></el-form-item>
    <el-form-item label="活动举行时间">
      <el-date-picker
        format="yyyy 年 MM 月 dd 日"
        value-format="yyyy 年 MM 月 dd 日"
        type="date"
        placeholder="选择日期"
        v-model="activity.holdTime"
      ></el-date-picker>
    </el-form-item>
    <el-form-item label="活动地点"
      ><el-input v-model="activity.site"></el-input
    ></el-form-item>
    <quill-editor
      v-model="activity.introduce"
      :options="editorOption"
    ></quill-editor>
    <el-form-item>
      <el-upload
        ref="upload"
        class="upload-demo"
        :action="'/api/files/uploadImg?relativePath=' + relativePath"
        :on-change="handleChange"
        :file-list="fileList"
        :on-remove="beforeRemove"
        :auto-upload="false"
      >
        <el-button slot="trigger" size="small" type="primary"
          >选取图片</el-button
        >
        <div slot="tip" class="el-upload__tip">
          选择要上传的图片，且不超过1M
        </div>
      </el-upload>
    </el-form-item>
    <el-form-item label="所属社团" prop="activityTypeId">
      <el-select v-model="activity.activityTypeId" placeholder="请选择社团类型">
        <el-option
          v-for="clubList in clubTypeList"
          :key="clubList.num"
          :label="clubList.name"
          :value="clubList.num"
        ></el-option>
      </el-select>
    </el-form-item>

    <el-form-item label="活动类型" prop="clubId">
      <el-select v-model="activity.clubId" placeholder="请选择活动类型">
        <el-option
          v-for="activityType in activityTypeList"
          :key="activityType.id"
          :label="activityType.type"
          :value="activityType.id"
        ></el-option> </el-select
    ></el-form-item>
    <el-form-item>
      <el-button type="primary" @click="add">添加</el-button>
      <el-button @click="goBack">返回</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
const OK = 200;
export default {
  data() {
    return {
      activity: {},
      activityTypeList: [],
      editorOption: {
        placeholder: "输入活动简介：",
        // 编辑器的配置
        // something config
        theme: "snow"
      },
      imageUrl: "",
      fileList: [],
      file: { activityId: 0 },
      relativePath: "/images/activity/",
      clubTypeList: null
    };
  },
  methods: {
    add: function() {
      this.addActivitie();
    },
    addActivitie: function() {
      this.$axios.post("/api/activities/", this.activity).then(res => {
        if (res.data.code == OK) {
          this.file.activityId = res.data.data;
          this.$refs.upload.submit();
          setTimeout(() => {
            this.$message({
              message: "添加活动成功",
              type: "success"
            });
          }, 900);
          setTimeout(() => {
            this.$router.push({ name: "ActivityList" });
          }, 1500);
        } else {
          this.$message({
            message: res.data.message,
            type: "error"
          });
        }
      });
    },
    getClubPage: function(pageNum, pageSize) {
      this.$axios
        .get("/api/clubs", {
          params: {
            pageNum: pageNum,
            pageSize: pageSize
          }
        })
        .then(res => {
          if (res.data.code === OK) {
            this.clubTypeList = res.data.data.list;
          } else {
            this.$message.error(res.data.data);
          }
        });
    },
    getActivityTypeList: function() {
      this.$axios.get("/api/activityTypes").then(res => {
        if (res.data.code == OK) {
          this.activityTypeList = res.data.data;
        } else {
          this.$message.error(res.data.data);
        }
      });
    },
    handleChange: function(file, fileList) {
      var response = file.response;
      if (response != null && response.code == OK) {
        this.file.filePath = response.data;
        this.file.fileName = this.getFileName(this.file.filePath);
        this.saveFile();
        this.$message.success("上传文件成功");
      }
      this.fileList = fileList.slice(-3);
    },

    handlePreview: function(file) {},
    saveFile: function() {
      this.$axios.post("/api/files/activity", this.file).then(res => {
        if (res.data.code === OK) {
          // this.$message.success('添加活动成功');
          // this.$router.push({ name: 'ActivityList' });
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
    goBack: function() {
      this.$router.back(-1);
    }
  },
  created() {
    this.getActivityTypeList();
    this.getClubPage(100, 100);
  },
  watch: {
    $route(to, from) {
      this.getActivityTypeList();
    }
  }
};
</script>

<style scoped="scoped">
.title {
  display: block;
  font-size: 24px;
  color: #1f51ff;
  margin-top: 10px;
}
.content {
  line-height: 150%;
  padding: 10px 20px;
  text-indent: 35px;
  text-align: left;
}
</style>
