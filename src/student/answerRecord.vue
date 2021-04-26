//
<template>
  <div>
    <div id="myExam">
      <!--    <div class="title"></div>-->
      <div class="wrapper">

        <!--      加载中-->
        <div v-show="loading"
             v-loading="loading"
             element-loading-text="数据加载中..."
             element-loading-spinner="el-icon-loading"
             style="margin-top:180px;font-size: 50px;">
        </div>

        <div v-show="!loading">
          <ul class="top">
            <li class="order" style="font-weight: bold">
              {{ paper[0].name }}
            </li>
            <li class="order" style="font-weight: bold">
              {{ paper[0].papername }}
            </li>
            <li class="order" style="font-weight: bold">
              {{ paper[0].subject }}
            </li>
<!--            <li style="margin-left: auto">-->
<!--              倒计时：<span style="color: red;font-weight: bold">{{restMinute}}分{{restSecond}}秒</span>-->
<!--            </li>-->
            <!--        <li class="order">我的考试</li>-->
<!--            <li class="search-li"><div class="icon">共<span style="color: blue;font-weight: bold">{{paper.length}}</span>题</div></li>-->
            <li class="search-li"><div class="icon">分数：<span style="color: blue;font-weight: bold">{{paper[0].score}}</span>分</div></li>
<!--            <li><el-button type="primary" @click="submit">{{submitButton}}</el-button></li>-->
          </ul>

          <ul class="paper">
            <li class="item" v-for="(item,index) in paper">
              <div v-if="item.type=='单选题'">
                <p><span>{{index+1}}、</span>{{item.question}}({{item.type}})</p>
                <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;A：{{item.chooseA}}</p>
                <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;B：{{item.chooseB}}</p>
                <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;C：{{item.chooseC}}</p>
                <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;D：{{item.chooseD}}</p>
                <p style="color: green;font-weight: bolder">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;正确答案：{{item.answer}}</p>
                <p style="font-weight: bolder">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;我的答案：{{item.myanswer}}</p>
                <p style="color: blue;font-weight: bolder">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;题目解析：{{item.analysis}}</p>
              </div>
              <div v-if="item.type=='多选题'">
                <p><span>{{ index + 1 }}、</span>{{ item.question }}({{ item.type }})</p>
                <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;A：{{ item.chooseA }}</p>
                <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;B：{{ item.chooseB }}</p>
                <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;C：{{ item.chooseC }}</p>
                <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;D：{{ item.chooseD }}</p>
                <p style="color: green;font-weight: bolder">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;正确答案：{{item.answer}}</p>
                <p style="font-weight: bolder">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;我的答案：{{item.myanswer}}</p>
                <p style="color: blue;font-weight: bolder">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;题目解析：{{item.analysis}}</p>
              </div>
              <div v-if="item.type=='判断题'">
                <p><span>{{index+1}}、</span>{{item.question}}({{item.type}})</p>
                <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;正确：{{item.answer}}</p>
                <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;错误：{{item.myanswer}}</p>
                <p style="color: green;font-weight: bolder">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;正确答案：{{item.answer}}</p>
                <p style="font-weight: bolder">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;我的答案：{{item.myanswer}}</p>
                <p style="color: blue;font-weight: bolder">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;题目解析：{{item.analysis}}</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'myExam',
  data() {
    return {
      userInfo: { "name": '', "sid": ''},
      // paper: [],
      paper: [{"analysis":"","answer":"D","chooseA":"String","chooseB":"0222","chooseC":"char","chooseD":"void","myanswer":"A","name":"renbinqgi","papername":"第九周周测","question":"Java中main()函数的返回值是什么 ","score":"12","sid":"18408010115","subject":"JAVA","type":"单选题"},{"analysis":"","answer":"C","chooseA":"char args[]","chooseB":"0222","chooseC":"String args[]","chooseD":"String args","myanswer":"B","name":"renbinqgi","papername":"第九周周测","question":"下面哪个是main()函数的合法参数? ","score":"12","sid":"18408010115","subject":"JAVA","type":"单选题"},{"analysis":"在静态方法中不能直接访问非静态的成员，compile：编译。","answer":"C","chooseA":"Output is null","chooseB":"Output is 0.","chooseC":"When compile, some error will occur.","chooseD":"When running, some error will occur.","myanswer":"B","name":"renbinqgi","papername":"第九周周测","question":"请问哪个语句是正确的？","score":"12","sid":"18408010115","subject":"JAVA","type":"单选题"},{"analysis":"方法名一定相同，参数签名（参数数量，类型，顺序）一定不同。","answer":"AD","chooseA":" public void example( int m){…}","chooseB":"public int example(){…}","chooseC":"public void example2(){…}","chooseD":" public int example ( int m, float f){…}","myanswer":"BC","name":"renbinqgi","papername":"第九周周测","question":"下面哪几个函数是public void example(){…}的重载函数","score":"12","sid":"18408010115","subject":"JAVA","type":"多选题"},{"analysis":"String类型没有length属性，这个专属于数组。","answer":"AD","chooseA":" s += “books”","chooseB":"0222","chooseC":"int len = s.length","chooseD":"String t = s.toLowerCase()","myanswer":"CB","name":"renbinqgi","papername":"第九周周测","question":"已知如下定义：String s = “story”;\r\n下面哪个表达式是合法的","score":"12","sid":"18408010115","subject":"JAVA","type":"多选题"}],
      loading: true,
      paperName: '',
      subject: '',
      sid: '',
    }
  },
  created: function () {
    console.log(this.paper.length)
    let _this = this;
    let user = JSON.parse(window.sessionStorage.getItem('userInfo'));
    _this.sid = user.sid;
    _this.paperName = JSON.parse(_this.$route.query.paperName);
    console.log(_this.paperName)
    /*
    请求获取当前学生作答试卷信息
    */
    // _this.loading = true;
    _this.$http.get('/myweb/dotestrecord', {
      params: {
        sid: _this.sid,
        papername: _this.paperName,
      }
    }).then(function (response) {
      if (response.status === 200) {
        _this.paper = response.data;
        _this.loading = false;
      } else {
        _this.$message({
          message: '数据请求异常！',
          type: 'error'
        });
      }
    }).catch(function (error) {
      console.log(error);
    });
  },
}
</script>

