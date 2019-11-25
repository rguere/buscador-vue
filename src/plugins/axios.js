import axios from 'axios'

if (process.env.NODE_ENV === 'production') {
  axios.defaults.baseURL = 'https://dev.infocif.info/api/'
} else {
  axios.defaults.baseURL = 'https://dev.infocif.info/api/'
}
