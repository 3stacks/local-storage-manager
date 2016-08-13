## Local Storage Manager

A simple package used for creating, storing and deleting data from local storage.

Current features:
* Enter key and data into local storage
* Get the data for a given key
* Remove all data for a given key

### Installation

`npm install @lukeboyle/local-storage-manager --save`

### Usage

The main js file is ES5, and the src/index.js (main:jsnext) 

```javascript
var localStorageManager = require('local-storage-manager')

// Creating a key and entering a string into local storage

localStorageManager.set('string1', 'data');

// Creating a key and entering an array into local storage

localStorageManager.set('array1' 
		[ 
			'one'
			'two'
			'three'
		]);

// Creating a key and entering an object into local storage

localStorageManager.set('object1' 
		[
			{
				one: 'two',
				two: 'three',
				three: 'four'
			}	
		]);

// Getting data bound to a key

localStorageManager.get('string1');

	returns: 'data'

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
	object: {

	}
};

// pass your object of default values into the function
localStorageManager.setIfEmpty(defaultValues);

```

### Running the Tests

To run the test included in this package, open the `test.html` and open the developer console.

Note that if the environment does not have local storage, the functions will not run.

### Contact

For changelog, view [changelog markdown](https://github.com/3stacks/local-storage-manager/blob/master/changelog.md "changelog")

Find me on [Github](https://github.com/3stacks/ "Github"),
or at my [website](http://lukeboyle.com "My website")