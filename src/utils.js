/**
 * [objectToArray convertir un objeto JSON a Array]
 * @param  {[Object]} obj [objeto JSON]
 * @return {[Array]}     [Array]
 */
export const objectToArray = (obj) => {
  let auditores = [];
  if (obj && Array.isArray(obj) && obj.length > 0) {
    for (const items of obj) {
      if (Array.isArray(items)) {
        for (const item of items) {
          auditores.push(item);
        }
      }
    }
  }
  return auditores;
};

/**
 * [removeDuplicates remueve de una Array de Objetos los duplicados segun una propiedad]
 * @param  {[Array]} originalArray [Array al que se le removeran los duplicados]
 * @param  {[String]} prop          [propiedad a remover sus valores duplicados]
 * @return {[Array]}               [nuevo Array sin duplicados]
 */
export const removeDuplicates = (originalArray, prop) => {
  let newArray = [];
  let lookupObject = {};
  for (let key in originalArray) {
    lookupObject[originalArray[key][prop]] = originalArray[key];
  }
  for (let key in lookupObject) {
    newArray.push(lookupObject[key]);
  }
  return newArray;
};

export const removeDuplicateItem = (items) =>
  items.filter((v, i) => items.indexOf(v) === i);

/**
 * [inArrayObject description]
 * @param  {[type]} array  [description]
 * @param  {[type]} search [description]
 * @param  {String} key    [description]
 * @return {[type]}        [description]
 */
export const inArrayObject = (array, search, key = "id") => {
  let results = array.filter(function(item) {
    return item[key] == search;
  });
  return results.length > 0 ? results[0] : null;
};

export const inArrayObjectTreeselect = (array, search, key = "id") => {
  let results = null;

  for (let i in array) {
    if (array[i][key] === search) {
      results = array[i];

      break;
    } else if (array[i].children && Array.isArray(array[i].children)) {
      for (let j in array[i].children) {
        if (array[i].children[j][key] === search) {
          results = array[i].children[j];

          break;
        } else if (
          array[i].children[j].children &&
          Array.isArray(array[i].children[j].children)
        ) {
          for (let k in array[i].children[j].children) {
            if (array[i].children[j].children[k][key] === search) {
              results = array[i].children[j].children[k];
              break;
            } else if (
              array[i].children[j].children[k].children &&
              Array.isArray(array[i].children[j].children[k].children)
            ) {
              for (let l in array[i].children[j].children[k].children) {
                if (
                  array[i].children[j].children[k].children[l][key] === search
                ) {
                  results = array[i].children[j].children[k].children[l];
                  break;
                }
              }
            }
          }
        }
      }
    }
  }

  return results;
};

export const handleScroll = () => {
  let element = document.getElementById("filter-buttons");
  let my_container = document.querySelector(".my_container");
  if (element && my_container) {
    let top = element.offsetTop;
    if (!(top >= window.pageYOffset)) {
      element.classList.add("is-fixed");
      my_container.classList.add("container");
    } else {
      element.classList.remove("is-fixed");
      my_container.classList.remove("container");
    }
  }
};

export const howAnimation = (element) => {
  if (element) {
    element.classList.add("bounce-leave-active");
    setTimeout(function() {
      element.classList.remove("bounce-leave-active");
    }, 1000);
  }
};

export const spacesByDashes = (value) => {
  value = value.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
  value = value.replace(/(?:\r\n|\r|\n)/g, ",");
  for (var i = 0; i <= 20; i++) {
    value = value.split(",,").join(",");
  }
  return value;
};

export const orderFilters = (filters, applied_filters) => {
  let arrayResult = applied_filters.map((item) => {
    return inArrayObject(filters, item, `name`);
  });
  return arrayResult;
};

