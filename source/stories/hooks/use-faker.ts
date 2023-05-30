import { useMemo } from 'react'

import { Faker, en, fa } from '@faker-js/faker'

import { useSettings } from './use-settings'

export const useFaker = () => {
  const { language } = useSettings()

  const localeFaker = useMemo<Faker>(() => {
    const customFaker = new Faker({ locale: [language === 'fa' ? fa : en] })
    return customFaker
  }, [language])

  return localeFaker
}
