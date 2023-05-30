import React, { type FC } from 'react'

import { type Meta } from '@storybook/react'

import { Button, Download, type DownloadNS, Progress } from '../components'
import { formatFileSize } from '@zoom-studio/zoom-js-ts-utils'

export default {
  title: 'Utility/Download',
  component: Download,
  args: {
    link: 'https://speed.hetzner.de/100MB.bin',
  },
} as Meta<typeof Download>

export const Playground: FC<DownloadNS.Props> = props => {
  return (
    <Download {...props}>
      {({ isDownloading, startDownload, received, total }) => (
        <>
          <Button onClick={startDownload}>
            {isDownloading ? 'Downloading...' : 'Start download'}
          </Button>

          {isDownloading && (
            <Progress
              steps={{
                percentage: (100 * received) / total,
                title: `Received ${formatFileSize(received)} of ${formatFileSize(total)}`,
                popoverProps: {
                  isOpen: true,
                  placement: 'bottom-start',
                },
              }}
            />
          )}
        </>
      )}
    </Download>
  )
}
