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
      auditorBorme: [],
      empleados: [],
      cuentasDisponibles: [],
      TipoCuentas: [],
      cnae: [],
      filtros: [{}]
    },
    applied_filters: [],
    selected_companies: 0,
    filters: [
      {
        name: "Ubicación",
        slug: "filter_ubicacion",
        offset: 290,
        apply: false,
        quantity: 0,
        key: 'comunidades',
        disabled: false
      },
      {
        name: "Antigüedad",
        slug: "filter_antiguedad",
        offset: 290,
        apply: false,
        quantity: 0,
        key: 'antiguedad',
        disabled: false
      },
      {
        name: "Número de empleados",
        slug: "filter_numero_de_empleados",
        offset: 150,
        apply: false,
        quantity: 0,
        key: 'empleados',
        disabled: false
      },
      {
        name: "Tipo de cuentas",
        slug: "filter_tipo_de_cuentas",
        offset: 290,
        apply: false,
        quantity: 0,
        key: 'TipoCuentas',
        disabled: false
      },
      {
        name: "Sector/Actividad",
        slug: "filter_sector_actividad",
        offset: 290,
        apply: false,
        quantity: 0,
        key: 'cnae',
        disabled: true
      },
      {
        name: "Estado",
        slug: "filter_estado",
        offset: 290,
        apply: false,
        quantity: 0,
        key: 'estado',
        disabled: true
      },
      {
        name: "Cargos",
        slug: "filter_cargos",
        offset: 290,
        apply: false,
        quantity: 0,
        key: 'cargos',
        disabled: true
      },
      {
        name: "Código Postal",
        slug: "filter_codigo_postal",
        offset: 290,
        apply: false,
        quantity: 0,
        key: 'codigosPostales',
        disabled: false
      },
      {
        name: "Nombre o razón social",
        slug: "filter_nombre_o_razon_social",
        offset: 290,
        apply: false,
        quantity: 0,
        key: 'razonSocial',
        disabled: false
      },
      {
        name: "NIF",
        slug: "filter_nif",
        offset: 150,
        apply: false,
        quantity: 0,
        key: 'cif',
        disabled: false
      },
      {
        name: "Años con cuentas disponibles",
        slug: "filter_anios_con_cuentas_disponibles",
        offset: 290,
        apply: false,
        quantity: 0,
        key: 'cuentasDisponibles',
        disabled: false
      },
      {
        name: "Auditores",
        slug: "filter_auditores",
        offset: 290,
        apply: false,
        quantity: 0,
        key: 'auditorBorme',
        disabled: true
      },
      {
        name: "Información Financiera",
        slug: "filter_informacion_financiera",
        offset: 290,
        apply: false,
        quantity: 0,
        key: 'informacion',
        disabled: true
      },
      {
        name: "Directivos y Vinculaciones",
        slug: "filter_directivos_y_vinculaciones",
        offset: 290,
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