// * index.js 
// * run: ```$ node index [producer emit period (ms > 0) - default 10secs.]```
// * run: ```$ node index 0 => services only - no producers```
"use strict";


// socket.io websocket channels on default ports 8080, 8081, 8082<br>
var Phenotype = require('./app/scripts/services/phenotype-service'),
    Genotype = require('./app/scripts/services/genotype-service'),
    Log = require('./app/scripts/services/log-service'),
    run_producers = false,
    Producer,
    producer1,
    producer2,
    msg;

const portG = process.env.PORTG || 8080,
      hostP = process.env.HOSTP || 'localhost',
      portP = process.env.PORTP || 8081,
      hostL = process.env.HOSTL || 'localhost',
      portL = process.env.PORTL || 8082,
      PERIOD = process.argv[2] || 10000,
      HALF_PERIOD = Math.floor(PERIOD/2),
      axiom1 = JSON.stringify({ axiom: [2,4],
             g_rule: '+',
             p_rule: .5 }),
      axiom2 = JSON.stringify({ axiom: [3,5],
             g_rule: '*',
             p_rule: 2.0 });


  // $node index <=0   =>   run services ONLY!
  if(PERIOD > 0){
    run_producers = true;
  }
  console.log(`PERIOD = ${PERIOD} so run_producers = ${run_producers}`);

  // initialize services
  Genotype.initialize(portG, hostP, portP, hostL, portL);
  Phenotype.initialize(portP, hostL, portL);
  Log.initialize(portL);

  // * conditional based on argv[3]
  // * argv[2] = 0 => do not generate producers, i.e. run services only
  // * This is useful for e2e-test, node-webkit isolated runs, 
  //   and for future use-case as back-end services for web application
  // * NOTE: argv[2] > 0 is the producer emit period-ms (10000ms default)
  // * exp: mf$> ```node index 2000`` runs two producers each emitting
  //   an axiom every two seconds, so aggregate one axiom/sec. rate
  if(run_producers){
    // initialize producers
    Producer = require('./app/scripts/components/producer-component');
    producer1 = new Producer('producer1'); // port defaults
    producer2 = new Producer('producer2'); // port defaults
  
    // cycle - producer1
    setInterval(() => {
      producer1.emit(axiom1);
    }, PERIOD);
  
    // cycle - producer2
    setTimeout(() => {
      setInterval(() => {
        producer2.emit(axiom2);
      }, PERIOD);
    }, HALF_PERIOD);
  }



