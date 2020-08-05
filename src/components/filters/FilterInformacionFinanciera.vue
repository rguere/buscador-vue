<template>
  <div class="panel panel-default cd" id="filter_informacion_financiera">
    <div class="panel-heading">
      <div class="content_p_select">
        <p class="panel-title roboto white">{{ title }}</p>
      </div>
    </div>
    <div class="panel-body">
      <div class="row">
        <div class="col-md-6">
          <ul class="nav nav-tabs">
            <li v-for="(item, key) in modos" :key="key" :class="modo === item.id ? 'active' : ''">
              <a
                data-toggle="tab"
                @click="setModo(item.id)"
                class="text-white"
                href="#"
              >{{ item.label }}</a>
            </li>
          </ul>
          <div class="tab-content m-t-10">
            <div :class="tabPaneClass('balance')">
              <div class="panel panel-default cd">
                <div class="panel-heading">
                  <p class="panel-title roboto white">
                    Selecciona la partida de balance que desees agregar a tu
                    estrategia de búsqueda
                  </p>
                </div>
                <div class="select-el100" v-if="showSearch">
                  <ul class="nav nav-tabs">
                    <li
                      v-for="(item, key) in search.informacion_financiera"
                      :key="key"
                      :class="tabActivo === item.id ? 'active' : ''"
                    >
                      <a
                        data-toggle="tab"
                        @click="setTabActivo(item.id)"
                        class="text-white"
                        href="#"
                      >{{ item.label }}</a>
                    </li>
                  </ul>
                  <div class="tab-content m-t-10">
                    <div
                      v-for="(item, key) in search.informacion_financiera"
                      :key="key"
                      :class="tabActivoClassClass(item.id)"
                    >
                      <div>
                        <el-select
                          value-key="id"
                          v-model="valueSelect"
                          filterable
                          placeholder="Selecciona"
                          :disabled="disabledValueSelect"
                        >
                          <el-option
                            v-for="_item in item.children"
                            :key="_item.id"
                            :label="_item.label"
                            :value="_item"
                            :class="_item.special ? 'special' : ''"
                          >
                            <span>{{ _item.label }}</span>
                          </el-option>
                        </el-select>
                        <el-tooltip
                          v-if="ifSelectedTal"
                          class="item"
                          effect="dark"
                          content="Limpiar selección"
                          placement="top-start"
                        >
                          <el-button
                            type="danger"
                            style="float: right; float: right; position: absolute; right: 15px; opacity: 0;"
                            icon="el-icon-delete"
                            circle
                            @click="resteSelet"
                          ></el-button>
                        </el-tooltip>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div :class="tabPaneClass('perdidas')">
              <div class="panel panel-default cd">
                <div class="panel-heading">
                  <p class="panel-title roboto white">
                    Selecciona la partida de la cuenta de perdidas y ganancias
                    que desees agregar a tu estrategia de búsqueda
                  </p>
                </div>
                <div class="select-el100" v-if="showSearch">
                  <div>
                    <el-select
                      value-key="id"
                      v-model="valueSelect"
                      filterable
                      placeholder="Selecciona"
                      :disabled="disabledValueSelect"
                    >
                      <el-option
                        v-for="item in search.perdidas"
                        :key="item.id"
                        :label="item.label"
                        :value="item"
                        :class="item.special ? 'special' : ''"
                      ></el-option>
                    </el-select>
                    <el-tooltip
                      v-if="ifSelectedTal"
                      class="item"
                      effect="dark"
                      content="Limpiar selección"
                      placement="top-start"
                    >
                      <el-button
                        type="danger"
                        style="float: right; float: right; position: absolute; right: 15px; opacity: 0;"
                        icon="el-icon-delete"
                        circle
                        @click="resteSelet"
                      ></el-button>
                    </el-tooltip>
                  </div>
                </div>
              </div>
            </div>
            <div :class="tabPaneClass('ratios')">
              <div class="panel panel-default cd">
                <div class="panel-heading">
                  <p class="panel-title roboto white">
                    Seleccione la principales ratios económicos que desee
                    agregar a su estrategia de búsqueda
                  </p>
                </div>
                <div class="select-el100" v-if="showSearch">
                  <ul class="nav nav-tabs">
                    <li
                      v-for="(item, key) in search.ratios"
                      :key="key"
                      :class="tabActivo2 === item.id ? 'active' : ''"
                    >
                      <a
                        data-toggle="tab"
                        @click="setTabActivo2(item.id)"
                        class="text-white"
                        href="#"
                      >{{ item.label }}</a>
                    </li>
                  </ul>
                  <div class="tab-content m-t-10">
                    <div
                      v-for="(item, key) in search.ratios"
                      :key="key"
                      :class="tabActivoClassClass2(item.id)"
                    >
                      <div>
                        <el-select
                          value-key="id"
                          v-model="valueSelect"
                          filterable
                          placeholder="Selecciona"
                          :disabled="disabledValueSelect"
                        >
                          <el-option
                            v-for="_item in item.children"
                            :key="_item.id"
                            :label="`${_item.label} ${_item.unit}`"
                            :value="_item"
                            :class="_item.special ? 'special' : ''"
                          >
                            <span>{{ _item.label }}</span>
                            <span style="float: right;">{{ ` ${_item.unit}` }}</span>
                          </el-option>
                        </el-select>
                        <el-tooltip
                          v-if="ifSelectedTal"
                          class="item"
                          effect="dark"
                          content="Limpiar selección"
                          placement="top-start"
                        >
                          <el-button
                            type="danger"
                            style="float: right; float: right; position: absolute; right: 15px; opacity: 0;"
                            icon="el-icon-delete"
                            circle
                            @click="resteSelet"
                          ></el-button>
                        </el-tooltip>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-6">
          <div class="panel panel-default cd">
            <div class="panel-heading">
              <p class="panel-title roboto white">Seleccionar año(s)</p>
            </div>
            <div class="panel-body">
              <div class="anios_checkboxs_content">
                <div v-for="(item, key) in options_anios" :key="key" :class="classAniosCheckboxs">
                  <div v-for="(_item, _key) in item" :key="_key">
                    <label class="custon-checkboxs">
                      <input
                        type="checkbox"
                        name
                        v-model="selected_anios"
                        @change="changeAnios"
                        :value="_item"
                      />
                      <span class="geekmark"></span>
                      <span class="title">{{ _item.label }}</span>
                    </label>
                  </div>
                </div>
              </div>
              <div class="m-t-10">
                <label class="custon-checkboxs">
                  <input type="checkbox" name v-model="u_a_c_d" @change="setu_a_c_d" :value="true" />
                  <span class="geekmark"></span>
                  <span class="title">Último año con cuentas disponibles.</span>
                </label>
              </div>
              <div class="m-t-10">
                <div v-if="selected_anios.length > 1">
                  <div v-for="(item, key) in options_to_include" :key="key">
                    <label class="custon-checkboxs white" v-if="item.label !== 'incluir_null'">
                      <input
                        type="checkbox"
                        :name="`checkbox___cuentas_disponibles__${item.id}`"
                        v-model="selected_anios"
                        @change="changeAnios"
                        :id="`checkbox___cuentas_disponibles__${item.id}`"
                        :value="item"
                        @click="takeIntoAccount(item, $event)"
                      />
                      <span class="geekmark"></span>
                      <span class="name-checkbox">{{ item.label }}</span>
                    </label>
                  </div>
                </div>
              </div>

              <div class="flex-space-between-flex-end">
                <p></p>
                <p class="text-help m-t-10">* Puedes elegir más de una opción</p>
              </div>
            </div>
          </div>
          <div v-if="modo !== 'ratios'" class="panel panel-default cd">
            <div class="panel-heading">
              <p class="panel-title roboto white">Seleccionar rango</p>
            </div>
            <div class="panel-body">
              <div class="row content_seleccionar_rango">
                <div class="col-md-7" style="padding: 0 0 0 10px;">
                  <div class="item_rango">
                    <el-tag>Mínimo</el-tag>
                    <div class="content_input_tag">
                      <el-input placeholder="Mínimo" type="number" :max="monto2" v-model="monto1"></el-input>
                      <el-tag type="info">{{ selected_unidad.label }}</el-tag>
                    </div>
                  </div>
                  <div class="item_rango">
                    <el-tag>Máximo</el-tag>
                    <div class="content_input_tag">
                      <el-input placeholder="Mínimo" type="number" :min="monto1" v-model="monto2"></el-input>
                      <el-tag type="info">{{ selected_unidad.label }}</el-tag>
                    </div>
                  </div>
                </div>
                <div class="col-md-5">
                  <div class="m-t-10">
                    <el-tag type="info">Unidad</el-tag>
                    <el-select
                      value-key="id"
                      v-model="selected_unidad"
                      @change="setSelectedUnidad"
                      placeholder="Unidad"
                    >
                      <el-option
                        v-for="item in unidades"
                        :key="item.id"
                        :label="item.label"
                        :value="item"
                      ></el-option>
                    </el-select>
                  </div>
                  <div class="m-t-10">
                    <label class="custon-checkboxs ___">
                      <input type="checkbox" name v-model="todas_las_empresas" :value="true" />
                      <span class="geekmark"></span>
                      <span class="title">Todas las empresas con el dato disponible.</span>
                    </label>
                  </div>
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
          <button v-if="showBrnApplied" type="button" class="btn btn-success" @click="apply">
            Aplicar
            <i :class="loadingFrm ? 'fa  fa-spinner fa-spin' : 'fa  fa-send'"></i>
          </button>
          <button type="button" class="btn btn-info" v-if="areApplied" @click="confirmClean">
            Limpiar
            <i class="fa fa-undo"></i>
          </button>
        </div>
        <p class="text-help">* Puedes elegir más de una opción</p>
      </div>
      <!-- <div class="row">
        <div class="col-md-12">
          <pre>{{ selectBalance }}</pre>
          <hr />
          <pre>{{ items_IF }}</pre>
        </div>
      </div>-->
      <div class="row" v-if="items_IF && items_IF.length > 0">
        <div class="col-md-12">
          <el-collapse v-model="collapseResumen">
            <el-collapse-item title="Resumen de Información Financiera seleccionada" name="1">
              <div class="div-scroll-200 ul_selected_cnae">
                <el-card shadow="hover" v-for="(item, key) in items_IF" :key="key">
                  <label class="custon-checkboxs">
                    <input
                      type="checkbox"
                      v-model="items_IF"
                      @change="changeResumen($event, item)"
                      :name="`checkbox_list_${item.id}`"
                      :value="item"
                    />
                    <span class="geekmark"></span>
                    <span class="name-checkbox">
                      <b>{{ item.label }}</b>
                    </span>,
                    <span v-if="item.anios">{{ item.anios }}</span>,
                    <span v-if="item.unidad">{{ item.unidad }}</span>,
                    <span v-if="item.rango">{{ item.rango }}</span>
                  </label>
                </el-card>
              </div>
            </el-collapse-item>
          </el-collapse>
        </div>
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
              <button v-if="showBrnApplied" type="button" class="btn btn-success" @click="apply">
                Aplicar
                <i :class="loadingFrm ? 'fa  fa-spinner fa-spin' : 'fa  fa-send'"></i>
              </button>
              <button type="button" class="btn btn-info" v-if="areApplied" @click="confirmClean">
                Limpiar
                <i class="fa fa-undo"></i>
              </button>
            </div>
          </div>
          <div class="conten-flex-70-30">
            <div>
              <div class="row">
                <div class="col-md-6">
                  <ul class="nav nav-tabs">
                    <li
                      v-for="(item, key) in modos"
                      :key="key"
                      :class="modo === item.id ? 'active' : ''"
                    >
                      <a
                        data-toggle="tab"
                        @click="setModo(item.id)"
                        class="text-white"
                        href="#"
                      >{{ item.label }}</a>
                    </li>
                  </ul>
                  <div class="tab-content m-t-10">
                    <div :class="tabPaneClass('balance')">
                      <div class="panel panel-default cd">
                        <div class="panel-heading">
                          <p class="panel-title roboto white">
                            Selecciona la partida de balance que desees agregar
                            a tu estrategia de búsqueda
                          </p>
                        </div>
                        <div class="select-el100" v-if="showSearch">
                          <ul class="nav nav-tabs">
                            <li
                              v-for="(item,
                              key) in search.informacion_financiera"
                              :key="key"
                              :class="tabActivo === item.id ? 'active' : ''"
                            >
                              <a
                                data-toggle="tab"
                                @click="setTabActivo(item.id)"
                                class="text-white"
                                href="#"
                              >{{ item.label }}</a>
                            </li>
                          </ul>
                          <div class="tab-content m-t-10">
                            <div
                              v-for="(item,
                              key) in search.informacion_financiera"
                              :key="key"
                              :class="tabActivoClassClass(item.id)"
                            >
                              <div>
                                <el-select
                                  value-key="id"
                                  v-model="valueSelect"
                                  filterable
                                  placeholder="Selecciona"
                                  :disabled="disabledValueSelect"
                                >
                                  <el-option
                                    v-for="_item in item.children"
                                    :key="_item.id"
                                    :label="_item.label"
                                    :value="_item"
                                    :class="_item.special ? 'special' : ''"
                                  >
                                    <span>{{ _item.label }}</span>
                                  </el-option>
                                </el-select>
                                <el-tooltip
                                  v-if="ifSelectedTal"
                                  class="item"
                                  effect="dark"
                                  content="Limpiar selección"
                                  placement="top-start"
                                >
                                  <el-button
                                    type="danger"
                                    style="float: right; float: right; position: absolute; right: 15px; opacity: 0;"
                                    icon="el-icon-delete"
                                    circle
                                    @click="resteSelet"
                                  ></el-button>
                                </el-tooltip>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div :class="tabPaneClass('perdidas')">
                      <div class="panel panel-default cd">
                        <div class="panel-heading">
                          <p class="panel-title roboto white">
                            Selecciona la partida de la cuenta de perdidas y
                            ganancias que desees agregar a tu estrategia de
                            búsqueda
                          </p>
                        </div>
                        <div class="select-el100" v-if="showSearch">
                          <div>
                            <el-select
                              value-key="id"
                              v-model="valueSelect"
                              filterable
                              placeholder="Selecciona"
                              :disabled="disabledValueSelect"
                            >
                              <el-option
                                v-for="item in search.perdidas"
                                :key="item.id"
                                :label="item.label"
                                :class="item.special ? 'special' : ''"
                                :value="item"
                              ></el-option>
                            </el-select>
                            <el-tooltip
                              v-if="ifSelectedTal"
                              class="item"
                              effect="dark"
                              content="Limpiar selección"
                              placement="top-start"
                            >
                              <el-button
                                type="danger"
                                style="float: right; float: right; position: absolute; right: 15px; opacity: 0;"
                                icon="el-icon-delete"
                                circle
                                @click="resteSelet"
                              ></el-button>
                            </el-tooltip>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div :class="tabPaneClass('ratios')">
                      <div class="panel panel-default cd">
                        <div class="panel-heading">
                          <p class="panel-title roboto white">
                            Seleccione la principales ratios económicos que
                            desee agregar a su estrategia de búsqueda
                          </p>
                        </div>
                        <div class="select-el100" v-if="showSearch">
                          <ul class="nav nav-tabs">
                            <li
                              v-for="(item, key) in search.ratios"
                              :key="key"
                              :class="tabActivo2 === item.id ? 'active' : ''"
                            >
                              <a
                                data-toggle="tab"
                                @click="setTabActivo2(item.id)"
                                class="text-white"
                                href="#"
                              >{{ item.label }}</a>
                            </li>
                          </ul>
                          <div class="tab-content m-t-10">
                            <div
                              v-for="(item, key) in search.ratios"
                              :key="key"
                              :class="tabActivoClassClass2(item.id)"
                            >
                              <div>
                                <el-select
                                  value-key="id"
                                  v-model="valueSelect"
                                  filterable
                                  placeholder="Selecciona"
                                  :disabled="disabledValueSelect"
                                >
                                  <el-option
                                    v-for="_item in item.children"
                                    :key="_item.id"
                                    :label="`${_item.label} ${_item.unit}`"
                                    :value="_item"
                                    :class="_item.special ? 'special' : ''"
                                  >
                                    <span>{{ _item.label }}</span>
                                    <span style="float: right;">{{ ` ${_item.unit}` }}</span>
                                  </el-option>
                                </el-select>
                                <el-tooltip
                                  v-if="ifSelectedTal"
                                  class="item"
                                  effect="dark"
                                  content="Limpiar selección"
                                  placement="top-start"
                                >
                                  <el-button
                                    type="danger"
                                    style="float: right; float: right; position: absolute; right: 15px; opacity: 0;"
                                    icon="el-icon-delete"
                                    circle
                                    @click="resteSelet"
                                  ></el-button>
                                </el-tooltip>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="panel panel-default cd">
                    <div class="panel-heading">
                      <p class="panel-title roboto white">Seleccionar año(s)</p>
                    </div>
                    <div class="panel-body">
                      <div class="anios_checkboxs_content">
                        <div
                          v-for="(item, key) in options_anios"
                          :key="key"
                          :class="classAniosCheckboxs"
                        >
                          <div v-for="(_item, _key) in item" :key="_key">
                            <label class="custon-checkboxs">
                              <input
                                type="checkbox"
                                name
                                v-model="selected_anios"
                                @change="changeAnios"
                                :value="_item"
                              />
                              <span class="geekmark"></span>
                              <span class="title">{{ _item.label }}</span>
                            </label>
                          </div>
                        </div>
                      </div>
                      <div class="m-t-10">
                        <label class="custon-checkboxs">
                          <input
                            type="checkbox"
                            name
                            v-model="u_a_c_d"
                            @change="setu_a_c_d"
                            :value="true"
                          />
                          <span class="geekmark"></span>
                          <span class="title">Último año con cuentas disponibles.</span>
                        </label>
                      </div>
                      <div class="m-t-10">
                        <div v-if="selected_anios.length > 1">
                          <div v-for="(item, key) in options_to_include" :key="key">
                            <label
                              class="custon-checkboxs white"
                              v-if="item.label !== 'incluir_null'"
                            >
                              <input
                                type="checkbox"
                                :name="
                                  `checkbox___cuentas_disponibles__${item.id}`
                                "
                                v-model="selected_anios"
                                @change="changeAnios"
                                :id="
                                  `checkbox___cuentas_disponibles__${item.id}`
                                "
                                :value="item"
                                @click="takeIntoAccount(item, $event)"
                              />
                              <span class="geekmark"></span>
                              <span class="name-checkbox">
                                {{
                                item.label
                                }}
                              </span>
                            </label>
                          </div>
                        </div>
                      </div>

                      <div class="flex-space-between-flex-end">
                        <p></p>
                        <p class="text-help m-t-10">* Puedes elegir más de una opción</p>
                      </div>
                    </div>
                  </div>
                  <div v-if="modo !== 'ratios'" class="panel panel-default cd">
                    <div class="panel-heading">
                      <p class="panel-title roboto white">Seleccionar rango</p>
                    </div>
                    <div class="panel-body">
                      <div class="row content_seleccionar_rango">
                        <div class="col-md-7" style="padding: 0 0 0 10px;">
                          <div class="item_rango">
                            <el-tag>Mínimo</el-tag>
                            <div class="content_input_tag">
                              <el-input
                                placeholder="Mínimo"
                                type="number"
                                :max="monto2"
                                v-model="monto1"
                              ></el-input>
                              <el-tag type="info">{{ selected_unidad.label }}</el-tag>
                            </div>
                          </div>
                          <div class="item_rango">
                            <el-tag>Máximo</el-tag>
                            <div class="content_input_tag">
                              <el-input
                                placeholder="Mínimo"
                                type="number"
                                :min="monto1"
                                v-model="monto2"
                              ></el-input>
                              <el-tag type="info">{{ selected_unidad.label }}</el-tag>
                            </div>
                          </div>
                        </div>
                        <div class="col-md-5">
                          <div class="m-t-10">
                            <el-tag type="info">Unidad</el-tag>
                            <el-select
                              value-key="id"
                              v-model="selected_unidad"
                              @change="setSelectedUnidad"
                              placeholder="Unidad"
                            >
                              <el-option
                                v-for="item in unidades"
                                :key="item.id"
                                :label="item.label"
                                :value="item"
                              ></el-option>
                            </el-select>
                          </div>
                          <div class="m-t-10">
                            <label class="custon-checkboxs ___">
                              <input
                                type="checkbox"
                                name
                                v-model="todas_las_empresas"
                                :value="true"
                              />
                              <span class="geekmark"></span>
                              <span class="title">Todas las empresas con el dato disponible.</span>
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div class="row" v-if="items_IF && items_IF.length > 0">
                <div class="col-md-12">
                  <el-collapse v-model="collapseResumen2">
                    <el-collapse-item
                      title="Resumen de Información Financiera seleccionada"
                      name="1"
                    >
                      <div class="div-scroll-200 ul_selected_cnae">
                        <el-card shadow="hover" v-for="(item, key) in items_IF" :key="key">
                          <label class="custon-checkboxs">
                            <input
                              type="checkbox"
                              v-model="items_IF"
                              @change="changeResumen($event, item)"
                              :name="`checkbox_list_${item.id}`"
                              :value="item"
                            />
                            <span class="geekmark"></span>
                            <span class="name-checkbox">
                              <b>{{ item.label }}</b>
                            </span>,
                            <span v-if="item.anios">{{ item.anios }}</span>,
                            <span v-if="item.unidad">{{ item.unidad }}</span>,
                            <span v-if="item.rango">{{ item.rango }}</span>
                          </label>
                        </el-card>
                      </div>
                    </el-collapse-item>
                  </el-collapse>
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
import { persistentData } from "./../../mixins/persistent-data";
import swal from "sweetalert2";

