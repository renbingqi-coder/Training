<template>
  <div class="content-box">
    <table>
    <tr>
      <th>科目</th>
      <td>
        <el-select v-model="subject">
          <el-option v-for="item in questionBank" :key="item" :value="item">
            {{item}}
          </el-option>
        </el-select>
      </td>
    </tr>
    <tr>
      <th>题目类型</th>
      <td>
        <el-select v-model="type">
          <el-option v-for="item in typeOptions" :value="item" :key="item">{{item}}</el-option>
        </el-select>
      </td>
    </tr>
    <tr>
      <th>题目数量</th>
      <td>
        <el-input-number v-model="number"></el-input-number>
      </td>
    </tr>
<!--    <tr>-->
<!--      <p><el-button type="primary" @click="add">{{ addButton }}</el-button></p>-->
<!--    </tr>-->
    <tr>
      <th>试卷名称</th>
      <td>
        <el-input type="text" v-model="papername"></el-input>
      </td>
      <tr>
        <th>开始时间</th>
        <td>
          <el-input type="date" v-model="starttimedate"></el-input>
          <el-input type="time" v-model="starttimeclock"></el-input>
        </td>
      </tr>
      <tr>
        <th>结束时间</th>
        <td>
          <el-input type="date" v-model="starttimedate" disabled></el-input>
          <el-input type="time" v-model="endtimeclock"></el-input>
        </td>
      </tr>
<!--    </tr>-->
    </table>
<!--      <tr>-->
<!--        <th>-->
<!--          132-->
<!--        </th>-->
<!--        <td>-->
<!--        <el-date-picker-->
<!--          size="mini"-->
<!--          v-model="startenddate"-->
<!--          type="daterange"-->
<!--          range-separator="至"-->
<!--          start-placeholder="开始日期"-->
<!--          end-placeholder="结束日期"-->
<!--          value-format="yyyy-MM-dd"-->
<!--          :picker-options="pickerOptions0"-->
<!--          :editable="false"-->
<!--          :clearable="true"-->
<!--        >-->
<!--        </el-date-picker>-->
<!--        </td>-->
<!--      </tr>-->
<!--    </table>-->
        <el-button type="primary" @click="add" style="width: 114px">{{ addButton }}</el-button>
        <el-button type="primary" style="" @click="generate">{{ generateButton }}</el-button>

  </div>
</template>

<script>
export default {
  name: "randomAdd",
  data: function (){
    return {
      typeOptions: ["单选题","多选题","判断题"],
      /*
      科目：subject
      题目类型：type
      题目数量：number
      试题名称: name
      开始时间：starttime
      结束时间：endtime
      出题人：tid
      */
      subject: '',
      type: '',
      number: '',
      papername: '',
      questionBank: [],
      starttime: '',
      endtime: '',
      tid: '',
      starttimedate: '',
      starttimeclock: '',
      endtimedate: '',
      endtimeclock: '',
      addButton: '添加',
      generateButton: '生成试卷',
      count: ''
    }
  },
  created() {
    /*
    获取题库类型
     */
    let that = this;
    that.$http.get('/myweb/test')
      .then(function (response){
        if (response.status == 200){
          that.questionBank = response.data.test;
        } else if (response.status == 404){
          that.$message({
            message: '服务器资源不存在',
            type: 'error'
          });
        } else {
          that.$message({
            message: '服务器异常',
            type: 'error'
          });
        }
      }).catch(function (error) {
      console.log(error);
    });
  },
  methods: {
    add: function (){
      let _this = this;
      if (!_this.subject){
        _this.$message({
          message: '请选择科目',
          type:'error'
        });
      } else if (!_this.type){
        _this.$message({
          message: '请选择题目类型',
          type: 'error'
        });
      } else if (_this.number == 0){
        _this.$message({
          message: '请输入题目数量',
          type: 'error'
        });
      } else {
        // console.log(_this.subject+","+_this.type+","+_this.number);
        _this.addButton = '添加中...'
        _this.$http.get('/myweb/paperchoose',{
          params: {
            subject: _this.subject,
            type: _this.type,
            number: _this.number
          }
        }).then(function (response){
          if (response.status == 200){
            if (JSON.parse(response.data.result)) {
              if (JSON.parse(response.data.account) >= _this.number){
                _this.addButton = '添加'
                _this.$message({
                  message: "已成功添加"+_this.number+"道"+_this.subject+_this.type,
                  type: 'success'
                });
              } else {
                _this.addButton = '添加';
                _this.$message({
                  message: '题库数量不足!',
                  type: 'error'
                });
              }
            } else {
              if (JSON.parse(response.data.account) >= _this.number){
                _this.addButton = '添加题目';
                _this.$message({
                  message: "题目添加失败"
                });
              } else {
                _this.addButton = '添加';
                _this.$message({
                  message: '题库数量不足!',
                  type: 'error'
                });
              }
              // _this.addButton = '添加题目';
              // _this.$message({
              //   message: "题目添加失败"
              // });
            }
          } else {
            _this.$message({
              message: '服务器异常，请稍后再试',
              type: 'error'
            });
          }
        }).catch(function (error){
          console.log(error);
        });
      }
    },
    generate: function () {
      // this.generateButton = '试卷生成中...'
      /*
    生成试题
    url： '/createpaper'
    params{
    starttime,
    endtime,
    papername,
    tid
    }
    */
      let _this = this;
      let userInfo = JSON.parse(window.sessionStorage.getItem('userInfo'));
      console.log(_this.papername)
      _this.tid = userInfo.tid;
      if (!_this.papername) {
        _this.$message({
          message: '请输入试卷名称',
          type: 'error'
        });
      } else if (!_this.starttimedate || !_this.starttimeclock) {
        _this.$message({
          message: '请选择开始时间',
          type: 'error'
        });
      } else if (!_this.endtimeclock) {
        _this.$message({
          message: '请选择结束时间',
          type: 'error'
        });
      } else {
        _this.generateButton = '试卷生成中...'
        _this.starttime = _this.starttimedate + ' ' + _this.starttimeclock;
        _this.endtime = _this.starttimedate + ' ' + _this.endtimeclock;
        _this.$http.get('/myweb/createpaper', {
          params: {
            papername: _this.papername,
            starttime: _this.starttime,
            endtime: _this.endtime,
            tid: _this.tid
          }
        }).then(function (response) {
          if (response.status == 200) {
            if (JSON.parse(response.data.result)) {
              _this.generateButton = '生成试卷';
              _this.$message({
                message: '成功生成试卷',
                type: 'success'
              });
            } else {
              _this.generateButton = '生成试卷';
              _this.$message({
                message: '试卷名重复',
                type: 'error'
              });
            }
          }
        }).catch(function (error) {
          console.log(error);
        });
      }
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
}
.el-button{
  margin-left: 180px !important;
  letter-spacing: 2px !important;
  font-size: 16px !important;
}
/*._button{*/
/*  !*display: inline;*!*/
/*}*/
._button p{
  display: inline;
}
/*._button p:nth-child(2){*/
/*  left: 0;*/
/*}*/
</style>
