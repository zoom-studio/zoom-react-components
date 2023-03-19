import React, { FC } from 'react'

import { ExplorerNS, Text } from '..'

export namespace ExplorerFileInfoNS {
  export interface Props extends ExplorerNS.MoreInfo {}
}

export const ExplorerFileInfo: FC<ExplorerFileInfoNS.Props> = ({ displayName, value }) => {
  return (
    <div className="info">
      <Text className="title" bold>
        {displayName}:
      </Text>
      <Text className="value">{value ?? '-'}</Text>
    </div>
  )
}
