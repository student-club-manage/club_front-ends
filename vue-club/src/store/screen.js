const state = () => ({
  isFull: false
})

const mutations = {
  setToFull(state) {
    state.isFull = true
  },
  setToMin(state) {
    state.isFull = false
  }
}

const actions = {
  setToFull({ commit }) {
    commit('setToFull')
  },
  setToMin({ commit }) {
    commit('setToMin')
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
