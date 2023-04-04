import { faker } from '@faker-js/faker'

export type Person = {
  name: {
    first: string
    last: string
  }
  age: number
  visits: number
  progress: number
  status: 'relationship' | 'complicated' | 'single'
}

const range = (len: number) => {
  const arr = []
  for (let i = 0; i < len; i++) {
    arr.push(i)
  }
  return arr
}

const newPerson = (): Person => {
  return {
    name: {
      first: faker.name.firstName(),
      last: faker.name.lastName(),
    },
    age: faker.datatype.number(40),
    visits: faker.datatype.number(1000),
    progress: faker.datatype.number(100),
    status: faker.helpers.shuffle<Person['status']>(['relationship', 'complicated', 'single'])[0]!,
  }
}

export function makeTableData(...lens: number[]) {
  const makeDataLevel = (depth = 0): Person[] => {
    const len = lens[depth]!
    return range(len).map((d): Person => {
      return newPerson()
    })
  }

  return makeDataLevel()
}
