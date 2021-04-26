<template>
  <div class="content-box">
<!--    <div class="questionName">-->
<!--      <p>试卷名：{{paperName}}</p>-->
<!--      <p>科目：{{allQuestion[0].subject}}</p>-->
<!--    </div>-->
    <div v-show="loading"
         v-loading="loading"
         element-loading-text="数据加载中..."
         element-loading-spinner="el-icon-loading"
         style="margin-top: 100px; font-size: 50px"></div>
    <div v-show="!loading">
      <p style="text-align: center; font-size: 16px; margin-top: 15px;margin-bottom: 15px;font-weight: bold">卷名：{{paperName}}</p>
      <!--      <p>{{subject1}}</p>-->
    </div>
    <table v-show="!loading">
      <!--      <p>{{subject1}}</p>-->
      <tr class="title_manages">
        <th width="5%">序号</th>
        <th width="10%">类型</th>
        <th width="20%">问题</th>
        <th width="10%">A</th>
        <th width="10%">B</th>
        <th width="10%">C</th>
        <th width="10%">D</th>
        <th width="5%">答案</th>
        <th width="20%">解析</th>
      </tr>
      <div v-show="loading"
           v-loading="loading"
           element-loading-text="拼命加载中..."
           element-loading-spinner="el-icon-loading"
           style="margin-top: 100px"></div>
      <tr v-show="!loading" v-for="(item, index) in currentPageData">
        <td width="5%">{{index+1}}</td>
        <td width="10%">{{item.type}}</td>
        <td width="20%">{{item.question}}</td>
        <td width="10%">{{item.chooseA}}</td>
        <td width="10%">{{item.chooseB}}</td>
        <td width="10%">{{item.chooseC}}</td>
        <td width="10%">{{item.chooseD}}</td>
        <td width="5%">{{item.answer}}</td>
        <td width="20%">{{item.analysis}}</td>
        <!--          <td width="20%">-->
        <!--            <span @click="paperUpdate(item.papername)" class="accept">修改</span>-->
        <!--            <span @click="paperDelete(item.papername)" class="refuse">删除</span>-->
        <!--          </td>-->
      </tr>
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
  name: "paper",
  data: function (){
    return {
      paperName: '',
      allQuestion:[],
      loading: true,
      currentPageData: [],//当前页内容
      totalPage: 1,//总页数，默认1，
      currentPage: 1,
      pageSize: 5, // 每页显示数量
    }
  },
  /*
  activated解决路由不刷新问题
   */
  created() {
    let _this = this;
    _this.loading = true;
    // console.log(123)
    console.log(_this.$route.query.paperName +","+ typeof _this.paperName)
    _this.paperName = _this.$route.query.paperName;
    _this.paperName = JSON.parse(_this.paperName);
    // console.log(_this.subject)
    _this.$http.get('/myweb/selectpapertest',{
      params: {
        papername: _this.paperName
      }
    }).then(function (response){
      if (response.status == 200){
        _this.allQuestion = response.data;
        _this.loading = false;

        _this.totalPage = Math.ceil(_this.allQuestion.length/_this.pageSize);
        _this.totalPage = _this.totalPage === 0?1:_this.totalPage;
        _this.setCurrentPageData();
        console.log(_this.allQuestion);
        console.log(_this.currentPage);

      } else if (response.status == 500){
        _this.$message({
          message: '服务器异常',
          type: 'error'
        });
      }
    });
  },
  watch:{
    '$route.query.paperName': function (){
      // let i=0;
      // i = i+1;
      // console.log("监测"+i)
      let _this = this;
      _this.loading = true;
      _this.paperName = _this.$route.query.paperName;
      _this.paperName = JSON.parse(_this.paperName);
      console.log("subject:  "+ _this.subject);
      _this.$http.get('/myweb/selectpapertest',{
        params: {
          papername: _this.paperName
        }
      }).then(function (response){
        if (response.status == 200){
          _this.allQuestion = response.data;
          _this.loading = false;
        } else if (response.status == 500){
          _this.$message({
            message: '服务器异常',
            type: 'error'
          });
        }
      });
    }
  },
  activated() {
    /*
    获取当前题库的所有题目
     */
    let _this = this;
    _this.loading = true;
    // console.log(123)
    console.log(_this.$route.query.paperName +","+ typeof _this.paperName)
    _this.paperName = _this.$route.query.paperName;
    _this.paperName = JSON.parse(_this.paperName);
    // console.log(_this.subject)
    _this.$http.get('/myweb/selectpapertest',{
      params: {
        papername: _this.paperName
      }
    }).then(function (response){
      if (response.status == 200){
        _this.allQuestion = response.data;
        _this.loading = false;
      } else if (response.status == 500){
        _this.$message({
          message: '服务器异常',
          type: 'error'
        });
      }
    });
  },

  methods: {
    setCurrentPageData: function (){
      let begin = (this.currentPage - 1) * this.pageSize;
      let end = this.currentPage*this.pageSize;
      this.currentPageData = this.allQuestion.slice(begin,end);
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
.questionName {
  width: 90%;
  margin-left: auto;
  margin-right: auto;
}
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
  width: 98%;
  font-size: 16px;
  border: 2px solid #eee;
  text-align: center;
  border-collapse: collapse;
  margin-left: auto;
  margin-right: auto;
}
table th {
  background-color: #f5f5f5;
  border: 2px solid #eee;
  font-size: 16px;
}
table td{
  background-color: #f5f5f5;
  border: 2.5px solid #eee;
  font-size: 14px;
}
</style>
