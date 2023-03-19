import { StringUtils } from '.'

export class FileUtils {
  static Base64ToFile = async (base64: string, fileName?: string): Promise<File> => {
    fileName = fileName ?? StringUtils.random()
    const type = base64.split(':')?.[1]?.split(';')?.[0] || 'image/png'
    const response = await fetch(base64)
    const blob = await response.blob()
    return new File([blob], fileName, { type })
  }

  static fileToBase64 = async (
    file: File,
    onError?: (error: ProgressEvent<FileReader>) => void,
  ): Promise<string | null> => {
    const toBase64 = async (): Promise<string | null> => {
      return await new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => resolve(<string | null>reader.result)
        reader.onerror = reject
      })
    }

    try {
      return await toBase64()
    } catch (error) {
      onError?.(error as ProgressEvent<FileReader>)
      return null
    }
  }

  static sizeToString = (fileSize: number, decimalPoint = 2): string => {
    const eachKBs = 1000
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
    const i = Math.floor(Math.log(fileSize || 1) / Math.log(eachKBs))

    return parseFloat((fileSize / Math.pow(eachKBs, i)).toFixed(decimalPoint))
      .toString()
      .concat('.')
      .concat(sizes[i])
  }

  static fileListToArray = (fileList: FileList | null | undefined): File[] => {
    if (!fileList) {
      return []
    }
    return Array.from(Array(fileList.length)).map((_, index) => fileList.item(index)!)
  }
}
