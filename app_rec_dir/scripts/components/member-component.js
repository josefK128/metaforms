"use strict";
angular.module('app').directive('member', function($compile) {
  "use strict";
  return {
    restrict: "E",
    replace: true,
    scope: {member: '='},
    template: "<li>{{member.name}}</li>",
    link: function(scope, element, attrs) {
      console.log("member link-f");
      var collectionSt = '<collection collection="member.children"></collection>';
      if (angular.isArray(scope.member.children)) {
        $compile(collectionSt)(scope, function(cloned, scope) {
          element.append(cloned);
        });
      }
    }
  };
});

//# sourceMappingURL=member-component.js.map
