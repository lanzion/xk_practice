<template>
    <footer class="footer">
        <div class="container">
            <div class="content-wrap table-layout">
                <section class="links-wrap table-cell">
                    <ul class="operate-wrap clearfix">
                        <li class="operate-item fl" @click="addFavorite">加入收藏</li>
                        <li class="operate-item fl" @click="setHomepage">设为首页</li>
                    </ul>
                    <ul class="link-wrap">
                        <h6 class="link-title">友情链接：<a href="http://www.xk100.com">创客集结号</a></h6>
                        <a class="link-item" v-for="(item) in link" :href="item.linkUrl" :target="item.target" :key="item.id">{{ item.linkName }}</a>
                    </ul>
                </section>
                <section class="wechat-wrap table-cell">
                    <img src="~@/assets/image/wechat.png" class="wechat-image">
                    <span class="wechat-txt">微信公众号</span>
                </section>
                <section class="info-wrap table-cell">
                    <h6 class="title">广东习课智能科技有限公司</h6>
                    <p>联系电话：020-37579580</p>
                    <p>邮箱：service@xk100.com</p>
                    <p>地址：广州市天河区科韵路16号广州信息港B座301A</p>
                </section>
            </div>
        </div>
        <div class="copyright-wrap">
            <p class="container">
                <span>COPYRIGHT© 2015-2020 XIKE.ALL RIGHTS RESERVED 粤ICP备14047309号-1</span>
                <span>版权所有：广东习课智能科技有限公司</span>
            </p>
        </div>
    </footer>
</template>

<script>
// import { requestLinkList } from '@/api/common'

export default {
    data() {
        return {
            link: []
        }
    },
    mounted() {
        // this.getLinkDatas()
    },
    methods: {
        addFavorite() {
            const url = window.location.href
            const title = ''
            try {
                window.external.addFavorite(url, title)
            } catch (e) {
                try {
                    window.sidebar.addPanel(title, url, '')
                } catch (error) {
                    alert('抱歉，您所使用的浏览器无法完成此操作。\n\n加入收藏失败，请使用Ctrl+D进行添加')
                }
            }
        },

        setHomepage() {
            const url = window.location.href
            if (document.all) {
                document.body.style.behavior = 'url(#default#homepage)'
                document.body.setHomePage(url)
            } else {
                alert('抱歉，您的浏览器不支持自动设置页面为首页功能，\n请您手动在浏览器里设置该页面为首页。')
            }
        },

        // getLinkDatas() {
        //     requestLinkList({}, { pageSize: 10, pageNum: 1 }).then(res => {
        //         const { code, entity = {} } = res.data
        //         if (code === 200) {
        //             this.link = (entity.resultData || []).map(x => {
        //                 x.target = x.targetType ? '_self' : '_blank'
        //                 return x
        //             })
        //         }
        //     })
        // }
    }
}
</script>

<style lang="scss" scoped>
    @import '~@/assets/css/base/utils.scss';

    .footer {
        background-color: #3e3e3e;
        color: #fff;
        // min-width: 1200px;
    }

    .content-wrap {
        padding: 30px 0 27px;
    }

    .operate-wrap {
        $padding: 18px;
        margin-left: - $padding;

        .operate-item {
            display: inline-block;
            padding: 0 $padding;
            line-height: 8px;
            cursor: pointer;

            & + .operate-item {
                border-left: 1px solid;
            }
        }
    }

    .link-wrap {
        margin-top: 30px;
        color: #888;

        .link-title {
            display: inline-block;
            a{
                color: #888;
            }
        }

        .link-item {
            display: inline-block;
            margin-right: 30px;
            color: inherit;
            cursor: pointer;
        }
    }

    .wechat-wrap {
        $qrcode-width: 100px;
        width: $qrcode-width;
        text-align: center;
        color: #888;

        .wechat-image {
            width: $qrcode-width;
            padding: 5px;
            box-sizing: border-box;
            background-color: #fff;
        }

        .wechat-txt {
            display: block;
            margin-top: 10px;
        }
    }

    .info-wrap {
        width: 300px;
        padding-left: 20px;
        line-height: 1.5;
        vertical-align: top;

        .title {
            font-size: 18px;
            line-height: 48px;
        }
    }

    .copyright-wrap {
        $copyright-height: 40px;
        height: $copyright-height;
        line-height: $copyright-height;
        background-color: #333;
        color: #999;
        text-align: center;
    }
</style>
