import xhr from 'Axios'

// 设置头像
let modifyUserFace = (options = {}) => xhr.post('/portal/user/setUserFace', options)

export {
    modifyUserFace
}
