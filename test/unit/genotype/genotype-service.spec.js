// genotype-service.spec.js
'use strict';

var log = require('../../../app/scripts/services/log-service.js'),
    phenotype = require('../mocks/phenotype-service-mock.js'),
    genotype = require('../../../app/scripts/services/genotype-service.js'),
    G = require('../../../app/scripts/services/g-service.js'),
    client = {
      result: 'foo',
      receive: (msg) => {
        this.result = msg;
      },
      last_result: () => {
        return this.result;
      }
    },
    g = new G(client),
    axiom1 = JSON.stringify({ axiom: [2,4],
             g_rule: '+',
             p_rule: .5 }),
    axiom2 = JSON.stringify({ axiom: [3,5],
             g_rule: '*',
             p_rule: 2.0 }),
    expect1 = '{"axiom":[2,4],"g_rule":"+","p_rule":0.5,"genotype":6}',   
    expect2 = '{"axiom":[3,5],"g_rule":"*","p_rule":2,"genotype":15}';


    log.initialize();
    phenotype.initialize();
    genotype.initialize();


describe ("genotype-service", function(){
  beforeEach(function(){
  });
  afterEach(function(){
  });

  // existence tests
  it ("G class is imported", function(){
    expect(G).toBeDefined();
  });
  it ("g instance is created", function(){
    expect(g).toBeDefined();
  });
  it ("genotype class is imported", function(){
    expect(genotype).toBeDefined();
  });
  it ("phenotype-mock instance is created", function(){
    expect(phenotype).toBeDefined();
  });
  it ("g.emit is defined", function(){
    expect(g.emit).toBeDefined();
  });
  it ("client is defined", function(){
    expect(client).toBeDefined();
  });
  it ("client.receive is defined", function(){
    expect(client.receive).toBeDefined();
  });
  it ("client.last_result is defined", function(){
    expect(client.last_result).toBeDefined();
  });

  // unit tests
  it ("Genotype processes axiom1 correctly", function(){
    runs(() => {
      g.emit(axiom1);
    });
    waits(2000);
    runs(() => {
      var s = client.last_result();
      s = s.replace(/\s+/g, ''); // strip white spaces
      console.log(`\nexpect1 = ${expect1}`)
      console.log(`#result = ${s}\n`)
      expect(s).toEqual(expect1);
    });
  });
  it ("Genotype processes axiom2 correctly", function(){
    runs(() => {
      g.emit(axiom2);
    });
    waits(2000);
    runs(() => {
      var s = client.last_result();
      s = s.replace(/\s+/g, ''); // strip white spaces
      console.log(`\nexpect2 = ${expect2}`)
      console.log(`#result = ${s}\n`)
      expect(s).toEqual(expect2);
    });
  });
})
