import React, { type FC } from 'react'

import { type Meta } from '@storybook/react'

import { RichTextEditor, type RichTextEditorNS } from '../components'

import { FULL_FEATURE_RICH_TEXT, generateExplorerFiles } from '../fixtures'
import { CommonStory, StoryPlayground } from './components'

const explorersProps: Pick<
  RichTextEditorNS.Props,
  'imageExplorerProps' | 'fileExplorerProps' | 'videoExplorerProps'
> = {
  imageExplorerProps: {
    files: generateExplorerFiles(100),
  },
  videoExplorerProps: {
    files: generateExplorerFiles(100),
  },
  fileExplorerProps: {
    files: generateExplorerFiles(100),
  },
}

export default {
  title: 'Data entry/Rich text editor',
  component: RichTextEditor,
  args: {
    id: 'playground-rich-text-editor',
    initialHeight: 700,
    stickyActions: true,
    resizable: true,
    enableAdvancedLinkInserter: true,
    maxHeight: 1000,
    minHeight: 200,
    editorProps: {
      placeholder: 'شروع به نوشتن متن جدید...',
      className: 'custom-maker-class-name',
      collapseOnEscape: true,
      saveDraft: true,
      searchQuery: '',
      style: undefined,
      containerProps: undefined,
      defaultValue: undefined,
      onClick: undefined,
    },
    ...explorersProps,
    actions: {
      h1: true,
      h2: true,
      h3: true,
      h4: true,
      bold: true,
      italic: true,
      underline: true,
      strikethrough: true,
      quote: true,
      highlight: true,
      link: true,
      removeLink: true,
      orderedList: true,
      unorderedList: true,
      rule: true,
      table: true,
      image: true,
      video: true,
      file: true,
      emoji: true,
      undo: true,
      redo: true,
    },
    className: 'playground-rich-text-editor',
    containerProps: undefined,
    onClick: undefined,
    style: {},
  },
} as Meta<typeof RichTextEditor>

export const Placeholder = () => {
  return (
    <CommonStory
      component={RichTextEditor}
      stories={[
        {
          group: [
            {
              name: 'No placeholder (Default)',
              props: { id: 'placeholder-default', ...explorersProps },
            },
            {
              name: 'With placeholder',
              props: {
                id: 'placeholder-with-placeholder',
                editorProps: { placeholder: 'Write something special...' },
                ...explorersProps,
              },
            },
          ],
        },
      ]}
    />
  )
}

export const Draftable = () => {
  return (
    <CommonStory
      component={RichTextEditor}
      stories={[
        {
          group: [
            {
              name: 'With saved draft (Default)',
              props: { id: 'draft-default', ...explorersProps },
            },
            {
              name: 'Without draft',
              props: {
                id: 'draft-no-draft',
                editorProps: { saveDraft: false },
                ...explorersProps,
              },
            },
          ],
        },
      ]}
    />
  )
}

export const SearchQuery = () => {
  return (
    <CommonStory
      component={RichTextEditor}
      stories={[
        {
          group: [
            {
              name: 'Highlight search result (searchQuery:This)',
              props: {
                id: 'highlight-search-result',
                editorProps: {
                  saveDraft: false,
                  searchQuery: 'This',
                  defaultValue: JSON.parse(FULL_FEATURE_RICH_TEXT),
                },
                ...explorersProps,
              },
            },
          ],
        },
      ]}
    />
  )
}
export const DefaultValue = () => {
  return (
    <CommonStory
      component={RichTextEditor}
      stories={[
        {
          group: [
            {
              name: 'With default value',
              props: {
                id: 'default-value',
                editorProps: { defaultValue: JSON.parse(FULL_FEATURE_RICH_TEXT) },
                ...explorersProps,
              },
            },
          ],
        },
      ]}
    />
  )
}

export const Resizable = () => {
  return (
    <CommonStory
      component={RichTextEditor}
      stories={[
        {
          group: [
            { name: 'Resizable (Default)', props: { id: 'resizable-default', ...explorersProps } },
            {
              name: 'None resizable',
              props: { id: 'resizable-none-resizable', resizable: false, ...explorersProps },
            },
          ],
        },
      ]}
    />
  )
}

export const InitialHeight = () => {
  return (
    <CommonStory
      component={RichTextEditor}
      stories={[
        {
          group: [
            { name: '200px (Default)', props: { id: 'initial-height-default', ...explorersProps } },
            {
              name: '400px',
              props: { id: 'initial-height-100px', initialHeight: 400, ...explorersProps },
            },
          ],
        },
      ]}
    />
  )
}

export const HeightRestriction = () => {
  return (
    <CommonStory
      component={RichTextEditor}
      stories={[
        {
          group: [
            {
              name: 'min:200px max:unset (Default)',
              props: { id: 'height-restriction-default', ...explorersProps },
            },
            {
              name: 'min:50px max:500px',
              props: {
                id: 'height-restriction-custom',
                minHeight: 50,
                maxHeight: 500,
                ...explorersProps,
              },
            },
          ],
        },
      ]}
    />
  )
}

export const StickyActions = () => {
  return (
    <CommonStory
      component={RichTextEditor}
      stories={[
        {
          group: [
            {
              name: 'Sticky (Default)',
              props: { id: 'sticky-actions-default', initialHeight: 500, ...explorersProps },
            },
            {
              name: '400px',
              props: {
                id: 'sticky-actions-no-sticky',
                stickyActions: false,
                initialHeight: 2000,
                ...explorersProps,
              },
            },
          ],
        },
      ]}
    />
  )
}

export const CustomActions = () => {
  return (
    <CommonStory
      component={RichTextEditor}
      stories={[
        {
          group: [
            {
              name: 'All actions (Default)',
              props: { id: 'custom-actions-all-actions', ...explorersProps },
            },
            {
              name: 'Custom actions',
              props: {
                id: 'custom-actions-some-actions',
                actions: { h4: false, strikethrough: false, unorderedList: false },
                ...explorersProps,
              },
            },
          ],
        },
      ]}
    />
  )
}

export const AdvancedLinkInserter = () => {
  return (
    <CommonStory
      component={RichTextEditor}
      stories={[
        {
          group: [
            {
              name: 'None advance (Default)',
              props: { id: 'advanced-link-inserter-default', ...explorersProps },
            },
            {
              name: 'Advance',
              props: {
                id: 'advanced-link-inserter-advanced',
                enableAdvancedLinkInserter: true,
                ...explorersProps,
              },
            },
          ],
        },
      ]}
    />
  )
}

export const CollapseOnEscape = () => {
  return (
    <CommonStory
      component={RichTextEditor}
      stories={[
        {
          group: [
            {
              name: 'Collapse (Default)',
              props: { id: 'collapse-on-escape-default', ...explorersProps },
            },
            {
              name: 'No collapse',
              props: {
                id: 'collapse-on-escape-no-collapse',
                editorProps: { collapseOnEscape: false },
                ...explorersProps,
              },
            },
          ],
        },
      ]}
    />
  )
}

export const Playground: FC<RichTextEditorNS.Props> = props => {
  return <StoryPlayground component={RichTextEditor} props={props} />
}
