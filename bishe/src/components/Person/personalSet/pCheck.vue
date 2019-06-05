<!--  -->
<template>
  <div>
    <h1 class="pdatah5">认证管理</h1>
    <div>
      <div class="checkpp">
        <h3>个人认证</h3>
        <span v-if="!rc">&nbsp;</span>
        <span v-if="rc">完成实名认证，享受更多服务</span>
        <div class="checki">
          <img :src="rc?require('../../../assets/unchecked.png'):require('../../../assets/checked.png')" alt="认证状态">
        </div>
      </div>
      <div class="checkpp">
        <h3>企业认证</h3>
        <span v-if="!qc">&nbsp;</span>
        <span v-if="qc">完成企业认证，发布更轻松  </span>
        <div class="checki">
          <img :src="qc?require('../../../assets/unchecked.png'):require('../../../assets/checked.png')" alt="认证状态">
        </div>
      </div>
    </div>
    <div class="doublec" >
      <el-collapse accordion>
        <el-collapse-item title="个人认证(身份证正面、反面)" name="1" v-if="rc">
          <div v-if="rshow">
            <el-upload
              action=""
              list-type="picture-card"
              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemove"
              :auto-upload="false"
              ref="uploadr"
              name="imgUrl"
              :http-request="handleHttpRequest"
              :limit="2">
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
          </div>
          <div class="pc" v-if="rshow">
            <el-button type="primary" @click="upcr">上传<i class="el-icon-upload el-icon--right"></i></el-button>
          </div>
          <div v-if="!rshow">已上传，等待审核</div>
        </el-collapse-item>
        <el-collapse-item title="企业认证(营业资格证、培苗场含名字正门或其它标志性建筑)" name="2" v-if="qc">
          <div v-if="qshow">
            <el-upload
              action=""
              list-type="picture-card"
              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemove"
              :auto-upload="false"
              ref="uploadq"
              name="imgUrl"
              :http-request="handleHttpRequest"
              :limit="3">
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
          </div>
          <div class="pc" v-if="qshow">
            <el-button type="primary" @click="upcq">上传<i class="el-icon-upload el-icon--right"></i></el-button>
          </div>
          <div v-if="!qshow">已上传，等待审核</div>
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: JSON.parse(sessionStorage.getItem("user")).account,
      input10: "",
      fileList: [],
      promiseArr:[],
      dialogVisible: false,
      dialogImageUrl: "",
      type: "",
      rc:JSON.parse(sessionStorage.getItem("user")).pchecked=='n',
      qc:JSON.parse(sessionStorage.getItem("user")).cchecked=='n',
      rshow: '',
      qshow: '',

    };
  },

  components: {},

  computed: {},

  methods: {
    
    handleRemove(file, fileList) {},
    handleAvatarSuccess(res, file) {
    },
    handlePictureCardPreview(file) {
    },
    // 点击发送按钮上传图片
    submit1() {
      if(this.type == 'r'){
        this.$refs.uploadr.submit()
        Promise.all(this.promiseArr).then(res => {
          this.imageUrl = res          
          this.fn();
          this.$refs.uploadr.clearFiles();
          this.rshow=false       
      });
      }        
      else if(this.type == 'q'){
        this.$refs.uploadq.submit()
        Promise.all(this.promiseArr).then(res => {
          this.imageUrl = res
          this.fn();
          this.$refs.uploadq.clearFiles();
          this.qshow=false
      });
      }
        
    },
    //将图片的存储路径发送给后端
    fn() {
      if (this.imageUrl.length == 0) {
        alert("内容不能为空！");
      } else {
        this.axios
          .post(this.HOST + "/upcheck", {
            user: this.user,
            image: this.imageUrl,
            type: this.type
          })
      }
    },
    //覆盖默认的上传行为，自定义上传行为
    handleHttpRequest(a) {
      this.promiseArr.push(
        new Promise((resolve, reject) => {
          var formdata = new FormData();
          if(this.type == 'r')
            formdata.append("file", a.file);
          else if(this.type == 'q')
            formdata.append("file", a.file);
          let config = {
            headers: {
              "Content-Type": "multipart/form-data"
            }
          };
          this.axios.post(this.HOST + "/upload", formdata, config).then(res => {
            if (res.status == 200) {
              resolve(res.data.imgUrl);
            }
          });
        })
      );
    },
    getcheckr(){
      this.axios.post(this.HOST + "/getcheckr", {
        user:this.user,
      }).then(res => {
        res.data.length==0?this.rshow=true:this.rshow=false
      });
    },
    getcheckq(){
      this.axios.post(this.HOST + "/getcheckq", {
        user:this.user,
      }).then(res => {
        res.data.length==0?this.qshow=true:this.qshow=false
      });
    },
    upcr(){
      this.type = "r"
      this.submit1()
    },
    upcq(){
      this.type = "q"
      this.submit1()
    },
    getuser(){
      this.axios.post(this.HOST+'/getuser',{
        user: this.user
      }).then(res=>{
        sessionStorage.setItem("user", JSON.stringify(res.data[0]));
      })
    },
  },
  created(){
    this.getcheckr()
    this.getcheckq()
    this.getuser()
  }
};
</script>
<style>
.pdatah5 {
  margin-top: 30px;
  font-style: normal;
  color: #e96c1f;
}
.checkpp{
  display: inline-block;
  margin-top: 30px;
}
.checki {
  margin-left: 300px;
  float: right;
}
.pc{
  margin-top: 10px;
  margin-bottom: 10px;
  margin-left: 25px;
}
.doublec{
  margin-top: 50px 
}
</style>