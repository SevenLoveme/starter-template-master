import request from "../../utils/request";
export default {

  //登录
  userLogin(userInfo){
    return request({
      url:`/educenter/member/login`,
      method:'post',
      data:userInfo
    })
  },

  //通过token获取用户信息
  getUserInfo(){
    return request({
      url:`/educenter/member/getUserInfo`,
      method:'get',
    })
  }
}
