// genotype-service.js 
'use strict';

// Observables, Singleton instance, subscribers
var Rx = require('rx'),
    async = require('async'),
    genotype,
    log,
    subscribers = require('../components/subscribers-component.js'),
    index = 1,
    t = () => {
      return (new Date().toJSON()).replace(/^.*T/, '').replace(/Z/, '');
    };

  // exercise Rx
  Rx.Observable.just('\nhello Genotype Rx').subscribe((v) => {
    //console.log(v);
  });


class  Genotype {
  constructor() {
  }


  initialize(_portG, _hostP, _portP, _hostL, _portL) {
    var portG = _portG || process.env.PORTG || 8080,  // default 8080
        hostP = _hostP || process.env.HOSTP || 'localhost', // def 'localhost'
        portP = _portP || process.env.PORTP || 8081,  // default 8081
        hostL = _hostL || process.env.HOSTL || 'localhost', // def 'localhost'
        portL = _portL || process.env.PORTL || 8082,  // default 8082
        url = `http://${hostL}:${portL}`,
        P = require('./p-service.js'), // class for client for Phenotype
        p = new P(hostP, portP),  // instance of p-service 
        message;

    // begin listening on port for client connections
    genotype = require('socket.io').listen(portG);
    console.log(`genotype-service listening on port ${portG} channel 'a'`);

    // initialize log-proxy
    log = require('socket.io-client').connect(url);

    // connection-handler
    genotype.on('connection', (socket) => {
      console.log(`subscriber connected to genotype index = ${index++}`);
      subscribers.push(socket);
    
      // msg-handler for genotype
      socket.on("a", (_msg) => {
        async.series([
          () => {
            var o,
                msg = _msg,
                ts_msg = `<${t()}> genotype received msg: ${msg}`; 

            // log received msg
            log.emit('log', ts_msg);
            console.log(`genotype received msg = ${msg}`);

            message = msg;
            o = JSON.parse(msg);                
            switch(o.g_rule) {
              case '+':
                o['genotype'] = o.axiom[0] + o.axiom[1];
                break;
              case '*':
                o['genotype'] = o.axiom[0] * o.axiom[1];
                break;
              default:
                o['genotype'] = 0;
                console.log(`unrecognized g_rule ${o.g_rule}`);
            }
      
            msg = JSON.stringify(o);
            console.log(`genotype transforming axiom to genotype ${msg}`);
            p.emit(msg);
            msg = `<${t()}> genotype-to-phenotype: ${msg}`; 
            log.emit('log', msg);
          }],
          (error) => {
            message = `${message} generated genotype error = ${error}`;
            log.emit('log', message);
          }
        ); // series
      });
    });
  } // initialize
} // class

// maintenance of Singleton
if(!genotype){
  genotype = new Genotype();  // create Genotype singleton instance once
}
module.exports = genotype;     // return Genotype singleton instance
