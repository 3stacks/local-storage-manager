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