import React, {
  forwardRef,
  type HTMLAttributes,
  type MouseEvent,
  type SyntheticEvent,
  useState,
} from 'react'

import { ConditionalWrapper, Icon, ImageViewer, type ImageViewerNS, Skeleton } from '..'
import { logs } from '../../constants'
import { useZoomComponent } from '../../hooks'
import { type BaseComponent } from '../../types'

export namespace ImageNS {
  export const Shapes = [
    'default',
    'sharp',
    'sharp-square',
    'square',
    'semi-circle',
    'circle',
  ] as const
  export type Shapes = (typeof Shapes)[number]

  export interface Props extends BaseComponent<HTMLImageElement> {
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
    imageViewerProps?: Omit<ImageViewerNS.Props, 'images' | 'children'>
    erroredStateIconFontSize?: string
    onOpenImageViewerClick?: (evt: MouseEvent<HTMLPictureElement>) => void
    imageProps?: HTMLAttributes<HTMLImageElement>
  }
}

export const Image = forwardRef<HTMLImageElement, ImageNS.Props>(
  (
    {
      containerProps: providedContainerProps,
      imageViewerOpenerIconSize = 80,
      lazy = true,
      width = '100%',
      shape = 'default',
      erroredStateIconFontSize = '40px',
      name,
      withImageViewer,
      height,
      src,
      imageViewerCustomImages,
      alt,
      className,
      imageViewerProps,
      onClick,
      children,
      onOpenImageViewerClick,
      imageProps,
      ...rest
    },
    reference,
  ) => {
    const squarishShapes: ImageNS.Shapes[] = ['circle', 'semi-circle', 'sharp-square', 'square']

    if (squarishShapes.includes(shape)) {
      height = width
    }

    const { createClassName, sendLog } = useZoomComponent('image')
    const [isLoading, setIsLoading] = useState(true)
    const [hasError, setHasError] = useState(false)

    const containerClasses = createClassName(className, '', {
      loading: isLoading,
      errored: hasError,
      [createClassName('', shape)]: true,
    })

    const handleOnLoad = (evt: SyntheticEvent<HTMLImageElement>) => {
      providedContainerProps?.onLoad?.(evt)
      setIsLoading(false)
      setHasError(false)
    }

    const handleOnError = (evt: SyntheticEvent<HTMLImageElement>) => {
      sendLog(logs.imageNotLoaded, `Image source: ${src}`)
      setIsLoading(false)
      setHasError(true)
      providedContainerProps?.onError?.(evt)
    }

    const handleOnClick = (evt: MouseEvent<HTMLImageElement>) => {
      onClick?.(evt)
    }

    const containerProps: HTMLAttributes<HTMLPictureElement> = {
      style: { width, height },
      ...providedContainerProps,
      className: containerClasses,
    }

    const handleOnOpenImageViewer =
      (openImageViewer: () => void) => (evt: MouseEvent<HTMLPictureElement>) => {
        onOpenImageViewerClick?.(evt)
        openImageViewer()
      }

    return (
      <ConditionalWrapper
        condition={withImageViewer}
        falseWrapper={children => (
          <picture {...containerProps} ref={reference}>
            {children}
          </picture>
        )}
        trueWrapper={children => (
          <ImageViewer
            {...imageViewerProps}
            images={imageViewerCustomImages ?? [{ name: name ?? alt ?? src, source: src }]}
          >
            {({ openImageViewer }) => (
              <picture
                {...containerProps}
                ref={reference}
                onClick={handleOnOpenImageViewer(openImageViewer)}
              >
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
          {...imageProps}
          {...rest}
          loading={lazy ? 'lazy' : 'eager'}
          alt={alt}
          onLoad={handleOnLoad}
          onError={handleOnError}
          onClick={handleOnClick}
          src={src}
        />

        {children}

        {isLoading ? (
          <Skeleton.Image customSize={{ width, height }} />
        ) : (
          hasError && (
            <Skeleton.Image
              customSize={{ width, height }}
              icon="image_not_supported"
              animated={false}
              iconSize={erroredStateIconFontSize}
            />
          )
        )}
      </ConditionalWrapper>
    )
  },
)
