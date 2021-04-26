<template>
  <div id="login">
<!--    <Header></Header>-->

<!--    <div class="left">-->
<!--        <img src="../../assets/login.jpg">-->
<!--    </div>-->
    <div class="tableContainer">
      <div class="tableRow">
<!--        <p>账号：<i class="bi bi-lock-fill"></i></p>-->
        <p><i style="font-size: 18px" class="glyphicon glyphicon-user"></i></p>
        <p><input style="border-radius: 10px;background-color: #eee;border:0;color: black" type="text" v-model="userInfo.id" placeholder="请输入手机号" class="login_acc"></input></p>
      </div>
      <div class="tableRow">
        <p><i style="font-size: 18px" class="glyphicon glyphicon-lock"></i></p>
        <p><input type="password" style="border-radius: 10px;background-color: #eee;border:0;color: black" v-model="userInfo.password" placeholder="请输入密码" class="login_pa"></input></p>
      </div>
<!--      <span class="register" @click="register">立即注册</span>-->

      <div class="tableRow">
        <p></p>
        <p><el-button type="primary" round class="login" v-on:click="login">{{loginText}}</el-button></p>
      </div>
      <div class="tableRow">
<!--        <p></p>-->
        <p><p><el-button type="primary" round class="login" v-on:click="registerBu1">注册</el-button></p>
      </div>
    </div>

    <div id="mask" v-if="editlist">
      <div class="mask">
        <div class="title">
          注册
          <span @click="editlist=false">X</span>
        </div>

        <div class="content">
          <input type="text" v-model="editDetail.name" name="title" placeholder="姓名">
          <input type="text" v-model="editDetail.sid" name="title" placeholder="手机号">
          <input type="password" v-model="editDetail.password1" name="title" placeholder="密码">
          <input type="password" v-model="editDetail.password2" name="title" placeholder="确认密码">
          <input class="content-button" type="button" v-on:click="registerBu2" :value="updateButton">
          <input class="content-button" type="button" v-on:click="cancle" value="取消">
        </div>
      </div>
    </div>

<!--    <Footer></Footer>-->
  </div>
</template>

