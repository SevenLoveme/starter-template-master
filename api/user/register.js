import request from "../../utils/request";
export default {

  //注册
  userRegister(RegisterVo){
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
}
