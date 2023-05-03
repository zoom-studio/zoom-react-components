import React, { FC, ReactNode } from 'react'

import { useDownload, UseDownloadNS } from '@zoom-studio/zoom-js-ts-utils'

export namespace DownloadNS {
  export interface ChildrenCallbackParams {
    isDownloading: boolean
    startDownload: () => void
  }

  export interface Props extends UseDownloadNS.Params {
    children?: (params: ChildrenCallbackParams) => ReactNode
  }
}

export const Download: FC<DownloadNS.Props> = ({ children, ...rest }) => {
  const { handleDownload, isDownloading } = useDownload({ ...rest })
  return <>{children?.({ isDownloading, startDownload: handleDownload })}</>
}
