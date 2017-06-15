let { transformFileSync } = require('babel-core');
let { outputFileSync } = require('fs-extra');

let babelOpts = {
  babelrc: false,
  presets: [
    ['env', {
      targets: { browser: [`last 6 versions`] },
      modules: false,
      loose: true,
    }]
  ]
};

let doBabel = filePath => transformFileSync(filePath, babelOpts);

outputFileSync(
  './index.js',
  doBabel('./index.jsx').code
);
