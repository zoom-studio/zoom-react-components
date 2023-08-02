import React, { type FormEvent, forwardRef, useMemo, useState } from 'react'

import { useFutureEffect } from '@zoom-studio/zoom-js-ts-utils'

import { Button, Icon, Input, type ButtonNS, type IconNS } from '..'
import { useZoomComponent } from '../../hooks'
import { type BaseComponent } from '../../types'

export namespace PaginationNS {
  export interface PagesResult {
    start: number[]
    middle: number[]
    end: number[]
  }

  export interface Props extends Omit<BaseComponent, 'children'> {
    totalPages: number
    defaultPage?: number
    showCustomPageInput?: boolean
    linkify?: (page: number) => string
    onWrite?: (page: number) => void
    disabledPage?: (page: number) => boolean
    disabled?: boolean
  }
}

export const Pagination = forwardRef<HTMLDivElement, PaginationNS.Props>(
  (
    {
      defaultPage = 1,
      showCustomPageInput = true,
      totalPages,
      className,
      containerProps,
      linkify,
      onWrite,
      disabledPage,
      disabled,
      ...rest
    },
    reference,
  ) => {
    const { createClassName } = useZoomComponent('pagination')
    const [activePage, setActivePage] = useState(defaultPage)
    const [customActivePage, setCustomActivePage] = useState(defaultPage)
    const [hasCustomActivePageError, setHasCustomActivePageError] = useState(false)

    const classes = createClassName(className)

    const createPages = (count: number, startsFrom = 1): number[] => {
      return Array.from(Array(count)).map((_, index) => index + startsFrom)
    }

    const pages = useMemo<PaginationNS.PagesResult>(() => {
      let start: number[] = []
      let middle: number[] = []
      let end: number[] = []

      if (totalPages <= 7) {
        start = createPages(totalPages)
      } else if (activePage < 5) {
        start = createPages(5)
        end = createPages(1, totalPages)
      } else if (activePage >= 5 && activePage <= totalPages - 7 + 3) {
        start = createPages(1)
        middle = createPages(3, activePage - 1)
        end = createPages(1, totalPages)
      } else if (activePage <= totalPages - 7 + 4 || activePage >= totalPages - 7 + 4) {
        start = createPages(1)
        end = createPages(5, totalPages - 4)
      }

      return { start, middle, end }
    }, [activePage])

    const renderPageButton = (page: number, index: number) => {
      return (
        <Button
          disabled={disabledPage?.(page) || disabled}
          key={index}
          shape="circle"
          type={page === activePage ? (disabled ? 'bordered' : 'primary') : 'text'}
          className="pagination-button page"
          href={linkify?.(page)}
          onClick={() => {
            setActivePage(page)
          }}
        >
          {page}
        </Button>
      )
    }

    const findPrevActivePage = (currentPage: number): number => {
      const prevPage = currentPage - 1
      if (prevPage >= 1) {
        if (disabledPage?.(prevPage)) {
          return findPrevActivePage(prevPage)
        }
        return prevPage
      }
      return 1
    }

    const findNextActivePage = (currentPage: number): number => {
      const nextPage = currentPage + 1
      if (nextPage <= totalPages) {
        if (disabledPage?.(nextPage)) {
          return findNextActivePage(nextPage)
        }
        return nextPage
      }
      return totalPages
    }

    const handleIncreasePage = () => {
      if (disabled) {
        return
      }
      setActivePage(findNextActivePage)
    }

    const handleDecreasePage = () => {
      if (disabled) {
        return
      }
      setActivePage(findPrevActivePage)
    }

    const dotsIconProps: IconNS.Props = {
      name: 'more_horiz',
      className: 'dots-icon',
    }

    const navigateButtonProps: ButtonNS.Props = {
      type: 'link',
      shape: 'circle',
      className: 'pagination-button navigation',
    }

    const handleSubmitCustomPage = (evt: FormEvent<HTMLFormElement>) => {
      evt.preventDefault()

      if (disabled) {
        return
      }

      if (disabledPage?.(customActivePage)) {
        setHasCustomActivePageError(true)
      } else {
        setActivePage(customActivePage)
      }
    }

    const handleOnInputWrite = (value: string) => {
      if (disabled) {
        return
      }

      setHasCustomActivePageError(false)
      setCustomActivePage(+value)
    }

    useFutureEffect(() => {
      setActivePage(defaultPage)
    }, [defaultPage])

    useFutureEffect(() => {
      if (!disabled) {
        setCustomActivePage(activePage)
        onWrite?.(activePage)
      }
    }, [activePage])

    return (
      <div {...rest} {...containerProps} className={classes} ref={reference}>
        <div className="pages">
          <Button
            {...navigateButtonProps}
            prefixMaterialIcon="chevron_left"
            onClick={handleDecreasePage}
            disabled={activePage === 1 || disabled}
            href={linkify?.(findPrevActivePage(activePage))}
          />

          {pages.start.map(renderPageButton)}
          {pages.middle.length > 0 && <Icon {...dotsIconProps} />}
          {pages.middle.map(renderPageButton)}
          {(pages.middle.length > 0 || pages.end.length > 0) && <Icon {...dotsIconProps} />}
          {pages.end.map(renderPageButton)}

          <Button
            {...navigateButtonProps}
            prefixMaterialIcon="chevron_right"
            onClick={handleIncreasePage}
            disabled={activePage === totalPages || disabled}
            href={linkify?.(findNextActivePage(activePage))}
          />
        </div>

        {showCustomPageInput && (
          <form className="custom-page" onSubmit={handleSubmitCustomPage}>
            <Input
              value={customActivePage}
              type="number"
              disabled={disabled}
              state={[hasCustomActivePageError ? 'error' : 'neutral']}
              numberButtonHandlers={false}
              onWrite={handleOnInputWrite}
              className="custom-page-input"
              inputProps={{
                min: 1,
                max: totalPages,
              }}
            />
            <Button
              variant={hasCustomActivePageError ? 'error' : 'neutral'}
              disabled={disabled || customActivePage > totalPages || customActivePage < 1}
              prefixMaterialIcon="chevron_right"
              htmlType="submit"
              className="custom-page-submit"
              type="secondary"
            />
          </form>
        )}
      </div>
    )
  },
)
