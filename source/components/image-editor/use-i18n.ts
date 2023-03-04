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
): Required<UseImageEditorI18nNS.I18n> => {
  const i18n = globalI18ns?.imageEditor

  return {
    brightness: i18n?.brightness ?? 'Brightness',
    contrast: i18n?.contrast ?? 'Contrast',
    crop: i18n?.crop ?? 'Crop',
    hue: i18n?.hue ?? 'Hue',
    saturation: i18n?.saturation ?? 'Saturation',
    flipVertically: i18n?.flipVertically ?? 'Flip vertically',
    flipHorizontally: i18n?.flipHorizontally ?? 'Flip horizontally',
    rotateLeft: i18n?.rotateLeft ?? 'Rotate left',
    rotateRight: i18n?.rotateRight ?? 'Rotate right',
    cancelReset: i18n?.cancelReset ?? 'Cancel',
    confirmReset: i18n?.confirmReset ?? 'Yes',
    reset: i18n?.reset ?? 'Discard changes',
    resetMessage: i18n?.resetMessage ?? 'Are you sure to discard all changes?',
  }
}
