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
                <div @click="handleDownload(item)" class="operation">
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
    // this.downloadFile(
    //   "http://43.142.4.18:8011/data/IFB-Job24-10_Appendix_A.pdf"
    // );
    this.search();
    printWorld = GetPrintWorld();
  },
  methods: {
    async search() {
      let res = printerApi
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
        debugger;
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
        alert(printWorld.GetLastError());
      }
    },
    Callback4PrintTaskStatus(json) {
      var msg = "";
      switch (json.stage) {
        case "starting": //打印任务已经提交给打天下
          break;
        case "printing": //打印中
          msg = "printing";
          console.log(msg);
          break;
        case "jobending": //一个打印Job结束，有两种情况：1、Job打印完毕；2、打印Job被人为取消或删除。换句话所说，如果没有人为取消打印操作，则打印成功完成。
          debugger;
          alert("打印完毕或者打印任务被取消!");
          break;
        case "ending": //打印任务结束
          if (json.jobstatustext != "") {
            //说明打印准备过程中出错，由于并没有真正启动打印，这种情况不会有"printing"和"jobending"这两个阶段出现。
            alert(json.jobstatustext);
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
    async handleDownload(item) {
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
      debugger;
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
    downloadFile(url) {
      const iframe = document.createElement("iframe");
      iframe.style.display = "none"; // 防止影响页面
      iframe.style.height = 0; // 防止影响页面
      iframe.src = url;
      document.body.appendChild(iframe); // 这一行必须，iframe挂在到dom树上才会发请求
      // 5分钟之后删除（onload方法对于下载链接不起作用，就先抠脚一下吧）
      setTimeout(() => {
        iframe.remove();
      }, 5 * 60 * 1000);
    },
    fileChange(e) {
      try {
        debugger;
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