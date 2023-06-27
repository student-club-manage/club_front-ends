import Vue from 'vue'
import Vuex from 'vuex'
import screen from './screen'
import user from './user'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    screen,
    user
  }
})

export default store
