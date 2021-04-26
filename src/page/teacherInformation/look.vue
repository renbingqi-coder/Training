<template>
  <div class="content-box">
    <div v-show="loading"
         v-loading="loading"
         element-loading-text="数据加载中..."
         element-loading-spinner="el-icon-loading"
         style="margin-top: 110px; margin-right: auto; font-size: 50px"></div>
    <table v-show="!loading">
      <tr v-for="item in teacherInformation">
        <th>{{item.title}}</th>
        <td>{{item.value}}</td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: "teacherInformation",
  data: function () {
    return {
      teacherInformation: [
        {title: '姓名：', value: '暂无数据'} ,
        {title: '手机号：', value: '暂无数据'},
        {title: '职称：', value: '暂无数据'}
      ],
      id: '',
      loading: true,
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
  }
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
</style>
