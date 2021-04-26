<template>
    <div class="sidebar">
    <!-- 左侧二级菜单栏的组件封装 -->
        <el-menu
            class="sidebar-el-menu"
            :default-active="toIndex()"
            background-color="white"
            text-color="#7a8297"
            active-text-color="#2d8cf0"
            router>
            <template v-for="item in items">
                <el-menu-item :index="item.index" :key="item.index">
                    <!-- 需要图标的在 item 对象中加上属性 icon -->
                  &nbsp;&nbsp;
                     <i :class="item.icon"></i>
                    <span slot="title">&nbsp;&nbsp;{{ item.title }}</span>
                </el-menu-item>
            </template>
        </el-menu>
    </div>
</template>

<script>
export default {
    props: ['items'],
    data() {
        return {

        }
    },
    methods:{
        // 根据路径绑定到对应的二级菜单，防止页面刷新重新跳回第一个
        toIndex(){
            return this.$route.path.split('/')[2];
        },
    },
};
</script>

<style scoped>
/* 左侧菜单栏定位和位置大小设定 */
.sidebar {
    /*background-color: #5bc0de !important;*/
    display: block;
    position: absolute;
    left: 0;
    top: 70px;
    bottom: 0;
    overflow-y: scroll;
}
.sidebar::-webkit-scrollbar {
    width: 0;
  /*background-color: #5bc0de !important;*/
}
.sidebar-el-menu {
  /*background-color: #c4e3f3 !important;*/
    width: 250px;
}
.sidebar > ul {
    height: 100%;
  /*background-color: #5bc0de !important;*/
}

/* 左侧二级菜单项的样式 */
.el-menu-item {
  /*background-color: #f8f8f8 !important;*/
  font-size: 15px !important;
  padding-left: 35px !important;
  color: black !important;
  letter-spacing: 1.5px;
  font-weight: bold;
}

/* 左侧二级菜单选中时的样式 */
.el-menu-item.is-active {
  color: coral !important;
  /*background: #f8f8f8 !important;*/
  font-weight: bold;
}

.el-menu-item:hover{
  /*outline: 0 !important;*/
  font-size: 20px;
  background: coral !important;
  color: white !important;
}
.font_title:hover {
  font-size: 18px;
}
.el-menu-item, .el-submenu__title {
    height: 50px !important;
    line-height: 50px !important;
}
</style>
