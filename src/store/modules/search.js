//comunidad automa 
//provincia
//localidad
import axios from 'axios'
import * as types from '../mutation-types'

// state
export const state = {
  search: {
    provincia_localidad: []
  },
}

// getters
export const getters = {
  search: state => state.search,
}

// mutations
export const mutations = {
  [types.FETCH_SEARCH] (state, { search }) {
    state.search = search
  }
}

// actions
export const actions = {
  async fetchSearch({ commit }) {
    try {
      const { data } = await axios.get('/test2')

      commit(types.FETCH_SEARCH, {
        search: data
      })
    } catch (e) {
      commit(types.FETCH_SEARCH, {
        search: state.search
      })
    }
  },
  async filtrarUbicacion({ commit }, filters) {
    try {
      const { data } = await axios.post('/filtrar', filters)

      commit(types.FETCH_SEARCH, {
        search: data
      })
    } catch (e) {
      commit(types.FETCH_SEARCH, {
        search: state.search
      })
    }
  }
}