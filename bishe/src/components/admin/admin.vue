<!--  -->
<template>
  <div>
    <div class="headerG">
      <div class="GI">
        <a href="/" title="培苗场|水产交易信息系统">
          <img src="../../assets/logo.png" alt="培苗场|水产交易信息系统" border="0">
        </a>
      </div>
      <ul class="GU">
        <li :class="npca" style="width:70px;text-align:center">
          <router-link
            to="/admin/fabu"
            @mouseover.native="changeActivec"
            @mouseout.native="removeActivec"
          >发&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;布</router-link>
        </li>
        <li :class="npsa" style="width:70px;text-align:center">
          <router-link
            to="/admin/check/1"
            @mouseover.native="changeActives"
            @mouseout.native="removeActives"
          >认&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;证</router-link>
        </li>
        <li :class="npda" style="width:70px;text-align:center">
          <router-link to="/admin/manage" @mouseover.native="changeActived" @mouseout.native="removeActived">用户管理</router-link>
        </li>
      </ul>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userName: "",
      input10: "",
      input5: "",
      select: "",
      npca: "npa",
      npsa: "npa",
      npda: "npa"
    };
  },
  created() {
    if (sessionStorage.getItem("user") != null) {
      this.userName = JSON.parse(sessionStorage.getItem("user")).account;
    }
  },
  methods: {
    changeActivec() {
      this.npca = "pa";
    },
    removeActivec() {
      this.npca = "npa";
    },
    changeActives() {
      this.npsa = "pa";
    },
    removeActives() {
      this.npsa = "npa";
    },
    changeActived() {
      this.npda = "pa";
    },
    removeActived() {
      this.npda = "npa";
    }
  }
};
</script>
<style>
.el-input {
  width: 250px;
}
.input-with-select .el-input-group__prepend {
  background-color: #fff;
}
.headerT {
  display: inline-block;
}
.headL {
  float: left;
  margin-left: 88px;
}
.headL img {
  height: 15x;
}
.headR {
  float: right;
  margin-left: 1400px;
  color: #666;
}
strong {
  font-size: 12px;
}
.headR a {
  font-size: 12px;
  color: #666;
}
.stronga {
  color: #666;
}
.strongb {
  color: #f52e;
}
.headerG {
  display: flex;
  height: 100px;
  background-color: #101928;
  align-items: center;
}
.GI {
  display: flex;
  margin-left: 150px;
}
.GU {
  width: 400px;
  display: flex;
  justify-content: space-between;
  margin-left: 200px;
  margin-right: 500px;
}
.GU li {
  height: 50px;
  line-height: 50px;
}
.GU a {
  color: #fff;
}
.headerG img {
  align-items: center;
}
ul li {
  list-style: none;
}
el-input {
  width: 130px;
}
.npa {
  background: #101928;
}
.pa {
  border-radius: 4px;
  background: orange;
}
</style>