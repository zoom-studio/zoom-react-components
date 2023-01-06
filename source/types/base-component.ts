import { HTMLAttributes, ReactNode } from 'react'

export interface BaseComponent<Container extends HTMLElement = HTMLDivElement> {
  containerProps?: HTMLAttributes<Container>
  children?: ReactNode
}
