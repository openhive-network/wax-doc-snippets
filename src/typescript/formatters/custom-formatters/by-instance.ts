import { createHiveChain, WaxFormattable, ResourceCreditsOperation, ResourceCreditsOperationBuilder, IFormatFunctionArguments, operation } from '@hiveio/wax';

const chain = await createHiveChain();

class HiveAppsOperationsFormatter {
  @WaxFormattable({ matchInstanceOf: ResourceCreditsOperation })
  public rcOperationFormatter({ target }: IFormatFunctionArguments<operation, { custom_json: ResourceCreditsOperation }>) {
    return `${target.custom_json.from} delegated ${target.custom_json.rc.amount} to ${target.custom_json.delegatees.join(",")}`;
  }
}

const tx = await chain.getTransactionBuilder();

tx.push(
  new ResourceCreditsOperationBuilder().removeDelegation("gtg", "initminer").authorize("gtg").build()
);

const formatter = chain.formatter.extend(HiveAppsOperationsFormatter);

console.log(formatter.format(tx.build().operations));