export const beforeOrderFilters = (filters, applied_filters, form, title) => {
  let before_applied_filters = [...applied_filters];
  let before_filters = [...filters];
  let before_form = { ...form };

  if (!before_applied_filters.includes(title)) {
    before_applied_filters.push(title);
  }

  let arrayResult = orderFilters(before_filters, before_applied_filters);

  if (arrayResult && arrayResult.length !== 0) {
    let arr = {};
    let comunidades = [];
    before_form.filtros = [];
    arrayResult.map((item) => {
      if (item.key === "comunidades") {
        comunidades = before_form[item.key].concat(
          before_form.Provincias,
          before_form.Localidades
        );
        if (comunidades.length !== 0) {
          arr[item.key] = comunidades;
        }
        if (before_form.Localidades && before_form.Localidades.length !== 0) {
          arr["Localidades"] = before_form.Localidades;
        }
        if (before_form.Provincias && before_form.Provincias.length !== 0) {
          arr["Provincias"] = before_form.Provincias;
        }
      } else {
        if (before_form[item.key].length !== 0) {
          arr[item.key] = before_form[item.key];
        }
        if (
          item._key &&
          before_form[item._key] &&
          before_form[item._key].length !== 0
        ) {
          arr[item._key] = before_form[item._key];
        }
        if (
          item.__key &&
          before_form[item.__key] &&
          before_form[item.__key].length !== 0
        ) {
          arr[item.__key] = before_form[item.__key];
        }
      }
      let aux = { ...arr };
      if (Object.keys(aux).length !== 0) {
        before_form.filtros.push(aux);
      }
    });
  }

  return before_form;
};

export const countByProperty = (array, property) => {
  let count = 0;
  for (const key in array) {
    if (array.hasOwnProperty(key)) {
      const element = array[key];
      if (element[property]) {
        count += element[property];
      } else if (element.hasOwnProperty("RazonSocial")) {
        count++;
        element.label = element.RazonSocial;
      }
    }
  }
  return count;
};

export const sendPageView = (page, title) => {
  if (window.ga) {
    window.ga("set", "page", `/buscador/${page}`);
    window.ga("set", "title", title);
    window.ga("send", "pageview");
  }
};

export const sendEvent = (cat, name) => {
  if (window.ga) {
    window.ga("send", "event", cat, name);
  }
};

export const getColumnsSummary = () => {
  return [
    {
      prop: "RazonSocial",
      label: "Razón social",
      width: "360",
      show: true,
      sortable: true,
    },
    {
      prop: "Provincia",
      label: "Provincia",
      width: "130",
      show: true,
      sortable: true,
    },
    {
      prop: "Localidad",
      label: "Localidad",
      width: "130",
      show: true,
      sortable: true,
    },
    {
      prop: "CIF",
      label: "NIF",
      width: "93",
      show: true,
      sortable: true,
    },
    {
      prop: "Codigo_Postal",
      label: "Código Postal",
      width: "118",
      show: true,
      sortable: true,
    },
    {
      prop: "FechaConstitucionOrigen",
      label: "Fecha constitución",
      width: "145",
      show: true,
      sortable: true,
    },
    {
      prop: "anios_empresa",
      label: "Antigüedad (en años)",
      width: "157",
      show: true,
      sortable: true,
    },
    {
      prop: "SumTotalEmpleados",
      label: "Número empleados",
      width: "147",
      show: true,
      sortable: true,
    },
    {
      prop: "CuentasDisponibles",
      label: "Años con cuentas disponibles",
      width: "210",
      show: true,
      sortable: true,
    },
    {
      prop: "TipoCuentasAnuales",
      label: "Tipos de cuentas",
      width: "210",
      show: true,
      sortable: true,
    },
    {
      prop: "audCod",
      label: "Roac",
      width: "210",
      show: true,
      sortable: true,
    },
    {
      prop: "audDes",
      label: "Auditor",
      width: "210",
      show: true,
      sortable: true,
    },
    {
      prop: "audSit",
      label: "Situación",
      width: "210",
      show: true,
      sortable: true,
    },
    {
      prop: "cargos",
      label: "Cargos",
      width: "210",
      show: true,
      sortable: true,
    },
    {
      prop: "IndustriaDescripcion",
      label: "Sector Infocif",
      width: "210",
      show: true,
      sortable: true,
    },
    {
      prop: "Cnae3_code",
      label: "Actividad Código",
      width: "210",
      show: true,
      sortable: true,
    },
    {
      prop: "Cnae3_text",
      label: "Actividad Descripción",
      width: "210",
      show: true,
      sortable: true,
    },
    {
      prop: "informacion_financiera",
      label: "Balance",
      width: "300",
      show: true,
      sortable: true,
    },
    {
      prop: "perdidas",
      label: "Perdidas",
      width: "300",
      show: true,
      sortable: true,
    },
  ];
};

