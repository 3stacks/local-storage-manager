## Local Storage Manager

A simple package used for creating, storing and deleting data from local storage.

Current features:
* Enter key and data into local storage
* Get the data for a given key
* Remove all data for a given key

### Installation

npm install local-storage-manager --save

### Usage

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

	*'data'*

// Removing a key and all data bound to it

localStorageManager.remove('string1');

// Example usage

var data = localStorageManager.get('string1');
if (data === 'data') {
	return true;
}

For changelog, view [changelog markdown](https://github.com/3stacks/local-storage-manager/blob/master/changelog.md "changelog")

Find me on [Github](https://github.com/3stacks/ "Github"),
or at my [website](http://lukeboyle.com "My website")