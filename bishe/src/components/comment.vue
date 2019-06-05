<!--  -->
<template>
  <div>
    <h3 style="text-align:center;color:gray" v-if="com.length==0">还没评论？快来抢沙发吧！</h3>
    <div v-for="(item,index) in com" :key="index" >
      <div v-if="com.length!=0">
        <table>
          <tr>
            <td class="tim">
              <img :src="item.headimg" alt class="timgr">
            </td>
            <td>
              <tr>
                <el-button type="text">{{item.commentuser}}</el-button>
              </tr>
              <tr>{{item.comment}}</tr>
              <tr class="trp">
                <div>{{item.time | formatDate}}</div>
                <div>
                  <el-button type="text" @click="reply(item)">回复({{item.comment2.length}})</el-button>
                  <el-button type="text" @click="item.showflag=true">更多回复</el-button>
                </div>
              </tr>
            </td>
          </tr>
        </table>
        <div  class="morep" v-if="item.showflag && item.comment2.length!=0">
          <div v-for="(i,ind) in item.comment2" :key="ind">          
            <table>
              <tr>
                <td class="tim">
                  <img :src="i.headimg" alt class="timgr">
                </td>
                <td>
                  <tr>
                    <el-button type="text">{{i.commentuser}}</el-button>
                  </tr>
                  <tr>{{i.comment}}</tr>
                  <tr class="trp">
                    <div>{{i.time | formatDate}}</div>
                  </tr>
                </td>
              </tr>
            </table> 
          </div>
          <el-button type="text" @click="item.showflag=false">收起</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  filters: {
    formatDate: function(value) {
      let date = new Date(value);
      let y = date.getFullYear();
      let MM = date.getMonth() + 1;
      MM = MM < 10 ? "0" + MM : MM;
      let d = date.getDate();
      d = d < 10 ? "0" + d : d;
      let h = date.getHours();
      h = h < 10 ? "0" + h : h;
      let m = date.getMinutes();
      m = m < 10 ? "0" + m : m;
      let s = date.getSeconds();
      s = s < 10 ? "0" + s : s;
      return y + "-" + MM + "-" + d + " " + h + ":" + m + ":" + s;
    }
  },
  data() {
    return {
      data:[],
      com: [],
      user: ""
    };
  },
  watch : {
    comments(){
      this.com = this.comments
    }
  },
  created() {
    if (sessionStorage.getItem("user") != null) {
      this.user = JSON.parse(sessionStorage.getItem("user")).account;
    }

  },
  components: {},

  computed: {},

  props: ["comments"],

  methods: {
    getData0(){
      this.axios
        .get(
          this.HOST +
            "/detailshow/id/" +
            this.$route.path.substring(
              this.$route.path.lastIndexOf("/") + 1,
              this.$route.path.length
            )
        )
        .then(res => {
          this.data = res.data[0];
          this.com = res.data[1];
          for (let i = 2; i < res.data.length; i++)
            this.comments.push(res.data[i]);
        })
        .catch(err => {
          console.log(err);
        });
    },
    reply(item){
      if(this.user!=""){
        this.$prompt('请输入内容', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputPattern: /\S/,
          inputErrorMessage: '内容不能为空！'
        }).then(({ value }) => {
          this.axios.post(this.HOST +
            "/detailshow/id/" +
            this.$route.path.substring(this.$route.path.lastIndexOf("/") + 1,this.$route.path.length),{
              user:this.user,
              id:this.$route.path.substring(this.$route.path.lastIndexOf("/") + 1,this.$route.path.length),
              comment:value,
              t: 's',
              fid: item.fid,
              headimg: JSON.parse(sessionStorage.getItem("user")).headimage
        })
        }).then(res => {
          this.$message({
            type: 'success',
            message: '回复成功 '
          });
          this.getData0()
        })
        }
        else{
          alert("请先登录！")
        }
      }
  }
};
</script>
<style>
.morep {
  background-color: rgb(231, 229, 229);
  margin-left: 65px;
}
.morepn {
  display: none;
  background-color: rgb(231, 229, 229);
  margin-left: 65px;
}
</style>