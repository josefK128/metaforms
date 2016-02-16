"use strict";
angular.module('app').directive('collection', function($compile) {
  "use strict";
  return {
    restrict: "E",
    replace: true,
    scope: {collection: '='},
    template: "<ul><member ng-repeat='member in collection' member='member'></member></ul>",
    link: function(scope, element, attrs) {
      console.log("collection link-f");
    }
  };
});

//# sourceMappingURL=collection-component.js.map
