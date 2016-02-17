* __metaforms README__
* [1] clone the repo
* [2] setup (as admin):
```npm install```
* [3] run:
mf$>```node index [emit period - default 10000ms]```
<br>exp: mf$> ```node index 2000``` runs a producer emit every second
(two producers)
<br>
* [4] can run additional node-webkit producers in
two applications. These can be run simultaneous with the
node-only application ([3]), or the node application
can be run with no 'back-end' producers by using argv[2]=0
<br>mf$> ```node index 0```  (services only)
* [4a] mf/app - this browser application exercises angular2
events, event-handling, one-way and two-way binding, while
the node portion creates a single 'back-end' producer
<br>run: (4a): mf$> ```./node_modules/nw/nwjs/nw .```
     or: mf/app$> ```../node_modules/nw/nwjs/nw .```
* [4b] mf/app\_rec\_dir - this browser application exercises 
recursive generative directives which build DOM structures
from two JSON models, the second replacing the first, and
further modifying the DOM element (coloring its background red) 
<br>run: mf/app\_rec\_dir$> ```../node_modules/nw/nwjs/nw .```
* [5] all three ([3],[4a],[4b]) can be run simultaneously
