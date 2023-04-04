import React, { FC } from 'react'

import { ComponentMeta } from '@storybook/react'

import { Table, TableNS } from '../components'
import { lorem, makeTableData } from '../fixtures'

export default {
  title: 'Data display/Table',
  component: Table,
  args: {},
} as ComponentMeta<typeof Table>

export const Playground: FC<TableNS.Props> = props => {
  return (
    <>
      {lorem(10)}
      <Table id="playground-table" renderFooter dataset={makeTableData(200)}>
        {({ Cell, Column, FooterCell, HeaderCell, ColumnGroup }) => (
          <>
            <Column accessor="status">
              <HeaderCell>Status</HeaderCell>
            </Column>

            <ColumnGroup>
              <Column accessor="name.first">
                <FooterCell>firstName</FooterCell>
              </Column>
            </ColumnGroup>

            <ColumnGroup>
              <HeaderCell>Hello</HeaderCell>
              <Column accessor="name.first">
                <FooterCell>firstName</FooterCell>
              </Column>
              <Column accessor="name.last">
                <FooterCell>lastName</FooterCell>
              </Column>
            </ColumnGroup>

            <ColumnGroup>
              <Column accessor="name.first">
                <FooterCell>firstName</FooterCell>
              </Column>
              <Column accessor="name.last">
                <FooterCell>lastName</FooterCell>
              </Column>
            </ColumnGroup>

            <ColumnGroup>
              <HeaderCell>Info</HeaderCell>
              <Column accessor="age">
                <HeaderCell>Age</HeaderCell>
                <FooterCell>age</FooterCell>
              </Column>

              <ColumnGroup>
                <HeaderCell>More info</HeaderCell>
                <Column accessor="visits">
                  <HeaderCell>Visits</HeaderCell>
                  <FooterCell>visits</FooterCell>
                </Column>
                <Column accessor="status">
                  <HeaderCell>Status</HeaderCell>
                  <FooterCell>status</FooterCell>
                </Column>
                <Column accessor="progress">
                  <HeaderCell>Progress</HeaderCell>
                  <FooterCell>progress</FooterCell>
                </Column>
              </ColumnGroup>
            </ColumnGroup>
          </>
        )}
      </Table>
      {lorem(200)}
    </>
  )
}

/**
 * <ColumnGroup>
            <HeaderCell>Hello</HeaderCell>
            <Column accessor="name.first">
              <FooterCell>firstName</FooterCell>
            </Column>
            <Column accessor="name.last">
              <HeaderCell>Last name</HeaderCell>
              <FooterCell>lastName</FooterCell>
            </Column>
          </ColumnGroup>

          <ColumnGroup>
            <HeaderCell>Info</HeaderCell>
            <FooterCell>info</FooterCell>

            <Column accessor="age">
              <HeaderCell>Age</HeaderCell>
              <FooterCell>age</FooterCell>
            </Column>

            <ColumnGroup>
              <HeaderCell>More info</HeaderCell>
              <Column accessor="visits">
                <HeaderCell>Visits</HeaderCell>
                <FooterCell>visits</FooterCell>
              </Column>
              <Column accessor="status">
                <HeaderCell>Status</HeaderCell>
                <FooterCell>status</FooterCell>
              </Column>
              <Column accessor="progress">
                <HeaderCell>Progress</HeaderCell>
                <FooterCell>progress</FooterCell>
              </Column>
            </ColumnGroup>
          </ColumnGroup>
 */

/**
 *  <Table dataset={defaultData}>
      {({ Cell, Column, FooterCell, HeaderCell }) => (
        <>
          <Column width={200} accessor="name">
            <Cell>
              {data => (
                <>
                  {data.name.first}-{data.name.last}
                </>
              )}
            </Cell>
          </Column>

          <Column accessor="age">
            <HeaderCell>Age</HeaderCell>
          </Column>

          <Column accessor="status">
            <HeaderCell>Status</HeaderCell>
            <Cell>{data => <span>{data.status}</span>}</Cell>
            <FooterCell>Status</FooterCell>
          </Column>
        </>
      )}
    </Table>
 */
