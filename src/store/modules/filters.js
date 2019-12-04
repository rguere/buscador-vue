//import axios from 'axios'
import * as types from '../mutation-types'

const initialState = () => {
  return {
    form: {
      codigosPostales: [],
      comunidades: [],
      Provincias: [],
      Localidades: []
    },
    applied_filters: [],
    selected_companies: 0,
    filters: [
      {
        name: "Ubicación",
        slug: "filter_ubicacion",
        apply: false,
        quantity: 0,
      },
      {
        name: "Antigüedad",
        slug: "filter_antiguedad",
        apply: false,
        quantity: 0,
      },
      {
        name: "Número de empleados",
        slug: "filter_numero_de_empleados",
        apply: false,
        quantity: 0,
      },
      {
        name: "Estado",
        slug: "filter_estado",
        apply: false,
        quantity: 0,
      },
      {
        name: "Tipo de cuentas",
        slug: "filter_tipo_de_cuentas",
        apply: false,
        quantity: 0,
      },
      {
        name: "Sector/Actividad",
        slug: "filter_sector_actividad",
        apply: false,
        quantity: 0,
      },
      {
        name: "Cargos",
        slug: "filter_cargos",
        apply: false,
        quantity: 0,
      },
      {
        name: "Código Postal",
        slug: "filter_codigo_postal",
        apply: false,
        quantity: 0,
      },
      {
        name: "Nombre o razón social",
        slug: "filter_nombre_o_razon_social",
        apply: false,
        quantity: 0,
      },
      {
        name: "NIF",
        slug: "filter_nif",
        apply: false,
        quantity: 0,
      },
      {
        name: "Años con cuentas disponibles",
        slug: "filter_anios_con_cuentas_disponibles",
        apply: false,
        quantity: 0,
      },
      {
        name: "Información Financiera",
        slug: "filter_informacion_financiera",
        apply: false,
        quantity: 0,
      },
      {
        name: "Auditores",
        slug: "filter_auditores",
        apply: false,
        quantity: 0,
      },
      {
        name: "Directivos y Vinculaciones",
        slug: "filter_directivos_y_vinculaciones",
        apply: false,
        quantity: 0,
      }
    ]
  }
}

// state
export const state = initialState()

// getters
export const getters = {
  form: state => state.form,
  applied_filters: state => state.applied_filters,
  selected_companies: state => state.selected_companies,
  filters: state => state.filters,
}

// mutations
export const mutations = {
  [types.RESET_FILTER](state, { initial }) {
    for (const prop in initial) {
      state[prop] = initial[prop]
    }
  },

  [types.ADD_FILTER](state, { name, quantity }) {
    state.applied_filters.push(name)
    state.filters = state.filters.map((elem) => {
      if (elem.name === name) {
        elem.apply = true
        elem.quantity = quantity
      }
      return elem;
    })
  },
  
  [types.REMOVE_FILTER](state, { filter }) {
    state.applied_filters = state.applied_filters.filter(_filter => _filter !== filter)
    state.filters = state.filters.map((elem) => {
      if (elem.name === filter) {
        elem.apply = false
        elem.quantity = 0
      }
      return elem;
    })
  },

  [types.SET_SELECTED_COMPANIES](state, { quantity }) {
    state.selected_companies = quantity 
  }
}

// actions
export const actions = {
  resetFilter({ commit }) {
    commit(types.RESET_FILTER, { 
      initial: initialState() 
    })
  },
  addFilters({ commit }, { name, quantity }) {
    if (!state.applied_filters.includes(name)) {
      commit(types.ADD_FILTER, {
        name: name,
        quantity: quantity
      })
    }
  },
  removeFilters({ commit }, filter) {
    if (state.applied_filters.includes(filter)) {
      commit(types.REMOVE_FILTER, {
        filter: filter
      })
    }
  },
  updateNumberSelectedCompanies({ commit }, { quantity }) {
    commit(types.SET_SELECTED_COMPANIES, {
      quantity
    })
  },
}