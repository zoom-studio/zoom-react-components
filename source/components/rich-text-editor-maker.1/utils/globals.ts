import { ComponentType } from 'react'

import { composeDecorators, EditorPlugin } from '@draft-js-plugins/editor'
import createFocusPlugin from '@draft-js-plugins/focus'
import createImagePlugin from '@draft-js-plugins/image'
import createResizeablePlugin from '@draft-js-plugins/resizeable'
import createUndoPlugin, { UndoRedoButtonProps } from '@draft-js-plugins/undo'
import { CompositeDecorator, DraftDecorator, EditorState } from 'draft-js'
import createDividerPlugin from 'draft-js-divider-plugin'
import createMarkdownShortcutsPlugin from 'draft-js-markdown-shortcuts-plugin'

import { findLinkEntities, findTableEntities, LinkComponent, TableComponent } from '../inserters'

export namespace CreateEditorPluginsNS {
  export interface ReturnType {
    plugins: EditorPlugin[]
    Redo: ComponentType<UndoRedoButtonProps>
    Undo: ComponentType<UndoRedoButtonProps>
    addDivider: (editorState: EditorState) => EditorState
  }
}

export const createEditorPlugins = (): CreateEditorPluginsNS.ReturnType => {
  const resizeablePlugin = createResizeablePlugin()
  const focusPlugin = createFocusPlugin()
  const undoPlugin = createUndoPlugin()
  const decorator = composeDecorators(resizeablePlugin.decorator, focusPlugin.decorator)
  const imagePlugin = createImagePlugin({ decorator })
  const dividerPlugin = createDividerPlugin()
  const markdownShortcutsPlugin = createMarkdownShortcutsPlugin()

  const { RedoButton, UndoButton } = undoPlugin

  return {
    plugins: [
      focusPlugin,
      resizeablePlugin,
      imagePlugin,
      undoPlugin,
      dividerPlugin,
      markdownShortcutsPlugin,
    ],
    Redo: RedoButton,
    Undo: UndoButton,
    addDivider: dividerPlugin.addDivider,
  }
}

export const createEditorDecorators = (): (CompositeDecorator | DraftDecorator)[] => {
  return [
    { strategy: findLinkEntities, component: LinkComponent },
    { strategy: findTableEntities, component: TableComponent },
  ]
}
