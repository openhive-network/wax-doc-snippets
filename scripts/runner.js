import fs from 'fs';
import beekeeperFactory from '@hiveio/beekeeper';
import BeekeeperSigner from '@hiveio/wax-signers-beekeeper';

const jsFiles = fs.readdirSync('.').filter(file => file.endsWith('.js') && !file.endsWith('runner.js')).map(file => `./${file}`);

const beekeeper = await beekeeperFactory({ enableLogs: false });

const session = beekeeper.createSession('my.salt');

const { wallet } = await session.createWallet('w0');

const publicKey1 = await wallet.importKey(
  '5JkFnXrLM2ap9t3AmAxBJvQHF7xSKtnTrCTginQCkhzU5S7ecPT'
);
const publicKey2 = await wallet.importKey(
  '5KGKYWMXReJewfj5M29APNMqGEu173DzvHv5TeJAg9SkjUeQV78'
);

const signer1 = BeekeeperSigner.for(wallet, publicKey1);
const signer2 = BeekeeperSigner.for(wallet, publicKey2);

globalThis.snippetsBeekeeperData = { wallet, signer1, signer2, publicKey1, publicKey2 };

await import(jsFiles[0]);
