import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const screenStore = new Vuex.Store({
  state: {
    isFull: false
  },
  mutations: {
    setToFull(state) {
      state.isFull = true
    },
    setToMin(state) {
      state.isFull = false
    }
  }
})

export default screenStore
