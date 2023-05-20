import React, { DependencyList, useEffect, useState } from 'react'

import { AsyncFunction } from '@zoom-studio/zoom-js-ts-utils'

export namespace AsyncWrapperNS {
  export interface ChildrenCallbackParams<Processor extends AsyncFunction> {
    isProcessing: boolean
    processed: Awaited<ReturnType<Processor>> | null
  }

  export interface Props<Processor extends AsyncFunction, Processable> {
    processor: Processor
    processable: Processable
    children: (params: ChildrenCallbackParams<Processor>) => JSX.Element
    deps?: DependencyList
  }
}

export const AsyncWrapper = <Processable, Processor extends AsyncFunction<Processable[]>>({
  processor,
  processable,
  children,
  deps,
}: AsyncWrapperNS.Props<Processor, Processable>) => {
  const [processed, setProcessed] = useState<Awaited<ReturnType<Processor>> | null>(null)

  useEffect(() => {
    void processor(processable).then(setProcessed)
  }, deps ?? [])

  return <>{children({ isProcessing: !processed, processed })}</>
}
