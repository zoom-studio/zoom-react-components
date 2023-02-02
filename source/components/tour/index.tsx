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
    navigateTo: (to: 'prev' | 'next' | number) => void
  }

  export interface ContentCallbackParams
    extends Pick<ChildrenCallbackParams, 'stopTour' | 'navigateTo'> {
    currentStep: number
  }

  export interface Step {
    reference: Reference
    title?: string
    description?: string
    emoji?: EmojiNS.Emojis.Names
    icon?: IconNS.Names
    content?: (params: ContentCallbackParams) => ReactNode
    closable?: boolean
    loading?: boolean
    onReach?: () => void
    onClose?: () => void
    positionOnFocusReference?: 'center' | 'start' | 'end'
    selfPosition?: StepPosition
  }

  export interface Props extends Omit<BaseComponent, 'children' | 'reference'> {
    steps: Step[]
    children: ReactNode | ((params: ChildrenCallbackParams) => ReactNode)
    onStart?: () => void
    onEnd?: (activeStepIndex: number) => void
    backdropProps?: BaseComponent
    defaultActiveStep?: number
    scrollableContainer?: Reference | HTMLElement | Window
    fluidContainer?: boolean
  }

  export interface I18n {
    nextButton?: string
    backButton?: string
    skipButton?: string
    finishButton?: string
  }
}

export const Tour: FC<TourNS.Props> = ({ children, ...rest }) => {
  const handleStartTourRef = useRef<TourNS.ChildrenCallbackParams['startTour'] | null>(null)
  const handleStopTourRef = useRef<TourNS.ChildrenCallbackParams['stopTour'] | null>(null)
  const handleNavigateTo = useRef<TourNS.ChildrenCallbackParams['navigateTo'] | null>(null)

  return (
    <>
      <Steps
        {...rest}
        startTourRef={handleStartTourRef}
        stopTourRef={handleStopTourRef}
        navigateToRef={handleNavigateTo}
      />

      {typeof children === 'function'
        ? children({
            startTour: handleStartTourRef.current!,
            stopTour: handleStopTourRef.current!,
            navigateTo: handleNavigateTo.current!,
          })
        : children}
    </>
  )
}
