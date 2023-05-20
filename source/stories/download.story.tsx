import React, { FC } from 'react'

import { ComponentMeta } from '@storybook/react'

import { Button, Download, DownloadNS, Progress } from '../components'
import { formatFileSize } from '@zoom-studio/zoom-js-ts-utils'

export default {
  title: 'Utility/Download',
  component: Download,
  args: {
    link: 'https://speed.hetzner.de/100MB.bin',
  },
} as ComponentMeta<typeof Download>

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
