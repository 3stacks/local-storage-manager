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

const settings = getLocalStorageManagerSettings();

function getLocalStorageManagerSettings() {
    if (get('localStorageManagerSettings') === undefined) {
        return {
            isNamespaced: false,
            namespace: null
        };
    } else {
        return get('localStorageManagerSettings')
    }
}

/**
 *
 * @param {String} namespace - The namespace you want your application to save/access data to/from
 */
export function init(namespace) {
    put(namespace, {});
    settings.isNamespaced = true;
    settings.namespace = namespace;
    put('localStorageManagerSettings', settings)
}

/**
 * @param {String} key - the local storage key
 * @param {String || Number || Array || Object} data - the data to enter into the key
 */
export function put(key, data) {
    if (isLocalStorageAvailable() === true) {
        if(key === undefined || data === undefined) {
            throw new Error(undefinedError)
        } else {
            if (settings.isNamespaced) {
                localStorage[settings.namespace][key] = JSON.stringify(data);
            } else {
                localStorage[key] = JSON.stringify(data);
            }
        }
    } else {
        throw new Error(localStorageError)
    }
}

/**
 * @param {String} key - fetches all data in the key and de-stringifies it
 * @returns {Object}
 */
export function fetch(key) {
    if (isLocalStorageAvailable() === true) {
        if (localStorage[key] === undefined) {
            return undefined;
        } else {
            return JSON.parse(localStorage[key]);
        }
    } else {
        throw new Error(localStorageError)
    }
}

/**
 *
 * @param {String} key - the key to remove and delete all data in
 */
export function remove(key) {
    if (isLocalStorageAvailable() === true) {
        return localStorage.removeItem(key);
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
 *
 * @param {Object} defaultValues - Pass in an object with your application's local storage keys + their default value
 */
export function setIfEmpty(defaultValues) {
    Object.keys(defaultValues).forEach(function(key) {
        var currentValue = defaultValues[key];
        if (fetch(key) === undefined) {
            put(key, currentValue)
        }
    })
}

export { put as set };
export { fetch as get };