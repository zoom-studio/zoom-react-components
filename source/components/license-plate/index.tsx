import React, { FC, HTMLAttributes } from 'react'

import { usezoomlangComponent } from '../../hooks/use-molang-component'
// import flag from './iran-flag.svg'

export namespace LicensePlateNS {
  export type Sizes = 'small' | 'normal' | 'large'

  export interface Props extends HTMLAttributes<HTMLDivElement> {
    size?: Sizes
    plateNumber: string
  }
}

export const LicensePlate: FC<LicensePlateNS.Props> = ({
  size = 'normal',
  plateNumber,
  className,
  ...rest
}) => {
  const { createClassName } = usezoomlangComponent('license-plate')
  const classes = createClassName(className, size)
  const componentClassName = createClassName(className)
  const number = plateNumber.split('/')

  const innerClass = (classSuffix: string): string =>
    componentClassName + '-' + classSuffix

  return (
    <div {...rest} className={classes}>
      <span className={innerClass('top-section')}>
        <span className={innerClass('top-section-flag-container')}>
          {/* <img
            className={innerClass('top-section-flag-container-flag')}
            src={flag}
            alt="ایران"
          /> */}
          <span className={innerClass('top-section-flag-container-ir')}>
            I.R.
          </span>
          <span className={innerClass('top-section-flag-container-iran')}>
            IRAN
          </span>
        </span>

        <span className={innerClass('top-section-number-first')}>
          {number[0]}
        </span>
      </span>

      <span className={innerClass('number-second')}>{number[1]}</span>
    </div>
  )
}
