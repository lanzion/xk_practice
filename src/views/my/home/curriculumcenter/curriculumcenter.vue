<template>
    <div class="curriculumcenter">
        <div class="curriculumcenter-center">
            <div class="curriculumcenter-left">
                <div class="curriculumcenter-title">
                    <span>课程中心</span>
                    <span>更多>></span>
                </div>
                <ul>
                    <li>
                        <div class="curriculumcenter-img">
                            <ov-image :src-data="getFileUrl(imgs)" :img-height="'140px'"></ov-image>
                        </div>
                        <div class="curriculumcenter-name">
                            <span>课程名称:</span>
                            <span class="curriculumcenter-name-s">爱国教育</span>
                        </div>
                        <div class="base-name">
                            <span>基地名称:</span>
                            <span class="curriculumcenter-name-s">黄埔军校</span>
                        </div>
                    </li>
                </ul>
            </div>

            <div class="curriculumcenter-right">
                <div class="curriculumcenter-title">
                    <span>资讯公告</span>
                    <span>更多>></span>
                </div>
                <ul>
                    <li></li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'curriculumcenter',
    data() {
        return {
            imgs: require('../../../../../static/img/shipbj.jpg')
        }
    },
    created() {},
    methods: {}
}
</script>
<style lang='scss' scoped>
.curriculumcenter {
    width: 100%;
     overflow: hidden;
    .curriculumcenter-center {
        width: 100%;
        overflow: hidden;
        .curriculumcenter-left {
            width: 930px;
            overflow: hidden;
            float: left;
            .curriculumcenter-title {
                width: 930px;
                height: 60px;
                margin-bottom: 20px;
                span {
                    display: block;
                    height: 58px;
                    line-height: 58px;
                    &:nth-child(1) {
                        width: 100px;
                        font-size: 24px;
                        color: #000;
                        border-bottom: 2px solid #008aff;
                        float: left;
                    }
                    &:nth-child(2) {
                        width: 80px;
                        font-size: 16px;
                        color: #666;
                        float: right;
                    }
                }
            }
            ul {
                width: 100%;
                overflow: hidden;
                li {
                    width: 212px;
                    float: left;
                    margin-right: 26px;
                    margin-bottom: 15px;
                    cursor: pointer;
                    &:nth-child(4n) {
                        margin-right: 0px;
                    }
                    .curriculumcenter-img {
                        overflow: hidden;
                    }
                    .curriculumcenter-name,
                    .base-name {
                        width: 100%;
                        height: 30px;
                        line-height: 30px;
                        span {
                            width: 64px;
                            display: block;
                            float: left;
                            font-size: 14px;
                            color: #222;
                        }
                        .curriculumcenter-name-s {
                            width: 148px;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            white-space: nowrap;
                        }
                    }
                }
            }
        }
        .curriculumcenter-right {
            width: 234px;
            overflow: hidden;
            float: right;
            .curriculumcenter-title {
                width: 100%;
                height: 60px;
                margin-bottom: 20px;
                span {
                    display: block;
                    height: 58px;
                    line-height: 58px;
                    &:nth-child(1) {
                        width: 100px;
                        font-size: 24px;
                        color: #000;
                        border-bottom: 2px solid #008aff;
                        float: left;
                    }
                    &:nth-child(2) {
                        width: 80px;
                        font-size: 16px;
                        color: #666;
                        float: right;
                        text-align: right;
                    }
                }
            }
        }
    }
}
</style>
