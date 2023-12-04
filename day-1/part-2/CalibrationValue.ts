export class CalibrationValue {
  private static MATCH_NUMBER_STRING = /(?=(one|two|three|four|five|six|seven|eight|nine|\d))/g;
  private static VALID_DIGITS: Record<string, string> = {
    one: '1',
    two: '2',
    three: '3',
    four: '4',
    five: '5',
    six: '6',
    seven: '7',
    eight: '8',
    nine: '9',
  };
  private value: string;

  constructor(value: string) {
    this.value = value;
  }

  getValue(): number {
    let matches = [...this.value.matchAll(CalibrationValue.MATCH_NUMBER_STRING)].flat();
    matches = matches.filter((value) => value !== '');
    matches = matches.map((value) => CalibrationValue.VALID_DIGITS[value] ?? value);

    return parseInt(matches[0] + matches[matches.length - 1]);
  }
}
