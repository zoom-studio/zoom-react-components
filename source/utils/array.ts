import { MaybeArray } from '../types'

export class ArrayUtils {
  static toArray = <T extends object>(entry: MaybeArray<T>): T[] => {
    if ('length' in entry) {
      return entry
    }
    return [entry]
  }
}
