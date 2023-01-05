export const useVariable = <T>(factory: () => T): T => {
  return factory()
}
