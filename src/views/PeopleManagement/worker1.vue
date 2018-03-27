<template>
<div class="app-container">
  <el-tabs type="border-card" v-model="activeName" @tab-click="handleTabClick">
    <el-tab-pane label="教练" name="coach">
      <el-input v-model="valueCoach" style="width: 200px;" class="filter-item" placeholder="search"></el-input>
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="search('coach')">search</el-button>
      <el-table :data="coachList" v-loading.body="listLoading" element-loading-text="Loading" border fit highlight-current-row>
      <el-table-column align="center" label='序号' width="50">
        <template slot-scope="scope">
          {{scope.$index + 1}}
        </template>
      </el-table-column>
      <el-table-column align="center" label="头像">
        <template slot-scope="scope" v-if="scope.row.iconUrl != ''">
          <img :src="scope.row.iconUrl" width="50px" height="50px">
        </template>
      </el-table-column>
      <el-table-column align="center" label="教练姓名">
        <template slot-scope="scope">
          {{scope.row.memberName}}
        </template>
      </el-table-column>
      <el-table-column align="center" label="性别">
        <template slot-scope="scope">
          {{scope.row.sex}}
        </template>
      </el-table-column>
      <el-table-column align="center" label="擅长">
        <template slot-scope="scope">
          {{scope.row.skilled}}
        </template>
      </el-table-column>
      <el-table-column align="center" label="备注">
        <template slot-scope="scope">
          {{scope.row.remark}}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="120" align="center">
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" size="small">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
   <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[5, 10, 20, 50, 100]"
      :page-size="pageCount"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalQuantity">
    </el-pagination>
    </el-tab-pane>
    <el-tab-pane label="会籍" name="saler">
      <el-input v-model="valueSaler" style="width: 200px;" class="filter-item" placeholder="search"></el-input>
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="search('saler')">search</el-button>
      <el-table :data="salerList" element-loading-text="Loading" border fit highlight-current-row>
      <el-table-column align="center" label='序号' width="50">
        <template slot-scope="scope">
          {{scope.$index + 1}}
        </template>
      </el-table-column>
      <el-table-column align="center" label="头像">
        <template slot-scope="scope" v-if="scope.row.iconUrl != ''">
          <img :src="scope.row.iconUrl" width="50px" height="50px">
        </template>
      </el-table-column>
      <el-table-column align="center" label="教练姓名">
        <template slot-scope="scope">
          {{scope.row.memberName}}
        </template>
      </el-table-column>
      <el-table-column align="center" label="性别">
        <template slot-scope="scope">
          {{scope.row.sex}}
        </template>
      </el-table-column>
      <el-table-column align="center" label="备注">
        <template slot-scope="scope">
          {{scope.row.remark}}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="120" align="center">
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" size="small">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[5, 10, 20, 50, 100]"
      :page-size="pageCount"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalQuantity">
    </el-pagination>
    </el-tab-pane>
    <el-tab-pane label="前台" name="reception">
      <el-input v-model="valueReception" style="width: 200px;" class="filter-item" placeholder="search"></el-input>
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="search('reception')">search</el-button>
      <el-table :data="receptionList" element-loading-text="Loading" border fit highlight-current-row>
      <el-table-column align="center" label='序号' width="50">
        <template slot-scope="scope">
          {{scope.$index + 1}}
        </template>
      </el-table-column>
      <el-table-column align="center" label="头像">
        <template slot-scope="scope" v-if="scope.row.iconUrl != ''">
          <img :src="scope.row.iconUrl" width="50px" height="50px">
        </template>
      </el-table-column>
      <el-table-column align="center" label="教练姓名">
        <template slot-scope="scope">
          {{scope.row.memberName}}
        </template>
      </el-table-column>
      <el-table-column align="center" label="性别">
        <template slot-scope="scope">
          {{scope.row.sex}}
        </template>
      </el-table-column>
      <el-table-column align="center" label="备注">
        <template slot-scope="scope">
          {{scope.row.remark}}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="120" align="center">
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" size="small">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[5, 10, 20, 50, 100]"
      :page-size="pageCount"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalQuantity">
    </el-pagination>
    </el-tab-pane>
    <el-tab-pane label="主管" name="admin">
      <el-input v-model="valueAdmin" style="width: 200px;" class="filter-item" placeholder="search"></el-input>
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="search('admin')">search</el-button>
      <el-table :data="adminList" element-loading-text="Loading" border fit highlight-current-row>
      <el-table-column align="center" label='序号' width="50">
        <template slot-scope="scope">
          {{scope.$index + 1}}
        </template>
      </el-table-column>
      <el-table-column align="center" label="头像">
        <template slot-scope="scope" v-if="scope.row.iconUrl != ''">
          <img :src="scope.row.iconUrl" width="50px" height="50px">
        </template>
      </el-table-column>
      <el-table-column align="center" label="教练姓名">
        <template slot-scope="scope">
          {{scope.row.memberName}}
        </template>
      </el-table-column>
      <el-table-column align="center" label="性别">
        <template slot-scope="scope">
          {{scope.row.sex}}
        </template>
      </el-table-column>
      <el-table-column align="center" label="备注">
        <template slot-scope="scope">
          {{scope.row.remark}}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="120" align="center">
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" size="small">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[5, 10, 20, 50, 100]"
      :page-size="pageCount"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalQuantity">
    </el-pagination>
    </el-tab-pane>
  </el-tabs>
   
