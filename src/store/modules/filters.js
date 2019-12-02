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
      },
      {
        name: "Antigüedad",
        slug: "filter_antiguedad",
        apply: false,
      },
      {
        name: "Número de empleados",
        slug: "filter_numero_de_empleados",
        apply: false,
      },
      {
        name: "Estado",
        slug: "filter_estado",
        apply: false,
      },
      {
        name: "Tipo de cuentas",
        slug: "filter_tipo_de_cuentas",
        apply: false,
      },
      {
        name: "Sector/Actividad",
        slug: "filter_sector_actividad",
        apply: false,
      },
      {
        name: "Cargos",
        slug: "filter_cargos",
        apply: false,
      },
      {
        name: "Código Postal",
        slug: "filter_codigo_postal",
        apply: false,
      },
      {
        name: "Nombre o razón social",
        slug: "filter_nombre_o_razon_social",
        apply: false,
      },
      {
        name: "NIF",
        slug: "filter_nif",
        apply: false,
      },
      {
        name: "Años con cuentas disponibles",
        slug: "filter_anios_con_cuentas_disponibles",
        apply: false,
      },
      {
        name: "Información Financiera",
        slug: "filter_informacion_financiera",
        apply: false,
      },
      {
        name: "Auditores",
        slug: "filter_auditores",
        apply: false,
      },
      {
        name: "Directivos y Vinculaciones",
        slug: "filter_directivos_y_vinculaciones",
        apply: false,
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

  [types.ADD_FILTER](state, { filter }) {
    state.applied_filters.push(filter)
    state.filters = state.filters.map((elem) => {
      if (elem.name === filter) { elem.apply = true }
      return elem;
    })
  },
  
  [types.REMOVE_FILTER](state, { filter }) {
    state.applied_filters = state.applied_filters.filter(_filter => _filter !== filter)
    state.filters = state.filters.map((elem) => {
      if (elem.name === filter) { elem.apply = false }
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
  addFilters({ commit }, filter) {
    if (!state.applied_filters.includes(filter)) {
      commit(types.ADD_FILTER, {
        filter: filter
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