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
        lookupObject[originalArray[key][prop]] = originalArray[key];
    }
    for(let key in lookupObject) {
        newArray.push(lookupObject[key]);
    }
    return newArray;
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
        
                    for (let k in array[i].children[j]) {

                        if ((array[i].children[j][k][key] === search)) {
                            
                            results = array[i].children[j][k]

                            break

                        }

                    }
                
                }

            }
        
        }

    }

    return results
}