<template>
  <div class="container">
    <div>
      <span class="min-consume-label">门店订单最低消费：</span>
      <el-input v-model="minConsumeValue" placeholder="请输入价格"></el-input>
      <el-switch
        class="margin-left10px"
        v-model="isOpenMinConsume"
        @change="changeOpenMinConsume"
        active-color="#13ce66"
      >
      </el-switch>
    </div>
    <div class="margin-top8px">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane name="first">
          <span slot="label">
            文档打印价格设置<el-tooltip
              class="item"
              effect="dark"
              placement="bottom-start"
            >
              <div slot="content" class="spec">
                商家营业额到账时，微信支付宝会收取千分之六的商户支付通道手续费。如需调低手续费，并确定长期使用，可使用店主微信进入我们公众号下方菜单栏点击支付商户号申请，变更为次日凌晨到账银行卡（手续费降为千分之3.8）。
              </div>
              <i
                class="el-icon-warning-outline margin-left5px"
              ></i> </el-tooltip
          ></span>
          <div
            v-for="item in documentPriceList"
            :key="item.id"
            class="item-section"
          >
            <!-- <div class="file-type">
              <span class="item-title">纸质类型</span
              ><span class="item-value">{{ item.printerType }}</span>
            </div> -->
            <div class="file-type">
              <span class="item-title">纸张尺寸</span
              ><span class="item-value">{{
                enums.PaperKind[item.paperKind]
              }}</span>
            </div>
            <div class="item-container">
              <span class="item-title">颜色</span
              ><span class="item-value">{{ enums.PageColor[item.color] }}</span>
            </div>
            <div class="item-container">
              <span class="item-title">面数</span
              ><span class="item-value">{{
                enums.PageDuplex[item.duplex]
              }}</span>
            </div>
            <div class="item-container">
              <span class="item-title">价格</span
              ><span class="item-value">¥{{ item.price }}</span>
            </div>
            <div class="operation-section">
              <span>
                <el-button
                  @click="handleUpdPriceSetting(item)"
                  class="margin-left15px vertical-align-middle"
                  type="text"
                  ><img src="../../assets/edit.svg" alt=""
                /></el-button>
                <el-button
                  @click="handleDeletePriceSetting(item.id)"
                  class="margin-left10px vertical-align-middle"
                  type="text"
                  ><img src="../../assets/trash.svg" alt=""
                /></el-button>
              </span>
            </div>
          </div>
          <div class="text-align-center margin-top40px">
            <el-button class="btn-add-price" @click="handleAddPriceSetting"
              >添加价格</el-button
            >
          </div>
        </el-tab-pane>
        <el-tab-pane label="证照打印价格设置" name="second">
          <span slot="label">
            证照打印价格设置<el-tooltip
              class="item"
              effect="dark"
              placement="bottom-end"
            >
              <div slot="content" class="spec">
                商家营业额到账时，微信支付宝会收取千分之六的商户支付通道手续费。如需调低手续费，并确定长期使用，可使用店主微信进入我们公众号下方菜单栏点击支付商户号申请，变更为次日凌晨到账银行卡（手续费降为千分之3.8）。
              </div>
              <i
                class="el-icon-warning-outline margin-left5px"
              ></i> </el-tooltip
          ></span>
          <div class="item-section">
            <div class="file-type">
              <span class="item-title">证件照</span
              ><span class="item-value">价格</span>
            </div>
            <div class="margin-left30px item-container">
              <span class="item-title">仅冲印</span
              ><span class="item-value">¥10.0</span>
            </div>
            <div class="margin-left30px item-container">
              <span class="item-title">换底冲印</span
              ><span class="item-value">¥10.0</span>
            </div>
            <div class="margin-left30px item-container">
              <span class="item-title">美颜换底</span
              ><span class="item-value">¥10.0</span>
            </div>
            <div class="margin-left30px item-container">
              <span class="item-title">换装冲印</span
              ><span class="item-value">¥15.0</span>
            </div>
            <div class="operation-section">
              <span>
                <el-button
                  @click="handleUpdPriceSetting"
                  class="margin-left15px vertical-align-middle"
                  type="text"
                  ><img src="../../assets/edit.svg" alt=""
                /></el-button>
                <el-button
                  @click="dialogDelete = true"
                  class="margin-left10px vertical-align-middle"
                  type="text"
                  ><img src="../../assets/trash.svg" alt=""
                /></el-button>
              </span>
            </div>
          </div>
          <div class="special-spec">
            <div>
              <span class="extra"
                >用户保存电子档时额外收费，不收可不设置<span class="attention"
                  >（注：保存电子档平台需额外收取1元服务费）</span
                ></span
              >
              <span class="charge">
                电子档收费
                <span class="charge-price">¥0.1</span>
              </span>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
    <el-dialog
      title="开启确认"
      :visible.sync="dialogVisible"
      width="30%"
      center
    >
      <span>是否确认在该门店开启最低金额消费¥0.5</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="handleSaveOpenMinConsume"
          >确 认</el-button
        >
      </span>
    </el-dialog>
    <el-dialog :visible.sync="dialogPriceSettingVisible" width="30%" center>
      <span slot="title" class="charge-price">打印单价设置</span>
      <div>
        <el-form ref="form" :model="form" label-width="100px">
          <el-form-item label="纸张尺寸：">
            <el-radio-group v-model="form.paperKind">
              <el-radio :label="8">A3</el-radio>
              <el-radio :label="9">A4</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="打印面数：">
            <el-radio-group v-model="form.duplex">
              <el-radio :label="1">单面</el-radio>
              <el-radio :label="2">双面</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="打印颜色：">
            <el-radio-group v-model="form.color">
              <el-radio :label="1">黑白</el-radio>
              <el-radio :label="2">彩色</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="打印单价：">
            <el-input class="width500px" v-model="form.price"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer text-align-right">
        <el-button @click="dialogPriceSettingVisible = false">取 消</el-button>
        <el-button class="btn-save" @click="handleSavePriceSetting"
          >保 存</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import settingApi from "@/api/setting";
