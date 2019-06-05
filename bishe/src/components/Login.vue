<template>
  <div id="re">
    <div class="Lo">
      <div class="HL">
        <em class="em">欢迎登陆</em>
        <span class="reg">
          <a href="/register">还没账号？现在注册</a>
        </span>
      </div>
      <div>
        <el-form
          :model="ruleForm2"
          status-icon
          :rules="rules2"
          ref="ruleForm2"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="用戶名" prop="user">
            <el-input v-model="ruleForm2.user"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="pass">
            <el-input type="password" v-model="ruleForm2.pass" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm2')">登陆</el-button>
            <el-button @click="resetForm('ruleForm2')">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  inject: ["reload"],
  data() {
    var checkAge = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("用戶名不能为空"));
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm2.checkPass !== "") {
          this.$refs.ruleForm2.validateField("checkPass");
        }
        callback();
      }
    };

    return {
      username: "",
      ruleForm2: {
        pass: "",
        user: ""
      },
      rules2: {
        pass: [{ validator: validatePass, trigger: "blur" }]
      }
    };
  },
  methods: {
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.axios
            .get(
              this.HOST +
                "/login/user/" +
                this.ruleForm2.user +
                "/pass/" +
                this.ruleForm2.pass
            )
            .then(res => {
              if (res.data.length!=0) {
                sessionStorage.setItem("user", JSON.stringify(res.data[0]));
                if(JSON.parse(sessionStorage.getItem("user")).adname==="admin")
                  this.username = JSON.parse(sessionStorage.getItem("user")).adname
                else if(JSON.parse(sessionStorage.getItem("user")).account!="")
                  this.username = JSON.parse(sessionStorage.getItem("user")).account;
                this.dreload()
              } else alert("账号或密码错误！");
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    dreload() {
      if (this.username === "admin") {
        alert("欢迎您，管理员！");
        window.location.reload();
        window.location.href = "/admin";
      } else if (JSON.parse(sessionStorage.getItem("user")) != null) {
        alert("登陆成功！");
        window.location.reload();
        window.location.href = "/FaX/1";
      }
    }
  }
};
</script>
<style scoped>
#re {
  background: url("../assets/X.jpg");
  background-size: 100%;
  height: 623px;
  display: flex;
  justify-content: center;
  align-items: center;
}
a {
  color: #cd161c;
}
.reg {
  display: flex;
  justify-content: flex-end;
}
.HL {
  margin-left: 43px;
}
.em {
  display: flex;
  justify-content: flex-start;
  font-size: 18px;
  color: #282828;
  font-weight: bold;
  font-style: normal;
}
.Lo {
  border: 1px solid;
  border-radius: 4px;
  padding-right: 30px;
  padding-top: 30px;
  background-color: rgba(255, 255, 255, 0.7);
}
.demo-ruleForm {
  margin: 0 auto;
}
</style>
