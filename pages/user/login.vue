<template>
  <client-only>
    <div class="main">

      <div class="title">

        <a class="active" href="/user/login">登录</a>

        <span>·</span>

        <a href="/user/register">注册</a>

      </div>


      <div class="sign-up-container">

        <el-form ref="userForm" :model="user">


          <el-form-item class="input-prepend restyle" prop="mobile"
                        :rules="[{ required: true, message: '请输入手机号码', trigger: 'blur' },{validator: checkPhone, trigger: 'blur'}]">

            <div>

              <el-input type="text" placeholder="手机号" v-model="user.mobile"/>

              <i class="iconfont icon-phone"/>

            </div>

          </el-form-item>


          <el-form-item class="input-prepend" prop="password"
                        :rules="[{ required: true, message: '请输入密码', trigger: 'blur' }]">

            <div>

              <el-input type="password" placeholder="密码" v-model="user.password"/>

              <i class="iconfont icon-password"/>

            </div>

          </el-form-item>


          <div class="btn">

            <input type="button" class="sign-in-button" value="登录" @click="submitLogin()">

          </div>

        </el-form>

        <!-- 更多登录方式 -->

        <div class="more-sign">

          <h6>社交帐号登录</h6>

          <ul>

            <li><a id="weixin" class="weixin" target="_blank"
                   href="http://localhost:8160/api/ucenter/wx/login"><i
              class="iconfont icon-weixin"/></a>
            </li>

            <li><a id="qq" class="qq" target="_blank" href="#"><i class="iconfont icon-qq"/></a></li>

          </ul>

        </div>

      </div>


    </div>
  </client-only>
</template>

<script>
import login from "../../api/user/login";
import cookie from 'js-cookie'
import '~/assets/css/sign.css'
import '~/assets/css/iconfont.css'

export default {

  layout: 'sign',


  data() {

    return {

      user: {

        mobile: '',

        password: ''

      },

      loginInfo: {}

    }

  },


  methods: {

    //登录
    submitLogin() {

      const load = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });

      // 1 调用接口进行登陆
      login.userLogin(this.user).then(result => {

        if (result.data.code == 20000) {
          this.$message({
            showClose: true,
            message: '登录成功',
            type: 'success',
          })
          load.close()
        } else {
          this.$message({
            showClose: true,
            message: result.data.message,
            type: 'error',
          })
          load.close()
        }

        //2 把返回的token值放在cookie中
        cookie.set('my_token', result.data.data.token, {domain: 'localhost'})
        login.getUserInfo().then(result => {
          //返回用户信息并放在cookie里
          this.loginInfo = result.data.data.userInfo
          cookie.set('ucenter', JSON.stringify(this.loginInfo), {domain: 'localhost'})
          if (result.data.code == 20000) {
            window.location.href = "/"
          }
        })

      })
    },

    checkPhone(rule, value, callback) {

      //debugger

      if (!(/^1(3\d|4[5-9]|5[0-35-9]|6[567]|7[0-8]|8\d|9[0-35-9])\d{8}$/.test(value))) {

        return callback(new Error('手机号码格式不正确'))

      }

      return callback()

    }

  }

}

</script>
<style>
.el-form-item__error {
  z-index: 9999999;
}
</style>
