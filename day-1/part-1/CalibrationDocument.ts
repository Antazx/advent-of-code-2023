import { CalibrationValue } from './CalibrationValue.ts';

export class CalibrationDocument {
  private calibrationValues: CalibrationValue[];

  constructor(input: string) {
    this.calibrationValues = this.buildCalibrationDocument(input);
  }

  private buildCalibrationDocument(input: string): CalibrationValue[] {
    const calibrationValues = input.split('\n');
    return calibrationValues.map((value) => new CalibrationValue(value));
  }

  calculate() {
    const numericValues = this.calibrationValues.map((calibration) => calibration.getValue());
    return numericValues.reduce((acc, currentValue) => acc + currentValue, 0);
  }
}
