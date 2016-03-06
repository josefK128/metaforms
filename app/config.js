System.config({
  //defaultJSExtensions: true,  // will be deprecated - use explicit (exp .ts)
  transpiler: 'typescript',
  typescriptOptions: {
    emitDecoratorMetadata: true,
    experimentalDecorators: true
  },
  map: {
    'ng-forward': 'https://gist.githubusercontent.com/timkindberg/d93ab6e17fc07b4db7e9/raw/b311a63e0e96078774e69f26d8e8805b7c8b0dd2/ng-forward.0.0.1-alpha.10.js',
    //'typescript': 'https://raw.githubusercontent.com/Microsoft/TypeScript/master/lib/typescript.js'
    // 'ng-forward': '../../../node_modules/ng-forward/ng-forward.dist.js',
    // node_modules contains ng-forward.0.0.1.alpha11 - fails!
    'typescript': '../node_modules/typescript/lib/typescript.js',
    'mutation-summary': '../node_modules/mutation-summary/src/mutation-summary.js'
  },
  paths: {
    narrative: 'scripts_ts/components/narrative.ts'  
  }
});

