import axios from 'axios'
import store from './../store'
import swal from 'sweetalert2'
import router from './../router'

if (process.env.NODE_ENV === 'production') {
  axios.defaults.baseURL = 'https://api.infocif.es/api' //'https://api.infocif.es/api'
} else {
  axios.defaults.baseURL = 'https://api.infocif.es/api' //'https://api.infocif.es/api'
}

// Request interceptor
axios.interceptors.request.use(request => {
  const token = store.getters['auth/token']
  if (token) {
    request.headers.common['Authorization'] = `Bearer ${token}`
  }
  return request
})

// Response interceptor
axios.interceptors.response.use(response => response, error => {
  const { status } = error.response

  if (status >= 500) {
    swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Error del servidor',
      reverseButtons: true,
      confirmButtonText: 'ok',
      cancelButtonText: 'cancel'
    })
  }

  if (status === 401 && store.getters['auth/check']) {
    swal.fire({
      icon: 'warning',
      title: '401 Unauthorized',
      text: 'expired token',
      reverseButtons: true,
      confirmButtonText: 'ok',
      cancelButtonText: 'cancel'
    }).then(() => {
      store.commit('auth/LOGOUT')

      router.push({ name: 'home' })
    })
  }

  return Promise.reject(error)
})
