/* angular-busy-button - v1.1.0 by codekraft-studio - 2017-05-22 */

angular.module('angular-busy-button', [])

angular.module('angular-busy-button')
  .directive('busyButton', function($log, $timeout, $q) {

    var _scope = {
      busyButton: '&?'
    };

    var directive = {
      restrict: 'A',
      scope: _scope,
      link: _link
    };

    return directive;

    function _link(scope, elem, attrs) {

      // init counter
      var count = 0;

      // check if is a input element
      var isInput = elem[0].nodeName.toLowerCase() === 'input';

      // a extra class to apply based on
      // resolve function result (if passed one)
      var completeClassResult;

      var defaultTimeout = 2000; // the default timeout if nothing is specified
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

      function changeText(elem, text) {
        return isInput ? elem.val(text) : elem.html(text);
      }

      // execute passed function on
      // element click event
      elem.bind('click', function(e) {
        
        var promise = scope.busyButton();
        
        if( typeof promise === 'undefined' || !promise ) {
          
          /**
           * Apply the default busy timeout function
           */
          scope.$apply(function() {
            
            // set flag to loading (true)
            scope.busyFlag = true;
            
            // run the timeout with default-time
            $timeout(function() {
              // set flag back to ready (false)
              scope.busyFlag = !scope.busyFlag;
              // wait two seconds by default
            }, defaultTimeout);
            
          });
          
        } else {
          
          if( promise.then || promise.$then ) {
            promise = promise;
          } else if( promise.$promise ) {
            promise = promise.$promise;
          } else if( promise.denodeify ) {
            promise = $q.when(promise);
          }
          
          var then = (promise.then || promise.$then);
          
          if( !then ) {
            $log.warn('angular-busy-button: You passed an invalid promise:', promise);
            return;
          }
          
          // set flag to true
          scope.busyFlag = true;
          
          return then.call(promise, function() {
            busyCompleteText = busySuccess;
            completeClassResult = 'success';
          }, function() {
            busyCompleteText = busyError;
            completeClassResult = 'error';
          }).then(function() {
            // reset the flag to false
            scope.busyFlag = false;
          });

        }
          
      });

      /**
       * Watch the the flag for the busy or ready
       * state of the button, assign some classes,
       * temporaneally disable the button
       */
      scope.$watch('busyFlag', function(n,o) {

        // first run return
        if(n === o) { return; }

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
            
            // if button can be executed again enable it again
            // otherwise add the disabled class
            if( (busyRuntimes === -1) || (busyRuntimes > count) ) {
              attrs.$set('disabled', false);
            } else {
              elem.addClass('btn-disabled');
            }

          }, busyWaitTime)

        }

      })

    }

  });
