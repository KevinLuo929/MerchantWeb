<template>
  <div class="container">
    <span class="version">版本V1.2.3</span>
    <div class="align-center">
      <h2 class="header">AI云印系统操作台</h2>
      <p class="title">门店专属系统注册验证</p>
      <p class="sub-title">请输入门店ID数字</p>
      <el-input v-model="input" placeholder="" class="width300px"></el-input>
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
.width300px {
  width: 300px;
}
</style>