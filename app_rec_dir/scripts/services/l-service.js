// l-service.js 
// client of log-service
'use strict';


module.exports = class  L {
  constructor(_hostL, _portL) {
    var hostL = _hostL || 'localhost',
        portL = _portL || process.env.PORTL || 8082;

        this.log = require('socket.io-client').connect('http://' + hostL + ':' + portL);
  }

  emit(msg){
    this.log.emit('log', msg);
  }
} // class


