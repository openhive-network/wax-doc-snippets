import { createHiveChain } from '@hiveio/wax';

const chain = await createHiveChain();

interface BlockHeaderRequest {
  blockNum: number;
}

interface BlockHeaderResponse {
  witness: string;
  previous: string;
  timestamp: string;
  extensions: object[];
  transaction_merkle_root: string;
};

// Note: We have to first provide the type of our API with
// proper structure in the generics for IntelliSense
const extended = chain.extendRest<{
  hafahApi: {
    blocks: {
      blockNum: {
        header: {
          params: BlockHeaderRequest;
          result: BlockHeaderResponse;
        }
      }
    }
  }
}>
// Then here we provide the implementation details as
// a function argument for runtime evaluation.
// This helps to deduce template values in the URL
// (provided {} characters) and potentially change HTTP methods
({
  hafahApi: {
    urlPath: 'hafah-api',
    blocks: {
      blockNum: {
        urlPath: '{blockNum}',
        header: {
          method: 'GET'
        }
      }
    }
  }
});

// Call the hafah API using our extended interface
const result = await extended.restApi.hafahApi.blocks.blockNum.header({
  blockNum: 12345678
});

console.info(result);
