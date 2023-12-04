export class CalibrationValue {
  private static CLEAN_VALUE_REGEX = /\D/g;
  private value: string;

  constructor(value: string) {
    this.value = value;
  }

  getValue(): number {
    const cleanValue = this.value.replaceAll(CalibrationValue.CLEAN_VALUE_REGEX, '');
    const stringValue = `${cleanValue.at(0)}${cleanValue.at(-1)}`;
    return Number(stringValue);
  }
}
