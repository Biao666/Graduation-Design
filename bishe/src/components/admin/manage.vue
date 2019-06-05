<template>
  <div class="dcheck">
    <el-table
    :data="tableData"
    style="width: 100%">
    <el-table-column>
      <template slot-scope="scope">
        <el-collapse v-model="activeName" accordion>
          <el-collapse-item :title="scope.row.account" :name="scope.row.account">
            <el-menu
              :default-active="activeIndex"
              class="el-menu-demo"
              mode="horizontal"
              @select="handleSelect"
            >
              <el-menu-item index="1" @click="scope.row.showflag=false">发布</el-menu-item>
              <el-menu-item index="2" @click="scope.row.showflag=true">评论</el-menu-item>
            </el-menu>
            <el-table
            :data="scope.row.publish.slice(s,e)"
            v-if="!scope.row.showflag">
            <el-table-column label="时间">
              <template slot-scope="scope">
                {{scope.row.time | formatDate}}
              </template>
            </el-table-column>
          <el-table-column label="标题" show-overflow-tooltip>
            <template slot-scope="scope">
              <a
                :href="'/FaX/detailshow/'+scope.row.id"
                target="_blank"
                style="color:blue"
              >{{scope.row.title}}</a>
            </template>
          </el-table-column>
          <el-table-column align="right">
            <template slot-scope="scope">
              <el-button size="mini" type="danger" @click="handleDeletet(scope.row)">删除</el-button>
            </template>
          </el-table-column>
          </el-table>
          <div style="display:flex;justify-content:center;" v-if="!scope.row.showflag">
          <el-pagination
            layout="prev, pager, next"
            :total="scope.row.publish.length>6?scope.row.publish.length/6*10:10"
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage1"
          ></el-pagination>
        </div>
          <el-table
          :data="scope.row.comment.slice(s,e)"
          v-if="scope.row.showflag"
        >
          <el-table-column label="时间">
            <template slot-scope="scope">
                {{scope.row.time | formatDate}}
              </template>
          </el-table-column>
          <el-table-column label="评论">
            <template slot-scope="scope">
                {{scope.row.comment}}
              </template>
          </el-table-column>
          <el-table-column align="right">
            <template slot-scope="scope">
              <el-button size="mini" type="danger" @click="handleDeletec(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div style="display:flex;justify-content:center;" v-if="scope.row.showflag">
          <el-pagination
            layout="prev, pager, next"
            :total="scope.row.comment.length>6?scope.row.comment.length/6*10:10"
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage1"
          ></el-pagination>
        </div>
          </el-collapse-item>
        </el-collapse>
      </template>
    </el-table-column>
  </el-table>
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
      activeIndex: '1',
      activeName: '',
      tableData: [],
      search: "",
      s: 0,
      e: 6,
      pages: 10,
      page: 1,
      currentPage1: 1
    };
  },

  methods: {
    handleSelect() {},
    handleDeletet(row) {
      this.axios.post(this.HOST +
            "/admin/manage/",{
              type:"t",
              row:row
        }).then(res =>{
          for(let i in this.tableData)
            if(this.tableData[i].account == row.author){
              for(let j in this.tableData[i].publish)
                if(this.tableData[i].publish[j].pid == row.pid)
                  {this.tableData[i].publish.splice(j,1)
                    break;}
            break;
            }
        })
    },
    handleDeletec(row) {
      this.axios.post(this.HOST +
            "/admin/manage/",{
              type:"c",
              row:row
        }).then(res =>{
          for(let i in this.tableData)
            if(this.tableData[i].account == row.commentuser){
              for(let j in this.tableData[i].comment)
                if(this.tableData[i].comment[j].time == row.time && this.tableData[i].comment[j].pid == row.pid)
                  {this.tableData[i].comment.splice(j,1)
                    break;}
            break;
            }
        })
    },
    handleCurrentChange(val) {  
      this.page = val;
      this.s = val * 6 - 6;
      this.e = val * 6;
    },
    getDataO() {
      this.axios.post(this.HOST +
            "/admin/manage/",{
              type:"g"
        }).then(res =>{
          this.tableData = res.data
        })
    },
  },
  created () {
      this.getDataO()
  },
  watch:{
    activeName(val){
      this.page = 1;
      this.activeIndex = '1'
      this.s = 0
      this.e = 6
      this.currentPage1 = 1
    }
  }
};
</script>
<style>
.dcheck {
  width: 700px;
  margin-top: 50px;
  margin-left: 500px;
}
</style>