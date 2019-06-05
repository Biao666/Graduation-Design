<template>
  <div id="lo">
    <div class="Lo">
      <div class="HL">
        <em class="em">立即注册</em>
        <span class="reg"><a href="/login">已有账号？现在登陆</a></span>
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
      <el-form-item label="确认密码" prop="checkPass">
        <el-input type="password" v-model="ruleForm2.checkPass" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密保问题" prop="question">
        <el-input v-model="ruleForm2.question"></el-input>
      </el-form-item>
      <el-form-item label="密保答案" prop="answer">
        <el-input v-model="ruleForm2.answer"></el-input>
      </el-form-item>  
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
        <el-button @click="resetForm('ruleForm2')">重置</el-button>
      </el-form-item>
    </el-form>
    </div>
    </div>
  </div>

</template>
<script>
export default {
  data() {
    var checkUser = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("用戶名不能为空"));
      }
      else {
        if (this.ruleForm2.checkPass !== "") {
          this.$refs.ruleForm2.validateField("checkUser");
        }
        callback();
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
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm2.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    var checkQue = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请输入密保问题"));
      }
      else {
        if (this.ruleForm2.checkPass !== "") {
          this.$refs.ruleForm2.validateField("checkQue");
        }
        callback();
      }
    };
    var checkAns = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请输入密保答案"));
      }
      else {
        if (this.ruleForm2.checkPass !== "") {
          this.$refs.ruleForm2.validateField("checkAns");
        }
        callback();
      }
    };
    return {
      ruleForm2: {
        pass: "",
        checkPass: "",
        user: "",
        question: "",
        answer:""
      },
      rules2: {
        pass: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
        user: [{ validator: checkUser, trigger: "blur" }],
        question: [{ validator: checkQue, trigger: "blur"}],
        answer: [{ validator: checkAns, trigger: "blur"}]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.axios.post(this.HOST +
            "/register",{
              user:this.ruleForm2.user,
              pass: this.ruleForm2.pass,
              question: this.ruleForm2.question,
              answer: this.ruleForm2.answer
        }).then(res => {
      alert("注册成功！")
      window.location.reload();
      window.location.href = "/login";
        })
        } else {
          alert("未知错误!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>
<style scoped>
#lo {
  background: url("../assets/X.jpg");
  background-size: 100%;
  height: 623px;
  display: flex;
  justify-content: center;
  align-items:center;
}
a{
  color:#087423;
}
.reg{
    display: flex;
    justify-content: flex-end
}
.HL{
    
    margin-left: 43px;
}
.em{
    display: flex;
    justify-content: flex-start;
    font-size: 18px;
    color: #282828;
    font-weight: bold;
    font-style: normal
}
.Lo{
  border: 1px solid;
  border-radius: 4px;
  padding-right: 30px;
  padding-top: 30px;
  background-color: rgba(255, 255, 255, 0.7)
}
.demo-ruleForm{
    margin: 0 auto;
}
</style>
