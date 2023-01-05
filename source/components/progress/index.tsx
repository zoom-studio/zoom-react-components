import React, { FC, HTMLAttributes } from 'react'
import { useZoomComponent } from '../../hooks'

export namespace ProgressNS {
  export interface Step {
    percentage: number
  }

  export interface Props extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
    steps: Step[]
  }
}

export const Progress: FC<ProgressNS.Props> = ({ className }) => {
  const { createClassName } = useZoomComponent('progress')
  const classes = createClassName(className)

  return <div className={classes}></div>
}
