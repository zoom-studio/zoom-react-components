import React, {
  type ComponentProps,
  forwardRef,
  type MutableRefObject,
  useRef,
  useState,
} from 'react'

import {
  base64ToFile,
  canvasToBlobURL,
  classNames,
  useObjectedState,
} from '@zoom-studio/zoom-js-ts-utils'
import {
  CircleStencil,
  Cropper,
  CropperPreview,
  type CropperPreviewRef,
  type CropperRef,
  type CropperState,
  type RawAspectRatio,
  RectangleStencil,
  SimpleHandler,
} from 'react-advanced-cropper'

import { Skeleton } from '..'
import { useZoomComponent } from '../../hooks'
import { type BaseComponent } from '../../types'

import { logs } from '../../constants'
import { RangeSlider } from '../range-slider'
import { AdjustableCropperBackground } from './adjustable-cropper-bg'
import { AdjustablePreviewBackground } from './adjustable-preview-bg'
import { EditorActions } from './editor-actions'
import { ResetChanges } from './reset-changes'
import { useImageEditorI18n, type UseImageEditorI18nNS } from './use-i18n'
import { getHandlers, requireDefaultAdjustments } from './utils'

export namespace ImageEditorNS {
  export const EditorMode = ['crop', 'saturation', 'brightness', 'contrast', 'hue'] as const
  export type EditorMode = (typeof EditorMode)[number]

  export const Flip = ['flipVertically', 'flipHorizontally'] as const
  export type Flip = (typeof Flip)[number]

  export const Rotate = ['rotateRight', 'rotateLeft'] as const
  export type Rotate = (typeof Rotate)[number]

  export type I18n = UseImageEditorI18nNS.I18n

  export type Filter = Exclude<EditorMode, 'crop'>

  export type Handlers = ComponentProps<typeof CircleStencil>['handlers'] | boolean

  export type Adjustments = {
    [key in Filter]: number
  }

  export type Flips = {
    [keu in Flip]?: boolean
  }

  export interface ResultType {
    blobURL: string
    file: File
    base64: string
  }

  export type GetResult = () => Promise<ResultType | undefined>

  export const DEFAULT_ADJUSTMENTS: Adjustments = {
    brightness: 0,
    hue: 0,
    saturation: 0,
    contrast: 0,
  }

  export interface Props extends Omit<BaseComponent, 'children'> {
    src: string
    circleStencil?: boolean
    aspectRatio?: RawAspectRatio
    grid?: boolean
    confirmBeforeReset?: boolean
    showPreview?: boolean
    getResultRef?: MutableRefObject<GetResult | null | undefined>
    onGettingResultStart?: () => void
    onGettingResultEnd?: () => void
    showReset?: boolean
    defaultAdjustments?: Partial<Adjustments>
    defaultRotation?: number
    defaultFlips?: Flips
    loading?: boolean
    disabled?: boolean
    i18n?: I18n
  }
}

