import { Pipe, PipeTransform } from '@angular/core';

export type Unit = 'C' | 'F';

@Pipe({ name: 'temperature' })
export class TemperaturePipe implements PipeTransform {
  transform(value: number | string | null | undefined, from: Unit = 'C', to: Unit = from): string {
    if (value === null || value === undefined || value === '') return '–';
    const n = typeof value === 'string' ? Number.parseFloat(value) : value;
    if (!Number.isFinite(n)) return '–';
    const converted = from === to ? n : from === 'C' ? n * 1.8 + 32 : (n - 32) / 1.8;
    return `${converted.toFixed(1)}°${to}`;
  }
}
