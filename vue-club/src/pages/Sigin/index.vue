<script>
import router from '../../router'

export default {
  data() {
    return {
      user: {
        account: '',
        introduce: '',
        name: '',
        password: '',
        sex: '',
        userTypeId: 1
      }
    }
  },
  methods: {
    signIn: function() {
      this.$axios.post('/other/users', this.user).then(res => {
        if (res.data.code === 200) {
          this.$message({
            message: '注册成功',
            type: 'success'
          })
          router.push('/')
        } else {
          this.$message({
            message: res.data.message,
            type: 'error'
          })
        }
      })
    }
  }
}
</script>

<template>
  <div class="flex-col page">
    <div class="flex-col items-center section_1">
      <img
        src="https://codefun-proj-user-res-1256085488.cos.ap-guangzhou.myqcloud.com/6266510d5a7e3f0310700f1e/6274b8cb3051170011fb085d/16529638214180901831.png"
        class="image"
      />
    </div>
    <img
      src="https://codefun-proj-user-res-1256085488.cos.ap-guangzhou.myqcloud.com/6266510d5a7e3f0310700f1e/6274b8cb3051170011fb085d/16529638214187371209.png"
      class="image_6"
    />
    <img
      src="https://codefun-proj-user-res-1256085488.cos.ap-guangzhou.myqcloud.com/6266510d5a7e3f0310700f1e/6274b8cb3051170011fb085d/16529638214187277200.png"
      class="image_7"
    />
    <img
      src="https://codefun-proj-user-res-1256085488.cos.ap-guangzhou.myqcloud.com/6266510d5a7e3f0310700f1e/6274b8cb3051170011fb085d/16529638214189469699.png"
      class="image_8"
    />
    <div class="justify-between section_5">
      <img src="./assets/Cover.svg" class="flex-col group_3 view-gokJcyw9" />
      <div class="flex-col group_4">
        <span class="text_6">注册用户</span>
        <div class="flex-col group_6">
          <div class="flex-row items-center section_8">
            <img
              src="https://project-user-resource-1256085488.cos.ap-guangzhou.myqcloud.com/6266510d5a7e3f0310700f1e/6274b8cb3051170011fb085d/16529306943396518005.png"
              class="image_11"
            />
            <input
              class="flex-row group_7 view_3"
              id="userName"
              placeholder="请输入邮箱"
              v-model="user.account"
            />
          </div>
          <div class="flex-col group_6">
            <div class="flex-row items-center section_8">
              <img
                src="https://project-user-resource-1256085488.cos.ap-guangzhou.myqcloud.com/6266510d5a7e3f0310700f1e/6274b8cb3051170011fb085d/16529306943399257711.png"
                class="image_11"
              />
              <input
                class="flex-row group_7 view_3"
                id="passWord"
                type="password"
                placeholder="请输密码"
                v-model="user.password"
              />
            </div>
          </div>
        </div>
        <button class="flex-col items-center text-wrapper view-lpqp2X1q">
          <span class="text_11" @click="signIn">注册</span>
        </button>
        <span class="text_12" style="cursor: default"
          >注册用户即代表您同意
          <span class="inlineText">隐私政策</span>
          和
          <span class="inlineText">安全协议</span>
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped>
html {
  font-size: 16px;
}

body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    'Microsoft Yahei', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 100vw;
  height: 900px;
}

* {
  box-sizing: border-box;
  flex-shrink: 0;
  border: none;
}
a {
  text-decoration: none;
}

.flex-row {
  display: flex;
  flex-direction: row;
}

.flex-col {
  display: flex;
  flex-direction: column;
}

.justify-start {
  display: flex;
  justify-content: flex-start;
}

.justify-center {
  display: flex;
  justify-content: center;
}

.justify-end {
  display: flex;
  justify-content: flex-end;
}

.justify-evenly {
  display: flex;
  justify-content: space-evenly;
}

.justify-around {
  display: flex;
  justify-content: space-around;
}

.justify-between {
  display: flex;
  justify-content: space-between;
}

.items-start {
  display: flex;
  align-items: flex-start;
}

.items-center {
  display: flex;
  align-items: center;
  justify-content: start;
}

.items-end {
  display: flex;
  align-items: flex-end;
}

input:focus {
  border: none;
  background-image: linear-gradient(
    180deg,
    rgba(98, 106, 149, 0.4) 0%,
    rgba(181, 186, 213, 0.25) 100%
  );
  filter: hue-rotate(10deg) brightness(150%) saturate(120%);
}

