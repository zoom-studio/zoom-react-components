import React, { FC, MutableRefObject, useEffect, useState } from 'react'

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
  fluidContainer = true,
  defaultActiveStep = 0,
  scrollableContainer = window,
  className,
  steps,
  containerProps,
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

  const step = steps[activeStep]
  const stepPosition: TourNS.StepPosition = step.selfPosition ?? 'center'

  const classes = createClassName(className)

  const containerClasses = createClassName('', 'steps-container', {
    [createClassName('', `steps-container-${stepPosition}`)]: true,
  })

  const backdropClasses = createClassName(backdropProps?.className, 'backdrop')

  const raisedStepTargetClasses = createClassName('', 'raised-element', {
    [createClassName('', 'raised-element-pulsed')]: !!(step.puls ?? true),
  })

  const raiseStepUp = (stepIndex: number) => {
    const { reference, positionOnFocusReference = 'center' } = steps[stepIndex]
    const { current: stepTarget } = reference

    if (!stepTarget) {
      return null
    }

    const tourClasses = raisedStepTargetClasses.replace(/ {2}/g, ' ').split(' ')
    const jointTourClasses = tourClasses.join('.')

    document.querySelector(`.${jointTourClasses}`)?.classList.remove(...tourClasses)
    stepTarget.classList.add(...tourClasses)

    let { offsetTop, clientHeight: targetHeight } = stepTarget
    const { innerHeight: windowHeight } = window

    switch (positionOnFocusReference) {
      case 'center': {
        offsetTop = offsetTop - windowHeight / 2 + targetHeight / 2
        break
      }
      case 'end': {
        offsetTop = offsetTop - windowHeight + targetHeight
        break
      }
    }

    if ('current' in scrollableContainer) {
      if (scrollableContainer.current) {
        scrollableContainer.current.scrollTop = offsetTop
      }
    } else if ('document' in scrollableContainer) {
      scrollableContainer.scrollTo({ top: offsetTop })
    } else {
      scrollableContainer.scrollTop = offsetTop
    }
  }

  const handleNavigateTo = (to: 'prev' | 'next') => {
    setActiveStep(currentStep => {
      let newStep = currentStep

      if (to === 'next') {
        const nextStep = currentStep + 1
        if (nextStep < steps.length) {
          newStep = nextStep
        }
      } else {
        const prevStep = currentStep - 1
        if (prevStep >= 0) {
          newStep = prevStep
        }
      }

      raiseStepUp(newStep)
      return newStep
    })
  }

  const handleKeyboardEvents = (evt: KeyboardEvent) => {
    switch (evt.key) {
      case 'ArrowRight': {
        return handleNavigateTo('next')
      }
      case 'ArrowLeft': {
        return handleNavigateTo('prev')
      }
    }
  }

  const handleStartTour = () => {
    onStart?.()
    setIsStarted(true)
    raiseStepUp(defaultActiveStep)
    addEventListener('keyup', handleKeyboardEvents)
  }

  const handleStopTour = () => {
    onEnd?.()
    setIsStarted(false)
    removeEventListener('keyup', handleKeyboardEvents)
  }

  useEffect(() => {
    startTourRef.current = handleStartTour
    stopTourRef.current = handleStopTour
  }, [])

  return (
    <>
      <div style={{ position: 'fixed', right: 0, top: 0, zIndex: 9999 }}>
        <button onClick={() => handleNavigateTo('next')}>next</button>
        <button onClick={() => handleNavigateTo('prev')}>prev</button>
      </div>

      {isStarted && (
        <>
          <div {...backdropProps} className={backdropClasses} />

          <Container fluid={fluidContainer} className={containerClasses}>
            {step && (
              <div {...containerProps} {...rest} className={classes}>
                {step.content?.({ stopTour: handleStopTour })}
              </div>
            )}
          </Container>
        </>
      )}
    </>
  )
}
