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