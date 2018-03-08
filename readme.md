## Local Storage Manager

[![Build Status](https://travis-ci.org/3stacks/local-storage-manager.svg?branch=master)](https://travis-ci.org/3stacks/local-storage-manager)
[![Coverage Status](https://coveralls.io/repos/github/3stacks/local-storage-manager/badge.svg?branch=master)](https://coveralls.io/github/3stacks/local-storage-manager?branch=master)

A simple package used for creating, storing and deleting data from local storage.

Current features:
* Enter key and data into local storage
* Get the data for a given key
* Remove all data for a given key

### Installation

`npm install @lukeboyle/local-storage-manager --save`

### Usage

- When setting data, put your namespace as the third argument and all data 
will be stored under that key
- You can then get keys from under that namespace, or just get that key 
and dump all your namespace data

```javascript
const localStorageManager = require('@lukeboyle/local-storage-manager'); // OR
import * as localStorageManager from '@lukeboyle/local-storage-manager'; // OR
import {getItem, setItem, removeItem} from '@lukeboyle/local-storage-manager';

// Creating a key and entering a string into local storage

setItem('string1', 'data');
setItem('some/path', 'some string');
setItem(['other', 'path'], 'some string');

// Second argument of setItem is any type that can be JSON.stringified

// Getting data bound to a key

getItem('string1'); // => 'data'
getItem('some/path'); // => 'some string'
getItem(['other', 'path']); // => 'some string'

// Removing a key and all data bound to it

removeItem('string1');
removeItem('some/path');
removeItem(['other', 'path']);

```

## API

### setItem

#### Arguments

- path - `string | Array<string>` e.g. `'noPath'`, `'short/path'`, `['array', 'path']` 
*(array and slash separated paths can not be combined)*
- data - `any` - Any data valid for `JSON.stringify`

### getItem

#### Arguments

- path - `string | Array<string>` e.g. `'noPath'`, `'short/path'`, `['array', 'path']` 
*(array and slash separated paths can not be combined)*
- defaultValue - `any` - If key doesn't exist in Storage, this will be returned instead

### removeItem

#### Arguments

- path - `string | Array<string>` e.g. `'noPath'`, `'short/path'`, `['array', 'path']` 
*(array and slash separated paths can not be combined)*

### Running the Tests

run `npm test`

## Contact

Find me on [Github](https://github.com/3stacks/ "Github"),
or at my [website](http://lukeboyle.com "My website")
