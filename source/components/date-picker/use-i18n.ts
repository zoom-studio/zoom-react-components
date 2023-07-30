import { type useZoomComponent } from '../../hooks'

export namespace UseDatePickerI18nNS {
  export interface I18n {
    noEventMessage?: string
    hour?: string
    minute?: string
    second?: string
  }
}

export const useDatePickerI18n = (
  globalI18ns: ReturnType<typeof useZoomComponent>['globalI18ns'],
  componentI18n?: UseDatePickerI18nNS.I18n,
): Required<UseDatePickerI18nNS.I18n> => {
  const i18n = globalI18ns?.datePicker

  return {
    noEventMessage:
      componentI18n?.noEventMessage ?? i18n?.noEventMessage ?? 'No event found for this day.',
    hour: componentI18n?.hour ?? i18n?.hour ?? 'Hour',
    minute: componentI18n?.minute ?? i18n?.minute ?? 'Minute',
    second: componentI18n?.second ?? i18n?.second ?? 'Second',
  }
}
