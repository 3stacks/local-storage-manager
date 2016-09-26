(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

var settings = getLocalStorageManagerSettings();

function getLocalStorageManagerSettings() {
    if (get('localStorageManagerSettings') === undefined) {
        return {
            isNamespaced: false,
            namespace: null
        };
    } else {
        return get('localStorageManagerSettings');
    }
}

/**
 *
 * @param {String} namespace - The namespace you want your application to save/access data to/from
 */
function init(namespace) {
    put(namespace, {});
    settings.isNamespaced = true;
    settings.namespace = namespace;
    put('localStorageManagerSettings', settings);
}

/**
 * @param {String} key - the local storage key
 * @param {String || Number || Array || Object} data - the data to enter into the key
 */
function put(key, data) {
    if (isLocalStorageAvailable() === true) {
        if (key === undefined || data === undefined) {
            throw new Error(undefinedError);
        } else {
            if (settings.isNamespaced) {
                localStorage[settings.namespace][key] = JSON.stringify(data);
            } else {
                localStorage[key] = JSON.stringify(data);
            }
        }
    } else {
        throw new Error(localStorageError);
    }
}

/**
 * @param {String} key - fetches all data in the key and de-stringifies it
 * @returns {Object}
 */
function fetch(key) {
    if (isLocalStorageAvailable() === true) {
        if (localStorage[key] === undefined) {
            return undefined;
        } else {
            return JSON.parse(localStorage[key]);
        }
    } else {
        throw new Error(localStorageError);
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
 *
 * @param {Object} defaultValues - Pass in an object with your application's local storage keys + their default value
 */
function setIfEmpty(defaultValues) {
    Object.keys(defaultValues).forEach(function (key) {
        var currentValue = defaultValues[key];
        if (fetch(key) === undefined) {
            put(key, currentValue);
        }
    });
}

exports.init = init;
exports.put = put;
exports.fetch = fetch;
exports.remove = remove;
exports.transformToStorage = transformToStorage;
exports.transformFromStorage = transformFromStorage;
exports.setIfEmpty = setIfEmpty;
exports.set = put;
exports.get = fetch;

},{}],2:[function(require,module,exports){
'use strict';

var _index = require('../index');

function prepareLocalStorage() {
    localStorage.clear();
}

(0, _index.set)('key', 'value');

function getTest() {
    console.log((0, _index.get)('key'));
}

prepareLocalStorage();
getTest();

},{"../index":1}]},{},[2]);
