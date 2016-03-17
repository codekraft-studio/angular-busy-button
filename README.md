# angular-busy-button
Interactive buttons for your app.
Based on Luckasz's Watroba [v-buttons](https://github.com/LukaszWatroba/v-button) module.

### [Demo](http://www.codekraft.it/demos/angular-busy-button/)

### Getting started
Download the package from github or from npm:
```bash
npm install angular-busy-button
```
Add the style and the script to your html page:
```html
<link rel="stylesheet" type="text/css" href="angular-busy-button.css">
<script type="text/javascript" src="angular-busy-button.js"></script>
```
Add module name to your application dependencies:
```javascript
angular.module('app', ['angular-busy-button']);
```
And now you are ready to use the __busy-button__ attribute.

### Building
Install all the development dependencies.
```bash
npm install
```
There are two main actions:
```bash
grunt watch  // re-build automatically on javascript files changes
grunt build // create the distribution files by doing concat and uglify
```

Reference and examples coming soon.
