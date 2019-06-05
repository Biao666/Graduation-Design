<template>
  <div>
    <div class="headerT">
      <div class="headL">
        <img :src="imgpath" alt>
        <a href="/">
          <strong class="stronga" @mouseover="changeC($event)" @mouseout="changeC($event)">首页</strong>
        </a>
      </div>
      <div class="headR">
        {{userName}}
        <a href="" @click="exit">退出</a>
      </div>
    </div>
    <div>
      <div class="headerG">
        <div class="GI">
          <a href="/" title="培苗场|水产交易信息系统">
            <img src="../../assets/logo.png" alt="培苗场|水产交易信息系统" border="0">
          </a>
        </div>
        <ul class="GU">
          <li :class="npca">
            <router-link :to='"/Person/"+userName+"/1"' 
            @mouseover.native="changeActivec"
            @mouseout.native="removeActivec">个人中心</router-link>
          </li>
          <li :class="npsa">
            <router-link :to='"/PersonalSet/"+userName'
            @mouseover.native="changeActives"
            @mouseout.native="removeActives">账户设置</router-link>
          </li>
        </ul>
        <router-link to="/publish" style="color:white">
        <el-button type="primary" size="small">
          发布
          <i class="el-icon-upload el-icon--right"></i>
        </el-button></router-link>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>
<script>
import Home from "../../assets/Home.png";
import Home1 from "../../assets/Home (1).png";
export default {
  data() {
    return {
      imgpath: Home,
      userName: "",
      input10: "",
      input5: "",
      select: "",
      npca: "npa",
      npsa: "npa"
    };
  },
  created () {
    if(sessionStorage.getItem("user")!=null){
      this.userName = JSON.parse(sessionStorage.getItem("user")).account
    }
  },
  methods: {
    changeC($event) {
      var _this = $event.currentTarget;
      if (_this.className == "stronga") {
        _this.className = "strongb";
        this.imgpath = Home1;
      } else {
        _this.className = "stronga";
        this.imgpath = Home;
      }
    },
    changeActivec(){
      this.npca = "pa";
    },
    removeActivec(){
      this.npca = "npa";
    },
    changeActives(){
      this.npsa = "pa";
    },
    removeActives(){
      this.npsa = "npa";
    },
    exit(){
      sessionStorage.clear();
      this.$router.push('/login');
    },
  },
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
  float:left;
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
  width: 260px;
  display: flex;
  justify-content: space-between;
  margin-left: 200px;
  margin-right: 500px;
}
.GU li{
  height: 50px;
  line-height: 50px;
}
.GU a{
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