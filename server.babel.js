// All subsequent files required by node with the extensions .es6, .es, .jsx and .js will be transformed by Babel.
require('babel-register');
// Pollyfill for features like generators https://babeljs.io/docs/usage/polyfill.
require('babel-polyfill');

require('./server');