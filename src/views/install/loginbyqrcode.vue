<template>
  <div class="container">
    <span class="version">版本V1.2.3</span>
    <div class="align-center">
      <h1 class="header">AI云印系统操作台</h1>
      <p class="title">门店系统登录验证</p>
      <p class="sub-title">请使用店主微信扫码登录</p>
      <el-image
        class="qr-code"
        src="https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg"
      ></el-image>
    </div>
  </div>
</template>
  
  <script>
export default {
  data() {
    return {
      input: "",
    };
  },
};
</script>
  
<style scoped>
.container {
  background-color: white;
  padding: 20px;
}
.align-center {
  text-align: center;
}
.version {
  color: rgba(255, 255, 255, 1);
  font-size: 10px;
  font-family: Helvetica;
}
.header {
  color: rgba(64, 219, 152, 1);
  font-size: 32px;
  font-family: PingFangSC-Regular;
}
.title {
  color: rgba(0, 0, 0, 1);
  font-size: 16px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
}
.sub-title {
  color: rgba(0, 0, 0, 1);
  font-size: 14px;
  font-family: PingFangSC-Regular;
}
.qr-code {
  width: 200px;
  height: 200px;
}
</style>