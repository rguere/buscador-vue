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
        slug: "filter_ubicacion"
      },
      {
        name: "Antigüedad",
        slug: "filter_antiguedad"
      },
      {
        name: "Número de empleados",
        slug: "filter_numero_de_empleados"
      },
      {
        name: "Estado",
        slug: "filter_estado"
      },
      {
        name: "Tipo de cuentas",
        slug: "filter_tipo_de_cuentas"
      },
      {
        name: "Sector/Actividad",
        slug: "filter_sector_actividad"
      },
      {
        name: "Cargos",
        slug: "filter_cargos"
      },
      {
        name: "Código Postal",
        slug: "filter_codigo_postal"
      },
      {
        name: "Nombre o razón social",
        slug: "filter_nombre_o_razon_social"
      },
      {
        name: "NIF",
        slug: "filter_nif"
      },
      {
        name: "Años con cuentas disponibles",
        slug: "filter_anios_con_cuentas_disponibles"
      },
      {
        name: "Información Financiera",
        slug: "filter_informacion_financiera"
      },
      {
        name: "Auditores",
        slug: "filter_auditores"
      },
      {
        name: "Directivos y Vinculaciones",
        slug: "filter_directivos_y_vinculaciones"
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
  },
  
  [types.REMOVE_FILTER](state, { filter }) {
    state.applied_filters = state.applied_filters.filter(_filter => _filter !== filter)
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