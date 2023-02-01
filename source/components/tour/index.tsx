import React, { FC, MutableRefObject, ReactNode, RefObject, useRef } from 'react'

import { EmojiNS, IconNS } from '..'
import { BaseComponent } from '../../types'

import { Steps } from './steps'

export namespace TourNS {
  export type Reference = RefObject<HTMLElement | null> | MutableRefObject<HTMLElement | null>

  export const StepPosition = [
    'top-end',
    'top-center',
    'top-start',
    'center-end',
    'center',
    'center-start',
    'bottom-end',
    'bottom-center',
    'bottom-start',
  ] as const
  export type StepPosition = typeof StepPosition[number]

  export interface ChildrenCallbackParams {
    startTour: () => void
    stopTour: () => void
  }

  export interface Step {
    reference: Reference
    title?: string
    description?: string
    emoji?: EmojiNS.Emojis.Names
    icon?: IconNS.Names
    content?: (params: Pick<ChildrenCallbackParams, 'stopTour'>) => ReactNode
    puls?: boolean
    closable?: boolean
    loading?: boolean
    showNumberBadge?: boolean
    onReach?: () => void
    onClose?: () => void
    positionOnFocusReference?: 'center' | 'start' | 'end'
    selfPosition?: StepPosition
  }

  export interface Props extends Omit<BaseComponent, 'children' | 'reference'> {
    steps: Step[]
    children: ReactNode | ((params: ChildrenCallbackParams) => ReactNode)
    onStart?: () => void
    onEnd?: () => void
    backdropProps?: BaseComponent
    defaultActiveStep?: number
    scrollableContainer?: Reference | HTMLElement | Window
    fluidContainer?: boolean
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
