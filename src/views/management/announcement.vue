<template>
  <div>
    <h3>编辑平台公告</h3>
    <div class="container">
      <el-form ref="form" :model="form" label-width="100px">
        <el-form-item>
          <span slot="label">
            <span class="announcement-label">公告标题：</span>
          </span>
          <el-input placeholder="输入公告标题" v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item>
          <span slot="label">
            <span class="announcement-label">公告内容：</span>
          </span>
          <el-input
            class="width400px"
            type="textarea"
            :rows="4"
            placeholder="输入公告内容"
            v-model="form.content"
          >
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="success" @click="onSubmit">保存并发送</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        title: "",
        content: "",
      },
    };
  },
  methods: {
    onSubmit() {
      console.log("submit!");
    },
  },
};
</script>

<style scoped>
h3 {
  margin: 20px;
  font-size: 14px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
}
.width400px {
  width: 400px;
}
.container {
  background-color: white;
  border-radius: 10px;
  margin: 20px;
  padding-top: 20px;
  padding-bottom: 20px;
}
.el-input {
  width: 400px;
}
.announcement-label {
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
}
</style>