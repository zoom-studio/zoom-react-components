import React, { FC, ReactNode, useRef } from 'react'

import { EmojiNS, IconNS } from '..'
import { BaseComponent } from '../../types'

import { Steps } from './steps'

export namespace TourNS {
  export interface ChildrenCallbackParams {
    startTour: () => void
    stopTour: () => void
  }

  export interface Step {
    title?: string
    description?: string
    emoji?: EmojiNS.Emojis.Names
    icon?: IconNS.Names
    children?: ReactNode
    puls?: boolean
    closable?: boolean
    loading?: boolean
    showNumberBadge?: boolean
    showPrevButton?: 'auto' | false
    showNextButton?: 'auto' | false
    onRich?: () => void
    onClose?: () => void
  }

  export interface Props extends Omit<BaseComponent, 'children' | 'reference'> {
    steps: Step[]
    children: ReactNode | ((params: ChildrenCallbackParams) => ReactNode)
    onStart?: () => void
    onEnd?: () => void
    backdropProps?: BaseComponent
    defaultActiveStep?: number
  }
}

export const Tour: FC<TourNS.Props> = ({ children, ...rest }) => {
  const handleStartTourRef = useRef<TourNS.ChildrenCallbackParams['startTour'] | null>(null)
  const handleStopTourRef = useRef<TourNS.ChildrenCallbackParams['stopTour'] | null>(null)

  return (
    <>
      <Steps {...rest} startTourRef={handleStartTourRef} stopTourRef={handleStopTourRef} />

      {typeof children === 'function'
        ? children({ startTour: handleStartTourRef.current!, stopTour: handleStopTourRef.current! })
        : children}
    </>
  )
}
