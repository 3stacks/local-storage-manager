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

### removeItem

#### Arguments

- path - `string | Array<string>` e.g. `'noPath'`, `'short/path'`, `['array', 'path']` 
*(array and slash separated paths can not be combined)*

### Running the Tests

run `npm test`

## Changelog

### 3.0.0

- remove `set` function (replaced by `setItem`) 
- remove `get` function (replaced by `getItem`)
- add support for Array or slash separated keys in `getItem` or `setItem`
- remove `transformToStorage`
- remove `transformFromStorage`
- remove `setIfEmpty`

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
