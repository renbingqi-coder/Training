//显示学生成绩
<template>
  <div class="table">
    <div class="title"></div>

    <!--      加载中-->
    <div v-show="loading"
         v-loading="loading"
         element-loading-text="数据加载中..."
         element-loading-spinner="el-icon-loading"
         style="margin-top:110px;font-size: 50px;">
    </div>

    <table v-show="!loading">
      <tr>
        <th width="14%">序号</th>
        <th width="14%">试卷名称</th>
        <th width="14%">开始时间</th>
        <th width="14%">结束时间</th>
        <th width="14%">用时(分钟)</th>
        <th width="14%">分数</th>
        <th width="14%">操作</th>
      </tr>

      <tr v-for="(item, index) in grade">
        <td>{{index+1}}</td>
        <td>{{item.papername}}</td>
        <td>{{item.starttime}}</td>
        <td>{{item.endtime}}</td>
        <td>{{item.totalTime}}</td>
        <td>{{item.totalscore}}</td>
        <td @click="lookPaper(item.papername)" class="look_information">查看</td>
      </tr>

    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      grade: [],
      sid: '',
      loading: true,
    }
  },
  created() {
    this.getScore()
  },
  methods: {

    /*
    进入详情页
     */
    lookPaper: function (paperName){
      let _this = this;
      console.log("1" + paperName);
      _this.$router.push(
        {
          path: '/answerRecord',
          query: {
            paperName: JSON.stringify(paperName),
          }
        });
    },

    getScore() {
      let _this = this;
      _this.loading = true;
      let userInfo = JSON.parse(window.sessionStorage.getItem('userInfo'));
      _this.sid = userInfo.sid;
      console.log(userInfo)
      // if (_this.sid){
      //   _this.$message({
      //     message: '登录已过期，请重新登录',
      //     type: 'info'
      //   });
      // }
      _this.$http.get('/myweb/myscores',{
        params: {
          sid: _this.sid
        }
      }).then(function (response){
        if (response.status === 200){
          _this.grade = response.data;
          _this.loading = false;
        } else {
          _this.$message({
            message: '数据请求异常！',
            type:'error'
          });
          _this.loading = false;
        }
      }).catch(function (error){
        console.log(error);
      })
    },
    //改变当前记录条数
    handleSizeChange(val) {
      this.pagination.size = val
      this.getScore()
    },
    //改变当前页码，重新发送请求
    handleCurrentChange(val) {
      this.pagination.current = val
      this.getScore()
    },
    // formatter(row, column) {
    //   return row.address;
    // },
    // filterTag(value, row) {
    //   return row.tag === value;
    // },
    // filterHandler(value, row, column) {
    //   const property = column["property"];
    //   return row[property] === value;
    // }
  }
};
</script>

<style scoped>

/*.table {*/
/*  width: 80%;*/
/*}*/

.look_information{
  font-weight: bold;
}
.look_information:hover{
  color: coral;
  cursor: pointer;
}


table{
  width: 80%;
  margin-top: 10px;
  margin-left: auto;
  margin-right: auto;
  background: #fff;
}

table th {
  text-align: center;
  border-right: 1px solid #eee;
  font-size: 15px;
}

table td{
  text-align: center;
}

.pagination {
  padding-top: 20px;
}

</style>
