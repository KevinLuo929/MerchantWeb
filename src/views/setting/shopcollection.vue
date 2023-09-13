<template>
  <div class="container">
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="120px"
      class="demo-ruleForm"
    >
      <el-form-item label="门店打烊" prop="isOpen">
        <el-switch v-model="ruleForm.isOpen"></el-switch>
        <div class="spec">
          开启后顾客将无法正常下单打印，用于有事闭店/暂不营业等用途
        </div>
      </el-form-item>
      <el-form-item label="门店名称：" prop="name">
        <el-input v-model="ruleForm.name" placeholder="输入店铺名称"></el-input>
      </el-form-item>
      <el-form-item label="门店地址：" prop="address">
        <el-input
          v-model="ruleForm.address"
          placeholder="输入店铺地址"
        ></el-input>
      </el-form-item>
      <el-form-item label="联系电话：" prop="phone">
        <el-input
          v-model="ruleForm.phone"
          placeholder="输入电话号码"
        ></el-input>
        <div class="spec">用户可在订单页查看并联系门店</div>
      </el-form-item>

      <el-form-item label="编辑公告：" prop="announcement">
        <el-input
          class="width350px"
          type="textarea"
          rows="3"
          v-model="ruleForm.announcement"
          placeholder="显示在门店小程序首页的滚动公告"
        ></el-input>
      </el-form-item>
      <div class="label">商户收款设置</div>
      <el-form-item label="支付宝姓名：" prop="aliPayName">
        <el-input
          v-model="ruleForm.aliPayName"
          placeholder="输入真实姓名"
        ></el-input>
        <div class="spec">
          请填写支付宝账号实名认证时的真实姓名，确保您收款成功
        </div>
      </el-form-item>
      <el-form-item label="支付宝账号：" prop="aliPayAccount">
        <el-input
          v-model="ruleForm.aliPayAccount"
          placeholder="输入真实账号"
        ></el-input>
        <div class="spec">
          请填写支付宝账号(若为手机号，则该号码只能绑定一个支付宝账号)
        </div>
      </el-form-item>

      <el-form-item>
        <el-button class="btn-save" @click="onSubmit">保存设置</el-button>
      </el-form-item>
      <el-dialog
        :visible.sync="dialog"
        width="20%"
        center
        :before-close="handleClose"
      >
        <div class="text-align">
          <span slot="title" class="dialog-title">店主授权微信扫码确认</span>
          <p class="title">
            修改门店及收款设置页面信息，均需店主打开授权微信扫描下方二维码确认修改才能成功
          </p>
          <div><img src="../../assets/QR_Code_Sample.png" alt="" /></div>
          <p class="sub-title">请店主打开授权微信扫码确认修改</p>
        </div>
      </el-dialog>
    </el-form>
  </div>
</template>

<script>
import settingApi from "@/api/setting";
export default {
  data() {
    return {
      dialog: false,
      ruleForm: {
        isOpen: "",
        name: "",
        address: "",
        phone: "",
        announcement: "",
        aliPayName: "",
        aliPayAccount: "",
      },
      rules: {
        name: [{ required: true, message: "输入店铺名称", trigger: "blur" }],
        address: [{ required: true, message: "输入店铺地址", trigger: "blur" }],
        phone: [{ required: true, message: "输入电话号码", trigger: "blur" }],
        announcement: [
          {
            required: true,
            message: "显示在门店小程序首页的滚动公告",
            trigger: "blur",
          },
        ],
        aliPayName: [
          { required: true, message: "输入真实姓名", trigger: "blur" },
        ],
        aliPayAccount: [
          { required: true, message: "输入真实账号", trigger: "blur" },
        ],
      },
    };
  },
  created() {
    this.search();
  },
  methods: {
    async search() {
      let res = settingApi.getPrinterSettingData().then((res) => {});
    },
    onSubmit() {
      debugger;
      this.dialog = true;
      let res = settingApi.savePrinterSettings(this.form).then((res) => {});
    },
  },
  handleClose(done) {
    done();
  },
};
</script>

<style scoped>
.text-align {
  text-align: center;
}
.width350px {
  width: 350px;
}
.el-input {
  width: 350px;
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
.label {
  margin-left: 10px;
  margin-bottom: 16px;
  font-size: 14px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 600;
}
.spec {
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #595959;
}
.btn-save {
  background-color: #40db98;
  color: #ffffff;
  margin-bottom: 20px;
}
.title {
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #000000;
}
.sub-title {
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #595959;
}
.dialog-title {
  font-size: 16px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 600;
}
</style>