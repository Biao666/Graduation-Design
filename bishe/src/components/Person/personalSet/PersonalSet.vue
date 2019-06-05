<template>
    <div id="Pmain">
    <el-row class="tac">
      <el-col :span="12">
        <h5 class="pseth5">账户设置</h5>
        <el-menu default-active="1" class="el-menu-vertical-demo" background-color="#fafafa">
          <el-menu-item index="1">
            <i class="el-icon-menu"></i>
            <router-link slot="title" :to='"/PersonalSet/"+username'>个人资料</router-link>
          </el-menu-item>
          <el-menu-item index="2">
            <i class="el-icon-star-on"></i>
            <router-link slot="title" :to='"/pcheck/"+username'>认证管理</router-link>
          </el-menu-item>
          <el-menu-item index="3">
            <i class="el-icon-location"></i>
            <router-link slot="title" :to='"/passwordset/"+username'>密码设置</router-link>
          </el-menu-item>
          <el-menu-item index="4">
            <i class="el-icon-document"></i>
            <router-link slot="title" :to='"/pmsg/"+username'>消息管理</router-link>
          </el-menu-item>
          <el-menu-item index="5">
            <i class="el-icon-document"></i>
            <router-link slot="title" :to='"/writtenoff/"+username'>注销账号</router-link>
          </el-menu-item>
        </el-menu>
      </el-col>
    </el-row>
    <router-view></router-view>
  </div>
</template>
<script>
export default {
    data(){
      return{
        username:""
      }     
    },
    created () {
      if(sessionStorage.getItem('user')!=null){
          this.username = JSON.parse(sessionStorage.getItem("user")).account
      }
    }
}
</script>
<style scoped>
#Pmain {
  display: flex;
}
a{
  color: #303133;
}
.tac {
  display: flex;
  justify-content: space-around;
  width: 380px;
}
.pseth5 {
  color: #595957;
  margin-left: 58px;
}    
</style>