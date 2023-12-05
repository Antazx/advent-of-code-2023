export class ElfEngine {
  private engineSchema: string[];

  constructor(input: string) {
    this.engineSchema = input.split('\n');
  }

  getEnginePartsSum(): number {
    const engineParts = this.findEngineParts();
    return engineParts.flat().reduce((acc, curr) => acc + curr, 0);
  }

  private findEngineParts(): number[] {
    const engineParts: number[] = [];

    for (let rowIndex = 0; rowIndex < this.engineSchema.length; rowIndex++) {
      const row = this.engineSchema[rowIndex];
      let possibleValidPart = '';
      let hasAdjacentSymbol = false;

      for (let colIndex = 0; colIndex < row.length; colIndex++) {
        const currentValue = row[colIndex];
        const isNumber = this.isNumber(currentValue);
        possibleValidPart = isNumber ? `${possibleValidPart}${currentValue}` : '';
        if (!isNumber) continue;

        const numberNotFollowedByNum = isNumber && !this.nextIsNumber(rowIndex, colIndex);
        hasAdjacentSymbol = hasAdjacentSymbol || this.isValidPart(rowIndex, colIndex);

        if (numberNotFollowedByNum && hasAdjacentSymbol) {
          hasAdjacentSymbol = false;
          engineParts.push(parseInt(possibleValidPart));
          possibleValidPart = '';
        }
      }
    }

    return engineParts;
  }

  private nextIsNumber(currentX: number, currentY: number): boolean {
    return this.canLookRigth(currentY) ? this.isNumber(this.engineSchema[currentX][currentY + 1]) : false;
  }

  private isValidPart(currentX: number, currentY: number): boolean {
    if (!this.isNumber(this.engineSchema[currentX][currentY])) return false;

    const right = this.canLookRigth(currentY) ? this.isSymbol(this.engineSchema[currentX][currentY + 1]) : false;
    if (right) return true;

    const left = this.canLookLeft(currentY) ? this.isSymbol(this.engineSchema[currentX][currentY - 1]) : false;
    if (left) return true;

    const up = this.canLookUp(currentX) ? this.isSymbol(this.engineSchema[currentX - 1][currentY]) : false;
    if (up) return true;

    const down = this.canLookDown(currentX) ? this.isSymbol(this.engineSchema[currentX + 1][currentY]) : false;
    if (down) return true;

    const upLeft =
      this.canLookUp(currentX) && this.canLookLeft(currentY)
        ? this.isSymbol(this.engineSchema[currentX - 1][currentY - 1])
        : false;

    if (upLeft) return true;

    const upRight =
      this.canLookUp(currentX) && this.canLookRigth(currentY)
        ? this.isSymbol(this.engineSchema[currentX - 1][currentY + 1])
        : false;

    if (upRight) return true;

    const downLeft =
      this.canLookDown(currentX) && this.canLookLeft(currentY)
        ? this.isSymbol(this.engineSchema[currentX + 1][currentY - 1])
        : false;
    if (downLeft) return true;

    const downRigth =
      this.canLookDown(currentX) && this.canLookRigth(currentY)
        ? this.isSymbol(this.engineSchema[currentX + 1][currentY + 1])
        : false;

    if (downRigth) return true;

    return false;
  }

  private canLookUp(x: number): boolean {
    return x > 0;
  }

  private canLookDown(x: number): boolean {
    return x < this.engineSchema.length - 1;
  }

  private canLookLeft(y: number): boolean {
    return y > 0;
  }

  private canLookRigth(y: number): boolean {
    return y < this.engineSchema[0].length - 1;
  }

  private isSymbol(value: string): boolean {
    return isNaN(parseInt(value)) && value !== '.' && !/\n/.test(value);
  }

  private isNumber(value: string): boolean {
    return !isNaN(parseInt(value));
  }
}
