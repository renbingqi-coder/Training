<template>
  <div class="content-box">
    <!--    试卷查看-->
    <div v-show="loading"
         v-loading="loading"
         element-loading-text="数据加载中..."
         element-loading-spinner="el-icon-loading"
         style="margin-top:110px;font-size: 50px">
    </div>
    <table v-show="!loading" >
      <tr>
        <th>序号</th>
        <th>试卷名称</th>
        <th>开始时间</th>
        <th>结束时间</th>
        <th>操作</th>
      </tr>
      <template v-for="(item, index) in currentPageData">
        <tr class="trData">
          <td width="10%">{{index+1}}</td>
          <td width="20%">{{item.papername}}</td>
          <td width="20%">{{item.starttime}}</td>
          <td width="20%">{{item.endtime}}</td>
          <td width="20%">
            <span @click="paperUpdate(item)" class="accept">修改</span>
            <span @click="paperLook(item.papername)" class="accept">查看</span>
            <span @click="paperDelete(item.papername)" class="refuse">删除</span>
          </td>
        </tr>
      </template>
    </table>

    <div v-show="!loading" class="page">
      <button @click="prePage">上一页</button>
      <span>第{{currentPage}}页/共{{totalPage}}页</span>
      <button @click="nextPage">下一页</button>
    </div>

    <!-- edit界面 -->
    <div id="mask" v-if="editlist">
      <div class="mask">
        <div class="title">
          编辑
          <span @click="editlist=false">X</span>
        </div>

        <div class="content">
          <input type="text" v-model="editDetail.papername" name="title" placeholder="试卷名称">
          <input type="date" v-model="editDetail.starttimedate" name="user" placeholder="开始日期">
          <input type="time" v-model="editDetail.starttimeclock" name="dates" placeholder="开始时间">
          <input type="date" v-model="editDetail.endtimedate" name="user" placeholder="结束日期">
          <input type="time" v-model="editDetail.endtimeclock" name="dates" placeholder="结束时间">
          <input class="content-button" type="button" v-on:click="update" :value="updateButton">
          <input class="content-button" type="button" v-on:click="cancle" value="取消">
        </div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: "check",
  data:function (){
    return {
      paper:[
        // {"papername":"java", "starttime":"2020-10-1 16:00","endtime":"2020-10-2 16:00"},
        // {"papername":"python", "starttime":"2020-10-3","endtime":"2020-10-3"},
        // {"papername":"web", "starttime":"2020-10-5","endtime":"2020-10-5"},
      ],
      tid: '',
      // loading: true,
      editlist: false,
      editDetail: {},
      updateButton: '更新',
      loading: true,
      paperName: '',
      currentPageData: [],//当前页内容
      totalPage: 1,//总页数，默认1，
      currentPage: 1,
      pageSize: 10, // 每页显示数量

    }
  },
  created() {
    let userInfo = JSON.parse(window.sessionStorage.getItem('userInfo'));
    console.log(userInfo)
    let _this = this;
    _this.tid = userInfo.tid;
    if (!_this.tid){
      _this.$message({
        message: '登录过期,请重新登录',
        type: 'error'
      });
    } else {
      _this.$http.get('/myweb/selectpaper',{
        params:{
          tid: _this.tid
        }
      }).then(function (response){
        if (response.status === 200){
          console.log(response.data+","+typeof response.data);
          console.log(response.data[0]+','+typeof response.data[0]);
          _this.paper = response.data;
          _this.loading = false;

          _this.totalPage = Math.ceil(_this.paper.length/_this.pageSize);
          _this.totalPage = _this.totalPage === 0?1:_this.totalPage;
          _this.setCurrentPageData();
          console.log(_this.allQuestion);
          console.log(_this.currentPage);

        } else {
          _this.$message({
            message: '数据异常，请稍后再试',
            type: 'error'
          });
        }
      }).catch(error=>{
        console.log(error);
      });
    }

  },
  methods:{


    setCurrentPageData: function (){
      let begin = (this.currentPage - 1) * this.pageSize;
      let end = this.currentPage*this.pageSize;
      this.currentPageData = this.paper.slice(begin,end);
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

    reGet:function (){
      let userInfo = JSON.parse(window.sessionStorage.getItem('userInfo'));
      console.log(userInfo)
      let _this = this;
      _this.tid = userInfo.tid;
      _this.loading = true;
      if (!_this.tid){
        _this.$message({
          message: '登录过期,请重新登录',
          type: 'error'
        });
      } else {
        _this.$http.get('/myweb/selectpaper',{
          params:{
            tid: _this.tid
          }
        }).then(function (response){
          if (response.status === 200){
            console.log(response.data+","+typeof response.data);
            console.log(response.data[0]+','+typeof response.data[0]);
            _this.paper = response.data;
            _this.loading = false;

            _this.totalPage = Math.ceil(_this.paper.length/_this.pageSize);
            _this.totalPage = _this.totalPage === 0?1:_this.totalPage;
            _this.setCurrentPageData();
            console.log(_this.allQuestion);
            console.log(_this.currentPage);

          } else {
            _this.$message({
              message: '数据异常，请稍后再试',
              type: 'error'
            });
          }
        }).catch(error=>{
          console.log(error);
        });
      }
    },

    update: function (){
      this.doData(this.editDetail);
    },

    cancle: function (){
      this.editlist = false;
    },

    doData: function (item){
      /*
      修改数据接口
      */
      console.log(132)
      console.log(this.editDetail);
      let _this = this;
      if (!_this.editDetail.starttimedate){
        _this.$message({
          message: '请输入开始日期',
          type: 'warning'
        });
      } else if (!_this.editDetail.starttimeclock){
        _this.$message({
          message: '请输入开始时间',
          type:'warning'
        });
      } else if (!_this.editDetail.endtimedate){
        _this.$message({
          message: '请输入结束日期',
          type:'warning'
        });
      } else if (!_this.editDetail.endtimeclock){
        _this.$message({
          message: '请输入结束时间',
          type: 'warning'
        });
      } else {
        _this.updateButton = '更新中...'
        _this.$http.get('/myweb/updatepaper',{
          params: {
            paperName: _this.paperName,
            papername: item.papername,
            starttime: item.starttimedate + ' ' + item.starttimeclock,
            endtime: item.endtimedate + ' ' + item.endtimeclock
          }
        }).then(function (response){
          if (response.status === 200) {
            if (JSON.parse(response.data.result)){
              _this.editlist = false;
              _this.$message({
                message: '试卷修改成功',
                type: 'success'
              });
              _this.reGet();
            } else {
              _this.editlist = false;
              _this.$message({
                message: '试卷修改失败！',
                type: 'error'
              });
            }
          }
        }).catch(function (error){
          console.log(error);
        })
      }
    },

    paperUpdate:function (item){
      /*
      修改试卷接口
       */
      // console.log(item);
      let _this = this;
      // console.log(_this.starttime.split(''))
      // console.log(item.starttime)
      _this.paperName = item.papername;
      _this.editDetail = {
        papername: item.papername,
        starttimedate: item.starttimedate,
        starttimeclock: item.starttimeclock,
        endtimedate: item.endtimedate,
        endtimeclock: item.endtimeclock,
      }
      console.log(_this.editDetail);
      _this.editlist = true;
    },

    paperLook:function (paperName){
      /*
      查看试卷接口
      */
      let _this = this;
      _this.$router.push({
        path: '/checkQuestion/paper',
        query:{
          paperName: JSON.stringify(paperName),
        }
      })
    },
    paperDelete: function (paperName){
      /*
      删除试卷接口
       */
      console.log(paperName);
      let _this = this;
      this.$confirm('此操作将永久删除该试卷, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // console.log("删除成功")
        _this.$http.get('/myweb/deletepaper',{
          params:{
            papername:paperName
          }
        }).then(function (response){
          if (response.status == 200){
            if (JSON.parse(response.data.result)){
              _this.$message({
                type: 'success',
                message: '删除成功!'
              });
              _this.reLoad();
            }
          } else {
            _this.$message({
              message: '服务器异常!',
              type: 'error'
            });
          }
        }).catch(function (error){
          console.log(error);
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    reLoad: function (){
      let _this = this;
      _this.loading = true;
      _this.$http.get('/myweb/selectpaper',{
        params:{
          tid: _this.tid
        }
      }).then(function (response){
        if (response.status == 200){
          console.log(response.data+","+typeof response.data);
          console.log(response.data[0]+','+typeof response.data[0]);
          _this.paper = response.data;
          _this.loading = false;

          _this.totalPage = Math.ceil(_this.paper.length/_this.pageSize);
          _this.totalPage = _this.totalPage === 0?1:_this.totalPage;
          _this.setCurrentPageData();
          console.log(_this.allQuestion);
          console.log(_this.currentPage);

        } else {
          _this.$message({
            message: '数据异常，请稍后再试',
            type: 'error'
          });
        }
      }).catch(error=>{
        console.log(error);
      });
    }
  },
}
</script>

<style scoped>


input {
  border: 1px solid #008cd5;
  padding: 5px;
  border-radius: 3px;
  /* 棱角变圆 */
  margin-right: 15px;
}

.button {
  background-color: #008cd5;
  border: 0;
  padding: 4px 15px;
  color: #fff;
}

#table table {
  width: 100%;
  font-size: 15px;
  border: 1px solid #eee;
  text-align: center;
  border-collapse: collapse;
}

table th {
  background-color: #f5f5f5;
  border-right: 1px solid #eee;
  font-size: 20px;
}

/*
    #fff
    #f5f5f5
    #eee
    颜色深度依次递增
 */

table td {
  padding: 10px;
  border-bottom: 1px solid #eee;
  border-right: 1px solid #eee;
}

.delete {
  color: red;
}

.edit {
  color: #008cd5;
}


#mask {
  background: rgba(0, 0, 0, .5);
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: 4;
  top: 0;
  left: 0;
}

tr td span {
  cursor: pointer;
  /*  指定鼠标指引 */
  margin: 10px;
}

.mask {
  width: 300px;
  height: 400px;
  background-color: rgba(255, 255, 255, 1);
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  z-index: 47;
  border-radius: 5px;
}

.title{
  padding: 10px;
  border-bottom: 1px solid #eee;
}

.title span {
  float: right;
  cursor: pointer;
}

.content {
  padding: 10px;
  overflow-y: hidden;
  overflow-x: hidden;
}

.content input {
  width: 270px;
  margin-bottom: 15px;
}

.content-button {
  background: #008cd5;
  border: 0;
  border-radius: 4px;
  padding: 10px 15px;
  color: #fff;
}


/*

 */




.title_manages th{
  padding: 10px;
}
.trData{
  margin-left: auto;
  margin-right: auto;
}

table {
  width: 90%;
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


/*.trData td{*/
/*  padding: 15px;*/
/*}*/

/*table {*/
/*  width: 80%;*/
/*  font-size: 15px;*/
/*  border: 1px solid #eee;*/
/*  text-align: center;*/
/*  border-collapse: collapse;*/
/*  margin-left: 9%;*/
/*  margin-right: auto;*/
/*}*/
/*table th {*/
/*  background-color: #f5f5f5;*/
/*  border-right: 1px solid #eee;*/
/*  font-size: 20px;*/
/*}*/
.refuse {
  color: red;
}
span {
  padding-left: 20px;
  cursor: pointer;
}
.accept {
  color: #008cd5;
}
/*
    #fff
    #f5f5f5
    #eee
    颜色深度依次递增
 */

table td {
  padding: 10px;
  border-bottom: 1px solid #eee;
  border-right: 1px solid #eee;
}




#table {
  padding: 0 10px;
}

.add {
  border: 1px solid #ccc;
  margin: 15px 0px;
  /* margin-left: auto;
  margin-right: auto; */
  /* 此处的margin-left和margin-right该不会在边框上起作用了吧 */
  text-align: center;
  /* 此div中的居中起作用的是text-align */
  padding: 15px;
}

input {
  border: 1px solid #008cd5;
  padding: 5px;
  border-radius: 3px;
  /* 棱角变圆 */
  margin-right: 15px;
}

.button {
  background-color: #008cd5;
  border: 0;
  padding: 4px 15px;
  color: #fff;
}

#table table {
  width: 100%;
  font-size: 16px;
  border: 2px solid #eee;
  text-align: center;
  border-collapse: collapse;
}

table th {
  background-color: #f5f5f5;
  border: 2px solid #eee;
  font-size: 16px;
  font-weight: bold;
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


/*
    #fff
    #f5f5f5
    #eee
    颜色深度依次递增
 */

table td{
  background-color: #f5f5f5;
  border: 2.5px solid #eee;
  font-size: 14px;
}

.delete {
  color: red;
}

.edit {
  color: #008cd5;
}

</style>
