const unitsnap = require(process.argv[3] + '/src/instance.js');

let output;

try {
  let optCommand = process.argv[2];
  let optSymbols = JSON.parse(process.argv[5]);

  switch (optCommand) {
    case 'describe':
      output = {};

      const mdl = require(process.cwd() + '/' + process.argv[4]);

      if (! optSymbols || optSymbols.length === 0) {
        optSymbols = Object.keys(mdl);
      }

      output[optCommand] = optSymbols.reduce((acc, sym) => {
        acc[sym] = unitsnap.copyScopeDescriptors(mdl[sym]);

        return acc;
      }, {});

      break;

    default:
      throw new Error('Unknown commend: ' + process.argv[2]);
  }
} catch (e) {
  output = {
    error: e,
  }
}

console.log(JSON.stringify(output));
