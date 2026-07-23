use beekeeper::prelude::*;
use wax::prelude::*;
use wax_signers_beekeeper::prelude::*;

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    // Initialize wax api
    let wax_api = create_wax_foundation(None);

    // Initialize chain
    let chain = create_hive_chain(None)?;

    // Initialize beekeeper
    let beekeeper = BeekeeperApi::new(
        BeekeeperOptions::new("ignored").in_memory(true),
    );

    // Create session
    let session = beekeeper.create_session()?;

    // Create wallet
    let wallet_password = "w1-password";
    let mut wallet = session.create_wallet("w1", wallet_password)?.wallet;

    // Declare example account name
    let account_name = "your-account";
    // Declare example password for generating private key
    let master_password = "your-master-password";

    // Generating a new posting private key from a password
    let private_posting_key_data = wax_api.get_private_key_from_password(
        account_name,
        "posting",
        master_password,
    )?;
    // Import the posting key into the wallet
    let public_posting_signing_key =
        wallet.import_key(&private_posting_key_data.wif_private_key)?;

    // Generating a new active private key from a password
    let private_active_key_data = wax_api.get_private_key_from_password(
        account_name,
        "active",
        master_password,
    )?;
    // Import the active key into the wallet
    let public_active_signing_key =
        wallet.import_key(&private_active_key_data.wif_private_key)?;

    // Generating a new encryption private key from a password
    let private_encryption_key_data = wax_api.get_private_key_from_password(
        account_name,
        "memo",
        master_password,
    )?;
    // Import the encryption key into the wallet
    let public_encryption_signing_key =
        wallet.import_key(&private_encryption_key_data.wif_private_key)?;

    session.lock_all()?;
    let provider = BeekeeperSignatureProvider::new(
        session.open_wallet("w1")?.unlock(wallet_password)?,
    );

    ////////////////////////////////////////////////////////////////
    //                  Simple operation scenario                 //
    ////////////////////////////////////////////////////////////////

    // Create a transaction
    let mut simple_operation_tx = chain.create_transaction(None).await?;

    let vote_op = chain.create_operation(Value::VoteOperation(Vote {
        voter: "voter".into(),
        author: "author".into(),
        permlink: "test-permlink".into(),
        weight: 2200,
    }));

    // Push simple vote operation into previously initialized transaction
    simple_operation_tx.push_operation(vote_op);

    // Sign and build the transaction
    simple_operation_tx.sign(&provider, &public_posting_signing_key)?;

    // Log the simple transaction into console in API form
    println!("{}", simple_operation_tx.to_api()?);

    /*
     * Call actual broadcast API to send transaction to the blockchain.
     * The code is commented out because examples does not have access to
     * Hive mainnet keys.
     */
    // chain.broadcast(&simple_operation_tx).await?;

    ////////////////////////////////////////////////////////////////
    //             Simple operation legacy scenario               //
    ////////////////////////////////////////////////////////////////

    // Create a transaction
    let mut legacy_tx = chain.create_transaction(None).await?;

    // Declare example transfer operation
    let transfer = Value::TransferOperation(Transfer {
        from_account: account_name.into(),
        to_account: "friend".into(),
        amount: chain.hive_coins(100)?,
        memo: "My transfer operation".into(),
    });

    // Push simple vote operation into previously initialized transaction
    legacy_tx.push_operation(chain.create_operation(transfer.clone()));

    // Because we want to process transaction signing in legacy way, we need to sign the transaction externally, which is shown below.
    // We need to calculate the transaction digest first.
    let digest = legacy_tx.legacy_sig_digest()?;

    /*
    Other signers (except beekeeper) do not allow signing the digest directly,
    this is a beekeeper-specific feature.
    */

    // Generate the signature based on the transaction digest
    let signature =
        wallet.sign_digest(&public_posting_signing_key, &digest)?;

    // Supplement the transaction by created signature
    legacy_tx.add_signature(&signature)?;

    // This is JSON form ready for broadcasting or passing to third-party service.
    let tx_api_form = legacy_tx.to_legacy_api()?;

    // Log the simple legacy transaction into console in API form
    println!("{tx_api_form}");

    /*
     * Call actual broadcast API to send transaction to the blockchain.
     * The code is commented out because examples does not have access to Hive mainnet keys.
     */
    // chain.broadcast(&legacy_tx).await?;

    ////////////////////////////////////////////////////////////////
    //                    Encryption example                      //
    ////////////////////////////////////////////////////////////////

    // Create a transaction
    let mut encryption_tx = chain.create_transaction(None).await?;

    // Declare other example transfer operation
    let transfer_encryption_op =
        chain.create_operation(Value::TransferOperation(Transfer {
            from_account: account_name.into(),
            to_account: "friend".into(),
            amount: chain.hive_coins(100)?,
            memo: "This will be encrypted".into(),
        }));

    encryption_tx
        // Start encryption process
        .start_encrypt(&public_encryption_signing_key, None)
        // Push transfer operation into previously initialized transaction
        .push_operation(transfer_encryption_op)
        // Stop encryption process
        .stop_encrypt()?
        // Push another transfer operation into previously initialized transaction
        .push_operation(chain.create_operation(transfer));

    // Sign and build the transaction
    encryption_tx.perform_operation_encryption(&provider)?;
    encryption_tx.sign(&provider, &public_posting_signing_key)?;

    // Log the encryption transaction into console in API form
    println!("{}", encryption_tx.to_api()?);

    /*
     * Call actual broadcast API to send transaction to the blockchain.
     * The code is commented out because examples does not have access
     * to Hive mainnet keys.
     */
    // chain.broadcast(&encryption_tx).await?;

    ////////////////////////////////////////////////////////////////
    //                Comment operation scenario                  //
    ////////////////////////////////////////////////////////////////

    // This example will create multiple operations including
    // comment_operation and comment_options_operation

    // Create a transaction
    let mut comment_operation_tx = chain.create_transaction(None).await?;

    /*
     * Use BlogPostOperation to create an article operation and set all fields.
     */
    comment_operation_tx.push_complex_operation(
        &chain,
        BlogPostOperation {
            author: account_name.into(),
            permlink: Some("my-article-permlink".into()),
            title: "My article title".into(),
            body: "My article body".into(),
            category: "my-category".into(),
            tags: vec!["my-article".into()],
            description: Some("This is my article!".into()),
            images: vec!["article.jpg".into()],
            links: vec!["https://example.com".into()],
            format: Some(CommentFormat::Markdown),
            beneficiaries: vec![BeneficiaryRoute {
                account: "friend".into(),
                weight: 40,
            }],
            max_accepted_payout: Some(NaiAssetConvertible::Asset(
                chain.hbd_coins(100)?,
            )),
            allow_curation_rewards: Some(true),
            allow_votes: Some(true),
            ..Default::default()
        },
    )?;

    /*
     * Use ReplyOperation to create a reply operation and set all fields.
     * Note that the category is not set because it is only available in
     * the BlogPostOperation.
     */
    comment_operation_tx.push_complex_operation(
        &chain,
        ReplyOperation {
            author: account_name.into(),
            permlink: Some("My-reply-permlink".into()),
            parent_author: account_name.into(),
            parent_permlink: "my-article-permlink".into(),
            body: "My reply body".into(),
            tags: vec!["my-reply".into()],
            description: Some("This is my reply!".into()),
            images: vec!["reply.jpg".into()],
            links: vec!["https://example.com".into()],
            format: Some(CommentFormat::Markdown),
            beneficiaries: vec![BeneficiaryRoute {
                account: "friend".into(),
                weight: 40,
            }],
            max_accepted_payout: Some(NaiAssetConvertible::Asset(
                chain.hbd_coins(100)?,
            )),
            allow_curation_rewards: Some(true),
            allow_votes: Some(true),
            ..Default::default()
        },
    )?;

    /*
    Note that all the logic is hidden under the specific operation
    constructor that you are currently using
    */

    // Sign and build the transaction
    comment_operation_tx.sign(&provider, &public_posting_signing_key)?;

    // Log the article transaction into console in API form
    println!("{}", comment_operation_tx.to_api()?);

    /*
     * Call actual broadcast API to send transaction to the blockchain.
     * The code is commented out because examples does not have access
     * to Hive mainnet keys.
     */
    // chain.broadcast(&comment_operation_tx).await?;

    ////////////////////////////////////////////////////////////////
    //            Account authority update scenario               //
    ////////////////////////////////////////////////////////////////

    // This example will create account_update2_operation

    // Create a transaction
    let mut account_update_tx = chain.create_transaction(None).await?;

    /*
     * Use AccountAuthorityUpdateOperation to create
     * new account_update2_operation with all the fields initialized
     */
    let mut account_authority_update_op =
        AccountAuthorityUpdateOperation::create_for(&chain, "gtg").await?;

    // The role fields squash all authority categories and allow you to select
    // specific ones to modify in a user-friendly interface
    let has_gandalf_auth = account_authority_update_op.active.has("gandalf", None);

    println!("Has Gandalf Auth: {has_gandalf_auth}");

    // Add frodo authority with weight 2
    account_authority_update_op.active.add("frodo", 2)?;

    // Update the memo key
    account_authority_update_op
        .memo
        .set("STM8GC13uCZbP44HzMLV6zPZGwVQ8Nt4Kji8PapsPiNq1BK153XTX")?;

    // You can also iterate over different authority levels from given category
    // To perform batch operations
    println!("Current account authority:");
    for role in [
        &account_authority_update_op.owner,
        &account_authority_update_op.active,
        &account_authority_update_op.posting,
    ] {
        println!("{} : {:?}", role.role().as_str(), role.value());
    }
    println!("memo : {}", account_authority_update_op.memo.value());

    account_update_tx
        .push_complex_operation(&chain, account_authority_update_op)?;

    // Sign and build the transaction
    account_update_tx.sign(&provider, &public_active_signing_key)?;

    // Log the article transaction into console in API form
    println!("{}", account_update_tx.to_api()?);

    /*
     * Call actual broadcast API to send transaction to the blockchain.
     * The code is commented out because examples does not have access
     * to Hive mainnet keys.
     */
    // chain.broadcast(&account_update_tx).await?;

    ////////////////////////////////////////////////////////////////
    //            Other operation factories scenario              //
    ////////////////////////////////////////////////////////////////

    // Create a transaction
    let mut operation_factories_tx = chain.create_transaction(None).await?;

    // Create a recurrent transfer operation that will be executed every day
    // for 30 days with the ammount of 100.000 HIVE
    operation_factories_tx.push_complex_operation(
        &chain,
        DefineRecurrentTransferOperation {
            from_account: account_name.into(),
            to_account: "friend".into(),
            amount: NaiAssetConvertible::Asset(chain.hive_coins(100)?),
            memo: Some("Daily pay".into()),
            recurrence: Some(24),
            executions: Some(30),
            ..Default::default()
        },
    )?;

    // Create a proposal update operation of id equals 1 with the
    // ammount of 100.000 HBD
    operation_factories_tx.push_complex_operation(
        &chain,
        UpdateProposalOperation {
            proposal_id: 1,
            creator: account_name.into(),
            daily_pay: NaiAssetConvertible::Asset(chain.hbd_coins(100)?),
            subject: "Proposal Update".into(),
            permlink: "proposal-update".into(),
            end_date: Some(HiveDateTime::parse("2023-03-14T00:00:00")?),
        },
    )?;

    // Create a witness set properties operation with hbd interest rate of 7.5%,
    // maximum block size of 65536, account creation fee of 300.000 HIVE
    // and url of "https://example.com"
    operation_factories_tx.push_complex_operation(
        &chain,
        WitnessSetPropertiesOperation {
            owner: account_name.into(),
            witness_signing_key: public_active_signing_key.clone(),
            maximum_block_size: Some(65536),
            hbd_interest_rate: Some(750),
            account_creation_fee: Some(NaiAssetConvertible::Asset(
                chain.hive_coins(300)?,
            )),
            url: Some("https://example.com".into()),
            ..Default::default()
        },
    )?;

    // Sign and build the transaction
    operation_factories_tx.sign(&provider, &public_active_signing_key)?;

    // Log the operation factories transaction into console in API form
    println!("{}", operation_factories_tx.to_api()?);

    /*
     * Call actual broadcast API to send transaction to the blockchain.
     * The code is commented out because examples does not have access
     * to Hive mainnet keys.
     */
    // chain.broadcast(&operation_factories_tx).await?;

    ////////////////////////////////////////////////////////////////
    //      Scenario that includes all HiveAppsOperations         //
    ////////////////////////////////////////////////////////////////

    // (custom_json based)

    // Create a transaction
    let mut other_operations_tx = chain.create_transaction(None).await?;

    // Create follow operation new instance and push its operations into the
    // created transaction
    other_operations_tx.push_complex_operation(
        &chain,
        FollowOperation::new()
            .follow_blog(account_name, vec!["blog-to-follow".into()])?
            .mute_blog(account_name, vec!["blog-to-mute".into()])?
            .reblog(account_name, "to-reblog", "post-permlink")
            // The account that authorizes underlying custom json operation is
            // also reponsible for signing the transaction using its posting
            // authority
            .authorize(vec![account_name.into()], Vec::new())?,
    )?;

    // Create resource credits operation new instance and push its operations
    // into the created transaction
    other_operations_tx.push_complex_operation(
        &chain,
        ResourceCreditsOperation::new()
            // Delegate 1000 RC from your account to a friend's account.
            .delegate(account_name, 1000, vec!["friend".into()])?
            // The account that authorizes underlying custom json operation is
            // also reponsible for signing the transaction using its posting
            // authority
            .authorize(vec![account_name.into()], Vec::new())?,
    )?;

    // Declare example community name
    let community_name = "community-name";

    // Create community operation new instance and push its operations into
    // the created transaction
    other_operations_tx.push_complex_operation(
        &chain,
        CommunityOperation::new()
            // Subscribe the community
            .subscribe("communityName")
            // Flag the post of the author in the community with the permlink
            // Add notes regarding the violation (violation notes).
            .flag_post(
                community_name,
                "author-account",
                "post-permlink",
                "violation notes",
            )
            // The account that authorizes underlying custom json operation is
            // also reponsible for signing the transaction using its posting
            // authority
            .authorize(vec![account_name.into()], Vec::new())?,
    )?;

    // Sign and build the transaction
    other_operations_tx.sign(&provider, &public_posting_signing_key)?;

    // Log the other operations transaction into console in API form
    println!("{}", other_operations_tx.to_api()?);

    /*
     * Call actual broadcast API to send transaction to the blockchain.
     * The code is commented out because examples does not have access
     * to Hive mainnet keys.
     */
    // chain.broadcast(&other_operations_tx).await?;

    Ok(())
}
