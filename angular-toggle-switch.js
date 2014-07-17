angular.module('gc.bootstrap', ['template/toggle-switch/toggle-switch.html', 'gc.bootstrap.toggle-switch', 'ui.bootstrap.bindHtml']);

angular.module('gc.bootstrap.toggle-switch', [])
	.constant('toggleSwitchConfig', {
		switchClass: 'toggle-switch-animate',
		switchOnClass: 'toggle-switch-on',
		switchOffClass: 'toggle-switch-off',
		switchIndeterminateClass: 'toggle-switch-indeterminate',
		toggleEvent: 'click',
		onClass: 'toggle-switch-primary',
		offClass: 'toggle-switch-default',
		onLabel: 'On',
		offLabel: 'Off',
		knobLabel: ''
	})
	.controller('ToggleSwitchController', function (toggleSwitchConfig, $interpolate, $attrs, $scope) {
		var self = this;

		// Configuration attributes
		angular.forEach(['switchClass','onClass', 'offClass', 'onLabel', 'offLabel', 'knobLabel'], function (key) {
			self[key] = angular.isDefined($attrs[key]) ? $interpolate($attrs[key])($scope.$parent) : toggleSwitchConfig[key];
		});

		this.switchIndeterminateClass = toggleSwitchConfig.switchIndeterminateClass || 'toggle-switch-on';
		this.switchOnClass = toggleSwitchConfig.switchOnClass || 'toggle-switch-on';
		this.switchOffClass = toggleSwitchConfig.switchOffClass || 'toggle-switch-off';

		this.toggleEvent = toggleSwitchConfig.toggleEvent || 'click';
	})
	.directive('toggleSwitch', function () {
		return {
			restrict: 'E',
			replace: true,
			require: ['toggleSwitch', 'ngModel'],
			controller: 'ToggleSwitchController',
			scope: {},
			templateUrl: 'template/toggle-switch/toggle-switch.html',
			link: function postLink(scope, element, attrs, ctrls) {
				var toggleSwitchCtrl = ctrls[0], ngModelCtrl = ctrls[1];

				scope.switchClass = toggleSwitchCtrl.switchClass;
				scope.onClass = toggleSwitchCtrl.onClass;
				scope.offClass = toggleSwitchCtrl.offClass;
				scope.onLabel = toggleSwitchCtrl.onLabel;
				scope.offLabel = toggleSwitchCtrl.offLabel;
				scope.knobLabel = toggleSwitchCtrl.knobLabel;

				// Watchable attributes
				angular.forEach(['switchClass','onClass','offClass','onLabel','offLabel','knobLabel'], function (key) {
					attrs.$observe(key, function(value) {
						if(value){
							scope[key] = value;
						}
					});
				});


				function getTrueValue() {
					return getCheckboxValue(attrs.toggleSwitchTrue, true);
				}

				function getFalseValue() {
					return getCheckboxValue(attrs.toggleSwitchFalse, false);
				}

				function getCheckboxValue(attributeValue, defaultValue) {
					var val = scope.$eval(attributeValue);
					return angular.isDefined(val) ? val : defaultValue;
				}

				//model -> UI
				ngModelCtrl.$render = function () {
					var trueValue =  angular.equals(ngModelCtrl.$modelValue, getTrueValue()),
						falseValue =  angular.equals(ngModelCtrl.$modelValue, getFalseValue());

					element.toggleClass(toggleSwitchCtrl.switchIndeterminateClass, !trueValue && !falseValue);

					element.toggleClass(toggleSwitchCtrl.switchOnClass, trueValue);
					element.toggleClass(toggleSwitchCtrl.switchOffClass, falseValue);
				};

				//ui->model
				element.bind(toggleSwitchCtrl.toggleEvent, function () {
					scope.$apply(function () {
						ngModelCtrl.$setViewValue(element.hasClass(toggleSwitchCtrl.switchOnClass) ? getFalseValue() : getTrueValue());
						ngModelCtrl.$render();
					});
				});
			}
		};
	});

angular.module('template/toggle-switch/toggle-switch.html', [])
	.run(function ($templateCache) {
		$templateCache.put('template/toggle-switch/toggle-switch.html',
			'<div class="toggle-switch toggle-switch-wrapper" ng-class="switchClass">' +
			'<div class="toggle-switch-container" >' +
			'<span class="toggle-switch-handle-on" ng-class="onClass" bind-html-unsafe="onLabel"></span>' +
			'<span class="toggle-switch-label" bind-html-unsafe="knobLabel"></span>' +
			'<span class="toggle-switch-handle-off" ng-class="offClass" bind-html-unsafe="offLabel"></span>' +
			'</div>' +
			'</div>' +
			'');
	});

angular.module('ui.bootstrap.bindHtml', [])

	.directive('bindHtmlUnsafe', function () {
		return function (scope, element, attr) {
			element.addClass('ng-binding').data('$binding', attr.bindHtmlUnsafe);
			scope.$watch(attr.bindHtmlUnsafe, function bindHtmlUnsafeWatchAction(value) {
				element.html(value || '');
			});
		};
	});