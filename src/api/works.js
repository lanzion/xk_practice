import xhr from 'Axios'

/* 作品管理
-------------------------- */
// 作品管理 - 列表(后台)
const requestAdminWorksList = (options = {}, page) => xhr.post(`/maker/work/selectAmdinPager?pageNum=${page.pageNum}&pageSize=${page.pageSize}`, options)

export {
    requestAdminWorksList
}
