<template>
    <div class="serviceevaluation">
        <div class="listsdetail_fl_two_m">
            <h4>评论</h4>
            <div class="listsdetail_fl_two_m_b">
                <ul>
                    <li class="listsdetail_fl_two_m_s">
                        <div class="listsdetail_fl_two_m_s_one">
                            <img src alt />
                        </div>
                        <div class="listsdetail_fl_two_m_s_two">
                            <p>
                                <span>好名字</span>
                                <span>三年级二班:</span>
                            </p>
                            <span
                                class="textone"
                            >随意简单，但是可以发挥自己的想象力！随意简单，但是可以发挥自己的想象力！随意简单，但是可以发挥自己的想象力！随意简单，但是可以发挥自己的想象力！随意简单，但是可以发挥自己的想象力！</span>
                            <span class="texttwo">2019.05.05 22:34:12</span>
                        </div>
                        <div class="listsdetail_fl_two_m_s_thr">
                            <i class="el-icon-warning-outline"></i>
                            <span>举报</span>
                        </div>
                    </li>
                    <li class="listsdetail_fl_two_m_s">
                        <div class="listsdetail_fl_two_m_s_one">
                            <img src alt />
                        </div>
                        <div class="listsdetail_fl_two_m_s_two">
                            <p>
                                <span>好名字</span>
                                <span>三年级二班:</span>
                            </p>
                            <span
                                class="textone"
                            >随意简单，但是可以发挥自己的想象力！随意简单，但是可以发挥自己的想象力！随意简单，但是可以发挥自己的想象力！随意简单，但是可以发挥自己的想象力！随意简单，但是可以发挥自己的想象力！</span>
                            <span class="texttwo">2019.05.05 22:34:12</span>
                        </div>
                        <div class="listsdetail_fl_two_m_s_thr">
                            <i class="el-icon-warning-outline"></i>
                            <span>举报</span>
                        </div>
                    </li>

                    <li class="listsdetail_fl_two_m_s">
                        <div class="listsdetail_fl_two_m_s_one">
                            <img src alt />
                        </div>
                        <div class="listsdetail_fl_two_m_s_two">
                            <p>
                                <span>好名字</span>
                                <span>三年级二班:</span>
                            </p>
                            <span
                                class="textone"
                            >随意简单，但是可以发挥自己的想象力！随意简单，但是可以发挥自己的想象力！随意简单，但是可以发挥自己的想象力！随意简单，但是可以发挥自己的想象力！随意简单，但是可以发挥自己的想象力！</span>
                            <span class="texttwo">2019.05.05 22:34:12</span>
                        </div>
                        <div class="listsdetail_fl_two_m_s_thr">
                            <i class="el-icon-warning-outline"></i>
                            <span>举报</span>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'serviceevaluation'
}
</script>
<style lang="scss" scoped>
  .listsdetail_fl_two_m {
    padding: 20px 30px;
    width: 100%;
    box-sizing: border-box;
    h4 {
        font-size: 20px;
        color: #333;
        margin-bottom: 30px;
    }
    .listsdetail_fl_two_m_b {
        width: 100%;
        ul {
            height: 100%;
            width: 100%;
            .listsdetail_fl_two_m_s {
                height: 81px;
                width: 100%;
                overflow: hidden;
                margin-bottom: 30px;
                .listsdetail_fl_two_m_s_one {
                    float: left;
                    width: 80px;
                    height: 78px;
                    border-radius: 50%;
                    border: 1px solid #ccc;
                    margin-right: 27px;
                    overflow: hidden;
                    img {
                        width: 100%;
                        height: 100%;
                    }
                }
                .listsdetail_fl_two_m_s_two {
                    float: left;
                    width: 900px;
                    height: 100%;
                    p {
                        display: block;
                        margin-bottom: 12px;
                        span {
                            color: #008aff;
                            &:nth-child(1) {
                                display: inline-block;
                                font-size: 16px;
                            }
                            &:nth-child(2) {
                                display: inline-block;
                                font-size: 12px;
                            }
                        }
                    }
                    .textone {
                        height: 40px;
                        display: block;
                        font-size: 16px;
                        color: #333333;
                        display: -webkit-box;
                        -webkit-box-orient: vertical;
                        -webkit-line-clamp: 2;
                        overflow: hidden;
                        line-height: 18px;
                    }
                    .texttwo {
                        display: block;
                        font-size: 14px;
                        color: #cccccc;
                    }
                }
                .listsdetail_fl_two_m_s_thr {
                    float: right;
                    text-align: right;
                    cursor: pointer;
                    &:hover {
                        i {
                            color: #008aff;
                        }
                        span {
                            color: #008aff;
                        }
                    }
                    i {
                        display: inline-block;
                        width: 18px;
                        font-size: 12px;
                        color: #cccccc;
                    }
                    span {
                        font-size: 12px;
                        color: #cccccc;
                    }
                }
            }
        }
    }
}
</style>
