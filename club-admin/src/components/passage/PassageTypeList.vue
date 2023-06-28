<template>
	<el-table :data="newsTypeList" stripe style="width:100%" border size="mini">
		<el-table-column prop="id" label="id" ></el-table-column>
		<el-table-column prop="type" label="文章类型" ></el-table-column>
	</el-table>
</template>

<script>
const OK = 200;
export default {
	data() {
		return {
			newsTypeList: [],
			activeIndex: '1'
		};
	},
	methods: {
		getNewsTypeList: function() {
			this.$axios.get('/api/passageTypes').then(res => {
				if (res.data.code == OK) {
					this.newsTypeList = res.data.data;
				} else {
					this.$layer.alert(res.data.data);
				}
			});
		}
	},
	created() {
		this.getNewsTypeList();
	}
};
</script>

<style scoped="scoped">
</style>
