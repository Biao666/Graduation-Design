<!--  -->
<template>
  <div class="mmarc">
    <el-table :data="notice" style="width: 800px;" :row-style="{color:'red'}">
      <el-table-column prop="title" label="公告" width="600px">
          <template slot-scope="scope">
              <el-button type="text" style="color:red;height:0px" @click="shown(scope.row.title,scope.row.contents)">{{scope.row.title}}</el-button>
          </template>
      </el-table-column>
      <el-table-column prop="time" label width="200px" :formatter="formatDate"></el-table-column>
    </el-table>
    <el-table :data="news" style="width: 800px">
      <el-table-column prop="title" label="新闻资讯" width="600px">
          <template slot-scope="scope">
              <el-button type="text" style="height:0px" @click="shown(scope.row.title,scope.row.contents)">{{scope.row.title}}</el-button>
          </template>
      </el-table-column>
      <el-table-column prop="time" label style="color:#409EFF" width="200px" :formatter="formatDate"></el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
    
  data() {
    return {
      notice: [],
      news: []
    };
  },
  created() {
    this.getn()
  },
  components: {},
  computed: {},

  methods: {
    getn() {
      this.axios
        .get(this.HOST + "/news")
        .then(res => {
          this.notice = res.data[1];
          this.news = res.data[2];
        })
        .catch(err => {
          console.log(err);
        });
    },
    formatDate(value) {
      let date = new Date(value.time);
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
    },
    shown(title,content){
      this.$alert('<strong>'+content+'</strong>', title, {
          dangerouslyUseHTMLString: true,
          showConfirmButton:false
        }).then(() => {
    // 点击确认
}, () => {
    // 点击取消 ----- 加入这部分就可以了
});
    }
  }
};
</script>
<style>
.mmarc {
  width: 800px;
  padding: 10px;
  margin-top: 30px;
  margin-left: 300px;
}
</style>