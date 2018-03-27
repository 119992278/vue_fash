<template>
<div class="app-container">
姓名:
<el-input @keyup.enter.native="searchMember" v-model="searchName" style="width: 200px;" class="filter-item" placeholder="search"></el-input>
<el-button class="filter-item" type="primary" icon="el-icon-search" @click="searchMember">search</el-button>
<el-button type="primary" @click="handleAdd" id="add">添加会员</el-button>
  <el-dialog :title="textMap.dialogStatus" :visible.sync="dialogFormVisible">
      <el-form :model="form" ref="form" :rules="rules">
        <el-form-item label="用户头像:" :label-width="formLabelWidth">
         <VueImgInputer v-model="form.iconUrl" accept="image/*" icon="img" @onChange="handleFaceChange" :imgSrc='form.iconUrl'></VueImgInputer>
        </el-form-item>
        <el-form-item label="faceBase64" :label-width="formLabelWidth" v-if='show'>
          <el-input v-model="form.faceBase64"></el-input>
        </el-form-item>
        <el-form-item label="用户姓名" :label-width="formLabelWidth" prop="memberName">
          <el-input v-model="form.memberName"></el-input>
        </el-form-item>
        <el-form-item label="会员卡号" :label-width="formLabelWidth" prop="mobilePhone">
          <el-input v-model="form.mobilePhone" type="text" placeholder="请输入手机号" ></el-input>
        </el-form-item>
        <el-form-item label="手机号" :label-width="formLabelWidth" prop="mobilePhone">
          <el-input v-model="form.mobilePhone" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="身份证号" :label-width="formLabelWidth" prop="idCard">
          <el-input v-model="form.idCard"></el-input>
        </el-form-item>
        <el-form-item label="住址" :label-width="formLabelWidth">
          <el-input v-model="form.adress"></el-input>
        </el-form-item>
        <el-form-item label="会员类型" :label-width="formLabelWidth" prop="">
          <el-input v-model="form.memberType"></el-input>
        </el-form-item>
        <el-form-item label="性别" :label-width="formLabelWidth">
          <el-radio v-model="form.sex" label="0">男</el-radio>
          <el-radio v-model="form.sex" label="1">女</el-radio>
        </el-form-item>
        <el-form-item label="出生日期" :label-width="formLabelWidth" prop="">
          <el-date-picker
            v-model="form.region"
            type="date"
            placeholder="选择日期"
             :picker-options="pickerOptions1">
          </el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button  v-if="textMap.dialogStatus=='新增会员'" type="primary"  @click="addMemberForm('form')">确 定</el-button>
         <el-button v-else type="primary" @click="updateMemberForm('form')">编辑</el-button>
        <el-button @click="dialogFormVisible = false">取 消</el-button>
      </div>
    </el-dialog>
   <el-table :data="list" v-loading.body="listLoading" element-loading-text="Loading" border fit highlight-current-row :row-class-name="tableRowClassName">
      <el-table-column align="center" label='序号' width="50">
      <template slot-scope="scope"> 
        {{scope.$index + 1}}
      </template>
      </el-table-column>
      <el-table-column align="center" label="姓名" width="80">
        <template slot-scope="scope">
          {{scope.row.memberName}}
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
      <el-table-column label="操作123" width="120" align="center">
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
import {
  getMemberList,
  getMemberInfo,
  addMember,
  editMember
} from "@/api/clubAPI";
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
      formLabelWidth: "120px",
      dialogFormVisible: false,
      imageUrl: "", //用户头像
      searchName: "",
      textMap: {
        dialogStatus: "新增会员"
      },
      form: {
        memberName: "",
        mobilePhone: "",
        identity: "",
        birthday: new Date(),
        address: "",
        vipType: "",
        sex: "0",
        iconUrl: "",
        faceBase64: ""
      },
      pickerOptions1: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
        shortcuts: [
          {
            text: "今天",
            onClick(picker) {
              picker.$emit("pick", new Date());
            }
          },
          {
            text: "昨天",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit("pick", date);
            }
          },
          {
            text: "一周前",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", date);
            }
          }
        ]
      },
      rules: {
        memberName: validNoEmpty,
        mobilePhone: validMobile,
        idCard: validIdentity
      }
    };
  },
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
  created() {
    this.fetchData();
  },
  methods: {
    // 页面初始化
    fetchData: function() {
      this.listLoading = true;
      let params = {
        limit: this.limit,
        startPage: this.startPage,
        name: this.searchName,
        sEcho: 1
      };
      getMemberList(params).then(response => {
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
    updateMemberForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let params = {
            accountId: this.form.accountId,
            memberName: this.form.memberName,
            sex: this.form.sex,
            mobilePhone: this.form.mobilePhone,
            cardNo: this.form.mobilePhone,
            memberType: this.form.memberType,
            idCard: this.form.idCard,
            birthday: this.form.birthday,
            iconBase64: this.form.faceBase64,
            adress: this.form.adress,
            roleCode: "member",
            memberId: this.form.memberId,
            status: 1
          };
          this.listLoading = true;
          this.form.birthday = parseTime(this.form.birthday, "{y}-{m}-{d}");
          editMember(params).then(
            response => {
              this.listLoading = false;
              this.dialogFormVisible = false;
              this.fetchData();
            },
            error => {
              this.listLoading = false;
            }
          );
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //创建会员
    addMemberForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let params = {
            accountId: "",
            memberName: this.form.memberName,
            sex: this.form.sex,
            mobilePhone: this.form.mobilePhone,
            cardNo: this.form.mobilePhone,
            memberType: this.form.memberType,
            idCard: this.form.idCard,
            birthday: this.form.birthday,
            iconBase64: this.form.faceBase64,
            adress: this.form.adress,
            status: 1
          };
          this.listLoading = true;
          this.form.birthday = parseTime(this.form.birthday, "{y}-{m}-{d}");
          addMember(params).then(
            response => {
              this.listLoading = false;
              this.dialogFormVisible = false;
              this.fetchData();
            },
            error => {
              this.listLoading = false;
            }
          );
        } else {
          console.log("error submit!!");
          return false;
        }
      });
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
    },
    // 新增会员
    handleAdd: function(params) {
      this.form = {};
      this.textMap.dialogStatus = "新增会员";
      this.dialogFormVisible = true;
    },
    // 编辑会员
    handleUpdate: function(params) {
      this.textMap.dialogStatus = "编辑会员";
      const _this = this;
      getMemberInfo(params).then(
        response => {
          this.dialog_title = "编辑会员";
          this.listLoading = false;
          this.$nextTick(function() {
            //获取更新后的 DOM
            _this.form = Object.assign({}, response); //复制对象
            console.log(process.env.FACE_API + response.iconUrl);
            _this.form = {
              accountId: response.accountId,
              idCard: response.idCard,
              iconUrl: process.env.FACE_API + response.iconUrl,
              memberName: response.memberName,
              mobilePhone: response.mobilePhone,
              adress: response.adress,
              memberType: response.memberType,
              memberId: this.form.memberId
            };
          });
          this.dialogFormVisible = true;
        },
        error => {
          this.listLoading = false;
        }
      );
    },
    // 上传头像
    handleFaceChange: function() {
      const _this = this;
      if (!this.form.iconUrl || !window.FileReader) return;
      if (/^image/.test(this.form.iconUrl.type)) {
        let reader = new FileReader(); // 创建一个reader
        reader.readAsDataURL(this.form.iconUrl); // 将图片将转成 base64 格式
        reader.onloadend = function() {
          // 读取成功后的回调
          _this.form.faceBase64 = this.result.split("base64,")[1];
        };
      }
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