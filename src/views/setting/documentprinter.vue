<template>
  <div>
    <div class="header-section">
      <span class="header-label">配置打印机台数</span>
      <span class="header-count">共{{ printerCount }}个</span
      ><i class="el-icon-refresh-right refresh"></i>
    </div>
    <div class="detail-section">
      <el-row>
        <span class="detail-label">新订单语音播报：</span>
        <el-switch
          @change="handleBroadcastSwitch"
          v-model="isBroadcast"
          active-color="#40DB98"
          inactive-color="#F0F0F0"
        >
        </el-switch>
        <span class="detail-label-spec">
          用户新下单文件、自动打印完成后还会进行语音播报通知</span
        >
      </el-row>
      <div v-for="item in printerList" :key="item.id" class="detail-item">
        <div>
          <img
            :src="[
              item.isEnabled
                ? require('../../assets/large_printer.png')
                : require('../../assets/large_printer_disable.png'),
            ]"
            alt=""
          />
        </div>
        <div
          :class="[
            item.isEnabled
              ? 'margin-left10px'
              : 'margin-left10px disabled-color',
          ]"
        >
          <span class="printer-info"
            >{{ item.printerName
            }}<el-tag v-if="item.isPriority" class="priority-tag"
              >优先</el-tag
            ></span
          >
          <span class="printer-parameter"
            >配置参数：【{{ enums.PaperKind[item.supportPaperKind] }}】 【{{
              enums.PageColor[item.supportColor]
            }}】 【{{ item.printerType }}】</span
          >
        </div>
        <div class="operation-section">
          <span>
            <el-switch v-model="item.isEnabled" active-color="#40DB98">
            </el-switch>
            <el-button
              :disabled="!item.isEnabled"
              @click="handleUpdPrinter(item)"
              class="margin-left15px vertical-align-middle"
              type="text"
              ><img
                :src="[
                  item.isEnabled
                    ? require('../../assets/setting.png')
                    : require('../../assets/setting_disable.png'),
                ]"
                alt=""
            /></el-button>
            <el-button
              :disabled="!item.isEnabled"
              @click="showDeleteDialog(item.id)"
              class="margin-left10px vertical-align-middle"
              type="text"
              ><img
                :src="[
                  item.isEnabled
                    ? require('../../assets/trash.png')
                    : require('../../assets/trash_disable.png'),
                ]"
                alt=""
            /></el-button>
          </span>
        </div>
      </div>
      <div class="text-align-center margin-top40px">
        <el-button @click="handleAddPrinter" class="btn-add-printer"
          >添加打印机</el-button
        >
      </div>
    </div>
    <el-dialog :visible.sync="dialogVisible" width="700px" center>
      <span slot="title" class="dialog-title">常规打印机属性配置</span>
      <el-form ref="form" :model="form" label-width="100px">
        <el-form-item>
          <span slot="label" class="dialog-label">打印机别名：</span>

          <el-select v-model="form.printerName" placeholder="请选择打印机">
            <el-option
              v-for="item in localPrinterList"
              :key="item.name"
              :value="item.name_original"
              >{{ item.name_original }}</el-option
            >
          </el-select>
        </el-form-item>
        <el-form-item>
          <span slot="label" class="dialog-label">颜色设置：</span>
          <el-select v-model="form.supportColor" placeholder="请选择颜色">
            <el-option label="只打黑白" :value="0"></el-option>
            <el-option label="彩色" :value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <span slot="label" class="dialog-label">单双面设置：</span>
          <el-select v-model="form.printerType" placeholder="请选择单双面">
            <el-option label="单面" :value="1"></el-option>
            <el-option label="长边双面" :value="2"></el-option>
            <el-option label="短边双面" :value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <span slot="label" class="dialog-label">支持纸张：</span>

          <el-checkbox
            v-model="form.supportPaperKind"
            :true-label="9"
            :false-label="0"
            >A4</el-checkbox
          >
        </el-form-item>
        <el-form-item>
          <span slot="label" class="dialog-label">出纸优先级：</span>
          <el-checkbox v-model="form.isPriority"
            >订单优先使用该机器进行打印</el-checkbox
          >
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer text-align-right">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button class="btn-save" @click="onSubmit">保 存</el-button>
      </div>
    </el-dialog>

    <el-dialog :visible.sync="dialogDelete" width="20%" center>
      <span slot="title" class="dialog-title">温馨提示</span>
      <p class="dialog-content">是否确认删除该打印机</p>
      <p class="dialog-content">该打印机将无法接收处理自助打印订单</p>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogDelete = false">取 消</el-button>
        <el-button class="btn-save" @click="handleDeletePrinter()"
          >确 认</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
