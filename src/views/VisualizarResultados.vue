<template>
  <div class="home" id="page-wrapper">
    <banner-top
      banner-title="Buscador de Empresas"
      banner-subtitle="Visualizar resultados"
    ></banner-top>
    <div class="container">
      <loading-full-page></loading-full-page>
      <div class="banner">
        <div class="panel panel-default cd min-height-200">
          <div class="panel-body">
            <div class="m-b-10">
              <!-- botones -->
            </div>
            <div class="row m-b-10">
              <div class="col-md-8">
                <button @click="goBack" class="btn btn-warning">
                  <i class="fa fa-arrow-left"></i> Vover
                </button>
                <button class="btn btn-primary m-l-5" @click="printSummary">
                  <i class="fa fa-print"></i>
                  Imprimir Resumen
                </button>
                <el-dialog
                  title="Imprimir archivo"
                  :visible.sync="dialogCorreoVisible3"
                  width="50%"
                >
                  <div>
                    <div class="row">
                      <div class="col-md-12">
                        <p style="padding: 9px">
                          Para poder disfrutar de esta funcionalidad del
                          Buscador de Empresas de Infocif es necesario
                          registrarse.
                          <br />Regístrese en Infocif, de manera rápida y
                          sencilla, en el siguiente enlace:
                          <br />
                          <a
                            target="_blank"
                            href="http://www.infocif.es/gestion/gestion-registro.asp"
                            >http://www.infocif.es/gestion/gestion-registro.asp</a
                          >
                        </p>
                      </div>
                    </div>
                  </div>
                </el-dialog>
                <button @click="showModal" class="btn btn-info m-l-5">
                  <i class="fa fa-table"></i>
                  Ficha Resumen
                </button>
                <el-select
                  v-model="valueSelect"
                  multiple
                  collapse-tags
                  style="margin-left: 20px;"
                  placeholder="Seleccionar Columnas"
                  @change="changeColumns"
                  id="selectColumns"
                  class="select-columns"
                >
                  <el-option
                    v-for="item in selectColumns"
                    :key="item.prop"
                    :label="item.label"
                    :value="item.prop"
                  ></el-option>
                </el-select>
              </div>
              <div class="col-md-4">
                <div class="pull-right">
                  <button
                    @click="dialogCorreoVisible = true"
                    :disabled="loadingCorreo"
                    class="btn btn-info"
                  >
                    <i
                      :class="
                        loadingCorreo
                          ? 'fa  fa-spinner fa-spin'
                          : 'fa  fa-envelope'
                      "
                    ></i>
                    Enviar al correo
                  </button>
                  <el-dialog
                    title="Enviar al correo"
                    :visible.sync="dialogCorreoVisible"
                    width="50%"
                  >
                    <div v-if="puedeEnviarCorreo">
                      <div
                        class="form-group anti-inputs"
                        :class="{ 'has-error has-feedback': $v.correo.$error }"
                      >
                        <input
                          type="email"
                          class="form-control"
                          placeholder="Ingresa un correo"
                          v-model.trim="$v.correo.$model"
                          ref="correo"
                          required
                        />
                      </div>
                      <div
                        class="form-group anti-inputs"
                        :class="{
                          'has-error has-feedback': $v.nombreArchivo.$error,
                        }"
                      >
                        <input
                          type="text"
                          class="form-control"
                          placeholder="Nombre de archivo"
                          v-model.trim="$v.nombreArchivo.$model"
                          ref="nombreArchivoEmail"
                          required
                        />
                      </div>
                      <span slot="footer" class="dialog-footer">
                        <button
                          @click="dialogCorreoVisible = false"
                          class="btn btn-danger"
                        >
                          Cerrar
                        </button>
                        <button
                          @click="enviarResultadosCorreo"
                          :disabled="loadingCorreo"
                          class="btn btn-info m-l-5"
                        >
                          <i
                            :class="
                              loadingCorreo
                                ? 'fa  fa-spinner fa-spin'
                                : 'fa  fa-envelope'
                            "
                          ></i>
                          Enviar al correo
                        </button>
                      </span>
                    </div>
                    <div v-if="!puedeEnviarCorreo">
                      <div class="row">
                        <div class="col-md-12">
                          <p style="padding: 9px">
                            Para poder disfrutar de esta funcionalidad del
                            Buscador de Empresas de Infocif es necesario
                            registrarse.
                            <br />Regístrese en Infocif, de manera rápida y
                            sencilla, en el siguiente enlace:
                            <br />
                            <a
                              target="_blank"
                              href="http://www.infocif.es/gestion/gestion-registro.asp"
                              >http://www.infocif.es/gestion/gestion-registro.asp</a
                            >
                          </p>
                        </div>
                      </div>
                    </div>
                  </el-dialog>
                  <button
                    @click="dialogCorreoVisible2 = true"
                    :disabled="loadingExcel"
                    class="btn btn-success m-l-5"
                  >
                    <i
                      :class="
                        loadingExcel
                          ? 'fa  fa-spinner fa-spin'
                          : 'fa  fa-file-excel-o'
                      "
                    ></i>
                    Descargar en excel
                  </button>
                  <el-dialog
                    title="Ingrese el nombre del archivo para iniciar la descarga"
                    :visible.sync="dialogCorreoVisible2"
                    width="50%"
                  >
                    <div v-if="puedeDescargar">
                      <div
                        class="form-group anti-inputs"
                        :class="{
                          'has-error has-feedback': $v.nombreArchivo.$error,
                        }"
                      >
                        <input
                          type="text"
                          class="form-control"
                          placeholder="Nombre de archivo"
                          v-model.trim="$v.nombreArchivo.$model"
                          ref="nombreArchivoEmail"
                          required
                        />
                      </div>
                      <span slot="footer" class="dialog-footer">
                        <button
                          @click="dialogCorreoVisible2 = false"
                          class="btn btn-danger"
                        >
                          Cerrar
                        </button>
                        <button
                          @click="descargarExcel"
                          :disabled="loadingExcel"
                          class="btn btn-success m-l-5"
                        >
                          <i
                            :class="
                              loadingExcel
                                ? 'fa  fa-spinner fa-spin'
                                : 'fa  fa-file-excel-o'
                            "
                          ></i>
                          Iniciar la descarga
                        </button>
                      </span>
                    </div>
                    <div v-if="!puedeDescargar">
                      <div class="row">
                        <div class="col-md-12">
                          <p style="padding: 9px">
                            Para poder disfrutar de esta funcionalidad del
                            Buscador de Empresas de Infocif es necesario
                            registrarse.
                            <br />Regístrese en Infocif, de manera rápida y
                            sencilla, en el siguiente enlace:
                            <br />
                            <a
                              target="_blank"
                              href="http://www.infocif.es/gestion/gestion-registro.asp"
                              >http://www.infocif.es/gestion/gestion-registro.asp</a
                            >
                          </p>
                        </div>
                      </div>
                    </div>
                  </el-dialog>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-12">
                <h5 class="flex_div">
                  <b>Resultados de la búsqueda</b>
                  <span @click="showModal">
                    <filter-tree></filter-tree>
                  </span>
                </h5>
                <el-dialog
                  :visible.sync="modalVisible"
                  width="65%"
                  :close-on-click-modal="true"
                  :show-close="true"
                  :destroy-on-close="true"
                  :center="true"
                  top="5vh"
                >
                  <div class="row" id="print">
                    <div class="col-md-12">
                      <div class="row">
                        <div class="col-md-12">
                          <div class="img_title_img">
                            <img
                              src="./../assets/images/infocif.png"
                              class="img-responsive infocif"
                              alt="infocif"
                            />
                            <h1 class="text-center fs20">
                              <strong class="title-lg"
                                >Ficha Resumen de la Búsqueda</strong
                              >
                            </h1>
                            <img
                              src="./../assets/images/buscador-logo.png"
                              class="img-responsive buscador-logo"
                              alt="Buscador de Empresas"
                            />
                          </div>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-md-8">
                          <h4>Estrategia de Búsqueda</h4>
                          <ul class="ul_filtros_aplicados">
                            <li
                              v-for="(item, key) in filtros_aplicados"
                              :key="key"
                            >
                              {{ item.title }}
                              <ul v-if="item.datas">
                                <li
                                  v-for="(_item, _key) in item.datas"
                                  :key="_key"
                                >
                                  {{
                                    _item.label !== "incluir_null"
                                      ? _item.label
                                      : `Empresas en las que se desconoce su ${item.title.toLowerCase()}`
                                  }}
                                </li>
                              </ul>
                              <el-divider></el-divider>
                              <span class="_right">{{
                                item.quantity | numeral("0,0")
                              }}</span>
                            </li>
                          </ul>
                        </div>
                        <div class="col-md-4 text-right">
                          <h4>Resultado Final de la búsqueda</h4>
                          <p class="f25">
                            <b>
                              <span class>{{ total | numeral("0,0") }}</span>
                              Empresas
                            </b>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </el-dialog>
              </div>
              <div class="col-md-12" v-if="results && results.empresas">
                <el-table
                  border
                  stripe
                  :data="results.empresas"
                  style="width: 100%"
                  @sort-change="sortChange"
                >
                  <el-table-column
                    v-for="(item, key) in columns"
                    :key="key"
                    :prop="item.prop"
                    :label="item.label"
                    :width="item.width"
                    v-show="item.show"
                    sortable
                  >
                    <template slot-scope="scope">
                      <a
                        :href="scope.row.urlInfocif"
                        v-if="item.prop === 'RazonSocial'"
                        target="_blank"
                        >{{ scope.row.RazonSocial }}</a
                      >
                      <p v-if="item.prop !== 'RazonSocial'">
                        {{ scope.row[item.prop] }}
                      </p>
                    </template>
                  </el-table-column>
                </el-table>
                <el-pagination
                  layout="total, sizes, next, pager, prev, jumper"
                  :total="results.total"
                  :page-size="size"
                  :current-page.sync="currentPage"
                  @current-change="pageChange"
                  @size-change="sizeChange"
                ></el-pagination>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import moment from "moment";
