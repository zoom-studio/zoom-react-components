import { debounce } from 'lodash'

export const useManyClickHandlers = <Element extends HTMLElement = HTMLElement>(
  ...handlers: ((e: React.UIEvent<Element>) => void)[]
) => {
  const callEventHandler = (e: React.UIEvent<Element>) => {
    if (e.detail <= 0) return
    const handler = handlers[e.detail - 1]
    if (handler) {
      handler(e)
    }
  }

  const debounceHandler = debounce(function (e: React.UIEvent<Element>) {
    callEventHandler(e)
  }, 250)

  return (e: React.UIEvent<Element>) => {
    e.persist()
    debounceHandler(e)
  }
}
