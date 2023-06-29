<template>
  <div class="bg" v-if="activity != null">
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
    <div v-html="activity.introduce" class="introduce" />

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

    <button class="apply" @click="applyToActivity" :disabled="!isApplied">
      {{ isApplied ? '申请加入' : '已申请' }}
    </button>

    <div>
      <j-comment
        :key-map="keyMap"
        :showNumber="2"
        :comment-datas="commentDatas"
        @submitComment="submitComment"
      >
      </j-comment>
    </div>
    <Share />
    <div class="fileLink">
      where
    </div>
  </div>
</template>

<script>
import Share from '@/components/common/Share.vue'
import FeedBack from './FeedBack.vue'
const OK = 200
export default {
  data() {
    return {
      activity: {},
      fileList: [],
      isApplied: true,
      code: '',
      keyMap: {
        pid: 'parent_comment_id',
        id: 'id',
        isAdmin: 'admin_comment'
      },
      commentDatas: []
    }
  },
  components: { Share, FeedBack },
  methods: {
    get: function() {
      var id = this.$route.params.id
      this.$axios.get('/api/activities/' + id).then(res => {
        if (res.data.code === OK) {
          this.activity = res.data.data
          this.fileList = this.activity.fileList

          this.$axios
            .get('/api/activityComment/get', {
              params: {
                id: null,
                userId: null,
                activityId: res.data.data.id
              }
            })
            .then(res => {
              const { data } = res.data
              data.forEach(item => {
                const obj = {
                  id: item.id,
                  admin_comment: 0,
                  avatar: this.randomString(),
                  create_time: item.createTime,
                  email: '',
                  nickname: 'ID: ' + item.userId,
                  parent_comment_id: item.faNum === 0 ? null : item.faNum,
                  content: item.comment
                }
                this.commentDatas.push(obj)
              })
            })
          this.getApplyStatus()
          this.getFileLink(res.data.data.id)
        } else {
          this.$layer.alert(res.data.data)
        }
      })
    },
    getFileLink: function(id) {
      this.$axios.get(`/api/files/get/?${id}`).then(res => {
        console.log(res.data.data)
        if (res.data.code === OK) {
          console.log(res.data.data)
        } else {
          this.$message({
            message: res.data.message,
            type: 'error'
          })
        }
      })
    },
    getApplyStatus: function() {
      // 从后端获取申请状态
      this.$axios
        .get(
          `/other/clubMember/clubuser_id/${this.isFull.id}/${this.activity.id}`
        )
        .then(res => {
          if (res.data.code === OK) {
            const {
              data: { data }
            } = res
            if (data.length > 0) {
              this.isApplied = false
            }
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
    },
    applyToActivity: function() {
      // 发送申请请求到后端
      this.$axios
        .post('/other/clubMember/', {
          id: 0,
          clubId: this.activity.id,
          userId: this.isFull.id
        })
        .then(res => {
          if (res.data.code === OK) {
            setTimeout(() => {
              this.$message({
                message: '申请已发送',
                type: 'success'
              })
            }, 900)
          } else {
            this.$message({
              message: res.data.message,
              type: 'error'
            })
          }
        })
        .catch(err => {
          this.$message({
            message: err,
            type: 'error'
          })
        })
    },
    submitComment(item) {
      // console.log('item: ', item)
      if (item.content === '') {
        this.$message({
          message: '评论内容不能为空',
          type: 'warning'
        })
      } else {
        this.$axios
          .post(
            `/api/activityComment/add?userId=${this.isFull.id}&activityId=${
              this.activity.id
            }&faNum=${item.pid === null ? 0 : item.pid}&comment=${item.content}`
          )
          .then(res => {
            if (res.data.code === OK) {
              this.$message({
                message: '评论成功',
                type: 'success'
              })
            } else {
              this.$message({
                message: res.data.data,
                type: 'error'
              })
            }
          })
      }
    },
    randomString(len) {
      len = len || 5
      const $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'
      const maxPos = $chars.length
      let pwd = ''
      for (let i = 0; i < len; i++) {
        pwd += $chars.charAt(Math.floor(Math.random() * maxPos))
      }

      return `https://api.multiavatar.com/${pwd}.png`
    }
  },
  created() {
    this.get()
  },
  computed: {
    isFull() {
      return this.$store.state.user.user
    }
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

.apply {
  cursor: pointer;
  width: 269px;
  height: 68px;
  border-radius: 24px;
  background: #a5a6f6;
  box-shadow: -1px -9px 20px 0px rgba(0, 0, 0, 0.23) inset,
    1px 9px 24px 0px rgba(125, 125, 237, 0.6) inset, 0px 2px 11px 0px #9394db;
  color: #fff;
  font-size: 24px;
  font-family: Roboto;
  font-weight: 600;
  position: fixed; /* 使用 fixed 定位 */
  bottom: 150px; /* 距离底部的距离，根据需要进行调整 */
  right: 10px; /* 距离右侧的距离，根据需要进行调整 */
}

.fileLink {
  font-size: 19px;
  font-family: Roboto;
  font-weight: 600;
  position: fixed; /* 使用 fixed 定位 */
  bottom: 150px; /* 距离底部的距离，根据需要进行调整 */
  left: 10px; /* 距离右侧的距离，根据需要进行调整 */
}
</style>
