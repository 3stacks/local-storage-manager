'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var safeGet = _interopDefault(require('lodash/get'));
var safeSet = _interopDefault(require('lodash/set'));

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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

function getPathArrayFromPath(path) {
	return typeof path === 'string' ? path.split('/') : path;
}

/**
 * @param {string | Array} path - the local storage key
 * @param {*} data - the data to enter into the key
*/
function setItem(path, data) {
	if (isLocalStorageAvailable() === true) {
		if (path === undefined || data === undefined) {
			throw new Error(undefinedError);
		} else {
			var pathArray = getPathArrayFromPath(path);

			if (pathArray.length === 1) {
				return localStorage.setItem(pathArray[0], JSON.stringify(data));
			}

			var rootData = getItem(pathArray[0]) || {};

			safeSet(rootData, pathArray, data);

			localStorage.setItem(pathArray[0], JSON.stringify(rootData[pathArray[0]]));
		}
	} else {
		throw new Error(localStorageError);
	}
}

/**
 * @param {string | Array<string>} path - fetches all data in the key and de-stringifies it
 * @param {*} [defaultValue] - Optional parameter to add a namespace to scope your data to
 * @returns {Object}
 */
function getItem(path) {
	var defaultValue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

	if (isLocalStorageAvailable() === true) {
		var pathArray = getPathArrayFromPath(path);
		var storageItem = JSON.parse(localStorage.getItem(pathArray[0]));

		if (pathArray.length === 1) {
			return storageItem || defaultValue;
		}

		return safeGet(storageItem, pathArray.slice(1), defaultValue);
	} else {
		throw new Error(localStorageError);
	}
}

/**
 * @param {string | Array} path - the key to remove and delete all data in
 */
function removeItem(path) {
	if (!isLocalStorageAvailable()) {
		throw new Error(localStorageError);
	}

	var pathArray = getPathArrayFromPath(path);

	if (pathArray.length === 1) {
		return localStorage.removeItem(path);
	}

	var rootData = getItem(path);

	setItem(pathArray[0], Object.entries(rootData).reduce(function (acc, _ref, index) {
		var _ref2 = _slicedToArray(_ref, 2),
		    key = _ref2[0],
		    value = _ref2[1];

		if (index === pathArray.length) {
			return acc;
		}

		return _extends({}, acc, _defineProperty({}, key, value));
	}, rootData));
}

exports.setItem = setItem;
exports.getItem = getItem;
exports.removeItem = removeItem;