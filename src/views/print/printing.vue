<template>
  <div>
    <div class="padding20px">
      <span class="todo-order">正在打印订单</span
      ><span class="todo-count"> 共{{ totalNumber }}个</span>
      <el-button @click="handleRefresh" class="btn-search" type="text"
        ><i class="el-icon-refresh-right"></i
      ></el-button>
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
            <div v-show="item.PrintMsg != null" class="reminder-container">
              <i class="el-icon-warning reminder-icon"></i>
              <span class="reminder-label">{{ item.PrintMsg }}</span>
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
                <div v-show="item.PrintMsg != null" class="operation">
                  <img src="../../assets/pause.png" alt="" />
                </div>
                <div v-show="item.PrintMsg == null" class="operation">
                  <img src="../../assets/running.png" alt="" />
                </div>
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
import settingApi from "@/api/setting";
import moment from "moment";
import { enums } from "@/utils/common";
let printWorld;
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
      printJson: {
        action: "printfile",
        format: "file_url",
        content: "",
        printer: "",
        papersize: "9",
        orientation: "0",
        colorful: "-1",
        duplex: "1",
        copies: 1,
        pages2print: "1",
        swap: false,
        printtask: "",
      },
      printerList: [],
      blackPrinterList: [],
      colorfulPrinterList: [],
      blackAndColorfulPrinterList: [],
      isShut: false,
    };
  },
  created() {
    printWorld = GetPrintWorld();
    this.getShopStatus(this.search);
  },
  methods: {
    async search() {
      if (this.isShut) {
        this.hasOrder = false;
      } else {
        printerApi
          .getOrder({
            pageIndex: 1,
            pageSize: 100,
            orderStatus: [1],
          })
          .then((res) => {
            this.totalNumber = res.totalNumber;
            if (this.totalNumber > 0) {
              this.hasOrder = true;
            } else {
              this.hasOrder = false;
            }
            this.orderList = res.result;
            this.getAllPrinter(this.autoPrint);
          });
      }
    },
    getShopStatus(callback) {
      settingApi.getPrintShop().then((res) => {
        this.isShut = res.isShut;
        callback();
      });
    },
    getAllPrinter(callback) {
      settingApi.getPrinterSettingsData().then((res) => {
        this.printerList = res;
        this.blackPrinterList = res.filter((p) => p.supportColor == 1);
        this.colorfulPrinterList = res.filter((p) => p.supportColor == 2);
        this.blackAndColorfulPrinterList = res.filter(
          (p) => p.supportColor == 3
        );
        callback();
      });
    },
    getRecommendPrinter(orderId) {
      var printer = "";
      if (this.printerList.length == 1) {
        return this.printerList[0].printerName;
      } else {
        var currentOrderDocs = this.orderList.filter(
          (o) => o.orderId == orderId
        )[0].printDocModels;
        if (currentOrderDocs.findIndex((o) => o.printColor == 2) >= 0) {
          if (currentOrderDocs.findIndex((o) => o.printColor == 1) >= 0) {
            printer =
              this.blackAndColorfulPrinterList[
                Math.floor(
                  Math.random() * this.blackAndColorfulPrinterList.length
                )
              ].printerName;
          } else {
            var availablePrinter = this.colorfulPrinterList.concat(
              this.blackAndColorfulPrinterList
            );
            printer =
              availablePrinter[
                Math.floor(Math.random() * availablePrinter.length)
              ].printerName;
          }
        } else {
          if (this.blackPrinterList.length > 0) {
            printer =
              this.blackPrinterList[
                Math.floor(Math.random() * this.blackPrinterList.length)
              ].printerName;
          } else {
            printer =
              this.blackAndColorfulPrinterList[
                Math.floor(
                  Math.random() * this.blackAndColorfulPrinterList.length
                )
              ].printerName;
          }
        }
        return printer;
      }
    },
    handleRefresh() {
      this.search();
    },
    updateOrderStatus(orderId, orderStatus, docs) {
      printerApi
        .updateOrderStatus({
          orderId: orderId,
          orderStatus: orderStatus,
          printDocs: docs,
        })
        .then((res) => {});
    },
    async autoPrint() {
      this.orderList.forEach((item) => {
        var printer = this.getRecommendPrinter(item.orderId);
        item.printDocModels.forEach((doc) => {
          this.printJson.printer = printer;
          this.printJson.content = doc.url;
          this.printJson.papersize = doc.paperKind;
          this.printJson.orientation = doc.pageOrientation;
          this.printJson.colorful = doc.printColor;
          this.printJson.duplex = doc.printDuplex;
          this.printJson.copies = doc.copies;
          this.printJson.pages2print = this.getFormatPrintPage(doc.printPages);
          this.printJson.printtask = item.orderId + "|" + doc.id;
          //this.print();
        });
      });
    },
    getFormatPrintPage(printPages) {
      let result = "";
      printPages = printPages.split("-");
      for (let i = printPages[0]; i <= printPages[1]; i++) {
        result = result + i + ",";
      }
      return result.substring(0, result.length - 1);
    },
    print() {
      printWorld.CallbackOnPrintTaskStatus(this.Callback4PrintTaskStatus);
      if (!printWorld.Act(this.printJson)) {
        alert(printWorld.GetLastError());
      }
    },
    Callback4PrintTaskStatus(json) {
      var msg = "";
      var printTask = json.printtask;
      var orderId = printTask.split("|")[0];
      var docId = printTask.split("|")[1];
      var printingOrder = this.orderList.filter((o) => o.orderId == orderId);
      switch (json.stage) {
        case "starting":
          break;
        case "printing":
          msg = json.printer + "正在打印中...";
          this.orderList.forEach((p) => {
            if (p.orderId == orderId) {
              this.$set(p, "PrintMsg", msg);
            }
          });
          this.updateOrderStatus(orderId, printingOrder[0].orderStatus, [
            {
              docId: docId,
              filePrintStatus: 2,
            },
          ]);
          break;
        case "jobending":
          this.updateOrderStatus(orderId, printingOrder[0].orderStatus, [
            {
              docId: docId,
              filePrintStatus: 3,
            },
          ]);
          var finishedDocCount = printingOrder[0].printDocModels.filter(
            (doc) => doc.filePrintStatus == 3
          ).length;
          var totalDocCount = printingOrder[0].printDocModels.length;
          if (finishedDocCount == totalDocCount) {
            this.updateOrderStatus(orderId, 5, []);
            this.$message({
              message: "打印成功",
              type: "success",
            });
            this.orderList.map((item, index) => {
              if (item.orderId == orderId) {
                this.orderList.splice(index, 1);
                this.totalNumber = this.orderList.length;
                if (this.totalNumber > 0) {
                  this.hasOrder = true;
                } else {
                  this.hasOrder = false;
                }
              }
            });
          }
          break;
        case "ending":
          if (json.jobstatustext != "") {
            this.updateOrderStatus(orderId, 6, [
              {
                docId: docId,
                filePrintStatus: 4,
              },
            ]);
          }
          break;
        default:
          break;
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
.btn-search {
  font-size: 20px;
  margin-left: 10px;
  color: #1f1f1f;
  float: right;
}
</style>