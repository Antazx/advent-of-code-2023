export class ElfEngine {
  private engineSchema: string[];

  constructor(input: string) {
    this.engineSchema = input.split('\n');
  }

  getGearRatios(): number {
    const gears = this.findGearRatios();
    return gears.flat().reduce((acc, curr) => acc + curr, 0);
  }

  private findGearRatios(): number[] {
    const gearRatios: number[] = [];

    for (let rowIndex = 0; rowIndex < this.engineSchema.length; rowIndex++) {
      const row = this.engineSchema[rowIndex];
      for (let colIndex = 0; colIndex < row.length; colIndex++) {
        const currentValue = row[colIndex];
        if (!this.isGear(currentValue)) continue;

        const adjecentParts = this.findAdjacentParts(rowIndex, colIndex);
        if (adjecentParts.length === 2) {
          const [firstGear, secondGear] = adjecentParts;
          const gearRatio = firstGear * secondGear;
          gearRatios.push(gearRatio);
        }
      }
    }

    return gearRatios;
  }

  private isGear(value: string): boolean {
    return value === '*';
  }

  private findAdjacentParts(x: number, y: number): number[] {
    const parts: number[] = [];

    let tmpPart = this.searchLeft(x, y);
    if (tmpPart !== -1) parts.push(tmpPart);

    tmpPart = this.searchRigth(x, y);
    if (tmpPart !== -1) parts.push(tmpPart);

    if (parts.length === 2) return parts;

    if (this.canLookDown(x)) {
      if (!this.isNumber(this.engineSchema[x + 1][y])) {
        tmpPart = this.searchLeft(x + 1, y);
        if (tmpPart !== -1) parts.push(tmpPart);
        if (parts.length === 2) return parts;

        tmpPart = this.searchRigth(x + 1, y);
        if (tmpPart !== -1) parts.push(tmpPart);
        if (parts.length === 2) return parts;
      } else {
        let tmpY = y;
        while (this.canLookLeft(tmpY) && this.isNumber(this.engineSchema[x + 1][tmpY - 1])) {
          tmpY--;
        }
        tmpPart = this.searchRigth(x + 1, tmpY, this.engineSchema[x + 1][tmpY]);
        if (tmpPart !== -1) parts.push(tmpPart);
        if (parts.length === 2) return parts;
      }
    }

    if (this.canLookUp(x)) {
      if (!this.isNumber(this.engineSchema[x - 1][y])) {
        tmpPart = this.searchLeft(x - 1, y);
        if (tmpPart !== -1) parts.push(tmpPart);
        if (parts.length === 2) return parts;

        tmpPart = this.searchRigth(x - 1, y);
        if (tmpPart !== -1) parts.push(tmpPart);
        if (parts.length === 2) return parts;
      } else {
        let tmpY = y;
        while (this.canLookLeft(tmpY) && this.isNumber(this.engineSchema[x - 1][tmpY - 1])) {
          tmpY--;
        }
        tmpPart = this.searchRigth(x - 1, tmpY, this.engineSchema[x - 1][tmpY]);
        if (tmpPart !== -1) parts.push(tmpPart);
        if (parts.length === 2) return parts;
      }
    }

    return [];
  }

  private searchLeft(x: number, y: number): number {
    let tmpPart = '';
    while (this.canLookLeft(y) && this.isNumber(this.engineSchema[x][y - 1])) {
      tmpPart += this.engineSchema[x][y - 1];
      y--;
    }
    return tmpPart !== '' ? parseInt(tmpPart.split('').reverse().join('')) : -1;
  }

  private searchRigth(x: number, y: number, tmpPart = ''): number {
    while (this.canLookRigth(y) && this.isNumber(this.engineSchema[x][y + 1])) {
      tmpPart += this.engineSchema[x][y + 1];
      y++;
    }

    return tmpPart !== '' ? parseInt(tmpPart) : -1;
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

  private isNumber(value: string): boolean {
    return !isNaN(parseInt(value));
  }
}
