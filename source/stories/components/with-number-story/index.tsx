import React, { FC, ReactNode, useState } from 'react'
import { ButtonGroup, Text } from '../../../components'
import { useI18n } from '../../hooks/use-i18n'

export namespace WithNumberStoryNS {
  export interface Props {
    children?: (number: number) => ReactNode
    defaultValue?: number
    increaseTitle?: string
    decreaseTitle?: string
    steps?: number
    max?: number
    min?: number
  }
}

export const WithNumberStory: FC<WithNumberStoryNS.Props> = ({
  defaultValue = 0,
  steps = 1,
  max = 100,
  min = 0,
  decreaseTitle,
  increaseTitle,
  children,
}) => {
  const [number, setNumber] = useState(defaultValue)
  const { t } = useI18n('global')

  decreaseTitle = decreaseTitle ?? t('decrease')
  increaseTitle = increaseTitle ?? t('increase')

  const increase = (currentNumber: number): number => {
    const nextNumber = currentNumber + steps
    if (nextNumber <= max) {
      return nextNumber
    }
    return currentNumber
  }

  const decrease = (currentNumber: number): number => {
    const nextNumber = currentNumber - steps
    if (nextNumber >= min) {
      return nextNumber
    }
    return currentNumber
  }

  return (
    <div className="with-number-story">
      <div className="handlers">
        <ButtonGroup
          buttonsProps={{ type: 'dashed' }}
          buttons={[
            { children: increaseTitle, onClick: () => setNumber(increase) },
            { children: decreaseTitle, onClick: () => setNumber(decrease) },
          ]}
        />

        <Text large>{number}</Text>
      </div>
      <div className="story">{children?.(number)}</div>
    </div>
  )
}
