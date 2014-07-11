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
		template: '<div class="bootstrap-switch bootstrap-switch-wrapper bootstrap-switch-animate" ng-click="toggle()" ng-class="{\'bootstrap-switch-off\': !ngModel, \'bootstrap-switch-on\': ngModel, \'disabled\': disabled }">' +
		'<div class="bootstrap-switch-container" >' +
		'<span class="bootstrap-switch-handle-on" ng-class="onClass" ng-bind="onLabel"></span>' +
		'<span class="bootstrap-switch-label" ng-bind="knobLabel"></span>' +
		'<span class="bootstrap-switch-handle-off" ng-class="offClass" ng-bind="offLabel"></span>' +
		'</div>' +
		'</div>',
		compile: function () {
			return {
				pre: function preLink(scope, iElement, iAttrs) {
					if (!iAttrs.onLabel) {
						iAttrs.onLabel = 'On';
					}
					if (!iAttrs.offLabel) {
						iAttrs.offLabel = 'Off';
					}
					if (!iAttrs.onClass) {
						iAttrs.onClass = 'bootstrap-switch-primary';
					}
					if (!iAttrs.offClass) {
						iAttrs.offClass = 'bootstrap-switch-default';
					}
					if (!iAttrs.knobLabel) {
						iAttrs.knobLabel = '';
					}
					if (!iAttrs.disabled) {
						iAttrs.disabled = false;
					}
				},
				post: function postLink(scope, element, attrs, ngModelCtrl) {
					if (typeof ngModelCtrl.$modelValue !== 'boolean') {
						ngModelCtrl.$setViewValue((typeof scope.ngModel === 'boolean') ? scope.ngModel : false);
						ngModelCtrl.$setPristine();
						ngModelCtrl.$render();
					}

					scope.toggle = function () {
						if (!scope.disabled) {
							ngModelCtrl.$setViewValue(!ngModelCtrl.$modelValue);
							ngModelCtrl.$render();
						}
					};
				}
			};
		}
	};
});
