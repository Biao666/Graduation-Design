<template>
  <div>
    <h1 class="pdatah4">我的发布</h1>
    <hr>
    <el-table
      :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
      style="width: 100%"
    >
      <el-table-column label="时间" prop="start"></el-table-column>
      <el-table-column label="标题" show-overflow-tooltip>
        <template slot-scope="scope">
          <a :href="'/FaX/detailshow/'+scope.row.id" target="_blank" style="color:blue">{{scope.row.title+'('+scope.row.doing+')'}}</a>
        </template>
      </el-table-column>
      <el-table-column align="right">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="handleEnd(scope.$index, scope.row)">结束</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div style="display:flex;justify-content:center;">
          <router-link :to="'/Person/'+page">
            <el-pagination layout="prev, pager, next" 
          :total="pages" @current-change="handleCurrentChange"          
          :current-page.sync="currentPage1"></el-pagination>
          </router-link>
      </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tableData: [],
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
    handleDelete(index, row) {
      this.axios.post(this.HOST+"/Person/user/"+this.user+"/page/"+this.page,{
              id:row.id,
              do: "d"
        }).then((response)=>{
       this.getDataO()
   });
    },
    handleEnd(index, row) {
      this.axios.post(this.HOST+"/Person/user/"+this.user+"/page/"+this.page,{
              id:row.id,
              do: "c"
        }).then((response)=>{
       this.getDataO()
   });
    },
    getDataO(){
      this.axios
      .get(this.HOST+"/Person/user/"+this.user+"/page/"+this.page)
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