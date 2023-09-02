<template>
  <div>
    <div class="header-container">
      <el-row>
        <el-col :span="10" class="line-height40px"
          ><span class="label">今日试用到期门店</span
          ><span class="count">共12个</span></el-col
        >
        <el-col :span="14">
          <div class="filter-section">
            <el-input
              placeholder="查询门店请输入门店ID"
              v-model="input2"
              class="width400px"
            >
              <template slot="append"
                ><el-button class="padding-left5px" type="text"
                  >搜索</el-button
                ></template
              >
            </el-input>
            <el-button
              class="btn-search"
              type="text"
              icon="el-icon-refresh-right"
            ></el-button></div
        ></el-col>
      </el-row>
    </div>
    <div class="table-container">
      <div class="table-filter">
        <el-form :inline="true" ref="form" :model="form" label-width="80px">
          <el-form-item label="商户类型:">
            <el-select v-model="formInline.type" placeholder="">
              <el-option label="试用体验" value="0"></el-option>
              <el-option label="正式版" value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button plain>导出</el-button>
          </el-form-item>
          <el-form-item class="float-right">
            <el-button type="success">添加门店</el-button>
          </el-form-item>
        </el-form>
      </div>
      <el-table :data="tableData" class="table-section">
        <el-table-column prop="shopId" label="门店ID1" width="180">
        </el-table-column>
        <el-table-column prop="shopName" label="门店名称" width="180">
        </el-table-column>
        <el-table-column prop="createOn" label="开户时间" width="180">
        </el-table-column>
        <el-table-column prop="type" label="商户类型" width="180">
        </el-table-column>
        <el-table-column prop="picture" label="提前付款" width="180">
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          shopId: "112",
          shopName: "湘印天下",
          createOn: "2023-7-30",
          type: "使用体验",
          picture: "",
        },
        {
          shopId: "116",
          shopName: "湘印天下",
          createOn: "2023-7-30",
          type: "使用体验",
          picture: "",
        },
      ],
      formInline: {
        type: "0",
      },
    };
  },
};
</script>


<style scoped>
.width400px {
  width: 400px;
}
.padding-left5px {
  padding-left: 5px;
}
.float-right {
  float: right;
}
.margin-top20 {
  margin-top: 20px;
}
.margin-top30 {
  margin-top: 30px;
}
.margin-left10 {
  margin-left: 10px;
}
.line-height40px {
  line-height: 40px;
}
.bold {
  font-weight: bold;
}
.header-container {
  margin-top: 20px;
  margin-left: 20px;
}
.label {
  font-size: 14px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 600;
  padding-left: 10px;
  padding-top: 10px;
}
.count {
  margin-left: 10px;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
}
.filter-section {
  float: right;
  padding-right: 20px;
}
.btn-search {
  font-size: 20px;
  margin-left: 10px;
  color: #1f1f1f;
}
.table-container {
  margin-top: 20px;
  margin-left: 20px;
  margin-right: 20px;
  background-color: white;
  border-radius: 10px;
  height: 500px;
}
.table-filter {
  padding-top: 22px;
  padding-left: 16px;
  padding-right: 10px;
}
.table-section {
  width: 90%;
  margin-left: 16px;
}
</style>
