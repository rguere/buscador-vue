import axios from "axios";
import * as types from "../mutation-types";
import { formatProvinciaLocalidad } from "./../../utils";
import dataJson from "./../../assets/buscador-data.json";
const local = true;
// state
export const state = {
  loading: false,
  search: {
    cantidad: 0,
    antiguedad: [],
    empleados: [],
    provincia: [],
    provincia_localidad: [],
    auditor: [],
    cnae: [],
    industria: [],
    tipo_cuentas: [],
    cuentas_disponibles: [],
    cargos: [],
  },
};

// getters
export const getters = {
  loading: (state) => state.loading,
  search: (state) => state.search,
};

// mutations
export const mutations = {
  [types.FETCH_SEARCH](state, { search }) {
    state.search = search;
    state.loading = false;
  },
  [types.LOADING_SEARCH](state, { loading }) {
    state.loading = loading;
  },
};

let load = 0;
// actions
export const actions = {
  async fetchSearch({ commit }) {
    load++;
    if (load < 2) {
      try {
        commit(types.LOADING_SEARCH, {
          loading: true,
        });
        let _data = [];
        if (!local) {
          const { data } = await axios.get("/buscador/resumen");
          _data = formatProvinciaLocalidad(data);
        } else {
          _data = formatProvinciaLocalidad(dataJson);
        }
        commit(types.FETCH_SEARCH, {
          search: _data,
        });
      } catch (e) {
        commit(types.FETCH_SEARCH, {
          search: state.search,
        });
      }
    }
  },
  async filtrar({ commit }, filters) {
    try {
      commit(types.LOADING_SEARCH, {
        loading: true,
      });
      const { data } = await axios.post(
        "/buscador/filtrar?resumen=false",
        filters
      );

      commit(types.LOADING_SEARCH, {
        loading: false,
      });

      return data;
    } catch (e) {
      commit(types.LOADING_SEARCH, {
        loading: false,
      });
    }
  },
  async searchLocalidades({ commit }, search) {
    try {
      const { data } = await axios.get(
        `/buscador/localidades?buscar=${search}`
      );
      return data;
    } catch (e) {
      commit(types.LOADING_SEARCH, {
        loading: false,
      });
    }
  },
  async validateZipCodes({ commit }, zip_codes) {
    try {
      const { data } = await axios.post("/buscador/codigoPostal/validar", {
        lista: zip_codes,
      });
      return data;
    } catch (e) {
      commit(types.LOADING_SEARCH, {
        loading: false,
      });
    }
  },
  async validateZipCodesFile({ commit }, file) {
    try {
      var formData = new FormData();
      formData.append("file", file);
      const { data } = await axios.post(
        "/buscador/codigoPostal/archivo",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return data;
    } catch (e) {
      commit(types.LOADING_SEARCH, {
        loading: false,
      });
    }
  },
  async validateNif({ commit }, list_nif) {
    try {
      const { data } = await axios.post("/buscador/NIF/validar", {
        lista: list_nif,
      });
      return data;
    } catch (e) {
      commit(types.LOADING_SEARCH, {
        loading: false,
      });
    }
  },
  async validateNifFile({ commit }, file) {
    try {
      var formData = new FormData();
      formData.append("file", file);
      const { data } = await axios.post("/buscador/NIF/archivo", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return data;
    } catch (e) {
      commit(types.LOADING_SEARCH, {
        loading: false,
      });
    }
  },
  async validateRazonSocial({ commit }, razon_social) {
    try {
      const { data } = await axios.get(
        `/buscador/razonSocial/buscar?RazonSocial=${razon_social}&page=0&size=500`
      );
      return data;
    } catch (e) {
      commit(types.LOADING_SEARCH, {
        loading: false,
      });
    }
  },
  async validateCargo({ commit }, datos) {
    const { cargo, status } = datos;
    try {
      const { data } = await axios.post(
        `/buscador/cargo/buscar?search=${cargo}&status=${status}`
      );
      return data;
    } catch (e) {
      commit(types.LOADING_SEARCH, {
        loading: false,
      });
    }
  },
  async validateBormeAuditor({ commit }, AuditorBorme) {
    const { dataFrm, searchTab } = AuditorBorme;
    try {
      const { data } = await axios.post(
        `/buscador/auditor/buscar?searchTab=${searchTab}`,
        {
          lista: dataFrm,
          searchTab,
        }
      );
      return data;
    } catch (e) {
      commit(types.LOADING_SEARCH, {
        loading: false,
      });
    }
  },
  async archivoExcel({ commit }, { filters, nombreArchivo }) {
    try {
      const { data } = await axios.post(
        `/buscador/empresas/excel?nombreArchivo=${nombreArchivo}`,
        filters
      );
      return data;
    } catch (e) {
      commit(types.LOADING_SEARCH, {
        loading: false,
      });
    }
  },
  async enviarResultadosCorreo({ commit }, { filters, email, nombreArchivo }) {
    try {
      const { data } = await axios.post(
        `buscador/empresas/email?to=${email}&nombreArchivo=${nombreArchivo}`,
        filters
      );
      return data;
    } catch (e) {
      commit(types.LOADING_SEARCH, {
        loading: false,
      });
    }
  },
  async saveFilter({ commit }, { idUser, type, filter }) {
    try {
      const { data } = await axios.post(
        `/filtrousuario/${idUser}/${type}`,
        filter,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return data;
    } catch (e) {
      commit(types.LOADING_SEARCH, {
        loading: false,
      });
    }
  },
  async getFilter({ commit }, { idUser, type }) {
    try {
      const { data } = await axios.get(`/filtrousuario/${idUser}/${type}`);
      return data;
    } catch (e) {
      commit(types.LOADING_SEARCH, {
        loading: false,
      });
    }
  },
  async visualizarResultados({ commit }, { filters, page, size, sort }) {
    try {
      commit(types.LOADING_SEARCH, {
        loading: true,
      });
      const { data } = await axios.post(
        `/buscador/empresas/filtrar?pag=${page}&size=${size}${sort}`,
        filters
      );
      commit(types.LOADING_SEARCH, {
        loading: false,
      });
      return data;
    } catch (e) {
      commit(types.LOADING_SEARCH, {
        loading: false,
      });
    }
  },
};
