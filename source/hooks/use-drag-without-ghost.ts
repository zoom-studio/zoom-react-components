import { DragEvent } from 'react'

export namespace UseDragWithoutGhostNS {
  export const GHOST =
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAFhAJ/wlseKgAAAABJRU5ErkJggg=='

  export interface Options {
    stopPropagation?: boolean
    preventDefault?: boolean
  }
}

export const useDragWithoutGhost = <ElementType extends Element>(
  onDragStart?: (evt: DragEvent<ElementType>) => void,
  options?: UseDragWithoutGhostNS.Options,
) => {
  const handleOnDragStart = (evt: DragEvent<ElementType>) => {
    if (options?.stopPropagation) {
      evt.stopPropagation()
    }

    if (options?.preventDefault) {
      evt.preventDefault()
    }

    const ghostImage = document.createElement('img')
    ghostImage.src = UseDragWithoutGhostNS.GHOST
    evt.dataTransfer.setDragImage(ghostImage, 0, 0)
    onDragStart?.(evt)
  }

  return handleOnDragStart
}
