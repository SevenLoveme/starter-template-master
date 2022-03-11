import request from "../../utils/request";
export default {
  
  //注册
  userLogin(RegisterVo){
    return request({
      url:`/educenter/member/register`,
      method:'post',
      data:RegisterVo
    })
  },

  //发送验证码
  userSendCode(phoneNumber){
    return request({
      url:`/edumsm/msm/send/${phoneNumber}`,
      method:'get'
    })
  },

  //登陆
  userRegister(member){
    return request({
      url:`/educenter/member/register`,
      method:'post',
      data:member
    })
  },
}