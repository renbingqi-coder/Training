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
          index: 'randomAdd',
          title: '随机组卷',
          icon: 'glyphicon glyphicon-indent-left'
        },
        {
          index: 'handleAdd',
          title: '自主组卷',
          icon: 'glyphicon glyphicon-indent-right'
        },
      ]
    }
  },
};
</script>

<style>
</style>
