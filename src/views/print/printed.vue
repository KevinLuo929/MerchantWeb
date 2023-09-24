<template>
  <div>
    <div class="padding20px">
      <el-row>
        <el-col :span="10" class="line-height40px">
          <span class="todo-order">已完成订单</span
          ><span class="todo-count"> 共{{ totalNumber }}个</span></el-col
        >
        <div class="filter-section">
          <el-input
            placeholder="查询订单请输入取件码数字"
            v-model="takeNumber"
            class="width400px"
          >
            <template slot="append"
              ><el-button
                @click="handleSearch"
                class="padding-left5px"
                type="text"
                >搜索</el-button
              ></template
            >
          </el-input>
          <el-button
            class="btn-search"
            type="text"
            icon="el-icon-refresh-right"
            @click="handleRefresh()"
          ></el-button>
        </div>
      </el-row>
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
                </div>
                <div class="order-detail-info">
                  <span>{{ enums.PaperKind[docItem.paperKind] }}</span>
                  |<span>{{
                    enums.PageOrientation[docItem.pageOrientation]
                  }}</span
                  >|<span>{{ enums.PageColor[docItem.printColor] }}</span
                  >|<span>{{ enums.PageDuplex[docItem.printDuplex] }}</span
                  >|<span>{{ docItem.copies }}份</span>|<span
                    >打印[{{ docItem.printPages }}]页</span
                  >
                </div>
              </div>
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
                <div @click="handlePrint(item)" class="operation">
                  <img src="../../assets/printer.png" alt="" />
                </div>
                <div @click="handleShowDownloadDialog(item)" class="operation">
                  <img src="../../assets/folder_download.png" alt="" />
                </div>
                <div @click="handleFolder" class="operation">
                  <input
                    type="file"
                    id="file"
                    hidden
                    name="files[]"
                    multiple
                    @change="fileChange"
                  />
                  <img
                    src="../../assets/folder.png"
                    @click="btnChange"
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <el-dialog :visible.sync="dialogDownload" width="30%" center>
        <span slot="title" class="dialog-title">请选择需要下载的文件</span>

        <div
          v-for="docItem in downloadDocList"
          :key="docItem.id"
          class="order-detail-section"
        >
          <div class="checkbox">
            <el-checkbox
              @change="handleSingleSelect"
              v-model="docItem.checked"
            ></el-checkbox>
          </div>
          <div class="margin-left10px">
            <img :src="require('../../assets/word.png')" alt="" />
          </div>
          <div class="order-detail-line">
            <div class="order-detail-name">
              {{ docItem.fileName }}
            </div>
            <div class="order-detail-info">
              <span>{{ enums.PaperKind[docItem.paperKind] }}</span>
              |<span>{{ enums.PageOrientation[docItem.pageOrientation] }}</span
              >|<span>{{ enums.PageColor[docItem.printColor] }}</span
              >|<span>{{ enums.PageDuplex[docItem.printDuplex] }}</span
              >|<span>{{ docItem.copies }}份</span>|<span
                >打印[{{ docItem.printPages }}]页</span
              >
            </div>
          </div>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-row>
            <el-col :span="12">
              <el-checkbox
                class="selectAll"
                v-model="selectAll"
                @change="handleSelectAll"
                >全选</el-checkbox
              >
            </el-col>
            <el-col :span="12">
              <el-button class="btn-download" @click="handleDownloadDoc"
                >下载</el-button
              >
            </el-col>
          </el-row>
        </div>
      </el-dialog>
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
var prnStatusCollect = {
  //打印机状态集合
  PRINTER_STATUS_PAUSED: 0x00000001,
  PRINTER_STATUS_ERROR: 0x00000002,
  PRINTER_STATUS_PENDING_DELETION: 0x00000004,
  PRINTER_STATUS_PAPER_JAM: 0x00000008,
  PRINTER_STATUS_PAPER_OUT: 0x00000010,
  PRINTER_STATUS_MANUAL_FEED: 0x00000020,
  PRINTER_STATUS_PAPER_PROBLEM: 0x00000040,
  PRINTER_STATUS_OFFLINE: 0x00000080,
  PRINTER_STATUS_IO_ACTIVE: 0x00000100,
  PRINTER_STATUS_BUSY: 0x00000200,
  PRINTER_STATUS_PRINTING: 0x00000400,
  PRINTER_STATUS_OUTPUT_BIN_FULL: 0x00000800,
  PRINTER_STATUS_NOT_AVAILABLE: 0x00001000,
  PRINTER_STATUS_WAITING: 0x00002000,
  PRINTER_STATUS_PROCESSING: 0x00004000,
  PRINTER_STATUS_INITIALIZING: 0x00008000,
  PRINTER_STATUS_WARMING_UP: 0x00010000,
  PRINTER_STATUS_TONER_LOW: 0x00020000,
  PRINTER_STATUS_NO_TONER: 0x00040000,
  PRINTER_STATUS_PAGE_PUNT: 0x00080000,
  PRINTER_STATUS_USER_INTERVENTION: 0x00100000,
  PRINTER_STATUS_OUT_OF_MEMORY: 0x00200000,
  PRINTER_STATUS_DOOR_OPEN: 0x00400000,
  PRINTER_STATUS_SERVER_UNKNOWN: 0x00800000,
  PRINTER_STATUS_POWER_SAVE: 0x01000000,
  PRINTER_STATUS_SERVER_OFFLINE: 0x02000000,
  PRINTER_STATUS_DRIVER_UPDATE_NEEDED: 0x04000000,
};
var jobStatusCollect = {
  //打印Job状态集合
  JOB_STATUS_BLOCKED_DEVQ: 0x00000200, //The driver cannot print the job.
  JOB_STATUS_COMPLETE: 0x00001000, //Windows XP and later: Job is sent to the printer, but the job may not be printed yet.
  JOB_STATUS_DELETED: 0x00000100, //Job has been deleted.
  JOB_STATUS_DELETING: 0x00000004, //Job is being deleted.
  JOB_STATUS_ERROR: 0x00000002, //An error is associated with the job.
  JOB_STATUS_OFFLINE: 0x00000020, //Printer is offline.
  JOB_STATUS_PAPEROUT: 0x00000040, //Printer is out of paper.
  JOB_STATUS_PAUSED: 0x00000001, //Job is paused.
  JOB_STATUS_PRINTED: 0x00000080, //Job has printed.
  JOB_STATUS_PRINTING: 0x00000010, //Job is printing.
  JOB_STATUS_RESTART: 0x00000800, //Job has been restarted.
  JOB_STATUS_RETAINED: 0x00002000, //Windows Vista and later: Job has been retained in the print queue and cannot be deleted.
  JOB_STATUS_SPOOLING: 0x00000008, //Job is spooling.
  JOB_STATUS_USER_INTERVENTION: 0x00000400, //Printer has an error that requires the user to do something.
};
export default {
  data() {
    return {
      takeNumber: "",
      enums: enums,
      showReminder: false,
      checked: false,
      selectAll: false,
      dialogDownload: false,
      hasOrder: true,
      totalNumber: 0,
      moment,
      orderList: [],
      downloadDocList: [],
      printJson: {
        action: "printfile",
        format: "file_url", // pdf_url,word_url,excel_url,ppt_url
        content: "https://www.webprintworld.com/download/master.pdf",
        printer: "HP LaserJet Professional M1219nf MFP",
        papersize: "9", //指定输出纸张类型。整数值，8为A3；9为A4；11为A5等等
        orientation: "0", // 1，为纵向；2，为横向。缺省为0
        colorful: "-1", // 2，彩色打印；1，黑白打印；-1，系统默认。缺省为-1
        duplex: "1", // 1，不双面打印；2，双面打印，长边翻转；3，双面打印，短边翻转。缺省为1
        copies: 1, // 打印份数，取值为大于等于1的整数，缺省为1。
        pages2print: "1",
        swap: false, //布尔类型，为true，则打印页面横向/纵向切换，即横向转纵向（纵向转横向）。缺省为false。
        printtask: "",
      },
    };
  },
  created() {
    printWorld = GetPrintWorld();
    this.search();
  },
  methods: {
    async search() {
      printerApi
        .getOrder({
          pageIndex: 1,
          pageSize: 100,
          orderStatus: [5],
        })
        .then((res) => {
          this.totalNumber = res.totalNumber;
          if (this.totalNumber > 0) {
            this.hasOrder = true;
          } else {
            this.hasOrder = false;
          }
          this.orderList = res.result;
        });
    },
    handleSearch() {
      printerApi.getOrderByTakeNumber(this.takeNumber).then((res) => {});
    },
    handleRefresh() {
      this.search();
    },
    async handlePrint(item) {
      item.printDocModels.forEach((d) => {
        this.printJson.content = d.url;
        this.printJson.papersize = d.paperKind;
        this.printJson.orientation = d.pageOrientation;
        this.printJson.colorful = d.printColor;
        this.printJson.duplex = d.printDuplex;
        this.printJson.copies = d.copies;
        //this.printJson.pages2print = this.getFormatPrintPage(d.printPages);
        this.printJson.pages2print = "1";
        this.printJson.printtask = item.orderId;
        this.print();
      });
    },
    print() {
      printWorld.CallbackOnPrintTaskStatus(this.Callback4PrintTaskStatus);
      if (!printWorld.Act(this.printJson)) {
        this.$message.error("打印失败：" + printWorld.GetLastError());
      }
    },
    Callback4PrintTaskStatus(json) {
      var msg = "";
      switch (json.stage) {
        case "starting":
          break;
        case "printing":
          msg = "";
          if (json.jobstatus == 0) {
            msg +=
              "The print queue was paused after the document finished spooling.\n";
          } else if (json.jobstatus & jobStatusCollect.JOB_STATUS_ERROR) {
            msg += "An error is associated with the job.\n";
          }

          if (json.prnstatus & prnStatusCollect.PRINTER_STATUS_PAPER_OUT) {
            msg += "缺纸";
          }
          if (json.prnstatus & prnStatusCollect.PRINTER_STATUS_PAPER_JAM) {
            msg += "卡纸";
          }
          if (msg != "") {
            this.$message.error("打印失败：" + msg);
          }
          break;
        case "jobending":
          this.$message({
            message: "打印成功",
            type: "success",
          });
          break;
        case "ending":
          if (json.jobstatustext != "") {
            this.$message.error("打印失败！");
          }
          break;
        default:
          break;
      }
    },
    getFormatPrintPage(printPages) {
      let result = "";
      printPages = printPages.split("-");
      for (let i = printPages[0]; i <= printPages[1]; i++) {
        result = result + i + ",";
      }
      return result.substring(0, result.length - 1);
    },
    async handleFolder() {
      console.log("handleFolder");
    },
    async handleShowDownloadDialog(item) {
      this.selectAll = false;
      this.downloadDocList = item.printDocModels;
      this.downloadDocList.forEach((item) => {
        this.$set(item, "checked", false);
      });
      this.dialogDownload = true;
    },
    async handleDownloadDoc() {
      this.dialogDownload = false;
      this.downloadDocList
        .filter((d) => d.checked)
        .forEach((item) => {
          this.downloadFile(item.url);
        });
    },
    downloadFile(blob, filename) {
      // debugger;
      // var downloadLink = document.createElement("a");
      // downloadLink.style.display = "none";
      // document.body.appendChild(downloadLink);
      // // 设置下载链接
      // downloadLink.href = url;
      // // 设置文件名（可选）
      // downloadLink.download = url.substring(url.lastIndexOf("/") + 1);
      // // 模拟点击下载链接
      // downloadLink.click();
      // // 移除下载链接元素
      // document.body.removeChild(downloadLink);
      const a = document.createElement("a");
      document.body.appendChild(a);
      a.style.display = "none";
      const url = window.URL.createObjectURL(blob);
      a.href = url;
      a.download = fileName;
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    },
    handleSingleSelect() {
      if (
        this.downloadDocList.filter((item) => item.checked).length ==
        this.downloadDocList.length
      ) {
        this.selectAll = true;
      } else {
        this.selectAll = false;
      }
    },
    handleSelectAll() {
      if (this.selectAll) {
        this.downloadDocList.forEach((item) => {
          item.checked = true;
        });
      } else {
        this.downloadDocList.forEach((item) => {
          item.checked = false;
        });
      }
    },

    fileChange(e) {
      try {
        const file = document.getElementById("file");
        if (file == null) return;
        console.log(file);
      } catch (error) {
        console.debug("choice file err:", error);
      }
    },
    btnChange() {
      var file = document.getElementById("file");
      file.click();
    },
  },
};
</script>
    
    <style scoped>
.width400px {
  width: 400px;
}
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
.padding-left5px {
  padding-left: 5px;
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
.line-height40px {
  line-height: 40px;
}
.filter-section {
  float: right;
  padding-right: 20px;
}
.btn-search {
  font-size: 20px;
  margin-left: 10px;
  color: #1f1f1f;
}
</style>