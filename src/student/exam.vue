// 我的试卷页面
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
            {{ userInfo.name }}
          </li>
          <li class="order" style="font-weight: bold">
            {{ paperName }}
          </li>
          <li class="order" style="font-weight: bold">
            {{ subject }}
          </li>
          <li style="margin-left: auto">
            倒计时：<span style="color: red;font-weight: bold">{{restMinute}}分{{restSecond}}秒</span>
          </li>
          <!--        <li class="order">我的考试</li>-->
          <li class="search-li"><div class="icon">共<span style="color: blue;font-weight: bold">{{paper.length}}</span>题</div></li>
          <li class="search-li"><div class="icon">总分：<span style="color: blue;font-weight: bold">{{totalscore}}</span>分</div></li>
          <li><el-button type="primary" @click="submit">{{submitButton}}</el-button></li>
        </ul>

        <ul class="paper">
          <li class="item" v-for="(item,index) in paper">
            <div v-if="item.type=='单选题'">
              <p><span>{{index+1}}、</span>{{item.question}}({{item.type}})</p>
              <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<el-radio v-model="singleChoice[index]" label="A">A：{{item.chooseA}}</el-radio></p>
              <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<el-radio v-model="singleChoice[index]" label="B">B：{{item.chooseB}}</el-radio></p>
              <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<el-radio v-model="singleChoice[index]" label="C">C：{{item.chooseC}}</el-radio></p>
              <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<el-radio v-model="singleChoice[index]" label="D">D：{{item.chooseD}}</el-radio></p>
            </div>
            <div v-if="item.type=='多选题'">
              <p><span>{{index+1}}、</span>{{item.question}}({{item.type}})</p>
              <el-checkbox-group v-model="multipleChoice[index-singleNumber]">
                <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<el-checkbox label="A">A：{{ item.chooseA }}</el-checkbox>
                </p>
                <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<el-checkbox label="B">B：{{ item.chooseB }}</el-checkbox>
                </p>
                <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<el-checkbox label="C">C：{{ item.chooseC }}</el-checkbox>
                </p>
                <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<el-checkbox label="D">D：{{ item.chooseD }}</el-checkbox>
                </p>
              </el-checkbox-group>
            </div>
            <div v-if="item.type=='判断题'">
              <p><span>{{index+1}}、</span>{{item.question}}({{item.type}})</p>
              <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<el-radio v-model="judgeChoice[index-singleNumber-multipleNumber]" label="√">正确</el-radio></p>
              <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<el-radio v-model="judgeChoice[index]" label="×">错误</el-radio></p>
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
      timer:null, //定时器
      // usedTime: 0,
      restMinute: 0,
      restSecond: 0,
      totalTime: 0,
      values: [],
      paper: [],
      // paper: [{"analysis":"","answer":"D","chooseA":"String","chooseB":"int","chooseC":"char","chooseD":"void","papername":"第九周周测","question":"Java中main()函数的返回值是什么 ","subject":"JAVA","type":"单选题"},{"analysis":"","answer":"C","chooseA":"char args[]","chooseB":"char args[][]","chooseC":"String args[]","chooseD":"String args","papername":"第九周周测","question":"下面哪个是main()函数的合法参数? ","subject":"JAVA","type":"单选题"},{"analysis":"在静态方法中不能直接访问非静态的成员，compile：编译。","answer":"C","chooseA":"Output is null","chooseB":"Output is 0.","chooseC":"When compile, some error will occur.","chooseD":"When running, some error will occur.","papername":"第九周周测","question":"请问哪个语句是正确的？","subject":"JAVA","type":"单选题"},{"analysis":"无","answer":"B","chooseA":"boolean = 1","chooseB":"boolean a = (9 >= 10)","chooseC":"boolean a=\"真\"","chooseD":"boolean a = = false","papername":"第九周周测","question":"为一个boolean类型变量赋值时，可以使用(  )方式","subject":"JAVA","type":"单选题"},{"analysis":"无","answer":"A","chooseA":"由高向低分别是：()、!、算术运算符、关系运算符、逻辑运算符、赋值运算符","chooseB":"由高向低分别是：()、关系运算符、算术运算符、赋值运算符、!、逻辑运算符","chooseC":"由高向低分别是：()、算术运算符、逻辑运算符、关系运算符、!、赋值运算符","chooseD":"由高向低分别是：()、!、关系运算符、赋值运算符、算术运算符、逻辑运算符","papername":"第九周周测","question":"运算符优先级别排序正确的是（ ）","subject":"JAVA","type":"单选题"},{"analysis":"","answer":"C","chooseA":"指令操作码的译码结果","chooseB":"指令和数据的寻址方式","chooseC":" 指令周期的不同阶段","chooseD":"指令和数据所在的存储单元","papername":"第九周周测","question":"单选题\r\n单选题\r\n冯·诺依曼计算机中指令和数据均以二进制形式存放在存储器中，CPU区分它们的依据是（）","subject":"计算机组成原理","type":"单选题"},{"analysis":"","answer":"B","chooseA":" 仅I和II","chooseB":" 仅I和III","chooseC":"仅II和III ","chooseD":"  仅III和IV","papername":"第九周周测","question":"假定变量i，f，d数据类型分别为int, float, double(int用补码表示，float和double用IEEE754单精度和双精度浮点数据格式表示)，已知i=785，f=1.5678e3 ，d=1.5e100，若在32位机器中执行下列关系表达式，则结果为真的是() (I) i==(int)(float)i (II)f==(float)(int)f \r\n(III)f==(float)(double)f (IV)(d+f)-d==f","subject":"计算机组成原理","type":"单选题"},{"analysis":"方法名一定相同，参数签名（参数数量，类型，顺序）一定不同。","answer":"A,D","chooseA":" public void example( int m){…}","chooseB":"public int example(){…}","chooseC":"public void example2(){…}","chooseD":" public int example ( int m, float f){…}","papername":"第九周周测","question":"下面哪几个函数是public void example(){…}的重载函数","subject":"JAVA","type":"多选题"},{"analysis":"String类型没有length属性，这个专属于数组。","answer":"A,D","chooseA":" s += “books”","chooseB":"char c = s[1]","chooseC":"int len = s.length","chooseD":"String t = s.toLowerCase()","papername":"第九周周测","question":"已知如下定义：String s = “story”;\r\n下面哪个表达式是合法的","subject":"JAVA","type":"多选题"},{"analysis":"标识符以￥$_或者字母开头，不能用关键字","answer":"A,D","chooseA":" fieldname","chooseB":"super","chooseC":"3number","chooseD":"$numbe","papername":"第九周周测","question":"如下哪些字串是Java中的标识符","subject":"JAVA","type":"多选题"},{"analysis":"从上到下依次十进制，八进制，十六进制。","answer":"A,B,C","chooseA":"22","chooseB":"0x22","chooseC":"022","chooseD":"22H","papername":"第九周周测","question":"如下哪些是Java中正确的整数表示","subject":"JAVA","type":"多选题"},{"analysis":"数组是用length属性，String字符串长度是用length()方法。","answer":"×","chooseA":"","chooseB":"","chooseC":"","chooseD":"","papername":"第九周周测","question":"数组获取长度使用length（）方法","subject":"JAVA","type":"判断题"},{"analysis":"List和Set是继承自Collection接口的接口，Set不允许重复的项目，List允许重复项目，Set接口派生的类有TreeSet，HashSet，LinkedHashSet。List接口派生的类有ArrayList，Vector等。Map是独立的接口，不继承Collection接口","answer":"×","chooseA":"","chooseB":"","chooseC":"","chooseD":"","papername":"第九周周测","question":".List，Set，Map是继承自Collection接口","subject":"JAVA","type":"判断题"},{"analysis":"Unicode编码占2个字节，是固有状态","answer":"×","chooseA":"","chooseB":"","chooseC":"","chooseD":"","papername":"第九周周测","question":"java字符类型采用的是Unicode编码，但所占字节由具体软硬件环境决定","subject":"JAVA","type":"判断题"},{"analysis":"","answer":"√","chooseA":"","chooseB":"","chooseC":"","chooseD":"","papername":"第九周周测","question":".java语言中的数组元素下标总是从0开始，下标可以是整数或整形表达式","subject":"JAVA","type":"判断题"}],
      singleChoice: [],
      multipleChoice: [[]],
      judgeChoice: [],
      singleNumber: 0,
      multipleNumber: 0,
      labels: [],
      loading: true,
      paperName: '',
      subject: '',
      totalscore: null,
      paperLength: 0,
      result: 0, //成绩
      submitButton: '交卷',
    }
  },
  created() {
    console.log(this.paper.length)
    let _this = this;
    /*
    请求获取当前试卷信息
    */
    _this.loading = true;
    _this.paperName = _this.$route.query.examName;
    _this.$http.get('/myweb/examinformation',{
      params: {
        papername: _this.paperName,
      }
    }).then(function (response){
      if (response.status === 200){
        _this.paper = response.data;
        _this.getTotalTime();
        _this.loading = false;
      } else {
        _this.$message({
          message: '数据请求异常！',
          type: 'error'
        });
      }
    }).catch(function (error){
      console.log(error);
    });
    let multiNumber = 0;
    let singleNumber = 0;
    console.log(this.paper.length)
    for (let i=0; i<_this.paper.length; i++){
      if (_this.paper[i].type === '单选题'){
        singleNumber += 1;
      }
      if (_this.paper[i].type === '多选题'){
        multiNumber += 1;
      }
    }
    _this.singleNumber = singleNumber;
    _this.multipleNumber = multiNumber;
    for (let i=0; i<multiNumber; i++){
      _this.multipleChoice[i] = [];
      for (let j=0; j<4; j++){
        _this.multipleChoice[i][j] = null;
      }
    }

    let userInfo = JSON.parse(window.sessionStorage.getItem('userInfo'));
    _this.userInfo.sid = userInfo.sid;
    /*
    请求获取学生姓名信息
    */
    _this.$http.get('/myweb/studentinformation',{
      params: {
        sid: _this.userInfo.sid,
      }
    }).then(function (response){
      if (response.status === 200){
        _this.userInfo.name = response.data.name;
      } else {
        _this.$message({
          message: '数据请求异常！',
          type: 'error'
        });
      }
    }).catch(function (error){
      console.log(error);
    })
    _this.timeCount(); //开启定时器

  },

  methods: {

    getTotalTime: function (){
      /*
      获取总时间
      */
      let _this = this;
      _this.totalTime = _this.paper[0].totalTime;
      _this.totalscore = _this.paper[0].totalscore;
      _this.subject = _this.paper[0].subject;
      _this.restMinute = _this.totalTime;
    },

    // 定时器展示剩余时间
    timeCount: function (){
      let _this = this;
      _this.timer = setInterval(()=>{
        if (_this.restMinute === 0 && _this.restSecond === 1){
          _this.submit();
          _this.$message({
            message: '考试结束，系统已自动交卷'
          });
          clearInterval(_this.timer);
          _this.timer = null;
          // console.log("自动交卷");
        }
        if (_this.restMinute === 10 && _this.restSecond === 0) {
          _this.$confirm('考生注意，距离考试结束还有10分钟', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: "info"
          }).then(()=>{

          }).catch(()=>{

          });
        }
        if (_this.restSecond === 0){
          _this.restMinute -= 1;
          _this.restSecond = 59;
        }
        _this.restSecond -= 1;
      }, 1000);
    },

    /*
    提交作答信息
     */
    upload:function (){
      let _this = this;
      console.log(_this.singleChoice);
      console.log(_this.multipleChoice);
      console.log(_this.judgeChoice);
      let an = '';
      for (let i=0; i<_this.singleChoice.length; i++){
        an += _this.singleChoice[i];
      }
      an+=';';
      for (let i=0; i<_this.multipleChoice.length; i++){
        an += _this.multipleChoice[i];
        an += '、';
      }
      an += ';';
      for (let i=0; i<_this.judgeChoice.length; i++){
        an += _this.judgeChoice[i];
      }
      // console.log(an);
      _this.submitButton = '自动阅卷中...';
      _this.$http.get('/myweb/submit',{
        params: {
          sid: _this.userInfo.sid,
          paperName: _this.paperName,
          answer: an,
          usedtime: _this.totalTime - _this.restMinute,
        }
      }).then(function (response){
        if (response.status === 200){
          _this.submitButton = '交卷';
          clearInterval(_this.timer);
          _this.timer = null;
          _this.$message({
            message: '试卷成功提交',
            type: 'success'
          });
          _this.result = JSON.parse(response.data.result);
          _this.showScore();
        } else {
          _this.submitButton = '交卷';
          _this.$message({
            message: '数据异常！请重新提交',
            type: 'error',
          });
        }
      }).catch(function (error){
        _this.submitButton = '交卷';
        console.log(error);
      })
    },

    /*
    展示分数
     */
    showScore:function (){
      let _this = this;
      let result = 0;
      // _this.$http.get('/myweb/')

      this.$confirm('成绩：'+_this.result + '分', '分数', {
        showClose: false,
        confirmButtonText: '进入我的成绩',
        cancelButtonText: '进入我的考试',
        type: 'success'
      }).then(() => {
        _this.$router.push({path: '/student/grade'});
      }).catch(() => {
        _this.$router.push({path: '/student'});
      });
    },

    submit: function (){
      /*
      提交试卷接口
       */
      let _this = this;
      if (_this.restMinute !==0 && _this.restSecond !== 0){
        this.$confirm('考试时间还未到，确认提交试卷?', '提示', {
          confirmButtonText: '立即提交',
          cancelButtonText: '再检查检查',
          type: 'warning'
        }).then(() => {
          _this.upload();
        }).catch(() => {
        });
      } else {
        _this.upload();
      }

    },
  }
}
</script>

<style scoped>

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

