import { createHiveChain } from '@hiveio/wax';

const chain = await createHiveChain();

chain.api.database_api.endpointUrl = "https://best.honey.provider"; // Custom endpoint URL for database_api

chain.endpointUrl = "https://api.hive.blog"; // This is default for all APIs

console.log(chain.api.database_api.endpointUrl);
