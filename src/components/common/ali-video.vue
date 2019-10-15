<template>
    <div :id="id" class="ali-player--wrap">
        <video onReady src="http://vjs.zencdn.net/v/oceans.mp4"></video>
    </div>
</template>

<script>
import { requestAliVodApi } from '@/api/common.js'

export default {
    name: 'ali-video',
    data() {
        return {
            player: null
        }
    },
    props: {
        id: {
            type: String,
            default: 'ali-player'
        },
        // 视频播放配置
        resourceId: String,
        // 播放器宽度
        width: {
            type: String,
            default: '100%'
        },
        // 播放器高度
        height: String,
        // 播放事件
        onPlay: Function,
        // 播放暂停事件
        onPause: Function,
        // 播放结束事件
        onEnded: Function,
        // 视频可播放状态
        onReady: Function
    },
    mounted() {
        this.init()
    },
    watch: {
        resourceId: {
            handler: function (resourceId) {
                if (resourceId) {
                    this.init()
                }
            },
            deep: true
        }
    },
    beforeDestroy() {
        this.player.dispose()
    },
    methods: {
        async init(resourceId = this.resourceId, params = {}) {
            const isUrl = /(http(s)?:\/\/)/i.test(resourceId)
            const __params = isUrl ? { source: resourceId } : await this.getVideoIdParams(resourceId)
            Object.assign(__params, params)

            if (this.player) {
                if (isUrl) {
                    this.player.loadByUrl(resourceId)
                } else {
                    this.player.replayByVidAndPlayAuth(resourceId, __params.playauth)
                }
            } else {
                this.initPlayer(__params)
            }
        },
        // 获取公共返回参数
        // action参照：https://help.aliyun.com/document_detail/60574.html?spm=5176.10609282.905295..62e57cbfDIwSGU
        getAliVodRes({ videoId, action } = {}) {
            return requestAliVodApi({ videoId: videoId, action: action }).then(res => {
                const { code, entity: datas } = res.data
                if (code === 200) {
                    return JSON.parse(datas)
                }
            })
        },
        // params参见：https://help.aliyun.com/document_detail/51991.html?spm=5176.11065259.1996646101.searchclickresult.3ad027adAzxiNf
        initPlayer(params) {
            if (this.player) {
                this.player.dispose()
            }
            const __params = Object.assign({
                id: this.id,
                width: this.width,
                autoplay: false
            }, params)
            this.height && (__params.height = this.height)
            
            this.player = new Aliplayer(__params, (player) => {
                console.log('播放器创建好了。')
                this.onPlay && player.on('play', this.onPlay)
                this.onPause && player.on('pause', this.onPause)
                this.onEnded && player.on('ended', this.onEnded)
                this.onReady && player.on('ready', this.onReady)
            })
        },
        async getVideoIdParams(videoId) {
            // 获取playAuth(视频播放的唯一凭证)
            const result = await this.getAliVodRes({ videoId, action: 'GetVideoPlayAuth' })
            const params = {
                vid: videoId,
                playauth: result.PlayAuth,
                cover: result.VideoMeta.CoverURL
            }
            return params
        }

    }
}
</script>

<style lang="scss" scoped>
    @import '~@/assets/css/base/utils.scss';
    @import '~@/assets/css/mixin/core.scss';

    .ali-player--wrap {
        height: 0 !important;
        @include ratio($--video-ratio-width);
    }
</style>

<style lang="scss">
    .ali-player--wrap {
        .prism-big-play-btn {
            top: 50% !important;
            left: 50% !important;
            transform: translate(-50%, -50%);
        }
    }
</style>
