<template>
  <div class="dashboard-container">
    <div class="dashboard-text">clubName:{{clubName}}</div>
    <div class="dashboard-text">roleCodeStr:{{roleCodeStr}}</div>
    <div class="dashboard-text">account_Id:{{accountId}}</div>
    <!-- <div class="dashboard-text">roles:<span v-for='role in roles' :key='role'>{{role}}</span></div> -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'dashboard',
  computed: {
  },
  data() {
    return{
      accountId:'',
      roleCodeStr:'',
      clubName:''
    }
  },
  created () {
    var userRoleInfo =JSON.parse(localStorage.getItem("userRoleInfo"));
    console.log(userRoleInfo);
    this.accountId = userRoleInfo.accountId
    this.clubName = userRoleInfo.clubName
    this.roleCodeStr = userRoleInfo.roleCodeStr
   // this.init()
  },
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
