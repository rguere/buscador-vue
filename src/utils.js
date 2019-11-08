export const objectToArray = (obj) => {
	return Object.keys(obj).map((key) => {
		return {
			[key]: obj[key]
		}
	})
}

export const removeDuplicates = (originalArray, prop) => {
	let newArray = []
    let lookupObject  = {}

    for(let i in originalArray) {
        lookupObject[originalArray[i][prop]] = originalArray[i];
    }

    for(let i in lookupObject) {
        newArray.push(lookupObject[i]);
    }
    return newArray;
}

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