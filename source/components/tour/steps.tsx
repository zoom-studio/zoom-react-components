import React, { FC, MutableRefObject, useContext, useEffect, useState } from 'react'

import { TourNS } from '.'
import { Button, Container, Emoji, Icon, Spin, Text, Title, zoomLogContext } from '..'
import { useZoomComponent, useZoomContext } from '../../hooks'

export namespace StepsNS {
  export interface Props extends Omit<TourNS.Props, 'children'> {
    startTourRef: MutableRefObject<null | TourNS.ChildrenCallbackParams['startTour']>
    stopTourRef: MutableRefObject<null | TourNS.ChildrenCallbackParams['stopTour']>
    navigateToRef: MutableRefObject<null | TourNS.ChildrenCallbackParams['navigateTo']>
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
  navigateToRef,
  ...rest
}) => {
  const [isStarted, setIsStarted] = useState(false)
  const [activeStep, setActiveStep] = useState(defaultActiveStep)
  const { createClassName } = useZoomComponent('tour')
  const { isRTL } = useZoomContext()
  const { globalI18ns: i18n } = useContext(zoomLogContext)

  const step = steps[activeStep]
  const {
    selfPosition = 'center',
    closable = true,
    content,
    description,
    emoji,
    icon,
    loading,
    onClose,
    title,
  } = step

  const nextButtonText = i18n?.tour?.nextButton ?? 'Next'
  const backButtonText = i18n?.tour?.backButton ?? 'Back'
  const skipButtonText = i18n?.tour?.skipButton ?? 'Skip'
  const finishButtonText = i18n?.tour?.finishButton ?? 'Finish'

  const classes = createClassName(className)

  const containerClasses = createClassName('', 'steps-container', {
    [createClassName('', `steps-container-${selfPosition}`)]: true,
  })

  const backdropClasses = createClassName(backdropProps?.className, 'backdrop')

  const raisedStepTargetClasses = createClassName('', 'raised-element')

  const removeRaisedStepClasses = () => {
    document.querySelector(`.${raisedStepTargetClasses}`)?.classList.remove(raisedStepTargetClasses)
  }

  const raiseStepUp = (stepIndex: number) => {
    const { reference, positionOnFocusReference = 'center', onReach } = steps[stepIndex]
    const { current: stepTarget } = reference

    if (!stepTarget) {
      return null
    }

    onReach?.()

    removeRaisedStepClasses()
    stepTarget.classList.add(raisedStepTargetClasses)

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

  const handleNavigateTo: TourNS.ChildrenCallbackParams['navigateTo'] = to => {
    setActiveStep(currentStep => {
      let newStep = currentStep

      if (typeof to === 'number') {
        if (to < steps.length) {
          newStep = to
        }
      } else {
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
      }

      raiseStepUp(newStep)
      return newStep
    })
  }

  const handleKeyboardEvents = (evt: KeyboardEvent) => {
    let { key } = evt

    if (isRTL) {
      key = key === 'ArrowRight' ? 'ArrowLeft' : key === 'ArrowLeft' ? 'ArrowRight' : key
    }

    switch (key) {
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
    if (!closable) {
      return null
    }

    onEnd?.(activeStep)
    onClose?.()
    setIsStarted(false)
    removeEventListener('keyup', handleKeyboardEvents)
    setActiveStep(defaultActiveStep)
    removeRaisedStepClasses()
  }

  useEffect(() => {
    startTourRef.current = handleStartTour
    stopTourRef.current = handleStopTour
    navigateToRef.current = handleNavigateTo
  }, [])

  return (
    <>
      {isStarted && (
        <>
          <div {...backdropProps} className={backdropClasses} />

          <Container fluid={fluidContainer} className={containerClasses}>
            {step && (
              <div {...containerProps} {...rest} className={classes}>
                <div className="step-content">
                  <div className="content-header">
                    {icon && <Icon className="step-icon" name={icon} />}

                    {emoji && <Emoji className="step-emoji" name={emoji} />}

                    <Title className="step-title">{title}</Title>

                    {closable && (
                      <Button
                        suffixMaterialIcon="close"
                        onClick={handleStopTour}
                        shape="circle"
                        type="link"
                      />
                    )}
                  </div>

                  {loading && <Spin className="step-spinner" size="large" />}

                  {description && <Text className="step-description">{description}</Text>}

                  {content && (
                    <div className="step-custom-content">
                      {content({
                        stopTour: handleStopTour,
                        navigateTo: handleNavigateTo,
                        currentStep: activeStep,
                      })}
                    </div>
                  )}

                  <div className="step-footer">
                    <div className="skip-button">
                      {activeStep < steps.length && closable && (
                        <Button onClick={handleStopTour} type="text">
                          {skipButtonText}
                        </Button>
                      )}
                    </div>

                    <div className="navigate-buttons">
                      {activeStep > 0 && (
                        <Button
                          onClick={() => handleNavigateTo('prev')}
                          type="link"
                          variant="success"
                        >
                          {backButtonText}
                        </Button>
                      )}

                      {activeStep >= steps.length - 1 ? (
                        <Button onClick={handleStopTour} variant="success">
                          {finishButtonText}
                        </Button>
                      ) : (
                        <Button onClick={() => handleNavigateTo('next')} variant="success">
                          {nextButtonText} ({activeStep + 1}/{steps.length})
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </Container>
        </>
      )}
    </>
  )
}
