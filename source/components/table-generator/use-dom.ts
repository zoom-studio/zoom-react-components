import { type MutableRefObject } from 'react'

import { TableGeneratorNS, type ZoomGlobalConfigProviderNS } from '../..'
import { logs } from '../../constants'

export namespace UseTableGeneratorDomNS {
  export interface Params {
    sendLog: ZoomGlobalConfigProviderNS.Log
    tableRef: MutableRefObject<HTMLTableElement | null>
  }
}

export const useTableGeneratorDOM = ({ sendLog, tableRef }: UseTableGeneratorDomNS.Params) => {
  const getTable = (
    logDescription: string,
    callback?: (table: HTMLTableElement) => void,
  ): HTMLTableElement | undefined => {
    const { current: table } = tableRef

    if (!table) {
      sendLog(logs.tableGeneratorTableRefNotFound, logDescription)
      return
    }
    callback?.(table)

    return table
  }

  const deactiveCurrentActiveColActions = () => {
    getTable('deactiveCurrentActiveColActions fn', table => {
      const currentActiveColActions = table.querySelectorAll(
        `.${TableGeneratorNS.CLASS_NAMES.colActions}.active`,
      )

      currentActiveColActions.forEach(colAction => {
        colAction.classList.remove('active')
      })
    })
  }

  const deactiveCurrentActiveRowActions = () => {
    getTable('deactiveCurrentActiveRowActions fn', table => {
      const currentActiveRowActions = table.querySelectorAll(
        `.${TableGeneratorNS.CLASS_NAMES.rowActions}.active`,
      )
      currentActiveRowActions.forEach(rowAction => {
        rowAction.classList.remove('active')
      })
    })
  }

  const activeColActions = (colIndex: number) => {
    getTable('activeColActions fn', table => {
      table
        .querySelector(`.${TableGeneratorNS.CLASS_NAMES.colActions}[data-col-index="${colIndex}"]`)
        ?.classList.add('active')
    })
  }

  const activeRowActions = (rowIndex: number) => {
    getTable('activeRowActions fn', table => {
      table
        .querySelector(`.${TableGeneratorNS.CLASS_NAMES.rowActions}[data-row-index="${rowIndex}"]`)
        ?.classList.add('active')
    })
  }

  const unRemovalAllRemovalInputCells = () => {
    getTable('unRemovalAllRemovalInputCells fn', table => {
      table
        .querySelectorAll(`.${TableGeneratorNS.CLASS_NAMES.inputCell}.removal`)
        .forEach(inputCell => {
          inputCell.classList.remove('removal')
        })
    })
  }

  const removalInputCellsByColIndex = (colIndex: number) => {
    getTable('removalInputCellsByColIndex fn', table => {
      table
        .querySelectorAll(
          `.${TableGeneratorNS.CLASS_NAMES.inputCell}[data-col-index="${colIndex}"]`,
        )
        .forEach(inputCell => {
          inputCell.classList.add('removal')
        })
    })
  }

  const removalInputCellsByRowIndex = (rowIndex: number) => {
    getTable('removalInputCellsByRowIndex fn', table => {
      table
        .querySelectorAll(
          `.${TableGeneratorNS.CLASS_NAMES.inputCell}[data-row-index="${rowIndex}"]`,
        )
        .forEach(inputCell => {
          inputCell.classList.add('removal')
        })
    })
  }

  const removeAllMarkedAsAppendToLeftInputCells = () => {
    getTable('removeAllMarkedAsAppendToLeftInputCells fn', table => {
      table
        .querySelectorAll(`.${TableGeneratorNS.CLASS_NAMES.inputCell}.append-to-left`)
        .forEach(inputCell => {
          inputCell.classList.remove('append-to-left')
        })
    })
  }

  const removeAllMarkedAsAppendToRightInputCells = () => {
    getTable('removeAllMarkedAsAppendToRightInputCells fn', table => {
      table
        .querySelectorAll(`.${TableGeneratorNS.CLASS_NAMES.inputCell}.append-to-right`)
        .forEach(inputCell => {
          inputCell.classList.remove('append-to-right')
        })
    })
  }

  const removeAllMarkedAsAppendToTopInputCells = () => {
    getTable('removeAllMarkedAsAppendToTopInputCells fn', table => {
      table
        .querySelectorAll(`.${TableGeneratorNS.CLASS_NAMES.inputCell}.append-to-top`)
        .forEach(inputCell => {
          inputCell.classList.remove('append-to-top')
        })
    })
  }

  const removeAllMarkedAsAppendToBottomInputCells = () => {
    getTable('removeAllMarkedAsAppendToBottomInputCells fn', table => {
      table
        .querySelectorAll(`.${TableGeneratorNS.CLASS_NAMES.inputCell}.append-to-bottom`)
        .forEach(inputCell => {
          inputCell.classList.remove('append-to-bottom')
        })
    })
  }

  const markInputCellsAsAppendToLeftByColIndex = (colIndex: number) => {
    getTable('markInputCellsAsAppendToLeftByColIndex fn', table => {
      table
        .querySelectorAll(
          `.${TableGeneratorNS.CLASS_NAMES.inputCell}[data-col-index="${colIndex}"]`,
        )
        .forEach(inputCell => {
          inputCell.classList.add('append-to-left')
        })
    })
  }

  const markInputCellsAsAppendToRightByColIndex = (colIndex: number) => {
    getTable('markInputCellsAsAppendToRightByColIndex fn', table => {
      table
        .querySelectorAll(
          `.${TableGeneratorNS.CLASS_NAMES.inputCell}[data-col-index="${colIndex}"]`,
        )
        .forEach(inputCell => {
          inputCell.classList.add('append-to-right')
        })
    })
  }

  const markInputCellsAsAppendToTopByRowIndex = (rowIndex: number) => {
    getTable('markInputCellsAsAppendToTopByRowIndex fn', table => {
      table
        .querySelectorAll(
          `.${TableGeneratorNS.CLASS_NAMES.inputCell}[data-row-index="${rowIndex}"]`,
        )
        .forEach(inputCell => {
          inputCell.classList.add('append-to-top')
        })
    })
  }

  const markInputCellsAsAppendToBottomByRowIndex = (rowIndex: number) => {
    getTable('markInputCellsAsAppendToBottomByRowIndex fn', table => {
      table
        .querySelectorAll(
          `.${TableGeneratorNS.CLASS_NAMES.inputCell}[data-row-index="${rowIndex}"]`,
        )
        .forEach(inputCell => {
          inputCell.classList.add('append-to-bottom')
        })
    })
  }

  return {
    getTable,
    activeColActions,
    deactiveCurrentActiveColActions,
    activeRowActions,
    deactiveCurrentActiveRowActions,
    removalInputCellsByColIndex,
    removalInputCellsByRowIndex,
    unRemovalAllRemovalInputCells,
    removeAllMarkedAsAppendToLeftInputCells,
    removeAllMarkedAsAppendToRightInputCells,
    removeAllMarkedAsAppendToTopInputCells,
    removeAllMarkedAsAppendToBottomInputCells,
    markInputCellsAsAppendToLeftByColIndex,
    markInputCellsAsAppendToRightByColIndex,
    markInputCellsAsAppendToTopByRowIndex,
    markInputCellsAsAppendToBottomByRowIndex,
  }
}
