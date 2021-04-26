<template>
  <div class="content-box">
    <table>
      <tr>
        <th>新建题库名称</th>
        <th><el-input type="text" placeholder="请输入..." v-model="subject"></el-input></th>
        <th>
          <el-button type="primary" round @click="buildExam">{{ buildButton }}</el-button>
        </th>
      </tr>
      <!--      <input type="text" placeholder="请输入..." v-model="examName"></input>-->
<!--      <tr>-->
<!--        <th><el-input type="text" placeholder="请输入..." v-model="subject"></el-input></th>-->
<!--      </tr>-->
<!--      <tr>-->
<!--        <th>-->
<!--          <el-button type="primary" round @click="buildExam">{{ buildButton }}</el-button>-->
<!--        </th>-->
<!--      </tr>-->
    </table>
  </div>
</template>

<script>
export default {
  name: "build",
  data: function (){
    return {
      subject: '',
      buildButton: '新建题库',
    }
  },
  methods: {
    buildExam: function (){
      /*
      题库接口
       */
      let that = this;
      if (!that.subject) {
        that.$message({
          message: '请输入题库名称',
          type: 'error'
        });
      } else {
        that.buildButton = '新建题库中...'
        that.$http.get('/myweb/addsubject',{
          params: {
            "subject": this.subject
          }
        })
          .then(function (response){
            if (response.status == 200) {
              if (JSON.parse(response.data.result)) {
                that.buildButton = '新建题库'
                // that.update();
                that.$message({
                  message: '题库新建成功',
                  type: 'success'
                });
                that.created();
              } else {
                that.$message({
                  message: '添加失败，该题库已存在，请重新输入',
                  type: 'error'
                });
              }
            } else {
              that.$message({
                message: '服务器异常，请稍后再试',
                type: 'error'
              });
            }
          }).catch(function (error){
          console.log(error);
        });
      }
    },
  },
}
</script>

<style scoped>
table {
  margin-top: 40px;
  margin-left: 5%;
}

table tr th{
  font-size: 16px;
  /*margin-top: 2000px;*/
  padding-right: 40px;
  /*text-align: right;*/
  /*margin-right: 30px;*/
}

/*table tr td{*/
/*  padding: 15px;*/
/*  padding-left: 130px;*/
/*  margin-left: 100px;*/
/*  width: 500px;*/
/*}*/
/*.el-button{*/
/*  margin-left: 180px !important;*/
/*  letter-spacing: 2px !important;*/
/*  font-size: 16px !important;*/
/*}*/
</style>
