import { Dispatch, SetStateAction, useEffect, useState } from 'react'

export const useDependedState = <S>(
  initialState?: S | (() => S),
): [S, Dispatch<SetStateAction<S>>] => {
  const [state, setState] = useState(initialState)

  useEffect(() => {
    setState(initialState)
  }, [initialState])

  return [<S>state, <Dispatch<SetStateAction<S>>>setState]
}
