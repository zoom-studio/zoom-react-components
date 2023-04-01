import { ContentState, convertToRaw, RawDraftContentState } from 'draft-js'

export const useExportData = (contentState: ContentState) => {
  function exportData(): RawDraftContentState
  function exportData<T extends boolean | undefined>(
    compressed: T,
  ): T extends true ? string : RawDraftContentState

  function exportData(compressed?: boolean): RawDraftContentState | string {
    const data = convertToRaw(contentState)
    if (compressed === true) {
      JSON.stringify(data)
    }
    return data
  }

  return exportData
}
