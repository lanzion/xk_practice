// 基地/机构--详情 --课程活动
<template>
    <div class="curriculum">
        <div class="curriculum-fl-coure">
            <ul class="curriculum-fl-coure-ul">
                <li v-for="(g,index) in datas" :key="index">
                    <div>
                        <ov-image :type="3" :src-data="g.cover" :img-height="'236px'"></ov-image>
                    </div>
                    <h3>{{g.name}}</h3>
                    <div class="curriculum-fl-coure-ul-min">
                        <span>课程分类:</span>
                        <span>{{g.parentName}}>>{{g.childrenName}}</span>
                    </div>
                    <div class="curriculum-fl-coure-ul-max">
                        <span>适合学段:</span>
                        <span>{{g.fit}}</span>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import { requestwebapibaseDetailcourse } from '@/api/webApi/base';
export default {
    name: 'curriculum',
    data() {
        return {
            datas: []
        }
    },
    created() {
        this.getCourselist()
    },
    methods: {
        async getCourselist() {
            this.isLoading = true
            let pages = {
                pageNum: 1,
                pageSize: 20
            }
            let baseId = this.$route.query.baseId
            if (baseId) {
                this.id = baseId
            } else {
                this.id = sessionStorage.getItem('baseId')
            }
            const res = await requestwebapibaseDetailcourse(
                { baseinfoId: this.id },
                pages
            )
            const { entity: datas = {} } = res.data
            try {
                let array = datas.resultData
                array.forEach(x => {
                    x.fit = this.filterFit(x.fit)
                })
                this.datas = array || []
            } catch (error) {
                this.datas = []
            } finally {
                this.isLoading = false
            }
        },
        filterFit(val) {
            let txt = '';
            if (val) {
                txt = val
                    .replace(/primarySchool_L/g, '小学初年级 ')
                    .replace(/primarySchool_H/g, '小学高年级')
                    .replace(/middleSchool/g, '初中')
                    .replace(/highSchool/g, '高中')
            }
            return txt
        }
    }
}
</script>
<style lang='scss' scoped>
.curriculum-fl-coure {
    .curriculum-fl-coure-ul {
        overflow: hidden;
        li {
            width: 380px;
            height: 334px;
            float: left;
            border: solid 1px #f3f3f3;
            margin-bottom: 48px;
            border-radius: 4px;
            margin-right: 27px;
            cursor: pointer;
            &:nth-child(3n) {
                margin-right: 0px;
            }
            &:hover {
                box-shadow: 0px 2px 2px 0px rgba(6, 0, 51, 0.19);
            }
            h3 {
                font-size: 16px;
                letter-spacing: 0px;
                color: #333333;
                padding: 0 10px;
                box-sizing: border-box;
                margin-top: 8px;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }
            .curriculum-fl-coure-ul-min,
            .curriculum-fl-coure-ul-max {
                font-size: 14px;
                letter-spacing: 0px;
                color: #666666;
                padding: 0 10px;
                box-sizing: border-box;
                margin-top: 15px;
            }
            .curriculum-fl-coure-ul-max {
                margin-top: 10px;
            }
        }
    }
}
</style>
