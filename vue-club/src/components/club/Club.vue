<template>
  <div class="" v-if="club != null">
    <div class="background">
      <div class="transbox">
        <h1>{{ club.name }}</h1>
        <h2>
          社团简介:
          <div v-html="club.introduce" class="content" />
          <img v-for="url in imageUrls" :src="url.src" :key="url.src" />
        </h2>
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
      imageList: [] // 社团图片列表
    }
  },
  methods: {
    get: function() {
      var num = this.$route.params.num
      this.$axios.get('/api/clubs/' + num).then(res => {
        if (res.data.code === OK) {
          this.club = res.data.data
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
    }
  },
  created() {
    this.get()
    this.$store.dispatch('screen/setToFull')
  },
  computed: {
    imageUrls() {
      return this.imageList.map(item => {
        return {
          src: `/fileServer/fileServer/${item.filePath}`
        }
      })
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
</style>
