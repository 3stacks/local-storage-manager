(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

var errorMessage = 'Warning, local storage is not available in your current environment. This module does not work without local storage available';

/**
 *
 * @param {String} key - the local storage key
 * @param {String || Number || Array || Object} data - the data to enter into the key
 */
function put(key, data) {
    if (isLocalStorageAvailable() === true) {
        localStorage[key] = JSON.stringify(data);
    } else {
        throw new Error(errorMessage)
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
        throw new Error(errorMessage)
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
        throw new Error(errorMessage)
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

module.exports.set = put;
module.exports.get = fetch;
module.exports.remove = remove;
module.exports.transformToStorage = transformToStorage;
module.exports.transformFromStorage = transformFromStorage;
},{}],2:[function(require,module,exports){
var localStorageManager = require('../index.js');

    function setTest() {
        localStorage.clear();
        localStorageManager.set('string', 'data');
        console.log('-LOCAL STORAGE MANAGER SET FUNCTION TEST-');
        console.log('     String saved to local storage: ' + localStorage.string);
        if (localStorage.string === ('"data"')) {
            console.debug('          *Set test was successful')
        } else {
            console.error('          Set test was unsuccessful. Expected ' + 'data ' + 'but got ' + localStorage.string)
        }
        console.log('----------------------------------------------------');
    }

    function getTest() {
        localStorage.clear();
        localStorage.string = JSON.stringify('data');
        console.log('-LOCAL STORAGE MANAGER GET FUNCTION TEST-');
        console.log('     The saved variable is: ' + localStorageManager.get('string'));
        if (localStorageManager.get('string') === 'data') {
            console.debug('          *Get test was successful')
        }
        console.log('----------------------------------------------------');
    }

    function removeTest() {
        localStorage.clear();
        console.log('-LOCAL STORAGE MANAGER REMOVE DATA FUNCTION TEST-');
        localStorage.removeTest = 'data';
        var result = localStorage.getItem('removeTest');
        console.log('     The saved variable is: ' + result);
        localStorageManager.remove('removeTest');
        var key = localStorage.removeTest;
        if (key === undefined) {
            console.debug('          *Remove test was successful')
        } else {
            console.error('          Remove test was unsuccessful. Expected ' + undefined + ' but got ' + result)
        }
        console.log('----------------------------------------------------');
    }

    function transformToTest() {
        localStorage.clear();
        console.log('-LOCAL STORAGE MANAGER TRANSFORM TO STORAGE FUNCTION TEST');
        var data = '12/34547678789';
        var replace = 'replaceTheSlash';
        var transformedData = localStorageManager.transformToStorage(data, '/', replace);
        console.log('     data for this test is ' + data);
        console.log('          the "/" in data will be replaced with ' + replace);
        console.log('     processing the string now');
        var expectedResult = '12replaceTheSlash34547678789';
        var result = transformedData;
        console.log('          ' + result);
        if (result === expectedResult) {
            console.debug('          *Transform test was successful')
        } else {
            console.error('     Transform test was unsuccessful. Expected ' + expectedResult + ' but got ' + result)
        }
        console.log('----------------------------------------------------');
    }

    function transformFromTest() {
        localStorage.clear();
        console.log('-LOCAL STORAGE MANAGER TRANSFORM FROM STORAGE FUNCTION TEST');
        var data = '12replaceTheSlash34547678789';
        var replace = '/';
        var transformedData = localStorageManager.transformToStorage(data, 'replaceTheSlash', replace);
        console.log('     data for this test is ' + data);
        console.log('          the "replaceTheSlash" in data will be replaced with ' + replace);
        console.log('     processing the string now');
        var expectedResult = '12/34547678789';
        var result = transformedData;
        console.log('          ' + result);
        if (result === expectedResult) {
            console.debug('          *Transform test was successful')
        } else {
            console.error('     Transform test was unsuccessful. Expected ' + expectedResult + ' but got ' + result)
        }
        console.log('----------------------------------------------------');
    }


    setTest();
    getTest();
    removeTest();
    transformToTest();
    transformFromTest();
},{"../index.js":1}]},{},[2]);
