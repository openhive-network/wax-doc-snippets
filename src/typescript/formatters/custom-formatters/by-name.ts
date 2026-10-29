import { createHiveChain, WaxFormattable, type IFormatFunctionArguments } from '@hiveio/wax';

const chain = await createHiveChain();

class MyFormatters {
  myFunction(value: number) {
    return value.toString();
  }

  @WaxFormattable()
  myCustomProp({ source }: IFormatFunctionArguments<{ myCustomProp: number }>) {
    return this.myFunction(source.myCustomProp);
  }
}

const formatter = chain.formatter.extend(MyFormatters);

const data = {
  myCustomProp: 12542
};

console.log(formatter.waxify`MyData: ${data}`);
