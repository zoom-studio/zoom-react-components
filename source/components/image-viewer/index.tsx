import React, {
  FC,
  HTMLAttributes,
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
  Icon,
  IconNS,
  Image,
  PopConfirm,
  PopoverNS,
  ScrollView,
  Text,
  Title,
  Tooltip,
} from '..'
import { useZoomComponent, useZoomContext } from '../../hooks'

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

  export interface I18n {
    closeTooltip?: string
    zoomInTooltip?: string
    zoomOutTooltip?: string
    downloadTooltip?: string
    printTooltip?: string
    deleteTooltip?: string
    deletePopConfirmTitle: string
    deletePopConfirmDescription?: string
    deletePopConfirmSubmitButton?: string
    deletePopConfirmCancelButton?: string
  }

  export interface PrintSettings extends Omit<IReactToPrintProps, 'content' | 'onBeforePrint'> {
    content: (activeImage: Image) => ReactElement
  }

  export interface Props {
    children: (args: ChildrenCallbackParams) => ReactNode
    printSettings?: PrintSettings
    images: Image[]
    containerProps?: HTMLAttributes<HTMLDivElement>
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
  }
}

export const ImageViewer: FC<ImageViewerNS.Props> = ({
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
}) => {
  const MAXIMUM_ZOOM_SCALE = 8

  const slidesContainerRef = useRef<HTMLDivElement>(null)
  const { createClassName, globalI18ns: i18n } = useZoomComponent('image-viewer')
  const { isRTL } = useZoomContext()
  const [isOpen, setIsOpen] = useState(false)
  const [activeImageIndex, setActiveImageIndex] = useState(defaultActiveImageIndex)
  const [isLoadingPrint, setIsLoadingPrint] = useState(false)
  const [isDownloadingImage, setIsDownloadingImage] = useState(false)

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

  const classes = createClassName(containerProps?.className)

  const controllerGroupClasses = (otherClasses?: string) => {
    return classNames('controller-group', {
      [otherClasses || '']: !!otherClasses,
    })
  }

  const zoomInTooltip = i18n?.imageViewer?.zoomInTooltip ?? 'Zoom in'
  const closeTooltip = i18n?.imageViewer?.closeTooltip ?? 'Close'
  const printTooltip = i18n?.imageViewer?.printTooltip ?? 'Print image'
  const deleteTooltip = i18n?.imageViewer?.deleteTooltip ?? 'Delete image'
  const downloadTooltip = i18n?.imageViewer?.downloadTooltip ?? 'Download image'
  const zoomOutTooltip = i18n?.imageViewer?.zoomOutTooltip ?? 'Zoom out'
  const popConfirmTitle = i18n?.imageViewer?.deletePopConfirmTitle ?? 'Delete image'
  const popConfirmDiscard = i18n?.imageViewer?.deletePopConfirmCancelButton ?? 'Discard'
  const popConfirmSubmit = i18n?.imageViewer?.deletePopConfirmSubmitButton ?? 'Yes, delete'
  const popConfirmDescription =
    i18n?.imageViewer?.deletePopConfirmDescription ?? 'Are you sure to delete this image?'

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

  const handleClose = (): void => {
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

  const handleDownloadImage = async () => {
    onWillDownload?.()
    setIsDownloadingImage(true)
    const { source, name } = images[activeImageIndex]
    const image = await fetch(source)
    const imageBlob = await image.blob()
    const imageURL = URL.createObjectURL(imageBlob)
    const link = document.createElement('a')
    link.href = imageURL
    link.download = name
    link.click()
    setIsDownloadingImage(false)
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
      disabled: type === 'forward' ? activeImageIndex >= images.length - 1 : activeImageIndex <= 0,
    })

    return (
      <div className={classes} onClick={handleNavigate(type)}>
        <Icon name={type === 'forward' ? 'chevron_left' : 'chevron_right'} flipOn="ltr" />
      </div>
    )
  }

  return (
    <>
      {isOpen && (
        <TransformWrapper
          centerZoomedOut
          doubleClick={{ disabled: true }}
          onInit={handleOnImageChange}
          maxScale={MAXIMUM_ZOOM_SCALE}
          onZoomStart={() => onWillZoom?.('handy')}
        >
          {({ zoomIn, zoomOut, state, resetTransform, centerView }) => (
            <div className={classes}>
              <div className="header">
                <Title h5 className="image-name">
                  {showName && images[activeImageIndex].name}
                </Title>

                <div className="handlers">
                  <div className={controllerGroupClasses()}>
                    <Tooltip title={closeTooltip} placement="bottom-end">
                      <Button {...getHandlerButtonProps('close')} onClick={handleClose} />
                    </Tooltip>
                  </div>

                  {showZoomControls && (
                    <div className={controllerGroupClasses('zoom-controllers')}>
                      <Tooltip title={zoomOutTooltip} placement="bottom-end">
                        <Button
                          {...getHandlerButtonProps('remove_circle_outline')}
                          onClick={() => handleZoom('out', zoomOut)}
                          disabled={state.scale <= 1}
                        />
                      </Tooltip>

                      <Tooltip title={zoomInTooltip} placement="bottom-end">
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
                    <Tooltip title={downloadTooltip} placement={utilityButtonsPopoverPlacement}>
                      <Button
                        {...getUtilButtonProps('file_download', isDownloadingImage)}
                        onClick={handleDownloadImage}
                      />
                    </Tooltip>
                  )}

                  {showPrint && (
                    <Tooltip title={printTooltip} placement={utilityButtonsPopoverPlacement}>
                      <Button
                        {...getUtilButtonProps('print', isLoadingPrint)}
                        onClick={handlePrintImage}
                      />
                    </Tooltip>
                  )}

                  {showDelete && onDelete && (
                    <Tooltip title={deleteTooltip} placement={utilityButtonsPopoverPlacement}>
                      {confirmBeforeDelete ? (
                        <PopConfirm
                          title={popConfirmTitle}
                          description={popConfirmDescription}
                          confirm={{ children: popConfirmSubmit, onClick: onDelete }}
                          cancel={{ children: popConfirmDiscard }}
                          placement={utilityButtonsPopoverPlacement}
                          buttonProps={{ ...getUtilButtonProps('delete', isDeleting) }}
                        />
                      ) : (
                        <Button {...getUtilButtonProps('delete', isDeleting)} onClick={onDelete} />
                      )}
                    </Tooltip>
                  )}
                </div>

                <div className="images-slider-container">
                  {showSlides && images.length > 1 && (
                    <div className="slides-container" ref={slidesContainerRef}>
                      <ScrollView className="slides" autoHide>
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
                              containerProps={{ className: 'slide' }}
                              lazy={false}
                              width={48}
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

      {children({ openImageViewer: handleOpen })}
    </>
  )
}
