const ProviderHelper = require('./PactHelpers');

let provider;

const startup = async (serviceName) => {
    console.log(`Starting something for ${serviceName}`);
    
    provider = new ProviderHelper(serviceName);

    console.log(`Created provider on port ${provider.port}`)

    return provider.setup();
}

const stub = async (method = 'GET', path,statusCode = 200, body = {}) => {
    const someInteraction = {
        state: `some state`,
        uponReceiving: 'upon receiving',
        withRequest: { method, path },
        willRespondWith: {
            status: statusCode,
            headers: { 'Content-Type': 'application/json; charset=UTF-8' },
            body
        }
    };

    return provider.addInteraction(someInteraction);
}

const addInteraction = async (interaction) => {
    return provider.addInteraction(interaction);
}

module.exports = {
    startup,
    addInteraction,
    stub
}