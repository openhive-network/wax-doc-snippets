import { createHiveChain, TWaxApiRequest } from '@hiveio/wax';

const chain = await createHiveChain();

interface IsKnownTransactionRequest {
  id: string;
}

interface IsKnownTransactionResponse {
  is_known: boolean;
}

// Create the proper API structure
type TExtendedApi = {
  database_api: { // API
    is_known_transaction: TWaxApiRequest<
      IsKnownTransactionRequest,
      IsKnownTransactionResponse
    >; // Method
  }
};

const extended = chain.extend<TExtendedApi>();

// Call the database_api API using our extended interface
const result = await extended.api.database_api.is_known_transaction({
  id: "0000000000000000000000000000000000000000"
});

console.info(result);