import axios from "axios";
import { mapGetters } from "vuex";
import {
  orderFilters,
  inArrayObject,
  countByProperty,
  sendPageView,
  sendEvent,
  getColumnsSummary,
  showColumnsSummary,
} from "./../utils";
import swal from "sweetalert2";
import slugify from "slugify";
import { required, email } from "vuelidate/lib/validators";

export default {
  /*middleware: 'guest',*/
  name: "visualizar-resultados",
  layout: "basic",
  metaInfo() {
    return {
      title: "Buscador - Visualizar resultados",
    };
  },
  data: () => ({
    dialogCorreoVisible: false,
    dialogCorreoVisible2: false,
    dialogCorreoVisible3: false,
    modalVisible: false,
    loadingExcel: false,
    loadingCorreo: false,
    correo: "",
    nombreArchivo: "",
    currentPage: 1,
    size: 10,
    results: {
      cantidad: 0,
      total: 0,
      empresas: [],
    },
    filtros_aplicados: [],
    total: 0,
    puedeDescargar: false,
    puedeEnviarCorreo: false,
    columns: [],
    selectColumns: [],
    valueSelect: [],
    sort: {
      prop: "razonSocial",
      order: "asc",
    },
  }),
  validations() {
    return {
      correo: {
        required,
        email,
      },
      nombreArchivo: {
        required,
      },
    };
  },
  computed: {
    ...mapGetters({
      loading: "search/loading",
      form: "filters/form",
      applied_filters: "filters/applied_filters",
      localDatas: "localDatas/localDatas",
      filters: "filters/filters",
      cantidades: "filters/cantidades",
      user: "auth/user",
    }),
    orderFilters: function() {
      let order = orderFilters(this.filters, this.applied_filters, this.form);
      for (const prop in this.cantidades) {
        let split = prop.split(".");
        if (
          split &&
          split[0] === "filtro" &&
          split[1] &&
          order &&
          order[split[1]]
        ) {
          order[split[1]].quantity = this.cantidades[prop].cantidad;
        }
      }
      return order;
    },
  },
  created() {
    this.$store.dispatch("layout/setLayout", "default-layout");
  },
  mounted() {
    sendPageView("resultados", "Buscador - Visualizar resultados");
    this.columns = getColumnsSummary();
    this.selectColumns = getColumnsSummary();
    this.valueSelect = this.selectColumns.map((item) => {
      return item.prop;
    });
    setTimeout(() => {
      let selectColumns = document.getElementById("selectColumns");
      if (selectColumns) {
        selectColumns.placeholder = "Seleccionar Columnas";
      }
    }, 100);
    if (!(this.applied_filters && this.applied_filters.length !== 0)) {
      swal.fire("Advertencia", "Aún no hay filtros aplicados", "warning");
      this.$router.push({ name: "buscador" });
    } else {
      this.applied_filters.forEach((item) => {
        for (const key in this.localDatas) {
          if (this.localDatas.hasOwnProperty(key)) {
            const element = this.localDatas[key];
            let result = inArrayObject(
              this.orderFilters,
              element.title,
              "name"
            );
            if (element.title === item && result) {
              if (element.title === "Antigüedad") {
                this.filtros_aplicados.push({
                  title: element.title,
                  quantity: result.quantity,
                  key: result.key,
                  datas: element.selected_antiguedad,
                  data_quantity: countByProperty(
                    element.selected_antiguedad,
                    "data"
                  ),
                });
              } else if (element.title === "Ubicación") {
                this.filtros_aplicados.push({
                  title: element.title,
                  quantity: result.quantity,
                  key: result.key,
                  datas: element.selected_provinces_localidad,
                  data_quantity: countByProperty(
                    element.selected_provinces_localidad,
                    "data"
                  ),
                });
              } else if (element.title === "Número de empleados") {
                this.filtros_aplicados.push({
                  title: element.title,
                  quantity: result.quantity,
                  key: result.key,
                  datas: element.selected_empleados,
                  data_quantity: countByProperty(
                    element.selected_empleados,
                    "data"
                  ),
                });
              } else if (element.title === "Código Postal") {
                this.filtros_aplicados.push({
                  title: element.title,
                  quantity: result.quantity,
                  key: result.key,
                  datas: element.selected_zip_codes,
                  data_quantity: countByProperty(
                    element.selected_zip_codes,
                    "data"
                  ),
                });
              } else if (element.title === "Nombre o razón social") {
                this.filtros_aplicados.push({
                  title: element.title,
                  quantity: result.quantity,
                  key: result.key,
                  datas: element.selected_social_reasons,
                  data_quantity: countByProperty(
                    element.selected_social_reasons,
                    "data"
                  ),
                });
              } else if (element.title === "NIF") {
                this.filtros_aplicados.push({
                  title: element.title,
                  quantity: result.quantity,
                  key: result.key,
                  datas: element.selected_list_nif,
                  data_quantity: countByProperty(
                    element.selected_list_nif,
                    "data"
                  ),
                });
              } else if (element.title === "Años con cuentas disponibles") {
                this.filtros_aplicados.push({
                  title: element.title,
                  quantity: result.quantity,
                  key: result.key,
                  datas: element.selected_cuentas_disponibles,
                  data_quantity: countByProperty(
                    element.selected_cuentas_disponibles,
                    "data"
                  ),
                });
              } else if (element.title === "Tipo de cuentas") {
                this.filtros_aplicados.push({
                  title: element.title,
                  quantity: result.quantity,
                  key: result.key,
                  datas: element.tipo_cuentas,
                  data_quantity: countByProperty(element.tipo_cuentas, "data"),
                });
              } else if (element.title === "Auditores") {
                this.filtros_aplicados.push({
                  title: element.title,
                  quantity: result.quantity,
                  key: result.key,
                  datas: element.selected_auditores,
                  data_quantity: countByProperty(
                    element.selected_auditores,
                    "data"
                  ),
                });
              } else if (element.title === "Sector/Actividad") {
                const selecteds = element.selected_cnae.concat(
                  element.selected_industria
                );
                this.filtros_aplicados.push({
                  title: element.title,
                  quantity: result.quantity,
                  key: result.key,
                  datas: selecteds,
                  data_quantity: countByProperty(selecteds, "data"),
                });
              }
            }
          }
        }
      });
      if (this.filtros_aplicados.length > 0) {
        this.total = this.filtros_aplicados[
          this.filtros_aplicados.length - 1
        ].quantity;
      }
    }
    this.visualizarResultados();
    if (this.user && this.user.email) {
      this.correo = this.user.email;
      this.puedeDescargar = true;
      this.puedeEnviarCorreo = true;
    }

    setTimeout(() => {
      let cells = document.querySelectorAll(".el-table__header th.is-sortable");
      if (cells) {
        for (const item of cells) {
          item.addEventListener("click", this.isSortable);
        }
      }
    }, 200);
  },
  methods: {
    isSortable(event) {
      event.stopPropagation();
      // let target = event.target
      // let order = (this.sort.order === 'asc')? 'ascending': 'descending'
      // let element = target.querySelector(`.${order}`)
      // if (element) {
      //   target.querySelector(`.ascending`).style.borderBottomColor = '#C0C4CC'
      //   target.querySelector(`.descending`).style.borderBottomColor = '#C0C4CC'
      //   element.style.borderBottomColor = '#409EFF'
      // }
    },
    changeColumns(columns) {
      this.columns = showColumnsSummary(columns);
    },
    visualizarResultados() {
      let hoy = moment();
      let size = this.size;
      let page = this.currentPage - 1;
      let filters = this.formatearData();
      let sort = `&ord=${this.sort.prop}&dir=${this.sort.order}`;
      this.$store
        .dispatch("search/visualizarResultados", { filters, page, size, sort })
        .then((response) => {
          if (response && response.empresas) {
            this.results.empresas = response.empresas.map((item) => {
              if (item.razonSocialNormalizadaURL301) {
                item.urlInfocif = `http://www.infocif.es/ficha-empresa/${item.razonSocialNormalizadaURL301}`;
              } else {
                let nameRazonSocial = slugify(item.RazonSocial.toLowerCase());
                item.urlInfocif = `http://www.infocif.es/ficha-empresa/${nameRazonSocial}`;
              }
              if (item.FechaConstitucion) {
                let FechaConstitucion = moment(item.FechaConstitucion);
                let diff = hoy.diff(FechaConstitucion, "years");
                item.anios_empresa = diff !== 0 ? `${diff} años` : "-";
              } else {
                item.anios_empresa = "-";
              }
              if (
                item.UltimaCuentaAnual &&
                item.UltimaCuentaAnual.SumTotalEmpleados &&
                item.UltimaCuentaAnual.SumTotalEmpleados !== 0
              ) {
                item.SumTotalEmpleados =
                  item.UltimaCuentaAnual.SumTotalEmpleados;
              } else {
                item.SumTotalEmpleados = "-";
              }
              if (!item.Codigo_Postal) {
                item.Codigo_Postal = "-";
              }
              if (
                item.CuentasDisponibles &&
                Array.isArray(item.CuentasDisponibles)
              ) {
                let length = item.CuentasDisponibles.length;
                if (
                  item.CuentasDisponibles[length - 1] &&
                  item.CuentasDisponibles[length - 1].Ejercicio
                ) {
                  item.CuentasDisponibles =
                    item.CuentasDisponibles[length - 1].Ejercicio;
                } else {
                  item.CuentasDisponibles = "-";
                }
              } else {
                item.CuentasDisponibles = "-";
              }
              item.Cnae3_text = "-";
              item.Cnae3_code = "-";
              if (item.CnaeInfo && item.CnaeInfo.Cnae3_text) {
                let text = item.CnaeInfo.Cnae3_text;
                let cnae = text.split(".");
                if (cnae.length > 1) {
                  item.Cnae3_code = cnae[0];
                  item.Cnae3_text = cnae[1];
                }
              }
              if (
                item.TipoCuentasAnuales &&
                Array.isArray(item.TipoCuentasAnuales)
              ) {
                item.TipoCuentasAnuales = item.TipoCuentasAnuales.map(
                  (item) => {
                    return item === 1 ? "Individuales" : "Consolidadas";
                  }
                ).join(", ");
              } else {
                item.TipoCuentasAnuales = "-";
              }
              item.FechaConstitucionOrigen = item.FechaConstitucionOrigen.length
                ? item.FechaConstitucionOrigen
                : "-";
              return item;
            });
            this.results.cantidad = response.cantidad;
            this.results.total = response.total;
          }
        })
        .catch(() => {});
    },
    descargarExcel() {
      if (this.nombreArchivo && this.nombreArchivo.length != 0) {
        this.loadingExcel = true;
        let data = this.formatearData();
        this.$store
          .dispatch("search/archivoExcel", {
            filters: data,
            nombreArchivo: this.nombreArchivo,
          })
          .then((response) => {
            if (response) {
              const link = document.createElement("a");
              link.href = `${axios.defaults.baseURL}/buscador/archivos/${response}`;
              link.setAttribute("download", "resultados.xlsx");
              document.body.appendChild(link);
              link.click();
              this.loadingExcel = false;
              this.dialogCorreoVisible2 = false;
              this.nombreArchivo = "";
              swal.fire(
                "Archivo descargado con éxito",
                "Por el momento, los usuarios de Infocif podrán disfrutar de una muestra (completamente gratuita) de 50 empresas cada vez que se descarguen en Excel o  envíen a su correo (cuenta de email asociada a su usuario de Infocif) los resultados de la búsquedas que realicen desde el Buscador de Empresas",
                "success"
              );
              sendEvent("resultados", "descargar");
              this.$v.$reset();
            }
          })
          .catch(() => {
            this.loadingExcel = false;
          });
      }
    },
    enviarResultadosCorreo() {
      if (
        this.$refs["correo"].checkValidity() &&
        this.$refs["nombreArchivoEmail"].checkValidity()
      ) {
        this.loadingCorreo = true;
        let filters = this.formatearData();
        this.$store
          .dispatch("search/enviarResultadosCorreo", {
            filters,
            email: this.correo,
            nombreArchivo: this.nombreArchivo,
          })
          .then(() => {
            this.loadingCorreo = false;
            this.dialogCorreoVisible = false;
            if (this.user && this.user.email) {
              this.correo = this.user.email;
              this.puedeDescargar = true;
              this.puedeEnviarCorreo = true;
            }
            this.nombreArchivo = "";
            swal.fire(
              "Correo enviado ",
              "Por el momento, los usuarios de Infocif podrán disfrutar de una muestra (completamente gratuita) de 50 empresas cada vez que se descarguen en Excel o  envíen a su correo (cuenta de email asociada a su usuario de Infocif) los resultados de la búsquedas que realicen desde el Buscador de Empresas",
              "success"
            );
            sendEvent("resultados", "correo");
            this.$v.$reset();
          })
          .catch(() => {
            this.loadingCorreo = false;
          });
      }
    },
    formatearData() {
      let data = {
        filtros: [],
      };
      let arr = {};
      for (let key in this.form) {
        if (key !== "filtros" && this.form[key].length !== 0) {
          data[key] = this.form[key];
          let result = inArrayObject(this.filtros_aplicados, key, "key");
          if (result) {
            arr[key] = this.form[key];
            let aux = { ...arr };
            data.filtros.push({
              nombreFiltro: result.title,
              ...aux,
            });
            if (
              result.datas &&
              result.datas.length === 0 &&
              this.form[key][0]
            ) {
              let _copy = [...this.form[key]];
              let label = _copy[0] ? _copy[0] : "";
              label = label.split(":");
              label[0] = label[0] === "ahnos" ? "años" : label[0];
              label = label
                .join(": ")
                .split("|")
                .join(" | ");
              result.datas.push({
                label,
              });
            }
          }
        }
      }
      return data;
    },
    pageChange() {
      sendEvent("resultados", "paginar");
      this.visualizarResultados();
    },
    sizeChange(val) {
      this.size = val;
      this.visualizarResultados();
    },
    sortChange({ prop, order }) {
      order = order === "ascending" ? "asc" : "desc";
      if (prop === "RazonSocial") {
        prop = "razonSocial";
      } else if (prop === "Provincia") {
        prop = "provincia";
      } else if (prop === "Localidad") {
        prop = "localidad";
      } else if (prop === "CIF") {
        prop = "cif";
      } else if (prop === "Codigo_Postal") {
        prop = "codigoPostal";
      } else if (prop === "FechaConstitucionOrigen") {
        prop = "antiguedad";
      } else if (prop === "anios_empresa") {
        prop = "antiguedad";
      } else if (prop === "SumTotalEmpleados") {
        prop = "empleados";
      } else if (prop === "Cnae3_text") {
        prop = "actividad";
      } else if (prop === "IndustriaDescripcion") {
        prop = "sector";
      } else if (prop === "AuditorBorme") {
        prop = "auditores";
      }
      this.sort = {
        prop,
        order,
      };
      this.visualizarResultados();
    },
    showModal() {
      this.modalVisible = true;
    },
    hideModal() {
      this.modalVisible = false;
    },
    printSummary() {
      if (this.puedeDescargar) {
        this.$storage.set("resumen", this.$data);
        let routeData = this.$router.resolve({ name: "ficha-resumen" });
        if (routeData) {
          sendEvent("resultados", "imprimir");
          window.open(routeData.href, "_blank");
        }
      } else {
        this.dialogCorreoVisible3 = true;
      }
    },
    goBack() {
      sendEvent("resultados", "volver");
      this.$router.push({ name: "buscador" });
    },
  },
};
</script>

<style lang="scss" scoped>
.banner {
  padding: 15px 0 0 0;
}
.flex_div {
  display: flex;
  margin-left: 3px;
}
table {
  thead {
    background: #333;
    color: #fff;
    font-weight: bold;
    th {
      padding: 15px 10px !important;
    }
  }
}
._right {
  float: right;
}

.img_title_img {
  display: flex;
  justify-content: space-between;
  align-items: center;
  img.infocif {
    width: 140px;
    margin-right: 10px;
  }
  img.buscador-logo {
    width: 120px;
    margin-left: 10px;
  }
}
</style>
