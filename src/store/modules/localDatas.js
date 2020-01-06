//import axios from 'axios'
import * as types from '../mutation-types'

const initialState = () => {
  return {
    localDatas: {
    }
  }
}

// state
export const state = initialState()

// getters
export const getters = {
  localDatas: state => state.localDatas,
}

// mutations
export const mutations = {
  [types.SET_LOCAL_DATAS](state, { key, data }) {
    state.localDatas[key] = data
  },
}

// actions
export const actions = {
  setLocalDatas({ commit }, { key, data }) {
    commit(types.SET_LOCAL_DATAS, {
      key,
      data
    })
  },
}