</div>
  </template>
  <script>
import Vue from "vue";
import { getWorkerList, addVip } from "@/api/clubAPI";
import { parseTime } from "@/utils/index";
export default {
  data() {
    return {
      coachList: [],
      salerList: [],
      receptionList: [],
      adminList: [],
      pageCount: 5,
      pageIndex: 1,
      totalQuantity: 0,
      currentPage: 0,
      activeName: "coach",
      valueCoach: "",
      valueSaler: "",
      valueReception: "",
      valueAdmin: ""
    };
  },
  props: ["totalQuantity"],
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: "success",
        draft: "gray",
        deleted: "danger"
      };
      return statusMap[status];
    }
  },
  //初始化
  created() {
    this.fetchData("coach");
  },
  //监听
  watch: {
    coachList: function(val) {
      this.transIconUrl(this.coachList);
    },
    salerList: function(val) {
      this.transIconUrl(this.salerList);
    },
    receptionList: function(val) {
      this.transIconUrl(this.receptionList);
    },
    adminList: function(val) {
      this.transIconUrl(this.adminList);
    }
  },
  methods: {
    fetchData: function(name) {
      if (!name) return false;
      this.listLoading = true;
      if (name === "coach") this.valueName = this.valueCoach;
      if (name === "saler") this.valueName = this.valueSaler;
      if (name === "reception") this.valueName = this.valueReception;
      if (name === "admin") this.valueName = this.valueAdmin;
      let params = {
        pageCount: this.pageCount,
        pageIndex: this.pageIndex,
        memberName: this.valueName,
        roleCode: name
      };
      getWorkerList(params).then(response => {
        this.listLoading = false;
        if (name === "coach") this.coachList = response.memberList;
        if (name === "saler") this.salerList = response.memberList;
        if (name === "reception") this.receptionList = response.memberList;
        if (name === "admin") this.adminList = response.memberList;
        this.totalQuantity = response.total;
      });
    },
    //转译头像
    transIconUrl(Arrs) {
      Arrs.forEach((obj, index) => {
        if (obj.iconUrl != null && obj.iconUrl != "") {
          obj.iconUrl =
            process.env.FACE_API + obj.iconUrl.split(".jpg")[0] + "_thumb.jpg";
        }
      });
    },
    search(name) {
      this.fetchData(name);
    },
    handleTabClick(tab, event) {
      this.activeName = tab.name;
      this.fetchData(tab.name);
    },
    handleSizeChange: function(page) {
      this.pageCount = page;
      this.fetchData(this.activeName);
    },
    handleCurrentChange: function(page) {
      this.pageIndex = page;
      this.fetchData(this.activeName);
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
</style>