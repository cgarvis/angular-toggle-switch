angular.module('toggle-switch', ['ng'])
.provider('toggleSwitchConfig', function() {

  var config, self, setup, $templateCache, $injector;

  self = this;
  config = {};

  setup = function(injector) {
    $injector = injector;
    $templateCache = $injector.get('$templateCache');
    self.setDefaultTemplateUrl();
  };

  self.setDefaultTemplateUrl = function() {

    var defaultTemplateUrl, defaultTemplate;

    defaultTemplateUrl = 'angular-toggle-switch.html';
    defaultTemplate = '<div role="radio" class="switch" ng-class="{ \'disabled\': disabled }">' +
        '<div class="switch-animate" ng-class="{\'switch-off\': !model, \'switch-on\': model}">' +
          '<span class="switch-left" ng-bind="onLabel"></span>' +
          '<span class="knob" ng-bind="knobLabel"></span>' +
          '<span class="switch-right" ng-bind="offLabel"></span>' +
        '</div>' +
      '</div>';

      $templateCache.put(defaultTemplateUrl, defaultTemplate);
      config.templateUrl = defaultTemplateUrl;
  };

  self.getTemplateUrl = function() {
    return config.templateUrl;
  };

  self.setTemplateUrl = function(templateUrl) {
    config.templateUrl = templateUrl;
  };

  this.$get = function($injector) {

    setup($injector);

    return {
      setTemplateUrl: self.setTemplateUrl,
      getTemplateUrl: self.getTemplateUrl
    };
  };
})
.directive('toggleSwitch', function (toggleSwitchConfig) {
  return {
    restrict: 'EA',
    replace: true,
    require:'ngModel',
    scope: {
      disabled: '@',
      onLabel: '@',
      offLabel: '@',
      knobLabel: '@'
    },
    templateUrl: toggleSwitchConfig.getTemplateUrl(),
    link: function(scope, element, attrs, ngModelCtrl){
      if (!attrs.onLabel) { attrs.onLabel = 'On'; }
      if (!attrs.offLabel) { attrs.offLabel = 'Off'; }
      if (!attrs.knobLabel) { attrs.knobLabel = '\u00a0'; }
      if (!attrs.disabled) { attrs.disabled = false; }
      element.on('click', function() {
        scope.$apply(scope.toggle);
      });

      ngModelCtrl.$formatters.push(function(modelValue){
         return modelValue;
      });

      ngModelCtrl.$parsers.push(function(viewValue){
        return viewValue;
      });

      ngModelCtrl.$render = function(){
          scope.model = ngModelCtrl.$viewValue;
      };
      scope.toggle = function toggle() {
        if(!scope.disabled) {
          scope.model = !scope.model;
          ngModelCtrl.$setViewValue(scope.model);
        }
      };
    }
  };
});
