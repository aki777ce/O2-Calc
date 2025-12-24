export type TankVolume = 500 | 1500 | 2000 | 3000;

export type InputMode = 'pressure' | 'volume';

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
