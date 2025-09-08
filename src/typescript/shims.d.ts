import { IBeekeeperUnlockedWallet, TPublicKey } from '@hiveio/beekeeper';
import { WaxBeekeeperProviderCreator } from '@hiveio/wax-signers-beekeeper';

declare global {
  var snippetsBeekeeperData: {
    signer1: Awaited<ReturnType<WaxBeekeeperProviderCreator['for']>>;
    signer2: Awaited<ReturnType<WaxBeekeeperProviderCreator['for']>>;
    wallet: IBeekeeperUnlockedWallet;
    publicKey1: TPublicKey;
    publicKey2: TPublicKey;
  }
}
