import React, { FC, Fragment, MutableRefObject, useEffect, useState } from 'react'

import { TourNS } from '.'
import { useZoomComponent } from '../../hooks'
import { Container } from '../grid'

export namespace StepsNS {
  export interface Props extends Omit<TourNS.Props, 'children'> {
    startTourRef: MutableRefObject<null | TourNS.ChildrenCallbackParams['startTour']>
    stopTourRef: MutableRefObject<null | TourNS.ChildrenCallbackParams['stopTour']>
  }
}

export const Steps: FC<StepsNS.Props> = ({
  defaultActiveStep = 0,
  className,
  steps,
  containerProps,
  id,
  onEnd,
  onStart,
  backdropProps,
  startTourRef,
  stopTourRef,
  ...rest
}) => {
  const [isStarted, setIsStarted] = useState(false)
  const [activeStep, setActiveStep] = useState(defaultActiveStep)
  const { createClassName } = useZoomComponent('tour')

  const classes = createClassName(className)

  const backdropClasses = createClassName(backdropProps?.className, 'backdrop')

  const handleNavigateTo = (to: 'prev' | 'next') => {
    setActiveStep(currentStep => {
      if (to === 'next') {
        const nextStep = currentStep + 1
        if (nextStep < steps.length) {
          return nextStep
        }
        return currentStep
      } else {
        const prevStep = currentStep - 1
        if (prevStep > 0) {
          return prevStep
        }
        return currentStep
      }
    })
  }

  const handleStartTour = () => {
    onStart?.()
    setIsStarted(true)
  }

  const handleStopTour = () => {
    onEnd?.()
    setIsStarted(false)
  }

  useEffect(() => {
    startTourRef.current = handleStartTour
    stopTourRef.current = handleStopTour
    handleNavigateTo('next')
  }, [])

  return (
    <>
      {isStarted && (
        <Container>
          <div {...backdropProps} className={backdropClasses} />

          {steps.map((step, index) =>
            activeStep === index ? (
              <div
                {...containerProps}
                {...rest}
                key={index}
                id={id && `${id}-${index + 1}`}
                className={classes}
              ></div>
            ) : (
              <Fragment key={index} />
            ),
          )}
        </Container>
      )}
    </>
  )
}
