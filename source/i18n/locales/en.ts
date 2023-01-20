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
    triggers: {
      hover: 'Mouse hover',
      click: 'Mouse click',
      focus: 'Mouse or keyboard focus',
    },
    fetching: 'Fetching data...',
    increase: 'Increase value',
    decrease: 'Decrease value',
  },

  globalErrors: {
    onCopyFailure: 'Error occurred while copying to clipboard',
    onCopySuccess: 'Successfully copied to the clipboard',
  },

  globalI18ns: {
    imageViewer: {
      zoomInTooltip: 'Zoom in',
      closeTooltip: 'Close',
      printTooltip: 'Print image',
      deleteTooltip: 'Delete image',
      downloadTooltip: 'Download image',
      zoomOutTooltip: 'Zoom out',
      deletePopConfirmTitle: 'Delete image',
      deletePopConfirmCancelButton: 'Discard',
      deletePopConfirmSubmitButton: 'Yes, delete',
      deletePopConfirmDescription: 'Are you sure to delete this image?',
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

  textarea: {
    label: 'Label of textarea',
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

  popover: {
    title: 'Popover title',
    description: 'Some test description for testing popover component',
  },

  progress: {
    title1: 'First step title',
    title2: 'Second step title',
    title3: 'Third step title',
    title4: 'Fourth step title',
  },

  toast: {
    message: 'Sample title to be shown in the toast',
  },

  notification: {
    title: 'Sample title',
    message: 'Sample message to be show in the notification',
    dismiss: 'Click to close',
  },

  popConfirm: {
    title: 'Delete this item',
    description: 'Are you sure to delete this item?',
    ok: 'Yes, delete',
    no: 'Cancel',
    onOk: 'The item has been deleted successfully',
    onNo: 'Canceled',
    button: 'Delete item',
  },

  tooltip: {
    children: 'Hover me',
    title: "You've hovered me",
  },

  filterButton: {
    title1: 'Most viewed',
    title2: 'Cheapest',
    title3: 'Most expensive',
  },

  copyToClipboard: {
    buttonTitle: 'Copy',
    text: 'This text has been added to the clipboard',
    error: 'Not copied',
    success: 'Copied',
    callback: 'Starting to copy',
  },

  timeShift: {
    undo: 'Undo',
    message: "You've deleted this item. Return back if you want",
    onShift: "You've successfully returned back and the deleted item has been restored",
    action1: 'Action 1',
    action2: 'Action 2',
    action3: 'Action 3',
  },

  badge: {
    text: 'Some sample sentence for testing the badge component',
  },

  imageViewer: {
    opener: 'Open image(s)',
  },
}
