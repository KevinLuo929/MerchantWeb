<template>
  <div class="background-white">
    <div style="background-color: #40db98; padding: 20px; color: white">
      <span class="version">版本V1.2.3</span>
      <div class="align-center">
        <div class="title">AI云印系统门店专属版</div>
        <div class="sub-title">华为云提供计算服务</div>
      </div>
    </div>
    <el-row>
      <el-form ref="form" :model="form" label-width="80px">
        <div class="form-item-first">
          <el-checkbox class="myRedCheckBox" v-model="run"
            >运行AIcloudprint</el-checkbox
          >
        </div>
        <div class="form-item">
          <el-input class="input-preview" v-model="previewvalue"></el-input
          ><el-button @click.prevent="preview()">预览</el-button>
        </div>
        <div class="form-item">
          <el-checkbox v-model="start">开机自启动</el-checkbox>
        </div>
        <div class="form-item">
          <el-checkbox v-model="read"
            >已阅读并同意
            <el-link class="protocol"
              >《软件许可协议和隐私协议》</el-link
            ></el-checkbox
          >
          <el-link class="protocol">《门店合作服务协议》</el-link>
        </div>
        <div class="align-center padding20px">
          <el-button class="btn-install" @click="onSubmit">立即安装</el-button>
        </div>
      </el-form>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      run: true,
      start: true,
      read: true,
      previewvalue: "",
    };
  },
  methods: {
    onsubmit() {
      console.log("submit!");
    },
    preview() {
      console.log("preview!");
    },
  },
};
</script>

<style scoped>
.background-white {
  background-color: rgba(255, 255, 255, 1);
}
.version {
  color: rgba(255, 255, 255, 1);
  font-size: 10px;
  font-family: Helvetica;
}
.title {
  color: rgba(255, 255, 255, 1);
  font-size: 32px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  margin-top: 22px;
}

.sub-title {
  color: rgba(255, 255, 255, 1);
  font-size: 16px;
  font-family: PingFangSC-Regular;
  margin-top: 8px;
  margin-bottom: 32px;
}
.form-item-first {
  font-size: 14px;
  font-family: PingFangSC-Regular;
  margin: 30px 0 10px 30px;
}
.form-item {
  font-size: 14px;
  font-family: PingFangSC-Regular;
  margin: 20px 0 10px 30px;
}
.protocol {
  color: #40db98;
  font-size: 14px;
  font-family: PingFangSC-Regular;
}
.btn-install {
  width: 150px;
  background-color: #40db98;
  color: #fff;
}
.padding20px {
  padding: 20px;
}
.width150px {
  width: 150px;
}
.align-center {
  text-align: center;
}
.input-preview {
  width: 450px;
  margin-right: 10px;
}
</style>