export const ImageEditor = forwardRef<HTMLDivElement, ImageEditorNS.Props>(
  (
    {
      i18n: componentI18n,
      defaultAdjustments = ImageEditorNS.DEFAULT_ADJUSTMENTS,
      grid = true,
      confirmBeforeReset = true,
      showPreview = true,
      showReset = true,
      className,
      containerProps,
      src,
      circleStencil,
      aspectRatio,
      defaultFlips,
      defaultRotation,
      loading,
      getResultRef,
      disabled,
      onGettingResultEnd,
      onGettingResultStart,
      ...rest
    },
    reference,
  ) => {
    const cropperRef = useRef<CropperRef>(null)
    const previewRef = useRef<CropperPreviewRef>(null)

    const { createClassName, globalI18ns, sendLog } = useZoomComponent('image-editor')

    const i18n = useImageEditorI18n(globalI18ns, componentI18n)

    const cropperState = useObjectedState<CropperState>()
    const mode = useObjectedState<ImageEditorNS.EditorMode>('crop')
    const [adjustments, setAdjustments] = useState(requireDefaultAdjustments(defaultAdjustments))
    const [hasError, setHasError] = useState(false)

    const getAdjustments = (): ImageEditorNS.Adjustments => {
      return {
        brightness: adjustments.brightness / 100,
        contrast: adjustments.contrast / 100,
        hue: adjustments.hue / 100,
        saturation: adjustments.saturation / 100,
      }
    }

    const isLoading = hasError ? false : !!cropperRef.current?.isLoading() || !!loading
    const isOnCropMode = mode.val === 'crop'
    const isAnyFilterApplied = Object.values(adjustments).some(value => Math.floor(value * 100))
    const transforms = cropperState.val?.transforms
    const isChanged =
      transforms?.flip.horizontal ||
      transforms?.flip.vertical ||
      (transforms?.rotate ?? 0) % 360 !== 0

    const classes = createClassName(className, '', {
      disabled: !!disabled,
    })
    const overlayClassName = classNames('cropper-overlay', {
      faded: !isOnCropMode,
    })
    const previewClasses = classNames('editor-preview', {
      circular: circleStencil,
    })

    const handleGetResult: ImageEditorNS.GetResult = async () => {
      const { current: cropper } = cropperRef

      if (!cropper) {
        sendLog(logs.imageEditorNotFoundCropperRef, 'handleGetResult fn')
        return
      }

      onGettingResultStart?.()
      const canvas = cropper.getCanvas()
      if (!canvas) {
        sendLog(logs.imageEditorNotFoundCanvasElement, 'handleGetResult fn')
        return
      }

      const base64 = canvas.toDataURL()
      const blobURL = await canvasToBlobURL(canvas)
      const file = await base64ToFile(base64)
      onGettingResultEnd?.()
      return { base64, blobURL, file }
    }

    const handleOnUpdate = () => {
      previewRef.current?.refresh()

      if (getResultRef) {
        getResultRef.current = handleGetResult
      }

      if (cropperRef.current) {
        cropperState.set(cropperRef.current.getState()!)
      }
    }

    const handleOnRangeControlWrite = (value: number) => {
      setAdjustments(currentAdjustments => ({
        ...currentAdjustments,
        [mode.val as ImageEditorNS.Filter]: value,
      }))
    }

    return (
      <div {...rest} {...containerProps} ref={reference} className={classes}>
        <div className="canvas-container">
          {(isLoading || hasError) && (
            <Skeleton.Paper
              icon={isLoading ? 'image' : 'broken_image'}
              animated={!hasError}
              className="image-skeleton"
              size={{ height: '100%', width: '100%' }}
            />
          )}

          <Cropper
            src={src}
            ref={cropperRef}
            stencilComponent={circleStencil ? CircleStencil : RectangleStencil}
            backgroundComponent={AdjustableCropperBackground}
            onUpdate={handleOnUpdate}
            backgroundProps={getAdjustments()}
            onError={() => {
              setHasError(true)
            }}
            onReady={() => {
              setHasError(false)
            }}
            stencilProps={{
              grid,
              aspectRatio,
              overlayClassName,
              movable: isOnCropMode && !disabled,
              resizable: isOnCropMode && !disabled,
              lines: isOnCropMode,
              handlerComponent: SimpleHandler,
              handlers: getHandlers(isOnCropMode, aspectRatio),
            }}
            backgroundWrapperProps={{
              scaleImage: isOnCropMode,
              moveImage: isOnCropMode,
            }}
          />

          {mode.val !== 'crop' && (
            <div className="range-control">
              <RangeSlider
                size="small"
                min={-100}
                max={100}
                key={mode.val}
                step={1}
                value={adjustments[mode.val!]}
                onWrite={handleOnRangeControlWrite}
                masks={{ 0: '0', [-100]: '-100', 100: '100' }}
              />
            </div>
          )}

          {(isChanged || isAnyFilterApplied) && showReset && (
            <ResetChanges
              cropperRef={cropperRef}
              i18n={i18n}
              sendLog={sendLog}
              setAdjustments={setAdjustments}
              confirmBeforeReset={!!confirmBeforeReset}
              defaultAdjustments={ImageEditorNS.DEFAULT_ADJUSTMENTS}
              disabled={!!disabled}
            />
          )}
        </div>

        {showPreview && (
          <CropperPreview
            className={previewClasses}
            ref={previewRef}
            cropper={cropperRef}
            backgroundComponent={AdjustablePreviewBackground}
            backgroundProps={getAdjustments()}
          />
        )}

        <EditorActions
          i18n={i18n}
          mode={mode}
          cropperRef={cropperRef}
          sendLog={sendLog}
          defaultFlips={defaultFlips}
          defaultRotation={defaultRotation}
          disabled={isLoading || hasError || !!disabled}
          loading={isLoading}
        />
      </div>
    )
  },
)
