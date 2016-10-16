## Local Storage Manager

[![Build Status](https://travis-ci.org/3stacks/local-storage-manager.svg?branch=master)](https://travis-ci.org/3stacks/local-storage-manager)
[![Coverage Status](https://coveralls.io/repos/github/3stacks/local-storage-manager/badge.svg?branch=master)](https://coveralls.io/github/3stacks/local-storage-manager?branch=master)

A simple package used for creating, storing and deleting data from local storage.

Current features:
* Enter key and data into local storage (under a namespace optionally)
* Get the data for a given key (under a namespace optionally)
* Remove all data for a given key (under a namespace optionally)

### Installation

`npm install @lukeboyle/local-storage-manager --save`

### Usage

The main js file is ES5, and the src/index.js (main:jsnext) is ES2015

### New Features

- Namespacing data

- When setting data, put your namespace as the third argument and all data 
will be stored under that key
- You can then get keys from under that namespace, or just get that key 
and dump all your namespace data

```javascript
var localStorageManager = require('@lukeboyle/local-storage-manager') // OR
import * as localStorageManager from '@lukeboyle/local-storage-manager';

// Creating a key and entering a string into local storage

localStorageManager.set('string1', 'data');

// Creating a key and entering an array into local storage

localStorageManager.set('array1', [ 
	'one',
	'two',
	'three'
]);

// Namespacing data

localStorageManager.set('namespacedString', 'sampleValue', 'sampleNamespace');

	localStorageManager.get('namespacedString');
		// undefined
	
	localStorageManager.get('namespacedString', 'sampleNamespace')
		// sampleValue

// Getting data bound to a key

localStorageManager.get('string1');

//	returns: 'data'

// Removing a key and all data bound to it

localStorageManager.remove('string1');

// Example usage

var data = localStorageManager.get('string1');
if (data === 'data') {
	return true;
}
```

Using the transform to storage function.

In some cases, strings may not be able to be put into local storage as is. 
For example, a string such as '23/53453458124234' will return the error
"Unexpected token /" because this interrupts the stringify function.

To get around this, the transformToStorage function can replace the slash with a
suitable word or phrase. Likewise, the transformFromStorage function can remove 
the word we introduced.

```javascript

// Use the localStorageManager.set function as you normally would, but use transform 
// as the second argument

var keyName = 'stringWithToken';
var value = '23/53453458124234';

//Arguments: string to search, characters to find in string, characters to replace found string with.
var transformedValue = transformToStorage(value, '/', 'replaceTheSlash');

localStorageManager.set(keyName, transformedValue);

console.log(localStorageManager.get(keyName);
	-- '23replaceTheSlash53453458124234'

// To transform it back to normal, do the opposite function

var value2 = localStorageManager.get(keyName);
var transformedValue2 = transformFromStorage(value2, 'replaceTheSlash', '/');

console.log(transformedValue2)
	-- '23/53453458124234'
```

If keys in your local storage are undefined it may result in a crash. The setIfEmpty function eliminates this issue by 
checking if keys are undefined, and setting a default value if they are. See below for usage.

```javascript

// define your default values in the format of localStorageKeyName: defaultValue
var defaultValues = {
	string: '',
	array: [],
	object: {}
};

// pass your object of default values into the function
localStorageManager.setIfEmpty(defaultValues);

```

### Running the Tests

run `npm test`

## Changelog

### 2.1.5

- fix: stop accessing the key on namespace null check

### 2.1.4

- refactor: safely access the keys to stop throwing when keys are missing

### 2.1.3

- fix: make the remove function work stably

### 2.1.1

- fix: critical issue with namespace consistency

### 2.1.0

- feat: Add the ability to `namespace` your data to store it under an individual domain.
- refactor: convert to use `.getItem` and `.setItem` methods as per best practice
- refactor: convert fully to ES2015

### 1.1.4

- chore: Updates readme

### 1.1.3

- feat: Adds the 'setIfEmpty' function to make sure no undefined values are loaded in local storage. 

### 1.0.2

- Fixes an issue where undefined keys/data could be entered into localStorage

### 1.0.1

- Updates readme with usages of new functions.

### 1.0.0

- Adds two new functions to transform data you enter into local storage.
- Adds tests for each function.
- **Breaking change** - The package will now no longer run in an environment with no local storage to increase stability.

### 0.0.4

Updates readme.

### 0.0.3

Updates readme.

### 0.0.2

Adds the changelog and a full readme.

### 0.0.1

Initial Version.

## Contact

Find me on [Github](https://github.com/3stacks/ "Github"),
or at my [website](http://lukeboyle.com "My website")
