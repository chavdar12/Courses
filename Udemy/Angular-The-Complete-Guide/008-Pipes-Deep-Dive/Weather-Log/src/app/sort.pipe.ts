import { Pipe, PipeTransform } from '@angular/core';

// pure pipe: it re-runs only when a new array reference comes in, so callers must not mutate in place
@Pipe({ name: 'sort' })
export class SortPipe implements PipeTransform {
  transform(values: readonly number[], direction: 'asc' | 'desc' = 'asc'): number[] {
    const sorted = [...values].sort((a, b) => a - b);
    return direction === 'asc' ? sorted : sorted.reverse();
  }
}
