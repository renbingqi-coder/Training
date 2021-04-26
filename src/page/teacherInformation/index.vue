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
              {index: 'look', title: '查看信息', icon:'glyphicon glyphicon-user'},
              {index: 'update', title: '修改信息', icon: 'glyphicon glyphicon-pencil'},
              ]
        }
    }
}
</script>

<style scoped>
</style>
