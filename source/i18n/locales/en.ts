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
    richTextEditor: {
      normalText: 'Normal text',
      heading1: 'Heading 1',
      heading2: 'Heading 2',
      heading3: 'Heading 3',
      heading4: 'Heading 4',
      bold: 'Bold',
      strikethrough: 'Strikethrough',
      italic: 'Italic',
      link: 'Link',
      ol: 'Numbered list',
      ul: 'Bulleted list',
      emoji: 'Emoji',
      icon: 'Icon',
      image: 'Attache image',
      file: 'Attache file',
      copy: 'Copy',
      cut: 'Cut',
      paste: 'Paste',
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

  bottomSheet: {
    open: 'Open Bottom sheet',
    openSizeOf: {
      small: 'Open small Bottom sheet',
      normal: 'Open normal Bottom sheet',
      large: 'Open large Bottom sheet',
    },
    actions: {
      addCategory: 'Add category',
      prevLevel: 'Prev level',
      close: 'Close',
      cancel: 'Cancel',
    },
    title: 'Sample title for Bottom sheet component',
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

  image: {
    reGenerate: 'Get new image',
  },

  mention: {
    placeholder: 'Type something or @mention folks',
  },

  alert: {
    title: 'An example title to put as the title of the alert component',
    description:
      'Some relatively longer descriptions so that it can be used as a description of the alert component and users can read it and use it and be alerted and be informed of something important to say.',
  },

  tour: {
    content:
      'This step contains some optional content. PropContent will give you functions that you can use to control the tour. Below this text there are some buttons that you can test these functions',
    next: 'Next step',
    prev: 'Prev step',
    toStep3: 'To step 3',
    stopTour: 'Stop tour',
    switchMe: 'Switch me',
    currentStep: 'Current step index',
    ttl: {
      sample: 'Sample title',
      everyThingTogether: 'Everything together',
      topEnd: 'Top end',
      topCenter: 'Top center',
      topStart: 'Top start',
      centerEnd: 'Center end',
      center: 'Center',
      centerStart: 'Center start',
      bottomEnd: 'Bottom end',
      bottomCenter: 'Bottom center',
      bottomStart: 'Bottom start',
      emoji: 'With emoji',
      icon: 'With material icon',
      noneClosable: 'None closable',
      loading: 'Loading state',
      onReach: 'On reach',
      onClose: 'On close',
      refPositionStart: 'Reference on start',
      refPositionCenter: 'Reference on center',
      refPositionEnd: 'Reference on end',
    },
    desc: {
      sample:
        'Here are some sample descriptions. We use these texts to occupy more space. Otherwise, it is not a valuable content',
      everyThingTogether:
        'In this step, we will have everything together. For example, titles, descriptions, pulses, emojis, icons, loading, and everything that can have a step.',
      topEnd: 'This step is placed at the top of the page and at the end of the page',
      topCenter: 'This step is located at the top of the page and in the middle of it',
      topStart: 'This step is located at the top of the page and at the beginning of it',
      centerEnd: 'This step is placed in the middle of the page and at the end of the page',
      center: 'This step is placed horizontally and vertically in the middle of the page',
      centerStart: 'This step is placed in the middle of the page and at the beginning of the page',
      bottomEnd: 'This step is located at the bottom of the page and at the end of the page',
      bottomCenter: 'This step is located at the bottom of the screen and in the middle of it',
      bottomStart:
        'This step is located at the bottom of the page and at the beginning of the page',
      emoji:
        'In this step, we see an emoji. There is an emoji taken from the emoji component that we put here to make the step more attractive and to encourage people to read it.',
      icon: 'If necessary, we can use material icons instead of emojis. In this way, sometimes we put them here to have a more attractive step',
      noneClosable:
        'This step cannot be closed in any way. It means that when we are on this step, we can no longer close the tour',
      loading: 'In this step, we have a loading mode. In this case, the step cannot be closed',
      onReach:
        'When we reached this step, a callback function was executed. We can use this feature for things like tracking users through tools like Google Analytics',
      onClose:
        'If we close the tour on this step, a callback function will be executed. The purpose of this feature is to use it for tracking users',
      refPositionStart:
        'When we reached this step, the reference was placed at the top of the page',
      refPositionCenter:
        'When we reached this step, the reference was placed in the middle of the page, which is the default state',
      refPositionEnd:
        'When we reached this step, the reference was placed at the bottom of the page',
    },
  },

  infiniteScrollView: {
    endMessage: "You've reached the end of the list :)",
    loadingMessage: 'Loading more data...',
  },

  listView: {
    age: 'Age',
    rate: 'Rate this folk',
    action1: 'Follow',
    action2: 'Like',
    action3: 'Dislike',
    checkbox: 'A checkbox in ListView component',
    radio: 'A radio button in ListView component',
    switch: 'A switch in ListView component',
    ctx1: 'Follow',
    ctx2: 'Delete',
    ctx3: 'Like',
    title:
      'A tile to be placed in the ListView component. A tile to be placed in the ListView component',
    description:
      'Here are some sample descriptions. We use these texts to occupy more space. Otherwise, it is not a valuable content. Here are some sample descriptions. We use these texts to occupy more space. Otherwise, it is not a valuable content',
  },

  divider: {
    textualChildren: 'Some textual children that is supposed to be dividers title',
  },
}
