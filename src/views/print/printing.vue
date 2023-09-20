<template>
  <div>
    <div class="padding20px">
      <span class="todo-order">正在打印订单</span
      ><span class="todo-count"> 共{{ totalNumber }}个</span>
      <i class="el-icon-refresh-right float-right"></i>
    </div>
    <div v-show="hasOrder">
      <div v-for="item in orderList" :key="item.orderId">
        <div class="order-info-section">
          <div class="border-bottom">
            <div class="order-info-date">
              <span>{{
                moment(item.createTime).format("YYYY-MM-DD HH:mm")
              }}</span>
              <span class="order-code-label"
                >取件码：<span class="order-code">{{
                  item.takeNumber
                }}</span></span
              >
            </div>
          </div>
          <div>
            <div
              v-for="docItem in item.printDocModels"
              :key="docItem.id"
              class="order-detail-section"
            >
              <div>
                <img :src="require('../../assets/word.png')" alt="" />
              </div>
              <div class="order-detail-line">
                <div class="order-detail-name">
                  {{ docItem.fileName }}
                  <!-- <span class="order-status">{{ item.status }}</span> -->
                </div>
                <div class="order-detail-info">
                  <span> {{ enums.PaperKind[docItem.paperKind] }}</span
                  >|<span>
                    {{ enums.PageOrientation[docItem.pageOrientation] }}</span
                  >|<span> {{ enums.PageColor[docItem.printColor] }}</span
                  >|<span> {{ enums.PageDuplex[docItem.printDuplex] }}</span
                  >|<span> {{ docItem.copies }}份</span>|<span>
                    打印[{{ docItem.printPages }}]页</span
                  >
                </div>
              </div>
            </div>
            <div class="reminder-container">
              <i class="el-icon-warning reminder-icon"></i>
              <span class="reminder-label">黑白6号机正在打印中...</span>
            </div>
          </div>
          <div class="order-footer">
            <div class="display-flex">
              <div>
                <img
                  class="vertical-align-bottom"
                  src="../../assets/wechatpay.svg"
                  alt=""
                /><span class="order-price">¥{{ item.totalPrice }}</span>
                <img
                  class="vertical-align-bottom margin-left15px"
                  src="../../assets/shop.svg"
                  alt=""
                />
                <span class="printer-type"></span>
              </div>
              <div class="operation-container">
                <div @click="handlePause" class="operation">
                  <img src="../../assets/pause.png" alt="" />
                </div>
                <!-- <div @click="handleRunning" class="operation">
                <img src="../../assets/running.png" alt="" />
              </div> -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-show="!hasOrder" class="no-order-section">
      <div><img src="../../assets/print_big.png" alt="" /></div>
      <div class="no-order-text">暂时没有订单哦~</div>
    </div>
  </div>
</template>
  
  <script>
import printerApi from "@/api/printer";
import moment from "moment";
import { enums } from "@/utils/common";
let printWorld;
let startTime;
export default {
  data() {
    return {
      enums: enums,
      checked: false,
      selectAll: false,
      dialogDownload: false,
      hasOrder: true,
      totalNumber: 0,
      orderList: [],
      moment,
    };
  },
  created() {
    this.search();

    // printWorld = GetPrintWorld();
    // this.getPrintList();
    // this.FilePages();
  },
  methods: {
    search() {
      printerApi
        .getOrder({
          pageIndex: 1,
          pageSize: 100,
          orderStatus: [0],
        })
        .then((res) => {
          debugger;
          this.totalNumber = res.totalNumber;
          if (this.totalNumber > 0) {
            this.hasOrder = true;
          }
          this.orderList = res.result;
          this.downloadFile();
        });
    },
    handlePause() {
      console.log("handlePause");
    },
    async handleRunning() {
      this.dialogDownload = true;
    },
    downloadFile() {
      this.orderList.forEach((d) => {
        d.printDocModels.forEach((m) => {
          var elemIF = document.createElement("iframe");
          elemIF.src = m.url;
          elemIF.style.display = "none";
          document.body.appendChild(elemIF);
        });
        updateOrderStatus(
          this.orderList
            .filter((f) => {
              return f.orderId == d.orderId;
            })
            .map((m) => ({
              orderId: m.orderId,
              orderStatus: 3,
              printDocs: m.printDocModels,
            }))
        );
      });
    },
    updateOrderStatus(params) {
      printerApi.updateOrderStatus(params).then((res) => {});
    },
    // 获取打印机列表
    getPrintList() {
      const json = {
        action: "printers",
        refresh: true,
        defaultprn: true,
      };
      printWorld.CallbackOnPrinterList((list) => {
        this.printList = list.val;
        // console.log(this.printList)
        this.printList.forEach((item) => {
          if (item.default) {
            this.form.printer = item.name;
          }
        });
      });
      printWorld.Act(json);
    },
    // 打印
    print() {
      console.log("打印", this.form);
      if (this.form.content == "") {
        alert("请输入链接");
        return;
      }
      printWorld.Act(this.form);
    },
    // 预览
    preview() {
      const json = { ...this.form, action: "previewfile" };
      console.log("预览", this.form, json);
      if (this.form.content == "") {
        alert("请输入链接");
        return;
      }
      printWorld.Act(json);
    },
    // 获取文件页数代码，如下，请参考：
    FilePages() {
      startTime = new Date().getTime();
      var json = {};
      json.action = "filepages";
      json.format = "pdf_url";
      // json.content = "https://img.bazhuay.com/1690791455125.docx?doc-convert/preview";
      // json.content = "https://www.webprintworld.com/download/master.pdf";
      // json.content = "https://img.bazhuay.com/1691640429623_903.pdf";
      json.content = "https://img.bazhuay.com/1691717961600_12.pdf";

      console.log("json", json);
      printWorld.CallbackOnFilePages(this.Callback4FilePages);
      if (!printWorld.Act(json)) {
        alert(printWorld.GetLastError());
      }
    },
    Callback4FilePages(json) {
      console.log("time=", new Date().getTime() - startTime);
      console.log("printWorld.Callback4FilePages", json);
      if (json.error == undefined) {
        // alert(json.val); //json.val，页数
      } else {
        alert(json.error);
      }
    },
  },
};
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
.margin-left10px {
  margin-left: 10px;
}
.margin-left15px {
  margin-left: 15px;
}
.padding20px {
  padding: 20px;
}
.operation {
  background: rgba(218, 218, 218, 0);
  float: right;
  margin-left: 5px;
  cursor: pointer;
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
  margin: 16px;
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
  color: #ff4d4f;
  padding-right: 10px;
}
.order-detail-info {
  margin-top: 8px;
  color: rgba(89, 89, 89, 1);
  font-size: 12px;
  font-family: PingFangSC-Regular;
}
.order-detail-info span {
  padding: 0 5px;
}
.border-bottom {
  border-bottom: 1px solid rgb(226, 222, 222);
}
.reminder-container {
  width: 99%;
  height: 40px;
  margin: 10px auto;
  background-color: rgba(230, 247, 255, 1);
  border-radius: 5px;
  padding: 10px;
}
.reminder-icon {
  color: #4672eb;
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

.no-order-section {
  text-align: center;
  padding: 100px;
}
.no-order-text {
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #595959;
  margin-top: 24px;
}
.checkbox {
  padding: 20px 0;
}
.selectAll {
  float: left;
  padding: 10px;
}
.btn-download {
  background-color: #40db98;
  color: #ffffff;
  float: right;
}
</style>