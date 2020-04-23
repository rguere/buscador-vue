<template>
  <div class="panel panel-default cd" id="filter_sector_actividad">
    <div class="panel-heading">
      <p class="panel-title roboto white">
        {{ title }}
        <span
          class="span-info-right"
          v-if="selected_by_code_cnae_and_industria !== 0"
          >({{ selected_by_code_cnae_and_industria | numeral("0,0") }} empresas
          seleccionadas)</span
        >
      </p>
    </div>
    <div class="panel-body">
      <ul class="nav nav-tabs">
        <li class="active">
          <a data-toggle="tab" href="#Codigo_CNAE">Código CNAE</a>
        </li>
        <li>
          <a data-toggle="tab" href="#Sector_INFOCIF">Sector INFOCIF</a>
        </li>
      </ul>
      <br />
      <div class="tab-content">
        <div
          id="Codigo_CNAE"
          class="tab-pane fade in active"
          style="margin-bottom: 10px;"
        >
          <div v-if="search.cnae && search.cnae.length != 0" class="invert">
            <el-select
              id="SearchTheProvinceorTown"
              name="SearchTheProvinceorTown"
              v-model="valueSelect"
              multiple
              clearable
              filterable
              remote
              reserve-keyword
              placeholder="Introduce el código de uno o varios Códigos CNAE para “BUSCAR”"
              :popper-append-to-body="false"
              popper-class="SearchTheProvinceorTown"
              :remote-method="remoteMethod"
              :loading="loadingSelect"
              @change="changeMethod"
              @clear="changeClear"
              @remove-tag="changeRemoveTag"
            >
              <el-option
                v-for="item in optionsSelect"
                :key="item.id"
                :label="`${item.id} - ${item.label}`"
                :value="item.id"
              ></el-option>
            </el-select>
            <br />
            <br />
            <div class="row">
              <div class="col-md-6">
                <div class="panel-group" id="accordion">
                  <div v-for="(item, key) in middle(search.cnae, 1)" :key="key">
                    <div
                      class="panel panel-default"
                      v-if="item.children && Array.isArray(item.children)"
                    >
                      <div class="panel-heading">
                        <h4 class="panel-title panel-title-flex">
                          <a
                            data-toggle="collapse"
                            data-parent="#accordion"
                            :href="`#collapse-${key}`"
                          >
                            <span class="glyphicon glyphicon-menu-right"></span>
                            {{ item.id }} - {{ item.label }}</a
                          >
                          <span>
                            <label class="custon-checkboxs">
                              <input
                                type="checkbox"
                                :name="`checkbox_father${item.id}`"
                                v-model="selected_cnae"
                                @change="handleChange(item, $event)"
                                :id="`checkbox_father${item.id}`"
                                :value="item"
                              />
                              <span class="geekmark"></span>
                            </label>
                          </span>
                        </h4>
                      </div>
                      <div
                        :id="`collapse-${key}`"
                        class="panel-collapse collapse"
                      >
                        <div class="panel-body">
                          <div v-for="(item, key) in item.children" :key="key">
                            <label class="custon-checkboxs">
                              <input
                                type="checkbox"
                                :name="`checkbox_children${item.id}`"
                                v-model="selected_cnae"
                                @change="handleChange(item, $event)"
                                :id="`checkbox_children${item.id}`"
                                :value="item"
                              />
                              <span class="geekmark"></span>
                              <span class="name-checkbox"
                                >{{ item.id }} - {{ item.label }}</span
                              >
                              <span class="num-fil"
                                >({{ item.data | numeral("0,0") }})</span
                              >
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="panel-group" id="accordion2">
                  <div v-for="(item, key) in middle(search.cnae, 2)" :key="key">
                    <div
                      class="panel panel-default"
                      v-if="item.children && Array.isArray(item.children)"
                    >
                      <div class="panel-heading">
                        <h4 class="panel-title panel-title-flex">
                          <a
                            data-toggle="collapse"
                            data-parent="#accordion2"
                            :href="`#collapse2-${key}`"
                          >
                            <span class="glyphicon glyphicon-menu-right"></span>
                            {{ item.id }} - {{ item.label }}</a
                          >
                          <span>
                            <label class="custon-checkboxs">
                              <input
                                type="checkbox"
                                :name="`checkbox_father${item.id}`"
                                v-model="selected_cnae"
                                @change="handleChange(item, $event)"
                                :id="`checkbox_father${item.id}`"
                                :value="item"
                              />
                              <span class="geekmark"></span>
                            </label>
                          </span>
                        </h4>
                      </div>
                      <div
                        :id="`collapse2-${key}`"
                        class="panel-collapse collapse"
                      >
                        <div class="panel-body">
                          <div v-for="(item, key) in item.children" :key="key">
                            <label class="custon-checkboxs">
                              <input
                                type="checkbox"
                                :name="`checkbox_children${item.id}`"
                                v-model="selected_cnae"
                                @change="handleChange(item, $event)"
                                :id="`checkbox_children${item.id}`"
                                :value="item"
                              />
                              <span class="geekmark"></span>
                              <span class="name-checkbox"
                                >{{ item.id }} - {{ item.label }}</span
                              >
                              <span class="num-fil"
                                >({{ item.data | numeral("0,0") }})</span
                              >
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            v-if="search.cnae && search.cnae.length === 0 && !loading"
            class="alert alert-dismissible alert-primary"
          >
            <strong>Oh!</strong> datos no encontrados.
          </div>
        </div>
        <div id="Sector_INFOCIF" class="tab-pane fade">
          <div v-if="search.industria && search.industria.length != 0">
            <div class="max-height-400-overflow">
              <div class="grid-3-columns-1fr">
                <div v-for="(item, key) in search.industria" :key="key">
                  <label class="custon-checkboxs">
                    <input
                      type="checkbox"
                      :name="`checkbox___${item.id}`"
                      v-model="selected_industria"
                      @change="handleChange(item, $event)"
                      :id="`checkbox___${item.id}`"
                      :value="item"
                    />
                    <span class="geekmark"></span>
                    <span class="name-checkbox"
                      >{{ item.id }} - {{ item.label }}</span
                    >
                    <span class="num-fil"
                      >({{ item.data | numeral("0,0") }})</span
                    >
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="flex-space-between-flex-end">
        <div class="btns">
          <button type="button" class="btn btn-warning" @click="showModal">
            Ver detalles
            <i class="fa fa-plus-circle"></i>
          </button>
          <button
            type="button"
            class="btn btn-success"
            v-if="
              ((selected_cnae.length !== 0 ||
                selected_industria.length !== 0) &&
                !areApplied) ||
                ((selected_cnae.length !== 0 ||
                  selected_industria.length !== 0) &&
                  !compareWithNewtoApply)
            "
            @click="apply"
          >
            Aplicar
            <i
              :class="loadingFrm ? 'fa  fa-spinner fa-spin' : 'fa  fa-send'"
            ></i>
          </button>
          <button
            type="button"
            class="btn btn-info"
            v-if="areApplied"
            @click="confirmClean"
          >
            Limpiar
            <i class="fa fa-undo"></i>
          </button>
        </div>
        <p class="text-help">* Puedes elegir más de una opción</p>
      </div>
      <el-dialog
        :visible.sync="modalVisible"
        width="95%"
        :modal-append-to-body="false"
        :close-on-click-modal="false"
        :show-close="false"
        :destroy-on-close="true"
        :center="true"
        top="5vh"
      >
        <div>
          <div class="btns-modal-header">
            <div>
              <button class="btn btn-warning" @click="hideModal">
                <i class="fa fa-arrow-left"></i> Vover
              </button>
              <button class="btn btn-a">{{ title }}</button>
            </div>
            <div>
              <button
                type="button"
                class="btn btn-success"
                v-if="
                  ((selected_cnae.length !== 0 ||
                    selected_industria.length !== 0) &&
                    !areApplied) ||
                    ((selected_cnae.length !== 0 ||
                      selected_industria.length !== 0) &&
                      !compareWithNewtoApply)
                "
                @click="apply"
              >
                Aplicar
                <i
                  :class="loadingFrm ? 'fa  fa-spinner fa-spin' : 'fa  fa-send'"
                ></i>
              </button>
              <button
                type="button"
                class="btn btn-info"
                v-if="areApplied"
                @click="confirmClean"
              >
                Limpiar
                <i class="fa fa-undo"></i>
              </button>
            </div>
          </div>
          <div
            class="conten-flex-70-30"
            v-if="search.cnae && search.cnae.length != 0"
          >
            <div>
              <ul class="nav nav-tabs">
                <li class="active">
                  <a data-toggle="tab" href="#Modal_Codigo_CNAE">Código CNAE</a>
                </li>
                <li>
                  <a data-toggle="tab" href="#Modal_Sector_INFOCIF"
                    >Sector INFOCIF</a
                  >
                </li>
              </ul>

              <div class="tab-content">
                <div id="Modal_Codigo_CNAE" class="tab-pane fade in active">
                  <div
                    class="panel panel-default cd"
                    style="border-color: transparent;"
                  >
                    <div class="panel-heading">
                      <p class="panel-title roboto white">
                        Seleccione los Códigos CNAE que desee agregar a su
                        estrategia de búsqueda.
                      </p>
                    </div>
                    <div class="panel-body">
                      <label class="control-label" for="SearchTheProvinceorTown"
                        >Introduce el código de uno o varios Códigos CNAE para
                        “BUSCAR”</label
                      >
                      <el-select
                        id="SearchTheProvinceorTown"
                        name="SearchTheProvinceorTown"
                        v-model="valueSelect"
                        multiple
                        clearable
                        filterable
                        remote
                        reserve-keyword
                        placeholder="Introduce el código de uno o varios Códigos CNAE para “BUSCAR”"
                        :popper-append-to-body="false"
                        popper-class="SearchTheProvinceorTown"
                        :remote-method="remoteMethod"
                        :loading="loadingSelect"
                        @change="changeMethod"
                        @clear="changeClear"
                        @remove-tag="changeRemoveTag"
                      >
                        <el-option
                          v-for="item in optionsSelect"
                          :key="item.id"
                          :label="`${item.id} - ${item.label}`"
                          :value="item.id"
                        ></el-option>
                      </el-select>
                      <div style="height: 260px; margin-top: 10px;">
                        <treeselect
                          valueFormat="object"
                          name="options"
                          id="options"
                          :multiple="true"
                          :options="options"
                          :always-open="true"
                          :default-expand-level="1"
                          :load-options="fetchSearch"
                          :limit="0"
                          :limitText="(t) => ''"
                          :disableFuzzyMatching="true"
                          @input="inputTreeselect"
                          @select="selectTreeselect"
                          @deselect="deselectTreeselect"
                          placeholder="Seleccionar"
                          search-nested
                          v-model="selected_cnae"
                        >
                          <label
                            slot="option-label"
                            slot-scope="{
                              node,
                              shouldShowCount,
                              count,
                              labelClassName,
                              countClassName,
                            }"
                            :class="labelClassName"
                          >
                            {{ node.id }} - {{ node.label }}
                            <span class="num-fil" v-if="node.raw.id != 'all'"
                              >({{ node.raw.data | numeral("0,0") }})</span
                            >
                            <span v-if="shouldShowCount" :class="countClassName"
                              >({{ count }})</span
                            >
                          </label>
                        </treeselect>
                      </div>
                    </div>
                  </div>
                </div>
                <div id="Modal_Sector_INFOCIF" class="tab-pane fade">
                  <div v-if="search.industria && search.industria.length != 0">
                    <div class="max-height-400-overflow">
                      <div class="">
                        <div v-for="(item, key) in search.industria" :key="key">
                          <label class="custon-checkboxs">
                            <input
                              type="checkbox"
                              :name="`checkbox___iii${item.id}`"
                              v-model="selected_industria"
                              @change="handleChange(item, $event)"
                              :id="`checkbox___iii${item.id}`"
                              :value="item"
                            />
                            <span class="geekmark"></span>
                            <span class="name-checkbox"
                              >{{ item.id }} - {{ item.label }}</span
                            >
                            <span class="num-fil"
                              >({{ item.data | numeral("0,0") }})</span
                            >
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div class="panel panel-default cd ressss">
                <div class="panel-heading">
                  <p class="panel-title roboto white">
                    Códigos seleccionadas
                    <span class="span-info-right">{{
                      lengthCnaeIndustri
                    }}</span>
                  </p>
                </div>
              </div>
              <div class="panel panel-default">
                <div class="panel-heading">
                  <p class="panel-title roboto white">
                    Empresas seleccionadas
                    <span class="span-info-right">{{
                      selected_by_code_cnae_and_industria | numeral("0,0")
                    }}</span>
                  </p>
                </div>
                <div
                  class="panel-body"
                  style="max-height: 300px; overflow-y: scroll;"
                >
                  <ul class="ul_selected_cnae" id="ul_selected_cnae">
                    <li v-for="(item, key) in selected_cnae" :key="key">
                      <label class="custon-checkboxs">
                        <input
                          type="checkbox"
                          :name="`checkbox_list_${item.id}`"
                          v-model="selected_cnae"
                          @change="handleChangeList(item, $event)"
                          :id="`checkbox_list_${item.id}`"
                          :value="item"
                        />
                        <span class="geekmark"></span>
                        <span class="name-checkbox"
                          >{{ item.id }} - {{ item.label }}</span
                        >
                        <span class="num-fil" v-if="item.id != 'all'"
                          >({{ item.data | numeral("0,0") }})</span
                        >
                      </label>
                    </li>
                    <li
                      v-for="(item, key) in selected_industria"
                      :key="`_${key}`"
                    >
                      <label class="custon-checkboxs">
                        <input
                          type="checkbox"
                          :name="`checkbox_list_${item.id}`"
                          v-model="selected_industria"
                          @change="handleChangeList(item, $event)"
                          :id="`checkbox_list_${item.id}`"
                          :value="item"
                        />
                        <span class="geekmark"></span>
                        <span class="name-checkbox"
                          >{{ item.id }} - {{ item.label }}</span
                        >
                        <span class="num-fil" v-if="item.id != 'all'"
                          >({{ item.data | numeral("0,0") }})</span
                        >
                      </label>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import swal from "sweetalert2";
