<template>
  <div>
    <div class="padding20px">
      <span class="todo-order">未完成订单</span
      ><span class="todo-count"> 共1个</span>
      <i class="el-icon-refresh-right float-right"></i>
    </div>
    <div class="order-info-section">
      <div class="border-bottom">
        <div class="order-info-date">
          <span>2023-04-07 11:56</span>
          <span class="order-code-label"
            >取件码：<span class="order-code">00-12</span></span
          >
        </div>
      </div>
      <div>
        <div class="order-detail-section">
          <div>
            <img src="../../assets/pdf.png" alt="" />
          </div>
          <div class="order-detail-line">
            <div class="order-detail-name">
              测试文档.pdf
              <span class="order-status">已下载</span>
            </div>
            <div class="order-detail-info">
              A4|纵向|黑白|单面|4份|打印[1-12]页
            </div>
          </div>
        </div>
        <div class="reminder-container">
          <i class="el-icon-warning reminder-icon"></i>
          <span class="reminder-label">搜索不到可用打印机</span>
        </div>
      </div>
      <div class="order-footer">
        <div class="display-flex">
          <div>
            <img
              class="vertical-align-bottom"
              src="../../assets/wechatpay.svg"
              alt=""
            /><span class="order-price">¥1.2</span>
            <img
              class="vertical-align-bottom margin-left15px"
              src="../../assets/shop.svg"
              alt=""
            />
            <span class="printer-type">店内打印</span>
          </div>
          <div class="operation-container">
            <div class="operation">
              <img src="../../assets/printer.svg" alt="" />
            </div>
            <div class="operation">
              <img src="../../assets/folder_download.svg" alt="" />
            </div>
            <div class="operation">
              <img src="../../assets/folder.svg" alt="" />
            </div>
            <div class="operation">
              <img src="../../assets/cancel.svg" alt="" />
            </div>
            <div class="operation">
              <img src="../../assets/finish.svg" alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.vertical-align-bottom {
  vertical-align: bottom;
}
.display-flex {
  display: flex;
}
.float-right {
  float: right;
}
.margin-left15px {
  margin-left: 15px;
}
.padding20px {
  padding: 20px;
}
.operation {
  width: 32px;
  height: 32px;
  background: rgba(218, 218, 218, 0);
  border-radius: 2px;
  border: 1px solid #40db98;
  float: right;
  margin-left: 5px;
  padding: 6px;
}
.todo-order {
  font-size: 14px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #000000;
}
.todo-count {
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #595959;
  margin-left: 10px;
}
.order-info-section {
  background-color: white;
  margin: 10px;
  border-radius: 10px;
}
.order-info-date {
  padding: 20px;
  font-size: 14px;
  font-family: HelveticaNeue;
  color: #000000;
}
.order-code-label {
  float: right;
  padding: 3px 0;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #000000;
}
.order-code {
  font-size: 20px;
  font-family: HelveticaNeue;
  color: #000000;
}
.order-detail-section {
  display: flex;
  padding: 10px;
}
.order-detail-line {
  flex: 1 1 auto;
  padding-left: 10px;
  padding-top: 10px;
}
.order-detail-name {
  color: rgba(0, 0, 0, 1);
  font-size: 14px;
  font-family: PingFangSC-Regular;
}
.order-status {
  float: right;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #40db98;
  padding-right: 10px;
}
.order-detail-info {
  margin-top: 8px;
  color: rgba(89, 89, 89, 1);
  font-size: 12px;
  font-family: PingFangSC-Regular;
}
.border-bottom {
  border-bottom: 1px solid rgb(226, 222, 222);
}
.reminder-container {
  width: 99%;
  height: 40px;
  margin: 10px auto;
  background-color: #fffbe6;
  border-radius: 5px;
  padding: 10px;
}
.reminder-icon {
  color: #ffe58f;
}
.reminder-label {
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #595959;
  margin-left: 8px;
}
.order-footer {
  border-top: 1px solid rgb(226, 222, 222);
  height: 60px;
  padding: 20px;
}
.order-price {
  font-size: 16px;
  font-family: HelveticaNeue;
  color: #000000;
  font-weight: 400;
  vertical-align: bottom;
  margin-left: 5px;
}
.printer-type {
  font-size: 16px;
  font-family: HelveticaNeue;
  color: #000000;
  font-weight: 400;
  vertical-align: bottom;
  margin-left: 5px;
}
.operation-container {
  flex: 1 1 auto;
}
</style>