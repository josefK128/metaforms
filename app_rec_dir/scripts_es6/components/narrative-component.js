// * narrative-controller.js
// * sets model for collection element which initiates
// * the recursive actions of collection-component and member-component
//
// * @dependencies: $scope, $timeout, Models <br>
//   @param {ng-core} $scope <br>
//   @param {ng-core} $timeout <br>
//   @param {services} Models <br>
//   @ngInject
// 
// * NOTE: ngInject is used by ngAnnotate to generate a 
//   minification-safe injection annotation such as: 
//   ```function($scope) => ['$scope', function($scope){}]```
// 

angular.module('app').controller('narrative', ($scope, $timeout, Models) => {
"use strict";

  console.log("Narrative controller starting");

  var m,
      p;
  
  // initial set of model for recursive list build
  $scope.tasks = Models.model('europe'); 

  console.log("narrative: scope properties:");
  for(p in $scope){
    if($scope.hasOwnProperty(p)){
      console.log(`scope has property ${p}`);
    }
  }

  $scope.$watch('tasks', (val, pval) => {
    console.log("*** narrative: scope.tasks change!");
    if(val !== pval){    
      console.log(`*** narrative: node.collection is:`);
      console.dir(val);
    }
  });

  // test
  m = JSON.stringify(Models.model('namerica'));
  $timeout(() => {
    document.getElementById("narrative").style.background = "red";
    $timeout(() => {
      document.getElementById("model").setAttribute("collection", m);
      $scope.tasks = JSON.parse(m);
    }, 1000);
  }, 10000);

});

