import { createHiveChain, IWaxOptionsChain } from '@hiveio/wax';

// Define custom options
const customOptions: IWaxOptionsChain = {
  chainId: 'f875a0b000000000000000000000000000000000000000000000000000000000', // Example custom chain ID
  apiEndpoint: 'https://hive.custom.endpoint' // Example custom API endpoint
};

// Initialize Hive Chain with custom options
await createHiveChain(customOptions);