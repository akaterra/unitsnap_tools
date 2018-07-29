const util = require('util');
const exec = util.promisify(require('child_process').exec);
const process = require('process');

class ModuleInspector {

  constructor() {
    this.setNodeJsMode();
  }

  async inspectSymbols(module, op, symbols) {
    this._inspector(module, op, symbols).then((res) => {
      console.log(JSON.parse(res.stdout));
    }).catch((err) => {
      console.error(err);
    });
  }

  setNodeJsMode() {
    this._inspector = inspectorNodeJs;

    return this;
  }

  setPython2Mode() {

  }

  setPython3Mode() {

  }

}

function inspectorNodeJs(module, op, symbols) {
  return exec(
    'node ' +
    process.cwd() + '/server/src/inspectors/nodejs.inspector.js ' +
    op + ' ' +
    process.cwd() + '/node_modules/unitsnap.js ' + // unitsnap import dir
    module + ' ' + // module
    '\'' + JSON.stringify(symbols) + '\' ' + // symbols
    '',
    {
      cwd: process.cwd() + '/server/spec/test',
    }
  );
}

module.exports = {
  ModuleInspector,
};

const t = new ModuleInspector().inspectSymbols('clazz', 'describe', ['A', 'B']);
