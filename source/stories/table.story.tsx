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
      <Table
        id="playground-table"
        renderFooter
        selectable={data => data.age > 5}
        expandableRows
        hoverable
        striped={false}
        dataset={makeTableData(200)}
        actionsColumnWidth={100}
        stickyActions={false}
        renderRowExpanded={data => <pre style={{ margin: 0 }}>{JSON.stringify(data, null, 4)}</pre>}
        isRowExpandable={data => data.age > 5}
        virtualized={{ estimateRowSize: () => 30 }}
        sortable
        actions={[
          {
            onClick: data => alert(JSON.stringify(data, undefined, 2)),
            children: 'Get row data',
          },
        ]}
      >
        {({ Cell, Column, FooterCell, HeaderCell, ColumnGroup }) => (
          <>
            <Column accessor="age" width={10}>
              <Cell>{(_data, index) => index.toString().padStart(3, '0')}</Cell>
            </Column>

            <ColumnGroup>
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
                <Column accessor="progress" width={50} sortable={false}>
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
