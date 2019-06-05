<template>
  <div>
    <h1 class="pdatah4">我的收藏</h1>
    <hr>
    <el-table
      :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
      style="width: 100%"
    >
      <el-table-column label="标题" prop="title" show-overflow-tooltip>
        <template slot-scope="scope">
          <a :href="'/FaX/detailshow/'+scope.row.pid" target="_blank" style="color:blue">{{scope.row.title}}</a>
        </template>
      </el-table-column>
      <el-table-column label="作者" prop="author"></el-table-column>
      <el-table-column label="时间" prop="time" :formatter="formatDate"></el-table-column>
      <el-table-column align="right">
        <template slot-scope="scope">
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div style="display:flex;justify-content:center;">
          <router-link :to="'/pfavorites/'+user">
            <el-pagination layout="prev, pager, next" 
          :total="pages" 
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage1"></el-pagination>
          </router-link>
      </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tableData: [     
      ],
      search: "",
      user:"",
      s: 0,
      e: 6,
      pages: 10,
      page: 1,
      currentPage1:1
    };
  },
  methods: {
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
    handleDelete(index, row) {
      this.axios.post(this.HOST+"/pfavorites/user/"+this.user+"/page/"+this.page,{
              row:row
        }).then((response)=>{
       this.getDataO()
   });
    },
    getDataO(){
      this.axios
      .get(this.HOST+"/pfavorites/user/"+this.user+"/page/"+this.page)
      .then(res => {
          this.tableData = res.data.slice(this.s,this.e);
          this.pages = Math.ceil(res.data.length/6)*10;
      })
      .catch(err => {
        console.log(err);
      });
    },
    handleCurrentChange(val){
       this.page = val
       this.s = val * 6 - 6
       this.e = val * 6
      this.getDataO()
    }
  },
  created() {
    if(sessionStorage.getItem('user')!=""){    
      this.user = JSON.parse(sessionStorage.getItem("user")).account
      this.getDataO()
    }
  },
};
</script>
<style>
    .pdatah4{
  margin-top: 30px;
  font-style: normal;
  color: #e96c1f;
  width: 700px;
}
</style>