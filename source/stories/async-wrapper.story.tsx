import React, { FC } from 'react'

import { ComponentMeta } from '@storybook/react'
import { sleep } from '@zoom-studio/zoom-js-ts-utils'

import { AsyncWrapper, Spin } from '../components'
import { color } from '../utils'

export default {
  title: 'Utility/AsyncWrapper',
  component: AsyncWrapper,
  args: {},
} as ComponentMeta<typeof AsyncWrapper>

export const Playground: FC = () => {
  const sampleProcessor = async (processable: string) => {
    await sleep(1000)
    return `some-data-${processable}`
  }

  return (
    <>
      <AsyncWrapper processor={sampleProcessor} processable={':)'}>
        {({ isProcessing, processed }) => (
          <div
            style={{
              border: `1px solid ${color({ source: 'border', tone: 2 })}`,
              margin: '10px 0',
              borderRadius: 8,
            }}
          >
            {isProcessing ? <Spin /> : processed}
          </div>
        )}
      </AsyncWrapper>
    </>
  )
}
