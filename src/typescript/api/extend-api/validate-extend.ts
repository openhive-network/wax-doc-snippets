import { IsHexadecimal, IsDateString, IsString } from 'class-validator';
import { createHiveChain, TWaxExtended } from '@hiveio/wax';

const chain = await createHiveChain();

// https://developers.hive.io/apidefinitions/#transaction_status_api.find_transaction-parameter_json
// Create a request class with validators that will require a valid input from the end user
class FindTransactionRequest {
  @IsHexadecimal()
  public transaction_id!: string;

  @IsDateString()
  public expiration!: string;
}

// https://developers.hive.io/apidefinitions/#transaction_status_api.find_transaction-expected_response_json
// Create a response class with validators that will require a valid output from the remote API
class FindTransactionResponse {
  @IsString()
  public status!: 'unknown' | string;
}

// Create the proper API structure
const ExtendedApi = {
  transaction_status_api: { // API
    find_transaction: { // Method
      params: FindTransactionRequest, // params is our request
      result: FindTransactionResponse // result is out response
    }
  }
};

const extended: TWaxExtended<typeof ExtendedApi> = chain.extend(ExtendedApi);

// Call the transaction_status_api API using our extended interface
const result = await extended.api.transaction_status_api.find_transaction({
  transaction_id: "0000000000000000000000000000000000000000",
  expiration: "2016-03-24T18:00:21"
});

console.info(result);