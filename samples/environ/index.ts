import {
  spawnSandboxFromConfig, createConfigFromPolicy,
  getAvailableToolsPolicy, getTemporaryFilesPolicy,
  getPlatformSupport,
} from '@microsoft/mxc-sdk';

import os from 'node:os';

if (!getPlatformSupport().isSupported) {
  throw new Error('MXC not available on this host');
}

const tools = getAvailableToolsPolicy(process.env);
const temp  = getTemporaryFilesPolicy();

const userHome = os.homedir();

const config = createConfigFromPolicy({
  version: '0.7.0-alpha',
  filesystem: {
    readonlyPaths: [userHome],
    readwritePaths: [userHome],
  },
  network: { allowOutbound: false },
  timeoutMs: 30_000,
});
config.process!.env = ["MY_VAR=hello world"];
config.process!.commandLine = `date;env;echo \"\";echo $MY_VAR;date`;

const child = spawnSandboxFromConfig(config, { usePty: false });
child.stdout!.on('data', (d) => process.stdout.write(d));
child.on('close', (code) => console.log('exit:', code));
