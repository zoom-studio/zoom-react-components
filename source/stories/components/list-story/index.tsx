import React, { type FC, useMemo, useState } from 'react'

import { Input, Title } from '../../../components'

export namespace ListStoryNS {
  export interface Props<Props> {
    withSearch?: boolean
    component: FC<Props>
    props?: Props[]
    nameProp: keyof Props
    maximinRenderedItems?: number
  }
}

export function ListStory<Props = object>({
  withSearch = true,
  component: Component,
  maximinRenderedItems,
  props,
  nameProp,
}: React.PropsWithChildren<ListStoryNS.Props<Props>>): JSX.Element {
  const [query, setQuery] = useState('')

  const normalizeString = (string: string): string => {
    return string.toLowerCase().trim()
  }

  const filteredItems = useMemo<Props[]>(() => {
    const newProps: Props[] = []
    if (!props) {
      return newProps
    }

    const push = (prop: Props) => {
      if (normalizeString(prop[nameProp] as string).includes(query)) {
        newProps.push(prop)
      }
    }

    for (const prop of props) {
      if (!maximinRenderedItems) {
        push(prop)
      } else {
        if (newProps.length < maximinRenderedItems) {
          push(prop)
        }
      }
    }

    return newProps
  }, [query])

  return (
    <div className="list-story">
      {withSearch && (
        <Input
          placeholder="Search..."
          autoFocus
          value={query}
          onInput={evt => {
            setQuery(evt.currentTarget.value.toLowerCase().trim())
          }}
          size="large"
          label="Query"
        />
      )}

      {props && (
        <div className="info">
          <Title h5>
            Showing {filteredItems.length} items of {props.length}
          </Title>
        </div>
      )}

      <div className="items">
        {filteredItems.map((prop, index) => (
          <span key={index} className="item">
            {/* @ts-expect-error */}
            <Component {...prop} />
            <span className="name">{prop[nameProp] as string}</span>
          </span>
        ))}
      </div>
    </div>
  )
}
