import React, { FC, ReactNode, useState } from 'react'

export namespace ToggleStoryNS {
  export interface Props {
    defaultStatus?: boolean
    children?: (
      status: boolean,
      toggleStatus: () => void,
      setStatus: (status: boolean) => void,
    ) => ReactNode
  }
}

export const ToggleStory: FC<ToggleStoryNS.Props> = ({ children, defaultStatus }) => {
  const [status, setStatus] = useState(!!defaultStatus)
  const toggleStatus = () => setStatus(status => !status)
  return <>{children?.(status, toggleStatus, setStatus)}</>
}