let printWorld;
import settingApi from "@/api/setting";
import moment from "moment";
import { enums } from "@/utils/common";
export default {
  data() {
    return {
      isAdd: "",
      currentSelectedId: "",
      printerCount: 0,
      enums: enums,
      isBroadcast: true,
      value2: true,
      dialogVisible: false,
      dialogDelete: false,
      form: {
        id: "",
        printerName: "",
        supportColor: "",
        supportPaperKind: [],
        printerType: "",
      },
      printerList: [],
      localPrinterList: [],
      moment,
    };
  },
  created() {
    this.search();
    printWorld = GetPrintWorld();
    this.getPrinterList();
  },
  methods: {
    async search() {
      let res = settingApi.getPrinterSettingsData().then((res) => {
        this.printerList = res;
        this.printerCount = res.length;
      });
    },
    showDeleteDialog(id) {
      this.dialogDelete = true;
      this.currentSelectedId = id;
    },
    handleAddPrinter() {
      this.isAdd = true;
      this.dialogVisible = true;
      this.form = {};
    },
    handleUpdPrinter(row) {
      this.isAdd = false;
      this.dialogVisible = true;
      this.form = Object.assign({}, row);
      console.log(row);
      //this.form.supportColor = "1";
    },
    handleDeletePrinter() {
      let res = settingApi
        .deletePrinterSettings(this.currentSelectedId)
        .then((res) => {
          console.log(res);
          this.dialogDelete = false;
          this.$message({
            message: "删除成功",
            type: "success",
          });
          this.search();
        });
    },
    handleBroadcastSwitch() {
      alert(this.isBroadcast);
    },
    onSubmit() {
      debugger;
      if (this.isAdd) {
        settingApi.addPrinterSettings(this.form).then((res) => {
          this.search();
          this.dialogVisible = false;
          this.$message({
            message: "保存成功",
            type: "success",
          });
        });
      } else {
        settingApi.updatePrinterSettings(this.form).then((res) => {
          this.search();
          this.dialogVisible = false;
          this.$message({
            message: "保存成功",
            type: "success",
          });
        });
      }
    },
    getPrinterList() {
      const json = {
        action: "printers",
        refresh: true,
        defaultprn: true,
      };
      printWorld.CallbackOnPrinterList((list) => {
        this.localPrinterList = list.val;
        console.log(this.localPrinterList);
        // this.localPrinterList.forEach((item) => {
        //   if (item.default) {
        //     this.form.printer = item.name;
        //   }
        // });
      });
      printWorld.Act(json);
    },
  },
};
</script>

<style scoped>
.el-input {
  width: 350px;
}
.el-select {
  width: 350px;
}
.el-dialog__body {
  border-top: 1px solid #000000;
}
.text-align-center {
  text-align: center;
}
.text-align-right {
  text-align: right;
}
.vertical-align-middle {
  vertical-align: middle;
}
.margin-top40px {
  margin-top: 40px;
}
.margin-left10px {
  margin-left: 10px;
}
.margin-left15px {
  margin-left: 15px;
}
.header-section {
  padding-left: 16px;
  padding-top: 24px;
  padding-right: 20px;
}
.header-label {
  font-size: 14px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 600;
}
.header-count {
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #595959;
  margin-left: 16px;
}
.refresh {
  color: #1f1f1f;
  float: right;
}
.detail-section {
  background-color: white;
  border-radius: 10px;
  margin-left: 16px;
  margin-top: 20px;
  padding-top: 16px;
  padding-left: 16px;
}
.detail-label {
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
}
.detail-label-spec {
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  margin-left: 16px;
}
.detail-item {
  display: flex;
  margin-top: 8px;
  padding-top: 16px;
  padding-bottom: 16px;
  width: 98%;
  border-bottom: 1px solid #f0f0f0;
}
.printer-info {
  display: block;
  font-size: 14px;
  font-family: HelveticaNeue;
}
.priority-tag {
  margin-left: 10px;
  transform: skew(160deg);
  background-color: #ff4d4f;
  color: white;
  height: 22px;
  line-height: 22px;
  width: 40px;
  padding: 0px 7px;
}
.printer-parameter {
  display: block;
  font-size: 12px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  margin-top: 8px;
}
.operation-section {
  text-align: right;
  line-height: 40px;
  flex: 1 1 auto;
  padding-right: 20px;
}
.btn-add-printer {
  background-color: #40db98;
  color: #ffffff;
  margin-bottom: 20px;
}
.dialog-title {
  font-size: 16px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 600;
}
.dialog-label {
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
}
.dialog-content {
  text-align: center;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
}
.btn-save {
  background-color: #40db98;
  color: #ffffff;
}
.disabled-color {
  color: #bfbfbf;
}
</style>