<template>
  <div class="container">
    <el-row class="desc-section">
      <h2 class="about">关于我们</h2>
      <p class="description">
        向量印擎科技是一家具备AI技术服务能力，专注提供自主创新 AICP解决方案的互联网科技公司，通过为合作门店提供OEM软件服务，帮助门店打造自主品牌+专属云印系统，解决人工服务成本高昂和增收引流的痛点难题。
      </p>
      <ul>
        <li>国内首个文档生成AICP语言大模型应用</li>
        <li>所有门店的AI云印系统均由华为云计算提供支持，稳定高效有保障</li>
        <li>
          自主研发的AI云印系统通过了百万级用户订单输出交付验证，实现便捷好用，稳定可靠的优秀效果
        </li>
      </ul>
    </el-row>
    <el-row>
      <el-col class="wechat-section" :span="8">
        <div class="text">
          <div>软件相关问题请微信扫码添加</div>
          <div>技术支持工程师微信</div>
        </div>
        <div class="qr-code-section">
          <el-image class="qr-code" src="https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg"></el-image>
        </div>
      </el-col>
      <el-col :span="16" class="download-section">
      <div class="label">工具软件下载专区</div>
        <el-table :data="tableData" class="table">
          <el-table-column prop="name" label="软件名称"> </el-table-column>
          <el-table-column prop="download_count" label="下载次数">
          </el-table-column>
          <el-table-column prop="update_on" label="更新时间"> </el-table-column>
          <el-table-column prop="operation" label="操作">
            <i class="el-icon-download"></i>
          </el-table-column> </el-table
      ></el-col>
    </el-row>
  </div>
</template>

<script>
import serviceApi from "@/api/service";
export default {
  data() {
    return {
      tableData: [
        {
          name: "360浏览器",
          download_count: "12",
          update_on: "2023-9-10",
        },
        {
          name: "向日葵远程控制软件",
          download_count: "30",
          update_on: "2023-9-20",
        },
      ],
    };
  },
  created() {
    this.search();
  },
  methods:{
    async search() {
      let res = serviceApi.getData();
      if (res.success) {
        this.tableData = res.data;
      }
    },
  }
};
</script>

<style scoped>
.container{
  background-color: white; 
  border-radius: 10px;
}
.desc-section{
  background-color: rgb(20, 231, 161); 
  color: white;
}
.about{
  padding-left: 16px;
  font-size: 32px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
}
.description{
  padding-left: 16px;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
}
ul{
  font-size: 14px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
}
li{
  margin-top: 8px;
}
.wechat-section{
  text-align: center;
  padding-top: 30px;
}
.text{
font-weight: 600;font-size: 14px;
font-family: PingFangSC-Medium, PingFang SC;
font-weight: 500;
}
.qr-code-section{
  margin-top: 8px; 
  margin-bottom: 20px
}
.qr-code{
  width: 100px; 
  height: 100px;
}
.download-section{
  padding: 30px;
  border-left: 1px solid #F0F0F0;
}
.label{
  font-size: 14px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
}
.table{
  width: 100%; 
  margin-top: 10px;
}
</style>