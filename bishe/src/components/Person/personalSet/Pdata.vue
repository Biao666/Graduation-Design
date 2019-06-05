<template>
  <div>
    <h1 class="pdatah5">头像</h1>
    <hr>
    <div class="headp">
      <div>
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
        <el-button
          slot="trigger"
          size="small"
          type="primary"
          @click="submit1"
          style="margin-top:10px;margin-left:45px"
        >保存头像</el-button>
      </div>
      <div>
        <img :src="zshi" class="headpre">
      </div>
    </div>
    <div class="psetd">
      <Strong class="psetdh5">个人资料</Strong>
      <hr>
      <ul>
        <li>
          <span>昵</span>
          <span style="color:#fff">昵</span>
          <span>称：</span>
          <input type="text" name :value="nickName" id disabled>
          <el-button type="info" icon="el-icon-edit" size="mini" @click="change('nick')"></el-button>
        </li>
        <li>
          <span>手</span>
          <span style="color:#fff">手</span>
          <span>机：</span>
          <input type="text" name :value="phone" id disabled>
          <el-button type="info" icon="el-icon-edit" size="mini" @click="change('phone')"></el-button>
        </li>
        <li>
          <span>邮</span>
          <span style="color:#fff">邮</span>
          <span>箱：</span>
          <input type="text" name :value="eMail" id disabled>
          <el-button type="info" icon="el-icon-edit" size="mini" @click="change('email')"></el-button>
        </li>
        <li>
          <span>所 在 地：</span>
          <input type="text" name :value="location" id disabled>
          <el-button type="info" icon="el-icon-edit" size="mini" @click="change('location')"></el-button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      imageUrl: "",
      userName: "",
      nickName: "",
      phone: "",
      eMail: "",
      location: "",
      value: "",
      dialogVisible: false,
      dialogImageUrl: "",
      promiseArr: [],
      zshi:""
    };
  },
  methods: {
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
        this.zshi = res[0] //将头像设置成上传的图片
        this.imageUrl = res
        this.fn();
      });
    },
    //将图片的存储路径发送给后端
    fn() {
      if (this.imageUrl.length == 0) {
        alert("内容不能为空！");
      } else {
        this.axios
          .post(this.HOST + "/uphead", {
            image: this.imageUrl,
            user: this.userName
          })
          .then(res => {//修改当前sessionStorage的头像地址           
            let u = []
            u.push(JSON.parse(sessionStorage.getItem("user")))
            u[0].headimage = this.imageUrl
            sessionStorage.setItem("user", JSON.stringify(u[0]));
            this.imageUrl = ""
          });
      }
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
    change(type) {
      this.$prompt("请输入内容", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputPattern: /\S/,
        inputErrorMessage: "内容不能为空！"
      })
        .then(({ value }) => {
          this.axios.post(this.HOST + "/PersonalSet/user/" + this.userName, {
            user: this.userName,
            nick: type == "nick" ? value : "",
            phone: type == "phone" ? value : "",
            email: type == "email" ? value : "",
            location: type == "location" ? value : ""
          });
          this.value = value;
        })
        .then(res => {
          this.$message({
            type: "success",
            message: "修改成功 "
          });
          let u = []
          u.push(JSON.parse(sessionStorage.getItem("user")))
          if (type == "nick") {
            this.nickName = this.value;           
            u[0].nick = this.nickName
            }
          else if (type == "phone") {
            this.phone = this.value;
            u[0].phone = this.phone
          }
          else if (type == "email") {
            this.eMail = this.value;
            u[0].email = this.eMail
            }
          else if (type == "location") {
            this.location = this.value;
            u[0].location = this.location
            }
          sessionStorage.setItem("user", JSON.stringify(u[0]));
        });
    }
  },
  created() {
    if (sessionStorage.getItem("user") != null) {
      this.userName = JSON.parse(sessionStorage.getItem("user")).account;
      this.nickName = JSON.parse(sessionStorage.getItem("user")).nick;
      this.phone = JSON.parse(sessionStorage.getItem("user")).phone;
      this.eMail = JSON.parse(sessionStorage.getItem("user")).email;
      this.location = JSON.parse(sessionStorage.getItem("user")).location;
      this.zshi = JSON.parse(sessionStorage.getItem("user")).headimage;
    }
  }
};
</script>
<style>
.headp {
  display: flex;
  justify-content: space-between;
  width: 400px;
}
.pdatah5 {
  margin-top: 30px;
  font-style: normal;
  color: #e96c1f;
}
.psetd {
  margin-top: 40px;
}
.psetdh5 {
  font-size: 16px;
  color: #595957;
}
li {
  height: 36px;
  line-height: 36px;
}
li input {
  border: 0;
  background-color: #fff;
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
.headpre {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  overflow: hidden;
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