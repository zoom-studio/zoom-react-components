import React, { forwardRef, MutableRefObject, useEffect, useRef, useState } from 'react'

import AvatarEditorComponent, {
  ImageState as AvatarEditorAvatarState,
  Position,
} from 'react-avatar-editor'

import { Button, ButtonNS, IconNS, RangeSlider, RangeSliderNS, Skeleton } from '..'
import { useVariable, useZoomComponent } from '../../hooks'
import { BaseComponent } from '../../types'
import { CanvasUtils, color, FileUtils } from '../../utils'

export namespace AvatarEditorNS {
  export enum RotateDir {
    left,
    right,
  }

  export interface Size {
    width: number
    height: number
  }

  export type BorderColor = [number, number, number, number?]

  export type CrossOrigin = 'anonymous' | 'use-credentials'

  export interface AvatarState extends Omit<AvatarEditorAvatarState, 'resource'> {
    backgroundColor: string
    resource: HTMLImageElement
  }

  export interface ResultType {
    blobURL: string
    file: File
    base64: string
  }

  export type GetResult = () => Promise<ResultType | null>

  export interface Props extends Omit<BaseComponent, 'children'> {
    src: string
    borderRadius?: number
    borderColor?: BorderColor
    borderWidth?: number
    size?: number | Size
    defaultScale?: number
    allowScaleOut?: boolean
    minScaleOut?: number
    maxScale?: number
    scaleStep?: number
    rotateStep?: number
    noBounds?: boolean
    crossOrigin?: CrossOrigin
    getResultRef?: MutableRefObject<GetResult | null | undefined>
    onGettingResultStart?: () => void
    onGettingResultEnd?: () => void
    fitCanvasSize?: boolean
    loading?: boolean
  }
}

