import { useRef, useState } from 'react'

import { faker } from '@faker-js/faker'
import { randomNumber, sleep } from '@zoom-studio/zoom-js-ts-utils'

import { type ChatBubbleNS } from '../..'
import { MESSAGE } from '../../fixtures'

export const useFetchMessages = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState<ChatBubbleNS.Message[]>([])
  const sentQueryCountRef = useRef(0)

  const getRandomMessage = (): ChatBubbleNS.Message => {
    return {
      isMe: false,
      datetime: '2023-06-04',
      seen: randomNumber({ min: 0, max: 1 }) % 0 === 0,
      message: JSON.parse(MESSAGE[randomNumber({ min: 0, max: MESSAGE.length - 1, decimals: 0 })]),
      avatar: faker.image.avatar(),
      time: '18:36',
      userId: randomNumber({ min: 1, decimals: 0 }),
      isImportant: randomNumber({ min: 0, max: 1 }) % 0 === 0,
    }
  }

  const getMessageDate = (): string => {
    const today = new Date()
    today.setDate(today.getDate() - sentQueryCountRef.current / 1.5)
    return `${today.getFullYear()}/${today.getMonth()}/${today.getDate()}`
  }

  const sendQuery = async () => {
    setIsLoading(true)
    await sleep(300)
    setData(currentData => {
      const newData = [...currentData]
      sentQueryCountRef.current = sentQueryCountRef.current + 1
      Array.from(Array(6)).forEach(() => {
        newData.push({
          ...getRandomMessage(),
          isMe: sentQueryCountRef.current % 2 === 0,
          datetime: getMessageDate(),
          userId: sentQueryCountRef.current,
        })
      })
      return newData
    })
    setIsLoading(false)
  }

  return { sendQuery, isLoading, data }
}
