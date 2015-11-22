/**
 *
 * @param {String} key - the local storage key
 * @param {String || Number || Array || Object} data - the data to enter into the key
 */
function put(key, data) {
    localStorage[key] = JSON.stringify(data);
}

/**
 *
 * @param {String} key - fetches all data in the key and de-stringifies it
 */
function fetch(key) {
    return JSON.parse(localStorage[key]);
}

/**
 *
 * @param {String} key - the key to remove and delete all data in
 */
function remove(key) {
    return localStorage.removeItem(key);
}

module.exports.set = put;
module.exports.get = fetch;
module.exports.remove = remove;