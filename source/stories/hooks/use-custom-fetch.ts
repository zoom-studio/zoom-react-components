import { useCallback, useState } from 'react'

import { sleep } from '@zoom-studio/js-ts-utils'

export namespace UseCustomFetchNS {
  export interface Prams<DataType> {
    makeData: (length: number) => DataType[]
    itemsPerQuery?: number
    sleepTime?: number
    maxItems?: number
  }
}

export const useCustomFetch = <DataType>({
  itemsPerQuery = 20,
  sleepTime = 700,
  makeData,
  maxItems,
}: UseCustomFetchNS.Prams<DataType>) => {
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState<DataType[]>([])
  const [hasMore, setHasMore] = useState(true)

  const getRandomData = (startingIndex: number, length: number): DataType[] => {
    const data: DataType[] = []
    for (let i = startingIndex; i < length + startingIndex; i++) {
      data.push(...makeData(1))
    }
    return data
  }

  const sendQuery = useCallback(async () => {
    setIsLoading(true)
    await sleep(sleepTime)
    setData(currentData => {
      const newData = [...currentData]
      if (!maxItems || currentData.length < maxItems) {
        const newDataLength = !maxItems
          ? itemsPerQuery
          : maxItems - newData.length >= itemsPerQuery
          ? itemsPerQuery
          : maxItems - newData.length
        newData.push(...getRandomData(newData.length, newDataLength))
      }
      setHasMore(maxItems ? newData.length < maxItems : true)
      return newData
    })
    setIsLoading(false)
  }, [])

  return { sendQuery, data, isLoading, hasMore }
}
