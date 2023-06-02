import { TableElementNS } from './types'

export const useTableDOM = (tableID: string) => {
  const findAll = (query: string, callback: (node: Element) => void) => {
    const elements = document.querySelectorAll(`#${tableID} ${query}`)
    elements.forEach(callback)
  }

  const find = (query: string, callback: (node: Element) => void) => {
    const element = document.querySelector(`#${tableID} ${query}`)
    if (element) {
      callback(element)
    }
  }

  const deactiveCurrentActiveColActions = () => {
    findAll(`> thead > tr > td > div.${TableElementNS.CLASS_NAMES.colActions}.active`, element => {
      element.classList.remove('active')
    })
  }

  const deactiveCurrentActiveRowActions = () => {
    findAll(`> tbody > tr > td.${TableElementNS.CLASS_NAMES.rowActions}.active`, element => {
      element.classList.remove('active')
    })
  }

  const activeColActions = (colIndex: number) => {
    find(
      `> thead > tr > td > div.${TableElementNS.CLASS_NAMES.colActions}[data-col-index="${colIndex}"]`,
      element => {
        element.classList.add('active')
      },
    )
  }

  const activeRowActions = (rowIndex: number) => {
    find(
      `> tbody > tr > td.${TableElementNS.CLASS_NAMES.rowActions}[data-row-index="${rowIndex}"]`,
      element => {
        element.classList.add('active')
      },
    )
  }

  const unRemovalAllRemovalInputCells = () => {
    findAll(`> tbody > tr > td.${TableElementNS.CLASS_NAMES.inputCell}.removal`, element => {
      element.classList.remove('removal')
    })
  }

  const removalInputCellsByColIndex = (colIndex: number) => {
    findAll(
      `> tbody > tr > td.${TableElementNS.CLASS_NAMES.inputCell}[data-col-index="${colIndex}"]`,
      element => {
        element.classList.add('removal')
      },
    )
  }

  const removalInputCellsByRowIndex = (rowIndex: number) => {
    findAll(
      `> tbody > tr > td.${TableElementNS.CLASS_NAMES.inputCell}[data-row-index="${rowIndex}"]`,
      element => {
        element.classList.add('removal')
      },
    )
  }

  const removeAllMarkedAsAppendToLeftInputCells = () => {
    findAll(`> tbody > tr > td.${TableElementNS.CLASS_NAMES.inputCell}.append-to-left`, element => {
      element.classList.remove('append-to-left')
    })
  }

  const removeAllMarkedAsAppendToRightInputCells = () => {
    findAll(
      `> tbody > tr > td.${TableElementNS.CLASS_NAMES.inputCell}.append-to-right`,
      element => {
        element.classList.remove('append-to-right')
      },
    )
  }

  const removeAllMarkedAsAppendToTopInputCells = () => {
    findAll(`> tbody > tr > td.${TableElementNS.CLASS_NAMES.inputCell}.append-to-top`, element => {
      element.classList.remove('append-to-top')
    })
  }

  const removeAllMarkedAsAppendToBottomInputCells = () => {
    findAll(
      `> tbody > tr > td.${TableElementNS.CLASS_NAMES.inputCell}.append-to-bottom`,
      element => {
        element.classList.remove('append-to-bottom')
      },
    )
  }

  const markInputCellsAsAppendToLeftByColIndex = (colIndex: number) => {
    findAll(
      `> tbody > tr > td.${TableElementNS.CLASS_NAMES.inputCell}[data-col-index="${colIndex}"]`,
      element => {
        element.classList.add('append-to-left')
      },
    )
  }

  const markInputCellsAsAppendToRightByColIndex = (colIndex: number) => {
    findAll(
      `> tbody > tr > td.${TableElementNS.CLASS_NAMES.inputCell}[data-col-index="${colIndex}"]`,
      element => {
        element.classList.add('append-to-right')
      },
    )
  }

  const markInputCellsAsAppendToTopByRowIndex = (rowIndex: number) => {
    findAll(
      `> tbody > tr > td.${TableElementNS.CLASS_NAMES.inputCell}[data-row-index="${rowIndex}"]`,
      element => {
        element.classList.add('append-to-top')
      },
    )
  }

  const markInputCellsAsAppendToBottomByRowIndex = (rowIndex: number) => {
    findAll(
      `> tbody > tr > td.${TableElementNS.CLASS_NAMES.inputCell}[data-row-index="${rowIndex}"]`,
      element => {
        element.classList.add('append-to-bottom')
      },
    )
  }

  return {
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
