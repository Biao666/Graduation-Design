<!--  -->
<template>
  <div>
    <h1 class="pdatah5">密码设置</h1>
    <hr>
    <ul class="mfle">
      <li class="fle">
        <span>用户名：</span>
        <el-input disabled></el-input>
      </li>
      <li class="fle">
        <span>旧密码：</span>
        <el-input placeholder="请输入旧密码" v-model="oldpass" show-password></el-input>
      </li>
      <li class="fle">
        <span>新密码：</span>
        <el-input placeholder="请输入新密码" v-model="newpass" show-password></el-input>
      </li>
      <li class="fle">
        <span>确认密码：</span>
        <el-input placeholder="请确认密码" v-model="checkpass" show-password></el-input>
      </li>
      <li>
        <input type="button" value="完成修改" class="bt" @click="change">
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
        userName:'',
        oldpass:'',
        newpass:'',
        checkpass:'',
    };
  },

  components: {},

  computed: {},

  methods: {
    change(){
      if(this.oldpass == "" || this.newpass == "" || this.checkpass == "")
        this.$message({
            type: 'error',
            message: '密码不能为空！ '
          });
      else if(this.newpass!=this.checkpass)
        this.$message({
            type: 'error',
            message: '两次输入新密码不一致！ '
          });
      else if(this.oldpass != JSON.parse(sessionStorage.getItem("user")).password)
        this.$message({
            type: 'error',
            message: '旧密码不正确！ '
          });
      else{
        this.axios.post(this.HOST +
            "/passwordset/user/" +
            this.userName,{
              user:this.userName,
              newpass: this.newpass
        }).then(res => {
      alert("修改成功！")
      sessionStorage.clear();
      window.location.reload();
      window.location.href = "/login";
        })
      }
    }
  },

  created () {
    this.userName = JSON.parse(sessionStorage.getItem("user")).account
  }
};
</script>
<style>
.mfle{
    display: flex;
    flex-direction: column;
}
.fle{
    display: flex;
    justify-content: flex-end;
}
.mfle li{
    margin-bottom: 20px;
}
.pdatah5{
  margin-top: 30px;
  font-style: normal;
  color: #e96c1f;
}
.bt{
    background-color: #e96c1f;
    color: #fff;
    height: 40px;
    width: 140px;
    margin-left: 80px;
}
</style>