//comunidad automa 
//provincia
//localidad
//import axios from 'axios'
//import * as types from '../mutation-types'
//import { objectToArray } from './../../utils'
import data from './../../assets/buscador-data.json'

// state
export const state = {
  search: data,
}

// getters
export const getters = {
  search: state => state.search,
}

// mutations
export const mutations = {
}

// actions
export const actions = {
}