import store from "./../store/index";

export default (to, from, next) => {
  if (store.getters["auth/check"]) {
    next({ name: "buscador" });
  } else {
    next();
  }
};
