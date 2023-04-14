import { faker } from '@faker-js/faker'

export type Person = {
  name: {
    first: string
    last: string
  }
  id: number
  age: number
  visits: number
  progress: number
  status: 'relationship' | 'complicated' | 'single'
  address: string
}

const range = (len: number) => {
  const arr = []
  for (let i = 0; i < len; i++) {
    arr.push(i)
  }
  return arr
}

const newPerson = (index: number): Person => {
  return {
    name: {
      first: faker.name.firstName(),
      last: faker.name.lastName(),
    },
    id: index + 1,
    age: faker.datatype.number(40),
    visits: faker.datatype.number(1000),
    progress: faker.datatype.number(100),
    status: faker.helpers.shuffle<Person['status']>(['relationship', 'complicated', 'single'])[0]!,
    address: faker.address.streetAddress(true),
  }
}

export function makeTableData(...lens: number[]) {
  const makeDataLevel = (depth = 0): Person[] => {
    const len = lens[depth]!
    return range(len).map((_, index): Person => {
      return newPerson(index)
    })
  }

  return makeDataLevel()
}
