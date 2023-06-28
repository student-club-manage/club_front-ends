<template>
  <el-container>
    <el-header>
      <div class="site-nav">
        当前位置:
        <router-link :to="{ name: 'Home' }">首页</router-link>
        >
        <router-link :to="{ name: 'ClubList', query: { typeId: clubPageVo.clubType.id } }" class="club-title"
          v-if="clubPageVo.clubType != null">社团检索</router-link>
      </div>
    </el-header>
    <el-container>
      <el-aside width="200px"><club-type-list /></el-aside>
      <el-main v-if="clubPageVo != null">
        <div class="news-title-wrap">
          <el-row>
            <span class="news-title" v-if="clubPageVo.clubType != null">{{
              clubPageVo.clubType.type
            }}</span>
          </el-row>
        </div>
        <v-hr />
        <ul class="news-list" v-if="clubPageVo.clubPageInfo != null">
          <li v-for="club in clubPageVo.clubPageInfo.list" :key="club.name" class="section_10 change">
            <div style="cursor: pointer;" @click="fuckYou(club)">
              {{ club.name }}
            </div>
            <span>{{ club.publishTime }}</span>
          </li>
        </ul>
      </el-main>
    </el-container>
    <el-pagination v-if="clubPageVo.clubPageInfo != null" background layout="prev, pager, next"
      :current-page.sync="currentPage" :total="clubPageVo.clubPageInfo.total" @current-change="refreshClubPage"
      :page-size="clubPageVo.clubPageInfo.pageSize"></el-pagination>
  </el-container>
</template>

<script>
import clubTypeList from '@/components/club/ClubTypeList'
import Hr from '@/components/common/Hr.vue'
import router from '../../router'
const OK = 200
export default {
  data() {
    return {
      clubPageVo: {},
      currentPage: 1
    }
  },
  components: { clubTypeList, 'v-hr': Hr },
  methods: {
    fuckYou: club => {
      router.push({ name: 'Club', params: { num: club.num } })
    },
    getClubPage: function (pageNum, pageSize) {
      var typeId = this.$route.query.typeId
      this.$axios
        .get('/api/clubs', {
          params: {
            clubTypeId: typeId,
            pageNum: pageNum,
            pageSize: pageSize
          }
        })
        .then(res => {
          if (res.data.code === OK) {
            this.clubPageVo = res.data.data
          } else {
            this.$layer.alert(res.data.data)
          }
        })
    },
    refreshClubPage: function () {
      this.getClubPage(this.currentPage, 8)
    }
  },
  created() {
    this.getClubPage(this.currentPage, 8)
  },
  watch: {
    $route(to, from) {
      this.getClubPage(this.currentPage, 8)
    }
  }
}
</script>

<style scoped="scoped">
.view-PpVUiiue:hover {
  transition: 1s cubic-bezier(0.075, 0.82, 0.165, 1);
  transform: scale(1.2);
  scale: 1.2em;
  cursor: pointer;
  filter: drop-shadow(0px 1px 3px rgba(0, 0, 0, 0.05)) drop-shadow(0px 20px 40px rgba(73, 39, 171, 0.3));
  border: 0.5px solid rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(40px);
  border-radius: 10px;
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

.news-title-wrap .news-title {
  display: block;
  width: 180px;
  font-size: 24px;
  color: #1F51FF;
  margin-bottom: 15px;
}

.news-list li {
  height: 32px;
  line-height: 32px;
}

.hr {
  border: 2px solid #1F51FF;
}

.news-list li>a {
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
