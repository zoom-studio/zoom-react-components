import { isImage } from '../explorer/utils'
import { FileUtils } from '../../utils'

import { UploaderNS } from '.'

export const getFileInfo = async (
  file: File | UploaderNS.FileInterface,
): Promise<UploaderNS.FileInterface> => {
  if ('lastModified' in file) {
    const { name, size, type: fileType } = file
    const type = fileType?.split('/')[1] ?? '?'
    let imageSource: string | null = null

    if (type && isImage(type)) {
      imageSource = await FileUtils.fileToBase64(file)
    }

    return { name, size, type, imageSource, percentage: 100 }
  }
  return file
}
