const state = {
    isok: false,
    title: '',
    conent: '',
    courseId: '',
    aydetailsId: '',
    istrue: true,
    active: 1,
    bannerimgurl: '',
    workname: '',
    listname: '',
    showname: '',
    newname: '',
    teacherworkname: '',
    teachernewworks: '',
    teachernamefen: '',
    activitytitle: '',
    stu_id_list: null,
}
const mutations = {
    changeisok(state, payload = {}) {
        state.isok = payload
    },
    changetitle(state, payload = {}) {
        state.title = payload
    },
    changeconent(state, payload = {}) {
        state.conent = payload
    },
    changecourseId(state, payload = {}) {
        state.courseId = payload
    },
    changeaydetailsId(state, payload = {}) {
        state.aydetailsId = payload
    },
    changeistrue(state, payload = {}) {
        state.istrue = payload
    },
    changeactive(state, payload = {}) {
        state.active = payload
    },
    changesurl(state, payload = {}) {
        state.bannerimgurl = payload
    },
    changework(state, payload = {}) {
        state.workname = payload
    },
    changelist(state, payload = {}) {
        state.listname = payload
    },
    changeshowname(state, payload = {}) {
        state.showname = payload
    },
    changenewname(state, payload = {}) {
        state.newname = payload
    },
    teacherworkname(state, payload = {}) {
        state.teacherworkname = payload
    },
    teachernewworkss(state, payload = {}) {
        state.teachernewworks = payload
    },
    getteachername(state, payload = {}) {
        state.teachernamefen = payload
    },
    changeactivitytitle(state, payload = {}) {
        state.activitytitle = payload
    },
    changeastu_id_list(state, payload = {}) {
        state.stu_id_list = payload
    },
}
const getters = {
    gettitle(state) {
        return state.title
    }
}
const action = {

}
export default {
    state,
    mutations,
    getters,
    action
}
