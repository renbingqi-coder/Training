<template>
  <div class="content-box">
    <div v-show="loading"
         v-loading="loading"
         element-loading-text="数据加载中..."
         element-loading-spinner="el-icon-loading"
         style="margin-top: 110px; font-size: 50px"></div>
    <table v-show="!loading">
      <tr class="title_manages">
        <th>序号</th>
        <th>姓名</th>
        <th>试卷名称</th>
        <th>分数</th>
        <th>用时</th>
      </tr>
      <template v-for="(item, index) in currentPageData">
        <tr class="trData">
          <td width="10%">{{index+1}}</td>
          <td width="20%">{{item.name}}</td>
          <td width="20%">{{item.papername}}</td>
          <td width="20%">{{item.score}}</td>
          <td width="20%">{{item.mount}}</td>
        </tr>
      </template>
    </table>
    <div v-show="!loading" class="page">
      <button @click="prePage">上一页</button>
      <span>第{{currentPage}}页/共{{totalPage}}页</span>
      <button @click="nextPage">下一页</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "result",
  data: function (){
    return {
      tid: '',
      result: [
        // {"name":123, "papername": 89,"score": 100,"mount": 10}
      ],
      loading: true,
      currentPageData: [],//当前页内容
      totalPage: 1,//总页数，默认1，
      currentPage: 1,
      pageSize: 10, // 每页显示数量
    }
  },
  created(){
    // this.loading = false;
    // let userInfo = JSON.parse(window.sessionStorage.getItem('userInfo'));
    // console.log(userInfo)
    // let _this = this;
    // _this.tid = userInfo.tid;
    let userInfo = JSON.parse(window.sessionStorage.getItem('userInfo'));
    console.log(userInfo)
    let _this = this;
    _this.tid = userInfo.tid;
    _this.$http.get('/myweb/selectscore',{
      params: {
        tid: _this.tid
      }
    }).then(function (response){
      if (response.status == 200){
        _this.result = response.data;
        console.log(response.data);
        _this.loading = false;

        _this.totalPage = Math.ceil(_this.result.length/_this.pageSize);
        _this.totalPage = _this.totalPage === 0?1:_this.totalPage;
        _this.setCurrentPageData();
        console.log(_this.result);
        console.log(_this.currentPage);

      } else if(response.status == 500){
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

    setCurrentPageData: function (){
      let begin = (this.currentPage - 1) * this.pageSize;
      let end = this.currentPage*this.pageSize;
      this.currentPageData = this.result.slice(begin,end);
    },

    prePage:function (){
      console.log(this.currentPage);
      if (this.currentPage === 1) return;

      this.currentPage--;
      this.setCurrentPageData();

    },

    nextPage: function (){
      // 下一页
      if (this.currentPage === this.totalPage)return ;

      this.currentPage++;
      this.setCurrentPageData();
    },

  },
}
</script>

<style scoped>
.title_manages th{
  padding: 10px;
}
.trData{
  margin-left: auto;
  margin-right: auto;
}
.trData td{
  padding: 15px;
}
table {
  width: 80%;
  font-size: 12px;
  border: 2px solid #eee;
  text-align: center;
  border-collapse: collapse;
  margin-left: auto;
  margin-right: auto;
}
table th {
  background-color: #eee;
  border: 2px solid #eee2de;
  font-size: 14px;
  /*color: coral;*/
  /*font-weight: bold;*/
}
table td{
  background-color: #f5f5f5;
  border: 2.5px solid #eee;
  font-size: 14px;
}

.page{
  margin-left: auto;
  margin-right: auto;
  margin-top: 30px;
}
.page button{
  /*font-size: ;*/
}
.page button:hover{
  color: coral;
}

</style>