export const showColumnsSummary = (newColumns) => {
  let columns = getColumnsSummary();
  let showColumns = [];
  for (const column of columns) {
    for (const item of newColumns) {
      if (item === column.prop) {
        showColumns.push(column);
      }
    }
  }
  return showColumns;
};

export const formatProvinciaLocalidad = (data) => {
  let newData = {};
  const validos = [
    "2014",
    "2015",
    "2016",
    "2017",
    "2018",
    "2019",
    "incluir_null",
  ];
  const data_value = {
    "2014": 1037945,
    "2015": 1048623,
    "2016": 1043337,
    "2017": 1008999,
    "2018": 932970,
    "2019": 32568,
  };
  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      const element = data[key];
      if (key === "provincia_localidad" && Array.isArray(element)) {
        element.map((item) => {
          if (Array.isArray(item.children)) {
            item.children.map((_item) => {
              if (Array.isArray(_item.children)) {
                _item.children.map((__item) => {
                  delete __item["children"];
                });
              }
            });
          }
        });
      } else if (key === "cnae" && Array.isArray(element)) {
        element.map((item) => {
          item.isDefaultExpanded = false;
          if (Array.isArray(item.children)) {
            item.children.map((_item) => {
              _item.father_id = item.id;
              if (Array.isArray(_item.children)) {
                _item.children.map((__item) => {
                  __item.father_id = _item.id;
                  if (Array.isArray(__item.children)) {
                    __item.children.map((___item) => {
                      ___item.father_id = __item.id;
                      delete ___item["children"];
                    });
                  } else {
                    delete __item["children"];
                  }
                });
              } else {
                delete _item["children"];
              }
            });
          } else {
            delete item["children"];
          }
        });
      } else if (key === "cargos" && Array.isArray(element)) {
        element.map((item) => {
          item.label = capitalize(item.label);
          return item;
        });
      } else if (key === "cuentas_disponibles" && Array.isArray(element)) {
        element.filter((item) => {
          if (validos.includes(item.id)) {
            item.data = data_value[item.id];
            return item;
          }
        });
      } else if (key === "tipo_cuentas" && Array.isArray(element)) {
        element.filter((item) => {
          if (item.id === "1") {
            item.data = 1375320;
          } else if (item.id === "2") {
            item.data = 5067;
          }
          return item;
        });
      }
      newData[key] = element;
    }
  }
  newData.informacion_financiera = [
    {
      id: "children_activo",
      label: "Activo",
      children: [
        {
          id: "11000",
          label: "Activo no corriente",
          special: true,
        },
        {
          id: "11100",
          label: "Inmovilizado intangible",
          special: false,
        },
        {
          id: "11200",
          label: "Inmovilizado material",
          special: false,
        },
        {
          id: "11300",
          label: "Inversiones inmobiliarias",
          special: false,
        },
        {
          id: "11400",
          label: "Inversiones en empresas del grupo a largo plazo",
          special: false,
        },
        {
          id: "11500",
          label: "Inversiones financieras a largo plazo",
          special: false,
        },
        {
          id: "11600",
          label: "Otros activos a largo plazo",
        },
        {
          id: "12000",
          label: "Activo corriente",
          special: true,
        },
        {
          id: "12200",
          label: "Existencias",
          special: false,
        },
        {
          id: "12300",
          label: "Deudores comerciales",
          special: false,
        },
        {
          id: "12400",
          label: "Inversiones en empresas del grupo a corto plazo",
          special: false,
        },
        {
          id: "12500",
          label: "Inversiones financieras a corto plazo",
          special: false,
        },
        {
          id: "12600",
          label: "Otros activos a corto plazo",
          special: false,
        },
        {
          id: "12700",
          label: "Efectivo y activos líquidos equivalentes",
          special: false,
        },
        {
          id: "10000",
          label: "Total activo",
          special: true,
        },
      ],
    },
    {
      id: "children_pasivo",
      label: "Pasivo y Patrimonio Neto",
      children: [
        {
          id: "20000",
          label: "Patrimonio Neto",
          special: true,
        },
        {
          id: "21000",
          label: "Fondos propios",
          special: false,
        },
        {
          id: "21100",
          label: "Capital",
          special: false,
        },
        {
          id: "21300",
          label: "Reservas",
          special: false,
        },
        {
          id: "21700",
          label: "Resultado del ejercicio",
          special: false,
        },
        {
          id: "23000",
          label: "Subvenciones y donaciones",
          special: false,
        },
        {
          id: "31000",
          label: "Pasivo no corriente",
          special: true,
        },
        {
          id: "31100",
          label: "Provisiones a largo plazo",
          special: false,
        },
        {
          id: "31200",
          label: "Deudas a largo plazo",
          special: false,
        },
        {
          id: "31300",
          label: "Deudas con empresas del grupo a largo plazo",
          special: false,
        },
        {
          id: "31400",
          label: "Otros pasivos a largo plazo",
          special: false,
        },
        {
          id: "32000",
          label: "Pasivo corriente",
          special: true,
        },
        {
          id: "32200",
          label: "Provisiones a corto plazo",
          special: false,
        },
        {
          id: "32300",
          label: "Deudas a corto plazo",
          special: false,
        },
        {
          id: "32400",
          label: "Deudas con empresas del grupo a corto plazo",
          special: false,
        },
        {
          id: "32500",
          label: "Acreedores comerciales",
          special: false,
        },
        {
          id: "30000",
          label: "Total pasivo y patrimonio neto",
          special: true,
        },
      ],
    },
  ];
  newData.perdidas = [
    {
      id: "1",
      label: "Ingresos de explotación",
      special: true,
    },
    {
      id: "40100",
      label: "Importe neto de la cifra de negocios",
      special: false,
    },
    {
      id: "40200",
      label:
        "Variación de existencias de productos terminados y en curso de fabricación",
      special: false,
    },
    {
      id: "40300",
      label: "Trabajos realizados por la empresa para su activo",
      special: false,
    },
    {
      id: "40400",
      label: "Aprovisionamientos",
      special: false,
    },
    {
      id: "40500",
      label: "Otros ingresos de explotación",
      special: false,
    },
    {
      id: "40600",
      label: "Gastos de personal",
      special: false,
    },
    {
      id: "40700",
      label: "Otros gastos de explotación",
      special: false,
    },
    {
      id: "40800",
      label: "Amortización del inmovilizado",
      special: false,
    },
    {
      id: "40900",
      label: "Imputación de subvenciones de inmovilizado no financiero y otras",
      special: false,
    },
    {
      id: "41000",
      label: "Excesos de provisiones",
      special: false,
    },
    {
      id: "41100",
      label: "Deterioro y resultado por enajenaciones del inmovilizado",
      special: false,
    },
    {
      id: "41200",
      label: "Diferencia negativa de combinaciones de negocio",
      special: false,
    },
    {
      id: "41300",
      label: "Otros resultados",
      special: false,
    },
    {
      id: "2",
      label: "Resultado de explotación",
      special: true,
    },
    {
      id: "41400",
      label: "Ingresos financieros",
      special: false,
    },
    {
      id: "41500",
      label: "Gastos financieros",
      special: false,
    },
    {
      id: "41600",
      label: "Variación de valor razonable en instrumentos financieros",
      special: false,
    },
    {
      id: "41700",
      label: "Diferencias de cambio",
      special: false,
    },
    {
      id: "41800",
      label:
        "Deterioro y resultado por enajenaciones de instrumentos financieros",
      special: false,
    },
    {
      id: "42100",
      label: "Otros ingresos y gastos de carácter financiero",
      special: false,
    },
    {
      id: "3",
      label: "Resultado financiero",
      special: true,
    },
    {
      id: "4",
      label: "Resultado antes de impuestos",
      special: true,
    },
    {
      id: "41900",
      label: "Impuestos sobre beneficios",
      special: false,
    },
    {
      id: "5",
      label: "Resultado del ejercicio",
      special: true,
    },
  ];
  newData.estados = [
    {
      id: "children_activas",
      label: "Activas",
      data: null,
      children: [
        {
          data: 1,
          label: "Activa",
          id: 0,
        },
        {
          data: 2,
          label: "Activa reciente constitución",
          id: 10,
        },
        {
          data: 3,
          label: "Activa con cuentas anuales",
          id: 20,
        },
        {
          data: 4,
          label: "Activa sin cuentas Ult. 3 años",
          id: 30,
        },
        {
          data: 7,
          label: "Activa. Aprobación Judicial del Convenio",
          id: 50,
        },
        {
          data: 18,
          label: "Activa. Reactivada",
          id: 120,
        },
      ],
    },
    {
      id: "children_proceso_concursal",
      label: "Proceso concursal",
      data: null,
      children: [
        {
          data: 5,
          label: "Activa. En concurso",
          id: 40,
        },
        {
          data: 15,
          label: "Suspensión de pagos",
          id: 100,
        },
        {
          data: 16,
          label: "Activa. Sale de situación concursal",
          id: 110,
        },
      ],
    },
    {
      id: "children_en_extinción",
      label: "En extinción",
      data: null,
      children: [
        {
          data: 6,
          label: "Liquidación",
          id: 41,
        },
        {
          data: 8,
          label: "Disolución",
          id: 60,
        },
        {
          data: 9,
          label: "Extinción",
          id: 70,
        },
        // {
        //   id: 17,
        //   label: "Liquidación",
        //   data: 111,
        // },
      ],
    },
    {
      id: "children_proceso_de_union_segregación",
      label: "Proceso de unión/segregación",
      data: null,
      children: [
        {
          data: 11,
          label: "Fusión",
          id: 91,
        },
        {
          data: 20,
          label: "Cesión global",
          id: 71,
        },
        {
          data: 21,
          label: "Escisión Total",
          id: 72,
        },
        {
          data: 22,
          label: "Escisión parcial",
          id: 130,
        },
        {
          data: 23,
          label: "Segregación",
          id: 140,
        },
      ],
    },
    {
      id: "children_otras",
      label: "Otras",
      data: null,
      children: [
        {
          data: 12,
          label: "Baja",
          id: 92,
        },
        {
          data: 13,
          label: "Cierre provisional",
          id: 93,
        },
        {
          data: 14,
          label: "Reapertura Hoja Registral (sin cuentas)",
          id: 94,
        },
        {
          data: 19,
          label: "Desconocido",
          id: 1,
        },
        {
          data: 10,
          label: "Cierre provisional",
          id: 90,
        },
      ],
    },
  ];
  newData.ratios = [
    {
      id: "children_ratios_de_rentabilidad",
      label: "Ratios de rentabilidad",
      children: [
        {
          id: 99016,
          label: "EBITDA",
          special: false,
          unit: "€",
        },
        {
          id: 99026,
          label: "ROA",
          special: false,
          unit: "Nº de veces",
        },
        {
          id: 99025,
          label: "ROE",
          special: false,
          unit: "Nº de veces",
        },
        {
          id: 99033,
          label: "ROS",
          special: false,
          unit: "Nº de veces",
        },
      ],
    },
    {
      id: "children_eatios_operativos",
      label: "Ratios operativos",
      children: [
        {
          id: 99012,
          label: "Periodo medio de cobro (PMC)",
          special: false,
          unit: "días",
        },
        {
          id: 99013,
          label: "Periodo medio de pago (PMP)",
          special: false,
          unit: "días",
        },
      ],
    },
    {
      id: "children_ratios_de_endeudamiento",
      label: "Ratios de endeudamiento",
      children: [
        {
          id: 99049,
          label: "Deuda financiera bruta / EBITDA",
          special: false,
          unit: "€",
        },
        {
          id: 99050,
          label: "Deuda financiera neta / EBITDA",
          special: false,
          unit: "€",
        },
        {
          id: 99022,
          label: "Apalancamiento",
          special: false,
          unit: "€",
        },
        {
          id: 99051,
          label: "Deuda financiera neta / Fondos propios",
          special: false,
          unit: "€",
        },
      ],
    },
    {
      id: "children_ratios_de_equilibrio",
      label: "Ratios de equilibrio",
      children: [
        {
          id: 99024,
          label: "Fondo de maniobra",
          special: false,
          unit: "€",
        },
        {
          id: 99052,
          label: "Necesidades operativas de fondos",
          special: false,
          unit: "€",
        },
        {
          id: 99035,
          label: "Ratio de liquidez",
          special: false,
          unit: "Nº de veces",
        },
        {
          id: 99036,
          label: "Ratio de solvencia",
          special: false,
          unit: "Nº de veces",
        },
        {
          id: 99048,
          label: "Ratio de tesorería o prueba ácida",
          special: false,
          unit: "Nº de veces",
        },
      ],
    },
  ];
  return newData;
};

