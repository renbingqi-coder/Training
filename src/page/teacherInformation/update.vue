<template>
  <div class="content-box">
    <table>
      <tr v-for="item in teacherInformation">
        <th>{{item.title}}</th>
        <td><el-input type="text" v-model="item.value"></el-input></td>
      </tr>
    </table>
    <el-button type="primary" round @click="update">{{updateButton}}</el-button>
  </div>
</template>

<script>
export default {
  name: "update",
  data: function (){
    return {
      teacherInformation: [
        {"title":"姓名", "value":''},
        {"title":"手机号", "value":''},
        {"title":"职称", "value":''}
      ],
      updateButton: '更新'
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
    _this.loading = true;
    _this.$http.get('/myweb/teacherinformation',{
      params: {
        id: _this.id
      }
    }).then(function (response){
      if (response.status == 200){
        console.log(response.data);
        _this.teacherInformation[0].value = response.data.name;
        _this.teacherInformation[1].value = _this.id;
        _this.teacherInformation[2].value = response.data.title;
        _this.loading = false;
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

    operation: function (){
      let _this = this;
      if (_this.teacherInformation[1].value !== _this.id) {
        this.$confirm('账号信息已变更，请重新登录!', '提示', {
          confirmButtonText: '确定',
          type: 'warning'
        }).then(() => {
          _this.$router.push({ path: '/login'});
        }).catch(() => {
        });
      }
    },

    update: function (){
      console.log(this.teacherInformation)
      let _this = this;
      if (!_this.teacherInformation[0].value){
        _this.$message({
          message: '请输入姓名',
          type: 'warning'
        });
      } else if (!_this.teacherInformation[1].value){
        _this.$message({
          message: '请输入手机号',
          type: 'warning'
        });
      } else if (!_this.teacherInformation[2].value){
        _this.$message({
          message: '请输入职称',
          type: 'warning'
        });
      } else {
        _this.updateButton = '更新中...';
        _this.$http.get('/myweb/updateinformation',{
          params: {
            tid: _this.id,
            name: _this.teacherInformation[0].value,
            phone: _this.teacherInformation[1].value,
            title: _this.teacherInformation[2].value
          }
        }).then(function (response){
          if (JSON.parse(response.data.result)){
            _this.updateButton = '更新';
            _this.$message({
              message: '更新成功',
              type: 'success'
            })
            _this.operation();
          } else {
            _this.updateButton = '更新';
            _this.$message({
              message: '更新失败',
              type: 'error'
            });
          }
        }).catch(function (error){
          console.log(error);
        })
      }
    }
  },
}
</script>

<style scoped>
table {
  margin-top: 20px;
  margin-left: 10%;
}

table tr th{
  font-size: 16px;
  text-align: right;
  margin-right: 30px;
}

table tr td{
  padding: 15px;
  padding-left: 130px;
  margin-left: 100px;
  width: 500px;
}
.el-button{
  letter-spacing: 1.5px;
  font-size: 16px;
  margin-left: 300px;
  width: 200px;
}
</style>
