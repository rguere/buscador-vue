import * as types from "../mutation-types";

// state
export const state = {
  class_btns_filter: "",
};

// getters
export const getters = {
  class_btns_filter: (state) => state.class_btns_filter,
};

// mutations
export const mutations = {
  [types.SET_CLASS_BTNS_FILTER](state, new_class_btns_filter) {
    state.class_btns_filter = new_class_btns_filter;
    localStorage.setItem("class_btns_filter", state.class_btns_filter);
  },
};

// actions
export const actions = {
  setClassBtnsFilter({ commit }, class_btns_filter) {
    commit(types.SET_CLASS_BTNS_FILTER, class_btns_filter);
  },
};
