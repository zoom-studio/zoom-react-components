import { faker } from '@faker-js/faker'
import { randomImage, randomNumber, randomPDF } from '@zoom-studio/zoom-js-ts-utils'

import { ExplorerNS } from '../components'

import { shuffle } from 'lodash'

const getFileDate = (date: Date) => {
  return `${date.getFullYear()}/${date.getMonth()}/${date.getDate()}, ${date.getHours()}:${date.getMinutes()}`
}

export const explorerImageFile = (
  id?: number,
  type?: ExplorerNS.MaybeImageType,
): ExplorerNS.FileInterface => {
  id = id ?? faker.datatype.number({ min: 1, max: 200, precision: 1 })
  type =
    type ??
    ExplorerNS.ImageType[
      faker.datatype.number({ min: 0, max: ExplorerNS.ImageType.length - 1, precision: 1 })
    ]
  return {
    id,
    type,
    name: faker.system.fileName({ extensionCount: 0 }).concat(`.${type}`),
    size: faker.datatype.number({ min: 200, max: 200000, precision: 0.01 }),
    link: randomImage(undefined, undefined, 'cats'),
    createdAt: getFileDate(faker.datatype.datetime()),
    updatedAt: getFileDate(faker.datatype.datetime()),
    moreInfo: [
      {
        displayName: 'Image size',
        value: `${faker.datatype.number({
          min: 500,
          max: 2000,
          precision: 1,
        })}x${faker.datatype.number({ min: 500, max: 2000, precision: 1 })}`,
      },
    ],
  }
}

export const explorerVideoFile = (
  id?: number,
  type?: ExplorerNS.MaybeVideoType,
): ExplorerNS.FileInterface => {
  id = id ?? faker.datatype.number({ min: 1, max: 200, precision: 1 })
  type =
    type ??
    ExplorerNS.VideoType[
      faker.datatype.number({ min: 0, max: ExplorerNS.VideoType.length - 1, precision: 1 })
    ]

  const videos = [
    'https://www.w3schools.com/html/movie.mp4',
    'https://www.w3schools.com/html/mov_bbb.mp4',
  ]

  return {
    id,
    type,
    name: faker.system.fileName({ extensionCount: 0 }).concat(`.${type}`),
    size: faker.datatype.number({ min: 200, max: 200000, precision: 0.01 }),
    link: videos[randomNumber({ min: 0, max: videos.length - 1 })],
    createdAt: getFileDate(faker.datatype.datetime()),
    updatedAt: getFileDate(faker.datatype.datetime()),
    moreInfo: [
      {
        displayName: 'Video size',
        value: `${faker.datatype.number({
          min: 500,
          max: 2000,
          precision: 1,
        })}x${faker.datatype.number({ min: 500, max: 2000, precision: 1 })}`,
      },
    ],
  }
}

export const explorerPDFFile = (id?: number): ExplorerNS.FileInterface => {
  id = id ?? faker.datatype.number({ min: 1, max: 200, precision: 1 })
  return {
    id,
    type: 'pdf',
    name: faker.system.fileName({ extensionCount: 0 }).concat('.pdf'),
    size: faker.datatype.number({ min: 200, max: 200000, precision: 0.01 }),
    link: randomPDF(),
    createdAt: getFileDate(faker.datatype.datetime()),
    updatedAt: getFileDate(faker.datatype.datetime()),
  }
}

export const explorerRandomFile = (id?: number): ExplorerNS.FileInterface => {
  id = id ?? faker.datatype.number({ min: 1, max: 200, precision: 1 })
  return {
    id,
    type: faker.system.fileExt(),
    name: faker.system.fileName(),
    size: faker.datatype.number({ min: 200, max: 200000, precision: 0.01 }),
    link: faker.internet.url(),
    createdAt: getFileDate(faker.datatype.datetime()),
    updatedAt: getFileDate(faker.datatype.datetime()),
  }
}

export const generateExplorerFiles = (length = 10, shuffled = true): ExplorerNS.FileInterface[] => {
  const knownTypesLength = parseInt((length / 4).toString())
  const unknownTypesLength = length - knownTypesLength * 2

  const images = Array.from(Array(knownTypesLength)).map((_, index) => explorerImageFile(index + 1))
  const videos = Array.from(Array(knownTypesLength)).map((_, index) => explorerVideoFile(index + 1))
  const PDFs = Array.from(Array(knownTypesLength)).map((_, index) =>
    explorerPDFFile(index + knownTypesLength + 1),
  )
  const others = Array.from(Array(unknownTypesLength)).map((_, index) =>
    explorerRandomFile(index + 1 + knownTypesLength * 2),
  )

  const files = [...images, ...PDFs, ...videos, ...others]

  if (shuffled) {
    return shuffle(files)
  }
  return files
}
