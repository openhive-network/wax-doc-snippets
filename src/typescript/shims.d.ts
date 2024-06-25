import { TPublicKey, IBeekeeperInstance } from '@hiveio/beekeeper';

declare global {
  var snippetsBeekeeperData: {
    wallet: IBeekeeperInstance;
    password: string;
    publicKey1: TPublicKey;
    publicKey2: TPublicKey;
  }
}
