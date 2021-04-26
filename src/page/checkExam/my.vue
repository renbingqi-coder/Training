<template>
  <div class="content-box">
    <!--    题库-->
    <div>
      <div v-show="loading"
           v-loading="loading"
           element-loading-text="数据加载中..."
           element-loading-spinner="el-icon-loading"
           style="margin-top: 100px; margin-right: auto; font-size: 50px"></div>
      <table v-show="!loading">
        <tr v-for="item in currentPageData" :key="item">
          <th>题库名</th>
          <td @click="navTocheckExam(item)">{{item}}</td>
        </tr>
      </table>
      <div v-show="!loading" class="page">
        <button @click="prePage">上一页</button>
        <span>第{{currentPage}}页/共{{totalPage}}页</span>
        <button @click="nextPage">下一页</button>
      </div>

    </div>

  </div>
  <!--  </div>-->
</template>

<script>
export default {
  name: "checkExam",
  data: function (){
    return {
      subject: '',
      /*
      所有题库
      */
      questionBank: [
        "java","python","web","l","2","3","sdf","esdf"
      ],
      loading: true,
      tid: '',
      currentPageData: [],//当前页内容
      totalPage: 1,//总页数，默认1，
      currentPage: 1,
      pageSize: 10, // 每页显示数量
    }
  },
  created() {
    /*
    获取我的题库
    */

    let that = this;
    let userInfo = JSON.parse(window.sessionStorage.getItem('userInfo'));
    console.log(userInfo)
    that.tid = userInfo.tid;
    that.$http.get('/myweb/mytest',{
      params:{
        tid: that.tid
      }
    })
      .then(function (response){
        // console.log(response.data);
        that.questionBank = response.data.test;
        that.loading = false;

        that.totalPage = Math.ceil(that.questionBank.length/that.pageSize);
        that.totalPage = that.totalPage === 0?1:that.totalPage;
        that.setCurrentPageData();
        console.log(that.questionBank);
        console.log(that.currentPage);

      }).catch(function (error){
      console.log(error);
    });
  },
  // mounted() {
  //   /*
  //   计算一共有多少页
  //    */
  //   let _this = this;
  //   _this.totalPage = Math.ceil(_this.questionBank.length/_this.pageSize);
  //   _this.totalPage = this.totalPage === 0?1:_this.totalPage;
  //   _this.setCurrentPageData();
  // },
  methods: {
    setCurrentPageData: function (){
      let begin = (this.currentPage - 1) * this.pageSize;
      let end = this.currentPage*this.pageSize;
      this.currentPageData = this.questionBank.slice(begin,end);
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

    update: function (){
      let that = this;
      that.$http.get('/myweb/mytest',{
        params:{
          tid: that.tid
        }
      })
        .then(function (response){
          // console.log(response.data);
          that.questionBank = response.data.test;
        }).catch(function (error){
        console.log(error);
      });
    },
    navTocheckExam:function (item){
      // console.log("xinjian")
      console.log(item)
      let _this = this;
      _this.$router.push({
        path: '/checkExam/myquestions',
        query: {
          subject: JSON.stringify(item)
        },
      })
    }
  },
}
</script>

<style scoped>
table {
  margin-top: 5px;
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
  cursor: pointer;
  font-size: 16px;
}
table tr td:hover{
  color: coral;
}
.page{
  margin-left: 10%;
  margin-top: 30px;
}
.page button{
  /*font-size: ;*/
}
.page button:hover{
  color: coral;
}
</style>