button {
  border: none;
  background-color: transparent;
  outline: none;
}
input {
  outline: none;
  font-weight: bold;
}
.image_1 {
  flex-shrink: 0;
  width: 24px;
  height: 24px;
}
.text {
  font-family: 'Courier New', Courier, -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue',
    sans-serif;
}
.section_8 {
  padding: 4px 0 2px;
  background-image: linear-gradient(
    180deg,
    rgba(98, 106, 149, 0.4) 0%,
    rgba(181, 186, 213, 0.25) 100%
  );
  border-radius: 30px;
  box-shadow: 0px 20px 40px rgba(0, 0, 0, 0.15);
  backdrop-filter: blur(20px);
  overflow: hidden;
  border: solid 1px rgba(255, 255, 255, 0.3);
  transition: 1s cubic-bezier(0.075, 0.82, 0.165, 1);
}
.section_8:hover {
  filter: drop-shadow(0px 30px 30px rgba(0, 0, 0, 0.25));
  transform: scale(1.1);
}
.image_11 {
  margin-left: 10px;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  transition: 1s cubic-bezier(0.075, 0.82, 0.165, 1);
}
.image_11:hover {
  filter: hue-rotate(10deg) brightness(150%) saturate(120%);
  transform: scale(1.2) rotate(360deg);
}
.page {
  background-color: rgb(242, 246, 255);
  width: 100%;
  overflow-y: hidden;
  overflow-x: hidden;
  position: relative;
}
.section_1 {
  padding-top: 310px;
  background-image: linear-gradient(
    180deg,
    rgb(52, 53, 99) 0%,
    rgb(73, 38, 173) 100%
  );
  position: relative;
}
.image_6 {
  mix-blend-mode: OVERLAY;
  width: 1530px;
  height: 533px;
  position: absolute;
  left: -30.64px;
  right: -59.36px;
  bottom: -232px;
}
.image_7 {
  mix-blend-mode: OVERLAY;
  width: 1522px;
  height: 407px;
  position: absolute;
  left: -55px;
  right: -27px;
  bottom: -33px;
}
.section_4 {
  background-image: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 0.3) 100%
  );
  width: 1440px;
  height: 400px;
  position: absolute;
  left: 0;
  right: 0;
  top: 400px;
}
.image_8 {
  width: 1522px;
  height: 376px;
  position: absolute;
  left: -23px;
  right: -59px;
  bottom: -174px;
}
.section_5 {
  padding: 19px 19px;
  background-color: rgba(50, 61, 109, 0.5);
  border-radius: 20px;
  box-shadow: 0px 50px 100px rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(20px);
  width: 960px;
  position: absolute;
  top: 175px;
  left: 50%;
  transform: translateX(-50%);
  border: solid 1px rgba(255, 255, 255, 0.3);
}
.image {
  mix-blend-mode: OVERLAY;
  width: 1440px;
  height: 510px;
}
.section_2 {
  padding: 30px 30px 326px;
  background-image: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0.3) 0%,
    rgba(0, 0, 0, 0) 100%
  );
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
}
.section_3 {
  padding: 10px 0;
  border-radius: 10px;
  overflow: hidden;
  width: 120px;
  height: 44px;
  transition: 1s cubic-bezier(0.075, 0.82, 0.165, 1);
}
.group_1 {
  margin-left: 50px;
  align-self: center;
  overflow: hidden;
  width: 120px;
  height: 44px;
  justify-content: center;
  align-items: center;
  transition: 1s cubic-bezier(0.075, 0.82, 0.165, 1);
}
.group_2 {
  margin-left: 59.53px;
  padding: 3.4px 1.4px 3.4px;
  align-self: center;
  overflow: hidden;
  width: 120px;
  height: 44px;
  justify-content: center;
  align-items: center;
  transition: 1s cubic-bezier(0.075, 0.82, 0.165, 1);
}
.section_6 {
  background-image: linear-gradient(
    200.4deg,
    rgb(67, 21, 218) 17%,
    rgb(144, 118, 230) 98.5%
  );
  border-radius: 10px;
  width: 360px;
  border: solid 1px rgba(255, 255, 255, 0.3);
  position: relative;
}
.text-wrapper {
  margin-top: 30px;
  padding: 14.97px 0 13.03px;
  background-image: linear-gradient(
    91.4deg,
    rgb(47, 184, 255) 0%,
    rgb(157, 235, 217) 100%
  );
  border-radius: 6px;
  box-shadow: 0px 20px 40px rgba(147, 231, 221, 0.3);
  overflow: hidden;
  width: 320px;
  transition: 1s cubic-bezier(0.075, 0.82, 0.165, 1);
}
.group {
  overflow: hidden;
  width: 64.8px;
  justify-content: center;
  align-items: center;
}
.text_2 {
  margin-left: 10.47px;
  align-self: center;
  color: rgb(255, 255, 255);
  font-size: 15px;
  font-family: ABeeZee;
  line-height: 13.9px;
}
.image_4 {
  flex-shrink: 0;
  width: 21.2px;
  height: 17.2px;
}
.image_9 {
  width: 360px;
  height: 570px;
}
.image_10 {
  width: 359px;
  height: 269px;
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}
.section_7 {
  background-image: linear-gradient(
    167.3deg,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0.5) 100%
  );
  border-radius: 10px;
  mix-blend-mode: OVERLAY;
  width: 360px;
  height: 570px;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  position: absolute;
  border: solid 1px rgba(255, 255, 255, 0.3);
  transition: 1s cubic-bezier(0.075, 0.82, 0.165, 1);
}
.text_1 {
  margin-left: 10.8px;
  align-self: center;
  color: rgb(255, 255, 255);
  font-size: 15px;
  font-family: ABeeZee;
  line-height: 13.89px;
}
.group_3 {
  filter: drop-shadow(0px 30px 30px rgba(0, 0, 0, 0.25));
  width: 360px;
  height: 570px;
  transition: 10s cubic-bezier(0.075, 0.82, 0.165, 1);
}
.group_4 {
  margin-right: 110px;
  margin-top: 46.8px;
  width: 320px;
}
.group_11 {
  margin-left: 48.19px;
  align-self: center;
  overflow: hidden;
  width: 120px;
  height: 44px;
  transition: 1s cubic-bezier(0.075, 0.82, 0.165, 1);
  justify-content: center;
  align-items: center;
}
.text_6 {
  margin-left: 1.08px;
  align-self: flex-start;
  color: rgb(255, 255, 255);
  font-size: 40px;
  font-family: SF Pro Display;
  font-weight: 700;
  line-height: 38.16px;
}
.group_5 {
  margin-top: 34.54px;
}
.group_6 {
  margin-top: 27.66px;
}
.text_12 {
  margin-top: 32.02px;
  align-self: flex-start;
  color: rgba(255, 255, 255, 0.7);
  font-size: 13px;
  font-family: SF Pro Text;
  line-height: 12.12px;
}
.group_8 {
  margin-top: 32.98px;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
}
.text_4 {
  margin: 1px 0 3.2px 11.81px;
  color: rgb(255, 255, 255);
  font-size: 15px;
  font-family: ABeeZee;
  line-height: 13.94px;
}
.text_15 {
  margin-left: 10.26px;
  align-self: center;
  color: rgb(255, 255, 255);
  font-size: 15px;
  font-family: ABeeZee;
  line-height: 13.96px;
}
.text_7 {
  color: rgba(255, 255, 255, 0.7);
  font-size: 15px;
  font-family: SF Pro Text;
  line-height: 23px;
}
.text_8 {
  color: rgba(255, 255, 255, 0.7);
  font-size: 15px;
  font-family: SF Pro Text;
  line-height: 23px;
}
.view_4 {
  margin-top: 19px;
}
.text_11 {
  color: rgb(14, 67, 92);
  font-size: 17px;
  font-family: SF Pro Text;
  font-weight: 600;
  line-height: 16.48px;
}
.divider {
  margin-right: 20px;
  background-color: rgba(255, 255, 255, 0.2);
  height: 0.5px;
}
.group_9 {
  margin-left: 1.21px;
  margin-top: 17.96px;
  align-self: flex-start;
  line-height: 12px;
}
.group_7 {
  margin-left: 10px;
}
.view_3 {
  border: none;
  overflow-x: hidden;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    180deg,
    rgba(99, 106, 150, 0.4) 0%,
    rgba(182, 186, 214, 0.25) 100%
  );
  box-shadow: 0px 20px 40px rgba(0, 0, 0, 0.15);
  backdrop-filter: blur(40px);
  font-size: 15px;
  color: white;
  border-radius: 6px;
  transition: 1s cubic-bezier(0.075, 0.82, 0.165, 1);
}
.view_5 {
  overflow: hidden;
  width: 94px;
}
.text_13 {
  color: rgba(255, 255, 255, 0.7);
  font-size: 13px;
  font-family: SF Pro Text;
  line-height: 12.1px;
}
.text_14 {
  color: rgb(0, 207, 253);
  font-size: 13px;
  font-family: SF Pro Text;
  font-weight: 600;
  line-height: 12.26px;
  display: inline-block;
  transition: 1s cubic-bezier(0.075, 0.82, 0.165, 1);
}
.text_9 {
  margin-left: 17.7px;
  flex-shrink: 0;
  align-self: center;
  color: rgb(255, 255, 255);
  font-size: 15px;
  font-family: SF Pro Text;
  line-height: 11.32px;
  width: 600px;
}
.text_10 {
  margin-left: 17.2px;
  margin-top: 12.93px;
  flex-shrink: 0;
  color: rgb(255, 255, 255);
  font-size: 15px;
  font-family: SF Pro Text;
  line-height: 5.41px;
  align-self: center;
}
.bottom:hover {
  background: rgba(255, 255, 255, 0.1);
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.1),
    inset 0px 0px 0px 0.5px rgba(255, 255, 255, 0.2);
  border-radius: 10px;
  cursor: pointer;
}
.view-gokJcyw9:hover {
  transform: scale(1.4);
  cursor: pointer;
}
.view-lpqp2X1q:hover {
  filter: hue-rotate(10deg) brightness(150%) saturate(120%);
  cursor: pointer;
  border-radius: 30px;
}
.text-BG2F1jhg:hover {
  cursor: pointer;
}

.inlineText {
  color: aliceblue;
  transition: 1s cubic-bezier(0.075, 0.82, 0.165, 1);
}

.inlineText:hover {
  cursor: pointer;
  color: #00cffd;
  background: rgba(50, 61, 109, 0.5);
  box-shadow: 0px 50px 100px rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(40px);
}
</style>
