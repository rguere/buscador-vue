import axios from 'axios'

if (process.env.NODE_ENV === 'production') {
  axios.defaults.baseURL = 'https://dev.infocif.info/api/'
} else {
  axios.defaults.baseURL = 'http://18.212.252.233:5000/'
}
