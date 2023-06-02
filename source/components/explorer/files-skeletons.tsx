import React, { type FC } from 'react'

import { Skeleton } from '../..'

export const ExplorerFilesSkeletons: FC = () => {
  return (
    <div className="files-skeletons">
      {Array.from(Array(10)).map((_, index) => (
        <Skeleton.Paper key={index} size={{ width: '100%', height: 28 }} />
      ))}
    </div>
  )
}
