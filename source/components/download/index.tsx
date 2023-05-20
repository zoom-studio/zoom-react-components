import React, { FC, ReactNode } from 'react'

import { useDownload, UseDownloadNS } from '@zoom-studio/zoom-js-ts-utils'

export namespace DownloadNS {
  export interface ChildrenCallbackParams {
    total: number
    received: number
    isDownloading: boolean
    startDownload: () => void
  }

  export interface Props extends UseDownloadNS.Params {
    children?: (params: ChildrenCallbackParams) => ReactNode
  }
}

export const Download: FC<DownloadNS.Props> = ({ children, ...rest }) => {
  const { handleDownload, isDownloading, receivedLength, totalLength } = useDownload({ ...rest })

  return (
    <>
      {children?.({
        isDownloading,
        startDownload: handleDownload,
        total: totalLength,
        received: receivedLength,
      })}
    </>
  )
}
