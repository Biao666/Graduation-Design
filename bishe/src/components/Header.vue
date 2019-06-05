<template>
    <div id="header" v-if="show">
      <div class="header_bottom">
        <div class="w1180">
          <el-row>
            <el-col :span="6">
              <div>
                <h2>
                  <a href title="培苗场|水产交易信息系统">
                    <img src="../assets/logo.png" alt="培苗场|水产交易信息系统" border="0">
                  </a>
                </h2>
              </div>
            </el-col>
            <el-col :span="12">
              .
            </el-col>
            <el-col :span="6">
              <div class="denglu">
                  <div>
                    <router-link
                      class="dlzciu"
                      to="/register"
                      @mouseover.native="changeActive($event)"
                      @mouseout.native="removeActive($event)"
                      @click.native="changeInd"
                      id="register"
                    >注册</router-link>
                    <router-link
                      class="dlzciu"
                      to="/login"
                      @click.native="changeInd"
                      @mouseover.native="changeActive($event)"
                      @mouseout.native="removeActive($event)"
                      v-if="username == ''? disab:!disab"
                    >登陆</router-link>
                    <a :href='"/Person/"+username+"/1"' v-if="username == ''? !disab:disab" @click="Show">{{username}}</a>
                    <a href="" v-if="username == ''? !disab:disab" @click="exit">退出</a>
                  </div>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>

      <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        @select="changeIndex"
        background-color="#545c64"
        text-color="#fff"
        :active-text-color="act"
        style="display:flex;justify-content:center;width:100%;height:60px"   
      >
      <router-link to="/">
        <el-menu-item index="1" >
            首页
        </el-menu-item> </router-link>    
        <router-link to="/FaX/1"><el-menu-item index="2">
          发现
        </el-menu-item></router-link>
        <router-link to="/news">
        <el-menu-item index="3">
          新闻
        </el-menu-item></router-link>
        <router-link :to='"/Person/"+username+"/1"'><el-menu-item index="4" :disabled="!disab" v-if="username == ''? !disab:disab" @click="Show">
          {{username}}
        </el-menu-item></router-link>
        <router-link to="/Login"><el-menu-item index="4" :disabled="disab" v-if="username == ''? disab:!disab">
          请先登录
        </el-menu-item></router-link>
      </el-menu>
    </div>
</template>
<script>
export default {
 
  methods: {
    changeActive($event) {
      $event.currentTarget.className = "active";
    },
    removeActive($event) {
      $event.currentTarget.className = "dlzciu";
    },
    changeInd(){
        this.act = "#fff"
    },
    changeIndex(){
      this.act = "#ffd04b"
    },
    Show(){
      this.show = false
    },
    exit(){
      sessionStorage.clear();
    }
  },
  data() {
      return {
        input4: "",
        input5: "",
        select: "",
        activeIndex:"1",
        disab: true, //控制 个人 登录前后 可点击状态 
        act:"#ffd04b",
        show:true,
        username:""
      }
  },
  beforeMount() {
    if(sessionStorage.getItem('user')!=null)
      this.username = JSON.parse(sessionStorage.getItem('user')).account
    if(this.$route.path.split('/')[1] === "admin" || this.$route.path.split('/')[1] === "Person" || this.$route.path.split('/')[1] === "pfavorites" || this.$route.path.split('/')[1] === "pseen" || this.$route.path.split('/')[1] === "pcomment" || this.$route.path.split('/')[1] === "PersonalSet" || this.$route.path.split('/')[1] === "pcheck" || this.$route.path.split('/')[1] === "passwordset" || this.$route.path.split('/')[1] === "pmsg" || this.$route.path.split('/')[1] === "writtenoff" || this.$route.path.split('/')[1] === "publish"){
      this.show = false
    }
  },
}    
</script>

<style>

#register {
  margin-left: 30px;
}
#header_top {
  width: 100%;
  height: 48px;
  line-height: 48px;
  min-width: 1180px;
  background: rgb(160, 48, 50);
  border-top: 3px solid rgb(229, 165, 37);
}
#person{
  color:#fff
}
a {
  text-decoration: none;
}
.search {
  margin-left:20px;
  margin-top: 20px
}
.el-select .el-input {
  width: 130px;
}
.el-input {
  width: 650px;
}
.input-with-select .el-input-group__prepend {
  background-color: #fff;
}
.header_bottom {
  width: 100%;
  min-width: 1180px;
  background: #101928;
  height: 65px;
  padding: 25px 0;
}
.w1180 {
  width: 1180px;
  margin: 0 auto;
}
h1,
h2,
h3,
h4,
h5,
h6 {
  font-size: 1em;
}
.denglu {
  
  display: flex;
  justify-content: flex-end;
  margin-left: 50px;
  width: 230px;
  height: 50px;
}
.dlzciu {
  width: 100px;
  height: 60px;
  margin-left: 20px;
  line-height: 60px;
  border-radius: 4px;
  text-align: center;
  font-size: 20px;
  color: #fff;
  background: #101928;
}
.active {
  width: 100px;
  height: 60px;
  margin-left: 20px;
  line-height: 60px;
  border-radius: 4px;
  text-align: center;
  font-size: 20px;
  color: #fff;
  background: orange;
}
</style>