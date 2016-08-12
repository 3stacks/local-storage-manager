import * as localStorageManager from '../index';

function prepareLocalStorage() {
    localStorage.clear();
}

localStorageManager.set('key', 'value');

function getTest() {
    console.log(localStorageManager.get('key'));
}

prepareLocalStorage();
getTest();