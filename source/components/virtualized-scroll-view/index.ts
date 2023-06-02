import { type ScrollViewNS } from '../scroll-view'

export namespace VirtualizedScrollViewNS {
  export interface Props {
    scrollViewProps?: Omit<ScrollViewNS.Props, 'children'>
  }
}

export * as VirtualizedScrollView from './virtualizers'
