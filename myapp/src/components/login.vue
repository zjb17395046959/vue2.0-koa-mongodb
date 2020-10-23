<template>
    <div class="login">
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="姓名" prop="age">
            <el-input v-model.number="ruleForm.age"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pass">
            <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
            <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
        </el-form-item>
        
        <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
        </el-form>
    </div>

</template>
<script>
  export default {
    data() {
      var checkAge = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('姓名不能为空'));
        }
        setTimeout(() => {
          if (value.toString().length<3) {
            callback(new Error('最少三个数'));
          } else {
              callback();
            }
          
        }, 1000);
      };
      var validatePass = (rule, value, callback) => {
          if(value.toString().length<6) {
              callback(new Error('最少输入六位数'));
          };
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if(value.toString().length<6) {
              callback(new Error('最少输入六位数'));
          };
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        ruleForm: {
          pass: '',
          checkPass: '',
          age: ''
        },
        rules: {
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ],
          age: [
            { validator: checkAge, trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            console.log(this.ruleForm.pass)
            var token={
                name:this.ruleForm.age,
                pass:this.ruleForm.pass
            }
            localStorage.setItem('token',JSON.stringify(token));
            this.$router.push({path:'/home/menu0'});
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>
<style  scoped>
.login{
    width: 50%;
    margin: 100px auto;
    /* border:1px solid #000; */
    margin-left: 100px;
}
.el-input{
    /* width: 40% !important; */
}
</style>