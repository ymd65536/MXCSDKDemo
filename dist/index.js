"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mxc_sdk_1 = require("@microsoft/mxc-sdk");
if (!(0, mxc_sdk_1.getPlatformSupport)().isSupported) {
    throw new Error('MXC not available on this host');
}
const tools = (0, mxc_sdk_1.getAvailableToolsPolicy)(process.env);
const temp = (0, mxc_sdk_1.getTemporaryFilesPolicy)();
const config = (0, mxc_sdk_1.createConfigFromPolicy)({
    version: '0.7.0-alpha',
    filesystem: {
        readonlyPaths: tools.readonlyPaths,
        readwritePaths: temp.readwritePaths,
    },
    network: { allowOutbound: false },
    timeoutMs: 30_000,
});
config.process.commandLine = 'python -c "print(\'hello from sandbox\')"';
const child = (0, mxc_sdk_1.spawnSandboxFromConfig)(config, { usePty: false });
child.stdout.on('data', (d) => process.stdout.write(d));
child.on('close', (code) => console.log('exit:', code));