import {
  inArrayObjectTreeselect,
  howAnimation,
  removeDuplicates,
  beforeOrderFilters,
  sendPageView,
  sendEvent,
  searchInArrayObject,
  inArrayObject,
} from "./../../utils";
import { persistentData } from "./../../mixins/persistent-data";
import $ from "jquery";

export default {
  name: "filter-sector-actividad",
  mixins: [persistentData],
  computed: {
    ...mapGetters({
      search: "search/search",
      loading: "search/loading",
      form: "filters/form",
      selected_companies: "filters/selected_companies",
      applied_filters: "filters/applied_filters",
      filters: "filters/filters",
    }),
    compareWithNewtoApply: function() {
      let stg = this.selected_cnae_string;
      let obj = JSON.stringify(this.sortData(this.selected_cnae));
      let compare_cnae = stg === obj;

      let stg_industria = this.selected_industria_string;
      let obj_ = JSON.stringify(this.sortData(this.selected_industria));
      let compare_industria = stg_industria === obj_;
      let compare = compare_cnae === compare_industria;
      return compare;
    },
    lengthCnaeIndustri: function() {
      return this.selected_cnae.length + this.selected_industria.length;
    },
  },
  data: () => ({
    title: "Sector/Actividad",
    selected_cnae_string: "",
    selected_cnae: [],
    selected_industria_string: "",
    selected_industria: [],
    list_provinces_localidad: [],
    selected_children: [],
    selected_by_code_cnae_and_industria: 0,
    selected_by_code_cnae: 0,
    selected_by_code_industria: 0,
    options: [],
    SearchTheProvinceorTown: "madrid",
    ResultTheProvinceorTown: [],
    loadingSearchTheProvinceorTown: false,
    areApplied: false,
    reapply: false,
    showBtnApply: false,
    loadingFrm: false,
    modalVisible: false,
    filterText: "",
    defaultProps: {
      children: "children",
      label: "label",
      data: "data",
    },
    optionsSelect: [],
    valueSelect: [],
    listSelect: [],
    loadingSelect: false,
    limitChildren: 3,
  }),
  watch: {
    selected_cnae: function(newCnae) {
      this.selected_by_code_cnae = this.numberCompaniesSelected(newCnae);
      this.selected_by_code_cnae_and_industria =
        this.selected_by_code_cnae + this.selected_by_code_industria;
      if (this.reapply && this.selected_by_code_cnae_and_industria === 0) {
        this.clean();
      }
    },
    selected_industria: function(newIndustria) {
      this.selected_by_code_industria = this.numberCompaniesSelected(
        newIndustria,
        "industria"
      );
      this.selected_by_code_cnae_and_industria =
        this.selected_by_code_cnae + this.selected_by_code_industria;
      if (this.reapply && this.selected_by_code_cnae_and_industria === 0) {
        this.clean();
      }
    },
    selected_companies: function() {
      howAnimation(document.querySelector(".selected_companies"));
    },
    search: function(newSearch) {
      this.options = newSearch && newSearch.cnae ? newSearch.cnae : [];
    },
    filterText(val) {
      this.$refs.tree.filter(val);
    },
    valueSelect(newValueSelect, attValueSelect) {
      if (!(newValueSelect.length < attValueSelect.length)) {
        let respalSelectedPL = [];
        newValueSelect.forEach((item) => {
          let result = inArrayObjectTreeselect(this.search.cnae, item);
          if (result) {
            respalSelectedPL.push(result);
          }
        });
        respalSelectedPL = removeDuplicates(respalSelectedPL, "id");
        this.selected_cnae = this.selected_cnae.concat(respalSelectedPL);
        this.selected_cnae = removeDuplicates(this.selected_cnae, "id");
        for (const cnae of this.selected_cnae) {
          this.seeSeals(cnae, true);
        }
      } else {
        let eliminadas = attValueSelect.filter((item) => {
          return !newValueSelect.includes(item) ? item : null;
        });
        eliminadas.map((_item) => {
          let result = inArrayObjectTreeselect(this.search.cnae, _item);
          if (result) {
            this.seeSeals(result, false);
          }
          this.selected_cnae = this.selected_cnae.filter(
            (item) => item.id !== _item
          );
        });
      }
    },
  },
  mounted() {
    this.$root.$on("clean_filter", (filter) => {
      if (filter === this.title) {
        this.clean();
      }
    });
    this.$root.$on("show_modal_filter", (filter) => {
      if (filter === this.title) {
        this.showModal();
      }
    });
    this.$root.$on("empty_filter", (filter) => {
      if (filter === this.title) {
        this.emptyFilter();
      }
      sendEvent("filtro-vaciado", "-");
    });

    $(".collapse.in").each(function() {
      $(this)
        .siblings(".panel-heading")
        .find(".glyphicon")
        .addClass("rotate");
    });

    $(".collapse")
      .on("show.bs.collapse", function() {
        $(this)
          .parent()
          .find(".glyphicon")
          .addClass("rotate");
      })
      .on("hide.bs.collapse", function() {
        $(this)
          .parent()
          .find(".glyphicon")
          .removeClass("rotate");
      });
  },
  methods: {
    middle(items, part) {
      let _items = [...items];
      let m1 = _items.splice(0, _items.length / 2);
      let m2 = _items.splice(0, _items.length);
      return part === 1 ? m1 : m2;
    },
    fetchSearch() {
      // this.$store.dispatch('search/fetchSearch').then(() => {
      //   this.options[0].children = (this.search && this.search.cnae) ? this.search.cnae : []
      // })
    },
    showModal() {
      sendPageView(`filtro-ubicacion`, `Buscador - Filtro de Ubicacion`);
      this.modalVisible = true;
    },
    hideModal() {
      sendPageView(``, `Buscador - Filtro`);
      this.modalVisible = false;
      let treeselect__input = document.querySelector(
        "#options input.vue-treeselect__input"
      );
      if (treeselect__input) treeselect__input.value = "";
    },
    /**
     * [updateNumberSelectedCompanies actualiza la cantidad de empresas selecionadas en el store de Vuex]
     * @param  {[number]} quantity [cantidad de empresas selecionadas]
     */
    updateNumberSelectedCompanies(quantity) {
      this.$store.dispatch("filters/updateNumberSelectedCompanies", {
        quantity,
      });
    },
    /**
     * [numberCompaniesSelected cuenta la cantidad de empresas selecionadas]
     * @param  {[Array<Object>]} newSelectedCompanies [description]
     * @return {[number]}        accountant  [description]
     */
    numberCompaniesSelected(newSelectedCompanies, key = "cnae") {
      let accountant = 0;
      if (Array.isArray(newSelectedCompanies)) {
        newSelectedCompanies.forEach((item) => {
          let result = inArrayObjectTreeselect(this.search[key], item.id);
          if (result && result.data) {
            accountant = accountant + result.data;
          }
        });
      }
      return accountant;
    },
    /**
     * [isAllProvincesLocalidad saber si el valor del treeselect es TODA ESPAÑA]
     * @param  {[type]}  arrayProvincesLocalidad [description]
     * @return {Boolean}                         [description]
     */
    isAllProvincesLocalidad(arrayProvincesLocalidad) {
      return arrayProvincesLocalidad[0] &&
        arrayProvincesLocalidad[0].id === "all"
        ? true
        : false;
    },
    apply() {
      if (
        (this.selected_cnae && this.selected_cnae.length !== 0) ||
        (this.selected_industria && this.selected_industria.length !== 0)
      ) {
        this.hideModal();
        // this.loadingFrm = true;
        this.formatearDataPOST();
        let beforeForm = beforeOrderFilters(
          this.filters,
          this.applied_filters,
          this.form,
          this.title
        );
        this.$store
          .dispatch("search/filtrar", beforeForm)
          .then((response) => {
            this.updateNumberSelectedCompanies(response.cantidad);
            this.$store.dispatch("filters/addFilters", {
              name: this.title,
              quantity: this.selected_by_code_cnae_and_industria,
              cantidades: response,
            });
            this.areApplied = true;
            this.reapply = false;
            this.loadingFrm = false;
            this.selected_cnae_string = JSON.stringify(
              this.sortData(this.selected_cnae)
            );
            this.selected_industria_string = JSON.stringify(
              this.sortData(this.selected_industria)
            );
            sendEvent(`filtro-aplicado`, this.title);
          })
          .catch(() => {
            this.loadingFrm = false;
          });
      }
    },
    confirmClean() {
      swal
        .fire({
          icon: "question",
          title: "Estas seguro?",
          html: `deseas vaciar el filtro ${this.title}?`,
          showCancelButton: true,
          cancelButtonText: "Cancelar",
          cancelButtonColor: "#d9534f",
          showConfirmButton: true,
          confirmButtonColor: "#337ab7",
          confirmButtonText: "Si, seguro",
        })
        .then((result) => {
          if (result.value) {
            this.clean();
          }
        });
    },
    clean() {
      this.selected_children = [];
      this.selected_industria_string = "";
      this.selected_industria = [];
      this.form.sector_actividad = [];
      this.selected_cnae = [];
      this.valueSelect = [];
      this.selected_cnae_string = "";
      if (this.applied_filters.length > 1) {
        let beforeForm = beforeOrderFilters(
          this.filters,
          this.applied_filters,
          this.form,
          this.title
        );
        this.$store.dispatch("search/filtrar", beforeForm).then((response) => {
          this.updateNumberSelectedCompanies(response.cantidad);
          this.$store.dispatch("filters/setCantidades", {
            cantidades: response,
          });
        });
      } else {
        this.updateNumberSelectedCompanies(0);
      }
      this.selected_by_code_cnae_and_industria = 0;
      this.$store.dispatch("filters/removeFilters", this.title);
      this.areApplied = false;
      this.reapply = false;
      this.loadingSearchTheProvinceorTown = false;
      this.ResultTheProvinceorTown = [];
      this.SearchTheProvinceorTown = "";
      sendEvent("filtro-limpiado", this.title);
    },
    emptyFilter() {
      this.selected_children = [];
      this.selected_industria_string = "";
      this.selected_industria = [];
      this.form.sector_actividad = [];
      this.selected_cnae = [];
      this.valueSelect = [];
      this.selected_cnae_string = "";
      this.updateNumberSelectedCompanies(0);
      this.selected_by_code_cnae_and_industria = 0;
      this.$store.dispatch("filters/removeFilters", this.title);
      this.areApplied = false;
      this.reapply = false;
      this.loadingSearchTheProvinceorTown = false;
      this.ResultTheProvinceorTown = [];
      this.SearchTheProvinceorTown = "";
    },
    handleChange(item, event) {
      const target = event.target;
      const checked = target.checked;
      this.seeSeals(item, checked);
      this.reapply = this.areApplied ? true : this.areApplied;
    },
    seeSeals(item, checked) {
      if (item.children && Array.isArray(item.children)) {
        for (const child of item.children) {
          if (checked) {
            let respalSelectedPL = [...this.selected_cnae];
            respalSelectedPL.push(item);
            respalSelectedPL = removeDuplicates(respalSelectedPL, "id");
            this.selected_cnae = [...respalSelectedPL];
            this.selected_cnae = this.selected_cnae.filter(
              (cnae) => cnae.id !== child.id
            );
          }
          setTimeout(() => {
            const checkbox = document.querySelector(
              `[name="checkbox_children${child.id}"]`
            );
            if (checkbox) {
              checkbox.checked = checked;
            }
          }, 50);
        }
      } else if (item.father_id) {
        const result = inArrayObject(this.search.cnae, item.father_id, "id");
        if (result && result.children && Array.isArray(result.children)) {
          const result2 = this.selected_cnae.filter(
            (cnae) => cnae.father_id === item.father_id
          );
          const isChecked =
            result2 && result2.length === result.children.length;

          if (isChecked) {
            this.seeSeals(result, isChecked);
          } else {
            this.selected_cnae = this.selected_cnae.filter(
              (cnae) => cnae.id !== item.father_id
            );
          }
          const checkbox = document.querySelector(
            `[name="checkbox_father${item.father_id}"]`
          );
          if (checkbox) {
            checkbox.checked = isChecked;
          }

          if (!isChecked) {
            for (const child of result.children) {
              const checkbox = document.querySelector(
                `[name="checkbox_children${child.id}"]`
              );
              if (checkbox && checkbox.checked) {
                let respalSelectedPL = [...this.selected_cnae];
                respalSelectedPL.push(child);
                respalSelectedPL = removeDuplicates(respalSelectedPL, "id");
                this.selected_cnae = [...respalSelectedPL];
              }
            }
          }
        }
      }
    },
    handleChangeList(province, event) {
      event.preventDefault();
      let checkboxs = document.querySelectorAll(
        '#ul_selected_cnae input[type="checkbox"]'
      );
      checkboxs.forEach((item) => {
        item.checked = true;
      });
    },
    searchProvinceorTown() {
      this.loadingSearchTheProvinceorTown = true;
      this.ResultTheProvinceorTown = [];
      this.$store
        .dispatch("search/searchLocalidades", this.SearchTheProvinceorTown)
        .then((response) => {
          if (response.results && Array.isArray(response.results)) {
            this.ResultTheProvinceorTown = response.results;
          }
          this.loadingSearchTheProvinceorTown = false;
        })
        .catch(() => {
          this.loadingSearchTheProvinceorTown = false;
          this.ResultTheProvinceorTown = [];
        });
    },
    handleCheck() {
      //data, checked
    },
    inputTreeselect() {},
    selectTreeselect(item) {
      this.seeSeals(item, true);
    },
    deselectTreeselect(item) {
      this.seeSeals(item, false);
    },
    formatearLabel(item) {
      let _item = { ...item };
      let arr = _item.id.split("|");
      arr.reverse();
      if (arr.length === 1) {
        return _item.label;
      } else if (arr.length > 1) {
        let primero = arr[0];
        arr.shift();
        return `${primero} (${arr.join(",")})`;
      }
    },
    formatearDataPOST() {
      this.selected_children = [];
      this.form.sector_actividad = [];
      this.selected_cnae.forEach((item) => {
        let result = inArrayObjectTreeselect(this.search.cnae, item.id);
        if (result && result.id) {
          this.form.sector_actividad.push(`cnae|${result.id}`);
        }
      });
      this.selected_industria.forEach((item) => {
        if (item && item.id) {
          this.form.sector_actividad.push(`icif|${item.label}`);
        }
      });
      return this.form;
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.label.toLowerCase().indexOf(value.toLowerCase()) !== -1;
    },
    handleCheckChange(data, checked) {
      //data, checked, indeterminate
      if (checked) {
        let respalSelectedPL = [...this.selected_cnae];
        let result = inArrayObjectTreeselect(this.search.cnae, data.id);
        if (result) {
          respalSelectedPL.push(result);
        }
        respalSelectedPL = removeDuplicates(respalSelectedPL, "id");
        this.selected_cnae = [...respalSelectedPL];
      } else {
        this.changeRemoveTag(data.id);
      }
    },
    remoteMethod(query) {
      if (query !== "") {
        const results = searchInArrayObject(query, "id", this.search.cnae);
        this.optionsSelect = results;
      } else {
        this.optionsSelect = [];
      }
    },
    changeRemoveTag(id_elemet) {
      this.selected_cnae = this.selected_cnae.filter(
        (item) => item.id !== id_elemet
      );
    },
    changeClear() {
      //element, checked
    },
    changeMethod() {},
  },
};
</script>

<style lang="scss" scoped>
@import "./../../sass/filters/filters";

.el-select.el-select--medium {
  width: 100%;
}

.max-height-400-overflow {
  overflow-y: auto;
  max-height: 400px;
}
.nav.nav-tabs {
  li.active a {
    color: #fff !important;
  }
}
.ressss {
  margin-top: 40px;
}
.nav-tabs {
  border-bottom: none !important;
}
</style>
