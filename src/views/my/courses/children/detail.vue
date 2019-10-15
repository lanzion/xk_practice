<template>
    <course-list :class="{ 'is-empty': !datas.length }" :datas="datas" v-loading="isLoading" />
</template>

<script>
export default {
    data() {
        return {
        }
    },
    props: {
        datas: {
            type: Array,
            default() {
                return []
            }
        },
        isLoading: {
            type: Boolean,
            default() {
                return false
            }
        }
    },
    components: {
        'course-list': resolve => require(['@/components/my/course/course-list'], resolve)
    }
}
</script>
