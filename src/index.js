// http://stackoverflow.com/questions/16427636/check-if-localstorage-is-available

function isLocalStorageAvailable(){
    var test = 'test';
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
const namespaceTypeError = new TypeError('argument `namespace` was expecting a string');

function checkNamespaceType(namespaceInput) {
    if (typeof namespaceInput !== 'string') {
        throw namespaceTypeError;
    }
}

/**
 * @param {string | Array} path - the local storage key
 * @param {*} data - the data to enter into the key
 */
export function put(path, data) {
    if (isLocalStorageAvailable() === true) {
        if(path === undefined || data === undefined) {
            throw new Error(undefinedError)
        } else {
			const pathArray = typeof path === 'string' ? path.split('/') : path;

			return pathArray.reduce((acc, curr) => {
				if (acc !== null) {
					return acc[curr];
				}

				return localStorage.setItem(curr, data);
			}, null);
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
export function fetch(path, defaultValue = null) {
    if (isLocalStorageAvailable() === true) {
    	const pathArray = typeof path === 'string' ? path.split('/') : path;

		return pathArray.reduce((acc, curr, index) => {
			if (index === pathArray.length - 1) {
				return acc;
			}

			const storageItem = JSON.parse(localStorage.getItem(curr));

			if (storageItem === null) {
				return defaultValue;
			}

			return storageItem;
		}, defaultValue);
    } else {
        throw new Error(localStorageError)
    }
}

/**
 * @param {String} key - the key to remove and delete all data in
 * @param {String} [namespace] - Optional parameter to add a namespace to scope your data to
 */
export function remove(key, namespace = null) {
    if (isLocalStorageAvailable() === true) {
        if (namespace !== null) {
            return localStorage.setItem(namespace, JSON.stringify({
				...fetch(namespace),
				[key]: null
			}));
        } else {
            return localStorage.removeItem(key);
        }
    } else {
        throw new Error(localStorageError)
    }
}

/**
 *
 * @param {String} str - The string to process
 * @param {String} find - The characters to find
 * @param {String} replace - The characters to replace the found characters with
 * @returns {string|XML|void}
 */
function replaceAll(str, find, replace) {
    return str.replace(new RegExp(find, 'g'), replace);
}

/**
 *
 * @param {String} string - The string to process
 * @param {String} find - The characters to find
 * @param {String} replace - The characters to replace the found characters with
 * @returns {string|XML|void}
 */
export function transformToStorage(string, find, replace) {
    return replaceAll(string, find, replace);
}

/**
 *
 * @param {String} string - The string to process
 * @param {String} find - The characters to find
 * @param {String} replace - The characters to replace the found characters with
 * @returns {*} - Does the opposite of {@link transformToStorage}
 */
export function transformFromStorage(string, find, replace) {
    return replaceAll(string, find, replace);
}

/**
 * @param {Object} defaultValues - Pass in an object with your application's local storage keys + their default value
 * @param {String} [namespace] - Optional parameter to add a namespace to scope your data to
 */
export function setIfEmpty(defaultValues, namespace) {
    Object.keys(defaultValues).forEach(function(key) {
        let currentValue = defaultValues[key];
        if (fetch(key) === undefined) {
            put(key, currentValue, namespace)
        }
    })
}

export { put as set };
export { fetch as get };