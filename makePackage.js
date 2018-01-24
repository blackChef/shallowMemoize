let { transformFileSync } = require('babel-core');
let { outputFileSync, readdirSync } = require('fs-extra');
let { resolve } = require('path');

let babelOpts = {
  babelrc: false,
  presets: [
    ['env', {
      targets: { browser: [`last 6 versions`] },
    }]
  ]
};

let doBabel = filePath => transformFileSync(filePath, babelOpts).code;

readdirSync('./src').forEach(function(item) {
  outputFileSync(
    resolve('./dist', item.replace('.jsx', '.js')),
    doBabel(resolve('./src', item))
  );
});
