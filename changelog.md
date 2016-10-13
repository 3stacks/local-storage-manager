## Local Storage Manager

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