export type AsyncFunction<Input extends any[] = any[], Output = any> = (
  ...args: Input
) => Promise<Output>
