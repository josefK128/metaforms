// test-service.ts.js - ts-js mirror for docco


import {Injectable, Inject} from 'ng-forward';


@Injectable()
@Inject('$q', '$timeout')
export class TestService{
  constructor(private $q, private $timeout){}
  
  getValue(){
    return this.$q(resolve => {
      this.$timeout(() => resolve('Async resolved!'), 3000);
    });
  }
}

