import React, { FC, ReactNode } from 'react'

import { ComponentMeta } from '@storybook/react'

import { Col, ColNS, Row } from '../components'
import { color } from '../utils'
import { CommonStory } from './components'

export default {
  title: 'Layout/Grid',
  component: Col,
} as ComponentMeta<typeof Col>

const Child: FC<{ children?: ReactNode }> = ({ children }) => (
  <div
    style={{
      width: '100%',
      height: 100,
      backgroundColor: color({ source: 'layer', tone: 3 }),
      color: color({ source: 'text', tone: 2 }),
      border: `1px solid ${color({ source: 'border', tone: 2 })}`,
      display: 'flex',
      placeContent: 'center',
      flexWrap: 'wrap',
    }}
  >
    {children}
  </div>
)

export const The24Cols: FC<ColNS.Props> = () => (
  <CommonStory
    component={Col}
    stories={[
      {
        custom: (
          <Row>
            {Array.from(Array(24)).map((_, index) => (
              <Col key={index} lg={6} md={12} sm={24} xs={24}>
                <Child>{(index + 1).toString().padStart(2, '0')}</Child>
              </Col>
            ))}
          </Row>
        ),
      },
    ]}
  />
)

export const Playground: FC<ColNS.Props> = props => {
  return (
    <Row>
      {Array.from(Array(4)).map((_, index) => (
        <Col {...props} key={index}>
          <Child>col</Child>
        </Col>
      ))}
    </Row>
  )
}
