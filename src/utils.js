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
  let top = element.offsetTop;
  if (!(top >= window.pageYOffset)) {
    element.classList.add("is-fixed");
    my_container.classList.add("container");
  } else {
    element.classList.remove("is-fixed");
    my_container.classList.remove("container");
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

export const scrollIt = (
  destination,
  duration = 200,
  easing = "linear",
  offset = 0,
  callback
) => {
  const easings = {
    linear(t) {
      return t;
    },
    easeInQuad(t) {
      return t * t;
    },
    easeOutQuad(t) {
      return t * (2 - t);
    },
    easeInOutQuad(t) {
      return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    },
    easeInCubic(t) {
      return t * t * t;
    },
    easeOutCubic(t) {
      return --t * t * t + 1;
    },
    easeInOutCubic(t) {
      return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
    },
    easeInQuart(t) {
      return t * t * t * t;
    },
    easeOutQuart(t) {
      return 1 - --t * t * t * t;
    },
    easeInOutQuart(t) {
      return t < 0.5 ? 8 * t * t * t * t : 1 - 8 * --t * t * t * t;
    },
    easeInQuint(t) {
      return t * t * t * t * t;
    },
    easeOutQuint(t) {
      return 1 + --t * t * t * t * t;
    },
    easeInOutQuint(t) {
      return t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * --t * t * t * t * t;
    },
  };

  const start = window.pageYOffset;
  const startTime =
    "now" in window.performance ? performance.now() : new Date().getTime();

  const documentHeight = Math.max(
    document.body.scrollHeight,
    document.body.offsetHeight,
    document.documentElement.clientHeight,
    document.documentElement.scrollHeight,
    document.documentElement.offsetHeight
  );
  const windowHeight =
    window.innerHeight ||
    document.documentElement.clientHeight ||
    document.getElementsByTagName("body")[0].clientHeight;
  const destinationOffset =
    typeof destination === "number" ? destination : destination.offsetTop;
  const destinationOffsetToScroll =
    Math.round(
      documentHeight - destinationOffset < windowHeight
        ? documentHeight - windowHeight
        : destinationOffset
    ) - offset;

  if ("requestAnimationFrame" in window === false) {
    window.scroll(0, destinationOffsetToScroll);
    if (callback) {
      callback();
    }
    return;
  }

  function scroll() {
    const now =
      "now" in window.performance ? performance.now() : new Date().getTime();
    const time = Math.min(1, (now - startTime) / duration);
    const timeFunction = easings[easing](time);
    window.scroll(
      0,
      Math.ceil(timeFunction * (destinationOffsetToScroll - start) + start)
    );

    if (window.pageYOffset === destinationOffsetToScroll) {
      if (callback) {
        callback();
      }
      return;
    }

    requestAnimationFrame(scroll);
  }

  scroll();
};

export const formatProvinciaLocalidad = (data) => {
  let newData = {};
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
      }
      newData[key] = element;
    }
  }
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
