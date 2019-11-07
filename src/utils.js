export const objectToArray = (obj) => {
	return Object.keys(obj).map((key) => {
		return {
			[key]: obj[key]
		}
	});
}

export const removeDuplicates = (originalArray, prop) => {
	var newArray = [];
    var lookupObject  = {};

    for(var i in originalArray) {
        lookupObject[originalArray[i][prop]] = originalArray[i];
    }

    for(i in lookupObject) {
        newArray.push(lookupObject[i]);
    }
    return newArray;
}