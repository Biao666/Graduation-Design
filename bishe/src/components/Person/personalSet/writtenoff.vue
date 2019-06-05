<!--  -->
<template>
  <div>
    <h1 class="pdatah5">注销账号</h1>
    <hr>
    <ul class="mfle">
      <li>
        <span>问题验证：{{question}}</span>        
      </li>
      <li class="fle">
        <span>答&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;案：</span>
        <el-input placeholder="请输入答案" v-model="answer"></el-input>
      </li>
      <li>
        <input type="button" value="注销" class="bt" @click="change">
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
        userName:'',
        question:'',
        answer:'',
        canswer:'',
    };
  },

  components: {},

  computed: {},

  methods: {
    change(){
      if(this.answer == "")
        this.$message({
            type: 'error',
            message: '答案不能为空！ '
          });
      else if(this.answer!=this.canswer)
        this.$message({
            type: 'error',
            message: '答案错误！ '
          })
      else{
        this.axios.post(this.HOST +
            "/woff",{
              user:this.userName,
        }).then(res => {
      alert("注销成功！")
      sessionStorage.clear();
      window.location.reload();
      window.location.href = "/";
        })
      }
    }
  },

  created () {
    this.userName = JSON.parse(sessionStorage.getItem("user")).account
    this.question = JSON.parse(sessionStorage.getItem("user")).question
    this.canswer = JSON.parse(sessionStorage.getItem("user")).answer
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