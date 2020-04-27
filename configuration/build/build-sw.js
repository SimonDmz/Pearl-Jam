const envsub = require('envsub');

const conf = require(`../${process.env.NODE_ENV}/configuration.json`);

const templateFile = `src/service-worker-custom.js`;
const outputFile = `build/service-worker-custom.js`;
const options = {
  all: false, // see --all flag
  diff: false, // see --diff flag
  envs: [{ name: 'QUEEN_URL', value: conf.urlQueen }],
  protect: false, // see --protect flag
  syntax: 'default', // see --syntax flag
  system: true, // see --system flag
};

// create (or overwrite) the output file
envsub({ templateFile, outputFile, options })
  .then(envobj => {
    console.log(envobj.templateFile);
    console.log(envobj.outputFile);
  })
  .catch(err => {
    console.error(err.message);
  });
