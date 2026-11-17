import { SortPipe } from './sort.pipe';
import { TemperaturePipe } from './temperature.pipe';

describe('TemperaturePipe', () => {
  const pipe = new TemperaturePipe();

  it('converts between units and formats one decimal', () => {
    expect(pipe.transform(100, 'C', 'F')).toBe('212.0°F');
    expect(pipe.transform('32', 'F', 'C')).toBe('0.0°C');
    expect(pipe.transform(21.26)).toBe('21.3°C');
  });

  it('shows a dash for missing or invalid values', () => {
    expect(pipe.transform(null)).toBe('–');
    expect(pipe.transform('warm')).toBe('–');
  });
});

describe('SortPipe', () => {
  it('sorts numerically without mutating the input', () => {
    const input = [10, 2, 33];
    expect(new SortPipe().transform(input)).toEqual([2, 10, 33]);
    expect(new SortPipe().transform(input, 'desc')).toEqual([33, 10, 2]);
    expect(input).toEqual([10, 2, 33]);
  });
});
