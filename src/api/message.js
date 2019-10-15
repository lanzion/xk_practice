import xhr from 'Axios'

/* 系统消息
-------------------------- */
// 系统消息 - 列表
const requestMessageList = (options = {}, page) => xhr.post(`/pk/systemMessage/selectSystemMessageList?pageNum=${page.pageNum}&pageSize=${page.pageSize}`, options)
// 系统消息 - 未读消息
const countMessage = (options = {}) => xhr.post(`/pk/systemMessage/selectSystemMessageHint`, options)
// 系统消息 - 标记已读
const readMessage = (options = {}) => xhr.post(`/pk/systemMessageRead/updateReads`, options)
// 系统消息 - 删除
const delMessage = (options = {}) => xhr.post(`/pk/systemMessageRead/delByIds`, options)

export {
    requestMessageList,
    countMessage,
    readMessage,
    delMessage
}
