const util = require('util');
const exec = util.promisify(require('child_process').exec);
const process = require('process');

class ModuleInspector {

  constructor() {
    this.setNodeJsMode();
  }

  async inspectSymbols(module, op, symbols) {
    return await this._inspector(module, op, symbols);
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
    process.cwd() + '/api/src/inspectors/nodejs.inspector.js ' +
    op + ' ' +
    process.cwd() + '/node_modules/unitsnap.js ' + // unitsnap import dir
    module + ' ' + // module
    '\'' + JSON.stringify(symbols) + '\' ' + // symbols
    '',
    {
      cwd: process.cwd() + '/api/spec/test',
    }
  ).then((std) => JSON.parse(std.stdout));
}

module.exports = {
  ModuleInspector,
};
