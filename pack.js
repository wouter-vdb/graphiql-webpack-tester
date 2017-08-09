'use strict';

const webpack = require("webpack");

const webpackConfig = require('./webpack.config.js');
const webpackStats = require('./webpack.stats.js');

async function pack() {
  console.log(`Packing ...`);

  // initialize the compiler:
  let compiler;
  try {
    compiler = webpack(webpackConfig);
  }
  catch (error) {
    console.error(`Webpack error: ${error.message} (${error.name})`);
    error.validationErrors.forEach((verr) => console.error(verr));
    return -1;
  }

  // run the compiler:
  const stats = await new Promise((resolve, reject) => {
    compiler.run((error, stats) => {
      if (error) {
        console.error('# Pack failed:');
        console.error(error.stack || error);
        if (error.details) { console.error(error.details); }
        if (error.missing) { console.error(`- missing:\n`, error.missing); }
        reject(error);
      }
      else {
        resolve(stats);
      }
    });
  });

  // Log errors/warnings/stats:
  console.log(stats.toString(webpackStats));
}

pack();
