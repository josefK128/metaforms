// phenotype-service.spec.js
'use strict';

var log = require('../../../app/scripts/services/log-service.js'),
    phenotype = require('../../../app/scripts/services/phenotype-service.js'),
    genotype = require('../mocks/genotype-service-mock.js'),
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
    genotype1 = JSON.stringify({ axiom: [2,4],
             g_rule: '+',
             p_rule: .5,
             genotype:6}),
    genotype2 = JSON.stringify({ axiom: [3,5],
             g_rule: '*',
             p_rule: 2.0,
             genotype:15}),
    expect1 = '{"axiom":[2,4],"g_rule":"+","p_rule":0.5,"genotype":6,"phenotype":3}',   
    expect2 = '{"axiom":[3,5],"g_rule":"*","p_rule":2,"genotype":15,"phenotype":30}';



    log.initialize();
    phenotype.initialize();
    genotype.initialize();


describe ("phenotype-service", () => {
  beforeEach(() => {
  });
  afterEach(() => {
  });

  // existence tests
  it ("G class is imported", () => {
    expect(G).toBeDefined();
  });
  it ("g instance is created", () => {
    expect(g).toBeDefined();
  });
  it ("genotype-mock class is imported", () => {
    expect(genotype).toBeDefined();
  });
  it ("phenotype instance is created", () => {
    expect(phenotype).toBeDefined();
  });
  it ("g.emit is defined", () => {
    expect(g.emit).toBeDefined();
  });
  it ("client is defined", () => {
    expect(client).toBeDefined();
  });
  it ("client.receive is defined", () => {
    expect(client.receive).toBeDefined();
  });
  it ("client.last_result is defined", () => {
    expect(client.last_result).toBeDefined();
  });

  // unit tests
  it ("Phenotype processes genotype1 correctly", () => {
    runs(() => {
      g.emit(genotype1);
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
  it ("Genotype processes genotype2 correctly", () => {
    runs(() => {
      g.emit(genotype2);
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
