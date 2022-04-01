import request from "../utils/request";
export default {
  //生成订单接口
  getCreateOrder(courseId){
    return request({
      url:`/eduorder/torder/createOrder/${courseId}`,
      method:'post'
    })
  },
  //获取订单接口
  getOrderInfo(orderId){
    return request({
      url:`/eduorder/torder/getOrderInfo/${orderId}`,
      method:'get'
    })
  },
  //生成支付二维码
  createNative(orderNo){
    return request({
      url:`/eduorder/paylog/createNative/${orderNo}`,
      method:'get'
    })
  },
  //查询订单状态
  getPayStatus(orderNo){
    return request({
      url:`/eduorder/paylog/getPayStatus/${orderNo}`,
      method:'get'
    })
  },

  getIsBuyCourse(courseId){
    return request({
      url:`/eduorder/torder/getIsBuyCourse/${courseId}`,
      method:'get'
    })
  }

}
