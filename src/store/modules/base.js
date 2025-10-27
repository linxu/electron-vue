const state = {
  appInfo: {},
}

const getters = {
  appInfo(state) {
    return state.appInfo;
  }
}

const actions = {
    // 提交异步操作
    async getAppInfo({ commit }) {
        // let res = await _this.$Geting(_this.$api.getUserInfo)
        commit('setAppInfo', {
          name: 'Electron Vue',
          version: 1
        });
    }
}

const mutations = {
    // 提交同步操作
    setAppInfo(state, playLoad) {
        state.appInfo = { ...playLoad }
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}
