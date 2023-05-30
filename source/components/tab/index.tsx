import React, { forwardRef, type HTMLAttributes, type ReactNode } from 'react'

import { classNames } from '@zoom-studio/zoom-js-ts-utils'

import {
  ConditionalWrapper,
  Emoji,
  type EmojiNS,
  Icon,
  type IconNS,
  ScrollView,
  type ScrollViewNS,
  Spin,
  Text,
} from '..'
import { useZoomComponent, useZoomContext } from '../../hooks'
import { type BaseComponent, type Color } from '../../types'
import { colorFnToColor } from '../../utils'
import { CustomLink } from '../custom-link'

export namespace TabNS {
  export interface TabWidth {
    min?: string | number
    max?: string | number
  }

  export interface Tab {
    children?: ReactNode
    title?: string
    closable?: boolean
    disabled?: boolean
    loading?: boolean
    icon?: IconNS.Names
    emoji?: EmojiNS.Emojis.Names
    link?: string
  }

  export interface Props extends Omit<BaseComponent, 'children'> {
    tabs: Tab[]
    activeTab?: number
    onChange?: (tabIndex: number) => void
    onClose?: (tabIndex: number) => void
    scrollViewProps?: Omit<ScrollViewNS.Props, 'children' | 'maxHeight' | 'className'>
    tabsWidth?: 'auto' | TabWidth
    background?: Color
  }
}

export const Tab = forwardRef<HTMLDivElement, TabNS.Props>(
  (
    {
      activeTab = 0,
      tabsWidth = 'auto',
      background = color => color({ source: 'layer' }),
      className,
      containerProps,
      tabs,
      onChange,
      scrollViewProps,
      onClose,
      ...rest
    },
    reference,
  ) => {
    const { createClassName } = useZoomComponent('tab')
    const { linkComponent } = useZoomContext()

    const activeTabChild = tabs[activeTab]?.children

    const classes = createClassName(className, '', {
      [createClassName('', 'fit-content')]: tabsWidth === 'auto',
    })

    const getTabWrapperProps = (tab: TabNS.Tab, index: number): HTMLAttributes<HTMLElement> => {
      const maxWidth = typeof tabsWidth === 'string' ? undefined : tabsWidth.max
      const minWidth = typeof tabsWidth === 'string' ? undefined : tabsWidth.min

      return {
        style: {
          maxWidth,
          minWidth,
          background: colorFnToColor(background),
        },
        onClick: () => onChange?.(index),
        className: classNames('tab', {
          loading: tab.loading,
          disabled: tab.disabled,
          active: index === activeTab,
        }),
      }
    }

    return (
      <div {...rest} {...containerProps} ref={reference} className={classes}>
        <ScrollView autoHide {...scrollViewProps} maxHeight="unset" className="tabs">
          <div className="tabs-container">
            {tabs.map((tab, index) => (
              <ConditionalWrapper
                key={index}
                condition={!!tab.link}
                falseWrapper={children => <div {...getTabWrapperProps(tab, index)}>{children}</div>}
                trueWrapper={children => (
                  <CustomLink
                    {...getTabWrapperProps(tab, index)}
                    href={tab.link}
                    userLink={linkComponent}
                  >
                    {children}
                  </CustomLink>
                )}
              >
                <div className="tab-info">
                  {tab.icon && <Icon className="tab-icon" name={tab.icon} />}
                  {tab.emoji && <Emoji className="tab-emoji" name={tab.emoji} />}
                  {tab.title && <Text className="tab-title">{tab.title}</Text>}
                </div>

                {(tab.loading || (tab.closable && !tab.loading)) && (
                  <div className="tab-action">
                    {tab.loading && <Spin className="tab-spin" size="small" />}
                    {tab.closable && !tab.loading && (
                      <Icon
                        onClick={() => onClose?.(index)}
                        className="tab-close-icon"
                        name="close"
                      />
                    )}
                  </div>
                )}
              </ConditionalWrapper>
            ))}
          </div>
        </ScrollView>

        {activeTabChild && <div className="tab-children">{activeTabChild}</div>}
      </div>
    )
  },
)
