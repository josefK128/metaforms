// * member-component.js
// * constructs item template instances in containers within overall
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

angular.module('app').directive('member', ($compile) => {
"use strict";

  return {
    restrict: "E",
    replace: true,
    scope: {
      member: '='
    },
    template: "<li>{{member.name}}</li>",
    link: (scope, element, attrs) => {
      console.log("member link-f");

      var collectionSt = '<collection collection="member.children"></collection>';
      if (angular.isArray(scope.member.children)) {       
        $compile(collectionSt)(scope, (cloned, scope) =>  {
          element.append(cloned); 
        });
      }
    }
  };
});

