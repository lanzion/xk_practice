<template>
    <div>
        <div class="page-fl-coure">
            <div class="page-fl-coure-header">
                <i class="page-fl-coure-header-min" :style="{backgroundImage:'url('+jidilan+')'}"></i>
                <span class="page-fl-coure-header-one">基地/机构</span>
                <i
                    @click="go()"
                    class="page-fl-coure-header-max"
                    :style="{backgroundImage:'url('+gengduo+')'}"
                ></i>
                <span class="page-fl-coure-header-thr" @click="go()">更多</span>
            </div>
            <ul class="page-fl-coure-ul">
                <li v-for="(g,index) in datas" :key="index" @click="gobase(g.id)">
                    <div>
                        <ov-image :type="3" :src-data="getFileUrl(g.cover)" :img-height="'178px'"></ov-image>
                    </div>
                    <h3>{{cutString(g.name,48)}}</h3>
                    <div class="page-fl-coure-ul-min">
                        <i :style="{backgroundImage:'url('+dizhi+')'}"></i>
                        <p>{{g.address}}</p>
                    </div>
                    <div class="page-fl-coure-ul-max">
                        <i :style="{backgroundImage:'url('+dianhua+')'}"></i>
                        <p>{{g.linkPhone}}</p>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import { requestwebapibase } from '@/api/webApi/base'
export default {
    name: '',
    data() {
        return {
            pages: {
                pageSize: 8,
                pageNum: 1
            },
            datas: [],
            kechenglan: require('../../../../../static/img/kechenglan.png'),
            gengduo: require('../../../../../static/img/gengduo.png'),
            dizhi: require('../../../../../static/img/dizhi.png'),
            dianhua: require('../../../../../static/img/dianhua.png'),
            jidilan: require('../../../../../static/img/jidilan.png')
        }
    },
    created() {
        this.getlists()
    },
    methods: {
        async getlists() {
            let form = {
                provinceId: '',
                cityId: '',
                areaId: '',
                name: '',
                publishingUnitLevel: ''
            }
            const res = await requestwebapibase(form, this.pages)
            const { entity: datas = {} } = res.data
            try {
                let array = datas.resultData || []
                this.datas = array
                this.totalNum = datas.totalNum || 0
            } catch (error) {
                this.datas = []
            } finally {
                this.isLoading = false
            }
        },
        go() {
            this.$router.push({
                path: '/base'
            })
        },
        gobase(id) {
            sessionStorage.setItem('baseId', id)
            this.$router.push({
                path: '/base/basedetail',
                query: { baseId: id }
            })
        }
    }
}
</script>
<style lang='scss' scoped>
.page-fl-coure {
    width: 100%;
    overflow: hidden;
    .page-fl-coure-header {
        width: 100%;
        height: 34px;
        margin-bottom: 18px;
        span,
        i {
            display: inline-block;
        }
        .page-fl-coure-header-one {
            font-size: 22px;
            line-height: 31px;
            letter-spacing: 0px;
            color: #333333;
        }
        .page-fl-coure-header-two {
            font-size: 16px;
            letter-spacing: 0px;
            color: #666666;
        }
        .page-fl-coure-header-thr {
            font-size: 16px;
            line-height: 29px;
            letter-spacing: 0px;
            color: #666666;
            float: right;
            cursor: pointer;
        }
        .page-fl-coure-header-min {
            width: 22px;
            height: 22px;
            margin-right: 10px;
        }
        .page-fl-coure-header-max {
            float: right;
            cursor: pointer;
            width: 15px;
            height: 15px;
            margin-top: 8px;
            margin-left: 8px;
        }
    }
    .page-fl-coure-ul {
        overflow: hidden;
        li {
            width: 288px;
            height: 292px;
            float: left;
            border: solid 1px #f3f3f3;
            margin-bottom: 28px;
            border-radius: 4px;
            margin-right: 13px;
            cursor: pointer;
            &:nth-child(4n) {
                margin-right: 0px;
            }
            &:hover {
                box-shadow: 0px 2px 2px 0px rgba(6, 0, 51, 0.19);
            }
            h3 {
                font-size: 16px;

                line-height: 20px;
                letter-spacing: 1.6px;
                color: #262626;
                padding: 0 10px;
                box-sizing: border-box;
                margin-top: 8px;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
                overflow: hidden;
                word-break: break-all;
            }
            .page-fl-coure-ul-min,
            .page-fl-coure-ul-max {
                font-size: 14px;
                letter-spacing: 0px;
                color: #666666;
                padding: 0 10px;
                box-sizing: border-box;
                margin-top: 15px;
                overflow: hidden;
                i {
                    width: 15px;
                    height: 15px;
                    margin-right: 10px;
                    display: block;
                    float: left;
                    background-size: 15px;
                    background-repeat: no-repeat;
                    background-position: center;
                }
                // span {
                //     display: inline-block;
                //     vertical-align: middle;
                //     font-size: 14px;
                //     letter-spacing: 0px;
                //     color: #333333;
                //     overflow: hidden;
                //     text-overflow: ellipsis;
                //     white-space: nowrap;
                // }
                p {
                    float: left;
                    width: 242px;
                    font-size: 14px;
                    letter-spacing: 0px;
                    color: #333333;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }
            }
            .page-fl-coure-ul-max {
                margin-top: 10px;
            }
        }
    }
}
</style>
