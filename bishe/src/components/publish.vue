<!--  -->
<template>
  <div class="dform">
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
      style="width:700px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  padding:24px 24px 24px 24px;"
    >
      <el-form-item label="标题" prop="title" required>
        <el-input v-model="ruleForm.title"></el-input>
      </el-form-item>
      <el-form-item label="类型" prop="sad" required>
        <el-select v-model="ruleForm.sad" placeholder="供求类型">
          <el-option label="供方" value="供方"></el-option>
          <el-option label="求方" value="求方"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="联系人" prop="contact" required>
        <el-input v-model="ruleForm.contact"></el-input>
      </el-form-item>
      <el-form-item label="所在地" prop="location" required>
        <el-input v-model="ruleForm.location"></el-input>
      </el-form-item>
      <el-form-item label="电话" prop="phone" required>
        <el-input v-model="ruleForm.phone"></el-input>
      </el-form-item>
      <el-form-item label="价格" prop="price" required>
        <el-input v-model="ruleForm.price"></el-input>
      </el-form-item>
      <el-form-item label="电子邮件" prop="email">
        <el-input v-model="ruleForm.email"></el-input>
      </el-form-item>
      <el-form-item label="网址" prop="website">
        <el-input v-model="ruleForm.website"></el-input>
      </el-form-item>
      <el-form-item label="结束时间" required>
        <el-col :span="11">
          <el-form-item prop="time1">
            <el-date-picker
              type="date"
              placeholder="选择日期"
              v-model="ruleForm.time1"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              style="width: 100%;"
            ></el-date-picker>
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item label="苗种" prop="categories" required>
        <el-radio-group v-model="ruleForm.categories" v-for="(item,index) in MCato" :key="index">
          <el-radio :label="item"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="图片" prop="pic">
        <el-upload
          class="avatar-uploader"
          action=""
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :on-change="c"
          :http-request="handleHttpRequest"
          ref="upload"
          name="imgUrl"
          :auto-upload="false"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="详细介绍" prop="contents" required>
        <el-input type="textarea" :rows="3" v-model="ruleForm.contents"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">发布</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      imageUrl: "",
      promiseArr:[],
      MCato: [
        "南美白对虾",
        "斑节对虾草虾",
        "罗氏沼虾",
        "河虾青虾",
        "东方对虾中国对虾",
        "竹节虾日本对虾",
        "波士顿龙虾",
        "生蚝"
      ],
      ruleForm: {
        title:"",
        sad:"",
        contact:"",
        location:"",
        phone:"",
        price:"",
        email:"",
        website:"",
        time1:"",
        categories:"",
        contents:"",
        user:JSON.parse(sessionStorage.getItem("user")).account,
      },
      rules: {
        title: [
          { required: true, message: "请输入标题", trigger: "blur" },
          { min: 3, message: "至少输入三个字", trigger: "blur" }
        ],
        sad: [{ required: true, message: "请选择类型", trigger: "change" }],
        contact:[{ required: true, message: "请输入联系人", trigger: "blur" }],
        location:[{ required: true, message: "请输入地址", trigger: "blur" }],
        phone:[{ required: true, message: "请输入联系电话", trigger: "blur" }],
        price:[{ required: true, message: "请输入价格", trigger: "blur" }],
        time1: [
          {
            type: "string",
            required: true,
            message: "请选择日期",
            trigger: "change"
          }
        ],
        categories: [
          { required: true, message: "请选择苗种", trigger: "change" }
        ],
        contents: [
          { required: true, message: "请填写详细介绍", trigger: "blur" }
        ]
      }
    };
  },

  components: {},

  computed: {},

  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.submit1()
        } else {         
          alert("请填写完整！")
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    handleRemove(file, fileList) {},
    handleAvatarSuccess(res, file) {
      // this.imageUrl = URL.createObjectURL(file.raw);
    },
    handlePictureCardPreview(file) {
      // this.dialogImageUrl = file.url;
      // this.dialogVisible = true;
    },
    // 点击发送按钮上传图片
    submit1() {
      this.$refs.upload.submit()
      Promise.all(this.promiseArr).then(res => {
        this.imageUrl = res
        this.fn();
        this.resetForm('ruleForm')
        this.$refs.upload.clearFiles()
        this.imageUrl = ''
      });
    },
    //将内容发送给后端
    fn() {
        this.axios
          .post(this.HOST + "/publish", {
            user: this.ruleForm.user,
            title: this.ruleForm.title,
            sad: this.ruleForm.sad,
            contact: this.ruleForm.contact,
            location: this.ruleForm.location,
            phone: this.ruleForm.phone,
            price: this.ruleForm.price,
            email: this.ruleForm.email,
            website: this.ruleForm.website,
            end: this.ruleForm.time1,
            categories: this.ruleForm.categories,
            content: this.ruleForm.contents,
            img: this.imageUrl
          })
    },
    //覆盖默认的上传行为，自定义上传行为
    handleHttpRequest(a) {
      this.promiseArr.push(
        new Promise((resolve, reject) => {
          var formdata = new FormData();
          formdata.append("file", this.$refs.upload.uploadFiles[0].raw);
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
    c(f){//上传头像组件的图片显示
      this.imageUrl = URL.createObjectURL(f.raw);
    },
  }
};
</script>
<style>
.dform {
  margin-top: 20px;
  display: inline-block;
  display: flex;
  justify-content: center;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>