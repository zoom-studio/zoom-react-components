export namespace MakeElementDraggableNS {
  export interface MakeElementDraggableSensitive {
    target: string
    sensitiveOnMove?: boolean
    sensitiveOnMoveEnd?: boolean
  }

  export interface Args {
    element: HTMLElement
    areaSensitive?: MakeElementDraggableSensitive
    blackList?: string[]
    whiteList?: string[]
    onDragEnd?: (positionX: number, positionY: number) => void
    onDragStart?: () => void
  }
}

export const makeElementDraggable = ({
  element,
  areaSensitive,
  blackList,
  whiteList,
  onDragEnd,
  onDragStart,
}: MakeElementDraggableNS.Args) => {
  let pos1 = 0
  let pos2 = 0
  let pos3 = 0
  let pos4 = 0

  const dragMouseDown = (x: number, y: number) => {
    pos3 = x
    pos4 = y
    document.onmouseup = closeDragElement
    document.ontouchend = closeDragElement

    document.onmousemove = evt => {
      evt = evt || window.event
      const { clientX, clientY } = evt
      elementDrag(clientX, clientY)
    }

    document.ontouchmove = evt => {
      evt = evt || window.event
      const { pageX, pageY } = evt.touches[0]
      elementDrag(pageX, pageY)
    }
  }

  const setRestrictedPositions = () => {
    const areaSensitiveTarget =
      areaSensitive && <HTMLDivElement>document.querySelector(areaSensitive.target)

    const areaWidth = areaSensitiveTarget?.clientWidth || 0
    const areaHeight = areaSensitiveTarget?.clientHeight || 0

    const { clientWidth: elementWidth, clientHeight: elementHeight } = element
    const maxLeft = areaWidth - elementWidth - 5
    const maxTop = areaHeight - elementHeight - 5

    let newTop = element.offsetTop - pos2
    let newLeft = element.offsetLeft - pos1

    if (newTop < 0) newTop = 0
    if (newTop > maxTop) newTop = maxTop

    if (newLeft < 0) newLeft = 0
    if (newLeft > maxLeft) newLeft = maxLeft

    element.style.top = `${newTop}px`
    element.style.left = `${newLeft}px`
    element.style.right = 'unset'
    element.style.bottom = 'unset'
  }

  const elementDrag = (x: number, y: number) => {
    pos1 = pos3 - x
    pos2 = pos4 - y
    pos3 = x
    pos4 = y

    if (areaSensitive?.sensitiveOnMove) {
      setRestrictedPositions()
    } else {
      element.style.top = `${element.offsetTop - pos2}px`
      element.style.left = `${element.offsetLeft - pos1}px`
      element.style.right = 'unset'
      element.style.bottom = 'unset'
    }
  }

  const closeDragElement = () => {
    document.onmouseup = null
    document.onmousemove = null
    document.ontouchmove = null

    if (areaSensitive?.sensitiveOnMoveEnd) {
      setRestrictedPositions()
    }

    onDragEnd?.(pos3, pos4)
  }

  const shouldStartDrag = (target: HTMLDivElement | null): boolean => {
    if (!target) {
      return true
    }

    if (blackList) {
      for (const blocked of blackList) {
        if (target.classList.contains(blocked)) {
          return false
        }
      }
    }

    if (whiteList) {
      for (const allowed of whiteList) {
        if (!target.classList.contains(allowed)) {
          return false
        }
      }
    }

    return true
  }

  element.onmousedown = evt => {
    onDragStart?.()

    if (!shouldStartDrag(<HTMLDivElement | null>evt.target)) {
      return
    }

    evt = evt || window.event
    dragMouseDown(evt.clientX, evt.clientY)
  }

  element.ontouchstart = evt => {
    onDragStart?.()
    evt = evt || window.event
    const { pageX, pageY } = evt.touches[0]

    if (!shouldStartDrag(<HTMLDivElement | null>evt.target)) {
      return
    }

    dragMouseDown(pageX, pageY)
  }
}
