import axios from 'axios'
import * as types from '../mutation-types'

// state
export const state = {
  loading: false,
  search: {
    cantidad: 0,
    antiguedad: [],
    empleados: [],
    provincia: [],
    provincia_localidad: [],
    auditor: [],
    cnae: [],
    industria: [],
  },
}

// getters
export const getters = {
  loading: state => state.loading,
  search: state => state.search,
}

// mutations
export const mutations = {
  [types.FETCH_SEARCH] (state, { search }) {
    state.search = search
    state.loading = false
  },
  [types.LOADING_SEARCH] (state, { loading }) {
    state.loading = loading
  },
}

// actions
export const actions = {
  async fetchSearch({ commit }) {
    try {
      commit(types.LOADING_SEARCH, {
        loading: true
      })
      const { data } = await axios.get('/buscador/resumen')

      commit(types.FETCH_SEARCH, {
        search: data
      })
    } catch (e) {
      commit(types.FETCH_SEARCH, {
        search: state.search
      })
    }
  },
  async filtrar({ commit }, filters) {
    try {
      commit(types.LOADING_SEARCH, {
        loading: true
      })
      const { data } = await axios.post('/buscador/filtrar?resumen=false', filters)

      commit(types.LOADING_SEARCH, {
        loading: false
      })

      return data

    } catch (e) {
      commit(types.LOADING_SEARCH, {
        loading: false
      })
    }
  },
  async validateZipCodes({ commit }, zip_codes){
    try{
      const { data } = await axios.post('/buscador/codigoPostal/validar', {lista: zip_codes})
      return data
    } catch (e) {
     commit(types.LOADING_SEARCH, {
        loading: false
      })
    }
  }
}