import React, { type FC, type ReactNode } from 'react'

import { classNames } from '@zoom-studio/zoom-js-ts-utils'

import { Button, ButtonGroup, type ButtonNS } from '../../../components'

export namespace WithButtonsStoryNS {
  export interface Props {
    buttons: ButtonNS.Props[]
    children?: ReactNode
    groupedButtons?: boolean
    secondaryChild?: ReactNode
  }
}

export const WithButtonsStory: FC<WithButtonsStoryNS.Props> = ({
  groupedButtons = true,
  buttons,
  children,
  secondaryChild,
}) => {
  const buttonsContainerClasses = classNames('handlers', {
    grouped: !!groupedButtons,
  })

  return (
    <div className="with-buttons-story">
      <div className={buttonsContainerClasses}>
        {groupedButtons ? (
          <ButtonGroup buttons={buttons} direction="column" />
        ) : (
          buttons.map((props, index) => <Button key={index} {...props} />)
        )}
      </div>

      {secondaryChild && <div className="secondary-child">{secondaryChild}</div>}

      <div className="story">{children}</div>
    </div>
  )
}
