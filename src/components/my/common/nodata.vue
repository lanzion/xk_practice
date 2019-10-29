<template>
    <div class="nodata">
        <img src="~@assets/image/nothingData.svg" alt />
        <div class="nodata_over">
            <i>暂无数据...</i>
        </div>
    </div>
</template>
<script>
export default {
    name: 'no-data'
}
</script>
<style lang="scss" scoped>
.nodata {
    width: 100%;
    height: 380px;
    background: #fff;
    text-align: center;
    .nodata_over {
        line-height: 0;
        i {
            font-size: 18px;
        }
    }
}
</style>
