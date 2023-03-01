export class CanvasUtils {
  static toBlob = async (canvas: HTMLCanvasElement) => {
    const dataURL = canvas.toDataURL()
    const result = await fetch(dataURL)
    return await result.blob()
  }

  static toBlobURL = async (canvas: HTMLCanvasElement) => {
    const blob = await CanvasUtils.toBlob(canvas)
    return URL.createObjectURL(blob)
  }
}
