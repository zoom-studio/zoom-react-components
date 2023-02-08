import React, { FC } from 'react'

import { ComponentMeta } from '@storybook/react'

import { Button, Divider, Stack, StackNS } from '../components'
import { color } from '../utils'
import { CommonStory } from './components'

export default {
  title: 'Layout/Stack',
  component: Stack,
  args: {
    align: 'center',
    justify: 'flex-start',
    direction: 'row',
    spacing: 6,
    dividers: '⏺',
    broken: false,
    inline: false,
    dividerFirst: false,
  },
} as ComponentMeta<typeof Stack>

export const FlexDirection = () => {
  return (
    <CommonStory
      component={Stack}
      stories={StackNS.Directions.map(direction => ({
        title: direction,
        custom: (
          <>
            <Stack
              direction={direction}
              style={{
                border: `6px solid ${color({ source: 'border', tone: 2 })}`,
                minHeight: 100,
              }}
            >
              <Button>Button 1</Button>
              <Button>Button 2</Button>
              <Button>Button 3</Button>
            </Stack>
          </>
        ),
      }))}
    />
  )
}

export const AlignItems = () => {
  return (
    <CommonStory
      component={Stack}
      stories={StackNS.Aligns.map(align => ({
        title: align,
        custom: (
          <>
            <Stack
              align={align}
              style={{
                border: `6px solid ${color({ source: 'border', tone: 2 })}`,
                minHeight: 100,
              }}
            >
              <Button>Button 1</Button>
              <Button>Button 2</Button>
              <Button>Button 3</Button>
            </Stack>
          </>
        ),
      }))}
    />
  )
}

export const JustifyContent = () => {
  return (
    <CommonStory
      component={Stack}
      stories={StackNS.Justifies.map(justify => ({
        title: justify,
        custom: (
          <>
            <Stack
              justify={justify}
              style={{
                border: `6px solid ${color({ source: 'border', tone: 2 })}`,
                minHeight: 100,
              }}
            >
              <Button>Button 1</Button>
              <Button>Button 2</Button>
              <Button>Button 3</Button>
            </Stack>
          </>
        ),
      }))}
    />
  )
}

export const DividedChildren = () => {
  return (
    <CommonStory
      component={Stack}
      stories={[
        {
          title: 'Single divider for all children',
          custom: (
            <Stack dividers={<Divider vertical />}>
              <Button>Button 1</Button>
              <Button>Button 2</Button>
              <Button>Button 3</Button>
              <Button>Button 4</Button>
            </Stack>
          ),
        },
        {
          title: 'Custom dividers for each child',
          custom: (
            <Stack
              dividers={[
                <span key={0} style={{ color: color({ source: 'error' }) }}>
                  ⏺
                </span>,
                <span key={0} style={{ color: color({ source: 'success' }) }}>
                  ⏺
                </span>,
                <span key={0} style={{ color: color({ source: 'warning' }) }}>
                  ⏺
                </span>,
              ]}
            >
              <Button>Button 1</Button>
              <Button>Button 2</Button>
              <Button>Button 3</Button>
              <Button>Button 4</Button>
            </Stack>
          ),
        },
        {
          title: 'Columnar divider mode',
          custom: (
            <Stack direction="column" align="stretch" dividers={<Divider>Divider</Divider>}>
              <Button>Button 1</Button>
              <Button>Button 2</Button>
              <Button>Button 3</Button>
              <Button>Button 4</Button>
            </Stack>
          ),
        },
        {
          title: 'Dividers first',
          custom: (
            <Stack
              dividerFirst
              align="stretch"
              direction="column"
              dividers={<Divider>Divider</Divider>}
            >
              <Button>Button 1</Button>
              <Button>Button 2</Button>
              <Button>Button 3</Button>
              <Button>Button 4</Button>
            </Stack>
          ),
        },
      ]}
    />
  )
}

export const Spacing = () => {
  return (
    <CommonStory
      component={Stack}
      stories={[
        {
          title: '6px gap between items (Default)',
          custom: (
            <>
              <Stack>
                <Button>Button 1</Button>
                <Button>Button 2</Button>
                <Button>Button 3</Button>
                <Button>Button 4</Button>
              </Stack>

              <br />
              <br />
              <br />

              <Stack direction="column">
                <Button>Button 1</Button>
                <Button>Button 2</Button>
                <Button>Button 3</Button>
                <Button>Button 4</Button>
              </Stack>
            </>
          ),
        },
        {
          title: '30px gap',
          custom: (
            <>
              <Stack spacing={30}>
                <Button>Button 1</Button>
                <Button>Button 2</Button>
                <Button>Button 3</Button>
                <Button>Button 4</Button>
              </Stack>

              <br />
              <br />
              <br />

              <Stack direction="column" spacing={30}>
                <Button>Button 1</Button>
                <Button>Button 2</Button>
                <Button>Button 3</Button>
                <Button>Button 4</Button>
              </Stack>
            </>
          ),
        },
      ]}
    />
  )
}

export const BrokenItems = () => {
  return (
    <CommonStory
      component={Stack}
      stories={[
        {
          title: 'None broken items',
          custom: (
            <>
              <Stack style={{ maxWidth: '100%', overflow: 'auto' }}>
                {Array.from(Array(30)).map((_, index) => (
                  <Button key={index}>Button {index + 1}</Button>
                ))}
              </Stack>
            </>
          ),
        },
        {
          title: 'Broken items',
          custom: (
            <>
              <Stack broken>
                {Array.from(Array(30)).map((_, index) => (
                  <Button key={index}>Button {index + 1}</Button>
                ))}
              </Stack>
            </>
          ),
        },
      ]}
    />
  )
}

export const AdjustSingleItem = () => {
  return (
    <CommonStory
      component={Stack}
      stories={[
        {
          custom: (
            <Stack
              align="flex-start"
              style={{
                border: `6px solid ${color({ source: 'border', tone: 2 })}`,
                minHeight: 100,
              }}
            >
              <Button>Button 1</Button>
              <Button>Button 2</Button>
              <Button>Button 3</Button>

              <Stack.item align="center" justify="center" grow={1} basis="5px">
                <Button variant="warning">Adjusted button</Button>
              </Stack.item>

              <Button>Button 5</Button>
              <Button>Button 6</Button>
              <Button>Button 7</Button>
            </Stack>
          ),
        },
      ]}
    />
  )
}

export const Playground: FC<StackNS.Props> = props => {
  return (
    <div style={{ color: color({ source: 'text' }) }}>
      <Stack {...props}>
        <Stack.item align="flex-end">
          <Button>Button 1</Button>
        </Stack.item>

        <Button>Button 2</Button>
        <Button>Button 3</Button>
        <Button>Button 4</Button>
      </Stack>
    </div>
  )
}
