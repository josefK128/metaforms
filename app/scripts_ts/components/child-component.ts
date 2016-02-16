// child-component.ts


import {Component, Inject, EventEmitter} from 'ng-forward';
import {Nested} from './nested-component.ts';
import {TestService} from '../services/test-service.ts';


@Component({
    selector: 'child',
    directives: [Nested],
    inputs: ['message1', 'message2', 'msg3:message3'],
    outputs: ['event1', 'event2'],
    template: `
        <h2>Child</h2>
        <p>ES7 async resolved value: {{ child.num || 'resolving...' }}</p>
        <nested></nested>

        <h4>Event</h4>
        <button (click)="child.triggerEventNormally()">
            Trigger DOM Event
        </button>
        <button (click)="child.triggerEventViaEventEmitter()">
            Trigger Emitted Event
        </button>

        <h4>One Way String from Parent (read-only)</h4>
        <p>{{child.msg3}}</p>

        <h4>One Way Binding from Parent (read-only)</h4>
        <input ng-model="child.message1"/>

        <h4>Two Way Binding to/from Parent (read/write)</h4>
        <input ng-model="child.message2"/>
    `
})
@Inject(TestService, '$element')
export class Child{
    public event2 = new EventEmitter();
  
    constructor(public TestService, public $element){
        this.resolveValue();
    }

    resolveValue(){
        this.TestService.getValue().then(val => this.num = val);
    }

    triggerEventNormally() {
        this.$element.triggerHandler('event1');
    }

    triggerEventViaEventEmitter() {
        this.event2.next()
    }
}

