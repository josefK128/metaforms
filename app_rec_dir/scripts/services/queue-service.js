// * queue-service.js
// * manages a fifo-queue of messages  
"use strict";


module.exports = class Queue {
  constructor(){
    this.fifo = [];  
  }


  push(s){
    this.fifo.push(s);
  }

  pop(){
    return (this.fifo.length > 0 ? this.fifo.shift() : undefined);
  }

  peek(){
    return (this.fifo.length > 0 ? this.fifo[0] : undefined);
  }
}


