<template>
    <ul class="security-list--wrap m-form--wrap">
        <li class="security-item--wrap table-layout" v-for="(item, index) in list" :key="index">
            <h6 class="title table-cell">{{ item.title }}</h6>
            <p class="content table-cell">{{ item.content }}</p>
            <div class="button-wrap table-cell">
                <router-link :to="item.url" class="button el-button el-button--primary is-plain">立即修改</router-link>
            </div>
        </li>
    </ul>
</template>

<script>
export default {
    data() {
        return {
            list: [
                {
                    title: '密码设置',
                    content: '建议您定期更改密码以保护账号安全',
                    url: '/security/password'
                },
                {
                    title: '手机绑定',
                    content: '您还没绑定手机，建议绑定手机更安全',
                    url: '/security/phone'
                },
                {
                    title: '邮箱绑定',
                    content: '您还没绑定邮箱，建议绑定邮箱更安全',
                    url: '/security/email'
                }
            ]
        }
    }
}
</script>

<style lang="scss" scoped>
    @import '~@/assets/css/module/my-module-form.scss';

    .security-list--wrap {
        padding: 60px 30px 100px 40px;
    }

    .security-item--wrap {
        margin-bottom: 38px;
        font-size: 16px;

        .title {
            width: 110px;
            color: #999;
        }
        .content {
            color: #626262;
        }
        .button-wrap {
            width: 150px;
            text-align: right;
        }
        .button {
            width: 120px;
            padding: 11px 0;
        }
    }
</style>
