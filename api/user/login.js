import request from "../../utils/request";
export default {

  //登陆
  userRegister(member){
    return request({
      url:`/educenter/member/register`,
      method:'post',
      data:member
    })
  },

}
