<!--  -->
<template>
  <div>
    <div class="headsad">
      <h1>[{{data.sad}}]{{data.title+'('+data.doing+')'}}</h1>
    </div>
    <div class="tbc">
      <table style="width:1000px">
        <tr>
          <table>
            <tr class="trh">
              <td style="width:400px">
                <img :src="data.img" alt style="height:470px;width:100%;">
              </td>
              <td style="width:60%">
                <table style="border-collapse:separate; border-spacing:0px 22px;">
                  <tr>
                    <td>发布人：</td>
                    {{data.author}}
                  </tr>
                  <tr>
                    <td>联系人：</td>
                    {{data.contact}}
                  </tr>
                  <tr>
                    <td>所在地：</td>
                    <span v-if="user!==''">{{data.location}}</span>
                    <span v-if="user==''">登陆查看更多信息</span>
                  </tr>
                  <tr>
                    <td>电 话：</td>
                    <span v-if="user!==''">{{data.phone}}</span>
                    <span v-if="user==''">登陆查看更多信息</span>
                  </tr>
                  <tr>
                    <td>价 格：</td>
                    {{data.price}}
                  </tr>
                  <tr>
                    <td>电子邮件：</td>
                    <span v-if="user!==''">{{data.email}}</span>
                    <span v-if="user==''">登陆查看更多信息</span>
                  </tr>
                  <tr>
                    <td>网 址：</td>
                    <span v-if="user!==''"><a :href="data.website">{{data.website | ellipsis}}</a></span>
                    <span v-if="user==''">登陆查看更多信息</span>
                  </tr>
                  <tr>
                    <td>发布时间：</td>
                    {{data.start}}
                  </tr>
                  <tr>
                    <td>过期时间：</td>
                    {{data.end}}
                  </tr>
                  <tr v-if="!show"><img src="../assets/收藏.png" alt=""  @click="s" style="cursor: pointer;"></tr>
                  <tr v-if="show"><img src="../assets/收藏 (1).png" alt=""  @click="q" style="cursor: pointer;"></tr>
                </table>
              </td>
            </tr>
          </table>
        </tr>
        <tr class="bhead">
          <td>详细信息</td>
        </tr>
        <tr class="pmsg">
          <p>{{data.content}}</p>
        </tr>
        <tr class="bhead">
          <td>留言板</td>
        </tr>
        <tr class="trlc">
          <div class="lc">
            <el-input
              type="textarea"
              :rows="3"
              placeholder="请输入内容"
              v-model="textarea"
              class="inputp"
            ></el-input>
            <el-button round style="float:right" @click="publish">发表</el-button>
          </div>
        </tr>
        <tr>
          <h3 style="border-bottom:1px dashed;">留言</h3>
        </tr>
        <comment :comments="comments"></comment>
      </table>
    </div>
  </div>
</template>

<script>
import comment from "./comment.vue";
export default {
  filters: {
    ellipsis(value) {
      if (!value) return "";
      if (value.length > 40) {
        return value.slice(0, 40) + "...";
      }
      return value;
    }
  },
  data() {
    return {
      data: [],
      textarea: "",
      comments: [],
      user: "",
      mored: "none",
      show:false
    };
  },
  created() {
    if (sessionStorage.getItem("user") != null) {
      this.user = JSON.parse(sessionStorage.getItem("user")).account;
      this.getcollect()
    }
    this.getDataO();
    
  },
  components: {
    comment
  },

  computed: {},

  methods: {
    s(){
      this.axios.post(this.HOST+'/shouc',{
        user:this.user,
        title:this.data.title,
        author:this.data.author,
        pid:this.$route.path.substring(
              this.$route.path.lastIndexOf("/") + 1,
              this.$route.path.length
            ),
      }).then(res=>{
        this.getcollect()
      })
    },
    q(){
      this.axios.post(this.HOST+'/qus',{
        user:this.user,
        pid:this.$route.path.substring(
              this.$route.path.lastIndexOf("/") + 1,
              this.$route.path.length
            ),
      }).then(res=>{
        this.getcollect()
      })
    },
    getcollect(){
      this.axios.post(this.HOST+'/getcollect',{
        id: this.$route.path.substring(
              this.$route.path.lastIndexOf("/") + 1,
              this.$route.path.length
            ),
        user: this.user
      }).then(res=>{
        console.log(res.data.flag);
        this.show = res.data.flag
      })
    },
    getDataO() {
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
          this.comments = res.data[1];
          for (let i = 2; i < res.data.length; i++)
            this.comments.push(res.data[i]);
        })
        .catch(err => {
          console.log(err);
        });
    },
    publish() {
      if (this.user == "") alert("请先登录");
      else {
        if (this.textarea == "") alert("请输入内容");
        else
          this.axios.post(this.HOST +
            "/detailshow/id/" +
            this.$route.path.substring(this.$route.path.lastIndexOf("/") + 1,this.$route.path.length),{
              user:this.user,
              id:this.$route.path.substring(this.$route.path.lastIndexOf("/") + 1,this.$route.path.length),
              comment:this.textarea,
              t: 'f',
              headimg: JSON.parse(sessionStorage.getItem("user")).headimage
        }).then((response)=>{
          this.textarea = ""
          this.$message({
                type: 'success',
                message: '发表成功 '
              });
          this.getDataO()
   });
      }
    }
  }
};
</script>
<style>
.headsad {
  background-image: url("../assets/bg_so.gif");
  color: red;
  display: flex;
  justify-content: center;
  align-items: center;
}
.tbc {
  width: 100%;
  display: flex;
  justify-content: center;
}
.bhead {
  color: #1f376d;
  font-weight: bold;
  background-image: url("../assets/bg_td.gif");
}
.trh {
  background-color: rgb(231, 229, 229);
}
.inputp {
  font-size: 18px;
  resize: none;
  width: 800px;
  height: 100px;
  border-radius: 10px;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.04);
}
.trlc {
  display: flex;
  justify-content: center;
}
.lc {
  width: 800px;
  margin: 20px;
}
.timgr {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  overflow: hidden;
}
.trp {
  width: 900px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>