* __mf README__


* [1] clone the repo

* [2] setup (as admin):
```npm install```

* [3] run
mf$>```node index [emit period - default 10000ms]```
<br>exp: 
mf$> ```node index 2000``` runs a producer emit every second


* [4] can run additional node-webkit producers in
two applications. These can be run simultaneous with the
node-only application ([3]), or the node application
can be run with no 'back-end' producers by using argv[2]=0
<br>exp: 
mf$> ```node index 0```  (services only)

* [4a] mf/app - this browser application exercises angular2
events, event-handling, one-way and two-way binding, while
the node portion creates a single 'back-end' producer
<br>run:
mf$> ```nw .```
<br>or
<br>mf/app$> ```nw .```


* [4b] mf/app-rec-dir - this browser application exercises 
recursive generative directives which build DOM structures
from two JSON models, the second replacing the first, and
further modifying the DOM - exp. color red 
<br>run:
mf/app-rec-dir$> ```nw .```

* [5] all three ([3],[4a],[4b]) can be run simultaneously
