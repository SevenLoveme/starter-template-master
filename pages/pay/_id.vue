<template>
  <div class="cart py-container">
    <!--主内容-->
    <div class="checkout py-container  pay">
      <div class="checkout-tit">
        <h4 class="fl tit-txt" style="margin-left: 20%">
          <span class="success-icon"></span>
          <span class="success-info">订单提交成功，请您及时付款！订单号：{{payObj.out_trade_no}}</span>
        </h4>
        <span style="margin-right: 20%" class="fr"><em class="sui-lead">应付金额：</em><em class="orange money">￥{{payObj.total_fee}}</em></span>
        <div class="clearfix"></div>
      </div>
      <div class="checkout-steps">
        <div class="fl weixin">微信支付</div>
        <div class="fl sao">
          <p class="red">请使用微信扫一扫(五分钟内有效)。</p>
          <div class="fl code">

            <!-- <img id="qrious" src="~/assets/img/erweima.png" alt=""> -->
            <!-- <qriously value="weixin://wxpay/bizpayurl?pr=R7tnDpZ" :size="338"/> -->
            <qriously :value="payObj.code_url" :size="338"/>
            <div class="saosao">

              <p>请使用微信扫一扫</p>
              <p>扫描二维码支付</p>
            </div>

          </div>

        </div>
        <div class="clearfix"><div style="margin-right: 10%;margin-top: 15%;margin-left: 65%;font-size: 60px">￥{{payObj.total_fee}}</div></div>
        <!-- <p><a href="pay.html" target="_blank">> 其他支付方式</a></p> -->

      </div>
    </div>
  </div>
</template>
<script>
import order from "../../api/order";

export default {
  data(){
    return{
      payObj:{},
      orderNo:'',
      timer1:''
    }
  },
  created() {
    this.orderNo = this.$route.params.id
    this.createNative();
  },
  mounted() {
    this.timer1 = setInterval(()=>{
      this.getPayStatus()
    },3000)
    setTimeout(()=>{
      clearInterval(this.timer1)
      this.$router.push({path:'/course/'+this.payObj.course_id})
    },300000)
  },
  methods:{
    createNative(){
      order.createNative(this.orderNo).then(result => {
         this.payObj = result.data.data
      })
    },
    getPayStatus(){
      order.getPayStatus(this.orderNo).then(result => {
        if (result.data.code==25000){
          // this.$message({
          //   showClose: true,
          //   message: result.data.message,
          // })
        }
        if (result.data.code==20000){
          this.$message({
            showClose: true,
            message: result.data.message,
            type: 'success',
          })
          clearInterval(this.timer1)
          this.$router.push({path:'/course/'+this.payObj.course_id})
        }
        if (result.data.code == 20001) {
          this.$message({
            showClose: true,
            message: result.data.message,
            type: 'error',
          })
        }
      })
    }

  }
}
</script>
