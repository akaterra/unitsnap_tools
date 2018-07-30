const fs = require('fs');
const moduleInspector = require('./module_inspector');

class App {

  constructor() {
    this._moduleInspector = new moduleInspector.ModuleInspector();
    this._symbols = {};
  }

  setName(name) {
    this._name = name;

    return this;
  }

  async describe(module, symbols) {
    Object.assign(this._symbols, (await this._moduleInspector.inspectSymbols(module, 'describe', symbols)).describe);

    return this;
  }

  save() {
    fs.writeFileSync(
      `${this._name}.app.json`,
      JSON.stringify(
        {
          symbols: this._symbols,
        },
        void 0,
        4
      )
    );
  }

}

class AppSymbol {

}

module.exports = {
  App,
};

(async () => {
  const app = new App().setName('test');

  await app.describe('clazz', []);

  app.save();
})();
