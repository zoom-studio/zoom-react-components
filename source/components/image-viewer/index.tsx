import React, {
  forwardRef,
  MouseEvent,
  ReactElement,
  ReactNode,
  useCallback,
  useRef,
  useState,
} from 'react'

import { classNames } from '@zoom-studio/zoom-js-ts-utils'
import { renderToString } from 'react-dom/server'
import { IReactToPrintProps, useReactToPrint } from 'react-to-print'
import { ReactZoomPanPinchRef, TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch'

import {
  Button,
  ButtonNS,
  Download,
  Icon,
  IconNS,
  Image,
  PopConfirm,
  PopoverNS,
  Portal,
  ScrollView,
  Text,
  Title,
  Tooltip,
} from '..'
import { BREAKPOINTS } from '../../constants'
import { useZoomComponent, useZoomContext } from '../../hooks'
import { BaseComponent } from '../../types'

import { UseImageViewerI18nNS, useImageViewerI18n } from './use-i18n'

export namespace ImageViewerNS {
  export interface ChildrenCallbackParams {
    openImageViewer: () => void
  }

  export type ZoomTypes = 'in' | 'out' | 'handy'
  export type NavigateTypes = 'forward' | 'backward'

  export interface Image {
    source: string
    name: string
  }

  export type I18n = UseImageViewerI18nNS.I18n

  export interface PrintSettings extends Omit<IReactToPrintProps, 'content' | 'onBeforePrint'> {
    content: (activeImage: Image) => ReactElement
  }

  export interface Props extends Omit<BaseComponent, 'children'> {
    children: (args: ChildrenCallbackParams) => ReactNode
    printSettings?: PrintSettings
    images: Image[]
    showPrint?: boolean
    showDownload?: boolean
    showDelete?: boolean
    showSlides?: boolean
    showName?: boolean
    showCounter?: boolean
    showZoomControls?: boolean
    defaultActiveImageIndex?: number
    confirmBeforeDelete?: boolean
    isDeleting?: boolean
    onWillPrint?: () => void
    onWillDownload?: () => void
    onWillZoom?: (type: ZoomTypes) => void
    onDelete?: () => void
    onWillNavigate?: (type: NavigateTypes) => void
    onWillClose?: () => void
    onWillDoubleClick?: () => void
    i18n?: I18n
  }
}

export const ImageViewer = forwardRef<HTMLDivElement, ImageViewerNS.Props>(
  (
    {
      i18n: componentI18n,
      showDelete = true,
      showDownload = true,
      showPrint = true,
      showSlides = true,
      showCounter = true,
      showName = true,
      showZoomControls = true,
      confirmBeforeDelete = true,
      defaultActiveImageIndex = 0,
      printSettings,
      images,
      children,
      containerProps,
      onWillPrint,
      onDelete,
      onWillZoom,
      onWillDownload,
      onWillNavigate,
      onWillClose,
      onWillDoubleClick,
      isDeleting,
      className,
      ...rest
    },
    reference,
  ) => {
    const MAXIMUM_ZOOM_SCALE = 8

    const slidesContainerRef = useRef<HTMLDivElement>(null)
    const { createClassName, globalI18ns } = useZoomComponent('image-viewer')
    const { isRTL } = useZoomContext()
    const [isOpen, setIsOpen] = useState(false)
    const [activeImageIndex, setActiveImageIndex] = useState(defaultActiveImageIndex)
    const [isLoadingPrint, setIsLoadingPrint] = useState(false)

    const i18n = useImageViewerI18n(globalI18ns, componentI18n)

    const utilityButtonsPopoverPlacement: PopoverNS.Placement = isRTL ? 'top-end' : 'top-start'

    const getImageToBePrinted = useCallback(() => {
      const { name, source } = images[activeImageIndex]
      const content = document.createElement('div')
      content.innerHTML = renderToString(
        printSettings?.content ? (
          printSettings.content({ name, source })
        ) : (
          <div className="print-image-container">
            <p>{name}</p>
            <img src={source} />
          </div>
        ),
      )
      return content
    }, [activeImageIndex])

    const handlePrint = useReactToPrint({
      ...printSettings,
      content: getImageToBePrinted,
      onBeforePrint: onWillPrint,
      onAfterPrint: () => {
        printSettings?.onAfterPrint?.()
        setIsLoadingPrint(false)
      },
    })

    const classes = createClassName(className)

    const controllerGroupClasses = (otherClasses?: string) => {
      return classNames('controller-group', {
        [otherClasses || '']: !!otherClasses,
      })
    }

    const imageSlideClasses = (imageIndex: number): string => {
      return createClassName('', 'slide', {
        active: imageIndex === activeImageIndex,
      })
    }

    const handleOpen = (): void => {
      setIsOpen(true)
      addEventListener('keydown', handleKeyboardShortcuts)
      setTimeout(() => handleOnNavigationDone(activeImageIndex), 500)
    }

    const handleClose = (evt?: MouseEvent<HTMLButtonElement>): void => {
      evt?.stopPropagation()
      onWillClose?.()
      setIsOpen(false)
      removeEventListener('keydown', handleKeyboardShortcuts)
    }

    const handleOnDoubleClick = (
      evt: MouseEvent<HTMLDivElement>,
      currentScale: number,
      centerView: ReactZoomPanPinchRef['centerView'],
      resetTransform: ReactZoomPanPinchRef['resetTransform'],
    ) => {
      const doubleClickedElement = evt.target as HTMLDivElement | null

      if (doubleClickedElement?.classList.contains('react-transform-component')) {
        onWillDoubleClick?.()

        if (currentScale === 1) {
          centerView(2.5)
        } else {
          resetTransform()
        }
      }
    }

    const handlePrintImage = () => {
      setIsLoadingPrint(true)
      handlePrint()
    }

    const handleNavigate = (type: ImageViewerNS.NavigateTypes) => (): void => {
      setActiveImageIndex(currentIndex => {
        switch (type) {
          case 'forward': {
            const nextIndex = currentIndex + 1
            if (nextIndex >= images.length) {
              return currentIndex
            }
            onWillNavigate?.(type)
            handleOnNavigationDone(nextIndex)
            return nextIndex
          }
          case 'backward': {
            const nextIndex = currentIndex - 1
            if (nextIndex <= 0) {
              return 0
            }
            onWillNavigate?.(type)
            handleOnNavigationDone(nextIndex)
            return nextIndex
          }
        }
      })
    }

    const handleOnNavigationDone = (activeImageIndex: number) => {
      activeImageIndex++

      const { current: slidesContainer } = slidesContainerRef
      if (!slidesContainer) {
        return null
      }

      const imageSlide: HTMLDivElement | null = slidesContainer.querySelector(
        `div[tabindex="${activeImageIndex}"]`,
      )
      imageSlide?.focus()
    }

    const handleSetActiveImageIndex = (
      index: number,
      centerView: ReactZoomPanPinchRef['centerView'],
    ): void => {
      setActiveImageIndex(index)
      setTimeout(() => centerView?.(1), 500)
    }

    const handleOnImageChange = ({ resetTransform, centerView }: ReactZoomPanPinchRef) => {
      resetTransform()
      centerView(1)
    }

    const handleKeyboardShortcuts = (evt: KeyboardEvent) => {
      evt.preventDefault()

      switch (evt.key) {
        case 'ArrowRight': {
          handleNavigate(isRTL ? 'backward' : 'forward')()
          break
        }
        case 'ArrowLeft': {
          handleNavigate(isRTL ? 'forward' : 'backward')()
          break
        }
        case 'Escape': {
          handleClose()
          break
        }
      }
    }

    const handleZoom = (
      type: ImageViewerNS.ZoomTypes,
      zoom: ReactZoomPanPinchRef['zoomIn'] | ReactZoomPanPinchRef['zoomOut'],
    ) => {
      onWillZoom?.(type)
      zoom()
    }

    const getHandlerButtonProps = (iconName: IconNS.Names): ButtonNS.Props => ({
      type: 'text',
      size: 'large',
      className: 'image-viewer-handler',
      shape: 'square',
      prefixMaterialIcon: iconName,
    })

    const getUtilButtonProps = (iconName: IconNS.Names, isLoading?: boolean): ButtonNS.Props => ({
      type: 'text',
      size: 'large',
      className: 'image-viewer-util',
      shape: isLoading ? 'default' : 'square',
      prefixMaterialIcon: iconName,
      loading: isLoading,
    })

    const renderNavigatorHandler = (type: ImageViewerNS.NavigateTypes): ReactNode => {
      if (images.length <= 1) {
        return <></>
      }

      if (!isRTL) {
        type = type === 'forward' ? 'backward' : 'forward'
      }

      const classes = classNames('navigator', {
        [type]: true,
        disabled:
          type === 'forward' ? activeImageIndex >= images.length - 1 : activeImageIndex <= 0,
      })

      return (
        <div className={classes} onClick={handleNavigate(type)}>
          <Icon name={type === 'forward' ? 'chevron_left' : 'chevron_right'} flipOn="ltr" />
        </div>
      )
    }

    return (
      <>
        <Portal>
          {isOpen && (
            <TransformWrapper
              centerZoomedOut
              doubleClick={{ disabled: true }}
              onInit={handleOnImageChange}
              maxScale={MAXIMUM_ZOOM_SCALE}
              onZoomStart={() => onWillZoom?.('handy')}
            >
              {({ zoomIn, zoomOut, state, resetTransform, centerView }) => (
                <div {...rest} {...containerProps} ref={reference} className={classes}>
                  <div className="header">
                    <Title h5 className="image-name">
                      {showName && images[activeImageIndex].name}
                    </Title>

                    <div className="handlers">
                      <div className={controllerGroupClasses()}>
                        <Tooltip title={i18n.closeTooltip} placement="bottom-end">
                          <Button {...getHandlerButtonProps('close')} onClick={handleClose} />
                        </Tooltip>
                      </div>

                      {showZoomControls && (
                        <div className={controllerGroupClasses('zoom-controllers')}>
                          <Tooltip title={i18n.zoomOutTooltip} placement="bottom-end">
                            <Button
                              {...getHandlerButtonProps('remove_circle_outline')}
                              onClick={() => handleZoom('out', zoomOut)}
                              disabled={state.scale <= 1}
                            />
                          </Tooltip>

                          <Tooltip title={i18n.zoomInTooltip} placement="bottom-end">
                            <Button
                              {...getHandlerButtonProps('add_circle_outline')}
                              onClick={() => handleZoom('in', zoomIn)}
                              disabled={state.scale >= MAXIMUM_ZOOM_SCALE}
                            />
                          </Tooltip>
                        </div>
                      )}
                    </div>
                  </div>

                  <div
                    className="body"
                    onDoubleClick={evt =>
                      handleOnDoubleClick(evt, state.scale, centerView, resetTransform)
                    }
                  >
                    {renderNavigatorHandler('forward')}

                    <TransformComponent key={activeImageIndex}>
                      <img src={images[activeImageIndex].source} className="opened-image" />
                    </TransformComponent>

                    {renderNavigatorHandler('backward')}
                  </div>

                  <div className="footer">
                    <div className="utilities">
                      {showDownload && (
                        <Download
                          link={images[activeImageIndex].source}
                          fileName={images[activeImageIndex].name}
                          onWillDownload={onWillDownload}
                        >
                          {({ startDownload, isDownloading }) => (
                            <Tooltip
                              title={i18n.downloadTooltip}
                              placement={utilityButtonsPopoverPlacement}
                            >
                              <Button
                                {...getUtilButtonProps('file_download', isDownloading)}
                                onClick={startDownload}
                              />
                            </Tooltip>
                          )}
                        </Download>
                      )}

                      {showPrint && (
                        <Tooltip
                          title={i18n.printTooltip}
                          placement={utilityButtonsPopoverPlacement}
                        >
                          <Button
                            {...getUtilButtonProps('print', isLoadingPrint)}
                            onClick={handlePrintImage}
                          />
                        </Tooltip>
                      )}

                      {showDelete && onDelete && (
                        <Tooltip
                          title={i18n.deleteTooltip}
                          placement={utilityButtonsPopoverPlacement}
                        >
                          {confirmBeforeDelete ? (
                            <PopConfirm
                              title={i18n.deletePopConfirmTitle}
                              description={i18n.deletePopConfirmDescription}
                              confirm={{
                                children: i18n.deletePopConfirmSubmitButton,
                                onClick: onDelete,
                              }}
                              cancel={{ children: i18n.deletePopConfirmCancelButton }}
                              placement={utilityButtonsPopoverPlacement}
                              buttonProps={{ ...getUtilButtonProps('delete', isDeleting) }}
                            />
                          ) : (
                            <Button
                              {...getUtilButtonProps('delete', isDeleting)}
                              onClick={onDelete}
                            />
                          )}
                        </Tooltip>
                      )}
                    </div>

                    <div className="images-slider-container">
                      {showSlides && images.length > 1 && (
                        <div className="slides-container" ref={slidesContainerRef}>
                          <ScrollView className="slides" autoHide maxHeight="unset">
                            {images.map((image, index) => (
                              <div
                                key={index}
                                tabIndex={index + 1}
                                className={imageSlideClasses(index)}
                                onClick={() => handleSetActiveImageIndex(index, centerView)}
                              >
                                <Image
                                  src={image.source}
                                  className="slide"
                                  lazy={false}
                                  width={window.innerWidth <= BREAKPOINTS.md ? 30 : 48}
                                  shape="square"
                                />
                              </div>
                            ))}
                          </ScrollView>
                        </div>
                      )}
                    </div>

                    {showCounter && images.length > 1 && (
                      <Text className="counter" large>
                        {activeImageIndex + 1}/{images.length}
                      </Text>
                    )}
                  </div>
                </div>
              )}
            </TransformWrapper>
          )}
        </Portal>

        {children({ openImageViewer: handleOpen })}
      </>
    )
  },
)
