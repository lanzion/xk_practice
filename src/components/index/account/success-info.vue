<template>
    <div class="register-success-wrap">
        <img class="success-image" src="~@/assets/image/login/success-image.png">
        <slot>
            <p>已提交注册信息！</p>
            <p>请通知校方管理员审批通过</p>
        </slot>
        <div class="button-group">
            <el-button class="form-button" type="primary" @click="submit">
                <slot name="operate-txt">确定</slot>
            </el-button>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
        }
    },
    methods: {

        submit() {
            this.$router.push('/login')
        }
    }
}
</script>

<style lang="scss" scoped>
    @import '~@/assets/css/base/utils.scss';
    @import '~@/assets/css/module/login.scss';

    $font-size: 16px;
    $line-height: 2;
    .register-success-wrap {
        font-size: $font-size;
        line-height: $line-height;
        text-align: center;
    }

    .success-image {
        margin-bottom: 30px - $font-size * ($line-height - 1);
    }

    .button-group {
        margin-top: 60px - $font-size * ($line-height - 1);
    }
</style>
