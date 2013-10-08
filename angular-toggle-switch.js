angular.module('toggle-switch', ['ng']).directive('toggleSwitch', function () {
  return {
    restrict: 'EA',
    replace: true,
    scope: {
      model: '=',
      onLabel: '=?onLabel',
      offLabel: '=?offLabel',
      knobLabel: '=?knobLabel'
    },
    template: '<div class="switch" ng-click="toggle()"><div ng-class="{\'switch-off\': !model, \'switch-on\': model}"><span class="switch-left">{{ onLabel }}</span><span class="knob">{{ knobLabel }}</span><span class="switch-right">{{ offLabel }}</span></div></div>',
    link: function ($scope, element, attrs) {
      $scope.onLabel = $scope.onLabel || attrs.onLabel || 'On'
      $scope.offLabel = $scope.offLabel || attrs.offLabel || 'Off'
      $scope.knobLabel = $scope.knobLabel || attrs.knobLabel || '\u00A0'
      return $scope.toggle = function () {
        element.children().addClass('switch-animate')
        return $scope.model = !$scope.model;
      };
    }
  };
});
