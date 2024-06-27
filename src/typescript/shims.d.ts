import { TPublicKey, IBeekeeperUnlockedWallet } from '@hiveio/beekeeper';

declare global {
  var snippetsBeekeeperData: {
    wallet: IBeekeeperUnlockedWallet;
    password: string;
    publicKey1: TPublicKey;
    publicKey2: TPublicKey;
  }
}
