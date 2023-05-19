import { useZoomComponent } from '../../hooks'

export namespace UseRichTextEditorI18nNS {
  export interface I18n {
    linkURLPlaceholder?: string
    linkTargetLabel?: string
    linkNoFollowLabel?: string
    confirmLinkButton?: string
    textSize?: string
    heading1?: string
    heading2?: string
    heading3?: string
    heading4?: string
    bold?: string
    strikethrough?: string
    italic?: string
    underline?: string
    link?: string
    highlight?: string
    removeLink?: string
    blockquote?: string
    ol?: string
    ul?: string
    emoji?: string
    icon?: string
    image?: string
    file?: string
    copy?: string
    cut?: string
    paste?: string
    images?: string
    horizontalRule?: string
    table?: string
    insertTable?: string
    tableNxN?: string
    video?: string
    videos?: string
    undo?: string
    redo?: string
    search?: string
  }
}

export const useRichTextEditorI18n = (
  globalI18ns: ReturnType<typeof useZoomComponent>['globalI18ns'],
): Required<UseRichTextEditorI18nNS.I18n> => {
  const i18n = globalI18ns?.richTextEditor

  return {
    confirmLinkButton: i18n?.confirmLinkButton ?? 'Confirm',
    linkURLPlaceholder: i18n?.linkURLPlaceholder ?? 'Link URL',
    linkTargetLabel: i18n?.linkTargetLabel ?? 'Open link in new tab',
    linkNoFollowLabel: i18n?.linkNoFollowLabel ?? 'No follow',
    textSize: i18n?.textSize ?? 'Text size',
    heading1: i18n?.heading1 ?? 'Heading 1',
    heading2: i18n?.heading2 ?? 'Heading 2',
    heading3: i18n?.heading3 ?? 'Heading 3',
    heading4: i18n?.heading4 ?? 'Heading 4',
    bold: i18n?.bold ?? 'Bold',
    strikethrough: i18n?.strikethrough ?? 'Strikethrough',
    italic: i18n?.italic ?? 'Italic',
    underline: i18n?.underline ?? 'Underline',
    link: i18n?.link ?? 'Link',
    removeLink: i18n?.removeLink ?? 'Remove link',
    ol: i18n?.ol ?? 'Numbered list',
    ul: i18n?.ul ?? 'Bulleted list',
    blockquote: i18n?.blockquote ?? 'Blockquote',
    emoji: i18n?.emoji ?? 'Emoji',
    icon: i18n?.icon ?? 'Icon',
    image: i18n?.image ?? 'Attache image',
    file: i18n?.file ?? 'Attache file',
    copy: i18n?.copy ?? 'Copy',
    cut: i18n?.cut ?? 'Cut',
    paste: i18n?.paste ?? 'Paste',
    images: i18n?.images ?? 'Images',
    horizontalRule: i18n?.horizontalRule ?? 'Horizontal rule',
    table: i18n?.table ?? 'Insert Table',
    insertTable: i18n?.table ?? 'Insert table',
    tableNxN: i18n?.table ?? 'Table',
    video: i18n?.video ?? 'Attache video',
    videos: i18n?.videos ?? 'Videos',
    undo: i18n?.undo ?? 'Undo',
    redo: i18n?.redo ?? 'Redo',
    highlight: i18n?.highlight ?? 'Highlight',
    search: i18n?.search ?? 'Search keywords',
  }
}
