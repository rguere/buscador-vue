import Vue from 'vue'

import MenuInfocif from './MenuInfocif.vue'
import FilterButtons from './FilterButtons.vue'
import FilterActionsTop from './FilterActionsTop.vue'
import FilterListCheckboxs from './FilterListCheckboxs.vue'


import FilterUbicacion from './filters/FilterUbicacion.vue'
import FilterCodigoPostal from './filters/FilterCodigoPostal.vue'
import FilterRazonSocial from './filters/FilterRazonSocial.vue'
import FilterNif from './filters/FilterNif.vue'
import FilterTipoCuentas from './filters/FilterTipoCuentas.vue'
import FilterSectorActividad from './filters/FilterSectorActividad.vue'
import FilterDirectivosVinculaciones from './filters/FilterDirectivosVinculaciones.vue'
import FilterAntiguedad from './filters/FilterAntiguedad.vue'
import FilterNumeroEmpleados from './filters/FilterNumeroEmpleados.vue'
import FilterEstado from './filters/FilterEstado.vue'
import FilterCargos from './filters/FilterCargos.vue'
import FilterAuditores from './filters/FilterAuditores.vue'
import FilterInformacionFinanciera from './filters/FilterInformacionFinanciera.vue'
import FilterAniosCuentasDisponibles from './filters/FilterAniosCuentasDisponibles.vue'

[
  MenuInfocif,
  FilterButtons,
  FilterActionsTop,
  FilterListCheckboxs,
  FilterUbicacion,
  FilterCodigoPostal,
  FilterRazonSocial,
  FilterNif,
  FilterTipoCuentas,
  FilterSectorActividad,
  FilterDirectivosVinculaciones,
  FilterAntiguedad,
  FilterNumeroEmpleados,
  FilterEstado,
  FilterCargos,
  FilterAuditores,
  FilterInformacionFinanciera,
  FilterAniosCuentasDisponibles,
].forEach(Component => {
  Vue.component(Component.name, Component)
})