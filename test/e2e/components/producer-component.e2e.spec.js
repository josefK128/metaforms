// producer-component.spec.js
'use strict';

var Producer = require('../../../app/scripts/components/producer-component.js'),
    producer,
    axiom1 = JSON.stringify({ axiom: [2,4],
             g_rule: '+',
             p_rule: .5 }),
    axiom2 = JSON.stringify({ axiom: [3,5],
             g_rule: '*',
             p_rule: 2.0 }),
    expect1 = '{"axiom":[2,4],"g_rule":"+","p_rule":0.5,"genotype":6,"phenotype":3}',   
    expect2 = '{"axiom":[3,5],"g_rule":"*","p_rule":2,"genotype":15,"phenotype":30}';


describe ("producer-component", function(){
  beforeEach(function(){
    producer = new Producer('test');
  });
  afterEach(function(){
    producer = undefined;
  });

  // existence tests
  it ("Producer class is imported", function(){
    expect(Producer).toBeDefined();
  });
  it ("producer instance is created", function(){
    expect(producer).toBeDefined();
  });
  it ("Producer name is 'test'", function(){
    expect(producer.name).toBe("test");
  });
  it ("Producer creates genotype-service", function(){
    expect(producer.g).toBeDefined();
  });
  it ("Producer creates log-service", function(){
    expect(producer.log).toBeDefined();
  });

  // e2e tests
  it ("Producer processes axiom1 correctly", function(){
    runs(() => {
      producer.emit(axiom1);
    });
    waits(1000);
    runs(() => {
      var s = producer.last_result();
      s = s.replace(/\s+/g, ''); // strip white spaces
      console.log(`expect1 = ${expect1}`)
      console.log(`producer.emit(axiom1) returns ${s}`)
      expect(s).toEqual(expect1);
    });
  });
  it ("Producer processes axiom2 correctly", function(){
    runs(() => {
      producer.emit(axiom2);
    });
    waits(1000);
    runs(() => {
      var s = producer.last_result();
      s = s.replace(/\s+/g, '');   // strip white spaces
      console.log(`expect2 = ${expect2}`)
      console.log(`producer.emit(axiom1) returns ${s}`)
      expect(s).toEqual(expect2);
    });
  });
})
