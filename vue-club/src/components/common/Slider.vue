<template>
  <el-carousel indicator-position="outside">
    <el-carousel-item v-for="carousel in carouselImg" :key="carousel.id">
      <router-link
        :to="{ name: 'Passage', params: { id: carousel.passageId } }"
      >
        <el-image
          :src="'http://192.168.43.162:8013/fileServer/' + carousel.filePath"
          alt="carousel.fileName"
          fit="cover"
          class="slider-img"
        />
      </router-link>
    </el-carousel-item>
  </el-carousel>
</template>

<script>
const OK = 200
export default {
  data() {
    return {
      carouselImg: []
    }
  },
  methods: {
    getCarouselList: function(typeId, pageSize) {
      this.$axios
        .get('/api/files', {
          params: {
            fileTypeId: typeId,
            pageNum: 1,
            pageSize: pageSize
          }
        })
        .then(res => {
          if (res.data.code === OK) {
            this.carouselImg = res.data.data.list
          } else {
            this.$layer.alert(res.data.data)
          }
        })
    },

    refreshPasagePage: function() {
      this.getCarouselList(4, 6)
    }
  },
  created() {
    this.getCarouselList(4, 6)
  }
}
</script>

<style scoped="scoped">
.el-carousel__item h3 {
  color: #475669;
  font-size: 18px;
  opacity: 0.75;
  line-height: 400px;
  margin: 0;
}

.slider-img {
  cursor: pointer;
  height: 100%;
}
.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>
