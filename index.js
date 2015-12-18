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

var localStorageError = 'Warning, local storage is not available in your current environment. This module does not work without local storage available';
var undefinedError = 'Warning, the key or data is undefined. LocalStorage variables must not be undefined';
/**
 *
 * @param {String} key - the local storage key
 * @param {String || Number || Array || Object} data - the data to enter into the key
 */
function put(key, data) {
    if (isLocalStorageAvailable() === true) {
        if(key === undefined || data === undefined) {
            throw new Error(undefinedError)
        } else {
            localStorage[key] = JSON.stringify(data);
        }
    } else {
        throw new Error(localStorageError)
    }
}

/**
 *
 * @param {String} key - fetches all data in the key and de-stringifies it
 */
function fetch(key) {
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
function remove(key) {
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
function transformToStorage(string, find, replace) {
    return replaceAll(string, find, replace);
}

/**
 *
 * @param {String} string - The string to process
 * @param {String} find - The characters to find
 * @param {String} replace - The characters to replace the found characters with
 * @returns {*} - Does the opposite of {@link transformToStorage}
 */
function transformFromStorage(string, find, replace) {
    return replaceAll(string, find, replace);
}

/**
 *
 * @param {Object} defaultValues - Pass in an object with your application's local storage keys + their default value
 */
function setIfEmpty(defaultValues) {
    Object.keys(defaultValues).forEach(function(key) {
        var currentValue = defaultValues[key];
        if (fetch(key) === undefined) {
            put(key, currentValue)
        }
    })
}

module.exports.set = put;
module.exports.get = fetch;
module.exports.remove = remove;
module.exports.setIfEmpty = setIfEmpty;
module.exports.transformToStorage = transformToStorage;
module.exports.transformFromStorage = transformFromStorage;