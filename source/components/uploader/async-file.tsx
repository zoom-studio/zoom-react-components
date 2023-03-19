import React, { FC, useEffect, useState } from 'react'

import { UploaderNS } from '.'
import { getFileInfo } from './utils'

export namespace AsyncUploaderFileNS {
  export interface Props {
    file: UploaderNS.FileInterface | File
  }
}

export const AsyncUploaderFile: FC<AsyncUploaderFileNS.Props> = ({ file: providedFile }) => {
  const [file, setFile] = useState<UploaderNS.FileInterface | null>(null)

  useEffect(() => {
    void getFileInfo(providedFile).then(setFile)
  }, [providedFile])

  return file ? <></> : <></>
}
