import {set, get, remove} from '../index';

function prepareLocalStorage() {
    localStorage.clear();
}

function getTest() {
    return get('key');
}

function namespacedGetTest() {
    return get('namespaced', 'sampleNamespace');
}

function testInit() {
    prepareLocalStorage();
    set('key', 'value');
    console.log(getTest());
    remove('key');
    console.log(getTest());
    set('namespaced', 'namespacedValue', 'sampleNamespace');
    console.log(namespacedGetTest());
}

testInit();