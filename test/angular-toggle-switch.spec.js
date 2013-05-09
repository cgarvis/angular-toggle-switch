describe('Toggle Switch', function() {
  var $scope, elm;

  var template = '<toggle-switch model="switchState">\n</toggle-switch>';

  // Load up just our module
  beforeEach(module('toggle-switch'));

  beforeEach(inject(function($rootScope, $compile) {
    // Get an isolated scope
    $scope = $rootScope.$new();

    // Compile Directive
    elm = angular.element(template);
    $compile(elm)($scope);
    $scope.$digest();
  }));

  it('sets model to false by default', function() {
    expect($scope.switchState).toEqual(false);
  });

  describe('when state is false', function() {
    it('changes model to true when clicked', function() {
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
      elm.triggerHandler('click');
      expect($scope.switchState).toEqual(false);
    });
  });
});
