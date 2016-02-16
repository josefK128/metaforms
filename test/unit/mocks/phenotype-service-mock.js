// phenotype-service-mock.js 
'use strict';

// Observables, Singleton instance, subscribers
var Rx = require('rx'),
    async = require('async'),
    phenotype,
    log,
    subscribers = require('../../../app/scripts/components/subscribers-component'),
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
    console.log(`phenotype-service-mock listening on port ${portP} channel 'g'`);

    // initialize log-proxy
    log = require('socket.io-client').connect(url);

    // connection-handler
    phenotype.on('connection', function (socket) {
      console.log(`client connected to phenotype index = ${index++}`);
  
      // msg-handler for phenotype - mock is pass-through
      socket.on('g', function(msg){
        console.log(`phenotype passing through genotype to all subscribers`);
        subscribers.forEach(function(c){
          c.emit('p', msg);
        });
      });
    });
  } // initialize
} // class

// maintenance of Singleton
if(!phenotype){
  phenotype = new Phenotype();  // create Phenotype singleton instance once
}
module.exports = phenotype;     // return Phenotype singleton instance
