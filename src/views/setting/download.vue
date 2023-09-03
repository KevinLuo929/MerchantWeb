<template>
  <div>
    <div class="container">
      <div class="header">
        <el-row class="title">门店专属打印码</el-row>
        <el-row class="margin-top8px"
          ><img
            src="https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg"
            alt=""
        /></el-row>
        <el-row class="sub-title">右键保存，顾客扫码进入门店专属小程序</el-row>
      </div>
      <div class="padding-left16px">
        <h3>门店宣传海报物料包</h3>
        <el-table :data="tableData" class="width100per">
          <el-table-column prop="name" label="宣传素材名称" width="300">
          </el-table-column>
          <el-table-column prop="size" label="尺寸" width="120">
          </el-table-column>
          <el-table-column prop="updateOn" label="更新时间" width="200">
          </el-table-column>
          <el-table-column prop="operation" label="操作">
            <template slot-scope="scope">
              <el-button :key="scope.row.download" type="text"
                ><img src="../../assets/download.svg" alt=""
              /></el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="btn-section">
        <el-button class="btn-download">一键打包下载</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          name: "店内手机打印指引",
          size: "A3",
          updateOn: "2016-05-02",
        },
        {
          name: "智能证照打印宣传海报",
          size: "A3",
          updateOn: "2016-05-02",
        },
      ],
    };
  },
};
</script>

<style scoped>
.width100per {
  width: 100%;
}
.margin-top8px {
  margin-top: 8px;
}
.padding-left16px {
  padding-left: 16px;
}
.container {
  background-color: #ffff;
  margin-top: 16px;
  margin-left: 16px;
  margin-right: 16px;
  border-radius: 10px;
}
h3 {
  font-size: 14px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 600;
}
.header {
  text-align: center;
  border-radius: 10px;
  background-color: #40db98;
  border-radius: 10px 10px 0 0;
}
.header img {
  width: 100px;
  height: 100px;
}
.title {
  font-size: 16px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #ffffff;
  padding-top: 16px;
}
.sub-title {
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #ffffff;
  margin-top: 8px;
  padding-bottom: 16px;
}
.btn-section {
  text-align: center;
  margin-top: 40px;
  border-radius: 10px;
}
.btn-download {
  background-color: #40db98;
  color: #ffffff;
  margin-bottom: 20px;
}
</style>