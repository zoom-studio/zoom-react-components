import { useEffect, useState } from 'react'

export namespace UseDownloadNS {
  export interface Params {
    link: string
    fileName?: string
    downloadOnMount?: boolean
    onFailure?: (error?: any) => void
    onSuccess?: () => void
    requestOptions?: RequestInit
  }
}

export const useDownload = ({
  link,
  downloadOnMount,
  fileName,
  onFailure,
  onSuccess,
  requestOptions,
}: UseDownloadNS.Params) => {
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
      document.body.removeChild(anchor)

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

  return { isDownloading, handleDownload }
}
