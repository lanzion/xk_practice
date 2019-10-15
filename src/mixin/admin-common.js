export default {
    data() {
        const pageSize = localStorage.getItem('pageSize')
        return {
            isLoading: false,
            pages: {
                pageNum: Number(((this.$route || {}).query || {}).pageNum || 1),
                pageSize: Number(pageSize || ((this.$route || {}).query || {}).pageSize || 10)
            },
            totalNum: 0
        }
    }
}
