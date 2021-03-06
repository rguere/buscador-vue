//import axios from 'axios'
import Cookies from 'js-cookie'
import * as types from '../mutation-types'

let dataJson = JSON.parse(localStorage.getItem("dataJson"))

// state
export const state = {
  user: (dataJson 
    && dataJson.user
    && dataJson.user.length != 0
    && dataJson.user[0].username.length != 0) ? dataJson.user[0]: null,
  token: (dataJson && dataJson.token)? dataJson.token: Cookies.get('token')
}

// getters
export const getters = {
  user: state => state.user,
  token: state => state.token,
  check: state => state.user !== null
}

// mutations
export const mutations = {
  [types.SAVE_TOKEN] (state, { token, remember }) {
    state.token = token
    Cookies.set('token', token, { expires: remember ? 365 : null })
  },

  [types.FETCH_USER_SUCCESS] (state, { user }) {
    state.user = user
  },

  [types.FETCH_USER_FAILURE] (state) {
    state.token = null
    Cookies.remove('token')
  },

  [types.LOGOUT] (state) {
    state.user = null
    state.token = null

    Cookies.remove('token')
  },

  [types.UPDATE_USER] (state, { user }) {
    state.user = user
  }
}

// actions
export const actions = {
  saveToken ({ commit }, payload) {
    commit(types.SAVE_TOKEN, payload)
  },

  async fetchUser ({ commit }) {
    try {
      const data = {email: '', username: ''} //await axios.get('/api/user')

      commit(types.FETCH_USER_SUCCESS, { user: data })
    } catch (e) {
      commit(types.FETCH_USER_FAILURE)
    }
  },

  updateUser ({ commit }, payload) {
    commit(types.UPDATE_USER, payload)
  },

  logout ({ commit }) { //async
    /*try {
      await axios.post('/api/logout')
    } catch (e) {
      console.error(e)
    }*/

    commit(types.LOGOUT)
  }
}
