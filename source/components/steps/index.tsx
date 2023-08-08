import React, { Fragment, forwardRef, type MouseEvent, type ReactNode } from 'react'

import { classNames } from '@zoom-studio/js-ts-utils'

import { Icon, Progress, ScrollView, Spin, Text } from '..'
import { useZoomComponent } from '../../hooks'
import { type BaseComponent } from '../../types'

export namespace StepsNS {
  export interface Step {
    title?: ReactNode
    description?: ReactNode
    loading?: boolean
    progress?: number
    disabled?: boolean
    onClick?: (evt: MouseEvent<HTMLDivElement>) => void
  }

  export interface Props extends Omit<BaseComponent, 'children'> {
    steps: Step[]
    currentStepIndex?: number
    disabled?: boolean
  }
}

export const Steps = forwardRef<HTMLDivElement, StepsNS.Props>(
  (
    { steps = [], currentStepIndex = -1, disabled, className, containerProps, ...rest },
    reference,
  ) => {
    const { createClassName } = useZoomComponent('steps')

    const classes = createClassName(className, '', {
      [createClassName('', 'disabled')]: !!disabled,
    })

    const isStepPassed = (stepIndex: number): boolean => {
      return currentStepIndex > stepIndex && currentStepIndex !== -1
    }

    const isStepActive = (stepIndex: number): boolean => {
      return stepIndex === currentStepIndex
    }

    const getStepClasses = (step: StepsNS.Step, index: number): string => {
      return classNames('step', {
        'active': isStepActive(index),
        'passed': isStepPassed(index),
        'disabled': step.disabled || disabled,
        'clickable': !!step.onClick && !step.disabled && !disabled,
        'loading': step.loading,
        'single-title': (!!step.title && !step.description) || (!!step.description && !step.title),
      })
    }

    const getConnectorClasses = (index: number): string => {
      return classNames('connector', {
        passed: isStepPassed(index),
      })
    }

    const performStepOnClick = (stepIndex: number) => (evt: MouseEvent<HTMLDivElement>) => {
      const step = steps[stepIndex]
      if (step?.onClick && !step.disabled && !disabled) {
        step.onClick(evt)
      }
    }

    return (
      <div {...containerProps} {...rest} className={classes} ref={reference}>
        <ScrollView maxHeight="unset">
          {steps.map((step, index) => (
            <Fragment key={index}>
              <div className={getStepClasses(step, index)} onClick={performStepOnClick(index)}>
                <div className="sign">
                  <div className="sign-content">
                    {!!step.progress && (
                      <Progress
                        className="step-progress"
                        type="circular"
                        steps={{ percentage: step.progress }}
                        circularSize={40}
                        circularStroke={3}
                      />
                    )}

                    {step.loading ? (
                      <Spin
                        className="step-spin"
                        color={color => color({ source: isStepActive(index) ? 'accent' : 'text' })}
                      />
                    ) : isStepPassed(index) ? (
                      <Icon className="step-icon" name="check" />
                    ) : (
                      <Text className="step-number">{index + 1}</Text>
                    )}
                  </div>
                </div>

                <div className="titles">
                  {step.title && (
                    <Text large bold className="title">
                      {step.title}
                    </Text>
                  )}
                  {step.description && (
                    <Text small className="description">
                      {step.description}
                    </Text>
                  )}
                </div>
              </div>

              {index <= steps.length - 2 && <span className={getConnectorClasses(index)} />}
            </Fragment>
          ))}
        </ScrollView>
      </div>
    )
  },
)
