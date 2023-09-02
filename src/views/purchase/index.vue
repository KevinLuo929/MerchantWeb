<template>
  <div class="container">
    <div class="title-container">
      <p>购买版本：门店品牌定制版（纯净无广告）</p>
      <p>购买时长：终身使用</p>
    </div>

    <div class="detail-container">
      <div class="detail-header">
        <span class="header-label">支付订单</span>
        <span class="header-memo"></span
        >（支付成功后可在服务群联系平台开具发票）
      </div>
      <el-tabs type="border-card" stretch="true">
        <el-tab-pane label="快捷支付">
          <div class="display-flex">
            <div class="qr-code-container">
              <el-image
                class="qr-code"
                src="https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg"
              ></el-image>
            </div>
            <div class="margin-left20px">
              <div class="margin-top20px">
                <span class="pay-label">实付：</span>
                <span class="vertical-align-bottom">¥</span>
                <span class="pay-price">99</span
                ><el-tag class="discount-tag">限时优惠</el-tag>
              </div>
              <div class="pay-spec-container">
                <img
                  class="vertical-align-bottom"
                  src="../../assets/wechat.svg"
                  alt=""
                />
                <img
                  class="margin-left5px vertical-align-bottom"
                  src="../../assets/zhifubao.svg"
                  alt=""
                />
                <span class="pay-spec-content">使用微信/支付宝扫码支付</span>
              </div>
              <div class="agree-spec-container">
                <span class="agree-spec-content">支付即视你同意</span>
                <a href="https://element.eleme.io" target="_blank"
                  >《商户合作服务协议》</a
                >条例
              </div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="对公转账">
          <div class="text-align-center">
            <div>
              <span class="pay-label">实付：</span>
              <span class="vertical-align-bottom">¥</span>
              <span class="pay-price">99</span
              ><el-tag class="discount-tag">限时优惠</el-tag>
            </div>
            <div class="margin-top20px">
              <el-popconfirm
                title="确定选择对公转账方式进行付款？"
                confirmButtonText="确认"
                confirmButtonType="success"
              >
                <el-button class="btn-transfer" slot="reference"
                  >进行对公转账</el-button
                >
              </el-popconfirm>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.container {
  background-color: #ffffff;
}
.text-align-center {
  text-align: center;
}
.vertical-align-bottom {
  vertical-align: bottom;
}
.margin-left5px {
  margin-left: 5px;
}
.margin-left20px {
  margin-left: 20px;
}
.margin-top20px {
  margin-top: 20px;
}
.title-container {
  padding-top: 10px;
}
.title-container p {
  padding-left: calc(45%);
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
}

.detail-container {
  width: 600px;
  margin: auto;
  padding: 30px;
}
.detail-header {
  background-color: #c4ffe0;
  height: 50px;
  padding: 15px;
  border-radius: 10px 10px 0 0;
}
.header-label {
  font-size: 16px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 600;
}
.header-memo {
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
}
.display-flex {
  display: flex;
}
.qr-code-container {
  padding-left: 30px;
  padding-top: 20px;
}
.qr-code {
  width: 100px;
  height: 100px;
}
.pay-label {
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  vertical-align: bottom;
}
.pay-price {
  vertical-align: bottom;
  font-size: 24px;
  font-family: HelveticaNeue;
  line-height: 22px;
}
.discount-tag {
  margin-left: 10px;
  transform: skew(160deg);
  background-color: #ff4d4f;
  color: white;
  height: 30px;
}
.pay-spec-container {
  margin-top: 20px;
  font-size: 14px;
  color: rgb(148, 144, 144);
}
.pay-spec-content {
  margin-left: 5px;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
}
.agree-spec-container {
  margin-top: 10px;
  font-size: 14px;
  color: rgb(148, 144, 144);
}
.agree-spec-content {
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
}
.agree-spec-container a {
  color: #40db98;
}
.btn-transfer {
  width: 300px;
  background-color: #40db98;
  color: #ffffff;
}
</style>