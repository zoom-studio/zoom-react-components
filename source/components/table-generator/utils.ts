const ROW_DATA_ATTRIBUTE = 'data-row-index'
const COL_DATA_ATTRIBUTE = 'data-col-index'

export const findInput = (rowIndex: number, colIndex: number): HTMLInputElement | undefined => {
  return document.querySelector(
    `input[${ROW_DATA_ATTRIBUTE}="${rowIndex}"][${COL_DATA_ATTRIBUTE}="${colIndex}"]`,
  ) as HTMLInputElement
}
