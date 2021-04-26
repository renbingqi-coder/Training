<template>
  <div>
    <el-aside>
      <SideMenu :items="items"></SideMenu>
    </el-aside>
    <el-main>
      <router-view></router-view>
    </el-main>
  </div>
</template>

<script>
import SideMenu from '../../components/sidemenu/SideMenu';
export default {
  components:{
    SideMenu
  },
  data(){
    return {
      items: [
        {index: 'exam', title: '考试结果', icon: 'glyphicon glyphicon-education'},
        {index: 'gradeAnalysis', title: '成绩分析', icon: 'glyphicon glyphicon-stats'},
      ]
    }
  }
}
</script>

<style scoped>
</style>
