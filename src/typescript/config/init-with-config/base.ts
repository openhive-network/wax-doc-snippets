import { createWaxFoundation, IWaxOptions } from '@hiveio/wax';

// Define custom options
const customOptions: IWaxOptions = {
  chainId: 'f875a0b000000000000000000000000000000000000000000000000000000000' // Example custom chain ID
};

// Initialize Wax Foundation with custom options
await createWaxFoundation(customOptions);