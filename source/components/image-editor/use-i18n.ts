import { useZoomComponent } from '../../hooks'

export namespace UseImageEditorI18nNS {
  export interface I18n {
    saturation?: string
    crop?: string
    brightness?: string
    contrast?: string
    hue?: string
    flipVertically?: string
    flipHorizontally?: string
    rotateRight?: string
    rotateLeft?: string
    reset?: string
    resetMessage?: string
    confirmReset?: string
    cancelReset?: string
  }
}

export const useImageEditorI18n = (
  globalI18ns: ReturnType<typeof useZoomComponent>['globalI18ns'],
  componentI18n?: UseImageEditorI18nNS.I18n,
): Required<UseImageEditorI18nNS.I18n> => {
  const i18n = globalI18ns?.imageEditor

  return {
    brightness: componentI18n?.brightness ?? i18n?.brightness ?? 'Brightness',
    contrast: componentI18n?.contrast ?? i18n?.contrast ?? 'Contrast',
    crop: componentI18n?.crop ?? i18n?.crop ?? 'Crop',
    hue: componentI18n?.hue ?? i18n?.hue ?? 'Hue',
    saturation: componentI18n?.saturation ?? i18n?.saturation ?? 'Saturation',
    flipVertically: componentI18n?.flipVertically ?? i18n?.flipVertically ?? 'Flip vertically',
    flipHorizontally:
      componentI18n?.flipHorizontally ?? i18n?.flipHorizontally ?? 'Flip horizontally',
    rotateLeft: componentI18n?.rotateLeft ?? i18n?.rotateLeft ?? 'Rotate left',
    rotateRight: componentI18n?.rotateRight ?? i18n?.rotateRight ?? 'Rotate right',
    cancelReset: componentI18n?.cancelReset ?? i18n?.cancelReset ?? 'Cancel',
    confirmReset: componentI18n?.confirmReset ?? i18n?.confirmReset ?? 'Yes',
    reset: componentI18n?.reset ?? i18n?.reset ?? 'Discard changes',
    resetMessage:
      componentI18n?.resetMessage ?? i18n?.resetMessage ?? 'Are you sure to discard all changes?',
  }
}
