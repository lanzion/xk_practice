// 排课系统
export default [
    {
        name: 'sortCourse',
        path: '/sortCourse',
        component: (resolve) => require(['@/views/admin/container.vue'], resolve),
        children: [
            {
                path: 'courseActivityList',
                component: (resolve) => require(['@/views/admin/sortCourse/courseActivityList.vue'], resolve),
            },
            {
                path: 'courseActivityChangeList',
                component: (resolve) => require(['@/views/admin/sortCourse/courseActivityChangeList.vue'], resolve),
            },
            {
                path: 'intellectSortActivity',
                component: (resolve) => require(['@/views/admin/sortCourse/intellectSortActivity/index.vue'], resolve),
            },
        ]
    }
]
