(function() {
  var module = angular.module('toggle-switch', ['ng']);

  module.provider('toggleSwitchConfig', [function() {
    this.onLabel = 'On';
    this.offLabel = 'Off';
    this.knobLabel = '\u00a0';

    var self = this;
    this.$get = function() {
      return {
        disabled: '=ngdisabled',
        onLabel: self.onLabel,
        offLabel: self.offLabel,
        knobLabel: self.knobLabel
      };
    };
  }]);

  module.directive('toggleSwitch',['toggleSwitchConfig', function (toggleSwitchConfig) {
    return {
      restrict: 'EA',
      replace: true,
      require:'ngModel',
      scope: {
        disabled: '@',
        onLabel: '@',
        offLabel: '@',
        knobLabel: '@'
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
        var KEY_SPACE = 32;

        attrs.$observe('disabled', function (disabled) {
          if (disabled === 'true' || disabled) {
              isEnabled = false;
          } else {
              isEnabled = true;
          }
          scope.disabled = disabled;
        });

        element.on('click', function() {
          scope.$apply(scope.toggle);
        });

        element.on('keydown', function(e) {
          var key = e.which ? e.which : e.keyCode;
          if (key === KEY_SPACE) {
            scope.$apply(scope.toggle);
            $event.preventDefault();
          }
        });

        ngModelCtrl.$formatters.push(function(modelValue){
          return modelValue;
        });

        ngModelCtrl.$parsers.push(function(viewValue){
          return viewValue;
        });

        ngModelCtrl.$viewChangeListeners.push(function() {
          scope.$eval(attrs.ngChange);
        });

        ngModelCtrl.$render = function(){
            scope.model = ngModelCtrl.$viewValue;
        };

        scope.toggle = function toggle() {
          if(!scope.disabled) {
            scope.model = !scope.model;
            ngModelCtrl.$setViewValue(scope.model);
          }
        };
      }
    };
  }]);
})();
