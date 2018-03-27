<template>
<div class="app-container">
昵称:
<el-input @keyup.enter.native="searchMember" v-model="searchName" style="width: 200px;" class="filter-item" placeholder="search"></el-input>
<el-button class="filter-item" type="primary" icon="el-icon-search" @click="searchMember">search</el-button>
   <el-table :data="list" v-loading.body="listLoading" element-loading-text="Loading" border fit highlight-current-row :row-class-name="tableRowClassName">
      <el-table-column align="center" label='序号' width="50">
      <template slot-scope="scope"> 
        {{scope.$index + 1}}
      </template>
      </el-table-column>
      <el-table-column align="center" label="计划姓名" width="">
        <template slot-scope="scope">
          {{scope.row.name}}
        </template>
      </el-table-column>
      <el-table-column label="描述" width="" align="center" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{scope.row.description}}</span>
        </template>
      </el-table-column>
      <el-table-column label="总天数" width="" align="center">
        <template slot-scope="scope">
          {{scope.row.daysNum}}
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="添加时间" width="200">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span>{{scope.row.updateTime}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="难度" width="200">
        <template slot-scope="scope">
          <svg-icon v-for="n in scope.row.period" icon-class="star" class="meta-item__icon" :key="n"></svg-icon>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="教练" width="200">
        <template slot-scope="scope">
          <span>{{scope.row.updateName}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="是否共享" width="200">
        <template slot-scope="scope">
          <span>{{scope.row.isShare | ifShare}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="" align="center">
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" size="small" @click='handleUpdate(scope.row)'>编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[5, 10, 20, 50, 100]"
      :page-size="limit"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalQuantity">
    </el-pagination>
</div>
  </template>
  <script>
import Vue from "vue";
import VueImgInputer from "vue-img-inputer";
import { getTrainingPlanList } from "@/api/clubAPI";
import { parseTime } from "@/utils/index";
import { validNoEmpty, validMobile, validIdentity } from "@/utils/validate";
Vue.component("VueImgInputer", VueImgInputer);
export default {
  data() {
    return {
      show: false,
      list: [],
      limit: 10,
      startPage: 1,
      totalQuantity: 0,
      currentPage: 1,
      formLabelWidth: "px",
      dialogFormVisible: false,
      imageUrl: "", //用户头像
      searchName: "",
      textMap: {
        dialogStatus: "新增会员"
      },
      form: {
        name: "",
        description: "",
        daysNum: "",
        updateTime: new Date(),
        updateName: "",
        isShare: "",
        sex: "0",
        iconUrl: "",
        faceBase64: ""
      }
    };
  },
  created() {
    this.fetchData();
  },
  filters: {
    ifShare(type) {
      const _share = type == 1 ? "是" : "否";
      return _share;
    }
  },
  methods: {
    fetchData: function() {
      this.listLoading = true;
      let params = {
        limit: this.limit,
        startPage: this.startPage,
        name: this.searchName,
        sEcho: 1
      };
      getTrainingPlanList(params).then(response => {
        this.listLoading = false;
        this.list = response.values;
        this.totalQuantity = response.total;
      });
    },
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex % 2 === 0) {
        return "warning-row";
      } else {
        return "success-row";
      }
      return "";
    },
    // 搜索
    searchMember() {
      this.fetchData();
    },
    handleSizeChange: function(page) {
      this.limit = page;
      this.fetchData();
    },
    handleCurrentChange: function(page) {
      this.startPage = page;
      this.fetchData();
      console.log("Go To " + page);
    }
  }
};
</script>
<style>
.el-pagination {
  text-align: center;
  margin-top: 2em;
}
#add {
  margin-bottom: 1em;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.el-form-item {
  margin-bottom: 22px;
}
.el-dialog__body {
  padding: 10px 20px;
}
</style>