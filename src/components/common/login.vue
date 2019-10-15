<template>
    <section class="login-box">
        <input type="text" v-model="form.account">
        <input type="password" v-model="form.pwd">
        <button type="button" @click.prevent="submit">登录</button>
    </section>
</template>

<script>
import { mapActions } from 'vuex'

export default {
    data() {
        return {
            form: {
                account: '',
                pwd: ''
            }
        }
    },

    methods: {
        ...mapActions('login', ['login']),

        submit() {
            this.login(this.form)
        }
    }
}
</script>

<style scoped>
</style>
