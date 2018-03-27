<template>
  <div class="dashboard-editor-container">
    <PanelGroup @handleSetLineChartData="handleSetLineChartData"></PanelGroup>
    <LineChart :chart-data="lineChartData"></LineChart>
     <el-row :gutter="32">
      <el-col :xs="24" :sm="24" :lg="6">
          <RaddarChart></RaddarChart>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="6">
          <PieChart></PieChart>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="6">
          <BarChart></BarChart>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="6">
          <BarChart></BarChart>
      </el-col>
    </el-row>

  </div>
</template>
<script>
import PanelGroup from "./components/PanelGroup";
import LineChart from "./components/LineChart";
import RaddarChart from "./components/RaddarChart";
import PieChart from "./components/PieChart";
import BarChart from "./components/BarChart";
const lineChartData = {
  newVisitis: {
    expectedData: [100, 120, 161, 134, 105, 160, 165],
    actualData: [120, 82, 91, 154, 162, 140, 145]
  },
  messages: {
    expectedData: [200, 192, 120, 144, 160, 130, 140],
    actualData: [180, 160, 151, 106, 145, 150, 130]
  },
  purchases: {
    expectedData: [80, 100, 121, 104, 105, 90, 100],
    actualData: [120, 90, 100, 138, 142, 130, 130]
  },
  shoppings: {
    expectedData: [130, 140, 141, 142, 145, 150, 160],
    actualData: [120, 82, 91, 154, 162, 140, 130]
  }
};
export default {
  name: "dashboard-admin",
  data() {
    return {
      lineChartData: lineChartData.newVisitis
    };
  },
  components: {
    PanelGroup,
    LineChart,
    RaddarChart,
    PieChart,
    BarChart
  },
  methods: {
    handleSetLineChartData(type) {
      this.lineChartData = lineChartData[type];
    }
  },
  mounted() {}
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard-editor-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
}
</style>
