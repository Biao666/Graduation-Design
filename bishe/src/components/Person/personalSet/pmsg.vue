<template>
  <div>
    <h1 class="pdatah4">留言查看</h1>
    <hr>
    <el-table
      :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
      style="width: 100%"
    >
      <el-table-column label="标题" show-overflow-tooltip>
        <template slot-scope="scope">
          <a :href="'/FaX/detailshow/'+scope.row.pid" target="_blank" style="color:blue">{{scope.row.title}}</a>
        </template>
      </el-table-column>
      <el-table-column label="内容消息" prop="comment"></el-table-column>
      <el-table-column label="留言者" prop="commentuser"></el-table-column>
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
      user: JSON.parse(sessionStorage.getItem("user")).account,
      tableData: [],
      search: "",
      s: 0,
      e: 6,
      pages: 10,
      page: 1,
      currentPage1:1
    };
  },
  methods: {
    handleDelete(index, row) {},
    getDataO(){
      this.axios
      .get(this.HOST+"/pmsg/user/"+this.user)
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

    this.getDataO()
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