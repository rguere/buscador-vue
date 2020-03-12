//import axios from 'axios'
import * as types from '../mutation-types'

const initialState = () => {
  return {
    form: {
      codigosPostales: [],
      cif: [],
      comunidades: [],
      Provincias: [],
      Localidades: [],
      antiguedad: [],
      razonSocial: [],
      empleados: [],
      cuentasDisponibles: [],
      filtros: [{}]
    },
    applied_filters: [],
    selected_companies: 0,
    filters: [
      {
        name: "Ubicación",
        slug: "filter_ubicacion",
        apply: false,
        quantity: 0,
        key: 'comunidades',
        disabled: false
      },
      {
        name: "Antigüedad",
        slug: "filter_antiguedad",
        apply: false,
        quantity: 0,
        key: 'antiguedad',
        disabled: false
      },
      {
        name: "Número de empleados",
        slug: "filter_numero_de_empleados",
        apply: false,
        quantity: 0,
        key: 'empleados',
        disabled: false
      },
      {
        name: "Estado",
        slug: "filter_estado",
        apply: false,
        quantity: 0,
        key: 'estado',
        disabled: true
      },
      {
        name: "Tipo de cuentas",
        slug: "filter_tipo_de_cuentas",
        apply: false,
        quantity: 0,
        key: 'tipo',
        disabled: false
      },
      {
        name: "Sector/Actividad",
        slug: "filter_sector_actividad",
        apply: false,
        quantity: 0,
        key: 'actividad',
        disabled: true
      },
      {
        name: "Cargos",
        slug: "filter_cargos",
        apply: false,
        quantity: 0,
        key: 'cargos',
        disabled: true
      },
      {
        name: "Código Postal",
        slug: "filter_codigo_postal",
        apply: false,
        quantity: 0,
        key: 'codigosPostales',
        disabled: false
      },
      {
        name: "Nombre o razón social",
        slug: "filter_nombre_o_razon_social",
        apply: false,
        quantity: 0,
        key: 'razonSocial',
        disabled: false
      },
      {
        name: "NIF",
        slug: "filter_nif",
        apply: false,
        quantity: 0,
        key: 'cif',
        disabled: false
      },
      {
        name: "Años con cuentas disponibles",
        slug: "filter_anios_con_cuentas_disponibles",
        apply: false,
        quantity: 0,
        key: 'cuentasDisponibles',
        disabled: false
      },
      {
        name: "Información Financiera",
        slug: "filter_informacion_financiera",
        apply: false,
        quantity: 0,
        key: 'informacion',
        disabled: true
      },
      {
        name: "Auditores",
        slug: "filter_auditores",
        apply: false,
        quantity: 0,
        key: 'auditores',
        disabled: true
      },
      {
        name: "Directivos y Vinculaciones",
        slug: "filter_directivos_y_vinculaciones",
        apply: false,
        quantity: 0,
        key: 'vinculaciones',
        disabled: true
      }
    ],
    cantidades: {}
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
  cantidades: state => state.cantidades,
}

// mutations
export const mutations = {
  [types.RESET_FILTER](state, { initial }) {
    for (const prop in initial) {
      state[prop] = initial[prop]
    }
  },

  [types.ADD_FILTER](state, { name, quantity, cantidades }) {
    state.applied_filters.push(name)
    state.filters = state.filters.map((elem) => {
      if (elem.name === name) {
        elem.apply = true
        elem.quantity = quantity
      }
      return elem;
    })
    state.cantidades = cantidades
  },

  [types.SET_QUANTITIES](state, {name, quantity, cantidades }) {
    state.filters = state.filters.map((elem) => {
      if (elem.name === name) {
        elem.apply = true
        elem.quantity = quantity
      }
      return elem;
    })
    state.cantidades = cantidades
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
  },

  [types.SET_CANTIDADES](state, { cantidades }) {
    state.cantidades = cantidades 
  }
}

// actions
export const actions = {
  resetFilter({ commit }) {
    commit(types.RESET_FILTER, { 
      initial: initialState() 
    })
  },
  addFilters({ commit }, { name, quantity, cantidades }) {
    if (!state.applied_filters.includes(name)) {
      commit(types.ADD_FILTER, {
        name: name,
        quantity: quantity,
        cantidades: cantidades
      })
    }else {
      commit(types.SET_QUANTITIES, {
        name: name,
        quantity: quantity,
        cantidades: cantidades
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
  setCantidades({ commit }, { cantidades }) {
    commit(types.SET_CANTIDADES, {
      cantidades
    })
  },
}