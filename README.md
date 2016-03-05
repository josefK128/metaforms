* __metaforms README__
* [1] clone the repo
* [2] setup (as admin):
```npm install```
* [3] run:
metaforms$>```node index [emit period - default 10000ms]```
<br>exp: metaforms$> ```node index 2000``` runs a producer emit every second
(two producers)
<br>
* [4] can run additional node-webkit producers in
two applications. These can be run simultaneous with the
node-only application ([3]), or the node application
can be run with no 'back-end' producers by using argv[2]=0
<br>metaforms$> ```node index 0```  (services only - recommended to more clearly focus on the webkit applications - [4a] and/or [4b])
* [4a] metaforms/app - this browser application exercises angular2
events, event-handling, and one-way and two-way binding
<br>run: metaforms/app$> ```../node_modules/nw/nwjs/nw .```
* [4b] metaforms/app\_rec\_dir - this browser application exercises 
recursive generative directives which build DOM structures
from two JSON models, the second replacing the first, and
further modifying the DOM element (coloring its background red) 
<br>run: metaforms/app\_rec\_dir$> ```../node_modules/nw/nwjs/nw .```
<br><br>
* [5] NOTE: all three ([3],[4a],[4b]) can be run simultaneously if desired
* [6] NOTE: the node-webkit applications can be run with a node producer in addition to the webkit producer by editing the metaforms/app/package.json and/or metaforms/app\_rec\_dir/package.json and changing the 'main' to 'index\_wk\_and\_node.html instead of index\_wk\_only.html
