<template>
  <div class="content-box">

    <table>
      <tr class="title_manages">
        <th>题库</th>
        <td>
          <el-select v-model="stageValue">
            <el-option v-for="item in stageOptions" :key="item" :value="item">{{ item }}</el-option>
          </el-select>
        </td>
      </tr>
      <tr>
        <th>题目</th>
        <td>
          <el-input type="text" v-model="content.question"></el-input>
        </td>
      </tr>
      <tr>
        <th>正确答案</th>
        <td>
          <el-select v-model="content.rightKey">
            <el-option v-for="item in content.rightOptions" :key="item" :value="item">{{item}}</el-option>
          </el-select>
        </td>
      </tr>
      <tr>
        <th>解析</th>
        <td>
          <el-input type="textarea" v-model="content.analysis"></el-input>
        </td>
      </tr>
    </table>
    <p>
      <el-button style="width: 300px" type="primary" round @click="add">{{ addButton }}</el-button>
    </p>
  </div>
</template>
<script>
export default {
  name: "judgeChoice",
  data: function (){
    return {
      /*
      题目类型
      题库
      选项
      正确答案
      解析
       */
      typeValue: '判断题',
      stageValue: '',
      content: {
        options: {
          A: '',
          B: '',
          C: '',
          D: '',
        },
        rightOptions: ["√","×"],
        question: '',
        rightKey: '',
        analysis: '',
      },
      stageOptions: [],
      tid: '',
      addButton: '添加题目'
    }
  },
  created() {
    let userInfo = JSON.parse(window.sessionStorage.getItem('userInfo'));
    this.tid = userInfo.tid;
    /*
    获取题库数据接口
    */
    let that = this;
    this.$http.get('/myweb/test')
      .then(function (response){
        console.log(response.data);
        that.stageOptions = response.data.test;
      }).catch(function (error){
      console.log(error)
    });
  },
  methods: {
    add: function (){
      console.log(this.typeValue)
      console.log(this.stageValue)
      console.log(this.content)
      /*
      发送题目
       */
      // _this.addButton = '添加题目中...';
      let that = this;
      if (!that.stageValue){
        that.$message({
          message: '请选择题库',
          type: 'warning'
        });
      } else if ( !that.content.question){
        that.$message({
          message: '请输入题目',
          type: 'warning'
        });
      } else if (!that.content.rightKey){
        that.$message({
          message: '请选择正确答案',
          type: 'warning'
        });
      } else if (!that.content.analysis){
        that.$message({
          message: '请输入解析内容',
          type: 'warning'
        });
      } else {
        that.addButton = '添加题目中...';
        that.$http.get('/myweb/addtest',{
          params: {
            "type": this.typeValue,
            "subject": this.stageValue,
            "question": this.content.question,
            "chooseA": this.content.options.A,
            "chooseB": this.content.options.B,
            "chooseC": this.content.options.C,
            "chooseD": this.content.options.D,
            "answer": this.content.rightKey,
            "analysis": this.content.analysis,
            "tid": this.tid
          }
        }).then(function (response){
          console.log(response.data);
          if (JSON.parse(response.data.result)) {
            that.addButton = '添加题目'
            that.$message({
              message: '题目添加成功',
              type: 'success'
            });
          }
        }).catch(function (error){
          console.log(error);
        });
      }
    },
  }
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
</style>
