export class Util {
  static classNames(...args: (string | Record<string, unknown> | undefined)[]) {
    let classNames = "";

    args.forEach((arg) => {
      if (arg) {
        if (typeof arg === "string") {
          classNames += `${arg} `;
        } else {
          Object.keys(arg).forEach((key) => {
            if (!!arg[key]) {
              classNames += `${key} `;
            }
          });
        }
      }
    });

    return classNames.trim();
  }

  static formatMoneyNumber(number: number, precision = 2) {
    let [result, decimal] = number.toFixed(precision).split(".");

    result = (+result).toLocaleString();

    if (decimal) {
      result += `.${decimal}`;
    }

    return result;
  }

  static sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  static shortenNumber(num: number, precision = 0) {
    if (num < 1000) {
      return Util.formatMoneyNumber(num, precision);
    }

    if (num < 1000000) {
      return Util.formatMoneyNumber(num / 1000, precision) + "K";
    }
    if (num < 1000000000) {
      return Util.formatMoneyNumber(num / 1000000, precision) + "M";
    }
    if (num < 1000000000000) {
      return Util.formatMoneyNumber(num / 1000000000, precision) + "B";
    }
    if (num < 1000000000000000) {
      return Util.formatMoneyNumber(num / 1000000000000, precision) + "T";
    }

    return Util.formatMoneyNumber(num, precision);
  }
}
