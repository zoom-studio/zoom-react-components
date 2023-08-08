import { useCallback, useState } from 'react'

import { faker } from '@faker-js/faker'
import { sleep } from '@zoom-studio/js-ts-utils'

export namespace UseFetchNS {
  export interface Prams {
    itemsPerQuery?: number
    sleepTime?: number
    maxItems?: number
  }
}

export const useFetch = (params?: UseFetchNS.Prams) => {
  const itemsPerQuery = params?.itemsPerQuery ?? 20
  const sleepTime = params?.sleepTime ?? 700
  const maxItems = params?.maxItems

  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState<string[]>([])
  const [hasMore, setHasMore] = useState(true)

  const getRandomAddresses = (startingIndex: number, length: number): string[] => {
    const addresses: string[] = []
    for (let i = startingIndex; i < length + startingIndex; i++) {
      addresses.push(`${i + 1}. ${faker.address.streetAddress(true)}`)
    }
    return addresses
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
        newData.push(...getRandomAddresses(newData.length, newDataLength))
      }
      setHasMore(maxItems ? newData.length < maxItems : true)
      return newData
    })
    setIsLoading(false)
  }, [])

  return { sendQuery, data, isLoading, hasMore }
}
