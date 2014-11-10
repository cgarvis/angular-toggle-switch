(function() {
  var module = angular.module('toggle-switch', ['ng']);

  module.provider('toggleSwitchConfig', function() {
    this.onLabel = 'On';
    this.offLabel = 'Off';
    this.knobLabel = '\u00a0';

    var self = this;
    this.$get = function() {
      return {
        onLabel: self.onLabel,
        offLabel: self.offLabel,
        knobLabel: self.knobLabel
      };
    };
  });

  module.directive('toggleSwitch', function (toggleSwitchConfig) {
    return {
      restrict: 'EA',
      replace: true,
      require:'ngModel',
      scope: {
        disabled: '@',
        onLabel: '@',
        offLabel: '@',
        knobLabel: '@',
        ngChange : "&"
      },
      template: '<div role="radio" class="toggle-switch" ng-class="{ \'disabled\': disabled }">' +
          '<div class="toggle-switch-animate" ng-class="{\'switch-off\': !model, \'switch-on\': model}">' +
          '<span class="switch-left" ng-bind="onLabel"></span>' +
          '<span class="knob" ng-bind="knobLabel"></span>' +
          '<span class="switch-right" ng-bind="offLabel"></span>' +
          '</div>' +
          '</div>',
      compile: function(element, attrs) {
        if (!attrs.onLabel) { attrs.onLabel = toggleSwitchConfig.onLabel; }
        if (!attrs.offLabel) { attrs.offLabel = toggleSwitchConfig.offLabel; }
        if (!attrs.knobLabel) { attrs.knobLabel = toggleSwitchConfig.knobLabel; }

        return this.link;
      },
      link: function(scope, element, attrs, ngModelCtrl){
        var isEnabled = true;

        attrs.$observe('disabled', function(disabled) {
          if(disabled === 'true') {
            isEnabled = false;
          } else {
            isEnabled = true;
          }
        });

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
            scope.model = ngModelCtrl.$viewValue;
        };

        scope.toggle = function toggle() {
          if(isEnabled) {
            scope.model = !scope.model;
            ngModelCtrl.$setViewValue(scope.model);
            if (angular.isDefined(attrs.ngChange)) {
              $timeout(scope.ngChange);
            }
          }
        };
      }
    };
  });
})();
