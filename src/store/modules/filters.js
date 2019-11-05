//import axios from 'axios'
import * as types from '../mutation-types'
import data from './../../assets/buscador-data.json'


// state
export const state = {
  filters_labels: [
    'Ubicación',
    'Antigüedad',
    'Número de empleados',
    'Estado',
    'Tipo de cuentas',
    'Sector/Actividad',
    'Cargos',
    'Código Postal',
    'Nombre o razón social',
    'NIF',
    'Años con cuentas disponibles',
    'Información Financiera',
    'Auditores',
    'Directivos y Vinculaciones'
  ],
  filters: [],
  selected_companies: 100000,
  ...data
}

// getters
export const getters = {
  filters_labels: state => state.filters_labels,
  filters: state => state.filters,
  selected_companies: state => state.selected_companies,
}

// mutations
export const mutations = {
  [types.ADD_FILTER](state, {
    filter
  }) {
    state.filters.push(filter)
  },
  [types.REMOVE_FILTER](state, {
    filter
  }) {
    state.filters = state.filters.filter(_filter => _filter !== filter)
  }
}

// actions
export const actions = {
  addFilters({ commit }, filter) {
    if (!state.filters.includes(filter)) {
      commit(types.ADD_FILTER, {
        filter: filter
      })
    }
  },
  removeFilters({
    commit
  }, filter) {
    if (state.filters.includes(filter)) {
      commit(types.REMOVE_FILTER, {
        filter: filter
      })
    }
  },
}