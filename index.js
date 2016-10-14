'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};

var asyncGenerator = function () {
  function AwaitValue(value) {
    this.value = value;
  }

  function AsyncGenerator(gen) {
    var front, back;

    function send(key, arg) {
      return new Promise(function (resolve, reject) {
        var request = {
          key: key,
          arg: arg,
          resolve: resolve,
          reject: reject,
          next: null
        };

        if (back) {
          back = back.next = request;
        } else {
          front = back = request;
          resume(key, arg);
        }
      });
    }

    function resume(key, arg) {
      try {
        var result = gen[key](arg);
        var value = result.value;

        if (value instanceof AwaitValue) {
          Promise.resolve(value.value).then(function (arg) {
            resume("next", arg);
          }, function (arg) {
            resume("throw", arg);
          });
        } else {
          settle(result.done ? "return" : "normal", result.value);
        }
      } catch (err) {
        settle("throw", err);
      }
    }

    function settle(type, value) {
      switch (type) {
        case "return":
          front.resolve({
            value: value,
            done: true
          });
          break;

        case "throw":
          front.reject(value);
          break;

        default:
          front.resolve({
            value: value,
            done: false
          });
          break;
      }

      front = front.next;

      if (front) {
        resume(front.key, front.arg);
      } else {
        back = null;
      }
    }

    this._invoke = send;

    if (typeof gen.return !== "function") {
      this.return = undefined;
    }
  }

  if (typeof Symbol === "function" && Symbol.asyncIterator) {
    AsyncGenerator.prototype[Symbol.asyncIterator] = function () {
      return this;
    };
  }

  AsyncGenerator.prototype.next = function (arg) {
    return this._invoke("next", arg);
  };

  AsyncGenerator.prototype.throw = function (arg) {
    return this._invoke("throw", arg);
  };

  AsyncGenerator.prototype.return = function (arg) {
    return this._invoke("return", arg);
  };

  return {
    wrap: function (fn) {
      return function () {
        return new AsyncGenerator(fn.apply(this, arguments));
      };
    },
    await: function (value) {
      return new AwaitValue(value);
    }
  };
}();

var defineProperty = function (obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
};

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

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
                localStorage.setItem(namespace, JSON.stringify(_extends({}, fetch(namespace), defineProperty({}, key, data))));
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
                return JSON.parse(localStorage.getItem(namespace))[key];
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
            var _ret = function () {
                var localStorageData = fetch(namespace);
                return {
                    v: localStorage.setItem(namespace, Object.keys(localStorageData).reduce(function (acc, curr) {
                        console.log(curr);
                        if (curr !== key) {
                            return _extends({}, acc, {
                                curr: localStorageData[curr]
                            });
                        }
                    }), {})
                };
            }();

            if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
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