import Vue from 'vue'
import Router from 'vue-router'
// const header = () => import('@/components/index/common/header')
// const footer = () => import('@/components/index/common/footer')
// const sidetool = () => import('@/components/common/side-tools')

// const index = () => import('@/views/index/index/index')
// const forenotice = () => import('@/views/index/forenotice/index')
// const forenoticeDetail = () => import('@/views/index/forenotice/detail')
// const course = () => import('@/views/index/course/index')
// const courseDetail = () => import('@/views/index/course/detail')
// const resource = () => import('@/views/index/resource/index')
// const resourceDetail = () => import('@/views/index/resource/detail')
// const experience = () => import('@/views/index/experience/index')
// const experienceDetail = () => import('@/views/index/experience/detail')
// const teacher = () => import('@/views/index/teacher/index')
// const teacherDetail = () => import('@/views/index/teacher/detail')

const login = () => import('@/views/index/account/login')
const register = () => import('@/views/index/account/register')
const findpwd = () => import('@/views/index/account/findpwd')

Vue.use(Router)

export default new Router({
    linkActiveClass: 'is-active',
    // linkExactActiveClass: 'is-active',
    routes: [
        { path: '/' },
        // {
        //     path: '/index',
        //     name: 'index',
        //     components: {
        //         default: index, header, footer, sidetool
        //     },
        //     props: {
        //         header: { theme: 'light' }
        //     }
        // },
        // {
        //     path: '/forenotice',
        //     components: {
        //         default: forenotice, header, footer, sidetool
        //     }
        // },
        // {
        //     path: '/forenotice/detail',
        //     components: {
        //         default: forenoticeDetail, header, footer, sidetool
        //     },
        //     props: {
        //         header: { theme: 'light' }
        //     }
        // },
        // {
        //     path: '/course',
        //     components: {
        //         default: course, header, footer, sidetool
        //     }
        // },
        // {
        //     path: '/course/:status/detail',
        //     name: 'courseDetail',
        //     components: {
        //         default: courseDetail, header, footer, sidetool
        //     },
        //     props: {
        //         header: { theme: 'light' }
        //     }
        // },
        // {
        //     path: '/resource',
        //     components: {
        //         default: resource, header, footer, sidetool
        //     }
        // },
        // {
        //     path: '/resource/detail',
        //     components: {
        //         default: resourceDetail, header, footer, sidetool
        //     },
        //     props: {
        //         header: { theme: 'light' }
        //     }
        // },
        // {
        //     path: '/experience',
        //     components: {
        //         default: experience, header, footer, sidetool
        //     }
        // },
        // {
        //     path: '/experience/detail',
        //     components: {
        //         default: experienceDetail, header, footer, sidetool
        //     },
        //     props: {
        //         header: { theme: 'light' }
        //     }
        // },
        // {
        //     path: '/teacher',
        //     components: {
        //         default: teacher, header, footer, sidetool
        //     }
        // },
        // {
        //     path: '/teacher/detail',
        //     components: {
        //         default: teacherDetail, header, footer, sidetool
        //     },
        //     props: {
        //         header: { theme: 'light' }
        //     }
        // },
        {
            path: '/login',
            name: 'login',
            component: login
        },
        {
            path: '/register',
            name: 'register',
            component: register
        },
        {
            path: '/findpwd',
            name: 'findpwd',
            component: findpwd
        }
    ],
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            return { x: 0, y: 0 }
        }
    }
})
