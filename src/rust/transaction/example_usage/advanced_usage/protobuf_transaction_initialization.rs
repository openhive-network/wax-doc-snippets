use wax::prelude::*;
use wax::proto::Transaction;

fn main() -> Result<(), Box<dyn std::error::Error>> {
    let wax = create_wax_foundation(None);

    /*
     * This creation method is dedicated to usecases, when
     * protobuf transaction object is available for further use.
     * All other actions provided by the Transaction interface are
     * very common to the case specifc to API-JSON interaction.
     */

    let tx = Transaction {
        ref_block_num: 34559,
        ref_block_prefix: 1271006404,
        expiration: "2021-12-13T11:31:33".into(),
        operations: vec![],
        extensions: vec![],
        signatures: vec![],
    };

    // Constructs a new Transaction object with ready protobuf transaction.
    wax.create_transaction_from_proto(tx)?;

    Ok(())
}
