<template>
  <div>
    <Slider />
    <el-row :gutter="60">
      <el-col :span="12" :xs="24">
        <div class="" v-if="topNoticesVo != null">
          <div class="news-title-wrap" v-if="topNoticesVo.passageType != null">
            <span class="news-title">{{ topNoticesVo.passageType.type }}</span>
            <router-link :to="{ name: 'PassageList', query: { passageTypeId: 1 } }" class="more view-PpVUiiue"
              tag="span">更多>></router-link>
          </div>
          <ul class="news-list">
            <li v-for="notice in topNoticesVo.passageList" :key="notice.id">
              <div class="section_10 change">
                <router-link :to="{ name: 'Passage', params: { id: notice.id } }" tag="a">{{ notice.title }}</router-link>
                <span class="time">{{ notice.publishTime }}</span>
              </div>
            </li>
          </ul>
        </div>
      </el-col>
      <el-col :span="12" :xs="24">
        <div class="grid-content bg-purple" v-if="topNoticesVo != null">
          <div class="news-title-wrap">
            <el-row v-if="topNewsListVo.passageType != null">
              <span class="news-title" v-if="topNewsListVo.passageType != null">{{ topNewsListVo.passageType.type
              }}</span>
              <router-link :to="{ name: 'PassageList', query: { passageTypeId: 2 } }" class="more  view-PpVUiiue"
                tag="span">更多>></router-link>
            </el-row>
          </div>
          <ul class="news-list">
            <li v-for="news in topNewsListVo.passageList" :key="news.id">
              <el-row class="section_10 change">
                <router-link :to="{ name: 'Passage', params: { id: news.id } }">{{ news.title }}</router-link>
                <span class="publishTime">{{ news.publishTime }}</span>
              </el-row>
            </li>
          </ul>
        </div>
      </el-col>
    </el-row>

    <div class="news-title-wrap show-wrap">
      <div class="news-title show">视展青春</div>
    </div>
    <el-row :gutter="10">
      <IndexHotActivities />
    </el-row>
  </div>
</template>

<script>
import Slider from '@/components/common/Slider'
import IndexHotActivities from '@/components/home/IndexHotActivities'
const OK = 200
export default {
  data() {
    return {
      topNoticesVo: {},
      topNewsListVo: {},
      topActivityVo: {},
      activityList: []
    }
  },
  components: {
    Slider,
    IndexHotActivities
  },
  methods: {
    getTopNotices: function (typeId, n) {
      this.$axios
        .get('/api/passages/top/' + n, {
          params: {
            passageTypeId: typeId
          }
        })
        .then(res => {
          if (res.data.code === OK) {
            this.topNoticesVo = res.data.data
          } else {
            this.$layer.alert('error')
          }
        })
    },
    getTopNewsList: function (typeId, n) {
      this.$axios
        .get('/api/passages/top/' + n, {
          params: {
            passageTypeId: typeId
          }
        })
        .then(res => {
          if (res.data.code === OK) {
            this.topNewsListVo = res.data.data
          } else {
            this.$layer.alert('error')
          }
        })
    },
    getTopActivityList: function (typeId, n) {
      this.$axios
        .get('/api/activities', {
          params: {
            activityTypeId: typeId,
            pageNum: 1,
            pageSize: n
          }
        })
        .then(res => {
          if (res.data.code === OK) {
            this.topActivityVo = res.data.data
            this.activityList = this.topActivityVo.activityList
          } else {
            this.$layer.alert('error')
          }
        })
    }
  },
  created() {
    this.getTopNotices(1, 6)
    this.getTopNewsList(2, 6)
    this.getTopActivityList(2, 4)
  }
}
</script>

<style scoped="scoped">
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
  /* border:1px #2851e3 solid; */
  background: #2851e3;
  border-radius: 10px;
}
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

.text_9 {
  color: rgba(0, 0, 0, 0.61);
  font-size: 18px;
  font-family: Roboto;
  line-height: 17px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 10px;
  padding-bottom: 10px;
  background: linear-gradient(91.4deg, #2fb8ff 0%, #9eecd9 100%);
  box-shadow: 0px 20px 40px rgba(147, 231, 221, 0.3);
  border-radius: 10px;
  width: 150px;
  height: 50px;
  transition: 1s cubic-bezier(0.075, 0.82, 0.165, 1);
}

.news-title-wrap {
  background-color: #1F51FF;
  border-radius: 10px;
  position: relative;
  background: linear-gradient(30deg, #2fb8ff 0%, #9eecd9 100%);
  box-shadow: 0px 20px 40px rgba(147, 231, 221, 0.3);
}

.news-title-wrap .news-title {
  display: inline-block;
  left: 220px;
  top: 0px;
  width: 300px;
  color: white;
  font-family: '微软雅黑';
  font-weight: 900;
  font-size: 18px;
  height: 40px;
  line-height: 40px;
}

.news-title-wrap .more {
  position: absolute;

  right: 20px;
  top: 10px;
  color: #fff;
  font-size: 16px;
  cursor: pointer;
}

.news-title-wrap.show-wrap {
  margin-top: 18px;
  position: relative;
  height: 40px;
  line-height: 40px;
}

.news-title-wrap .show {
  position: absolute;
  left: 10px;
}

.news-list li {
  height: 32px;
  line-height: 32px;
}

.news-list li {
  display: inline-block;
  /* float: left; */
  width: 400px;
  height: 32px;
  line-height: 32px;
  text-align: left;

  -webkit-line-clamp: 1;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  white-space: normal;
}

.news-list li span {
  display: inline-block;
  margin-left: 85px;

  color: #000;
  font-size: 16px;
  height: 32px;
  line-height: 32px;
}
</style>
