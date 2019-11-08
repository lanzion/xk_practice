<template>
    <ul>
        <li v-for="(g,index) in datas" :key="index">
            <div @click="changes(g.id)">
                <ov-image :src-data="getFileUrl(g.cover)"></ov-image>
            </div>
            <h4 @click="changes(g.id)">{{g.name}}</h4>
             <slot name="course" :todo="g"></slot>
        </li>
    </ul>
</template>
<script>
export default {
    name: 'studentcardlist',
    data() {
        return {}
    },
    props: {
        datas: {
            type: Array,
            default() {
                return []
            }
        }
    },
    methods: {
        changes(gid) {
            localStorage.setItem('gid', gid)
            this.$router.push({
                path: '/space/mycourse/studentcoursedetails',
                query: { id: gid }
            })
        }
    }
}
</script>
<style lang="scss" scoped>
ul {
    width: 100%;
    height: 100%;
    font-size: 0px;
    padding: 42px 20px 0 20px;
    box-sizing: border-box;
    li {
        display: inline-block;
        width: 277px;
        height: 203px;
        margin-left: 28px;
        margin-bottom: 40px;
        cursor: pointer;
        div {
            width: 100%;
            height: 155px;
            img {
                width: 100%;
                height: 155px;
            }
        }
        h4 {
            margin-top: 10px;
            margin-bottom: 7px;
            font-size: 16px;
            color: #333;
            text-indent: 6px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
        span {
            height: 24px;
            font-size: 14px;
            display: block;
            text-indent: 6px;
            color: #008aff;
            border: solid 1px #008aff;
            border-radius: 12px;
            width: 80px;
            text-align: center;
            line-height: 24px;
            &:hover {
                background-color: #008aff;
                color: #ffffff;
            }
        }
    }
}
</style>
