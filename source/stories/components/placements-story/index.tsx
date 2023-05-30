import React, { type FC } from 'react'

import { sentenceCase } from 'change-case'

import { Button, type ButtonNS, type PopoverNS } from '../../../components'

export namespace PlacementsStoryNS {
  export interface Props<Props> {
    component: FC<Props>
    props: Props
  }
}

export function PlacementsStory<Props = object>({
  component: ProvidedComponent,
  props: providedProps,
}: React.PropsWithChildren<PlacementsStoryNS.Props<Props>>): JSX.Element {
  const Component: FC<ButtonNS.Props & Pick<PopoverNS.Props, 'placement'>> = ({
    placement,
    ...props
  }) => (
    <ProvidedComponent {...providedProps} placement={placement}>
      <Button {...props} full size="small">
        {sentenceCase(placement || '')}
      </Button>
    </ProvidedComponent>
  )

  return (
    <div className="placements-story">
      <table cellSpacing="5">
        <tbody>
          <tr>
            <td></td>
            <td>
              <Component placement="top-start" />
            </td>
            <td>
              <Component placement="top" />
            </td>
            <td>
              <Component placement="top-end" />
            </td>
            <td></td>
          </tr>
          <tr>
            <td>
              <Component placement="left-start" />
            </td>
            <td></td>
            <td></td>
            <td></td>
            <td>
              <Component placement="right-start" />
            </td>
          </tr>
          <tr>
            <td>
              <Component placement="left" />
            </td>
            <td></td>
            <td></td>
            <td></td>
            <td>
              <Component placement="right" />
            </td>
          </tr>
          <tr>
            <td>
              <Component placement="left-end" />
            </td>
            <td></td>
            <td></td>
            <td></td>
            <td>
              <Component placement="right-end" />
            </td>
          </tr>
          <tr>
            <td></td>
            <td>
              <Component placement="bottom-start" />
            </td>
            <td>
              <Component placement="bottom" />
            </td>
            <td>
              <Component placement="bottom-end" />
            </td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
