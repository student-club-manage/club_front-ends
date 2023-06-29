<script>
export default {
  data() {
    return {
      feedbacks: []
    };
  },
  async created() {
    const res = await this.$axios.get("/api/activityComment/get");
    const { data } = res.data;

    this.feedbacks = data;

    console.log(data);
  },
  methods: {
    async handleDelete(a) {
      const res = await this.$axios.delete(`/api/activityComment/del/${a.id}`);

      const { code } = res.data;

      console.log(res);

      if (code === 200) {
        this.$message({
          type: "success",
          message: "删除成功"
        });

        this.feedbacks = this.feedbacks.filter(item => item.id !== a.id);
      } else {
        this.$message({
          type: "error",
          message: "删除失败"
        });
      }
    }
  }
};
</script>

<template>
  <div>
    <el-table height="600" :data="feedbacks" stripe border type="mini">
      <el-table-column prop="userId" label="用户id"></el-table-column>
      <el-table-column prop="comment" label="评论内容"></el-table-column>
      <el-table-column prop="createTime" label="发表时间"></el-table-column>
      <el-table-column prop="activityId" label="活动id"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<style scoped></style>
