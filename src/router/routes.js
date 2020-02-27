import Buscador from '../views/Buscador'
import PageNotFound from '../views/PageNotFound'
import VisualizarResultados from '../views/VisualizarResultados.vue'
import FichaResumen from '../views/FichaResumen.vue'

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
    path: '/ficha-resumen',
    name: 'ficha-resumen',
    component: FichaResumen,
  },
  {
    path: '*',
    name: 'page-not-found',
    component: PageNotFound,
  }
]

export default routes
