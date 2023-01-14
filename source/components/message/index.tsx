import React, { FC } from 'react'

import { Toaster } from 'react-hot-toast'

import { useZoomComponent } from '../../hooks'

export const Message: FC = () => {
  const { createClassName } = useZoomComponent('message-react-hot-toast')
  const className = createClassName()

  return <Toaster containerClassName={className} />
}