<script>
export default {
  name: "login",
  data: function () {
    return {
      userInfo: {id: '', password: ''},
      loginText: '登录',
      editlist: false,
      editDetail: {"name":'',"sid":'', "password1":'', "password2": ''},
      updateButton: '注册'
    }
  },
  methods: {

    cancle:function (){
      this.editlist = false;
    },

    registerBu2: function (){
      let _this = this;
      if (!_this.editDetail.name){
        _this.$message({
          message: '请输入姓名',
          type: 'warning'
        });
      }else if (!_this.editDetail.sid){
        _this.$message({
          message: '请输入手机号',
          type: 'warning'
        });
      } else if (_this.editDetail.sid.length != 11) {
        _this.$message({
          message: '手机号格式错误！',
          type: 'error'
        });
      } else if (!_this.editDetail.password1){
        _this.$message({
          message: '请输入密码',
          type: 'warning'
        });
      } else if (!_this.editDetail.password2){
        _this.$message({
          message: '请确认密码',
          type: 'warning'
        });
      } else if (_this.editDetail.password1 !== _this.editDetail.password2){
        _this.$message({
          message: '两次密码不相同',
          type: 'warning'
        });
      } else {
        _this.updateButton = '注册中...'
        _this.$http.get('/myweb/register',{
          params: {
            name: _this.editDetail.name,
            sid: _this.editDetail.sid,
            password: _this.editDetail.password2
          }
        }).then(function (response){
          if (response.status === 200){
            if (JSON.parse(response.data.result)){
              _this.updateButton = '注册';
              _this.editlist = false;
              _this.$message({
                message: '注册成功！',
                type: 'success'
              });
            } else {
              _this.updateButton = '注册';
              _this.editlist = false;
              _this.$message({
                message: '该账号已注册！',
                type: 'error'
              });
            }
          } else {
            _this.updateButton = '注册';
            _this.editlist = false;
            _this.$message({
              message: '服务器异常！',
              type: 'error'
            });
          }
        });
      }
    },

    registerBu1: function (){
      /*
      注册接口
      */
      let _this = this;
      _this.editlist = true;
    },



    login: function () {
      /*
      登录接口
       */

      // let data = "2019-10-10 15:32";
      // console.log(this.formatDate(data));

      // this.$router.push({path: '/student/myExam'})


      let _this = this;
      if (!_this.userInfo.id){
        _this.$message({
          message: '请输入手机号',
          type: 'error'
        });
      } else if (!_this.userInfo.password){
        _this.$message({
          message: '请输入密码',
          type: 'error'
        });
      } else if (_this.userInfo.id.length !== 11){
        _this.$message({
          message: '手机号格式错误',
          type: 'error'
        });
      } else {
        // console.log(this.userInfo.id, this.userInfo.password);
        _this.loginText = "登录中..."
        this.$http.get('/myweb/login', {
          params: {
            id: this.userInfo.id,
            password: this.userInfo.password
          }
        }).then(function (response) {
          // console.log(response)
          // console.log("response.data:  " + response.data + "," + typeof response.data);
          // console.log(response.data.success + "  ," + typeof response.data.success);
          if ( response.status === 200) {
            if (response.data.success === "truet") {
              window.sessionStorage.setItem('userInfo', JSON.stringify(response.data));
              console.log(JSON.parse(window.sessionStorage.getItem('userInfo')))
              _this.$message({
                message: '登录成功',
                type: 'success'
              });
              _this.$router.push({
                path: '/teacherInformation',
              });
              // _this.loginText = "登录"
            } else if (response.data.success == "trues") {
              window.sessionStorage.setItem('userInfo', JSON.stringify(response.data));
              console.log(JSON.parse(window.sessionStorage.getItem('userInfo')))
              _this.$message({
                message: '登录成功',
                type: 'success'
              });
              _this.$router.push({
                path: '/student',
              });
              // _this.loginText = "登录"
            }else if(!JSON.parse(response.data.result)){
              _this.$message({
                message:'密码错误',
                type:'error'
              })
            } else {
              _this.$message({
                message: '当前账号未注册',
                type: 'error'
              });
            }
          } else if (response.status === 500) {
            _this.$message({
              message: '服务器异常',
              type: 'error'
            });
          } else if (response.status === 404) {
            _this.$message({
              message: '资源不存在',
              type: 'error'
            });
          }
          _this.loginText = "登录"
        }).catch(function (error) {
          console.log(error);
        });
      }
    }
  }
}
</script>

<style scoped>

table td {
  padding: 10px;
  border-bottom: 1px solid #eee;
  border-right: 1px solid #eee;
}

.delete {
  color: red;
}

.edit {
  color: #008cd5;
}


#mask {
  background: rgba(0, 0, 0, .5);
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: 4;
  top: 0;
  left: 0;
}

/*tr td span {*/
/*  cursor: pointer;*/
/*  !*  指定鼠标指引 *!*/
/*  margin: 10px;*/
/*}*/

.mask {
  width: 300px;
  height: 400px;
  background-color: rgba(255, 255, 255, 1);
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  z-index: 47;
  border-radius: 5px;
}

.title{
  padding: 10px;
  border-bottom: 1px solid #eee;
}

.title span {
  float: right;
  cursor: pointer;
}

.content {
  padding: 10px;
  overflow-y: hidden;
  overflow-x: hidden;
}

.content input {
  width: 270px;
  margin-bottom: 15px;
  height: 40px;
}

.content-button {
  background: #008cd5;
  border: 0;
  border-radius: 4px;
  padding: 10px 15px;
  color: #fff;
}


/*.register {*/
/*  font-size: 5px;*/
/*  right: 12%;*/
/*  position: fixed;*/
/*}*/

#login {
  background: url("../../assets/background.png");
  width: 100%;
  height: 100%;
  position: fixed;
  background-size: 100% 100%;
}
.left{
  float: left;
  width: 50%;
  height: 50%;
}

.left img{
  margin-bottom: 100px;
  margin-left: 300px;
  width: 50%;
  height: 50%;
}

.tableContainer {
  display: table;
  margin: 20% 10% auto auto;
  /*right: 300px;*/
  /*margin-top: 150px;*/
}
.tableRow {
  display: table-row;
}
.tableRow p {
  display: table-cell;
  padding: 10px;
}

.login_acc, .login_pa{
  padding: 10px;
  font-size: 17px;
}

.login {
  width: 230px;
  font-size: 20px;
  letter-spacing: 5px;
}

</style>
