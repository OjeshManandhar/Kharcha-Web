const path = require('path');

const root = path.dirname(process.mainModule.filename);

module.exports = (...args) => path.join(root, ...args);
