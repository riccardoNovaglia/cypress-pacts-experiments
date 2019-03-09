const path = require('path');
const { Pact } = require('@pact-foundation/pact');
const request = require('request-promise');

class ProviderHelper {

  constructor(providerName) {
    const LOG_LEVEL = process.env.LOG_LEVEL || 'WARN';
    this.port = ProviderHelper.randomPort();

    this.pactProvider = new Pact({
      port: this.port,
      dir: path.resolve(process.cwd(), 'pacts'),
      spec: 2,
      consumer: 'test',
      provider: providerName,
      cors: true,
      logLevel: LOG_LEVEL
    });
  }

  static randomPort() {
    return Math.floor(Math.random() * (20000 - 10000) + 10000);
  }

  addInteraction(interaction) {
    return this.pactProvider.addInteraction(interaction);
  }

  addInteractions(...interactions) {
    return Promise.all(interactions.map(interaction => this.pactProvider.addInteraction(interaction)));
  }

  verify() {
    return this.pactProvider.verify();
  }

  setup() {
    return this.pactProvider.setup();
  }

  async finalize() {
    try {
      await this.pactProvider.finalize();
      this.pactProvider.server.stop();
    } catch (e) {
      console.log(e);
      this.pactProvider.server.stop();
    }
  }

  getUri(path) {
    return `http://localhost:${this.port}${path}`;
  }
}

module.exports = ProviderHelper;
