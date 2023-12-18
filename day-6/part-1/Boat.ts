export class Boat {
  private static STARTING_SPEED = 0;

  private static speedRatio(timeMs: number): number {
    const distanceMm = timeMs * 1;
    return distanceMm;
  }

  static calculateDistance(totalTimeMs: number, currentTimeMs: number): number {
    const remainingTime = totalTimeMs - currentTimeMs;

    if (remainingTime === 0) return 0;
    if (currentTimeMs === 0) return 0;

    const speed = Boat.STARTING_SPEED + Boat.speedRatio(currentTimeMs);
    return speed * remainingTime;
  }
}
