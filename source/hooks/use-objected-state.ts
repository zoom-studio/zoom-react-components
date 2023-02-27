import { useState, Dispatch, SetStateAction } from 'react'

export namespace UseObjectedStateNS {
  export interface ReturnType<S = undefined> {
    val: S | undefined
    set: Dispatch<SetStateAction<S | undefined>>
  }
}

export const useObjectedState = <S = undefined>(
  defaultValue?: S,
): UseObjectedStateNS.ReturnType<S> => {
  const [state, setState] = useState(defaultValue)
  return {
    val: state,
    set: setState,
  }
}
