// narrative.ts - root component

import {Component, Injectable, Inject, EventEmitter, bootstrap} from 'ng-forward';
import MutationSummary from 'mutation-summary';
import {TestService} from '../services/test-service.ts';
import {Child} from './child-component.ts';
import {Nested} from './nested-component.ts';


@Component({
  selector: 'narrative',
  providers: ["ui.router"], 
  directives: [Child, Nested],
  template: `
      <h1>Narrative</h1>
      <nested></nested>
      <p>Trigger count: {{ narrative.triggers }}</p>

      <h4>One Way Binding to Child:</h4>
      <input ng-model="narrative.message1"/>

      <h4>Two Way Binding to/from Child:</h4>
      <input ng-model="narrative.message2"/>

      <hr/>
      <child (event1)="narrative.onIncrement()" (event2)="narrative.onIncrement()"
                   [message1]="narrative.message1" [(message2)]="narrative.message2" message3="child message3">
      </child>
    `
})

class Narrative{
  constructor(){
    this.triggers = 0;
    this.message1 = '1-way => no remote change';
    this.message2 = '2-way => remote change';
    this.observer = new MutationSummary({
      queries: [{attribute: 'collection'}, {attribute: 'style'}], 
      rootNode: document.getElementById('body'),
      callback : (summaries) => {
        var dcollection = summaries[0],
            dstyle = summaries[1],
            o;

        // delta-collection
        for(let node of dcollection.valueChanged){
          console.log(`collection changed`);
          o = node.getAttribute("collection");
          console.log(`*** node.collection is:`);
          console.dir(o);
        }//dcollection.valueChanged()

        // delta-style
        for(let node of dstyle.valueChanged){
          console.log(`style changed`);
          console.log(`*** node.style.background = ${node.style.background}`);
        }//dstyle.valueChanged
      }//callback
    });//MutationSummary
  }

  onIncrement(){
    this.triggers++;
  }
}

bootstrap(Narrative);

