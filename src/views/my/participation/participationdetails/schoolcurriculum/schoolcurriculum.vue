<template>
    <div class="schoolpracticecourse">
        <div class="container">
            <div class="container_one">
                <div class="container_one_conent">
                    <ul>
                        <li
                            class="container_one_conent_li"
                            @click="goone(g.id)"
                            v-for="(g,index) in datas"
                            :key="index"
                        >
                            <div class="container_one_conent_img">
                                <ov-image :src-data="getFileUrl(g.cover)"></ov-image>
                            </div>
                            <div class="container_one_conent_name">
                                <p>{{g.name}}</p>
                            </div>
                            <div class="container_one_conent_show">
                                <span>{{arr[g.fit-1]}}</span>
                                <span>
                                    参与
                                    <i>{{g.stuNum}}</i>人
                                </span>
                            </div>
                        </li>
                    </ul>
                    <no-data v-if="nomore"></no-data>
                    <div
                        class="block"
                        :style="{'float':'right','paddingRight':'20px','marginTop':'30px'}"
                    >
                        <pagination
                            :param="pages"
                            :page-sizes="[12, 20, 28]"
                            :total="totalNum"
                            @change="getlist"
                        ></pagination>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { listofpracticalcourses } from "@/api/frontstage";
export default {
    name: "schoolpracticecourse",
    data() {
        return {
            datas: [],
            arr: ["小学", "初中", "高中"],
            nomore: false,
            pages: {
                pageNum: 1,
                pageSize: 12
            }
        };
    },
    created() {
        this.getlist();
    },
    watch: {
        "datas.length": {
            handler(newval, oldval) {
                if (newval === 0) {
                    this.nomore = true;
                } else {
                    this.nomore = false;
                }
            },
            deep: true
        }
    },
    methods: {
        async getlist() {
            let uid = this.$route.query.id;
            let sid = localStorage.getItem("sid");
            let id = "";
            if (uid) {
                id = uid;
            } else {
                id = sid;
            }
            let res = await listofpracticalcourses(
                { schoolId: id },
                this.pages
            );
            this.datas = res.data.entity.resultData;
            this.totalNum = res.data.entity.totalNum || 0;
            this.pageSize = 12;
        },

        goone(id) {
            localStorage.setItem("mid", id);
            this.$router.push({ path: "/goods", qurey: { id: id } });
        }
    }
};
</script>
<style lang="scss" scoped>
.container {
    margin-top: 20px;
    margin-bottom: 120px;
    .container_one {
        background: #fff;
        padding-bottom: 30px;
        .container_one_conent {
            width: 100%;
            height: 100%;
            overflow: hidden;
            padding-top: 20px;
            box-sizing: border-box;
            ul {
                width: 100%;
                height: 100%;
                overflow: hidden;
                .container_one_conent_li {
                    width: 270px;
                    height: 260px;
                    float: left;
                    margin-right: 40px;
                    margin-bottom: 20px;
                    &:hover {
                        box-shadow: 2px 2px 5px 0px #cacaca;
                        .container_one_conent_name {
                            p {
                                color: #008aff;
                            }
                        }
                    }
                    &:nth-child(4n) {
                        margin-right: 0px;
                    }
                    .container_one_conent_img {
                        width: 100%;
                        height: 180px;
                        overflow: hidden;
                        background: #ccc;
                        img {
                            width: 100%;
                            height: 100%;
                        }
                    }
                    .container_one_conent_name {
                        width: 100%;
                        height: 30px;
                        padding: 0 16px;
                        box-sizing: border-box;
                        p {
                            font-size: 14px;
                            color: #333333;
                            line-height: 30px;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            white-space: nowrap;
                        }
                    }
                    .container_one_conent_show {
                        width: 100%;
                        padding: 0 16px;
                        height: 30px;
                        box-sizing: border-box;
                        span {
                            display: block;
                            width: 80px;
                            height: 100%;
                            line-height: 30px;
                            &:nth-child(1) {
                                float: left;
                                color: #999;
                            }
                            &:nth-child(2) {
                                float: right;
                                text-align: right;
                                color: #999;
                                i {
                                    color: #666;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}
</style>