import { mapGetters } from "vuex";
import {
  beforeOrderFilters,
  sendEvent,
  removeDuplicates,
  removeDuplicateItem,
  sendPageView,
} from "./../../utils";

const setMin = (item) => {
  return item.id;
};

export default {
  name: "filter-informacion-financiera",
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
    showSearch() {
      return (
        this.search &&
        this.search.informacion_financiera &&
        this.search.informacion_financiera.length !== 0 &&
        this.search.estados &&
        this.search.estados.length !== 0 &&
        this.search.ratios &&
        this.search.ratios.length !== 0
      );
    },
    showOptions() {
      return this.options && this.options.length && this.options.length !== 0;
    },
    classAniosCheckboxs() {
      return this.u_a_c_d ? "anios_checkboxs" : "anios_checkboxs";
    },
    showBrnApplied() {
      return !this.compareWithNewtoApply;
      // return (
      //   (this.balance().length !== 0 && !this.areApplied) ||
      //   (this.balance().length !== 0 && !this.compareWithNewtoApply)
      // );
    },
    compareWithNewtoApply: function () {
      let stg = this.balance_string;
      let obj = JSON.stringify(this.balance());
      return stg.length === obj.length;
    },
    ifSelectedTal() {
      return (
        this.treDisabled &&
        this.valueSelect &&
        this.valueSelect.label &&
        this.valueSelect.label.length !== 0
      );
    },
  },
  data: () => ({
    title: "Información Financiera",
    treDisabled: false,
    selectBalance: [],
    items_IF: [],
    collapseResumen: [],
    collapseResumen2: ["1"],
    tabActivo: "children_activo",
    tabActivo2: "children_ratios_de_rentabilidad",
    modo: "balance",
    modos: [
      {
        id: "balance",
        label: "Balance de Situación",
      },
      {
        id: "perdidas",
        label: "Cuenta de Perdidas y ganancias",
      },
      {
        id: "ratios",
        label: "Principales Ratios Económicos",
      },
    ],
    loadingFrm: false,
    modalVisible: false,
    areApplied: false,
    reapply: false,
    selected_informacion_financiera: [],
    selected_anios: [],
    monto1: "",
    monto2: "",
    selected_unidad: {
      id: 1000,
      label: "Miles de euros",
    },
    todas_las_empresas: false,
    u_a_c_d: true,
    unidades: [
      {
        id: 1,
        label: "Euros",
      },
      {
        id: 1000,
        label: "Miles de euros",
      },
      {
        id: 1000000,
        label: "Millones de euros",
      },
    ],
    options: [],
    options_to_include: [
      {
        id: "todos:true",
        label: "Aplicar en la búsqueda TODOS los años seleccionados",
        data: null,
      },
      {
        id: "todos:false",
        label: "Aplicar en la búsqueda al menos uno de los años seleccionados",
        data: null,
      },
    ],
    options_anios: [
      [
        {
          id: 2019,
          label: 2019,
        },
        {
          id: 2018,
          label: 2018,
        },
      ],
      [
        {
          id: 2017,
          label: 2017,
        },
        {
          id: 2016,
          label: 2016,
        },
      ],
      [
        {
          id: 2015,
          label: 2015,
        },
        {
          id: 2014,
          label: 2014,
        },
      ],
    ],
    balance_string: "[]",
    valueSelect: null,
    disabledValueSelect: false,
    itemsApplied: {},
  }),
  watch: {
    search: function (newSearch) {
      if (newSearch && newSearch.informacion_financiera) {
        this.options = newSearch.informacion_financiera;
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
    if (this.search && this.search.informacion_financiera) {
      this.options = this.search.informacion_financiera;
    }
    this.monto1 = setMin(this.selected_unidad);
  },
  methods: {
    balance() {
      let balance = [];
      const anios = [];
      let monto1 =
        `${this.monto1}`.length === 0 || this.todas_las_empresas
          ? null
          : this.monto1;
      let monto2 =
        `${this.monto2}`.length === 0 || this.todas_las_empresas
          ? null
          : this.monto2;

      if (
        this.valueSelect &&
        this.valueSelect.label &&
        this.valueSelect.label.length !== 0
      ) {
        for (const item of this.selected_anios) {
          if (item.id !== "todos:true" && item.id !== "todos:false") {
            anios.push(item.id);
          } else {
            balance.push(item.id);
          }
        }

        monto1 = this.monto1 * this.selected_unidad.id;
        monto2 = this.monto2 * this.selected_unidad.id;

        monto1 = monto1 === 0 ? null : monto1;
        monto2 = monto2 === 0 ? null : monto2;

        monto1 = this.modo === "ratios" ? null : monto1;
        monto2 = this.modo === "ratios" ? null : monto2;

        const item = this.valueSelect;
        const _anios =
          this.u_a_c_d || anios.length == 0 ? null : anios.join(",");

        if (
          (item.id === "children_activo" || item.id === "children_pasivo") &&
          item.children
        ) {
          for (const _item of item.children) {
            const item_balance = `${_anios}|${_item.id}-${_item.label}|${monto1}|${monto2}`;
            balance.push(item_balance);
            this.itemsApplied[item_balance] = {
              valueSelect: this.valueSelect,
              anios: _anios,
              monto1: this.monto1,
              monto2: this.monto2,
              selected_unidad: this.selected_unidad,
            };
          }
        } else {
          const item_balance = `${_anios}|${item.id}-${item.label}|${monto1}|${monto2}`;
          balance.push(item_balance);
          this.itemsApplied[item_balance] = {
            valueSelect: this.valueSelect,
            anios: _anios,
            monto1: this.monto1,
            monto2: this.monto2,
            selected_unidad: this.selected_unidad,
          };
        }

        this.treDisabled = true;
        this.disabledValueSelect = true;
      }

      balance = this.selectBalance.concat(balance);

      balance = removeDuplicateItem(balance);
      return balance;
    },
    resteSelet() {
      this.selected_informacion_financiera = [];
      this.treDisabled = false;
      this.disabledValueSelect = false;
      this.valueSelect = null;
    },
    changeResumen(event, itemResumen) {
      event.preventDefault();
      let checkboxs = document.querySelectorAll(
        '.ul_selected_cnae input[type="checkbox"]'
      );
      checkboxs.forEach((item) => {
        item.checked = true;
      });

      this.reapply = this.areApplied ? true : this.areApplied;

      this.selectBalance = this.selectBalance.filter((item) => {
        return item !== itemResumen.itemSelect;
      });

      // const balance = this.balance();
      // for (const key in this.items_IF) {
      //   if (this.items_IF.hasOwnProperty(key)) {
      //     const element = this.items_IF[key];
      //     // for (const key in balance) {
      //     //   if (balance.hasOwnProperty(key)) {
      //     //     const b_element = balance[key];
      //     //     if (b_element === element.item) {
      //     //       this.selectBalance = this.selectBalance.filter(
      //     //         (item) => item !== b_element
      //     //       );
      //     //       this.areApplied = false;
      //     //     }
      //     //   }
      //     // }
      //   }
      // }

      if (this.items_IF && this.items_IF.length === 0) {
        this.clean();
      }
    },
    apply() {
      const _balance = this.balance();
      if (_balance && _balance.length !== 0) {
        this.hideModal();
        this.loadingFrm = true;
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
            this.selectBalance = this.selectBalance.concat(_balance);
            this.selectBalance = removeDuplicateItem(this.selectBalance);
            this.items_IF = [];
            for (const item of this.selectBalance) {
              const result_item = this.getItemApplied(item);
              if (result_item) {
                this.items_IF.push({
                  itemSelect: item,
                  ...result_item,
                });
              }
            }
            this.$store.dispatch("filters/addFilters", {
              name: this.title,
              quantity: _balance.length,
              cantidades: response,
              items: this.items_IF,
            });
            this.areApplied = true;
            this.reapply = false;
            this.loadingFrm = false;
            this.treDisabled = false;
            this.disabledValueSelect = false;
            this.selected_informacion_financiera = [];
            this.valueSelect = null;
            this.balance_string = JSON.stringify(_balance);
            sendEvent(`filtro-aplicado`, this.title);
          })
          .catch(() => {
            this.loadingFrm = false;
            this.treDisabled = false;
            this.disabledValueSelect = false;
          });
      }
    },
    showModal() {
      sendPageView(`filtro-ubicacion`, `Buscador - Filtro de Ubicacion`);
      this.modalVisible = true;
    },
    hideModal() {
      sendPageView(``, `Buscador - Filtro`);
      this.modalVisible = false;
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
    tabPaneClass(tap) {
      return this.modo === tap ? "tab-pane fade in active" : "tab-pane fade";
    },
    tabActivoClassClass(tap) {
      return this.tabActivo === tap
        ? "tab-pane fade in active"
        : "tab-pane fade";
    },
    tabActivoClassClass2(tap) {
      return this.tabActivo2 === tap
        ? "tab-pane fade in active"
        : "tab-pane fade";
    },
    clean() {
      this.itemsApplied = {};
      this.form.balance = [];
      this.form.perdidas = [];
      this.selectBalance = [];
      this.items_IF = [];
      this.valueSelect = null;
      this.treDisabled = false;
      this.disabledValueSelect = false;
      this.loadingFrm = false;
      this.modalVisible = false;
      this.areApplied = false;
      this.reapply = false;
      this.selected_informacion_financiera = [];
      this.selected_anios = [];
      this.monto2 = "";
      this.selected_unidad = {
        id: 1000,
        label: "Miles de euros",
      };
      this.monto1 = setMin(this.selected_unidad);
      this.todas_las_empresas = false;
      this.u_a_c_d = true;

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
      this.$store.dispatch("filters/removeFilters", this.title);
      sendEvent("filtro-limpiado", this.title);
    },
    emptyFilter() {
      this.itemsApplied = {};
      this.form.balance = [];
      this.form.perdidas = [];
      this.selectBalance = [];
      this.items_IF = [];
      this.valueSelect = null;
      this.treDisabled = false;
      this.disabledValueSelect = false;
      this.loadingFrm = false;
      this.modalVisible = false;
      this.areApplied = false;
      this.reapply = false;
      this.selected_informacion_financiera = [];
      this.selected_anios = [];
      this.monto1 = setMin(this.selected_unidad);
      this.monto2 = "";
      this.selected_unidad = {
        id: 1000,
        label: "Miles de euros",
      };
      this.todas_las_empresas = false;
      this.u_a_c_d = true;
      this.updateNumberSelectedCompanies(0);
      this.$store.dispatch("filters/removeFilters", this.title);
    },
    setSelectedUnidad() {},
    setu_a_c_d() {
      if (this.u_a_c_d) {
        this.selected_anios = [];
      }
    },
    setModo(idModo) {
      this.modo = idModo;
      this.selected_informacion_financiera = [];
      this.treDisabled = false;
      this.disabledValueSelect = false;
      this.valueSelect = null;
    },
    setTabActivo(tab) {
      this.tabActivo = tab;
    },
    setTabActivo2(tab) {
      this.tabActivo2 = tab;
    },
    fetchSearch() {},
    inputTreeselect() {},
    selectTreeselect() {},
    deselectTreeselect() {},
    takeIntoAccount(item, event = null) {
      if (item.id === "todos:true") {
        this.selected_anios = this.selected_anios.filter(
          (item) => item.id !== "todos:false"
        );
        this.selected_anios.push(this.options_to_include[0]);
      } else if (item.id === "todos:false") {
        this.selected_anios = this.selected_anios.filter(
          (item) => item.id !== "todos:true"
        );
        this.selected_anios.push(this.options_to_include[1]);
      }
      this.selected_anios = removeDuplicates(this.selected_anios, "id");
      if (event && event.target && event.target.tagName === "INPUT") {
        event.target.checked = true;
      }
    },
    takeIntoAccountDefault() {
      if (
        this.selected_anios &&
        this.selected_anios.length > 1 &&
        this.options_to_include &&
        this.options_to_include.length > 0
      ) {
        let tiene = this.selected_anios.filter(
          (item) => item.id === "todos:false" || item.id === "todos:true"
        );
        if (tiene && tiene.length === 0) {
          this.takeIntoAccount(this.options_to_include[0]);
        }
      }
      if (this.selected_anios && this.selected_anios.length <= 2) {
        this.selected_anios = this.selected_anios.filter(
          (item) => item.id !== "todos:false"
        );
        this.selected_anios = this.selected_anios.filter(
          (item) => item.id !== "todos:true"
        );
        this.selected_anios = removeDuplicates(this.selected_anios, "id");
      }
    },
    formatearDataPOST() {
      this.form.balance = [];
      this.form.perdidas = [];
      this.form.ratios = [];
      const _balance = this.balance();
      _balance.forEach((item) => {
        if (this.modo === "balance") {
          this.form.balance.push(item);
        } else if (this.modo === "perdidas") {
          this.form.perdidas.push(item);
        } else if (this.modo === "ratios") {
          this.form.ratios.push(item);
        }
      });
      return this.form;
    },
    updateNumberSelectedCompanies(quantity) {
      this.$store.dispatch("filters/updateNumberSelectedCompanies", {
        quantity,
      });
    },
    changeAnios() {
      if (this.selected_anios && this.selected_anios.length > 0) {
        this.u_a_c_d = false;
      } else {
        this.u_a_c_d = true;
      }
    },
    getItemApplied(item) {
      let result = null;
      const itemApplied = this.itemsApplied[item];
      if (itemApplied && itemApplied.selected_unidad) {
        result = {};
        result.anios = itemApplied.anios
          ? `Año(s) ${itemApplied.anios}`
          : "Último año con cuentas disponibles";

        result.rango = `min ${
          itemApplied.monto1 !== "" ? itemApplied.monto1 : 0
        } y max ${itemApplied.monto2 !== "" ? itemApplied.monto2 : 0}`;

        result.unidad = itemApplied.selected_unidad.label;
        result.label = itemApplied.valueSelect.label;
        result.id = itemApplied.valueSelect.id;
      }
      return result;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./../../sass/filters/filters";

.anios_checkboxs_content {
  display: flex;
  justify-content: space-around;
  .anios_checkboxs {
    &.disabled {
      label {
        cursor: not-allowed;
      }
    }
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    flex: 1;
    margin-left: 10px;
    div {
      margin: 0 10px 0 0;
      label {
        width: 100%;
        .title {
          font-weight: bold;
        }
      }
    }
  }
}

label.custon-checkboxs {
  &.___ {
    color: #909399;
  }
  width: 100%;
  .title {
    font-weight: bold;
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  }
}

.content_seleccionar_rango {
  .el-tag {
    width: 100%;
    height: 36px;
    padding: 5px 10px;
    display: block;
  }

  .item_rango {
    margin-top: 10px;
  }

  .content_input_tag {
    display: flex;
    justify-content: center;
    align-items: center;
    .el-tag {
      font-size: 12px !important;
      padding: 5px 0 0 5px !important;
      max-width: 110px !important;
    }
  }
}
.content_tag_select_modo {
  display: flex;
  .el-tag {
    margin-right: 10px;
  }
}
.nav.nav-tabs {
  li.active a {
    color: #fff !important;
  }
}
.nav-tabs {
  border-bottom: none !important;
}
.children_list {
  margin-left: 30px;
  li {
    list-style: circle;
  }
}
.select-el100 {
  .el-select {
    width: 100%;
  }
}

.el-select-dropdown__item.special {
  background-color: #80a6cf !important;
  color: #f9f9f9 !important;
  &:hover,
  &.selected {
    background-color: #347ab7 !important;
    color: #fff !important;
  }
}
</style>
