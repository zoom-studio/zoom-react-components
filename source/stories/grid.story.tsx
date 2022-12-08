import React, { FC } from 'react'

import { ComponentMeta } from '@storybook/react'

import { Col, ColNS, Row } from '../components'
import './styles/_grid.scss'

export default {
  title: 'Grid',
  component: Col,
} as ComponentMeta<typeof Col>

const Template: FC<ColNS.Props> = () => (
  <div className="grid-col-story">
    <Row>
      {Array.from(Array(4)).map((_, index) => (
        <Col key={index} lg={6} md={12} sm={24} xs={24}>
          <div>{(index + 1).toString().padStart(2, '0')}</div>
        </Col>
      ))}

      {/* {Array.from(Array(24)).map((_, index) => (
        <Col key={index} xs={6} sm={4} md={2} lg={1}>
          <div>{(index + 1).toString().padStart(2, '0')}</div>
        </Col>
      ))} */}
    </Row>
  </div>
)

export const Grid = Template.bind({})
