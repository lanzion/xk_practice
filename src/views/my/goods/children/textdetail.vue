<template>
    <div class="textdetail">
        <div>
            <!-- <h4> ，可以学到SCRATCH基础知识点，以及脚本的编写方式。</h4> -->
            <p>
               {{conent}}
            </p>
        </div>
    </div>
</template>
<script>
export default {
    name: 'textdetail',
    computed: {
        conent() {
            return this.$store.state.test.conent
        }
    }
}
</script>
<style lang="scss" scoped>
.textdetail {
    width: 100%;
    min-height: 500px;
    margin-bottom: 50px;
    background: #fff;
    padding: 48px 36px 20px 25px;
    box-sizing: border-box;
    div {
        h4 {
            font-size: 16px;
            color: #333333;
            text-indent: 35px;
            line-height: 33px;
        }
        p {
            font-size: 18px;
            color: #333333;
            text-indent: 5px;
            line-height: 33px;
        }
    }
}
</style>
