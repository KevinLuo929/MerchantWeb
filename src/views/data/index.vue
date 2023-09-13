<template>
  <div>
    <div class="container">
      <h3>本周数据</h3>
      <div class="dashboard">
        <div class="dashboard-item">
          <p class="title">门店营业额</p>
          <p class="sum">¥ 102.5</p>
          <p class="count">订单量：2355单</p>
        </div>
        <div class="dashboard-item border-left-solid">
          <p class="title">店内打印收入</p>
          <p class="sum">¥ 102.5</p>
          <p class="count">订单量：2355单</p>
        </div>
        <div class="dashboard-item">
          <p class="title">远程下单收入</p>
          <p class="sum">¥ 102.5</p>
          <p class="count">订单量：2355单</p>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="filter-container">
        <div class="display-inline">
          <span class="chart-header">营业额统计</span>
          <span class="font-size14px">(元)</span>
        </div>
        <div class="filter">
          <el-button type="text">今日</el-button>
          <el-button type="text">本周</el-button>
          <el-button type="text">本月</el-button>
          <el-date-picker
            class="margin-left20px"
            v-model="value1"
            type="daterange"
            range-separator="-"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          >
          </el-date-picker>
        </div>
      </div>
      <div class="display-flex">
        <div id="echart1" class="chart-container"></div>
        <div class="announcement-container">
          <h4>增收赚钱活动公告</h4>
          <p>推荐客户使用，赢现金</p>
          <p>推荐客户使用，赢现金</p>
          <p>推荐客户使用，赢现金</p>
          <div class="img-container">
            <el-image
              class="qr-code"
              src="https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg"
            ></el-image>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as echarts from "echarts";
import dataApi from "@/api/data";
export default {
  data() {
    return {
      radio: "0",
      value1: "",
    };
  },
  created() {
    this.search();
  },
  mounted() {
    this.initChart();
  },
  methods: {
    async search() {
      let res = dataApi.getPrinterSettingData().then((res) => {});
    },
    initChart() {
      var chartDom = document.getElementById("echart1");
      var myChart = echarts.init(chartDom);
      var option;

      option = {
        xAxis: {
          type: "category",
          data: ["7-24", "7-25", "7-26", "7-27", "7-28", "7-29", "7-30"],
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: [120, 200, 150, 80, 70, 110, 130],
            type: "line",
          },
        ],
      };
      option && myChart.setOption(option);
    },
  },
};
</script>

<style  scoped>
h3 {
  padding-left: 16px;
  padding-top: 16px;
  font-size: 14px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
}
h4 {
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 500;
}
.display-flex {
  display: flex;
}
.display-inline {
  display: inline;
}
.margin-left20px {
  margin-left: 20px;
}
.font-size14px {
  font-size: 14px;
}
.container {
  background-color: white;
  margin: 20px;
  border-radius: 10px;
}
.dashboard {
  display: flex;
}
.dashboard-item {
  width: 33%;
  margin-bottom: 10px;
}
.border-none {
  border: none;
}
.platform-income {
  border-top: none;
  border-right: none;
  border-bottom: none;
}
.border-left-solid {
  border-left: 1px solid #f0f0f0;
}
.title {
  padding-left: 16px;
  font-size: 12px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #595959;
}
.sum {
  padding-left: 16px;
  font-weight: bold;
}
.count {
  padding-left: 16px;
  font-size: 12px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #8c8c8c;
}
.filter-container {
  padding: 16px;
  border-bottom: 1px solid rgb(219, 214, 214);
  height: 70px;
}
.chart-header {
  font-size: 14px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 600;
  line-height: 35px;
}
.filter {
  display: inline;
  float: right;
}
.chart-container {
  width: 80%;
  height: 400px;
}
.announcement-container {
  width: 20%;
  padding: 20px;
  border-left: 1px solid rgb(248, 246, 246);
}
.announcement-container p {
  font-size: 12px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
}
.img-container {
  margin-top: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.qr-code {
  width: 100px;
  height: 100px;
}
</style>