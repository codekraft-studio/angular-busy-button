/* angular-busy-button - v1.0.0 by codekraft-studio - 2016-03-25 */

angular.module('angular-busy-button', [])

.directive('busyButton', function($log,$timeout,$q) {

  var _scope = {
    busyButton: '=?'
  }

  var directive = {
    restrict: 'A',
    scope: _scope,
    link: _link
  }

  return directive;

  function changeText(elem, text) {
    return elem[0].nodeName.toLowerCase() === 'input' ? elem.val(text) : elem.html(text);
  }

  function _link(scope, elem, attrs) {

    // init counter
    var count = 0;

    // check if is a input element
    var isInput = elem[0].nodeName.toLowerCase() === 'input';

    // a extra class to apply based on
    // resolve function result (if passed one)
    var completeClassResult;

    var defaultTimeout = 2000; // the timeout if nothing is specified
    var defaultWaitTime = 1000; // the time to wait before use again the button

    // get the element original text content
    var originalText = ( isInput ? elem.val() : elem.text() ) || 'Submit';

    // text to display when button is busy
    var busyText = attrs.busyText || 'Loading..';

    // text to display when button promise return success
    var busySuccess = attrs.busySuccess || ( isInput ? 'Done' : '&#10004;' );

    // text to display when button promise return error
    var busyError = attrs.busyError || ( isInput ? 'Error' : '&#x2717;' );

    // text to display when button complete
    // (default success, this may vary during the runtime)
    var busyCompleteText = busySuccess;

    // the text to display after when the button is ready again
    var busyAfter = attrs.busyAfter || originalText;

    // class to set after button has done
    var completeClass = attrs.busyCompleteClass || 'btn-complete';

    var busyWaitTime = attrs.busyWaitTime || defaultWaitTime;

    // how many times the button can run, default unlimited
    var busyRuntimes = attrs.busyRuntimes || -1;

    /**
     * If is passed a valid function to busy-button
     * bind to click event on item, otherwise bind
     * a fake call on click with timeout
     */
    if( angular.isFunction(scope.busyButton) ) {

      // execute passed function on
      // element click event
      elem.bind('click', function(e) {
        scope.$apply(function() {
          // set flag to loading
          scope.busyFlag = true;

          return $q.when( scope.busyButton(), function(response) {
            // set success class
            busyCompleteText = busySuccess;
            completeClassResult = 'success';
          }, function() {
            // set error class
            busyCompleteText = busyError;
            completeClassResult = 'error';

          }).then(function() { scope.busyFlag = false; })
        })
      })

    } else {

      // run a fake timeout as default
      // function is nothing is specified
      elem.bind('click', function(e) {

        scope.$apply(function() {
          // set flag to loading (true)
          scope.busyFlag = true;
          // run the timeout with default-time
          $timeout(function() {
            // set flag back to ready (false)
            scope.busyFlag = !scope.busyFlag;
          // wait two seconds by default
          }, defaultTimeout)
        })

      })

    }

    /**
     * Watch the the flag for the busy or ready
     * state of the button, assign some classes,
     * temporaneally disable the button
     */
    scope.$watch('busyFlag', function(n,o) {

      // first run return
      if(n === o) return;

      // if true the button is busy
      // add busy text, clsas and disable it
      if( n ) {

        changeText(elem, busyText);

        // add default busy class
        elem.addClass('btn-busy');
        // disable button element
        attrs.$set('disabled', true);

      // when false add complete classes,
      // restore original text or after text (if specified)
      // and finally enable the button again
      // (if not specified a different behaviour)
      } else {

        // increase count
        count++;

        // remove busy class
        elem.removeClass('btn-busy');

        elem.addClass(completeClass);
        // and extra class (if exist) for as result of operation
        elem.addClass(completeClassResult);

        // set complete text
        changeText(elem, busyCompleteText);

        // after the specified timeout
        // remove all classes and re-enable the button
        $timeout(function() {

          elem.removeClass(completeClass);
          elem.removeClass(completeClassResult);

          // set the text to display after the action
          changeText(elem, busyAfter);

          // check if can be executed again
          if( busyRuntimes === -1 ) {

            // re-enable button
            return attrs.$set('disabled', false);

          } else if( busyRuntimes > count ) {

            // re-enable button
            return attrs.$set('disabled', false);
          }

          // add disabled class
          elem.addClass('btn-disabled');

        }, busyWaitTime)

      }

    })

  }

})
