<template>
  <div class="container">
    <el-form ref="form" :model="form" label-width="180px">
      <el-form-item>
        <span slot="label" class="label">照片打印机：</span>
        <el-select v-model="form.printer" placeholder="">
          <el-option label="打印机1" value="printer1"></el-option>
          <el-option label="打印机1" value="printer2"></el-option>
        </el-select>
        <el-switch
          class="margin-left10px"
          v-model="form.isOpenPrinter"
        ></el-switch>
      </el-form-item>
      <el-form-item>
        <span slot="label" class="label">证件照：</span>
        <el-checkbox v-model="form.identificationPhoto"
          >是否开启打印证件照【自动打印】</el-checkbox
        >
      </el-form-item>
      <el-form-item>
        <span slot="label" class="label">生活照：</span>
        <el-checkbox v-model="form.lifePhoto"
          >是否开启打印生活照【自动打印】</el-checkbox
        >
      </el-form-item>
      <div>
        <span class="pic-quality-label">照片质量设置</span>
        <span class="spec"
          >照片打印质量需要您到打印机驱动设置页面的(打印首选项)中设置并保存，请设置无边距，高质量打印。证件照价格请在打印价格设置页面设置。</span
        >
      </div>
      <el-form-item class="margin-top16px">
        <span slot="label" class="label">相纸排版尺寸：</span>
        <el-checkbox-group v-model="form.composing">
          <el-checkbox label="5寸" name="5寸"></el-checkbox>
          <el-checkbox label="6寸" name="6寸"></el-checkbox>
          <el-checkbox label="A6" name="A6"></el-checkbox>
        </el-checkbox-group>
        <span>证件照打印纸张尺寸，用于生成排版</span>
      </el-form-item>
      <el-form-item>
        <span slot="label" class="label">一寸照排版最大数量：</span>
        <el-checkbox-group v-model="form.oneInchCount">
          <el-checkbox label="8张" name="8"></el-checkbox>
          <el-checkbox label="9张" name="9"></el-checkbox>
          <el-checkbox label="12张" name="12"></el-checkbox>
          <el-checkbox label="16张" name="16"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item>
        <span slot="label" class="label">二寸照排版最大数量：</span>
        <el-checkbox-group v-model="form.twoInchCount">
          <el-checkbox label="4张" name="4"></el-checkbox>
          <el-checkbox label="6张" name="6"></el-checkbox>
          <el-checkbox label="8张" name="8"></el-checkbox>
        </el-checkbox-group>
        <div class="spec">
          <div>背每版排版照片张数，用于生成排版。</div>
          <div>若相纸空间不足，会自动降级（比如5寸相纸最多排9张）</div>
        </div>
      </el-form-item>
      <el-form-item>
        <span slot="label" class="label">仅保存电子档：</span>
        <el-switch v-model="form.saveElectronicFile"></el-switch>
        <div class="spec">开启后用户可选择【仅保存电子档】，无需打印出纸</div>
      </el-form-item>
      <el-form-item>
        <el-button class="btn-save" @click="onSubmit">保存设置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>


<script>
export default {
  data() {
    return {
      form: {
        printer: "printer1",
        isOpenPrinter: "",
        identificationPhoto: true,
        lifePhoto: true,
        composing: ["5寸"],
        oneInchCount: ["8张"],
        twoInchCount: ["4张"],
        saveElectronicFile: true,
      },
    };
  },
  methods: {},
};
</script>

<style scoped>
.margin-left10px {
  margin-left: 10px;
}
.margin-top16px {
  margin-top: 16px;
}
.container {
  background-color: #ffff;
  margin-top: 16px;
  margin-left: 16px;
  margin-right: 16px;
  border-radius: 10px;
  padding-top: 16px;
}
.label {
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
}
.pic-quality-label {
  font-size: 14px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 600;
  margin-left: 30px;
}
.spec {
  margin-left: 15px;
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
</style>