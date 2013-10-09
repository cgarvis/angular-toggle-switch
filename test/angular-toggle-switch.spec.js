describe('Toggle Switch', function() {
  var $scope, $compile;

  var baseTemplate = '<toggle-switch model="switchState">\n</toggle-switch>';
  var onLabelTemplate = '<toggle-switch model="switchState" on-label="CUSTOM">\n</toggle-switch>';
  var offLabelTemplate = '<toggle-switch model="switchState" off-label="CUSTOM">\n</toggle-switch>';
  var knobLabelTemplate = '<toggle-switch model="switchState" knob-label="CUSTOM">\n</toggle-switch>';

  // Load up just our module
  beforeEach(module('toggle-switch'));

  beforeEach(inject(function($rootScope, _$compile_) {
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
  };

  describe('when state is null', function() {
    it('changes model to true when clicked', function() {
      var elm = compileDirective(baseTemplate, $scope);
      elm.triggerHandler('click');
      expect($scope.switchState).toEqual(true);
    });
  });

  describe('when state is true', function() {
    // Change state to true
    beforeEach(function() {
      $scope.$apply(function() {
        $scope.switchState = true;
      });
    });

    it('changes model to false when clicked', function() {
      var elm = compileDirective(baseTemplate, $scope);
      elm.triggerHandler('click');
      expect($scope.switchState).toEqual(false);
    });
  });

  describe('when state is false', function() {
    // Change state to true
    beforeEach(function() {
      $scope.$apply(function() {
        $scope.switchState = false;
      });
    });

    it('changes model to true when clicked', function() {
      var elm = compileDirective(baseTemplate, $scope);
      elm.triggerHandler('click');
      expect($scope.switchState).toEqual(true);
    });
  });

  describe('when there is a custom `on-label`', function () {
    it('sets the on label', function() {
      var elm = compileDirective(onLabelTemplate, $scope);
      expect(elm.text()).toContain('CUSTOM');
    });
  });

  describe('when there is a custom `off-label`', function () {
    it('sets the on label', function() {
      var elm = compileDirective(offLabelTemplate, $scope);
      expect(elm.text()).toContain('CUSTOM');
    });
  });

  describe('when there is a custom `knob-label`', function () {
    it('sets the on label', function() {
      var elm = compileDirective(knobLabelTemplate, $scope);
      expect(elm.text()).toContain('CUSTOM');
    });
  });

  describe('when there are no custom labels', function () {
    it('sets the default on label', function() {
      var elm = compileDirective(baseTemplate, $scope);
      expect(elm.text()).toContain('On');
    });
    it('sets the default off label', function() {
      var elm = compileDirective(baseTemplate, $scope);
      expect(elm.text()).toContain('Off');
    });
    it('sets the default knob label', function() {
      var elm = compileDirective(baseTemplate, $scope);
      expect(elm.text()).toContain('\u00A0');
    });
  });

});
