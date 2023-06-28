<template>
	<el-table :data="activityTypeList" stripe style="width:100%" border size="mini">
		<el-table-column prop="id" label="id" ></el-table-column>
		<el-table-column prop="type" label="活动类型" ></el-table-column>
	</el-table>
</template>

<script>
	const OK = 200;
	export default {
		data() {
			return {
				activityTypeList: [],
				activeIndex: '1'
			};
		},
		methods: {
			getActivityTypeList: function() {
				this.$axios.get('/api/activityTypes').then(res => {
					if (res.data.code == OK) {
						this.activityTypeList = res.data.data;
					} else {
						// this.$layer.alert(res.data.data);
					}
				});
			}
		},
		created() {
			this.getActivityTypeList();
		}
	};
</script>

<style scoped="scoped">

</style>
