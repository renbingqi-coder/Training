import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [

      {
        path: '/student',
        component: ()=>import('../student/index'),
        redirect: '/student/myExam',
        children: [
          {
            path: 'myExam',
            component: ()=>import('../student/myExam')
          },
          {
            path: 'grade',
            component: ()=>import('../student/grade')
          },
          {
            path: 'mistakes',
            component: ()=>import('../student/mistakes')
          },

        ],
      },

      {
        path: '/exam',
        component: ()=>import('../student/exam')
      },

      {
        path: '/answerRecord',
        component: ()=>import('../student/answerRecord')
      },

      // {
      //   path: '/video',
      //   component: ()=>import('../page/video')
      // },

        {
            path: '/',
            redirect: '/login'
        },
        {
            path: '/',
            component: () => import('../components/common/Whole.vue'),
            meta: {
                title: '整体页面布局'
            },
            redirect: '/teacherInformation',
            children: [
              {
                path: 'teacherInformation',
                component: () => import('../page/teacherInformation/index.vue'),
                meta: {
                  title: '个人信息'
                },
                redirect: '/teacherInformation/look',
                children: [
                  {
                    path: 'look',
                    component: ()=>import('../page/teacherInformation/look.vue')
                  },
                  {
                    path: 'update',
                    component: () => import('../page/teacherInformation/update.vue')
                  },
                ],
              },
                {
                    path: '/checkExam',
                    component: () => import('../page/checkExam/index.vue'),
                    meta: {
                        title: '题库'
                    },
                  redirect: '/checkExam/my',     // 该配置是若点击选择父目录时，默认选中该父目录下的子路径页面
                  children: [
                    {
                      path: 'build',
                      component: ()=>import('../page/checkExam/build.vue')
                    },
                    {
                      path: 'all',
                      component: () => import('../page/checkExam/all.vue'),
                      meta: {
                        title: '所有题库'
                      },
                      // children: [
                      //   {
                      //     path: 'questions',
                      //     component: ()=>import('../page/checkExam/questions')
                      //   },
                      // ],
                    },
                    {
                      path: 'my',
                      component: () => import('../page/checkExam/my.vue'),
                      meta: {
                        title: '我的题库'
                      },
                    },
                    {
                      path: 'allquestions',
                      component: ()=>import('../page/checkExam/allquestions')
                    },
                    {
                      path: 'myquestions',
                      component: () => import('../page/checkExam/myquestions')
                    },
                  ]
                },
                {
                    path: '/add',
                    component: () => import('../page/add/index.vue'),
                    meta: {
                        title: '添加题目'
                    },
                    redirect:'/add/singleChoice',
                    children:[
                        {
                            path: 'singleChoice',
                            component: () => import('../page/add/singleChoice.vue'),
                            meta: {
                                title: '单选题'
                            }
                        },
                        {
                            path: 'multipleChoice',
                            component: () => import('../page/add/multipleChoice.vue'),
                            meta: {
                                title: '多选题'
                            }
                        },
                        {
                            path: 'judgeChoice',
                            component: () => import('../page/add/judgeChoice.vue'),
                            meta: {
                                title: '判断题'
                            }
                        },
                    ]
                },
                {
                    path: '/generate',
                    component: () => import('../page/generate/index.vue'),
                    meta: {
                        title: '生成试卷'
                    },
                    redirect:'/generate/randomAdd',
                    children:[
                        {
                            path: 'randomAdd',
                            component: () => import('../page/generate/randomAdd.vue'),
                            meta: {
                                title: '随机组卷'
                            }
                        },
                        {
                            path: 'handleAdd',
                            component: () => import('../page/generate/handleAdd.vue'),
                            meta: {
                                title: '自主组卷'
                            }
                        },
                    ]
                },
              {
                path: '/checkQuestion',
                component: () => import('../page/lookPaper/index'),
                meta: {
                  title: '查看试卷'
                },
                redirect: '/checkQuestion/noStart',
                children: [
                  {
                    path: 'noStart',
                    component: () => import('../page/lookPaper/noStart')
                  },
                  {
                    path: 'underway',
                    component: () => import('../page/lookPaper/underway')
                  },
                  {
                    path: 'completed',
                    component: () => import('../page/lookPaper/completed')
                  },
                  {
                    path: 'information',
                    component: () => import('../page/lookPaper/information.vue')
                  },
                  {
                    path: 'statistic',
                    component: () => import('../page/lookPaper/statistic.vue')
                  },
                  {
                    path: 'paper',
                    component: () => import('../page/lookPaper/paper')
                  },
                ],
              },
              {
                path: '/result',
                component: () => import('../page/result/index'),
                meta: {
                  title: '考试结果查询'
                },
                redirect: '/result/exam',
                children: [
                  {
                    path: 'exam',
                    component: ()=>import('../page/result/exam')
                  },
                  {
                    path: 'gradeAnalysis',
                    component: ()=>import('../page/result/gradeAnalysis')
                  },
                ],
              },
              /*
              视频管理
               */
              {
                path: '/video',
                component: () => import('../page/video/index'),
                redirect: '/video/list',
                children: [
                  {
                    path: 'list',
                    component: ()=>import('../page/video/list')
                  },
                  {
                    path: 'upload',
                    component: ()=>import('../page/video/upload')
                  }
                ],
              },

              /*
              我的试卷
               */
                // {
                //     path: '/404',
                //     component: () => import('../page/404.vue'),
                //     meta: {
                //         title: '404'
                //     }
                // },
                {
                    path: '/403',
                    component: () => import('../page/403.vue'),
                    meta: {
                        title: '403'
                    }
                },
            ]
        },
        {
            // 登录页面
            path: '/login',
            component: () => import('../page/index'),
            meta: {
                title: '登录'
            }
        },
      // {
      //   path: '/myExam',
      //   component: ()=>import('../student/myExam')
      // },
        {
            path: '*',
            redirect: '/login'
        }
    ]
});
