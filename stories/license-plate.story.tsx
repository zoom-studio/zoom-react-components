import React, { FC } from 'react'

import { ComponentMeta } from '@storybook/react'

import {
  LicensePlate as LicensePlateComponent,
  LicensePlateNS,
} from '../source/components'
import './styles/_license-plate.scss'

export default {
  title: 'LicensePlate',
  component: LicensePlateComponent,
} as ComponentMeta<typeof LicensePlateComponent>

export const LicensePlate: FC<LicensePlateNS.Props> = () => (
  <>
    <div className="storybook-license-plate-component-container">
      <LicensePlateComponent plateNumber="123/56789" size="small" />
      <LicensePlateComponent plateNumber="123/56789" size="normal" />
      <LicensePlateComponent plateNumber="123/56789" size="large" />
    </div>
  </>
)
