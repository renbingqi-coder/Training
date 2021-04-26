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
    components: {
        SideMenu
    },
    data() {
      return {
        items: [
          {
            index: 'singleChoice',
            title: '单选题创编',
            icon: 'glyphicon glyphicon-plus'
          },
          {
            index: 'multipleChoice',
            title: '多选题创编',
            icon: 'glyphicon glyphicon-plus'
          },
          {
            index: 'judgeChoice',
            title: '判断题创编',
            icon: 'glyphicon glyphicon-plus'
          },
            ]
        }
    },
};
</script>

<style>
</style>
