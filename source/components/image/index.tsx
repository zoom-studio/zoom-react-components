import React, {
  FC,
  HTMLAttributes,
  ImgHTMLAttributes,
  MouseEvent,
  SyntheticEvent,
  useState,
} from 'react'

import { ConditionalWrapper, Icon, ImageViewer, ImageViewerNS, Skeleton } from '..'
import { logs } from '../../constants'
import { useZoomComponent } from '../../hooks'

export namespace ImageNS {
  export const Shapes = [
    'default',
    'sharp',
    'sharp-square',
    'square',
    'semi-circle',
    'circle',
  ] as const
  export type Shapes = typeof Shapes[number]

  export interface Props
    extends Omit<
      ImgHTMLAttributes<HTMLImageElement>,
      'loading' | 'src' | 'alt' | 'width' | 'height'
    > {
    src: string
    name?: string
    lazy?: boolean
    alt?: string
    width?: string | number
    height?: string | number
    withImageViewer?: boolean
    imageViewerOpenerIconSize?: string | number
    imageViewerCustomImages?: ImageViewerNS.Image[]
    shape?: Shapes
    imageViewerProps?: Omit<ImageViewerNS.Props, 'images'>
    containerProps?: HTMLAttributes<HTMLPictureElement>
  }
}

export const Image: FC<ImageNS.Props> = ({
  containerProps: providedContainerProps,
  imageViewerOpenerIconSize = 80,
  lazy = true,
  width = '100%',
  shape = 'default',
  name,
  withImageViewer,
  height,
  src,
  imageViewerCustomImages,
  alt,
  ...rest
}) => {
  const squarishShapes: ImageNS.Shapes[] = ['circle', 'semi-circle', 'sharp-square', 'square']

  if (squarishShapes.includes(shape)) {
    height = width
  }

  const { createClassName, sendLog } = useZoomComponent('image')
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  const containerClasses = createClassName(providedContainerProps?.className, '', {
    loading: isLoading,
    errored: hasError,
    [createClassName('', shape)]: true,
  })

  const handleOnLoad = (evt: SyntheticEvent<HTMLImageElement>) => {
    rest.onLoad?.(evt)
    setIsLoading(false)
    setHasError(false)
  }

  const handleOnError = (evt: SyntheticEvent<HTMLImageElement>) => {
    sendLog(logs.imageNotLoaded, `Image source: ${src}`)
    setIsLoading(false)
    setHasError(true)
    rest.onError?.(evt)
  }

  const handleOnClick = (evt: MouseEvent<HTMLImageElement>) => {
    rest.onClick?.(evt)
  }

  const containerProps: HTMLAttributes<HTMLPictureElement> = {
    style: { width, height },
    ...providedContainerProps,
    className: containerClasses,
  }

  return (
    <ConditionalWrapper
      condition={withImageViewer}
      falseWrapper={children => <picture {...containerProps}>{children}</picture>}
      trueWrapper={children => (
        <ImageViewer
          images={imageViewerCustomImages ?? [{ name: name ?? alt ?? src, source: src }]}
        >
          {({ openImageViewer }) => (
            <picture {...containerProps} onClick={openImageViewer}>
              {children}

              {!isLoading && !hasError && (
                <span className="image-viewer-opener">
                  <Icon name="image_search" style={{ fontSize: imageViewerOpenerIconSize }} />
                </span>
              )}
            </picture>
          )}
        </ImageViewer>
      )}
    >
      <img
        loading={lazy ? 'lazy' : 'eager'}
        alt={alt}
        onLoad={handleOnLoad}
        onError={handleOnError}
        onClick={handleOnClick}
        src={src}
        {...rest}
      />

      {isLoading ? (
        <Skeleton.Image customSize={{ width, height }} />
      ) : (
        hasError && (
          <Skeleton.Image
            customSize={{ width, height }}
            icon="image_not_supported"
            animated={false}
            iconSize="40px"
          />
        )
      )}
    </ConditionalWrapper>
  )
}
