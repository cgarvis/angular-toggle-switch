angular.module('toggle-switch', ['ng']).directive('toggleSwitch', function () {
	return {
		restrict: 'EA',
		replace: true,
		require: 'ngModel',
		scope: {
			disabled: '@',
			onLabel: '@',
			offLabel: '@',
			knobLabel: '@',
			onClass: '@',
			offClass: '@',
			ngModel: '='
		},
		template: '<div class="bootstrap-switch bootstrap-switch-wrapper bootstrap-switch-large bootstrap-switch-animate" ng-click="toggle()" ng-class="{\'bootstrap-switch-off\': !ngModel, \'bootstrap-switch-on\': ngModel, \'disabled\': disabled }">' +
		'<div class="bootstrap-switch-container" >' +
		'<span class="bootstrap-switch-handle-on" ng-class="onClass" ng-bind="onLabel"></span>' +
		'<span class="bootstrap-switch-label" ng-bind="knobLabel"></span>' +
		'<span class="bootstrap-switch-handle-off" ng-class="offClass" ng-bind="offLabel"></span>' +
		'</div>' +
		'</div>',
		compile: function (element, attrs) {
			if (!attrs.onLabel) {
				attrs.onLabel = 'On';
			}
			if (!attrs.offLabel) {
				attrs.offLabel = 'Off';
			}
			if (!attrs.onClass) {
				attrs.onClass = 'bootstrap-switch-primary';
			}
			if (!attrs.offClass) {
				attrs.offClass = 'bootstrap-switch-default';
			}
			if (!attrs.knobLabel) {
				attrs.knobLabel = '';
			}
			if (!attrs.disabled) {
				attrs.disabled = false;
			}
			return function postLink(scope) {
				if (typeof scope.ngModel === 'undefined') {
					scope.ngModel = false;
				}
				scope.toggle = function () {
					if (!scope.disabled) {
						scope.ngModel = !scope.ngModel;
					}
				};
			};
		}
	};
});
