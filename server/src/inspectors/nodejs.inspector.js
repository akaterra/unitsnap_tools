const unitsnap = require(process.argv[3] + '/src/instance.js');

let output;

try {
  switch (process.argv[2]) {
    case 'describe':
      const mdl = require(process.cwd() + '/' + process.argv[4]);

      output = JSON.parse(process.argv[5]).reduce((acc, sym) => {
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
