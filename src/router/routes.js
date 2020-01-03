import Buscador from '../views/Buscador'
import PageNotFound from '../views/PageNotFound'
import VisualizarResultados from '../views/VisualizarResultados.vue'

const routes = [
  {
    path: '/',
    name: 'buscador',
    component: Buscador,
  },
  {
    path: '/visualizar-resultados',
    name: 'visualizar-resultados',
    component: VisualizarResultados,
  },
  {
    path: '*',
    name: 'page-not-found',
    component: PageNotFound,
  }
]

export default routes
