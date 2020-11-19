const p = require('path');

const root = p.dirname(process.mainModule.filename);

module.exports.path = (...args) => p.join(...args);
module.exports.pathFromRoot = (...args) => p.join(root, ...args);
