<template>
  <div>
    <div class="container">
      <h3>本周数据</h3>
      <div class="dashboard">
        <div class="dashboard-item">
          <p class="title">平台营业流水</p>
          <p class="sum">¥ 102.5</p>
          <p class="count">订单量：2355单</p>
        </div>
        <div class="dashboard-item border-left-solid">
          <p class="title">平台服务收入</p>
          <p class="sum">¥ 102.5</p>
          <p class="count">商户手续费：5.7元</p>
          <p class="count">证照&AI服务费：57元</p>
        </div>
        <div class="dashboard-item">
          <p class="title">年费销售收入</p>
          <p class="sum">¥ 102.5</p>
          <p class="count">门店转化：1家</p>
        </div>
      </div>
    </div>
    <div class="container">
      <div
        style="
          padding: 16px;
          border-bottom: 1px solid rgb(219, 214, 214);
          height: 70px;
        "
      >
        <div style="display: inline">
          <span
            style="
              font-size: 14px;
              font-family: PingFangSC-Medium, PingFang SC;
              font-weight: 600;
              line-height: 35px;
            "
            >平台服务收入 (元)</span
          >
        </div>
        <div style="display: inline; float: right">
          <el-button type="text">今日</el-button>
          <el-button type="text">本周</el-button>
          <el-button type="text">本月</el-button>
          <el-date-picker
            style="margin-left: 20px"
            v-model="value1"
            type="daterange"
            range-separator="-"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          >
          </el-date-picker>
        </div>
      </div>
      <div id="echart1" style="width: auto; height: calc(100vh - 150px)"></div>
    </div>
  </div>
</template>

<script>
import * as echarts from "echarts";
import managementApi from "@/api/management";
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
      let res = managementApi.getPrinterSettingData().then((res) => {});
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
  font-weight: 600;
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
.platform-income {
  border-top: none;
  border-right: none;
  border-bottom: none;
}
</style>