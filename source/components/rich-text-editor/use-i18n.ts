import { type useZoomComponent } from '../../hooks'

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
  componentI18n?: UseRichTextEditorI18nNS.I18n,
): Required<UseRichTextEditorI18nNS.I18n> => {
  const i18n = globalI18ns?.richTextEditor

  return {
    confirmLinkButton: componentI18n?.confirmLinkButton ?? i18n?.confirmLinkButton ?? 'Confirm',
    linkURLPlaceholder: componentI18n?.linkURLPlaceholder ?? i18n?.linkURLPlaceholder ?? 'Link URL',
    linkTargetLabel:
      componentI18n?.linkTargetLabel ?? i18n?.linkTargetLabel ?? 'Open link in new tab',
    linkNoFollowLabel: componentI18n?.linkNoFollowLabel ?? i18n?.linkNoFollowLabel ?? 'No follow',
    textSize: componentI18n?.textSize ?? i18n?.textSize ?? 'Text size',
    heading1: componentI18n?.heading1 ?? i18n?.heading1 ?? 'Heading 1',
    heading2: componentI18n?.heading2 ?? i18n?.heading2 ?? 'Heading 2',
    heading3: componentI18n?.heading3 ?? i18n?.heading3 ?? 'Heading 3',
    heading4: componentI18n?.heading4 ?? i18n?.heading4 ?? 'Heading 4',
    bold: componentI18n?.bold ?? i18n?.bold ?? 'Bold',
    strikethrough: componentI18n?.strikethrough ?? i18n?.strikethrough ?? 'Strikethrough',
    italic: componentI18n?.italic ?? i18n?.italic ?? 'Italic',
    underline: componentI18n?.underline ?? i18n?.underline ?? 'Underline',
    link: componentI18n?.link ?? i18n?.link ?? 'Link',
    removeLink: componentI18n?.removeLink ?? i18n?.removeLink ?? 'Remove link',
    ol: componentI18n?.ol ?? i18n?.ol ?? 'Numbered list',
    ul: componentI18n?.ul ?? i18n?.ul ?? 'Bulleted list',
    blockquote: componentI18n?.blockquote ?? i18n?.blockquote ?? 'Blockquote',
    emoji: componentI18n?.emoji ?? i18n?.emoji ?? 'Emoji',
    icon: componentI18n?.icon ?? i18n?.icon ?? 'Icon',
    image: componentI18n?.image ?? i18n?.image ?? 'Attache image',
    file: componentI18n?.file ?? i18n?.file ?? 'Attache file',
    copy: componentI18n?.copy ?? i18n?.copy ?? 'Copy',
    cut: componentI18n?.cut ?? i18n?.cut ?? 'Cut',
    paste: componentI18n?.paste ?? i18n?.paste ?? 'Paste',
    images: componentI18n?.images ?? i18n?.images ?? 'Images',
    horizontalRule: componentI18n?.horizontalRule ?? i18n?.horizontalRule ?? 'Horizontal rule',
    table: componentI18n?.table ?? i18n?.table ?? 'Insert Table',
    insertTable: componentI18n?.insertTable ?? i18n?.table ?? 'Insert table',
    tableNxN: componentI18n?.tableNxN ?? i18n?.table ?? 'Table',
    video: componentI18n?.video ?? i18n?.video ?? 'Attache video',
    videos: componentI18n?.videos ?? i18n?.videos ?? 'Videos',
    undo: componentI18n?.undo ?? i18n?.undo ?? 'Undo',
    redo: componentI18n?.redo ?? i18n?.redo ?? 'Redo',
    highlight: componentI18n?.highlight ?? i18n?.highlight ?? 'Highlight',
    search: componentI18n?.search ?? i18n?.search ?? 'Search keywords',
  }
}
