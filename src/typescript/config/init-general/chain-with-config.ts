import { createHiveChain, IWaxOptionsChain } from '@hiveio/wax';

// Define custom options
const customOptions: IWaxOptionsChain = {
  // Example custom chain ID:
  chainId: 'f875a0b000000000000000000000000000000000000000000000000000000000',
  // Example custom API endpoint:
  apiEndpoint: 'https://hive.custom.endpoint',
  // Example custom REST API endpoint:
  restApiEndpoint: 'https://rest.api.custom.endpoint',
  // Disable API timeout:
  apiTimeout: 0
};

// Initialize Hive Chain with custom options
const chain = await createHiveChain(customOptions);