export const AvatarEditor = forwardRef<HTMLDivElement, AvatarEditorNS.Props>(
  (
    {
      size: providedSize = 250,
      borderRadius = 2000,
      borderColor = [0, 0, 0, 0.8],
      borderWidth = 6,
      defaultScale = 1,
      allowScaleOut = true,
      minScaleOut = 0.1,
      maxScale = 6,
      scaleStep = 0.1,
      rotateStep = 90,
      crossOrigin = 'anonymous',
      fitCanvasSize = true,
      loading,
      noBounds,
      className,
      containerProps,
      getResultRef,
      onGettingResultEnd,
      onGettingResultStart,
      src,
      ...rest
    },
    providedRef,
  ) => {
    const containerRef = providedRef ?? useRef<HTMLDivElement | null>(null)

    const { createClassName } = useZoomComponent('avatar-editor')

    const editorRef = useRef<AvatarEditorComponent | null>(null)

    const [hasError, setHasError] = useState(false)
    const [avatarState, setAvatarState] = useState<AvatarEditorNS.AvatarState>()
    const [scale, setScale] = useState(defaultScale)
    const [rotate, setRotate] = useState(0)

    const isLoading = (!avatarState || loading) && !hasError

    const classes = createClassName(className, '', {
      [createClassName('', 'loading')]: !!isLoading,
    })

    const [canvasSize, setCanvasSize] = useState<AvatarEditorNS.Size>(() => {
      const sizes: AvatarEditorNS.Size =
        typeof providedSize === 'number'
          ? { height: providedSize, width: providedSize }
          : providedSize

      return sizes
    })

    const rangeSliderProps = useVariable<RangeSliderNS.Props>(() => {
      const min: number = allowScaleOut ? minScaleOut : 1

      return {
        min,
        max: maxScale,
        step: scaleStep,
        renderPopover: false,
        onWrite: setScale,
        masks: allowScaleOut ? { [min]: min, 1: 1, [maxScale]: maxScale } : undefined,
      }
    })

    const rotateTo = (dir: AvatarEditorNS.RotateDir): void => {
      setRotate(currentRotate => {
        if (dir === AvatarEditorNS.RotateDir.left) {
          return (currentRotate - rotateStep) % 360
        }
        return (currentRotate + rotateStep) % 360
      })
    }

    const getRotateButtonsProps = (dir: AvatarEditorNS.RotateDir): ButtonNS.Props => {
      const icon: IconNS.Names =
        dir === AvatarEditorNS.RotateDir.left ? 'rotate_left' : 'rotate_right'

      return {
        prefixMaterialIcon: icon,
        shape: 'square',
        onClick: () => rotateTo(dir),
        className: 'rotate-button',
        type: 'link',
        disabled: hasError,
      }
    }

    const handleSetAvatarScale = (scaleDirection: 'in' | 'out') => {
      setScale(currentScale => {
        if (scaleDirection === 'in') {
          const newScale = currentScale + scaleStep
          if (newScale <= maxScale) {
            return newScale
          }
          return currentScale
        }
        const newScale = currentScale - scaleStep
        const minAllowedScale = allowScaleOut ? minScaleOut : 1
        if (newScale >= minAllowedScale) {
          return newScale
        }
        return currentScale
      })
    }

    const getContainerRef = (): HTMLDivElement | null => {
      if (typeof containerRef === 'function') {
        return null
      }
      return containerRef.current
    }

    const handleOnCanvasWheel = (evt: WheelEvent) => {
      evt.preventDefault()
      handleSetAvatarScale(evt.deltaY < 0 ? 'in' : 'out')
    }

    const setWheelEventToCanvas = () => {
      const container = getContainerRef()
      if (container) {
        const canvas = container.querySelector('canvas')
        if (canvas) {
          canvas.addEventListener('wheel', handleOnCanvasWheel)
        }
      }
    }

    const handleOnLoadSuccess = (state: AvatarEditorAvatarState) => {
      setAvatarState(state as unknown as AvatarEditorNS.AvatarState)
      setHasError(false)
      setWheelEventToCanvas()
    }

    const handleOnLoadFailure = () => {
      setAvatarState(undefined)
      setHasError(true)
    }

    const handleOnPositionChange = (position: Position) => {
      setAvatarState(currentAvatarState => {
        if (!currentAvatarState) {
          return currentAvatarState
        }
        return {
          ...currentAvatarState,
          ...position,
        }
      })
    }

    const handleGetResult: AvatarEditorNS.GetResult = async () => {
      const { current: editor } = editorRef
      if (!editor) {
        return null
      }

      onGettingResultStart?.()
      const canvas = editor.getImageScaledToCanvas()
      const base64 = canvas.toDataURL()
      const blobURL = await CanvasUtils.toBlobURL(canvas)
      const file = await FileUtils.Base64ToFile(base64)
      onGettingResultEnd?.()

      return { base64, blobURL, file }
    }

    useEffect(() => {
      if (getResultRef) {
        getResultRef.current = handleGetResult
      }
    }, [])

    useEffect(() => {
      const container = getContainerRef()
      if (container && fitCanvasSize) {
        const containerStyles = getComputedStyle(container)
        const containerWidth = parseInt(containerStyles.width) - 10
        setCanvasSize({ height: containerWidth, width: containerWidth })
      }
    }, [])

    return (
      <div {...rest} {...containerProps} ref={containerRef} className={classes}>
        <div className="canvas-container">
          {isLoading && <Skeleton.Image className="loading-skeleton" />}

          {hasError && (
            <Skeleton.Paper
              icon="broken_image"
              className="error-skeleton"
              animated={false}
              size={{ height: '100%', width: '100%' }}
            />
          )}

          <span
            className="canvas-background"
            style={{ backgroundImage: `url(${avatarState?.resource.src})` }}
          />

          <AvatarEditorComponent
            disableHiDPIScaling
            borderRadius={borderRadius}
            image={src}
            border={borderWidth}
            color={borderColor as number[]}
            scale={scale}
            rotate={rotate}
            backgroundColor={color({ source: 'layer', tone: 2 })}
            disableBoundaryChecks={noBounds}
            onLoadSuccess={handleOnLoadSuccess}
            onLoadFailure={handleOnLoadFailure}
            onPositionChange={handleOnPositionChange}
            ref={editorRef}
            crossOrigin={crossOrigin}
            style={canvasSize}
          />
        </div>

        <div className="editor-controls">
          <Button {...getRotateButtonsProps(AvatarEditorNS.RotateDir.left)} />

          <RangeSlider
            {...rangeSliderProps}
            value={scale}
            loading={isLoading}
            className="scale-slider"
            size="small"
            disabled={hasError}
          />

          <Button {...getRotateButtonsProps(AvatarEditorNS.RotateDir.right)} />
        </div>
      </div>
    )
  },
)
