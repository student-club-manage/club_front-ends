<template>
  <div>
    <div class="header-wrap">
      <el-menu
        :default-active="activeIndex"
        class="header"
        background-color="#1F51FF"
        mode="horizontal"
        text-color="#fff"
        active-text-color="#ffd04b"
      >
        <el-menu-item index="1" class="view-dL5R0iFd"
          ><router-link :to="{ name: 'Home' }" tag="div"
            >首页</router-link
          ></el-menu-item
        >
        <!-- <el-submenu index="2" class="view-dL5R0iFd">
          <template slot="title">
            社团概况
          </template>
          <el-menu-item index="2-1" class="view-dL5R0iFd"
            ><router-link :to="{ name: 'Passage', params: { id: 1 } }" tag="div"
              >社团联简介</router-link
            ></el-menu-item
          >
          <el-menu-item index="2-2" class="view-dL5R0iFd"
            ><router-link :to="{ name: 'Passage', params: { id: 2 } }" tag="div"
              >社团简介</router-link
            ></el-menu-item
          >
          <el-menu-item index="2-3" class="view-dL5R0iFd"
            ><router-link :to="{ name: 'Passage', params: { id: 3 } }" tag="div"
              >机构设置</router-link
            ></el-menu-item
          >
        </el-submenu> -->
        <el-submenu index="3" class="view-dL5R0iFd">
          <template slot="title">
            社团快讯
          </template>
          <el-menu-item index="3-1" class="view-dL5R0iFd"
            ><router-link
              :to="{ name: 'PassageList', query: { passageTypeId: 1 } }"
              tag="div"
              >重要通知</router-link
            ></el-menu-item
          >
          <el-menu-item index="3-2" class="view-dL5R0iFd"
            ><router-link
              :to="{ name: 'PassageList', query: { passageTypeId: 2 } }"
              tag="div"
              >社团要闻</router-link
            ></el-menu-item
          >
          <el-menu-item index="3-3" class="view-dL5R0iFd"
            ><router-link
              :to="{ name: 'PassageList', query: { passageTypeId: 1 } }"
              tag="div"
              >重要通知</router-link
            ></el-menu-item
          >
        </el-submenu>
        <el-submenu index="4" class="view-dL5R0iFd">
          <template slot="title">
            社团风采
          </template>
          <el-menu-item index="4-1" class="view-dL5R0iFd"
            ><router-link
              :to="{ name: 'ActivityList', query: { typeId: 1 } }"
              tag="div"
              >活动预告</router-link
            ></el-menu-item
          >
          <el-menu-item index="4-2" class="view-dL5R0iFd"
            ><router-link
              :to="{ name: 'ActivityList', query: { typeId: 2 } }"
              tag="div"
              >精彩活动回顾</router-link
            ></el-menu-item
          >
        </el-submenu>
        <el-menu-item index="5" class="view-dL5R0iFd"
          ><router-link
            :to="{ name: 'ClubList', query: { typeId: 1 } }"
            tag="div"
            >社团检索</router-link
          ></el-menu-item
        >
        <el-menu-item index="6" class="view-dL5R0iFd"
          ><router-link
            :to="{ name: 'FileList', query: { fileTypeId: 3 } }"
            tag="div"
            >资料下载</router-link
          ></el-menu-item
        >
        <el-submenu index="7" class="view-dL5R0iFd">
          <template slot="title">
            社团反馈
          </template>
          <el-menu-item index="7-1">
            <a
              target="_blank"
              href="http://wpa.qq.com/msgrd?v=3&uin=2804774882&site=qq&menu=yes"
            >
              <img
                border="0"
                src="http://wpa.qq.com/pa?p=2:2804774882:51"
                alt="点击这里给我发消息"
                title="QQ交流"
              />
            </a>
          </el-menu-item>
          <el-menu-item index="7-2">
            <a
              target="_blank"
              href="http://mail.qq.com/cgi-bin/qm_share?t=qm_mailme&email=d0VPR0NAQENPT0U3BgZZFBga"
              style="text-decoration:none;"
            >
              <img
                src="http://rescdn.qqmail.com/zh_CN/htmledition/images/function/qm_open/ico_mailme_02.png"
              />
            </a>
          </el-menu-item>
        </el-submenu>
        <el-menu-item
          @click="goSiginPage"
          v-if="!isLogin"
          index="8"
          class="rightMenu"
          ><a href="#">注册</a></el-menu-item
        >

        <el-menu-item
          @click="signIn"
          v-if="!isLogin"
          index="9"
          class="rightMenu"
          ><a href="#">登录</a></el-menu-item
        >

        <el-menu-item
          @click="signOut"
          v-if="isLogin"
          index="9"
          class="rightMenu"
          ><a href="#">退出</a></el-menu-item
        >
        <el-menu-item
          @click="goAdminUrl"
          v-if="userInfo && userInfo.roleId !== 4"
          index="10"
          class="rightMenu"
          ><a href="#">进入后台</a></el-menu-item
        >
      </el-menu>
    </div>
  </div>
