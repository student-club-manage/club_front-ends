<template>
  <el-container>
    <el-header>
      <div class="site-nav">
        当前位置:
        <router-link :to="{ name: 'Home' }">首页</router-link>
        >
        <span>社团风采</span>
        >
        <router-link
          :to="{
            name: 'ActivityList',
            query: { typeId: activityPageVo.activityType.id }
          }"
          class="activity-title"
          v-if="activityPageVo.activityType != null"
        >
          {{ activityPageVo.activityType.type }}
        </router-link>
      </div>
    </el-header>
    <el-container>
      <el-aside width="200px"><activity-type-list /></el-aside>
      <el-main v-if="activityPageVo != null">
        <div class="activity-title-wrap">
          <el-row>
            <span
              class="activity-title"
              v-if="activityPageVo.activityType != null"
              >{{ activityPageVo.activityType.type }}</span
            >
          </el-row>
        </div>
        <v-hr />
        <ul
          class="activity-list"
          v-if="activityPageVo.activityPageInfo != null"
        >
          <li
            v-for="activity in activityPageVo.activityPageInfo.list"
            class="section_10 change"
            :key="activity.id"
          >
            <router-link
              :to="{ name: 'Activity', params: { id: activity.id } }"
              >{{ activity.activityName }}</router-link
            >
            <span>{{ activity.publishTime }}</span>
          </li>
        </ul>
      </el-main>
    </el-container>
    <el-pagination
      v-if="activityPageVo.activityPageInfo != null"
      background
      layout="prev, pager, next"
      :current-page.sync="currentPage"
      :total="activityPageVo.activityPageInfo.total"
      @current-change="refreshActivityPage"
      :page-size="activityPageVo.activityPageInfo.pageSize"
    ></el-pagination>
  </el-container>
</template>

<script>
import activityTypeList from '@/components/activity/ActivityTypeList'
import Hr from '@/components/common/Hr.vue'
const OK = 200
export default {
  data() {
    return {
      activityPageVo: {},
      currentPage: 1
    }
  },
  components: { activityTypeList, 'v-hr': Hr },
  methods: {
    getActivityPage: function(pageNum, pageSize) {
      var typeId = this.$route.query.typeId
      this.$axios
        .get('/api/activities', {
          params: {
            activityTypeId: typeId,
            pageNum: pageNum,
            pageSize: pageSize
          }
        })
        .then(res => {
          if (res.data.code === OK) {
            this.activityPageVo = res.data.data
          } else {
            this.$layer.alert(res.data.data)
          }
        })
    },
    refreshActivityPage: function() {
      this.getActivityPage(this.currentPage, 8)
    }
  },
  created() {
    this.getActivityPage(this.currentPage, 8)
  },
  watch: {
    $route(to, from) {
      this.getActivityPage(this.currentPage, 8)
    }
  }
}
</script>

<style scoped="scoped">
.link_style {
  font-weight: 600;
  color: #222;
  font-size: 14px;
}
.section_10 {
  /* padding: 22px 15px 22px 15.5px; */
  /* background-color: #ffffff; */
  box-shadow: 0px -1px 0px #00000026 inset;
  position: relative;
  transition: 1s cubic-bezier(0.075, 0.82, 0.165, 1);
}

.change:hover {
  transform: translateX(15px);
  cursor: pointer;
  /* background: #2851e3; */
  border: 1px #2851e3 solid;
  border-radius: 10px;
}

.site-nav {
  float: left;
  height: 70px;
  line-height: 70px;
  font-size: 20px;
}

.activity-title-wrap .activity-title {
  display: block;
  width: 160px;
  font-size: 24px;
  color: #1f51ff;
  margin-bottom: 15px;
}

.activity-list li {
  height: 32px;
  line-height: 32px;
}

.activity-list li > a {
  display: inline-block;
  width: 270px;
  height: 32px;
  line-height: 32px;
  margin: 2px 25px;
  text-align: left;

  -webkit-line-clamp: 1;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  white-space: normal;
}

@media screen and (max-width: 600px) {
  .el-header,
  .el-aside {
    display: none;
  }
}
</style>
