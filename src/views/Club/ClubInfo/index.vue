<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px">
       <p class="warn-content">基本信息:</p>
       <el-form-item label="俱乐部名称">
        <el-input v-model="form.clubName" v-bind:disabled="true"></el-input>
      </el-form-item>
       <el-form-item label="法定代表人">
        <el-input v-model="form.linkman" v-bind:disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="城市选择">
       <el-cascader
        :options="options"
        v-model="selectedOptions"
        >
      </el-cascader>
       </el-form-item>
       <el-form-item label="街道地址">
        <el-input v-model="form.adress" v-bind:disabled="true"></el-input>
      </el-form-item>
       <el-form-item label="邮箱">
        <el-input v-model="form.email" v-bind:disabled="true"></el-input>
      </el-form-item>
      <p class="warn-content">证件信息:</p>
      <el-row :gutter="50">
      <el-col :xs="20" :sm="20" :lg="6">
          <VueImgInputer v-model="form.backgroundUrl" accept="image/*" icon="img" @onChange="handleFaceChange" :imgSrc='form.logoUrl'></VueImgInputer>
      </el-col>
      <el-col :xs="20" :sm="20" :lg="6">
         <VueImgInputer v-model="form.businessLicenseUrl" accept="image/*" icon="img" @onChange="handleFaceChange" :imgSrc='form.iconUrl'></VueImgInputer>
      </el-col>
      <el-col :xs="20" :sm="20" :lg="6">
         <VueImgInputer v-model="form.logoUrl" accept="image/*" icon="img" @onChange="handleFaceChange" :imgSrc='form.backgroundUrl'></VueImgInputer>
      </el-col>
    </el-row>
    </el-form>
  </div>
</template>
<script>
import Vue from "vue";
import VueImgInputer from "vue-img-inputer";
import { getPersonalcenter } from "@/api/clubAPI";
import { CityInfo } from "@/utils/citydata";
import { validNoEmpty, validMobile, validIdentity } from "@/utils/validate";
export default {
  data() {
    return {
      form: {
        logoUrl: "https://www.baidu.com/img/bd_logo1.png"
      },
      options: CityInfo,
      selectedOptions: []
    };
  },
  components: {
    VueImgInputer
  },
  created() {
    this.fetchData();
  },
  mounted() {
    this.selectedOptions = [1, 1, 1];
  },
  watch: {
    form: function(val) {
      this.form.backgroundUrl = process.env.FACE_API + this.form.backgroundUrl;
      this.form.logoUrl = process.env.FACE_API + this.form.logoUrl;
      this.form.iconUrl = process.env.FACE_API + this.form.iconUrl;
    }
  },
  methods: {
    fetchData: function() {
      this.listLoading = true;
      let params = {};
      getPersonalcenter(params).then(response => {
        this.listLoading = false;
        this.form = response.personalcentervo;
      });
    }
  }
};
</script>

<style scoped>
.line {
  text-align: center;
}
.warn-content {
  background: rgba(66, 185, 131, 0.1);
  border-radius: 2px;
  padding: 16px;
  padding: 1rem;
  line-height: 1.6rem;
  word-spacing: 0.05rem;
  color: #42b983;
  font-weight: 600;
}
</style>

