<template>
  <el-form class="" :model="file" label-width="80px">
    <!-- default -->
    <el-form-item>
      <el-upload
        class="upload-demo"
        ref="upload1"
        action="/api/files/upload"
        :on-change="handleChange"
        :file-list="fileList"
        :auto-upload="false"
      >
        <el-button slot="trigger" size="small" type="primary"
          >选取文件</el-button
        >
        <div slot="tip" class="el-upload__tip">
          只能同时上传最多3个文件,且不超过2M
        </div>
      </el-upload>

      <!-- ac -->
      <el-upload
        class="upload-demo"
        ref="upload2"
        action="/api/files/uploadImg?relativePath=/images/activity/"
        :on-change="handleChange"
        :file-list="fileList"
        :auto-upload="false"
      >
        <el-button slot="trigger" size="small" type="primary"
          >选取文件</el-button
        >
        <div slot="tip" class="el-upload__tip">
          只能同时上传最多3个文件,且不超过2M
        </div>
      </el-upload>

      <!-- club -->
      <el-upload
        class="upload-demo"
        ref="upload3"
        action="/api/files/uploadImg?relativePath=/images/club/"
        :on-change="handleChange"
        :file-list="fileList"
        :auto-upload="false"
      >
        <el-button slot="trigger" size="small" type="primary"
          >选取文件</el-button
        >
        <div slot="tip" class="el-upload__tip">
          只能同时上传最多3个文件,且不超过2M
        </div>
      </el-upload>
    </el-form-item>
    <el-form-item label="选择分类">
      <el-select v-model="currentFileSort" placeholder="请选择">
        <el-option
          v-for="item in fileSorts"
          :key="item.type"
          :label="item.type"
          :value="item.value"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item v-show="currentFileSort === 7" label="选择社团">
      <el-select v-model="currentClubSort" placeholder="请选择">
        <el-option
          v-for="item in clubSorts"
          :key="item.name"
          :label="item.name"
          :value="item.name"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item v-show="currentFileSort === 6" label="选择活动">
      <el-select v-model="currentActivitySort" placeholder="请选择">
        <el-option
          v-for="item in activitySorts"
          :key="item.id"
          :label="item.activityName"
          :value="item.id"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="选择将要传输的类型"></el-form-item>
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
      file: {},
      fileTypeList: [],
      fileList: [],
      fileTypeId: 3,
      fileSorts: [
        { type: "常用文档", value: 2 },
        { type: "社团图片", value: 7 },
        { type: "活动图片", value: 6 }
      ],
      type: { value: 0, showNum: 0 },
      clubSorts: [],
      activitySorts: [],
      currentActivitySort: null,
      currentClubSort: null,
      currentFileSort: null
    };
  },
  components: {},
  methods: {
    add: function() {
      /**
       * 2 - 常用文档
       * 6 - 活动图片
       * 7 - 社团图片
       */

      if (this.currentFileSort === null) {
        this.$message.error("请选择分类");
      }

      if (this.currentFileSort === 7) {
        if (this.currentClubSort === null) {
          this.$message.error("请选择社团");
        }
        this.type.value = 1;
        this.$refs.upload3.submit();
        return;
      }

      if (this.currentFileSort === 6) {
        if (this.currentActivitySort === null) {
          this.$message.error("请选择活动");
        }

        this.type.value = 2;
        this.$refs.upload2.submit();
        return;
      }
      this.$refs.upload1.submit();
    },
    getFileTypeList: function() {
      this.$axios.get("/api/fileTypes").then(res => {
        if (res.data.code == OK) {
          this.newsTypeList = res.data.data;
        } else {
          this.$message.error(res.data.data);
        }
      });
    },

    goBack: function() {
      this.$router.back(-1);
    },
    handleChange: function(file, fileList) {
      var response = file.response;
      if (response != null && response.code == OK) {
        this.$message.success("上传文件成功");
        this.$router.push({
          name: "FileList",
          query: { fileTypeId: this.fileTypeId }
        });
      }
      this.fileList = fileList.slice(-3);
      console.log(file);
    }
  },
  created() {
    var id = this.$route.query.id;

    this.getFileTypeList();

    this.$axios.get("/api/clubs/getall").then(res => {
      const { data } = res.data;
      this.clubSorts = data;
    });

    this.$axios.get("/api/activities/getall").then(res => {
      const { data } = res.data;
      this.activitySorts = data;
      console.log("activities", data);
    });
  },
  watch: {
    $route(to, from) {
      var id = this.$route.params.id;
      this.get(id);
    }
  }
};
</script>

<style scoped="scoped"></style>
