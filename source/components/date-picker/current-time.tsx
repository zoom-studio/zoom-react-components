import React, { useEffect, useState, type FC } from 'react'

import { Dated } from '@zoom-studio/js-ts-utils'

import { Text } from '..'

export namespace CurrentTimeNS {
  export interface Props {
    dated: Dated
  }
}

export const CurrentTime: FC<CurrentTimeNS.Props> = ({ dated: providedDated }) => {
  const [dated, setDated] = useState<Dated>(providedDated)

  useEffect(() => {
    const interval = setInterval(() => {
      setDated(currentDated => new Dated(currentDated.dated, 'gregorian').add(1, 'seconds'))
    }, 1000)

    return () => {
      clearInterval(interval)
    }
  }, [])

  return (
    <div className="current-time">
      <Text large className="time">
        {dated.dated.hour.toString().padStart(2, '0')}
      </Text>

      <Text large className="colon">
        :
      </Text>

      <Text large className="time">
        {dated.dated.minute.toString().padStart(2, '0')}
      </Text>

      <Text large className="colon">
        :
      </Text>

      <Text large className="time">
        {dated.dated.second.toString().padStart(2, '0')}
      </Text>
    </div>
  )
}