import { enums } from "@/utils/common";
export default {
  data() {
    return {
      isAdd: "",
      enums: enums,
      minConsumeValue: "￥0.5",
      isOpenMinConsume: false,
      activeName: "first",
      dialogVisible: false,
      dialogPriceSettingVisible: false,
      documentPriceList: [],
      form: {
        id: "",
        paperKind: [],
        color: "",
        duplex: "",
        price: "",
      },
    };
  },
  created() {
    this.search();
  },
  methods: {
    search() {
      settingApi.getPrintPriceSettings().then((res) => {
        this.documentPriceList = res;
      });
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
    changeOpenMinConsume() {
      if (this.isOpenMinConsume) {
        this.dialogVisible = true;
      }
      //   this.isOpenMinConsume = !this.isOpenMinConsume;
    },
    handleCancelOpenMinConsume() {
      this.dialogVisible = false;
      this.isOpenMinConsume = false;
    },
    handleAddPriceSetting() {
      this.isAdd = true;
      this.form = {};
      this.dialogPriceSettingVisible = true;
    },
    handleUpdPriceSetting(row) {
      this.isAdd = false;
      this.dialogPriceSettingVisible = true;
      this.form = Object.assign({}, row);
    },
    handleClose(done) {
      this.dialogVisible = false;
      this.isOpenMinConsume = false;
    },
    handleSaveOpenMinConsume() {
      this.dialogVisible = false;
    },
    handleSavePriceSetting() {
      if (this.isAdd) {
        if (this.form.paperKind) {
        }
        settingApi.addPrintPriceSettings(this.form).then((res) => {
          this.search();
          this.dialogPriceSettingVisible = false;
          this.$message({
            message: "保存成功",
            type: "success",
          });
        });
      } else {
        settingApi.updatePrintPriceSettings(this.form).then((res) => {
          this.search();
          this.dialogPriceSettingVisible = false;
          this.$message({
            message: "保存成功",
            type: "success",
          });
        });
      }
    },
    handleDeletePriceSetting(id) {
      this.$confirm("是否确认删除该价格设置?", {
        confirmButtonText: "确 认",
        cancelButtonText: "取 消",
        type: "warning",
      })
        .then(() => {
          settingApi.deletePrintPriceSettings(id).then((res) => {
            console.log(res);
            this.$message({
              message: "删除成功",
              type: "success",
            });
            this.search();
          });
        })
        .catch(() => {
          //doSomething()
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.text-align-center {
  text-align: center;
}
.text-align-right {
  text-align: right;
}
.width500px {
  width: 500px;
}
.vertical-align-middle {
  vertical-align: middle;
}
.margin-top8px {
  margin-top: 8px;
}
.margin-top40px {
  margin-top: 40px;
}
.margin-left5px {
  margin-left: 5px;
}
.margin-left10px {
  margin-left: 10px;
}
.margin-left15px {
  margin-left: 15px;
}
.margin-left30px {
  margin-left: 30px;
}
.el-input {
  width: 120px;
}
.container {
  background-color: #ffff;
  margin-top: 16px;
  margin-left: 16px;
  margin-right: 16px;
  padding-top: 16px;
  padding-left: 16px;
  border-radius: 10px;
}
.min-consume-label {
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 500;
}
.spec {
  width: 304px;
  height: 80px;
}
.item-section {
  display: flex;
  border-bottom: 1px solid #d8d8d8;
  padding: 10px;
  margin-right: 16px;
}
.file-type {
  margin-left: 10px;
  text-align: center;
}
.item-title {
  display: block;
  font-size: 12px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #595959;
}
.item-value {
  display: block;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  margin-top: 10px;
}
.item-container {
  text-align: center;
  margin-left: 48px;
  width: 60px;
}
.operation-section {
  text-align: right;
  line-height: 40px;
  flex: 1 1 auto;
}
.special-spec {
  display: flex;
  border-bottom: 1px solid #d8d8d8;
  padding: 10px;
  margin-right: 16px;
  margin-top: 16px;
}
.extra {
  display: block;
  font-size: 12px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #595959;
}
.attention {
  font-size: 12px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #ff4d4f;
}
.charge {
  display: block;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #000000;
  margin-top: 8px;
}
.charge-price {
  margin-left: 10px;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 500;
}
.btn-save {
  background-color: #40db98;
  color: #ffffff;
}
.btn-add-price {
  background-color: #40db98;
  color: #ffffff;
  margin-bottom: 20px;
}
</style>