// g-service.js 
// client of genotype-service
//
// Genotype connects to Phenotype via p-service socket on channel 'g'
// Producer creates g-service which connects to Genotype on channel 'a'
// Producer passes self-reference in to initialize method of g-service
// Genotype collects g-service subscribers (client sockets) on connection
// Producer sends axiom on g-service client socket on channel 'a' 
// Genotype awaits g-service producer axioms on channel 'a'
// Genotype transforms axiom to genotype and sends to Phenotype on channel 'g'
// Phenotype awaits Genotype genotypes on channel 'g'
// Phenotype transforms genotype to phenotype
// Phenotype sends to subscribers (g-service client sockets) on channel 'p'
// g-service awaits phenotypes on channel 'p'
// g-service sends phenotype to Producer ref via Producer.receive(phenotype)
'use strict';


module.exports = class  G {
  constructor(client, _hostG, _portG) {
    var hostG = _hostG || 'localhost',
        portG = _portG || process.env.PORTG || 8080,
        url = `http://${hostG}:${portG}`;

    this.genotype = require('socket.io-client').connect(url);
    this.genotype.on('p', (msg) => {
      client.receive(msg);
    });
  }

  emit(msg){
    this.genotype.emit('a', msg);
  }
} // class


