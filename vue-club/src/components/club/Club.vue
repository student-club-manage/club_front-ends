<template>
  <div class="background" v-if="club != null">
    <img class="gif1" :src="require('../../../res/2.gif')" />
    <div class="">
      <div class="transbox">
        <h1 class="clubName">{{ club.name }}</h1>
        <h2>
          社团简介:
          <div v-html="club.introduce" class="content" />
          <img
            class="img"
            v-for="url in imageUrls"
            :src="url.src"
            :key="url.src"
          />
        </h2>
        <button class="apply" @click="applyToClub" :disabled="isApplied">
          {{ isApplied ? '已申请' : '申请加入' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
const OK = 200
export default {
  data() {
    return {
      club: {},
      imageList: [], // 社团图片列表
      isApplied: false // 是否已申请
    }
  },
  methods: {
    get: function() {
      var num = this.$route.params.num
      this.$axios.get('/api/clubs/' + num).then(res => {
        if (res.data.code === OK) {
          this.club = res.data.data
          console.log(this.club)
        } else {
          this.$layer.alert(res.data.data)
        }
      })

      this.$axios.get(`/other/files/club/${num}`).then(res => {
        const { code, data } = res.data

        if (code === OK) {
          this.imageList = data
        } else {
          this.$layer.alert(res.data.data)
        }
      })
    },
    getApplyStatus: function() {
      // 从后端获取申请状态
      this.$axios
      .get("/other/clubApply/clubuser_id/", {
        params: {
          userid: this.isFull.id,
          clubid: this.club.num
        }
      })
      .then(res => {
        if (res.data.code === OK) {
          console.log('status:', res.data.data)
          // this.isApplied = res.data.data;
        } else {
          this.$layer.alert(res.data.data);
        }
      })
    },
    applyToClub: function() {
      // 发送申请请求到后端
      this.$axios
        .post('/other/clubApply/', {
          id: 0,
          clubId: this.club.num,
          userId: this.isFull.id,
          isJoin: 0
        })
        .then(res => {
          console.log(res)
          if (res.data.code === OK) {
            setTimeout(() => {
              this.$message({
                message: '申请已发送',
                type: 'success'
              })
            }, 900);
            this.isApplied = true; // 设置申请状态为已申请
          } else {
            this.$message({
              message: res.data.message,
              type: 'error'
            })
          }
        })
        .catch(err => {
          console.error(err);
          this.$message.error('发送申请失败');
        })
    }
  },
  created() {
    this.get();
    this.$store.dispatch('screen/setToFull');
    this.getApplyStatus(); // 获取申请状态
  },
  computed: {
    imageUrls() {
      return this.imageList.map(item => {
        return {
          src: `/fileServer/fileServer/${item.filePath}`
        }
      })
    },
    isFull() {
      return this.$store.state.user.user
    }
  },
  watch: {
    $route(to, from) {
      this.get()
    }
  },
  destroyed() {
    this.$store.dispatch('screen/setToMin')
  }
}
</script>

<style scoped>
h1 {
  text-align: center;
}
h2.ex1 {
  margin-left: 5cm;
}
h3.ex1 {
  margin-left: 5cm;
}
img.ex1 {
  margin-left: 5cm;
}
p {
  text-align: right;
}
p.ex1 {
  margin-right: 2cm;
}
p {
  color: mediumpurple;
}

/*cc:change color*/
a.cc:visited {
  color: #0000ff;
}
a.cc:hover {
  color: #ffcc00;
}
/* .background {
  background-image: url('../../../res/1.png'), url('../../../res/2.png'),
    url('../../../res/3.png'), url('../../../res/4.png'),
    url('../../../res/5.png');

  background-repeat: no-repeat;

  background-size: cover, 234px 203px, 244px 300px, 310px 210px, 250px 150px;

  background-position: center, left top, right bottom, left bottom, 600px 100px;

  width: 100vw;
  height: 100vh;
} */

.img {
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

.clubName {
  color: var(--colors-white, #000000);
  text-shadow: 0px 4px 4px 0px #e51515bb;
  font-size: 45px;
  font-family: ZCOOL KuaiLe;
  line-height: 70px;
  letter-spacing: -1px;
  transform: rotate(-8.672deg);
}

.content {
  color: #000;
  font-size: 18px;
  font-family: LingWai SC;
  font-weight: 500;
  line-height: 130%;
}

.apply {
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
  bottom: 10px; /* 距离底部的距离，根据需要进行调整 */
  right: 10px; /* 距离右侧的距离，根据需要进行调整 */
}
</style>
