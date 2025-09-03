import { createHiveChain, WaxFormattable } from '@hiveio/wax';

const chain = await createHiveChain();

class OperationsFormatter {
  @WaxFormattable({ matchProperty: "type", matchValue: "transfer_operation" })
  public transferOperationFormatter({ source }): string {
    const amount = chain.waxify`${source.value.amount!}`;

    return `${source.value.from} transferred ${amount} to ${source.value.to}`;
  }

  @WaxFormattable({ matchProperty: "type", matchValue: "vote_operation" })
  public voteOperationFormatter({ source }): string {
    return `${source.value.voter} voted on @${source.value.author}/${source.value.permlink}`;
  }
}

const formatter = chain.formatter.extend(OperationsFormatter);

const data = [{
  type: "vote_operation",
  value: {
    voter: "otom",
    author: "c0ff33a",
    permlink: "ewxhnjbj",
    weight: 2200
  }
}, {
  type: "transfer_operation",
  value: {
    from: "oneplus7",
    to: "kryptogames",
    amount: {
      amount: "300000",
      precision: 3,
      nai: "@@000000021"
    },
    memo: "Roll under 50 4d434bd943616"
  }
}];

console.log(formatter.format(data));
