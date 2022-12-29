import { RefObject, useEffect } from 'react'

export const useOutsideClick = (
  callback: VoidFunction,
  ...references: Array<RefObject<HTMLElement>>
) => {
  const handleOnClick = (evt: globalThis.MouseEvent) => {
    const isOutside = !references.some(({ current }) => current?.contains(<Node>evt.target))

    if (isOutside) {
      callback()
    }
  }

  useEffect(() => {
    document.addEventListener('click', handleOnClick)
    return () => {
      document.removeEventListener('click', handleOnClick)
    }
  }, [...references])
}
