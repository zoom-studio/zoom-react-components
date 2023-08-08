import React, { cloneElement, forwardRef, useEffect, useRef, useState } from 'react'

import { type MaybeString } from '@zoom-studio/js-ts-utils'

import { type Transition } from '../../types'

export namespace CollapseNS {
  export interface Props {
    expanded?: boolean
    children?: JSX.Element
    childHeight?: MaybeString<'auto-detect'> | number | ((detectedHeight: number) => number)
    transition?: Transition
  }
}

export const Collapse = forwardRef<HTMLElement, CollapseNS.Props>(
  (
    {
      childHeight: providedChildHeight = 'auto-detect',
      transition: providedTransition,
      children,
      expanded,
    },
    reference,
  ) => {
    const childrenRef = reference ?? useRef<HTMLElement>(null)

    const [childHeight, setChildHeight] = useState(
      providedChildHeight === 'auto-detect' || typeof providedChildHeight === 'function'
        ? 0
        : providedChildHeight,
    )

    const getTransition = (): string => {
      const transition: Transition = {
        delay: providedTransition?.delay ?? '0ms',
        duration: providedTransition?.duration ?? '150ms',
        property: providedTransition?.property ?? 'max-height',
        timingFunction: providedTransition?.timingFunction ?? 'ease',
      }

      const { property, duration, timingFunction, delay } = transition
      return `${property} ${duration} ${timingFunction} ${delay}`
    }

    useEffect(() => {
      if (
        'current' in childrenRef &&
        childrenRef.current &&
        (providedChildHeight === 'auto-detect' || typeof providedChildHeight === 'function')
      ) {
        const { scrollHeight, clientHeight } = childrenRef.current
        let detectedHeight = scrollHeight || clientHeight

        if (typeof providedChildHeight === 'function') {
          detectedHeight = providedChildHeight(detectedHeight)
        }

        setChildHeight(detectedHeight)
      }
    }, [children, childrenRef, providedChildHeight])

    return (
      <>
        {cloneElement(children ?? <></>, {
          ref: childrenRef,
          style: {
            transition: getTransition(),
            maxHeight: expanded ? childHeight : 0,
            overflow: 'hidden',
          },
        })}
      </>
    )
  },
)
