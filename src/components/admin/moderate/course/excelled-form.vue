<template>
    <el-form ref="form" :model="form" :rules="rules" v-loading="isLoading">
        <el-form-item>
            注：符合标准的课程自动设为精品课
        </el-form-item>
        <el-tabs v-model="active" type="card">
            <el-tab-pane label="按评分" name="score">
                <el-form-item prop="score">
                    <el-col :span="7">
                        <el-input-number v-model="form.lowScore" controls-position="right" :min="0" :max="100"></el-input-number>
                    </el-col>
                    <el-col class="line" :span="2">-</el-col>
                    <el-col :span="7">
                        <el-input-number v-model="form.highScore" controls-position="right" :min="0" :max="100"></el-input-number>
                    </el-col>
                </el-form-item>
                <el-form-item class="tip">
                    分值范围在 0 至 100
                </el-form-item>
            </el-tab-pane>
            <el-tab-pane label="按评级" name="grade">
                <el-form-item prop="grade">
                    <el-checkbox-group v-model="form.grade">
                        <el-checkbox v-for="(item) in ['A', 'B', 'C', 'D']" :label="item" :key="item"></el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
            </el-tab-pane>
        </el-tabs>
        <el-form-item class="g-operate--box">
            <el-button @click="cancel">取消</el-button>
            <el-button type="primary" @click="submit">确定</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
import { requestExcelledCourse, excelledCourse } from '@/api/course'

export default {
    data() {
        const validateScore = (rule, value, callback) => {
            const lowScore = this.form.lowScore
            const highScore = this.form.highScore
            if (lowScore === '' || highScore === '') {
                callback(new Error('请输入分值范围'))
            } else if (lowScore >= highScore) {
                callback(new Error('最低分大于最高分'))
            } else {
                callback()
            }
        }
        return {
            isLoading: false,
            active: 'score',
            form: {
                id: '123456789',
                grade: [],
                highScore: '',
                lowScore: ''
            },
            rules: {
                grade: [
                    { required: true, message: '请选择评级', trigger: 'change' }
                ],
                score: [
                    { validator: validateScore, trigger: ['change', 'blur'] }
                ]
            }
        }
    },
    created() {
        this.getDatas()
    },
    methods: {
        // 查看精品课设置详情
        getDatas() {
            requestExcelledCourse({ id: 123456789 }).then(res => {
                const { code, entity: datas } = res.data
                if (code === 200) {
                    this.active = datas.grade ? 'grade' : 'score'
                    this.form = {
                        id: datas.id,
                        grade: (datas.grade || '').split(','),
                        lowScore: datas.lowScore,
                        highScore: datas.highScore
                    }
                }
            })
        },

        submit() {
            this.validateFields(this.$refs.form, this.active).then((errors) => {
                const message = errors.filter(x => x)
                if (!message.length) {
                    this.isLoading = true

                    const params = this.active === 'grade' ? {
                        id: this.form.id,
                        grade: this.form.grade.join(','),
                        lowScore: '',
                        highScore: ''
                    } : {
                        id: this.form.id,
                        grade: '',
                        lowScore: this.form.lowScore,
                        highScore: this.form.highScore
                    }
                    excelledCourse(params).then(res => {
                        const { code, msg } = res.data
                        if (code === 200) {
                            this.$message({
                                message: '设置成功',
                                type: 'success'
                            })
                            this.cancel()
                        } else {
                            this.$message({
                                message: msg,
                                type: 'warning'
                            })
                        }
                    }).finally(() => {
                        this.isLoading = false
                    })
                }
            })
        },

        cancel() {
            this.$emit('close')
        }
    }
}
</script>

<style lang='scss' scoped>
    @import '~@/assets/css/base/base-variables.scss';

    .el-tab-pane {
        height: 100px;
        
        .el-input-number {
            width: 100%;
        }
        .line {
            text-align: center;
        }
        .tip {
            color: $--color-text-regular;
        }
    }
</style>
