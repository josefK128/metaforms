"use strict";
angular.module('app', []).run(["$timeout", function($timeout) {
  console.log("app running!");
  var observer = new MutationSummary({
    queries: [{attribute: 'collection'}, {attribute: 'style'}],
    rootNode: document.getElementById('body'),
    callback: function(summaries) {
      var dcollection = summaries[0],
          dstyle = summaries[1];
      var $__5 = true;
      var $__6 = false;
      var $__7 = undefined;
      try {
        for (var $__3 = void 0,
            $__2 = (dcollection.valueChanged)[Symbol.iterator](); !($__5 = ($__3 = $__2.next()).done); $__5 = true) {
          var node = $__3.value;
          {
            var o = void 0;
            console.log("collection changed");
            o = node.getAttribute("collection");
            console.log("*** node.collection is:");
            console.dir(o);
          }
        }
      } catch ($__8) {
        $__6 = true;
        $__7 = $__8;
      } finally {
        try {
          if (!$__5 && $__2.return != null) {
            $__2.return();
          }
        } finally {
          if ($__6) {
            throw $__7;
          }
        }
      }
      var $__12 = true;
      var $__13 = false;
      var $__14 = undefined;
      try {
        for (var $__10 = void 0,
            $__9 = (dstyle.valueChanged)[Symbol.iterator](); !($__12 = ($__10 = $__9.next()).done); $__12 = true) {
          var node$__16 = $__10.value;
          {
            console.log("style changed");
            console.log(("*** node.style.background = " + node$__16.style.background));
          }
        }
      } catch ($__15) {
        $__13 = true;
        $__14 = $__15;
      } finally {
        try {
          if (!$__12 && $__9.return != null) {
            $__9.return();
          }
        } finally {
          if ($__13) {
            throw $__14;
          }
        }
      }
    }
  });
}]);

//# sourceMappingURL=app.js.map

"use strict";
angular.module('app').directive('collection', ["$compile", function($compile) {
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
}]);

//# sourceMappingURL=collection-component.js.map

"use strict";
angular.module('app').directive('member', ["$compile", function($compile) {
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
}]);

//# sourceMappingURL=member-component.js.map

"use strict";
angular.module('app').controller('narrative', ["$scope", "$timeout", "Models", function($scope, $timeout, Models) {
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
}]);

//# sourceMappingURL=narrative-component.js.map

"use strict";
angular.module('app').factory('Log', ["config", function(config) {
  "use strict";
  console.log('Log service initializing');
  var log,
      mediator;
  var Log = function() {
    function Log() {}
    return ($traceurRuntime.createClass)(Log, {
      log: function(action) {
        if (config.log) {
          mediator.emit('log', action);
        }
      },
      set_mediator: function(o) {
        mediator = o;
      }
    }, {});
  }();
  if (!log) {
    log = new Log();
  }
  return log;
}]);

//# sourceMappingURL=log-service.js.map

"use strict";
angular.module('app').factory('Models', function() {
  "use strict";
  console.log('Models service initializing');
  var models;
  var model = {
    'europe': [{
      name: 'Europe',
      children: [{
        name: 'Italy',
        children: [{name: 'Rome'}, {name: 'Milan'}]
      }, {
        name: 'Spain',
        children: [{
          name: 'Barcelona',
          children: [{name: 'aba'}, {
            name: 'aca',
            children: [{name: 'xfgtyu'}]
          }]
        }]
      }]
    }, {
      name: 'South America',
      children: [{name: 'Brasil'}, {name: 'Peru'}]
    }],
    'namerica': [{
      name: 'NAmerica',
      children: [{
        name: 'Idaho',
        children: [{name: 'Hope'}, {name: 'Post Falls'}]
      }]
    }]
  };
  var Models = function() {
    function Models() {}
    return ($traceurRuntime.createClass)(Models, {model: function(name) {
        return model[name] || [];
      }}, {});
  }();
  if (!models) {
    models = Object.seal(new Models());
  }
  return models;
});

//# sourceMappingURL=models-service.js.map
