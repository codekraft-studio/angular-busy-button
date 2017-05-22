# angular-busy-button
Interactive buttons for your app.
Based on Luckasz's Watroba [v-buttons](https://github.com/LukaszWatroba/v-button) module.

### [Demo](http://www.codekraft.it/demos/angular-busy-button/)

### Getting started
Download the package:
```bash
npm install --save angular-busy-button
bower install --save angular-busy-button
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
And now you are ready to use the __busy-button__ attribute directive.

### Basic usage
The simplest way to use it is by adding __busy-button__ like so:
```html
<button type="button" busy-button>Click Me</button>
```
The directive can take also a __function__ that return a __Promise__, a __$resource__ or a __$http__ promise, like in this example:
```html
<button type="button" busy-button="loadData()">Click Me</button>
```
```javascript
$scope.loadData = function() {
  var deferred = $q.defer();
  $timeout(function() {
    deferred.resolve();
  }, 5000)
  return deferred.promise;
}
```
Also you can use various attributes to customize the button beheviour:
* __busy-text__: The text to show during button progress
* __busy-after__: The text to show after the button is pressed
* __busy-success__: The text to show when the button function success
* __busy-error__: The text to show when the button function fails
* __busy-complete-class__: The class to apply after the button progress completes
* __busy-wait-time__: The number of milliseconds to wait before click again - default 1000ms (1 sec)
* __busy-runtimes__: The number of times which the button can be pressed/executed

---

### Development
Install all the development dependencies.
```bash
npm install
```
There are two main actions:
```bash
grunt  // start the development server with livereload enabled on changes
grunt watch  // re-build automatically on javascript files changes
grunt build // create the distribution files by doing concat and uglify
```

---

### Contributing

1. Create an issue and describe your idea
2. Fork the project (https://github.com/codekraft-studio/angular-busy-button/fork)
3. Create your feature branch (`git checkout -b my-new-feature`)
4. Commit your changes (`git commit -am 'Add some feature'`)
5. Publish the branch (`git push origin my-new-feature`)
6. Create a new Pull Request
