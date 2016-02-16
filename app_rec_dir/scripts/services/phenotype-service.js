// phenotype-service.js 
'use strict';

// Observables, Singleton instance, subscribers
var Rx = require('rx'),
    async = require('async'),
    phenotype,
    log,
    subscribers = require('../components/subscribers-component'),
    index = 1,
    t = function(){
      return (new Date().toJSON()).replace(/^.*T/, '').replace(/Z/, '');
    };

  // exercise Rx
  Rx.Observable.just('\nhello Phenotype Rx').subscribe(function(v){
    //console.log(v);
  });


class  Phenotype {
  constructor() {
  }

  initialize(_portP, _hostL, _portL){

    var portP = _portP || process.env.PORTP || 8081,  // default 8081
        hostL = _hostL || process.env.HOSTL || 'localhost',  // default 'localhost'
        portL = _portL || process.env.PORTL || 8082,  // default 8082
        url = `http://${hostL}:${portL}`,
        message;

    // begin listening on port for client connections
    phenotype = require('socket.io').listen(portP),
    console.log(`phenotype-service listening on port ${portP} channel 'g'`);

    // initialize log-proxy
    log = require('socket.io-client').connect(url);

    // connection-handler
    phenotype.on('connection', function (socket) {
      console.log(`client connected to phenotype index = ${index++}`);
  
      // msg-handler for phenotype
      socket.on('g', function(_msg){
        async.series([
          () => {
            var o,
                msg = _msg,
                ts_msg = `<${t()}> phenotype received msg: ${msg}`; 

            // log received msg
            log.emit('log', ts_msg);
            console.log(`phenotype received msg = ${msg}`);

            message = msg;
            o = JSON.parse(msg);      
            o['phenotype'] = o['genotype'] * o.p_rule;      
            msg = JSON.stringify(o);
            console.log(`phenotype transforming genotype to phenotype ${msg}`);
            console.log(`phenotype sending to all producer-subscribers`);
            subscribers.forEach(function(c){
              if(msg === undefined){
                console.log(`!!!!!!!!!!!!!!!!!! msg is undefined!`);
                console.log(`_msg = ${_msg}`);
                console.log(`object o:`);
                console.dir(o);
              }
              c.emit('p', msg);
              ts_msg = `<${t()}> phenotype-to-producer: ${msg}`; 
              log.emit('log', ts_msg);
            });
          }],
          (error) => {
            message = `${message} generated phenotype error = ${error}`;
            log.emit('log', message);
          }
        ); // series
      });
    });
  } // initialize
} // class

// maintenance of Singleton
if(!phenotype){
  phenotype = new Phenotype();  // create Phenotype singleton instance once
}
module.exports = phenotype;     // return Phenotype singleton instance
