import { StringUtils } from '.'

export class FileUtils {
  static Base64ToFile = async (base64: string, fileName?: string): Promise<File> => {
    fileName = fileName ?? StringUtils.random()
    const type = base64.split(':')?.[1]?.split(';')?.[0] || 'image/png'
    const response = await fetch(base64)
    const blob = await response.blob()
    return new File([blob], fileName, { type })
  }
}
