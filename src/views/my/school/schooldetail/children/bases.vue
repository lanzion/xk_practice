<template>
    <div class="bases">
        <div class="bases-fl-evaluate">
            <ul class="bases-fl-evaluate-ul">
                <li>
                    <div>
                        <ov-image :type="3" :src-data="'123'" :img-height="'235px'"></ov-image>
                    </div>
                    <h3>课程名称课程名称名称课程名称…</h3>
                    <h4>已参加课程:</h4>
                    <ul>
                        <li>《寻找广州城市天际线》</li>
                        <li>《寻找广州城市天际线城市天际线》</li>
                        <li>《寻找广州城市天际线》</li>
                    </ul>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    name: 'schooldetailbases',
    data() {
        return {
            value: 5,
            time: require('../../../../../../static/img/time.png'),
            erweima: require('../../../../../../static/img/xikegongzhonghao.png')
        }
    },
    created() {},
    methods: {
        go() {
            this.$router.push({ path: '/school/schooldetail/brief' })
        }
    }
}
</script>
<style lang='scss' scoped>
.bases {
    overflow: hidden;
    .bases-fl-evaluate {
        margin-bottom: 90px;
        margin-top: 28px;
        .bases-fl-evaluate-header {
            border-bottom: 1px solid #eee;
            height: 34px;
            margin-bottom: 18px;
            span,
            i {
                display: inline-block;
            }
            .bases-fl-evaluate-header-one {
                font-size: 22px;
                line-height: 31px;
                letter-spacing: 0px;
                color: #333333;
            }
            .bases-fl-evaluate-header-two {
                font-size: 16px;
                letter-spacing: 0px;
                color: #666666;
            }
            .bases-fl-evaluate-header-thr {
                font-size: 16px;
                line-height: 29px;
                letter-spacing: 0px;
                color: #666666;
                float: right;
                cursor: pointer;
            }
            .bases-fl-evaluate-header-min {
            }
            .bases-fl-evaluate-header-max {
                float: right;
                cursor: pointer;
            }
        }
        .bases-fl-evaluate-ul {
            overflow: hidden;
            li {
                width: 380px;
                height: 388px;
                border: 1px solid #eeeeee;
                box-sizing: border-box;
                float: left;
                margin-right: 30px;
                &:nth-last-child(1) {
                    margin-right: 0px;
                }
                h3 {
                    height: 34px;
                    font-size: 16px;
                    line-height: 34px;
                    letter-spacing: 2.3px;
                    color: #262626;
                    padding: 0 10px;
                    box-sizing: border-box;
                    margin-bottom: 10px;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }
                h4 {
                    height: 24px;
                    font-size: 14px;
                    line-height: 24px;
                    letter-spacing: 2px;
                    color: #666666;
                    padding: 0 10px;
                    box-sizing: border-box;
                    margin-bottom: 6px;
                }
                ul {
                    li {
                        height: 22px;
                        font-size: 14px;
                        line-height: 22px;
                        letter-spacing: 1.4px;
                        color: #008aff;
                        padding: 0 10px;
                        box-sizing: border-box;
                        border: none;
                        margin-bottom: 4px;
                    }
                }
            }
        }
    }
}
</style>
