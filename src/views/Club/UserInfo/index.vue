<template>
  <div class="dashboard-container">
    <div class="dashboard-text">clubName:{{clubName}}</div>
    <div class="dashboard-text">roleCodeStr:{{roleCodeStr}}</div>
    <div class="dashboard-text">account_Id:{{accountId}}</div>
  </div>
</template>

<script>
import Vue from "vue";
import { mapGetters } from "vuex";
export default {
  name: "dashboard",
  computed: {},
  components: {
  },
  data() {
    return {
      blogTitle: "4444",
      accountId: "",
      roleCodeStr: "",
      clubName: ""
    };
  },
  created() {
    var userRoleInfo = JSON.parse(localStorage.getItem("userRoleInfo"));
    this.accountId = userRoleInfo.accountId;
    this.clubName = userRoleInfo.clubName;
    this.roleCodeStr = userRoleInfo.roleCodeStr;
    // this.init()
  },
  methods: {
    tobeknow: function() {
      console.log("It is the parent's method");
    }
  },
  mounted() {
    Vue.component("tb-heading", {
      render: function(createElement) {
        return createElement(
          "h" + this.level, // tag name 标签名称
          this.$slots.default // 组件的子元素
        );
      },
      props: {
        level: {
          type: Number,
          required: true
        }
      }
    });
  }
};
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
