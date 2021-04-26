// 我的试卷页面
<template>
  <div id="myExam">
    <div class="title"></div>
    <div class="wrapper">
      <ul class="top" v-show="!loading">
        <li class="order">
          <el-badge :value="records.length" class="item" type="primary">
            <span class="item active">全部</span>
          </el-badge>
        </li>
<!--        <li class="order">-->
<!--          <el-badge :value="1" class="item" type="primary">-->
<!--            <span class="item">未开始</span>-->
<!--          </el-badge>-->
<!--        </li>-->
<!--        <li class="order">-->
<!--          <el-badge :value="2" class="item" type="primary">-->
<!--            <span class="item">正在进行</span>-->
<!--          </el-badge>-->
<!--        </li>-->
<!--        <li class="order">-->
<!--          <el-badge :value="1" class="item">-->
<!--            <span class="item">已过期</span>-->
<!--          </el-badge>-->
<!--        </li>-->
<!--        <li class="order">我的考试</li>-->
        <li class="search-li"><div class="icon"><input type="text" placeholder="试卷名称" class="search" v-model="key"><i class="el-icon-search"></i></div></li>
        <li><el-button type="primary" @click="search()">搜索</el-button></li>
      </ul>

<!--      加载中-->
      <div v-show="loading"
           v-loading="loading"
           element-loading-text="数据加载中..."
           element-loading-spinner="el-icon-loading"
           style="margin-top:110px;font-size: 50px;">
      </div>

      <ul class="paper" v-show="!loading">
        <li class="item" v-for="(item,index) in currentPageData" :key="index">
          <h4 @click="toExamMsg(item.papername)">{{item.papername}}</h4>
          <div class="info">
            <i class="glyphicon glyphicon-lock"></i><span>{{item.starttime}}</span>
            <i class="glyphicon glyphicon-adjust"></i><span v-if="item.totaltime != null">限时{{item.totaltime}}分钟</span>
            <i class="glyphicon glyphicon-education"></i><span>满分{{item.totalscore}}分</span>
          </div>
        </li>
      </ul>

      <div class="pagination" v-show="!loading">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[9, 12, 24]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next"
          :total="records.length">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  // name: 'myExam'
  data() {
    return {
      loading: true,
      key: null, //搜索关键字
      allExam: null, //所有考试信息
      currentPageData: [],//当前页内容
      totalPage: 1,//总页数，默认1，
      currentPage: 1,// 当前页
      pageSize: 9, // 每页显示数量
      records: [],
      searchRecords:[],
      sid: '',
    }
  },
  created() {
    let _this = this;
    let userInfo = JSON.parse(window.sessionStorage.getItem('userInfo'));
    _this.sid = userInfo.sid;
    this.getExamInfo();
    // this.setCurrentPageData();
  },

  methods: {


    // 获取当前页数据
    setCurrentPageData: function (){
      this.loading = true;
      let begin = (this.currentPage - 1) * this.pageSize;
      let end = this.currentPage*this.pageSize;
      this.currentPageData = this.records.slice(begin,end);
      this.loading = false;
    },

    //获取当前所有考试信息
    getExamInfo() {

      let _this = this;
      _this.$http.get('/myweb/exam',{
        params:{
          sid: _this.sid,
        }
      })
        .then(function (response){
        if (response.status === 200){
          _this.records = response.data;
          _this.setCurrentPageData();
        } else {
          _this.$message({
            message: '请求数据异常！',
            type: 'error'
          });
        }
      }).catch(function (error){
        console.log(error);
      })

    },
    //改变当前页记录条数
    handleSizeChange(val) {
      this.pageSize = val;
      this.setCurrentPageData();
    },
    //改变当前页码，重新获取当前页数据
    handleCurrentChange(val) {
      this.currentPage = val
      this.setCurrentPageData();
    },
    //搜索试卷
    search() {
      /*
      搜索
       */

    },
    //跳转到试卷详情页
    toExamMsg(examCode) {
      this.$router.push({path: '/exam', query: {examName: examCode}})
      console.log(examCode)
    }
  }
}
</script>

<style scoped>

.item{

}
.item.span-active{
  color: coral;
}

/*.pagination {*/
/*  padding: 20px 0px 30px 0px;*/
/*  .el-pagination {*/
/*    display: flex;*/
/*    justify-content: center;*/
/*  }*/
/*}*/
/*.paper {*/
/*  h4 {*/
/*    cursor: pointer;*/
/*  }*/
/*}*/
.paper .item a {
  color: #000;
}
.wrapper .top .order {
  cursor: pointer;
}
.wrapper .top .order:hover {
  color: coral;
  border-bottom: 0px solid coral;
}
.wrapper .top .order:visited {
  color: #0195ff;
  border-bottom: 2px solid #0195ff;
}
.item .info i {
  margin-right: 5px;
  color: #0195ff;
}
.item .info span {
  /*margin-right: 10px;*/
  /*text-align: left;*/
}
.paper .item {
  width: 383px;
  border-radius: 4px;
  padding: 20px 30px;
  border: 1px solid #eee;
  box-shadow: 0 0 4px 2px rgba(217,222,234,0.3);
  transition: all 0.6s ease;
}
.paper .item:hover {
  box-shadow: 0 0 4px 2px rgba(140, 193, 248, 0.45);
  transform: scale(1.03);
}
.paper .item .info {
  font-size: 14px;
  color: #88949b;
}

.paper .item .name {
  font-size: 14px;
  color: #88949b;
}
.paper * {
  margin: 20px 0;
  /*background-color: #fff;*/
}
.wrapper .paper {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  list-style-type: none;
}
.top .el-icon-search {
  position: absolute;
  right: 10px;
  top: 10px;
}
.top .icon {
  position: relative;
}
.wrapper .top {
  border-bottom: 1px solid #eee;
  margin-bottom: 20px;
}
#myExam .search-li {
  margin-left: auto;
}
.top .search-li {
  margin-left: auto;
}
.top li {
  display: flex;
  align-items: center;
}
.top .search {
  margin-left: auto;
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #eee;
  box-shadow: inset 0 1px 1px rgba(0,0,0,.075);
  transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s;
}
.top .search:hover {
  color: #0195ff;
  border-color: #0195ff;
}
.wrapper .top {
  display: flex;
}
.wrapper .top li {
  margin: 20px;
}
#myExam {
  width: 80%;
  margin: 0 auto;
  /*background-color: #fff;*/
  bottom: 0;
}
#myExam .title {
  margin: 5px;
}
#myExam .wrapper {
  background-color: #fff;

}
</style>
