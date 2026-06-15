import {
  spawnSandboxFromConfig, createConfigFromPolicy,
  getAvailableToolsPolicy, getTemporaryFilesPolicy,
  getPlatformSupport,
} from '@microsoft/mxc-sdk';

if (!getPlatformSupport().isSupported) {
  throw new Error('MXC not available on this host');
}

const tools = getAvailableToolsPolicy(process.env);
const temp  = getTemporaryFilesPolicy();

const config = createConfigFromPolicy({
  version: '0.7.0-alpha',
  filesystem: {
    readonlyPaths:  tools.readonlyPaths,
    readwritePaths: temp.readwritePaths,
  },
  network: { allowOutbound: false },
  timeoutMs: 30_000,
});
config.process!.commandLine = 'python3 -c "print(\'hello from sandbox\')"';

const child = spawnSandboxFromConfig(config, { usePty: false });
child.stdout!.on('data', (d) => process.stdout.write(d));
child.on('close', (code) => console.log('exit:', code));
