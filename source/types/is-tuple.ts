import { Range } from './enumerable'

export type IsTuple<T> = T extends readonly any[] & {
  length: infer Length
}
  ? Length extends Range<0, 40>
    ? T
    : never
  : never
