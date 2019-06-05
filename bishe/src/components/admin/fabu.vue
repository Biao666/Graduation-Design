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
      <el-form-item label="类型" prop="nan" required>
        <el-select v-model="ruleForm.nan" placeholder="类型">
          <el-option label="公告" value="notice"></el-option>
          <el-option label="资讯" value="new"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="内容" prop="contents" required>
        <el-input type="textarea" :rows="4" v-model="ruleForm.contents"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">立即发布</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ruleForm: {
        title: "",
        nan: "",
        contents: ""
      },
      rules: {
        title: [
          { required: true, message: "请输入标题",trigger: "blur" }
        ],
        nan: [
          { required: true, message: "请选择类型",trigger: "change" }
        ],
        contents: [{ required: true, message: "请填写详细内容",trigger: "blur" }]
      }
    };
  },

  components: {},

  computed: {},

  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.axios.post(this.HOST+"/admin/fabu",{
            title:this.ruleForm.title,
            nan: this.ruleForm.nan,
            contents: this.ruleForm.contents
          }).then(res =>{
            this.$message({
              type:'success',
              message:'发布成功！'
            })
            this.ruleForm.title = ""
            this.ruleForm.nan = ""
            this.ruleForm.contents = ""
          })
        } else {
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
<style>
.dform {
  margin-top: 20px;
  display: inline-block;
  display: flex;
  justify-content: center;
}
</style>