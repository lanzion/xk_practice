<template>
    <div class="conent">
        <div class="title">
            <h3>课程简介:</h3>
            <p>{{datas.synopsis}}</p>
        </div>
        <div class="title">
            <h3>课程目标:</h3>
            <p>{{datas.target}}</p>
        </div>
    </div>
</template>
<script>
export default {
    name: 'courseintroduction',
    data() {
        return {
            datas: {}
        }
    },
    computed: {},
    created() {
        this.datas = JSON.parse(sessionStorage.getItem('courseDeatil'))
    },
    methods: {}
}
</script>
<style lang="scss" scoped>
.conent {
    width: 100%;
    overflow: hidden;
    font-size: 14px;
    color: #333;
    padding: 20px;
    box-sizing: border-box;
    .title {
        margin-bottom: 30px;
        h3 {
            letter-spacing: 2px;
            margin-bottom: 15px;
            color: #000;
        }
        p {
            letter-spacing: 1px;
            line-height: 30px;
        }
    }
}
</style>
