import Buscador from '../views/Buscador'
import PageNotFound from '../views/PageNotFound'

const routes = [
  {
    path: '/',
    name: 'buscador',
    component: Buscador,
  },
  {
    path: '*',
    name: 'page-not-found',
    component: PageNotFound,
  }
]

export default routes