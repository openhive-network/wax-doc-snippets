import { createHiveChain } from '@hiveio/wax';

const chain = await createHiveChain();

// Data from blockchain
const witness_props = {
  type: "witness_set_properties_operation",
  value: {
    owner: "null",
    props: [
      ["new_signing_key","3553544d365471534a61533161526a367036795a456f35786963583762764c6872666456716935546f4e724b78485533465242456457"],
      ["key", "029072da2e84ebd6eb520f944db3d1af718500b0f1ddf60e11e986f990acddd524"]
    ],
    extensions: []
  }
};

const output = chain.formatter.format(witness_props);

console.log(output.value.props);