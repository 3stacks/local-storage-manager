import {set, get} from '../index';

function prepareLocalStorage() {
    localStorage.clear();
}

set('key', 'value');

function getTest() {
    console.log(get('key'));
}

prepareLocalStorage();
getTest();