<template>
<div class="app-container">
   <el-table :data="list" v-loading.body="listLoading" element-loading-text="Loading" border fit highlight-current-row>
      <el-table-column align="center" label='序号' width="50">
        <template slot-scope="scope">
          {{scope.$index + 1}}
        </template>
      </el-table-column>
      <el-table-column align="center" label="姓名" width="80">
        <template slot-scope="scope">
          {{scope.row.name}}
        </template>
      </el-table-column>
      <el-table-column align="center" label="性别" width="80">
        <template slot-scope="scope">
          {{scope.row.sex}}
        </template>
      </el-table-column>
      <el-table-column label="手机号" width="120" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.mobilePhone}}</span>
        </template>
      </el-table-column>
      <el-table-column label="会员类型" width="90" align="center">
        <template slot-scope="scope">
          {{scope.row.memberType}}
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="所属会籍" width="100" align="center">
        <template slot-scope="scope">
          <el-tag :type="'published'" v-if="scope.row.membershipName">{{scope.row.membershipName}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="所属教练" width="80" align="center">
        <template slot-scope="scope">
          {{scope.row.coachName}}
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="添加时间" width="200">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span>{{scope.row.createTime}}</span>
        </template>
      </el-table-column>
      <el-table-column label="时间卡" width="90" align="center">
        <template slot-scope="scope">
          {{scope.row.cardTimeDay}}
        </template>
      </el-table-column>
      <el-table-column label="私教卡" width="120" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status" v-if="scope.row.cardCoachNum!=null">
            {{scope.row.cardCoachNum}}张，余{{scope.row.cardCoachLeft}}次
          </el-tag>
          <el-tag :type="'deleted'" v-else>
            无私教卡
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="次卡" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status" v-if="scope.row.cardCountNum!=null">
            {{scope.row.cardCountNum}}张，{{scope.row.cardCountLeft}}次
          </el-tag>
          <el-tag :type="'deleted'" v-else>
            无次卡
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="充值卡" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status" v-if="scope.row.cardRechargeNum!=null">
            {{scope.row.cardRechargeNum}}张，{{scope.row.cardRechargeLeft}}元
          </el-tag>
          <el-tag :type="'deleted'" v-if="scope.row.cardRechargeNum==null">
            未充值
          </el-tag>
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
      :page-size="limit"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalQuantity">
    </el-pagination>
</div>
  </template>
  <script>
import { getVipList, addVip } from "@/api/table";
import { parseTime } from "@/utils/index";
export default {
  data() {
    return {
      list: [],
      limit : 1,
      startPage:1,
      totalQuantity: 0,
      currentPage: 0
    };
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData: function() {
      this.listLoading = true;
      let params = {
        clientType: "formPC",
        clubId: "1",
        limit: this.limit,
        name: "",
        sEcho: 1,
        telephoe: "",
        seq: new Date().getTime().toString(),
        start: 0,
        startPage: this.startPage,
        versionNo: "2.0.0"
      };
      getVipList(params).then(response => {
        this.listLoading = false;
        this.list = response.values;
        this.totalQuantity = response.total;
      });
    },
    handleSizeChange:function(page){
      this.limit = page;
      this.fetchData();
    },
    handleCurrentChange:function(page){
      this.startPage = page;
      this.fetchData();
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