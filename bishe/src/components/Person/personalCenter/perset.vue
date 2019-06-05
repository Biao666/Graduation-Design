<template>
  <div id="Pmain">
    <el-row class="tac">
      <el-col :span="12">
        <h5>个人中心</h5>
        <el-menu default-active="1" class="el-menu-vertical-demo" background-color="#fafafa">
          <el-menu-item index="1">
            <i class="el-icon-menu"></i>
            <router-link slot="title" :to='"/Person/"+username+"/1"'>我的发布</router-link>
          </el-menu-item>
          <el-menu-item index="2">
            <i class="el-icon-star-on"></i>
            <router-link slot="title" :to='"/pfavorites/"+username+"/1"'>我的收藏</router-link>
          </el-menu-item>
          <el-menu-item index="3">
            <i class="el-icon-location"></i>
            <router-link slot="title" :to='"/pseen/"+username+"/1"'>我的浏览</router-link>
          </el-menu-item>
          <el-menu-item index="4">
            <i class="el-icon-document"></i>
            <router-link slot="title" :to='"/pcomment/"+username+"/1"'>我的留言</router-link>
          </el-menu-item>
        </el-menu>
      </el-col>
    </el-row>
    <router-view ></router-view>
  </div>
</template>
<script>
export default {
    data(){
        return{
          data(){
            return{
              $createElement:null,
            }
          },
          username:""
        }
    },
     methods: {
    },
    created () {
      if(sessionStorage.getItem('user')!=null){
          this.username = JSON.parse(sessionStorage.getItem("user")).account
      }
    }
};
</script>
<style>
#Pmain {
  display: flex;
}
.tac {
  display: flex;
  justify-content: space-around;
  width: 380px;
}
.tac a{
  color:black
}
h5 {
  color: #595957;
  margin-left: 58px;
}
</style>