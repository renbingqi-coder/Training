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
        <th>选项A</th>
        <td>
          <el-input type="text" v-model="content.options.A"></el-input>
        </td>
      </tr>
      <tr>
        <th>选项B</th>
        <td>
          <el-input type="text" v-model="content.options.B"></el-input>
        </td>
      </tr>
      <tr>
        <th>选项C</th>
        <td>
          <el-input type="text" v-model="content.options.C"></el-input>
        </td>
      </tr>
      <tr>
        <th>选项D</th>
        <td>
          <el-input type="text" v-model="content.options.D"></el-input>
        </td>
      </tr>
      <tr>
        <th>正确答案</th>
        <td>
          <el-select multiple collapse-tags v-model='selectedArray' @change='changeSelect' @remove-tag='removeTag' placeholder='请选择'>
            <el-option label='全选' value='全选' @click.native='selectAll'></el-option>
            <el-option v-for='(item, index) in options' :key='index' :label='item.name' :value='item.name'></el-option>
          </el-select>
        </td>
      </tr>
      <tr>
        <th>解析</th>
        <td>
          <el-input type="textarea" v-model="content.analysis"></el-input>
        </td>
      </tr>
      <!--    <tr>-->
      <!--      <td>-->
      <!--        -->
      <!--      </td>-->
      <!--    </tr>-->
    </table>
    <p>
      <el-button style="width: 300px" type="primary" round @click="add">{{ addButton }}</el-button>
    </p>
  </div>
</template>
<script>
export default {
  name: "multipleChoice",
  data: function () {
    return {
      /*
      题目类型
      题库
      选项
      正确答案
      解析
      */
      selectedArray: [],
      options: [
        {name: 'A', label: 'A'},
        {name: 'B', label: 'B'},
        {name: 'C', label: 'C'},
        {name: 'D', label: 'D'},
      ],

      typeValue: '多选题',
      stageValue: '',
      content: {
        options: {
          A: '',
          B: '',
          C: '',
          D: '',
        },
        rightOptions: ["A", "B", "C", "D"],
        question: '',
        rightKey: [],
        analysis: '',
        rightKey1: '',
        rightKey2: '',
      },
      stageOptions: [],
      tid: '',
      checked: false,
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
      .then(function (response) {
        console.log(response.data);
        that.stageOptions = response.data.test;
      }).catch(function (error) {
      console.log(error)
    });
  },
  watch: {
    selectedArray: function () {
      let that = this;
      // that.selectedArray = [];
      console.log(that.selectedArray)
      if (that.selectedArray[0] == "全选") {
        for (let i = 1; i < that.selectedArray.length; i++) {
          that.content.rightKey[i - 1] = that.selectedArray[i];
        }
      }
      if (that.selectedArray[0] != "全选") {
        that.content.rightKey = that.selectedArray;
      }
    }
  },
  methods: {
    add: function () {
// console.log(this.typeValue)
// console.log(this.stageValue)
// console.log(this.content)
// console.log(this.content.rightKey)
// /*
// 发送题目
//  */
      let that = this;
      for (let j = 0; j < that.content.rightKey.length; j++) {
        if (j == that.content.rightKey.length - 1) {
          that.content.rightKey1 += that.content.rightKey[j];
        } else {
          that.content.rightKey1 += that.content.rightKey[j]
        }
      }
      that.content.rightKey2 = that.content.rightKey1;
      that.content.rightKey1 = '';
      console.log(that.content.rightKey2)
      if (!that.content.question) {
        that.$message({
          message: '请输入题目',
          type: 'warning'
        });
      } else if (!that.stageValue) {
        that.$message({
          message: '请选择题库',
          type: 'warning'
        });
      } else if (!that.content.options.A) {
        that.$message({
          message: '请输入A选项',
          type: 'warning'
        });
      } else if (!that.content.options.B) {
        that.$message({
          message: '请输入B选项',
          type: 'warning'
        });
      } else if (!that.content.options.C) {
        that.$message({
          message: '请输入C选项',
          type: 'warning'
        });
      } else if (that.content.rightKey.length === 0) {
        that.$message({
          message: '请选择正确答案',
          type: 'warning'
        });
      } else if (!that.content.analysis) {
        that.$message({
          message: '请输入解析内容',
          type: 'warning'
        });
      } else {
        that.addButton = '添加题目中...'
        that.$http.get('/myweb/addtest', {
          params: {
            "type": this.typeValue,
            "subject": this.stageValue,
            "question": this.content.question,
            "chooseA": this.content.options.A,
            "chooseB": this.content.options.B,
            "chooseC": this.content.options.C,
            "chooseD": this.content.options.D,
            "answer": this.content.rightKey2,
            "analysis": this.content.analysis,
            "tid": this.tid
          }
        }).then(function (response) {
          console.log(response.data);
          if (JSON.parse(response.data.result)) {
            that.addButton = '添加题目';
            // that.selectedArray = [];
            // that.content.rightKey1 = '';
            that.$message({
              message: '题目添加成功',
              type: 'success'
            });
          } else {
            that.addButton = '添加题目';
            // that.selectedArray = [];
            // that.content.rightKey1 = '';
          }
        }).catch(function (error) {
          console.log(error);
        });
      }
    },
    /*
    多选题全选
    */

    /*
    单个选
    */

    selectAll() {
      if (this.selectedArray.length < this.options.length) {
        this.selectedArray = []
        this.options.map((item) => {
          this.selectedArray.push(item.name)
        })
        this.selectedArray.unshift('全选')
      } else {
        this.selectedArray = []
      }
    },
    changeSelect(val) {
      if (!val.includes('全选') && val.length === this.options.length) {
        this.selectedArray.unshift('全选')
      } else if (val.includes('全选') && (val.length - 1) < this.options.length) {
        this.selectedArray = this.selectedArray.filter((item) => {
          return item !== '全选'
        })
      }
    },
    removeTag(val) {
      if (val === '全选') {
        this.selectedArray = []
      }
    }
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
