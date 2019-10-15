<template>
    <div class="tabshows">
        <div class="tabshows_top">
            <ul>
                <li
                    v-for="(item,index) in list"
                    :key="index"
                    @click="changes(index,item.url)"
                    :class="item.url === $route.path ? 'addclass' : ''"
                    v-text="item.name"
                ></li>
            </ul>
        </div>
    </div>
</template>
<script>
export default {
    name: 'tabshows',
    data() {
        return {
            actcard: 0,
            list: [
                {
                    name: '课程详情',
                    url: '/textdetail'
                },
                {
                    name: '实践作品',
                    url: '/textworks'
                },
                {
                    name: '课程评论',
                    url: '/textevaluate'
                }
            ]
        }
    },
    methods: {
        changes(index, url) {
            this.$router.push({
                path: url
            })
        }
    }
}
</script>
<style lang="scss" scoped>
.tabshows {
    margin-top: 20px;
    .tabshows_top {
        height: 60px;
        background: #fff;
        margin-bottom: 10px;
        ul {
            height: 100%;
            border-bottom: 1px solid #ccc;
            li {
                height: 58px;
                text-align: center;
                line-height: 58px;
                float: left;
                width: 120px;
                font-size: 16px;
                color: #333333;
            }
        }
    }
}
.addclass {
    border-bottom: 2px solid #008aff;
    color: #008aff;
}
</style>
