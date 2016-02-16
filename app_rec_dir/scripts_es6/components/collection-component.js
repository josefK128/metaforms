// * collection-component.js
// * constructs container template instances in overall
//   recursive action of rendering the model passed to its DOM parent
//   by narrative
//
// * @dependencies: $scope <br>
//   @param {ng-core} $scope <br>
//   @ngInject
// 
// * NOTE: ngInject is used by ngAnnotate to generate a 
//   minification-safe injection annotation such as: 
//   ```function($scope) => ['$scope', function($scope){}]```
// 

angular.module('app').directive('collection', ($compile) => {
"use strict";

  return {
    restrict: "E",
    replace: true,
    scope: {
      collection: '='
    },
    template: "<ul><member ng-repeat='member in collection' member='member'></member></ul>",
    link: (scope, element, attrs) => {
      console.log("collection link-f");
    }
  };
});

