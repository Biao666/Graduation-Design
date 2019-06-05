<template>
  <div class="dcheck">
    <el-table
    :data="tableData"
    style="width: 100%">
    <el-table-column>
      <template slot-scope="scope">
        <el-collapse v-model="activeName" accordion>
          <el-collapse-item :title="scope.row.account">
            <el-menu
              :default-active="activeIndex"
              class="el-menu-demo"
              mode="horizontal"
              @select="handleSelect"
            >
              <el-menu-item index="1" @click="scope.row.showflag=true">个人认证</el-menu-item>
              <el-menu-item index="2" @click="scope.row.showflag=false">企业认证</el-menu-item>
            </el-menu>
          <div 
            v-if="scope.row.showflag">
              <div 
                style="display:flex;"
                v-if="scope.row.rimages !== undefined && scope.row.rimages.length>0">
                <div>
                    <el-upload
                      action
                      list-type="picture-card"
                      :on-preview="handlePictureCardPreview"
                      :file-list="scope.row.rimages"
                      :class="{hide:hideUpload}"
                      :disabled="true">
                    </el-upload>
                    <el-dialog :visible.sync="dialogVisible">
                      <img width="100%" :src="dialogImageUrl" alt="">
                    </el-dialog>
                </div>
                <div style="display:flex;" v-if="scope.row.pchecked=='n'">
                  <el-button size="mini" type="success" @click="handlePassr(scope.row,scope.$index)" style="height:30px;margin-top:60px;margin-left:200px">通过</el-button>
                  <el-button size="mini" type="danger" @click="handleDeleter(scope.row,scope.$index)" style="height:30px;margin-top:60px">拒绝</el-button>
                </div>
                <div v-if="scope.row.pchecked=='y'" class="passc">
                  <img src="../../assets/通过.png" alt="">
                </div> 
            </div>
          </div>
          <div 
            v-if="!scope.row.showflag"
            >
            <div style="display:flex;"
            v-if="scope.row.qimages !== undefined && scope.row.qimages.length>0">
              <div>
                  <el-upload
                    action
                    list-type="picture-card"
                    :on-preview="handlePictureCardPreview"
                    :file-list="scope.row.qimages"
                    :class="{hide:hideUpload}"
                    :disabled="true">
                  </el-upload>
                  <el-dialog :visible.sync="dialogVisible">
                    <img width="100%" :src="dialogImageUrl" alt="">
                  </el-dialog>
              </div>
              <div style="display:flex;" v-if="scope.row.cchecked=='n'">
                <el-button size="mini" type="success" @click="handlePassq(scope.row,scope.$index)" style="height:30px;margin-top:60px;margin-left:200px">通过</el-button>
                <el-button size="mini" type="danger" @click="handleDeleteq(scope.row,scope.$index)" style="height:30px;margin-top:60px">拒绝</el-button>
              </div>
              <div v-if="scope.row.cchecked=='y'" class="passc">
                <img src="../../assets/通过.png" alt="">
              </div>      
          </div>
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
  data() {
    return {
      hideUpload: true,
      activeIndex: '1',
      activeName: '',
      tableData: [],
      dialogImageUrl: '',
      dialogVisible: false,
    };
  },

  methods: {
    handleSelect() {},
    handleDeleter(row,index) {
      this.axios.post(this.HOST+'/deletec',{
        user: this.tableData[index].account,
        type: 'r'
      }).then(res=>{
        this.tableData[index].rimages = []
      })
    },
    handlePassr(row,index) {
      this.axios.post(this.HOST+'/passc',{
        user: this.tableData[index].account,
        type: 'r'
      }).then(res=>{
        this.tableData[index].pchecked = 'y'
      })
    },
    handleDeleteq(row,index) {
      this.axios.post(this.HOST+'/deletec',{
        user: this.tableData[index].account,
        type: 'q'
      }).then(res=>{
        this.tableData[index].qimages = []
      })
    },
    handlePassq(row,index) {
      this.axios.post(this.HOST+'/passc',{
        user: this.tableData[index].account,
        type: 'q'
      }).then(res=>{
        this.tableData[index].cchecked = 'y'
      })
    },
    getDataO(){
      this.axios.post(this.HOST+'/mcheck').then(res=>{
        this.tableData = res.data
      })
    },
    handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
    },
  },
  created () {
      this.getDataO()
  },
};
</script>
<style>
.passc{
  margin-left: 266px;margin-top: 56px;
}
.dcheck {
  width: 700px;
  margin-top: 50px;
  margin-left: 500px;
}
.hide .el-upload--picture-card {
    display: none;
}
</style>