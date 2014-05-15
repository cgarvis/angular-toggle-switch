angular.module('toggle-switch', ['ng', 'ngSanitize']).directive('toggleSwitch', function ($compile) {
  return {
    restrict: 'EA',
    replace: true,
    scope: {
      model: '=',
      disabled: '@',
      onLabel: '@',
      offLabel: '@',
      knobLabel: '@',
      html: '@'
    },
    template: '<div class="switch" ng-click="toggle()" ng-class="{ \'disabled\': disabled }">' +
      '</div>',
    controller: function($scope) {
      $scope.toggle = function toggle() {
        if(!$scope.disabled) {
          $scope.model = !$scope.model;
        }
      };
    },
    link: function(scope, element, attrs) {
      if (!attrs.onLabel) { attrs.onLabel = 'On'; }
      if (!attrs.offLabel) { attrs.offLabel = 'Off'; }
      if (!attrs.knobLabel) { attrs.knobLabel = '\u00a0'; }
      if (!attrs.disabled) { attrs.disabled = false; }
      if (!attrs.html) { attrs.html = false; }

      var bindMethod = attrs.html ? 'ng-bind-html' : 'ng-bind';

      var innerTemplate = '<div class="switch-animate" ng-class="{\'switch-off\': !model, \'switch-on\': model}">' +
              '<span class="switch-left" '+bindMethod+'="onLabel"></span>' +
              '<span class="knob" '+bindMethod+'="knobLabel"></span>' +
              '<span class="switch-right" '+bindMethod+'="offLabel"></span>' +
            '</div>' ;

      element.html(innerTemplate);
      $compile(element.contents())(scope);
    },
  };
});
