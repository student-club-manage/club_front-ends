<template>
  <el-table :data="clubTypeList" stripe style="width:100%" border size="mini">
    <el-table-column prop="id" label="id"></el-table-column>
    <el-table-column prop="type" label="文章类型"></el-table-column>
  </el-table>
</template>

<script>
const OK = 200;
export default {
  data() {
    return {
      clubTypeList: []
      // activeIndex: '1'
    };
  },
  methods: {
    getClubTypeList: function() {
      this.$axios.get("/api/clubTypes").then(res => {
        if (res.data.code == OK) {
          this.clubTypeList = res.data.data;
        } else {
          this.$layer.alert(res.data.data);
        }
      });
    }
  },
  created() {
    this.getClubTypeList();
  }
};
</script>
<style scoped="scoped"></style>
