import { ProgressNS } from '.';
export declare const generateProgressColor: (step: ProgressNS.Step, defaultPercentage: number, failed: boolean, dynamicColors: boolean) => string;
export declare const normalizePercentage: (percentage: number | undefined, defaultPercentage: number) => number;
