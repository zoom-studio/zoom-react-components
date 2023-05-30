import React, { type FC } from 'react'

import { Skeleton } from '../..'

export const CellSkeleton: FC = () => {
  return (
    <div className="loading-skeleton-container">
      <Skeleton.Paper size={{ width: '100%', height: '20px' }} />
    </div>
  )
}
