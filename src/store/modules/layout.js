import * as types from '../mutation-types'

// state
export const state = {
  layout: 'basic-layout'
}

// getters
export const getters = {
  layout: state => state.layout,
}

// mutations
export const mutations = {
	[types.SET_LAYOUT] (state, newLayout) {
	state.layout = newLayout
	}
}

// actions
export const actions = {
	setLayout ({ commit }, layout) {
    commit(types.SET_LAYOUT, layout)
  }
}
