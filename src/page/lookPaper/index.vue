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
          index: 'noStart',
          title: '未开始',
          icon: 'glyphicon glyphicon-remove'
        },
        {
          index: 'underway',
          title: '正在进行',
          icon: 'glyphicon glyphicon-retweet'
        },
        {
          index: 'completed',
          title: '已完成',
          icon: 'glyphicon glyphicon-ok-sign'
        },
        {
          index: 'information',
          title: '试卷信息',
          icon: 'glyphicon glyphicon-align-justify'
        },
        {
          index: 'statistic',
          title: '试卷统计',
          icon: 'glyphicon glyphicon-stats'
        },
      ]
    }
  },
};
</script>

<style>
</style>


