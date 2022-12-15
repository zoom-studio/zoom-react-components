import { LoremIpsum } from 'lorem-ipsum'

export const lorem = (length = 50) => {
  const lorem = new LoremIpsum()
  return lorem.generateSentences(length)
}
