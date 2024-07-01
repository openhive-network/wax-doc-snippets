import { createHiveChain, WaxFormattable, ResourceCreditsOperation, ResourceCreditsOperationBuilder, IFormatFunctionArguments, operation } from '@hiveio/wax';

const chain = await createHiveChain();

/// Create custom formatter definition, specific to given operation type
class HiveAppsOperationsFormatter {
  @WaxFormattable({ matchInstanceOf: ResourceCreditsOperation })
  public rcOperationFormatter({ target }: IFormatFunctionArguments<operation, { custom_json: ResourceCreditsOperation }>) {
    return `${target.custom_json.from} delegated ${target.custom_json.rc.amount} to ${target.custom_json.delegatees.join(",")}`;
  }
}

/// Initialize transaction builder object
const txBuilder = await chain.getTransactionBuilder();
/// Prepare the operation just to show formatter at work
txBuilder.push(
  new ResourceCreditsOperationBuilder().removeDelegation("gtg", "initminer").authorize("gtg").build()
);

/// Extend set of configured formatters to be used
const formatter = chain.formatter.extend(HiveAppsOperationsFormatter);
/// Use it to process whole array of operations in general way - without digging into stored item details
console.log(formatter.format(txBuilder.build().operations));