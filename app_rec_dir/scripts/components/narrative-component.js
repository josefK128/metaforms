"use strict";
angular.module('app').controller('narrative', function($scope, $timeout, Models) {
  "use strict";
  console.log("Narrative controller starting");
  var m,
      p;
  $scope.tasks = Models.model('europe');
  console.log("narrative: scope properties:");
  for (p in $scope) {
    if ($scope.hasOwnProperty(p)) {
      console.log(("scope has property " + p));
    }
  }
  $scope.$watch('tasks', function(val, pval) {
    console.log("*** narrative: scope.tasks change!");
    if (val !== pval) {
      console.log("*** narrative: node.collection is:");
      console.dir(val);
    }
  });
  m = JSON.stringify(Models.model('namerica'));
  $timeout(function() {
    document.getElementById("narrative").style.background = "red";
    $timeout(function() {
      document.getElementById("model").setAttribute("collection", m);
      $scope.tasks = JSON.parse(m);
    }, 1000);
  }, 10000);
});

//# sourceMappingURL=narrative-component.js.map
