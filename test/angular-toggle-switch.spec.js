describe('Toggle Switch', function () {
	var $scope, $compile;

	var template = {
		base: '<toggle-switch ng-model="switchState"></toggle-switch>',
		'onLabel': '<toggle-switch ng-model="switchState" on-label="Yes"></toggle-switch>',
		'xs': '<toggle-switch ng-model="switchState" class="toggle-switch-xs"></toggle-switch>',
		'sm': '<toggle-switch ng-model="switchState" class="toggle-switch-sm"></toggle-switch>',
		'lg': '<toggle-switch ng-model="switchState" class="toggle-switch-lg"></toggle-switch>',
		'offLabel': '<toggle-switch ng-model="switchState" off-label="No"></toggle-switch>',
		'knobLabel': '<toggle-switch ng-model="switchState" knob-label="Click"></toggle-switch>',
		'onClass': '<toggle-switch ng-model="switchState" on-class="Click"></toggle-switch>',
		'offClass': '<toggle-switch ng-model="switchState" off-class="Click"></toggle-switch>',
		'disabled': '<toggle-switch ng-model="switchState" ng-disabled="isDisabled"></toggle-switch>'
	};

	// Load up just our module
	beforeEach(module('gc.bootstrap'));

	beforeEach(inject(function ($rootScope, _$compile_) {
		// Get an isolated scope
		$scope = $rootScope.$new();
		$compile = _$compile_;
	}));

	function compileDirective(template, scope) {
		// Compile Directive
		var elm = angular.element(template);
		$compile(elm)(scope);
		scope.$apply();
		return elm;
	}

	describe('default labels', function () {
		var elm;

		beforeEach(function () {
			elm = compileDirective(template.base, $scope);
		});

		it('onLabel', function () {
			expect(elm.text()).toContain('On');
		});

		it('offLabel', function () {
			expect(elm.text()).toContain('Off');
		});
	});

	describe('when state is null', function () {
		it('changes model to true when clicked', function () {
			var elm = compileDirective(template.base, $scope);
			elm.triggerHandler('click');
			expect($scope.switchState).toEqual(true);
		});
	});

	describe('when state is true', function () {
		// Change state to true
		beforeEach(function () {
			$scope.$apply(function () {
				$scope.switchState = true;
			});
		});

		it('changes model to false when clicked', function () {
			var elm = compileDirective(template.base, $scope);
			elm.triggerHandler('click');
			expect($scope.switchState).toEqual(false);
		});
	});

	describe('when state is false', function () {
		// Change state to true
		beforeEach(function () {
			$scope.$apply(function () {
				$scope.switchState = false;
			});
		});

		it('changes model to true when clicked', function () {
			var elm = compileDirective(template.base, $scope);
			elm.triggerHandler('click');
			expect($scope.switchState).toEqual(true);
		});
	});

	describe('when there is a class of `toggle-switch-xs`', function () {
		it('is xs sized', function () {
			var elm = compileDirective(template.xs, $scope);
			expect(elm.hasClass('toggle-switch-xs')).toEqual(true);
		});
	});

	describe('when there is a class of `toggle-switch-sm`', function () {
		it('is xs sized', function () {
			var elm = compileDirective(template.sm, $scope);
			expect(elm.hasClass('toggle-switch-sm')).toEqual(true);
		});
	});

	describe('when there is a class of `toggle-switch-lg`', function () {
		it('is xs sized', function () {
			var elm = compileDirective(template.lg, $scope);
			expect(elm.hasClass('toggle-switch-lg')).toEqual(true);
		});
	});

	describe('when there is a custom `on-label`', function () {
		// @TODO: figure out how to deal with html in Angular 1.2
		//describe('is html', function() {
		//  it('sets the on label', function() {
		//    var elm = compileDirective(htmlLabelsTemplate, $scope);
		//    expect(elm.html()).toContain('<i class="icon-ok icon-white"></i>');
		//  });
		//});

		describe('is string', function () {
			it('sets the on label', function () {
				var elm = compileDirective(template.onLabel, $scope);
				expect(elm.text()).toContain('Yes');
			});
		});
	});

	describe('when there is a custom `off-label`', function () {
		// @TODO: figure out how to deal with html in Angular 1.2
		//describe('is html', function() {
		//  it('sets the on label', function() {
		//    var elm = compileDirective(htmlLabelsTemplate, $scope);
		//    expect(elm.html()).toContain('<i class="icon-remove"></i>');
		//  });
		//});

		describe('is string', function () {
			it('sets the on label', function () {
				var elm = compileDirective(template.offLabel, $scope);
				expect(elm.text()).toContain('No');
			});
		});
	});

	describe('when there is a custom `knob-label`', function () {
		it('sets the on label', function () {
			var elm = compileDirective(template.knobLabel, $scope);
			expect(elm.text()).toContain('Click');
		});
	});

	describe('when toggle is disabled', function () {
		it('ngModel does not change on click', function () {
			// @TODO: figure out the best way to test disable, currently the css prevents to click
			// @TODO: should the directive rely purely on css OR should it have js logic to detect the disabled attr and prevent changing?
			$scope.switchState = true;
			$scope.isDisabled = true;
			var elm = compileDirective(template.disabled, $scope);
			elm.triggerHandler('click');
			expect($scope.switchState).toEqual(true);
		});
	});
});
