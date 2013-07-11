angular.module('toggle-switch', ['ng']).directive('toggleSwitch', function () {
    return {
        restrict: 'EA',
        replace: true,
        scope: {
            model: '=',
            on: '=',
            off: '='
        },
        template: '<div class="switch" ng-click="toggle()"><div ng-class="{\'switch-off\': !model, \'switch-on\': model}"><span class="switch-left">{{ on || "On" }}</span><span class="knob">&nbsp;</span><span class="switch-right">{{ off || "Off" }}</span></div></div>',
        link: function ($scope, element, attrs) {
            if ($scope.model == null) {
                $scope.model = false;
            }
            return $scope.toggle = function () {
                element.children().addClass('switch-animate')
                return $scope.model = !$scope.model;
            };
        }
    };
});
