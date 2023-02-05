import { useMemo } from 'react'

import { faker } from '@faker-js/faker'

import { useSettings } from './use-settings'

export const useFaker = () => {
  const { language } = useSettings()

  const localeFaker = useMemo<typeof faker>(() => {
    faker.locale = language
    return faker
  }, [language])

  return localeFaker
}
