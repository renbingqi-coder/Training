<template>
<div>
    <el-aside>
        <SideMenu :items='items'></SideMenu>
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
            {
              index: 'my',
              title: '我的题库',
              icon: 'glyphicon glyphicon-file'
            },
            {
              index: 'all',
              title: '所有题库',
              icon: 'glyphicon glyphicon-duplicate'
            },
            {
              index: 'build',
              title: '新建题库',
              icon: 'glyphicon glyphicon-plus-sign'
            },

          ],
        }
    },
}
</script>

<style scoped>
</style>
