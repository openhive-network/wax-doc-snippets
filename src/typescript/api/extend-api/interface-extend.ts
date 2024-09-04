import { createHiveChain, TWaxApiRequest, TWaxExtended } from '@hiveio/wax';

const chain = await createHiveChain();

// https://developers.hive.io/apidefinitions/#transaction_status_api.find_transaction-parameter_json
// Create a request interface without validators - this will be the input from the end user
interface IFindTransactionRequest {
  transaction_id: string;
  expiration: string;
}

// https://developers.hive.io/apidefinitions/#transaction_status_api.find_transaction-expected_response_json
// Create a response interface without validators - this will be the output from the remote API
interface IFindTransactionResponse {
  status: 'unknown' | string;
}

// Create the proper API structure
type TExtendedApi = {
  transaction_status_api: { // API
    find_transaction: TWaxApiRequest<IFindTransactionRequest, IFindTransactionResponse> // Method
  }
};

const extended = chain.extend<TExtendedApi>();

// Call the transaction_status_api API using our extended interface
const result = await extended.api.transaction_status_api.find_transaction({
  transaction_id: "0000000000000000000000000000000000000000",
  expiration: "2016-03-24T18:00:21"
});

console.info(result);
