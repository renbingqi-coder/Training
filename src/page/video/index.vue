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
        {index: 'list', title: '视频列表' ,icon: 'glyphicon glyphicon-th-list'},
        {index: 'upload', title: '视频上传', icon: 'glyphicon glyphicon-upload'},
      ]
    }
  }
}
</script>

<style scoped>
</style>
