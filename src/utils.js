/**
 * [objectToArray convertir un objeto JSON a Array]
 * @param  {[Object]} obj [objeto JSON]
 * @return {[Array]}     [Array]
 */
export const objectToArray = (obj) => {
	return Object.keys(obj).map((key) => {
		return {
			[key]: obj[key]
		}
	})
}

/**
 * [removeDuplicates remueve de una Array de Objetos los duplicados segun una propiedad]
 * @param  {[Array]} originalArray [Array al que se le removeran los duplicados]
 * @param  {[String]} prop          [propiedad a remover sus valores duplicados]
 * @return {[Array]}               [nuevo Array sin duplicados]
 */
export const removeDuplicates = (originalArray, prop) => {
	let newArray = []
    let lookupObject  = {}
    for(let key in originalArray) {
        lookupObject[originalArray[key][prop]] = originalArray[key]
    }
    for(let key in lookupObject) {
        newArray.push(lookupObject[key])
    }
    return newArray
}

/**
 * [inArrayObject description]
 * @param  {[type]} array  [description]
 * @param  {[type]} search [description]
 * @param  {String} key    [description]
 * @return {[type]}        [description]
 */
export const inArrayObject = (array, search, key = 'id') => {
    let results = array.filter(function (item) { return item[key] == search })
    return (results.length > 0) ? results[0] : null
}

export const inArrayObjectTreeselect = (array, search, key = 'id') => {
    
    let results = null
    
    for (let i in array){
        
        if ((array[i][key] === search)) {
            
            results = array[i]

            break

        } else if (array[i].children && Array.isArray(array[i].children)){
        
            for (let j in array[i].children) {

                if ((array[i].children[j][key] === search)) {
                    
                    results = array[i].children[j]

                    break

                } else if (array[i].children[j].children && Array.isArray(array[i].children[j].children)){
        
                    for (let k in array[i].children[j].children) {

                        if ((array[i].children[j].children[k][key] === search)) {
                            
                            results = array[i].children[j].children[k]
                            break
                        }

                    }
                
                }

            }
        
        }

    }

    return results
}

export const handleScroll = () => {
    let element = document.getElementById('filter-buttons')
    let my_container = document.querySelector('.my_container')
    let top = element.offsetTop
    if (!(top >= window.pageYOffset)) {
      element.classList.add('is-fixed')
      my_container.classList.add('container')
    }else {
      element.classList.remove('is-fixed')
      my_container.classList.remove('container')
    }
} 

export const howAnimation = (element) => {
    if (element) {
      element.classList.add("bounce-leave-active")
      setTimeout(function () {
        element.classList.remove("bounce-leave-active")
      }, 1000)
    }
}

export const spacesByDashes = (value) => {
    value = value.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '')
    value = value.replace(/(?:\r\n|\r|\n)/g, ',')
    for (var i = 0; i <= 20; i++) {
    value = value.split(",,").join(",")
    }
    return value
}
