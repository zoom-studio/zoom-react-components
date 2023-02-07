import React, { FC, ReactNode } from 'react'

import { ButtonGroup, ButtonNS } from '../../../components'

export namespace WithButtonsStoryNS {
  export interface Props {
    buttons: ButtonNS.Props[]
    children?: ReactNode
  }
}

export const WithButtonsStory: FC<WithButtonsStoryNS.Props> = ({ buttons, children }) => {
  return (
    <div className="with-buttons-story">
      <div className="handlers">
        <ButtonGroup buttons={buttons} direction="column" />
      </div>
      <div className="story">{children}</div>
    </div>
  )
}
