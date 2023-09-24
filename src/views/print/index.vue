<template>
  <div>
    <div class="padding20px">
      <span class="todo-order">未完成订单</span
      ><span class="todo-count"> 共{{ totalNumber }}个</span>
      <el-button @click="handleSearch" class="btn-search" type="text"
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
              v-for="(docItem, index) in item.printDocModels"
              :key="docItem.id"
              class="order-detail-section"
            >
              <div>
                <img :src="require('../../assets/word.png')" alt="" />
              </div>
              <div class="order-detail-line">
                <div class="order-detail-name">
                  {{ docItem.fileName }}
                  <span v-if="index == 0" class="order-status">{{
                    enums.OrderStatus[item.orderStatus]
                  }}</span>
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
                <div @click="handlePrint" class="operation">
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
                    @change="fileChange"
                    name="files[]"
                    multiple
                  />
                  <img
                    src="../../assets/folder.png"
                    @click="btnChange"
                    alt=""
                  />
                </div>
                <div @click="handleCancel" class="operation">
                  <img src="../../assets/cancel.png" alt="" />
                </div>
                <div @click="handleFinish" class="operation">
                  <img src="../../assets/finish.png" alt="" />
                </div>
                <!-- <div
                  v-if="item.status == '已退款'"
                  @click="handleFinish"
                  class="operation"
                >
                  <img src="../../assets/finish_disable.png" alt="" />
                </div> -->
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
export default {
  data() {
    return {
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
    };
  },
  created() {
    this.search();
  },
  methods: {
    async search() {
      let res = printerApi
        .getOrder({
          pageIndex: 1,
          pageSize: 100,
          orderStatus: [6],
        })
        .then((res) => {
          this.totalNumber = res.totalNumber;
          if (this.totalNumber > 0) {
            this.hasOrder = true;
          }
          this.orderList = res.result;
        });
    },
    handleSearch() {
      this.search();
    },
    async handlePrint() {
      console.log("handlePrint");
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
          debugger;
          this.downloadTest(item.url);
          //this.downloadFile(item.url);
        });
    },
    async handleFolder() {
      console.log("handleFolder");
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
    downloadTest(url) {
      // 获取下载按钮
      //const downloadButton = document.getElementById("downloadButton");

      // 文件的URL
      // const fileUrl =
      //   "https://www.runoob.com/wp-content/uploads/2013/06/image-icon.png";
      const fileUrl = url;
      // 使用XMLHttpRequest下载文件
      const xhr = new XMLHttpRequest();
      xhr.responseType = "blob"; // 将响应类型设置为Blob

      xhr.onload = function () {
        debugger;
        if (xhr.status === 200) {
          // 创建一个Blob URL，用于下载
          const blobUrl = URL.createObjectURL(xhr.response);

          // 创建一个下载链接
          const downloadLink = document.createElement("a");
          downloadLink.href = blobUrl;
          downloadLink.download = "sample.png";
          downloadLink.style.display = "none";

          // 将下载链接添加到文档中
          document.body.appendChild(downloadLink);

          // 模拟点击下载链接
          downloadLink.click();

          // 下载完成后触发通知
          //showNotification("文件下载已完成！");
          alert("文件下载已完成！");
        } else {
          alert("文件下载失败！");
        }
      };

      // 发送GET请求以下载文件
      xhr.open("GET", fileUrl);
      xhr.send();
    },
    downloadFile(path) {
      const iframe = document.createElement("iframe");
      iframe.style.display = "none";
      iframe.style.height = 0;
      iframe.src = path;
      document.body.appendChild(iframe);
      setTimeout(() => {
        iframe.remove();
      }, 5 * 60 * 1000);
    },
    async handleCancel() {
      this.$confirm("是否确认取消订单并进行退款?", {
        confirmButtonText: "确 认",
        cancelButtonText: "取 消",
        type: "warning",
      })
        .then(() => {
          //doSomething()
        })
        .catch(() => {
          //doSomething()
        });
    },
    async handleFinish() {
      this.$confirm("是否确认已完成订单并收款?", {
        confirmButtonText: "确 认",
        cancelButtonText: "取 消",
        type: "warning",
      })
        .then(() => {
          alert("确 认");
        })
        .catch(() => {
          //doSomething()
        });
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
    // 获取打印机列表
    getPrintList() {
      // const json = {
      //   action: "printers",
      //   refresh: true,
      //   defaultprn: true,
      // };
      printWorld.CallbackOnPrinterList((list) => {
        this.printList = list.val;
        // console.log(this.printList)
        this.printList.forEach((item) => {
          if (item.default) {
            this.form.printer = item.name;
          }
        });
      });
      //printWorld.Act(json);
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
  padding-right: 10px;
}

.order-status-downloaded {
  color: #40db98;
}

.order-status-refund {
  color: #595959;
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
.btn-search {
  font-size: 20px;
  margin-left: 10px;
  color: #1f1f1f;
  float: right;
}
</style>