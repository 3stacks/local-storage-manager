(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.put = put;
exports.fetch = fetch;
exports.remove = remove;
exports.transformToStorage = transformToStorage;
exports.transformFromStorage = transformFromStorage;
exports.setIfEmpty = setIfEmpty;
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
/**
 * @param {String} key - the local storage key
 * @param {String || Number || Array || Object} data - the data to enter into the key
 */
function put(key, data) {
    if (isLocalStorageAvailable() === true) {
        if (key === undefined || data === undefined) {
            throw new Error(undefinedError);
        } else {
            localStorage[key] = JSON.stringify(data);
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

exports.set = put;
exports.get = fetch;

},{}],2:[function(require,module,exports){
'use strict';

var _index = require('../index');

var localStorageManager = _interopRequireWildcard(_index);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function prepareLocalStorage() {
    localStorage.clear();
}

localStorageManager.set('key', 'value');

function getTest() {
    console.log(localStorageManager.get('key'));
}

prepareLocalStorage();
getTest();

},{"../index":1}]},{},[2]);
