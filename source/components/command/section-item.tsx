import React, { type FC, type MouseEvent } from 'react'

import { CommandNS } from '.'
import { Title } from '..'
import { type CustomLinkNS } from '../custom-link'
import { ActionItem } from './action-item'
import { shouldRenderAction } from './utils'

export namespace SectionItemNS {
  export interface Props {
    section: CommandNS.Section
    query: string
    linkComponent: CustomLinkNS.Props['userLink']
    activeItem: CommandNS.ActionID | null
    handleOnMouseEnterSection: (evt: MouseEvent<HTMLDivElement>) => void
    handleOnMouseEnterAction: (
      action: CommandNS.Action,
    ) => (evt: MouseEvent<HTMLDivElement> | MouseEvent<HTMLAnchorElement>) => void
  }
}

export const SectionItem: FC<SectionItemNS.Props> = ({
  section: { actions, sectionName },
  activeItem,
  query,
  linkComponent,
  handleOnMouseEnterAction,
  handleOnMouseEnterSection,
}) => {
  const filteredActions = actions.filter(action => shouldRenderAction(action, query))

  return (
    <>
      {filteredActions.length > 0 && (
        <div
          data-item={true}
          data-section={true}
          className="command-item section-item"
          style={{ height: CommandNS.SECTION_TITLE_HEIGHT }}
          onMouseEnter={handleOnMouseEnterSection}
        >
          <Title h6 className="section-name">
            {sectionName}
          </Title>
        </div>
      )}

      {filteredActions.map((action, index) => (
        <ActionItem
          activeItem={activeItem}
          linkComponent={linkComponent}
          handleOnMouseEnterAction={handleOnMouseEnterAction}
          isLastActionInSection={index === filteredActions.length - 1}
          action={action}
          key={index}
        />
      ))}
    </>
  )
}
