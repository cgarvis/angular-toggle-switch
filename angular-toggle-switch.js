angular.module('toggle-switch', ['ng']).directive('toggleSwitch', function () {
  return {
    restrict: 'EA',
    replace: true,
    require:'ngModel',
    scope: {
      disabled: '@',
      onLabel: '@',
      offLabel: '@',
      knobLabel: '@',
      onValue: '@',
      offValue: '@'
    },
    template: '<div role="radio" class="switch" ng-class="{ \'disabled\': disabled }">' +
        '<div class="switch-animate" ng-class="{\'switch-off\': !model, \'switch-on\': model}">' +
        '<span class="switch-left" ng-bind="onLabel"></span>' +
        '<span class="knob" ng-bind="knobLabel"></span>' +
        '<span class="switch-right" ng-bind="offLabel"></span>' +
        '</div>' +
        '</div>',
    link: function(scope, element, attrs, ngModelCtrl){
      if (!attrs.onLabel) { attrs.onLabel = 'On'; }
      if (!attrs.offLabel) { attrs.offLabel = 'Off'; }
      if (!attrs.knobLabel) { attrs.knobLabel = '\u00a0'; }
      if (!attrs.disabled) { attrs.disabled = false; }
      if (!attrs.onValue) { attrs.onValue = true; }
      if (!attrs.offValue) { attrs.offValue = false; }
      //if values are number
      if((+attrs.onValue).toString() === attrs.onValue && (+attrs.offValue).toString() === attrs.offValue) {
        attrs.onValue = parseInt(attrs.onValue);
        attrs.offValue = parseInt(attrs.offValue);
      }

      element.on('click', function() {
        scope.$apply(scope.toggle);
      });

      ngModelCtrl.$formatters.push(function(modelValue){
         return modelValue;
      });

      ngModelCtrl.$parsers.push(function(viewValue){
        return viewValue;
      });

      ngModelCtrl.$render = function(){
          //scope.model = ngModelCtrl.$viewValue;
          if(attrs.onValue === ngModelCtrl.$viewValue) {
            scope.model = true;
          }
          else {
            scope.model = false;
          }
      };
      scope.toggle = function toggle() {
        if(!scope.disabled) {
          scope.model = !scope.model;
          //ngModelCtrl.$setViewValue(scope.model);
          if(scope.model) {
            ngModelCtrl.$setViewValue(scope.onValue);
          }
          else {
            ngModelCtrl.$setViewValue(scope.offValue);
          }
        }
      };
    }
  };
});
