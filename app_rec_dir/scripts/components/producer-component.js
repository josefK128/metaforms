// producer-component.js 
'use strict';

// Observables, Singleton instance, subscribers
var Rx = require('rx'),
    axiom1 = JSON.stringify({ axiom: [2,4],
             g_rule: '+',
             p_rule: .5 }),
    axiom2 = JSON.stringify({ axiom: [3,5],
             g_rule: '*',
             p_rule: 2.0 }),
    t = () => {
      return (new Date().toJSON()).replace(/^.*T/, '').replace(/Z/, '');
    };

  // exercise Rx
  Rx.Observable.just('\nhello Producer Rx').subscribe(function(v){
    //console.log(v);
  });


module.exports = class Producer {
  constructor(_name, _hostG, _portG, _hostL, _portL) {
    var hostG = _hostG || process.env.HOSTG || 'localhost', // def 'localhost'
        portG = _portG || process.env.PORTG || 8080,  // default 8080
        hostL = _hostL || process.env.HOSTL || 'localhost', // def 'localhost'
        portL = _portL || process.env.PORTL || 8082,  // default 8082
        G = require('../services/g-service.js'), // class for client for Genotype
        Log = require('../services/l-service.js'); // class for client for Log

    this.name = _name;
    this.g = new G(this, hostG, portG);  // instance of g-service 
    this.log = new Log(hostL, portL);  // instance of l-service
    this.result = 'foo';  // for test
  }

  emit(msg){
    console.log(`\n\n%%% ${this.name} sent genotype msg = ${msg}`);
    this.g.emit(msg);
    msg = `<${t()}> %%% ${this.name} sent msg = ${msg}`;
    this.log.emit(msg);
  }

  receive(msg){
    //console.log(`${this.name} received msg = ${msg}`);
    // for test and/or subsequent processing
    this.result = msg;
    // log
    msg = `<${t()}> ${this.name} received msg = ${msg}`;
    this.log.emit(msg);
  }

  // for test and/or subsequent processing
  last_result(){
    return this.result;
  }
}