<style scoped>


p {
  font-weight: bolder;
}

.top {
  z-index: 5;
  width: 100%;
  top: -10px;
  position: fixed;

  /*position: fixed;*/
  /*margin: 0 auto;*/
  /*padding: 0 50px;*/
  box-shadow: 0 0 10px 4px rgba(1,149,255,0.1);
  background-color: #fff;
  /*-webkit-box-pack: justify;*/
  /*-ms-flex-pack: justify;*/
  /*justify-content: space-between;*/

}


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
  width: 98%;
  border-radius: 4px;
  padding: 20px 30px;
  border: 1px solid #eee;
  box-shadow: 0 0 4px 2px rgba(217,222,234,0.3);
  transition: all 0.6s ease;
}
.paper .item:hover {
  /*box-shadow: 0 0 4px 2px rgba(140, 193, 248, 0.45);*/
  /*transform: scale(1.03);*/
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
  margin: 10px 0;
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
  position: sticky;
  top: 0;
  z-index: 10000;
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
  top: 0;
  position: sticky;
  display: flex;
  z-index: 1000000000000000000;
  /*box-shadow: 0 0 10px 4px rgb(1,149,255,10%);*/
}
.wrapper .top li {
  margin: 20px;
}
#myExam {
  width: 80%;
  margin: 0 auto;
}
#myExam .title {
  margin: 20px;
}
#myExam .wrapper {
  background-color: #fff;
}
/*

 */


/*.right .icon {*/
/*  margin-right: 6px;*/
/*}*/
/*#student .padding-50 {*/
/*  z-index: 5;*/
/*  width: 100%;*/
/*  top: 0;*/
/*  position: sticky;*/
/*  !*position: fixed;*!*/
/*  !*margin: 0 auto;*!*/
/*  padding: 0 50px;*/
/*  box-shadow: 0 0 10px 4px rgba(1,149,255,0.1);*/
/*  background-color: #fff;*/
/*  !*-webkit-box-pack: justify;*!*/
/*  !*-ms-flex-pack: justify;*!*/
/*  !*justify-content: space-between;*!*/

/*}*/
/*.list a {*/
/*  text-decoration: none;*/
/*  color: #334046;*/
/*}*/
/*li {*/
/*  list-style: none;*/
/*  height: 60px;*/
/*  line-height: 60px;*/
/*}*/
/*#student .list{*/
/*  display: flex;*/
/*  position: sticky;*/
/*  !*z-index: 100000000000000;*!*/
/*}*/
/*#student .list li {*/
/*  padding: 0 20px;*/
/*  cursor: pointer;*/
/*}*/

/*#student .list .right {*/
/*  margin-left: auto;*/
/*  position: relative;*/
/*}*/
/*#student .list li.right :hover a {*/
/*  color: #000;*/
/*}*/

/*.list li{*/
/*  font-size: 16px;*/
/*  font-weight: bold;*/
/*  color: #000;*/
/*}*/

/*.item.router-link-active{*/
/*  color: coral;*/
/*}*/

/*.list li:hover{*/
/*  color: coral;*/
/*}*/

/*.list li:first-child{*/
/*  cursor: none;*/
/*  font-weight: normal;*/
/*  font-size: 22px;*/
/*}*/

/*.list li:first-child:hover{*/
/*  color: #000;*/
/*  cursor: none;*/
/*}*/

/*.right .msg {*/
/*  text-align: center;*/
/*  font-weight: normal;*/
/*  color: black;*/
/*  position: absolute;*/
/*  top: 60px;*/
/*  left: 0px;*/
/*  display: flex;*/
/*  flex-direction: column;*/
/*  border-radius: 2px;*/
/*  !*border-bottom: 3px solid #0195ff;*!*/
/*  background-color: #fff;*/
/*}*/
/*.right .msg p {*/
/*  height: 40px;*/
/*  line-height: 40px;*/
/*  width: 105px;*/
/*}*/
/*.right .msg p:hover {*/
/*  background-color: coral;*/
/*}*/


</style>

