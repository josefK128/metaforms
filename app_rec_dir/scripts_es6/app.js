"use strict";

angular.module('app', [])
.run(function($timeout){
  console.log(`app running!`);

   
  var observer = new MutationSummary({
      queries: [{attribute: 'collection'}, {attribute: 'style'}], 
      rootNode: document.getElementById('body'),
      callback : (summaries) => {
        var dcollection = summaries[0],
            dstyle = summaries[1];

        // delta-collection
        for(let node of dcollection.valueChanged){
          var o;
          console.log(`collection changed`);
          o = node.getAttribute("collection");
          console.log(`*** node.collection is:`);
          console.dir(o);
        }//dcollection.valueChanged()

        // delta-style
        for(let node of dstyle.valueChanged){
          console.log(`style changed`);
          console.log(`*** node.style.background = ${node.style.background}`);
        }//dstyle.valueChanged
      }//callback
  });//MutationSummary
});

