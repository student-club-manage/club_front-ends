<template>
  <div class="footer-wrap">
    <div class="footer">
      <p class="introduce">欢迎访问社团管理系统</p>
      <p>Copyright RF All rights reserved.</p>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style scoped="scoped">
.footer-wrap {
  background-color: #1f51ff;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 999;
  height: 70px;
}

.footer-wrap .footer {
  width: 1024px;
  margin: 0 auto;
  height: 70px;
}
.introduce {
  margin: 10px;
  color: #fff;
  font-size: 14px;
  font-family: 'sans-serif';
}
.footer-wrap .footer p {
  line-height: 16px;
}

@media screen and (max-width: 600px) {
  .footer-wrap {
    padding: 2px 15px;
  }
}
</style>
