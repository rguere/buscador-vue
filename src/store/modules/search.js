//comunidad automa 
//provincia
//localidad
//import axios from 'axios'
//import * as types from '../mutation-types'
import data from './../../assets/buscador-data.json'
// state


export const state = {
  search: data,
  provincia_localidad: data['provincia.localidad'] 
}

// getters
export const getters = {
  search: state => state.search,
  provincia_localidad: state => state.provincia_localidad,
}

// mutations
export const mutations = {
}

// actions
export const actions = {
}