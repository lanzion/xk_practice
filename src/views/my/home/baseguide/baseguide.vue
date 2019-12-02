<template>
    <div>
        <div @click="getMap()">按钮</div>
        <el-dialog title="提示" :visible.sync="centerDialogVisible" width="60%" center>
            <mapvue />
            <span slot="footer" class="dialog-footer">
                <el-button @click="centerDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: '',
    data() {
        return {
            centerDialogVisible: false
        }
    },
    components: {
        mapvue: resolve => require(['@/views/my/home/mapvue/mapvue'], resolve)
    },
    created() {},
    methods: {
        getMap() {
            this.centerDialogVisible = true
        }
    }
}
</script>
<style lang='scss' scoped>
</style>
