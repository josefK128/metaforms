// * models-service.js
// * manages and delivers models by name to clent components.
// 
// * @dependencies: none<br>
//   @ngInject
// 
// * NOTE: ngInject is used by ngAnnotate to generate a 
//   minification-safe injection annotation such as: 
//   ```function($scope) => ['$scope', function($scope){}]```
// 

angular.module('app').factory('Models', function(){
  "use strict";

  console.log('Models service initializing');

  var models;
  var model = {
    'europe' : [
      {name: 'Europe',
        children: [
          {name: 'Italy',
            children: [
              {name: 'Rome'},
              {name: 'Milan'}
            ]
          }, 
          {name: 'Spain', 
            children: [
              {name: 'Barcelona',
                children: [
                  {name: 'aba'},
                  {name: 'aca',
                    children: [
                      {name: 'xfgtyu'}
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }, 
      {name: 'South America',
        children: [
          {name: 'Brasil'},
          {name: 'Peru'}
        ]
      }
    ],
 
    'namerica': [
      {name: 'NAmerica',
        children: [
          {name: 'Idaho',
            children: [
              {name: 'Hope'},
              {name: 'Post Falls'}
            ]
          }
        ]
      }
    ]
  };

  class Models {
    constructor(){}

    // action is string-msg or action-object
    model(name){
      return model[name] || [];
    }
  }

  // return factory object <br>
  // (redundant) maintenance of Singleton
  if(!models){
    models = Object.seal(new Models()); 
  }
  return models;         // return Models singleton instance
});
