// 排课系统
const container = () => import('@/views/admin/container')
const courseActivityList = () => import('@/views/admin/sortCourse/courseActivityList.vue')
const courseActivityChangeList = () => import('@/views/admin/sortCourse/courseActivityChangeList.vue')
const intellectSortActivity = () => import('@/views/admin/sortCourse/intellectSortActivity/index.vue')

export default [
    {
        name: 'sortCourse',
        path: '/sortCourse',
        component: container,
        children: [
            {
                path: 'courseActivityList',
                component: courseActivityList
            },
            {
                path: 'courseActivityChangeList',
                component: courseActivityChangeList
            },
            {
                path: 'intellectSortActivity',
                component: intellectSortActivity
            },
        ]
    }
]