</template>

<script>
import router from '../../router'

const OK = 200
export default {
  data() {
    return {
      activeIndex: '1',
      adminAccessUrl: 'http://118.89.228.250:8012',
      user: null
    }
  },
  computed: {
    isLogin: function() {
      const { user } = this.$store.state.user
      return user !== null
    },
    userInfo: function() {
      console.log(this.$store.state.user.user)
      return this.$store.state.user.user || null
    }
  },
  methods: {
    signOut: function() {
      this.$store.dispatch('user/setUser', null)
      localStorage.removeItem('user')

      this.$message({
        message: '退出成功',
        type: 'success'
      })
    },
    signIn: function() {
      router.push('/login')
    },
    getAdminUrl: function() {
      this.$axios.get('/api/system/adminUrl').then(res => {
        if (res.data.code === OK) {
          this.adminAccessUrl = res.data.data
        }
      })
    },
    goAdminUrl: function() {
      window.open('http://localhost:8080/', '_blank')
    },
    goSiginPage: () => {
      router.push('./sigin')
    }
  },
  created: function() {
    this.getAdminUrl()
  }
}
</script>

<style scoped="scoped">
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
  width: 150px;
  height: 50px;
  transition: 1s cubic-bezier(0.075, 0.82, 0.165, 1);
}

.header-wrap {
  background-color: #1f51ff;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 999;
  height: 70px;
}

.phone-nav {
  display: none;
}

.header {
  width: 1024px;
  height: 70px;
  line-height: 70px;
  margin: 0 auto;
}

.items-start {
  display: flex;
  align-items: flex-start;
}

.group_15 {
  padding: 10px 7.72px 0;
  transition: 1s cubic-bezier(0.075, 0.82, 0.165, 1);
  width: 1024px;
  height: 70px;
  line-height: 70px;
  margin: 0 auto;
}

.view-dL5R0iFd:hover {
  background: gradient(180deg, #ffffff 0%, #d9dfff 100%);
  box-shadow: 0px 50px 100px rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(40px);
  cursor: pointer;
  transition: 1s cubic-bezier(0.075, 0.82, 0.165, 1);
}

.text_1 {
  color: rgb(55, 81, 254);
  font-size: 36px;
  font-family: Open Sans;
  font-weight: 700;
  line-height: 43px;
  transition: 1s cubic-bezier(0.075, 0.82, 0.165, 1);
}

.items-start {
  display: flex;
  align-items: flex-start;
}

.group_15 {
  padding: 10px 7.72px 0;
  transition: 1s cubic-bezier(0.075, 0.82, 0.165, 1);
  width: 1024px;
  height: 70px;
  line-height: 70px;
  margin: 0 auto;
}

.view-dL5R0iFd:hover {
  background: gradient(180deg, #ffffff 0%, #d9dfff 100%);
  box-shadow: 0px 50px 100px rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(40px);
  cursor: pointer;
  transition: 1s cubic-bezier(0.075, 0.82, 0.165, 1);
}

.text_1 {
  color: rgb(55, 81, 254);
  font-size: 36px;
  font-family: Open Sans;
  font-weight: 700;
  line-height: 43px;
  transition: 1s cubic-bezier(0.075, 0.82, 0.165, 1);
}

.el-menu.el-menu--horizontal a {
  color: #fff;
}

.rightMenu {
  float: right;
  height: 70px;
  line-height: 70px;
  background-color: #000000;
}

a {
  text-decoration: none;
  color: #eee;
  font-size: 16px;
}
</style>
