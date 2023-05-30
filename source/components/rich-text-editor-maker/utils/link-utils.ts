import { type UseObjectedStateNS } from '@zoom-studio/zoom-js-ts-utils'
import { type BaseRange } from 'slate'

import { type RichTextEditorMakerNS } from '../..'

import { type RichUtils } from './rich-utils'

export namespace LinkUtilsNS {
  export interface Params {
    editor: RichTextEditorMakerNS.Editor
    noFollowedLink: UseObjectedStateNS.ReturnType<boolean>
    blankedLink: UseObjectedStateNS.ReturnType<boolean>
    linkURL: UseObjectedStateNS.ReturnType<string>
    richUtils: RichUtils
  }

  export interface GetCurrentWordReturnType {
    currentWord: string
    currentRange: BaseRange
  }
}

export class LinkUtils {
  editor!: RichTextEditorMakerNS.Editor
  noFollowedLink!: UseObjectedStateNS.ReturnType<boolean>
  blankedLink!: UseObjectedStateNS.ReturnType<boolean>
  linkURL!: UseObjectedStateNS.ReturnType<string>
  richUtils!: RichUtils

  constructor(params: LinkUtilsNS.Params) {
    this.editor = params.editor
    this.noFollowedLink = params.noFollowedLink
    this.blankedLink = params.blankedLink
    this.linkURL = params.linkURL
    this.richUtils = params.richUtils
  }

  resetLinkInfo = (): void => {
    this.linkURL.set('')
    this.noFollowedLink.set(false)
    this.blankedLink.set(false)
    this.richUtils.focusEditor()
  }

  setLinkInfo = ({ url, noFollow, openInNewTab }: RichTextEditorMakerNS.LinkInfo): void => {
    this.linkURL.set(url)
    this.noFollowedLink.set(!!noFollow)
    this.blankedLink.set(!!openInNewTab)
    this.richUtils.focusEditor()
  }
}