export const searchInArrayObject = (search = "", keyObj = "", myArray = []) => {
  let results = [];
  const gt = search.split(" ");
  let expresion = "";
  gt.map((datos) => {
    expresion += `^(?=.*${datos})`;
  });
  const searchRegExp = new RegExp(expresion, "ims");

  for (const key in myArray) {
    if (myArray.hasOwnProperty(key)) {
      const element = myArray[key];
      var result = element[keyObj].match(searchRegExp);
      if (result) {
        results.push(element);
      }
      if (element.children && Array.isArray(element.children)) {
        const arrayChildren = element.children;
        for (const _key in arrayChildren) {
          if (arrayChildren.hasOwnProperty(_key)) {
            const elementChildren = arrayChildren[_key];
            var resultChildren = elementChildren[keyObj].match(searchRegExp);
            if (resultChildren) {
              results.push(elementChildren);
            }
            if (
              elementChildren.children &&
              Array.isArray(elementChildren.children)
            ) {
              const _arrayChildren = elementChildren.children;
              for (const _key in _arrayChildren) {
                if (_arrayChildren.hasOwnProperty(_key)) {
                  const _elementChildren = _arrayChildren[_key];
                  var _resultChildren = _elementChildren[keyObj].match(
                    searchRegExp
                  );
                  if (_resultChildren) {
                    results.push(_elementChildren);
                  }
                  if (
                    _elementChildren.children &&
                    Array.isArray(_elementChildren.children)
                  ) {
                    const __arrayChildren = _elementChildren.children;
                    for (const _key in __arrayChildren) {
                      if (__arrayChildren.hasOwnProperty(_key)) {
                        const __elementChildren = __arrayChildren[_key];
                        var __resultChildren = __elementChildren[keyObj].match(
                          searchRegExp
                        );
                        if (__resultChildren) {
                          results.push(__elementChildren);
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }

  return results;
};

export const setIsDefaultExpanded = (_item, isDefaultExpanded = true) => {
  let item = { ..._item };
  item.isDefaultExpanded = isDefaultExpanded;
  if (item.children && Array.isArray(item.children)) {
    item.children = item.children.map((_item) => {
      _item.isDefaultExpanded = isDefaultExpanded;
      if (_item.children && Array.isArray(_item.children)) {
        _item.children = _item.children.map((__item) => {
          __item.isDefaultExpanded = isDefaultExpanded;
          return __item;
        });
      }
      return _item;
    });
  }
  return item;
};

export const capitalize = (word) => {
  return word[0].toUpperCase() + word.slice(1);
};
