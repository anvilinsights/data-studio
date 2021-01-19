/* eslint-disable @typescript-eslint/no-var-requires */
const child_process = require('child_process');
const exec = child_process.execSync;

const deployDev = async () => {
  const dev_deployment_id = process.env.npm_package_dsccConnector_dev;

  if (dev_deployment_id === undefined) {
    throw new Error(
      'Deployment ID missing from package.json file OR build.js was not run using yarn or npm.'
    );
  }

  const buffer = exec(
    `npx @google/clasp deploy --deploymentId ${dev_deployment_id} --description Development`
  );
  const out = buffer.toString('utf8');

  console.log(out);
};

const main = async () => {
  const command = process.argv[2];

  if (command === 'deploy_dev') {
    await deployDev();
  }
};

main();
