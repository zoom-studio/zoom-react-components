import { FATranslations } from './fa'

export const ENTranslations: typeof FATranslations = {
  global: {
    states: {
      neutral: 'A state in which it is neutral',
      success: 'A state that indicates success',
      info: 'A state that indicates some info',
      warning: 'A state that indicates a warning',
      error: 'A state that indicates an error',
    },
  },

  dialog: {
    open: 'Open dialog',
    openSizeOf: {
      small: 'Open small dialog',
      normal: 'Open normal dialog',
      large: 'Open large dialog',
    },
    actions: {
      addCategory: 'Add category',
      prevLevel: 'Prev level',
      close: 'Close',
      cancel: 'Cancel',
    },
    title: 'Sample title for dialog component',
  },

  button: {
    sizingTitle: 'Variant size of button',
    disabledTitle: 'Disabled button',
    sampleTitle: 'Sample button',
    loadingTitle: 'Fetching data...',
  },

  checkbox: {
    sizingTitle: 'Variant size of checkbox',
    sampleTitle: 'Sample checkbox',
  },

  longPress: {
    title: 'Long click/touch on me to increase the number',
    buttonTitle: 'Long press me',
  },

  longTap: {
    title: 'Tap and hold 2 seconds to increase the number',
    buttonTitle: 'Tap and hold 2 seconds',
  },

  contextMenu: {
    buttonTitle: 'Right click on me',
    title: 'Right click on me',
    description: 'Or press and hold on mobile devices',
  },

  spin: {
    tip: 'A sentence as a tip or loading text or anything else',
  },

  reactionRate: {
    dispatch: 'Failure response on dispatch',
  },

  select: {
    label: 'Label of select',
    placeholder: 'Pick option(s)',
  },

  input: {
    label: 'Label of input',
    placeholder: 'Enter something',
  },

  text: {
    sampleText: 'Some test text for testing text component',
  },

  title: {
    sampleText: 'Some test text for testing title component',
  },

  menu: {
    buttonTitle: 'Click on me to open',
    menu1: 'Software settings',
    menu2: 'Application language',
    menu3: 'A longer sample text to test the longer texts',
    menu4: 'Quite from app',
    menu5: 'Profile',
  },

  switch: {
    sizingTitle: 'Variant size of switch',
    sampleTitle: 'Sample switch',
  },

  radio: {
    sizingTitle: 'Variant size of radio button',
    sampleTitle: 'Sample radio button',
  },
}
