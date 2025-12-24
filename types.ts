export type TankVolume = 500 | 1500;

export enum SafetyStatus {
  SAFE = 'SAFE',
  WARNING = 'WARNING',
  DANGER = 'DANGER'
}

export interface CalculationResult {
  minutes: number;
  oxygenConsumption: number;
  status: SafetyStatus;
}

