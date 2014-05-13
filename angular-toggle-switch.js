angular.module('toggle-switch', ['ng']).directive('toggleSwitch', function () {
  return {
    restrict: 'EA',
    replace: true,
    scope: {
      model: '=',
      disabled: '@?',
      onLabel: '@?',
      offLabel: '@?',
      knobLabel: '@?'
    },
    template: '<div class="switch" ng-click="toggle()" ng-class="{ \'disabled\': disabled }"><div class="switch-animate" ng-class="{\'switch-off\': !model, \'switch-on\': model}"><span class="switch-left" ng-bind="onLabel"></span><span class="knob" ng-bind="knobLabel"></span><span class="switch-right" ng-bind="offLabel"></span></div></div>',
    controller: function($scope) {
      $scope.onLabel = $scope.onLabel || 'On';
      $scope.offLabel = $scope.offLabel || 'Off';
      $scope.knobLabel = $scope.knobLabel || '\u00a0';
      $scope.disabled = $scope.disabled || false;

      $scope.toggle = function toggle() {
        if(!$scope.disabled) {
          $scope.model = !$scope.model;
        }
      };
    },
  };
});
