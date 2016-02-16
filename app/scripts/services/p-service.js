// p-service.js 
// client of phenotype-service
'use strict';


module.exports = class  P {
  constructor(_hostP, _portP) {
    var hostP = _hostP || 'localhost',
        portP = _portP || process.env.PORTP || 8081,
        url = `http://${hostP}:${portP}`;

    console.log(`p-service connecting to url = ${url}`);
    this.phenotype = require('socket.io-client').connect(url);
  }

  emit(msg){
    this.phenotype.emit('g', msg);
  }
} // class


