import safeGet from 'lodash/get';
import safeSet from 'lodash/set';
// http://stackoverflow.com/questions/16427636/check-if-localstorage-is-available

function isLocalStorageAvailable() {
    const test = 'test';

    try {
        localStorage.setItem(test, test);
        localStorage.removeItem(test);
        return true;
    } catch(e) {
        return false;
    }
}

const localStorageError = 'Warning, local storage is not available in your current environment. This module does not work without local storage available';
const undefinedError = 'Warning, the key or data is undefined. LocalStorage variables must not be undefined';

function getPathArrayFromPath(path) {
	return typeof path === 'string' ? path.split('/') : path;
}

/**
 * @param {string | Array} path - the local storage key
 * @param {*} data - the data to enter into the key
*/
export function setItem(path, data) {
    if (isLocalStorageAvailable() === true) {
        if(path === undefined || data === undefined) {
            throw new Error(undefinedError)
        } else {
			const pathArray = getPathArrayFromPath(path);

			if (pathArray.length === 1) {
				return localStorage.setItem(pathArray[0], JSON.stringify(data));
			}

			const rootData = getItem(pathArray[0]) || {};

			safeSet(rootData, pathArray, data);

			localStorage.setItem(pathArray[0], JSON.stringify(rootData[pathArray[0]]));
        }
    } else {
        throw new Error(localStorageError)
    }
}

/**
 * @param {string | Array<string>} path - fetches all data in the key and de-stringifies it
 * @param {*} [defaultValue] - Optional parameter to add a namespace to scope your data to
 * @returns {Object}
 */
export function getItem(path, defaultValue = null) {
    if (isLocalStorageAvailable() === true) {
		const pathArray = getPathArrayFromPath(path);
		const storageItem = JSON.parse(localStorage.getItem(pathArray[0]));

		if (pathArray.length === 1) {
			return storageItem;
		}

		return safeGet(storageItem, pathArray.slice(1), null)
    } else {
        throw new Error(localStorageError)
    }
}

/**
 * @param {string | Array} path - the key to remove and delete all data in
 */
export function remove(path) {
	if (!isLocalStorageAvailable()) {
		throw new Error(localStorageError)
	}

	const pathArray = getPathArrayFromPath(path);

	if (pathArray.length === 1) {
		return localStorage.removeItem(path);
	}

	const rootData = getItem(path);

	setItem(pathArray[0], Object.entries(rootData).reduce((acc, [key, value], index) => {
		if (index === pathArray.length) {
			return acc;
		}

		return {
			...acc,
			[key]: value
		};
	}, rootData));
}
