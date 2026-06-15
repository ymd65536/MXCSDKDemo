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
  },
  network: { allowOutbound: false },
  timeoutMs: 30_000,
});
config.process!.commandLine = 'date;ls -la python;python3 python/hello_world.py;date';

const child = spawnSandboxFromConfig(config, { usePty: false });
child.stdout!.on('data', (d) => process.stdout.write(d));
child.on('close', (code) => console.log('exit:', code));
