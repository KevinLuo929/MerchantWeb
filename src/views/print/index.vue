<template>
  <div>
    <div class="padding20px">
      <span class="todo-order">未完成订单</span
      ><span class="todo-count"> 共{{ totalNumber }}个</span>
      <i class="el-icon-refresh-right float-right"></i>
    </div>
    <div v-show="hasOrder">
      <div
        v-for="item in orderList"
        :key="item.orderId"
        class="order-info-section"
      >
        <div class="border-bottom">
          <div class="order-info-date">
            <span>{{ item.created }}</span>
            <span class="order-code-label"
              >取件码：<span class="order-code">{{
                item.claimCode
              }}</span></span
            >
          </div>
        </div>
        <div>
          <div class="order-detail-section">
            <div>
              <img
                :src="require('../../assets/' + item.documentType + '.png')"
                alt=""
              />
            </div>
            <div class="order-detail-line">
              <div class="order-detail-name">
                {{ item.name }}
                <span
                  :class="[
                    item.status == '已下载'
                      ? 'order-status order-status-downloaded'
                      : 'order-status order-status-refunded',
                  ]"
                  >{{ item.status }}</span
                >
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
              /><span class="order-price">¥{{ item.price }}</span>
              <img
                class="vertical-align-bottom margin-left15px"
                src="../../assets/shop.svg"
                alt=""
              />
              <span class="printer-type">{{ item.printType }}</span>
            </div>
            <div class="operation-container">
              <div @click="handlePrint" class="operation">
                <img src="../../assets/printer.png" alt="" />
              </div>
              <div @click="handleDownload" class="operation">
                <img src="../../assets/folder_download.png" alt="" />
              </div>
              <div @click="handleFolder" class="operation">
                <img src="../../assets/folder.png" alt="" />
              </div>
              <div @click="handleCancel" class="operation">
                <img src="../../assets/cancel.png" alt="" />
              </div>
              <div
                v-if="item.status == '已下载'"
                @click="handleFinish"
                class="operation"
              >
                <img src="../../assets/finish.png" alt="" />
              </div>
              <div
                v-if="item.status == '已退款'"
                @click="handleFinish"
                class="operation"
              >
                <img src="../../assets/finish_disable.png" alt="" />
              </div>
            </div>
          </div>
        </div>
        <el-dialog
          :visible.sync="dialogDownload"
          width="30%"
          center
          :before-close="handleClose"
        >
          <span slot="title" class="dialog-title">请选择需要下载的文件</span>

          <div
            v-for="item in downloadList"
            :key="item.orderId"
            class="order-detail-section"
          >
            <div class="checkbox">
              <el-checkbox v-model="item.checked"></el-checkbox>
            </div>
            <div class="margin-left10px">
              <img
                :src="require('../../assets/' + item.documentType + '.png')"
                alt=""
              />
            </div>
            <div class="order-detail-line">
              <div class="order-detail-name">
                {{ item.name }}
              </div>
              <div class="order-detail-info">
                A4|纵向|黑白|单面|4份|打印[1-12]页
              </div>
            </div>
          </div>
          <div slot="footer" class="dialog-footer">
            <el-row>
              <el-col :span="12">
                <el-checkbox class="selectAll" v-model="allSelected"
                  >全选</el-checkbox
                >
              </el-col>
              <el-col :span="12">
                <el-button class="btn-download" @click="dialogDownload = false"
                  >下载</el-button
                >
              </el-col>
            </el-row>
          </div>
        </el-dialog>
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
export default {
  data() {
    return {
      checked: false,
      selectAll: false,
      dialogDownload: false,
      hasOrder: true,
      totalNumber: 0,
      orderList: [
        {
          orderId: "1",
          created: "2020-10-1 9:56",
          claimCode: "00-13",
          documentType: "pdf",
          name: "测试文档.pdf",
          status: "已下载",
          price: 1.2,
          printType: "店内打印",
        },
        {
          orderId: "2",
          created: "2023-10-1 11:56",
          claimCode: "00-12",
          documentType: "word",
          name: "测试文档2.word",
          status: "已退款",
          price: 1.2,
          printType: "远程下单（到店自取）",
        },
      ],
      downloadList: [
        {
          orderId: "1",
          checked: false,
          created: "2020-10-1 9:56",
          claimCode: "00-13",
          documentType: "pdf",
          name: "测试文档.pdf",
          status: "已下载",
          price: 1.2,
          printType: "店内打印",
        },
        {
          orderId: "2",
          checked: true,
          created: "2023-10-1 11:56",
          claimCode: "00-12",
          documentType: "word",
          name: "测试文档2.word",
          status: "已退款",
          price: 1.2,
          printType: "远程下单（到店自取）",
        },
      ],
    };
  },
  created() {
    this.search();
  },
  methods: {
    async search() {
      let res = printerApi
        .getOrder({
          pageIndex: 21474836,
          pageSize: 100,
          shopId: 2147483647,
          userId: 2147483647,
          orderStatus: 0,
        })
        .then((res) => {
          this.totalNumber = res.totalNumber;
          //this.orderList = res.result;
          // if (this.totalNumber > 0) {
          //   this.hasOrder = true;
          // }
        });
    },
    async handlePrint() {
      console.log("handlePrint");
    },
    async handleDownload() {
      this.dialogDownload = true;
    },
    async handleFolder() {
      console.log("handleFolder");
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
          //doSomething()
        })
        .catch(() => {
          //doSomething()
        });
    },
  },
  computed: {
    allSelected: {
      get() {
        return this.downloadList.every((i) => {
          return i.checked;
        });
      },
      set(isCheck) {
        this.downloadList.forEach((t) => {
          t.checked = isCheck;
        });
      },
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
</style>