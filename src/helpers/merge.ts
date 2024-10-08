import Indexed from './types';

export function merge<T extends Indexed>(lhs: T, rhs: T): T {
  for (const p in rhs) {
    if (!Object.prototype.hasOwnProperty.call(rhs, p)) {
      continue;
    }

    try {
      if (rhs[p]?.constructor === Object) {
        (rhs[p] as T) = merge(lhs[p] as T, rhs[p] as T);
      } else {
        lhs[p] = rhs[p];
      }
    } catch (e) {
      lhs[p] = rhs[p];
    }
  }

  return lhs;
}
