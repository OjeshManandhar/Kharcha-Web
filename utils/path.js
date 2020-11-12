const p = require('path');

const root = p.dirname(process.mainModule.filename);

module.exports.path = (...args) => p.join(root, ...args);
module.exports.renderPath = (...args) => p.join(...args);
