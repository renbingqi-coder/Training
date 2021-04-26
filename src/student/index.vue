<!--学生考试首页-->
<template>
  <div id="student">
    <el-row class="padding-50">
      <el-col :span="24">
        <ul class="list">
          <li class="logo"><i class="icon-bar"></i><span>实训实习考试系统</span></li>
          <li><router-link tag="div" to="/student/myExam" class="item active">我的考试</router-link></li>
          <li><router-link tag="div" to="/student/grade" class="item">我的成绩</router-link></li>
<!--          <li><router-link tag="div" to="/student/mistakes" class="item">错题本</router-link></li>-->
          <li class="right" @mouseenter="flag = !flag" @mouseleave="flag = !flag">
            <a href="javascript:;"><i class="glyphicon glyphicon-user"></i>{{userInfo.name}}</a>
            <div class="msg" v-if="flag">
              <p @click="manages()">修改密码</p>
              <p class="exit" @click="exit()">退出</p>
            </div>
          </li>
        </ul>
      </el-col>
    </el-row>

    <div id="mask" v-if="editlist">
      <div class="mask">
        <div class="title">
          修改
          <span @click="editClose">X</span>
        </div>

        <div class="content">
          <input type="text" v-model="editDetail.sid" name="title" placeholder="手机号">
          <input type="password" v-model="editDetail.password1" name="title" placeholder="密码">
          <input type="password" v-model="editDetail.password2" name="title" placeholder="确认密码">
          <input class="content-button" type="button" v-on:click="updatePassword" :value="updateButton">
          <input class="content-button" type="button" v-on:click="cancle" value="取消">
        </div>
      </div>
    </div>

    <!--路由区域-->
    <div class="main">
      <router-view></router-view>
    </div>
<!--    <v-footer></v-footer>-->
  </div>
</template>

<script>
// import myFooter from "@/components/student/myFooter"
// import store from '@/vuex/store'
// import {mapState} from 'vuex'
export default {

  data() {
    return {
      userInfo:{"name": ''},
      flag: false,
      sid: '',
      editlist: false,
      editDetail: {"sid":'', "password1":'', "password2": ''},
      updateButton: '修改'
    }
  },
  created() {

    let userInfo = JSON.parse(window.sessionStorage.getItem('userInfo'));
    console.log(userInfo)
    let _this = this;
    _this.sid = userInfo.sid;
    console.log(_this.sid);
    // _this.loading = true;
    _this.$http.get('/myweb/studentinformation',{
      params: {
        sid: _this.sid
      }
    }).then(function (response){
      if (response.status === 200){
        console.log(response.data);
        _this.userInfo.name = response.data.name;
        // _this.loading = false;
      } else {
        _this.$message({
          message: '服务器异常',
          type: 'error'
        });
      }
    }).catch(function (error){
      console.log(error);
    });
  },
  methods: {

    editClose: function (){
      let _this = this;
      _this.editlist = false;
    },

    cancle:function (){
      /*
      取消
      */
      let _this = this;
      _this.editlist = false;
    },

    updatePassword: function (){
      let _this = this;
      if (!_this.editDetail.password1){
        _this.$message({
          message: '请输入新密码',
          type: 'warning'
        });
      } else if (!_this.editDetail.password2){
        _this.$message({
          message: '请确认密码',
          type: 'warning'
        });
      } else if (_this.editDetail.password1 !== _this.editDetail.password2){
        _this.$message({
          message: '两次密码不相同！',
          type: 'error'
        });
      } else {
        _this.updateButton = '修改中...'
        _this.$http.get('/myweb/updatepassword',{
          params: {
            sid: _this.sid,
            password: _this.editDetail.password2
          }
        }).then(function (response){
          _this.updateButton = '修改';
          _this.editlist = false;
          if (response.status == 200){
            if (JSON.parse(response.data.result)){
              _this.$message({
                message: '密码修改成功',
                type: 'success'
              });
            } else  if (!_this.user){
              _this.$message({
                message: '密码修改失败！',
                type: 'error'
              });
            }
          } else {
            _this.updateButton = '修改';
            _this.editlist = false;
            _this.$message({
              message: '数据请求异常！',
              type: 'error'
            });
          }
        })
      }
    },


    manages: function (){
      /*
      修改密码
       */
      let _this = this;
      _this.editlist = true;
    },

    exit:function (){
      /*
      退出系统
       */
      let _this = this;
      _this.$router.push({path:'/login'});
    },
  },

}
</script>

<style scoped>

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
  height: 350px;
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

/*

 */

.right .icon {
  margin-right: 6px;
}
#student .padding-50 {
  z-index: 5;
  width: 100%;
  top: 0;
  position: sticky;
  /*position: fixed;*/
  /*margin: 0 auto;*/
  padding: 0 50px;
  box-shadow: 0 0 10px 4px rgba(1,149,255,0.1);
  background-color: #fff;
  /*-webkit-box-pack: justify;*/
  /*-ms-flex-pack: justify;*/
  /*justify-content: space-between;*/

}
.list a {
  text-decoration: none;
  color: #334046;
}
li {
  list-style: none;
  height: 60px;
  line-height: 60px;
}
#student .list{
  display: flex;
  position: sticky;
  /*z-index: 100000000000000;*/
}
#student .list li {
  padding: 0 20px;
  cursor: pointer;
}

#student .list .right {
  margin-left: auto;
  position: relative;
}
#student .list li.right :hover a {
  color: #000;
}

.list li{
  font-size: 16px;
  font-weight: bold;
  color: #000;
}

.item.router-link-active{
  color: coral;
}

.list li:hover{
  color: coral;
}

.list li:first-child{
  cursor: none;
  font-weight: normal;
  font-size: 22px;
}

.list li:first-child:hover{
  color: #000;
  cursor: none;
}

.right .msg {
  text-align: center;
  font-weight: normal;
  color: black;
  position: absolute;
  top: 60px;
  left: 0px;
  display: flex;
  flex-direction: column;
  border-radius: 2px;
  /*border-bottom: 3px solid #0195ff;*/
  background-color: #fff;
}
.right .msg p {
  height: 40px;
  line-height: 40px;
  width: 105px;
}
.right .msg p:hover {
  background-color: coral;
}


</style>
