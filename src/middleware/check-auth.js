import store from './../store/index'
import toastr from 'toastr'
export default async (to, from, next) => {
  if (!store.getters['auth/check'] && store.getters['auth/token']) {
    try {
      //await store.dispatch('auth/fetchUser')
    } catch (e) { toastr.error('Error', 'Error') }
  }

  next()
}
