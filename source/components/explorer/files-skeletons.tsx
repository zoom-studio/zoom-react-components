import { classNames } from '@zoom-studio/zoom-js-ts-utils'
import React, { FC } from 'react'

import { ExplorerNS, Skeleton } from '../..'

export namespace ExplorerFilesSkeletonsNS {
  export interface Props {
    viewMode: ExplorerNS.ViewMode
  }
}

export const ExplorerFilesSkeletons: FC<ExplorerFilesSkeletonsNS.Props> = ({ viewMode }) => {
  const classes = classNames('files-skeletons', {
    [viewMode]: true,
  })

  return (
    <div className={classes}>
      {Array.from(Array(viewMode === 'grid' ? 26 : 10)).map((_, index) => (
        <Skeleton.Paper
          key={index}
          size={viewMode === 'grid' ? { width: 100, height: 100 } : { width: '100%', height: 28 }}
        />
      ))}
    </div>
  )
}
