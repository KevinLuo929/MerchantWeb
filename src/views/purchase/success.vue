<template>
  <div class="container">
    <div class="pay-result-section">
      <div class="text-align-center">
        <img src="../../assets/pay_success.svg" alt="" />
        <h2>下单成功</h2>
        <div class="spec">请尽快完成转账，保证软件正常使用</div>
        <div class="spec margin-top5px">
          转账成功后，系统将自动为你开通门店系统权益
        </div>
      </div>
      <div class="pay-result-detail">
        <el-row>
          <el-col :span="6">转账金额: </el-col>
          <el-col :span="12">¥699.00</el-col>
        </el-row>
        <el-row class="margin-top10px">
          <el-col :span="6">收款公司名称： </el-col>
          <el-col :span="12">广州科技有限公司</el-col>
        </el-row>
        <el-row class="margin-top10px">
          <el-col :span="6">对公银行账户：</el-col>
          <el-col :span="12">592743894230</el-col>
        </el-row>
        <el-row class="margin-top10px">
          <el-col :span="6">开户行：</el-col>
          <el-col :span="12">招商银行芳草园支行</el-col>
        </el-row>
      </div>
      <div class="text-align-center margin-top20px">
        <el-button class="btn-copy-info">复制转账信息</el-button>
      </div>
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
.margin-top5px {
  margin-top: 5px;
}
.margin-top10px {
  margin-top: 10px;
}
.margin-top20px {
  margin-top: 20px;
}
.pay-result-section {
  width: 600px;
  height: 500px;
  margin: 20px auto;
  padding: 30px;
}
h2 {
  font-size: 24px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 600;
}
.spec {
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 500;
}
.pay-result-detail {
  background-color: rgb(247, 245, 245);
  padding: 20px;
  border-radius: 10px;
  font-weight: 600;
  margin-top: 24px;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 600;
}
.btn-copy-info {
  background-color: #40db98;
  color: #ffff;
}
</style>