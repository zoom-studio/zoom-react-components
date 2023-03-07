import React, { FC, ReactNode, useEffect, useState } from 'react'

export namespace DownloadNS {
  export interface ChildrenCallbackParams {
    isDownloading: boolean
    startDownload: () => void
  }

  export interface Props {
    link: string
    fileName?: string
    children?: (params: ChildrenCallbackParams) => ReactNode
    downloadOnMount?: boolean
    onFailure?: (error?: any) => void
    onSuccess?: () => void
    requestOptions?: RequestInit
  }
}

export const Download: FC<DownloadNS.Props> = ({
  link,
  downloadOnMount,
  children,
  fileName,
  onFailure,
  onSuccess,
  requestOptions,
}) => {
  const [isDownloading, setIsDownloading] = useState(false)

  const handleDownload = async (): Promise<void> => {
    setIsDownloading(true)

    try {
      const response = await fetch(link, requestOptions)
      const blob = await response.blob()
      const objectURL = window.URL.createObjectURL(blob)

      const anchor = document.createElement('a')
      anchor.style.display = 'none'
      anchor.href = objectURL
      anchor.download =
        fileName ?? link.split('/').pop()?.split('?')?.[0] ?? new Date().toISOString()

      document.body.appendChild(anchor)
      anchor.click()
      window.URL.revokeObjectURL(objectURL)

      onSuccess?.()
    } catch (error) {
      onFailure?.(error)
    } finally {
      setIsDownloading(false)
    }
  }

  useEffect(() => {
    if (downloadOnMount) {
      void handleDownload()
    }
  }, [])

  return <>{children?.({ isDownloading, startDownload: handleDownload })}</>
}
