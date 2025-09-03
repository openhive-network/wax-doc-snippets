import { createHiveChain, WaxFormattable, ResourceCreditsOperation, ResourceCreditsOperationData, IFormatFunctionArguments, operation } from '@hiveio/wax';

const chain = await createHiveChain();

/// Create custom formatter definition, specific to given operation type
class HiveAppsOperationsFormatter {
  @WaxFormattable({ matchInstanceOf: ResourceCreditsOperation })
  public rcOperationFormatter({ target }: IFormatFunctionArguments<
    operation, { custom_json: ResourceCreditsOperationData }
    >) {
    const { from, rc, delegatees } = target.custom_json;

    return `${from} delegated ${rc.amount} to ${delegatees.join(",")}`;
  }
}

/// Initialize transaction object
const tx = await chain.createTransaction();
/// Prepare the operation just to show formatter at work
tx.pushOperation(
  new ResourceCreditsOperation().removeDelegation("gtg", "initminer").authorize("gtg")
);

/// Extend set of configured formatters to be used
const formatter = chain.formatter.extend(HiveAppsOperationsFormatter);
/// Use it to process whole array of operations in general way
// without digging into stored item details
console.log(formatter.format(tx.transaction.operations));
