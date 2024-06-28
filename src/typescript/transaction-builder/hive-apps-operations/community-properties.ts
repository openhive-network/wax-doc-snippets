import { createHiveChain, CommunityOperationBuilder, ESupportedLanguages } from '@hiveio/wax';

// Create chain
const chain = await createHiveChain();

// Create transaction with data from remote
const tx = await chain.getTransactionBuilder();

const { wallet, publicKey1 } = globalThis.snippetsBeekeeperData; // It should be the public key of the account that you authorize the operation

// Your account name
const yourAccount = 'your_account';

// Community name you want to join
const communityName = 'community_name'

// Create community operation builder new instance
const communityOperation = new CommunityOperationBuilder();

// Push operations of community operation builder into the created transaction
tx.push(
  communityOperation
    // Update the properties of the community
    .updateProps(communityName, {
        title: 'New Community Title',
        about: 'Community Description',
        is_nsfw: false,
        lang: ESupportedLanguages.ENGLISH,
        description: 'Detailed community description',
        flag_text: 'Post flagging rules'
    })
    // The account that authorizes underlying custom json operation is also reponsible for signing the transaction usign its posting authority
    .authorize(yourAccount)
    .build() // Build the current set of hive apps opeartion readu to be pushed into the transaction
);

// Sign and build the transaction
const builtTx = tx.build(wallet, publicKey1);

console.log(builtTx.operations);
console.log(`Requierd posting auths: ${builtTx.operations[0].custom_json.required_posting_auths}`);
