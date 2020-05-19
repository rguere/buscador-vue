import * as types from "../mutation-types";

const structure = localStorage.getItem("structure")
  ? localStorage.getItem("structure")
  : "0.1";

// state
export const state = {
  structure,
};

// getters
export const getters = {
  structure: (state) => state.structure,
};

// mutations
export const mutations = {
  [types.SET_STRUCTURE](state, newstructure) {
    state.structure = newstructure;
    localStorage.setItem("structure", state.structure);
  },
};

// actions
export const actions = {
  setstructure({ commit }, structure) {
    commit(types.SET_STRUCTURE, structure);
  },
};
