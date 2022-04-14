<template>

  <div class="in-wrap">

    <!-- 公共头引入 -->

    <header id="header">

      <section class="container">

        <h1 id="logo">

          <a href="/" title="西安外事学院">

            <img src="~/assets/img/wslogo.png" width="100%" alt="西安外事学院">

          </a>

        </h1>

        <div class="h-r-nsl">

          <ul class="nav">

            <router-link to="/" tag="li" active-class="current" exact>

              <a>首页</a>

            </router-link>

            <router-link to="/course" tag="li" active-class="current">

              <a>课程</a>

            </router-link>

            <router-link to="/teacher" tag="li" active-class="current">

              <a>名师</a>

            </router-link>

            <router-link to="#" tag="li" active-class="current" @click.native="messageInfo">

              <a>文章</a>

            </router-link>

            <router-link to="#" tag="li" active-class="current" @click.native="messageInfo">

              <a>问答</a>

            </router-link>

          </ul>

          <!-- / nav -->
          <ul class="h-r-login">
            <li v-if="!loginInfo.id" id="no-login">
              <a href="/user/login" title="登录">
                <em class="icon18 login-icon">&nbsp;</em>
                <span class="vam ml5">登录</span>
              </a>
              |
              <a href="/user/register" title="注册">
                <span class="vam ml5">注册</span>
              </a>
            </li>
            <li v-if="loginInfo.id" id="is-login-one" class="mr10">
              <a id="headerMsgCountId" href="#" title="消息">
                <em class="icon18 news-icon">&nbsp;</em>
              </a>
              <q class="red-point" style="display: none">&nbsp;</q>
            </li>
            <li v-if="loginInfo.id" id="is-login-two" class="h-r-user">
              <a href="/ucenter" title>
                <img
                  :src="loginInfo.avatar"
                  width="30"
                  height="30"
                  class="vam picImg"
                  alt
                >
                <span id="userName" class="ml5">{{loginInfo.nickname}}</span>
              </a>
              <a href="javascript:void(0);" title="退出" @click="logout()" class="ml5">退出</a>
            </li>
            <!-- /未登录显示第1 li；登录后显示第2，3 li -->
          </ul>

          <aside class="h-r-search">


              <label class="h-r-s-box">

                <input v-model="search" type="text"  placeholder="输入你想学的课程" />

                <button @click="searchCourse" type="submit" class="s-btn">

                  <em class="icon18">&nbsp;</em>

                </button>

              </label>

          </aside>

        </div>

        <aside class="mw-nav-btn">

          <div class="mw-nav-icon"></div>

        </aside>

        <div class="clear"></div>

      </section>

    </header>

    <!-- /公共头引入 -->


    <nuxt/>


    <!-- 公共底引入 -->

    <footer id="footer">

      <section class="container">

        <div class>

          <h4 class="hLh30">

            <span class="fsize18 f-fM c-999">友情链接</span>

          </h4>

          <ul class="of flink-list">

            <li>

              <a href="https://github.com/SevenLoveme/starter-template-master" title="项目地址" target="_blank">项目地址</a>

            </li>

          </ul>

          <div class="clear"></div>

        </div>

        <div class="b-foot">

          <section class="fl col-7">

            <section class="mr20">

              <section class="b-f-link">

                <a href="#" title="关于我们" target="_blank">关于我们</a>|

                <a href="#" title="联系我们" target="_blank">联系我们</a>|

                <a href="#" title="帮助中心" target="_blank">帮助中心</a>|

                <a href="#" title="资源下载" target="_blank">资源下载</a>|

                <span>服务热线：17792424871</span>

                <span>Email：3105674895@qq.com</span>

              </section>

              <section class="b-f-link mt10">


              </section>

            </section>

          </section>

          <aside class="fl col-3 tac mt15">

            <section class="gf-tx">

           <span>

             <img src="~/assets/img/wx-icon.png" />

           </span>

            </section>

            <section class="gf-tx">

           <span>

             <img src="~/assets/img/wb-icon.png" />

           </span>

            </section>

          </aside>
          <div class="clear"></div>
        </div>
      </section>
    </footer>
    <!-- /公共底引入 -->


  </div>

</template>

<script>

import cookie from "js-cookie";
import login from "../api/user/login";
import '~/assets/css/reset.css'
import '~/assets/css/theme.css'
import '~/assets/css/global.css'
import '~/assets/css/web.css'
import '~/assets/css/base.css'
import '~/assets/css/activity_tab.css'
import '~/assets/css/bottom_rec.css'
import '~/assets/css/nice_select.css'
import '~/assets/css/order.css'
import '~/assets/css/swiper-3.3.1.min.css'
import "~/assets/css/pages-weixinpay.css"
export default {
  data() {
    return {
      token:'',
      search:'',
      loginInfo: {
        id: '',
        age: '',
        avatar: '',
        mobile: '',
        nickname: '',
        sex: ''
      }
    }
  },
  methods: {
    messageInfo(){
      this.$message({
        showClose: true,
        message: '该功能已被封印',
      })
      window.location.href="/"
    },
    searchCourse(){
      cookie.set('search', this.search)
      window.location.href="/course"
    },
    //微信登录显示
    wxLogin() {
      cookie.set('my_token',this.token, {domain: 'localhost'})
      cookie.set('ucenter','', {domain: 'localhost'})
      login.getUserInfo().then(result => {
        this.loginInfo = result.data.data.userInfo
        console.log(this.loginInfo)
        cookie.set('ucenter',this.loginInfo,{domain:'localhost'})
      })
    },

    //退出
    logout(){
      //清空cookie
      cookie.set('ucenter','',{domain:'localhost'})
      cookie.set('my_token','',{domain:'localhost'})
      this.loginInfo = {};
      window.location.href = '/'
    },

    // 从cookie获取用户信息
    showInfo() {
      var userStr = cookie.get('ucenter');

      //把字符串转化为json字符串
      if (userStr) {
        this.loginInfo = JSON.parse(userStr)
      }

    }
  },
  created() {
    this.token = this.$route.query.token
    console.log(this.token)
    if (this.token) {
      this.wxLogin()
    }
    this.showInfo()
  },
};

</script>
