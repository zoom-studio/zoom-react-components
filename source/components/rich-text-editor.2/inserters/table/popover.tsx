import React, { FC, useState } from 'react'

import { Text } from '../../..'

export namespace TableInserterPopoverNS {
  export interface Props {
    closePopover: () => void
    onSelect: (cols: number, rows: number) => void
  }
}

export const TableInserterPopover: FC<TableInserterPopoverNS.Props> = ({
  closePopover,
  onSelect,
}) => {
  const [title, setTitle] = useState<string | number>('Insert table')

  const removeActiveClassesOfGrids = () => {
    document.querySelectorAll('.grid-item.active').forEach(item => item.classList.remove('active'))
  }

  const handleOnMouseOver = (index: number) => () => {
    removeActiveClassesOfGrids()

    const rowIndex = Math.floor(index / 10) + 1
    const colIndex = (index % 10) + 1
    setTitle(`${colIndex}x${rowIndex} Table`)

    for (let i = index; i + 10 >= 10; i -= 10) {
      for (let j = i; j >= i - (i % 10); j--) {
        document.querySelector(`.grid-item[data-index="${j}"]`)?.classList.add('active')
      }
    }
  }

  const handleOnMouseLeave = () => {
    setTitle('Insert table')
    removeActiveClassesOfGrids()
  }

  const handleOnClick = (index: number) => () => {
    const rows = Math.floor(index / 10) + 1
    const cols = (index % 10) + 1
    onSelect(cols, rows)
    closePopover()
  }

  return (
    <div className="table-inserter">
      <Text large className="title">
        {title}
      </Text>

      <div className="grids">
        {Array.from(Array(100)).map((_, index) => (
          <span
            className="grid-item"
            data-index={index}
            key={index}
            onMouseOver={handleOnMouseOver(index)}
            onClick={handleOnClick(index)}
            onMouseLeave={handleOnMouseLeave}
          />
        ))}
      </div>
    </div>
  )
}
