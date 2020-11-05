const helpers = {};

helpers.validateKeysExist = (keys = [], target) => {
    for (const key of keys) {
        if (!target[key]) {
            throw `Validation error for key: ${key}!`;
        }
    }
}

module.exports = helpers;
