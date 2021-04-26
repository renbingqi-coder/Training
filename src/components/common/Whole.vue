<template>
  <div class="wrapper">
    <!-- 页面头部部分 -->
    <div class="header" >
      <div class="logo" style="float:left;width:13%">实训实习考试系统</div>
      <!-- 水平一级菜单 -->

            <div style="float:left; margin-left:0px;width:66.5%">
              <el-menu :default-active="toIndex()" mode="horizontal" @select="handleSelect">
                <template v-for="item in items">
                  <el-menu-item :key="item.index" :index="item.index">
                    <template slot="title">
                      <span slot="title">{{ item.title }}</span>
                    </template>
                  </el-menu-item>
                </template>
              </el-menu>
            </div>

<!--      <div style="float:left;">-->
<!--        <el-menu :default-active="toIndex()" mode="horizontal" @select="handleSelect">-->
<!--          <template v-for="item in items">-->
<!--            <el-menu-item :key="item.index" :index="item.index">-->
<!--              <template slot="title">-->
<!--                <span slot="title">{{ item.title }}</span>-->
<!--              </template>-->
<!--            </el-menu-item>-->
<!--          </template>-->
<!--        </el-menu>-->
<!--      </div>-->

      <div class="header-right;" style="float:left;width:17.5%">
        <div class="header-user-con">
          <!-- 用户头像 -->
          <div class="user-avator"><img src="../../assets/person.png"/></div>
          <!-- 用户名下拉菜单 -->
          <el-dropdown class="user-name" trigger="click" @command="handleCommand">
                    <span class="el-dropdown-link">
                        {{ user }}
                        <i class="el-icon-caret-bottom"></i>
                    </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="updatePassword">修改密码</el-dropdown-item>
              <el-dropdown-item command="loginout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
    </div>

    <div id="mask" v-if="editlist">
      <div class="mask">
        <div class="title">
          编辑
          <span @click="editlist=false">X</span>
        </div>

        <div class="content">
          <input type="text" v-model="editDetail.tid" name="title" placeholder="手机号">
          <input type="password" v-model="editDetail.password1" name="title" placeholder="新密码">
          <input type="password" v-model="editDetail.password2" name="title" placeholder="确认密码">
          <input class="content-button" type="button" v-on:click="update" :value="updateButton">
          <input class="content-button" type="button" v-on:click="cancle" value="取消">
        </div>
      </div>
    </div>

    <!-- 页面左侧二级菜单栏，和主体内容区域部分 -->
    <el-main>
      <router-view></router-view>
    </el-main>

  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [    // 水平一级菜单栏的菜单
        // { index: 'Home', title: '首页' },
        {index: 'teacherInformation', title: '个人信息'},
        {index: 'checkExam', title: '题库'},
        {index: 'add', title: '添加题目'},
        {index: 'generate', title: '生成试卷'},
        {index: 'checkQuestion', title: '试卷管理'},
        {index: 'result', title: '考试结果查询'},
        {index: 'video', title: '视频管理'},
      ],
      user: '',
      id: '',
      editlist: false,
      editDetail: {},
      updateButton: '修改'
    }
  },

  created() {
    /*
    获取教师信息接口
     */
    let userInfo = JSON.parse(window.sessionStorage.getItem('userInfo'));
    console.log(userInfo)
    let _this = this;
    _this.id = userInfo.tid;
    console.log(_this.id);
    _this.$http.get('/myweb/teacherinformation',{
      params: {
        id: _this.id
      }
    }).then(function (response){
      if (response.status == 200){
        console.log(response.data);
        _this.user = response.data.name + ' ' + response.data.title
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


    update: function (){
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
            tid: _this.id,
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
          }
        })
      }
    },

    cancle: function (){
      this.editlist = false;
    },

   // 根据路径绑定到对应的一级菜单，防止页面刷新重新跳回第一个
    toIndex() {
      return this.$route.path.split('/')[1];
    },
    // 切换菜单栏
    handleSelect(index) {
      this.$router.push('/' + index);
    },
    // 用户名下拉菜单选择事件
    handleCommand(command) {
      if (command == 'loginout') {
        localStorage.removeItem('ms_username');
        this.$router.push('/login');
      }
      if (command == 'updatePassword'){
        let _this = this;
        _this.editlist = true;
        _this.editDetail.tid = _this.id;
        // _this.update();
      }
    }
  }
}
</script>

<style>
.wrapper {
  width: 100%;
  height: 100%;
  background: #eee;
  /*scrollbar*/
}

.header {
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 70px;
  font-size: 22px;
  background-color: #fff;
}

.header .logo {
  float: left;
  margin-left: 3%;
  margin-top: 17.5px;
  color:#5e5e5e;
  height: 29px;
  width: 200px;
  vertical-align: middle;
}
.el-menu {
  background: #fff;
  color: #fff !important;
  letter-spacing: 1.5px;
  font-size: 16px;
}

.el-menu-item.is-active {
  color: coral !important;
  background: #fff !important;
  font-weight: bold;
}

.el-menu-item:hover {
  background-color: #fff !important;
  color: coral !important;
  /*font-size: 18px !important;*/
  /*text-decoration: underline;*/
}

.el-menu--horizontal > .el-menu-item{
  border-bottom: none !important;
}

/* --------------- 用户头像区域的样式 ---------------- */
.header-right {
  float: right;
  padding-right: 10px;
}

.header-user-con {
  display: flex;
  height: 70px;
  align-items: center;
}

.user-avator {
  margin-left: 20px;
}

.user-avator img {
  display: block;
  width: 40px;
  height: 40px;
  border-radius: 50%;
}

.user-name {
  margin-left: 10px;
}

.el-dropdown-link {
  cursor: pointer;
}

.el-dropdown-menu__item {
  text-align: center;
}

/* --------------- 水平一级菜单栏的样式--------------------- */
.el-menu.el-menu--horizontal {

  margin-top: 5px;
  border-bottom: none !important;
  float: left;
  /*margin-left: px;*/
}
.el-menu-item:hover{}
.el-menu--horizontal > .el-menu-item.is-active {
  border-bottom: 2px solid #409eff;
  color: #3989fa;
  font-weight: 700;
}

.el-menu--horizontal > .el-menu-item {
  font-size: 16px;
  margin: 0 15px;
  color: #000;
  font-weight: bold;
}


input {
  border: 1px solid #008cd5;
  padding: 5px;
  border-radius: 3px;
  /* 棱角变圆 */
  margin-right: 15px;
}

.button {
  background-color: #008cd5;
  border: 0;
  padding: 4px 15px;
  color: #fff;
}

#table table {
  width: 100%;
  font-size: 15px;
  border: 1px solid #eee;
  text-align: center;
  border-collapse: collapse;
}

table th {
  /*background-color: #f5f5f5;*/
  border-right: 1px solid #eee;
  font-size: 20px;
}

/*
    #fff
    #f5f5f5
    #eee
    颜色深度依次递增
 */

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
  /*height: 200px;*/
  margin-bottom: 15px;
}

.content-button {
  background: #008cd5;
  border: 0;
  border-radius: 4px;
  padding: 10px 15px;
  color: #fff;
}

</style>
