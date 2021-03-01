import Vue from 'vue'
import Vuex from 'vuex'
import usersAPI from '../apis/Users'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentUser: {
      id: -1,
      name: '',
      email: '',
      image: '',
      isAdmin: false,
    },
    isAuthenticated: false,
  },
  //用commit 發動mutations
  mutations: {
    setCurrentUser (state, currentUser) {
      state.currentUser = {
        ...state.currentUser,
        // 將 API 取得的 currentUser 覆蓋掉 Vuex state 中的 currentUser
        ...currentUser
      }
      // 將使用者的登入狀態改為 true
      state.isAuthenticated = true
    }
  },
  // 用dispatch發動actions
  actions: {
    async fetchCurrentUser ({ commit }) {
      try {
        const { data } = await usersAPI.getCurrentUser()
        if (data.status === 'error') {
          throw new Error(data.message)
        }

        const { id, name, email, image, isAdmin } = data

        //console.log('data', data)
        commit('setCurrentUser', {
          id,
          name,
          email,
          image,
          isAdmin
        })

      }
      catch (error) {
        console.log(error)
      }
    }
  },
  modules: {
  }
})
