<template>
  <div class="bg" v-if="activity != null">
    <img class="gif1" :src="require('../../../res/2.gif')" />
    <div class="title">{{ activity.activityName }}</div>
    <div class="wrap">
      <div class="time">
        活动举办时间:
        <span>{{ activity.holdTime }}</span>
      </div>
      <div class="site">
        活动举办地点:
        <span class="info">{{ activity.site }}</span>
      </div>
    </div>

    <div v-html="activity.introduce" class="introduce"></div>

    <div v-for="file in fileList" :key="file.id">
      <img
        :src="'/fileServer/fileServer' + file.filePath"
        class="show-image"
        :alt="file.fileName"
        v-if="isImage(file.fileName)"
      />
      <a :href="'/fileServer/fileServer' + file.filePath" v-else>{{
        file.fileName
      }}</a>
    </div>

    <Share />
  </div>
</template>

<script>
import Share from '@/components/common/Share.vue'
const OK = 200
export default {
  data() {
    return {
      activity: {},
      fileList: []
    }
  },
  components: { Share },
  methods: {
    get: function() {
      var id = this.$route.params.id
      this.$axios.get('/api/activities/' + id).then(res => {
        if (res.data.code === OK) {
          this.activity = res.data.data
          this.fileList = this.activity.fileList
        } else {
          this.$layer.alert(res.data.data)
        }
      })
    },
    isImage: function(fileName) {
      var ext = fileName.substring(fileName.lastIndexOf('.') + 1)
      if (ext === 'png' || ext === 'jpg') {
        return true
      }
      return false
    }
  },
  created() {
    this.get()
  },
  watch: {
    $route(to, from) {
      this.get()
    }
  }
}
</script>

<style scoped="scoped">
.title {
  display: block;
  font-size: 24px;
  margin-top: 10px;
  color: var(--colors-white, #000000);
  text-shadow: 0px 4px 4px 0px #e51515bb;
  font-size: 45px;
  font-family: ZCOOL KuaiLe;
  line-height: 70px;
  letter-spacing: -1px;
  transform: rotate(-8.672deg);
}
.wrap {
  float: right;
}
.time {
  margin-right: 100px;
  line-height: 20px;
}
.site {
  margin-right: 100px;
}
.site span {
  padding-left: 20px;
  font-size: 18px;
}
.introduce {
  line-height: 150%;
  padding: 80px 20px 0;
  text-indent: 5px;
  text-align: left;
}
.show-image {
  width: 420px;
  height: 360px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  gap: 126.361px;
  flex-shrink: 0;
}

.gif1 {
  position: fixed; /* 使用 fixed 定位，使元素始终悬浮在视口的特定位置 */
  top: 10px; /* 距离顶部的距离，根据需要进行调整 */
  right: 10px; /* 距离右侧的距离，根据需要进行调整 */
  z-index: 1000; /* 设置较高的 z-index 值以确保元素在其他元素之上 */
  width: 150px;
  height: 150px;
}
</style>
