'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

// http://stackoverflow.com/questions/16427636/check-if-localstorage-is-available

function isLocalStorageAvailable() {
    var test = 'test';
    try {
        localStorage.setItem(test, test);
        localStorage.removeItem(test);
        return true;
    } catch (e) {
        return false;
    }
}

var localStorageError = 'Warning, local storage is not available in your current environment. This module does not work without local storage available';
var undefinedError = 'Warning, the key or data is undefined. LocalStorage variables must not be undefined';
var namespaceTypeError = new TypeError('argument `namespace` was expecting a string');

function checkNamespaceType(namespaceInput) {
    if (typeof namespaceInput !== 'string') {
        throw namespaceTypeError;
    }
}

/**
 * @param {String} key - the local storage key
 * @param {String || Number || Array || Object} data - the data to enter into the key
 * @param {String} [namespace] - Optional parameter to add a namespace to scope your data to
 */
function put(key, data) {
    var namespace = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

    if (isLocalStorageAvailable() === true) {
        if (key === undefined || data === undefined) {
            throw new Error(undefinedError);
        } else {
            if (namespace !== null) {
                checkNamespaceType(namespace);
                localStorage.setItem(namespace[key], JSON.stringify(data));
            } else {
                localStorage.setItem(key, JSON.stringify(data));
            }
        }
    } else {
        throw new Error(localStorageError);
    }
}

/**
 * @param {String} key - fetches all data in the key and de-stringifies it
 * @param {String} [namespace] - Optional parameter to add a namespace to scope your data to
 * @returns {Object}
 */
function fetch(key) {
    var namespace = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

    if (isLocalStorageAvailable() === true) {
        if (namespace !== null) {
            checkNamespaceType(namespace);
            if (localStorage.getItem(namespace[key]) === undefined) {
                return undefined;
            } else {
                return JSON.parse(localStorage.getItem(namespace[key]));
            }
        } else {
            if (localStorage.getItem(key) === undefined) {
                return undefined;
            } else {
                return JSON.parse(localStorage.getItem(key));
            }
        }
    } else {
        throw new Error(localStorageError);
    }
}

/**
 * @param {String} key - the key to remove and delete all data in
 * @param {String} [namespace] - Optional parameter to add a namespace to scope your data to
 */
function remove(key) {
    var namespace = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

    if (isLocalStorageAvailable() === true) {
        if (namespace !== null) {
            return localStorage.removeItem(namespace[key]);
        } else {
            return localStorage.removeItem(key);
        }
    } else {
        throw new Error(localStorageError);
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
 * @param {Object} defaultValues - Pass in an object with your application's local storage keys + their default value
 * @param {String} [namespace] - Optional parameter to add a namespace to scope your data to
 */
function setIfEmpty(defaultValues, namespace) {
    Object.keys(defaultValues).forEach(function (key) {
        var currentValue = defaultValues[key];
        if (fetch(key) === undefined) {
            put(key, currentValue, namespace);
        }
    });
}

exports.put = put;
exports.fetch = fetch;
exports.remove = remove;
exports.transformToStorage = transformToStorage;
exports.transformFromStorage = transformFromStorage;
exports.setIfEmpty = setIfEmpty;
exports.set = put;
exports.get = fetch;