import React, { FC } from 'react'

import { ComponentMeta } from '@storybook/react'

import { Progress, Table, TableNS } from '../components'
import { Person, makeTableData } from '../fixtures'
import { useCustomFetch } from './hooks/use-custom-fetch'

const useTableStory = (maxData = 400, itemsPerQuery = 20) => {
  const staticData = makeTableData(maxData)

  const { data, isLoading, sendQuery } = useCustomFetch({
    makeData: makeTableData,
    maxItems: maxData,
    itemsPerQuery,
  })

  return { data, isLoading, sendQuery, staticData }
}

export const Basic = () => {
  const { staticData } = useTableStory(10)
  return (
    <Table
      dataset={staticData}
      id="basic-table"
      endMessage=""
      resizableColumns={false}
      renderActionsBar={false}
      renderHeader={false}
    >
      {({ Column }) => (
        <>
          <Column accessor="name.first" />
          <Column accessor="name.last" />
          <Column accessor="age" />
          <Column accessor="progress" />
        </>
      )}
    </Table>
  )
}

export const WithHeader = () => {
  const { staticData } = useTableStory(10)
  return (
    <Table
      dataset={staticData}
      id="basic-table"
      endMessage=""
      resizableColumns={false}
      renderActionsBar={false}
    >
      {({ Column, Header }) => (
        <>
          <Column accessor="name.first">
            <Header>First name</Header>
          </Column>
          <Column accessor="name.last">
            <Header>Last name</Header>
          </Column>
          <Column accessor="age">
            <Header>Age</Header>
          </Column>
          <Column accessor="progress">
            <Header>Progress</Header>
          </Column>
        </>
      )}
    </Table>
  )
}

export const WithHeaderAndFooter = () => {
  const { staticData } = useTableStory(10)
  return (
    <Table
      dataset={staticData}
      id="basic-table"
      endMessage=""
      renderFooter
      resizableColumns={false}
      renderActionsBar={false}
    >
      {({ Column, Header, Footer }) => (
        <>
          <Column accessor="name.first">
            <Header>First name</Header>
            <Footer>First name</Footer>
          </Column>
          <Column accessor="name.last">
            <Header>Last name</Header>
            <Footer>Last name</Footer>
          </Column>
          <Column accessor="age">
            <Header>Age</Header>
            <Footer>Age</Footer>
          </Column>
          <Column accessor="progress">
            <Header>Progress</Header>
            <Footer>Progress</Footer>
          </Column>
        </>
      )}
    </Table>
  )
}

export const StickyHeaderAndFooter = () => {
  const { staticData } = useTableStory(100)
  return (
    <Table
      dataset={staticData}
      id="basic-table"
      endMessage=""
      renderFooter
      resizableColumns={false}
      renderActionsBar={false}
      stickyHeader
      stickyFooter
    >
      {({ Column, Header, Footer }) => (
        <>
          <Column accessor="name.first">
            <Header>First name</Header>
            <Footer>First name</Footer>
          </Column>
          <Column accessor="name.last">
            <Header>Last name</Header>
            <Footer>Last name</Footer>
          </Column>
          <Column accessor="age">
            <Header>Age</Header>
            <Footer>Age</Footer>
          </Column>
          <Column accessor="progress">
            <Header>Progress</Header>
            <Footer>Progress</Footer>
          </Column>
        </>
      )}
    </Table>
  )
}

export const CustomCells = () => {
  const { staticData } = useTableStory(10)
  return (
    <Table
      dataset={staticData}
      id="basic-table"
      endMessage=""
      resizableColumns={false}
      renderActionsBar={false}
    >
      {({ Column, Header, Cell }) => (
        <>
          <Column accessor="name.first">
            <Header>First name</Header>
          </Column>
          <Column accessor="name.last">
            <Header>Last name</Header>
          </Column>
          <Column accessor="age">
            <Header>Age</Header>
          </Column>
          <Column accessor="progress">
            <Header>Progress</Header>
            <Cell>
              {data => (
                <Progress
                  type="circular"
                  circularSize={30}
                  circularStroke={6}
                  info="percentage"
                  showInfo
                  circularPercentageFontSize={10}
                  steps={{ percentage: data.progress }}
                />
              )}
            </Cell>
          </Column>
        </>
      )}
    </Table>
  )
}

export const Striped = () => {
  const { staticData } = useTableStory(10)
  return (
    <Table
      dataset={staticData}
      id="basic-table"
      endMessage=""
      striped
      resizableColumns={false}
      renderActionsBar={false}
    >
      {({ Column, Header }) => (
        <>
          <Column accessor="name.first">
            <Header>First name</Header>
          </Column>
          <Column accessor="name.last">
            <Header>Last name</Header>
          </Column>
          <Column accessor="age">
            <Header>Age</Header>
          </Column>
          <Column accessor="progress">
            <Header>Progress</Header>
          </Column>
        </>
      )}
    </Table>
  )
}

export const Hoverable = () => {
  const { staticData } = useTableStory(10)
  return (
    <Table
      dataset={staticData}
      id="basic-table"
      endMessage=""
      hoverable
      resizableColumns={false}
      renderActionsBar={false}
    >
      {({ Column, Header }) => (
        <>
          <Column accessor="name.first">
            <Header>First name</Header>
          </Column>
          <Column accessor="name.last">
            <Header>Last name</Header>
          </Column>
          <Column accessor="age">
            <Header>Age</Header>
          </Column>
          <Column accessor="progress">
            <Header>Progress</Header>
          </Column>
        </>
      )}
    </Table>
  )
}

export const WithActions = () => {
  const { staticData } = useTableStory(10)
  return (
    <Table
      dataset={staticData}
      id="basic-table"
      endMessage=""
      resizableColumns={false}
      renderActionsBar={false}
      actions={[
        {
          onClick: data => alert(JSON.stringify(data, null, 2)),
          children: 'Alert data',
          type: 'bordered',
          style: { margin: 6 },
        },
      ]}
    >
      {({ Column, Header }) => (
        <>
          <Column accessor="name.first">
            <Header>First name</Header>
          </Column>
          <Column accessor="name.last">
            <Header>Last name</Header>
          </Column>
          <Column accessor="age">
            <Header>Age</Header>
          </Column>
          <Column accessor="progress">
            <Header>Progress</Header>
          </Column>
        </>
      )}
    </Table>
  )
}

export const StickyActions = () => {
  const { staticData } = useTableStory(10)
  return (
    <Table
      dataset={staticData}
      id="basic-table"
      endMessage=""
      resizableColumns={false}
      renderActionsBar={false}
      stickyActions
      actions={[
        {
          onClick: data => alert(JSON.stringify(data, null, 2)),
          children: 'Alert data',
          type: 'bordered',
          style: { margin: 6 },
        },
      ]}
    >
      {({ Column, Header }) => (
        <>
          <Column accessor="name.first">
            <Header>First name</Header>
          </Column>
          <Column accessor="name.last">
            <Header>Last name</Header>
          </Column>
          <Column accessor="age">
            <Header>Age</Header>
          </Column>
          <Column accessor="progress">
            <Header>Progress</Header>
          </Column>
          <Column accessor="address" width={500} />
        </>
      )}
    </Table>
  )
}

export const ActionBar = () => {
  const { staticData } = useTableStory(10)
  return (
    <Table
      dataset={staticData}
      id="basic-table"
      endMessage=""
      resizableColumns={false}
      renderHeader={false}
      title="Table with action bar"
    >
      {({ Column }) => (
        <>
          <Column accessor="name.first" togglerLabel="First name" />
          <Column accessor="name.last" togglerLabel="Last name" />
          <Column accessor="age" togglerLabel="Age" />
          <Column accessor="progress" togglerLabel="Progress" />
        </>
      )}
    </Table>
  )
}

export const FullHeight = () => {
  const { staticData } = useTableStory(100)
  return (
    <Table
      dataset={staticData}
      id="basic-table"
      endMessage=""
      resizableColumns={false}
      title="Table with action bar"
      maxHeight="unset"
      fullHeight
      renderFooter
      stickyFooter
      stickyHeader
    >
      {({ Column, Footer }) => (
        <>
          <Column accessor="name.first" togglerLabel="First name">
            <Footer>First name</Footer>
          </Column>
          <Column accessor="name.last" togglerLabel="Last name">
            <Footer>Last name</Footer>
          </Column>
          <Column accessor="age" togglerLabel="Age">
            <Footer>Age</Footer>
          </Column>
          <Column accessor="progress" togglerLabel="Progress">
            <Footer>Progress</Footer>
          </Column>
        </>
      )}
    </Table>
  )
}

export const GroupedColumns = () => {
  const { staticData } = useTableStory(60)
  return (
    <Table
      dataset={staticData}
      id="basic-table"
      endMessage=""
      resizableColumns={false}
      renderActionsBar={false}
    >
      {({ Column, Cell, ColumnGroup, Footer, Header }) => (
        <>
          <Column accessor="id" width={10} id="id" resizable={false} togglerLabel="User IDs" hidden>
            <Cell>{(_data, index) => (index + 1).toString().padStart(3, '0')}</Cell>
          </Column>

          <ColumnGroup>
            <Header>Hello</Header>
            <Column accessor="name.first" id="name.first" togglerLabel="First names">
              <Footer>firstName</Footer>
            </Column>
            <Column accessor="name.last" id="name.last" togglerLabel="Last names">
              <Header>Last name</Header>
              <Footer>lastName</Footer>
            </Column>
          </ColumnGroup>

          <ColumnGroup>
            <Header>Info</Header>
            <Footer>info</Footer>

            <Column accessor="age" id="age" togglerLabel="Ages">
              <Header>Age</Header>
              <Footer>age</Footer>
            </Column>

            <ColumnGroup>
              <Header>More info</Header>
              <Column accessor="visits" id="visits" togglerLabel="Visits">
                <Header>Visits</Header>
                <Footer>visits</Footer>
              </Column>
              <Column accessor="status" id="status" togglerLabel="Statuses">
                <Header>Status</Header>
                <Footer>status</Footer>
              </Column>
              <Column
                accessor="progress"
                id="progress"
                width={50}
                sortable={false}
                togglerLabel="Progresses"
              >
                <Header>Progress</Header>
                <Footer>progress</Footer>
              </Column>
            </ColumnGroup>
          </ColumnGroup>
        </>
      )}
    </Table>
  )
}

export const ColumnSummary = () => {
  const { staticData } = useTableStory(60)
  return (
    <Table
      dataset={staticData}
      id="basic-table"
      endMessage=""
      resizableColumns={false}
      renderActionsBar={false}
    >
      {({ Column, Cell, ColumnGroup, Footer, Header }) => (
        <>
          <Column accessor="id" width={10} id="id" resizable={false} togglerLabel="User IDs" hidden>
            <Cell>{(_data, index) => (index + 1).toString().padStart(3, '0')}</Cell>
          </Column>

          <ColumnGroup>
            <Header>Hello</Header>
            <Column accessor="name.first" id="name.first" togglerLabel="First names">
              <Footer>firstName</Footer>
            </Column>
            <Column accessor="name.last" id="name.last" togglerLabel="Last names">
              <Header>Last name</Header>
              <Footer>lastName</Footer>
            </Column>
          </ColumnGroup>

          <ColumnGroup>
            <Header>Info</Header>
            <Footer>info</Footer>

            <Column accessor="age" id="age" togglerLabel="Ages">
              <Header>Age</Header>
              <Footer>age</Footer>
            </Column>

            <ColumnGroup>
              <Header>More info</Header>
              <Column accessor="visits" id="visits" togglerLabel="Visits">
                <Header>Visits</Header>
                <Footer>visits</Footer>
              </Column>
              <Column accessor="status" id="status" togglerLabel="Statuses" summary={1000}>
                <Header>Status</Header>
                <Footer>status</Footer>
              </Column>
              <Column
                accessor="progress"
                id="progress"
                width={50}
                sortable={false}
                togglerLabel="Progresses"
                summary={1000}
              >
                <Header>Progress</Header>
                <Footer>progress</Footer>
              </Column>
            </ColumnGroup>
          </ColumnGroup>
        </>
      )}
    </Table>
  )
}

export const Resizable = () => {
  const { staticData } = useTableStory(60)
  return (
    <Table dataset={staticData} id="basic-table" endMessage="">
      {({ Column, Cell, ColumnGroup, Footer, Header }) => (
        <>
          <Column accessor="id" width={10} id="id" resizable={false} togglerLabel="User IDs" hidden>
            <Cell>{(_data, index) => (index + 1).toString().padStart(3, '0')}</Cell>
          </Column>

          <ColumnGroup>
            <Header>Hello</Header>
            <Column accessor="name.first" id="name.first" togglerLabel="First names">
              <Footer>firstName</Footer>
            </Column>
            <Column accessor="name.last" id="name.last" togglerLabel="Last names">
              <Header>Last name</Header>
              <Footer>lastName</Footer>
            </Column>
          </ColumnGroup>

          <ColumnGroup>
            <Header>Info</Header>
            <Footer>info</Footer>

            <Column accessor="age" id="age" togglerLabel="Ages">
              <Header>Age</Header>
              <Footer>age</Footer>
            </Column>

            <ColumnGroup>
              <Header>More info</Header>
              <Column accessor="visits" id="visits" togglerLabel="Visits">
                <Header>Visits</Header>
                <Footer>visits</Footer>
              </Column>
              <Column accessor="status" id="status" togglerLabel="Statuses">
                <Header>Status</Header>
                <Footer>status</Footer>
              </Column>
              <Column
                accessor="progress"
                id="progress"
                width={50}
                sortable={false}
                togglerLabel="Progresses"
              >
                <Header>Progress</Header>
                <Footer>progress</Footer>
              </Column>
            </ColumnGroup>
          </ColumnGroup>
        </>
      )}
    </Table>
  )
}

export const ResizeOnRelease = () => {
  const { staticData } = useTableStory(60)
  return (
    <Table
      dataset={staticData}
      id="basic-table"
      endMessage=""
      resizableColumns
      resizeColumnOnReleaseMouseButton
    >
      {({ Column, Cell, ColumnGroup, Footer, Header }) => (
        <>
          <Column accessor="id" width={10} id="id" resizable={false} togglerLabel="User IDs" hidden>
            <Cell>{(_data, index) => (index + 1).toString().padStart(3, '0')}</Cell>
          </Column>

          <ColumnGroup>
            <Header>Hello</Header>
            <Column accessor="name.first" id="name.first" togglerLabel="First names">
              <Footer>firstName</Footer>
            </Column>
            <Column accessor="name.last" id="name.last" togglerLabel="Last names">
              <Header>Last name</Header>
              <Footer>lastName</Footer>
            </Column>
          </ColumnGroup>

          <ColumnGroup>
            <Header>Info</Header>
            <Footer>info</Footer>

            <Column accessor="age" id="age" togglerLabel="Ages">
              <Header>Age</Header>
              <Footer>age</Footer>
            </Column>

            <ColumnGroup>
              <Header>More info</Header>
              <Column accessor="visits" id="visits" togglerLabel="Visits">
                <Header>Visits</Header>
                <Footer>visits</Footer>
              </Column>
              <Column accessor="status" id="status" togglerLabel="Statuses">
                <Header>Status</Header>
                <Footer>status</Footer>
              </Column>
              <Column
                accessor="progress"
                id="progress"
                width={50}
                sortable={false}
                togglerLabel="Progresses"
              >
                <Header>Progress</Header>
                <Footer>progress</Footer>
              </Column>
            </ColumnGroup>
          </ColumnGroup>
        </>
      )}
    </Table>
  )
}

export const Sortable = () => {
  const { staticData } = useTableStory(60)
  return (
    <Table dataset={staticData} id="basic-table" sortable>
      {({ Column, Cell, ColumnGroup, Footer, Header }) => (
        <>
          <Column accessor="id" width={10} id="id" resizable={false} togglerLabel="User IDs" hidden>
            <Cell>{(_data, index) => (index + 1).toString().padStart(3, '0')}</Cell>
          </Column>

          <ColumnGroup>
            <Header>Hello</Header>
            <Column accessor="name.first" id="name.first" togglerLabel="First names">
              <Footer>firstName</Footer>
            </Column>
            <Column accessor="name.last" id="name.last" togglerLabel="Last names">
              <Header>Last name</Header>
              <Footer>lastName</Footer>
            </Column>
          </ColumnGroup>

          <ColumnGroup>
            <Header>Info</Header>
            <Footer>info</Footer>

            <Column accessor="age" id="age" togglerLabel="Ages">
              <Header>Age</Header>
              <Footer>age</Footer>
            </Column>

            <ColumnGroup>
              <Header>More info</Header>
              <Column accessor="visits" id="visits" togglerLabel="Visits">
                <Header>Visits</Header>
                <Footer>visits</Footer>
              </Column>
              <Column accessor="status" id="status" togglerLabel="Statuses">
                <Header>Status</Header>
                <Footer>status</Footer>
              </Column>
              <Column
                accessor="progress"
                id="progress"
                width={50}
                sortable={false}
                togglerLabel="Progresses"
              >
                <Header>Progress</Header>
                <Footer>progress</Footer>
              </Column>
            </ColumnGroup>
          </ColumnGroup>
        </>
      )}
    </Table>
  )
}

export const Selectable = () => {
  const { staticData } = useTableStory(60)
  return (
    <Table dataset={staticData} id="basic-table" selectable>
      {({ Column, Cell, ColumnGroup, Footer, Header }) => (
        <>
          <Column accessor="id" width={10} id="id" resizable={false} togglerLabel="User IDs" hidden>
            <Cell>{(_data, index) => (index + 1).toString().padStart(3, '0')}</Cell>
          </Column>

          <ColumnGroup>
            <Header>Hello</Header>
            <Column accessor="name.first" id="name.first" togglerLabel="First names">
              <Footer>firstName</Footer>
            </Column>
            <Column accessor="name.last" id="name.last" togglerLabel="Last names">
              <Header>Last name</Header>
              <Footer>lastName</Footer>
            </Column>
          </ColumnGroup>

          <ColumnGroup>
            <Header>Info</Header>
            <Footer>info</Footer>

            <Column accessor="age" id="age" togglerLabel="Ages">
              <Header>Age</Header>
              <Footer>age</Footer>
            </Column>

            <ColumnGroup>
              <Header>More info</Header>
              <Column accessor="visits" id="visits" togglerLabel="Visits">
                <Header>Visits</Header>
                <Footer>visits</Footer>
              </Column>
              <Column accessor="status" id="status" togglerLabel="Statuses">
                <Header>Status</Header>
                <Footer>status</Footer>
              </Column>
              <Column
                accessor="progress"
                id="progress"
                width={50}
                sortable={false}
                togglerLabel="Progresses"
              >
                <Header>Progress</Header>
                <Footer>progress</Footer>
              </Column>
            </ColumnGroup>
          </ColumnGroup>
        </>
      )}
    </Table>
  )
}

export const ConditionallySelectable = () => {
  const { staticData } = useTableStory(60)
  return (
    <Table dataset={staticData} id="basic-table" selectable={row => row.age > 5}>
      {({ Column, Cell, ColumnGroup, Footer, Header }) => (
        <>
          <Column accessor="id" width={10} id="id" resizable={false} togglerLabel="User IDs" hidden>
            <Cell>{(_data, index) => (index + 1).toString().padStart(3, '0')}</Cell>
          </Column>

          <ColumnGroup>
            <Header>Hello</Header>
            <Column accessor="name.first" id="name.first" togglerLabel="First names">
              <Footer>firstName</Footer>
            </Column>
            <Column accessor="name.last" id="name.last" togglerLabel="Last names">
              <Header>Last name</Header>
              <Footer>lastName</Footer>
            </Column>
          </ColumnGroup>

          <ColumnGroup>
            <Header>Info</Header>
            <Footer>info</Footer>

            <Column accessor="age" id="age" togglerLabel="Ages">
              <Header>Age</Header>
              <Footer>age</Footer>
            </Column>

            <ColumnGroup>
              <Header>More info</Header>
              <Column accessor="visits" id="visits" togglerLabel="Visits">
                <Header>Visits</Header>
                <Footer>visits</Footer>
              </Column>
              <Column accessor="status" id="status" togglerLabel="Statuses">
                <Header>Status</Header>
                <Footer>status</Footer>
              </Column>
              <Column
                accessor="progress"
                id="progress"
                width={50}
                sortable={false}
                togglerLabel="Progresses"
              >
                <Header>Progress</Header>
                <Footer>progress</Footer>
              </Column>
            </ColumnGroup>
          </ColumnGroup>
        </>
      )}
    </Table>
  )
}

export const Expandable = () => {
  const { staticData } = useTableStory(60)
  return (
    <Table
      dataset={staticData}
      id="basic-table"
      renderRowExpanded={data => <pre style={{ margin: 0 }}>{JSON.stringify(data, null, 4)}</pre>}
    >
      {({ Column, Cell, ColumnGroup, Footer, Header }) => (
        <>
          <Column accessor="id" width={10} id="id" resizable={false} togglerLabel="User IDs" hidden>
            <Cell>{(_data, index) => (index + 1).toString().padStart(3, '0')}</Cell>
          </Column>

          <ColumnGroup>
            <Header>Hello</Header>
            <Column accessor="name.first" id="name.first" togglerLabel="First names">
              <Footer>firstName</Footer>
            </Column>
            <Column accessor="name.last" id="name.last" togglerLabel="Last names">
              <Header>Last name</Header>
              <Footer>lastName</Footer>
            </Column>
          </ColumnGroup>

          <ColumnGroup>
            <Header>Info</Header>
            <Footer>info</Footer>

            <Column accessor="age" id="age" togglerLabel="Ages">
              <Header>Age</Header>
              <Footer>age</Footer>
            </Column>

            <ColumnGroup>
              <Header>More info</Header>
              <Column accessor="visits" id="visits" togglerLabel="Visits">
                <Header>Visits</Header>
                <Footer>visits</Footer>
              </Column>
              <Column accessor="status" id="status" togglerLabel="Statuses">
                <Header>Status</Header>
                <Footer>status</Footer>
              </Column>
              <Column
                accessor="progress"
                id="progress"
                width={50}
                sortable={false}
                togglerLabel="Progresses"
              >
                <Header>Progress</Header>
                <Footer>progress</Footer>
              </Column>
            </ColumnGroup>
          </ColumnGroup>
        </>
      )}
    </Table>
  )
}

export const ConditionallyExpandable = () => {
  const { staticData } = useTableStory(60)
  return (
    <Table
      dataset={staticData}
      id="basic-table"
      selectable
      isRowExpandable={row => row.age > 5}
      renderRowExpanded={data => <pre style={{ margin: 0 }}>{JSON.stringify(data, null, 4)}</pre>}
    >
      {({ Column, Cell, ColumnGroup, Footer, Header }) => (
        <>
          <Column accessor="id" width={10} id="id" resizable={false} togglerLabel="User IDs" hidden>
            <Cell>{(_data, index) => (index + 1).toString().padStart(3, '0')}</Cell>
          </Column>

          <ColumnGroup>
            <Header>Hello</Header>
            <Column accessor="name.first" id="name.first" togglerLabel="First names">
              <Footer>firstName</Footer>
            </Column>
            <Column accessor="name.last" id="name.last" togglerLabel="Last names">
              <Header>Last name</Header>
              <Footer>lastName</Footer>
            </Column>
          </ColumnGroup>

          <ColumnGroup>
            <Header>Info</Header>
            <Footer>info</Footer>

            <Column accessor="age" id="age" togglerLabel="Ages">
              <Header>Age</Header>
              <Footer>age</Footer>
            </Column>

            <ColumnGroup>
              <Header>More info</Header>
              <Column accessor="visits" id="visits" togglerLabel="Visits">
                <Header>Visits</Header>
                <Footer>visits</Footer>
              </Column>
              <Column accessor="status" id="status" togglerLabel="Statuses">
                <Header>Status</Header>
                <Footer>status</Footer>
              </Column>
              <Column
                accessor="progress"
                id="progress"
                width={50}
                sortable={false}
                togglerLabel="Progresses"
              >
                <Header>Progress</Header>
                <Footer>progress</Footer>
              </Column>
            </ColumnGroup>
          </ColumnGroup>
        </>
      )}
    </Table>
  )
}

export const Virtualized = () => {
  const { staticData } = useTableStory(1000)
  return (
    <Table
      dataset={staticData}
      id="basic-table"
      resizableColumns={false}
      renderActionsBar={false}
      renderHeader={false}
      virtualized={{ estimateRowSize: 27 }}
    >
      {({ Column }) => (
        <>
          <Column accessor="name.first" />
          <Column accessor="name.last" />
          <Column accessor="age" />
          <Column accessor="progress" />
        </>
      )}
    </Table>
  )
}

export const InfiniteScroll = () => {
  const { data, isLoading, sendQuery } = useTableStory(1000)
  return (
    <Table
      dataset={data}
      id="basic-table"
      resizableColumns={false}
      renderActionsBar={false}
      renderFooter
      renderHeader={false}
      loading={isLoading}
      infiniteScroll={{ handleOnLoadMore: sendQuery, maxDatasetLength: 1000 }}
    >
      {({ Column }) => (
        <>
          <Column accessor="name.first" />
          <Column accessor="name.last" />
          <Column accessor="age" />
          <Column accessor="progress" />
        </>
      )}
    </Table>
  )
}

export const VirtualizedInfiniteScroll = () => {
  const { data, isLoading, sendQuery } = useTableStory(1000)
  return (
    <Table
      dataset={data}
      id="basic-table"
      resizableColumns={false}
      renderActionsBar={false}
      renderHeader={false}
      loading={isLoading}
      infiniteScroll={{ handleOnLoadMore: sendQuery, maxDatasetLength: 1000 }}
      renderFooter
      virtualized={{ estimateRowSize: 27 }}
    >
      {({ Column }) => (
        <>
          <Column accessor="name.first" />
          <Column accessor="name.last" />
          <Column accessor="age" />
          <Column accessor="progress" />
        </>
      )}
    </Table>
  )
}

export const EmptyState = () => {
  return (
    <Table<Person[]>
      dataset={[]}
      id="basic-table"
      endMessage=""
      resizableColumns={false}
      renderActionsBar={false}
      renderFooter
    >
      {({ Column, Header, Footer }) => (
        <>
          <Column accessor="name.first">
            <Header>First name</Header>
            <Footer>First name</Footer>
          </Column>
          <Column accessor="name.last">
            <Header>Last name</Header>
            <Footer>Last name</Footer>
          </Column>
          <Column accessor="age">
            <Header>Age</Header>
            <Footer>Age</Footer>
          </Column>
          <Column accessor="progress">
            <Header>Progress</Header>
            <Footer>Progress</Footer>
          </Column>
        </>
      )}
    </Table>
  )
}

export const LoadingWithoutData = () => {
  return (
    <Table<Person[]>
      dataset={[]}
      id="basic-table"
      endMessage=""
      resizableColumns={false}
      renderActionsBar={false}
      renderFooter
      loading
    >
      {({ Column, Header, Footer }) => (
        <>
          <Column accessor="name.first">
            <Header>First name</Header>
            <Footer>First name</Footer>
          </Column>
          <Column accessor="name.last">
            <Header>Last name</Header>
            <Footer>Last name</Footer>
          </Column>
          <Column accessor="age">
            <Header>Age</Header>
            <Footer>Age</Footer>
          </Column>
          <Column accessor="progress">
            <Header>Progress</Header>
            <Footer>Progress</Footer>
          </Column>
        </>
      )}
    </Table>
  )
}

export const LoadingWithData = () => {
  const { staticData } = useTableStory(10)

  return (
    <Table
      dataset={staticData}
      id="basic-table"
      endMessage=""
      resizableColumns={false}
      renderActionsBar={false}
      renderFooter
      loading
    >
      {({ Column, Header, Footer }) => (
        <>
          <Column accessor="name.first">
            <Header>First name</Header>
            <Footer>First name</Footer>
          </Column>
          <Column accessor="name.last">
            <Header>Last name</Header>
            <Footer>Last name</Footer>
          </Column>
          <Column accessor="age">
            <Header>Age</Header>
            <Footer>Age</Footer>
          </Column>
          <Column accessor="progress">
            <Header>Progress</Header>
            <Footer>Progress</Footer>
          </Column>
        </>
      )}
    </Table>
  )
}

export default {
  title: 'Data display/Table',
  component: Table,
  args: {
    id: 'playground-table',
    title: 'Playground table shows person records',
    renderFooter: true,
    selectable: true,
    hoverable: false,
    striped: true,
    stickyActions: true,
    sortable: true,
    useDefaultSortAlgorithm: true,
    dragToSelect: true,
    debounceSearchInput: true,
    fullHeight: false,
    renderHeader: true,
    renderActionsBar: true,
    resizableColumns: true,
    showColumnsButton: true,
    showSearch: true,
    stickyFooter: true,
    stickyHeader: true,
    loading: false,
    toggleSelectOnRowClick: true,
    resizeColumnOnReleaseMouseButton: false,
    isRowExpandable: data => (data as Person).age > 5,
    actionsColumnWidth: 100,
    renderRowExpanded: data => <pre style={{ margin: 0 }}>{JSON.stringify(data, null, 4)}</pre>,
    virtualized: { estimateRowSize: 30 },
    className: 'playground-table',
    dataset: [],
    maxHeight: 700,
    maxWidth: '100%',
    minHeight: 'unset',
    minWidth: '100%',
    endMessage: 'You have seen all the rows',
    infiniteScroll: undefined,
    onSearch: undefined,
    onSortChange: undefined,
    onSelectionChange: undefined,
    reference: undefined,
    children: undefined,
    searchInputDebounceDelay: 250,
    onClick: undefined,
    containerProps: undefined,
    style: undefined,
    actions: [
      {
        onClick: data => alert(JSON.stringify(data, undefined, 2)),
        children: 'Get row data',
      },
    ],
  },
} as ComponentMeta<typeof Table>

export const Playground: FC<TableNS.Props<Person[]>> = props => {
  const maxData = 400

  const { data, isLoading, sendQuery } = useCustomFetch({
    makeData: makeTableData,
    maxItems: maxData,
    itemsPerQuery: 20,
  })

  return (
    <>
      <Table<Person[]>
        {...props}
        dataset={data}
        infiniteScroll={{ handleOnLoadMore: sendQuery, maxDatasetLength: maxData }}
        loading={isLoading}
      >
        {({ Cell, Column, Footer, Header, ColumnGroup }) => (
          <>
            <Column
              accessor="id"
              width={10}
              id="id"
              resizable={false}
              togglerLabel="User IDs"
              hidden
            >
              <Cell>{(_data, index) => (index + 1).toString().padStart(3, '0')}</Cell>
            </Column>

            <ColumnGroup>
              <Header>Hello</Header>
              <Column accessor="name.first" id="name.first" togglerLabel="First names">
                <Footer>firstName</Footer>
              </Column>
              <Column accessor="name.last" id="name.last" togglerLabel="Last names">
                <Header>Last name</Header>
                <Footer>lastName</Footer>
              </Column>
            </ColumnGroup>

            <ColumnGroup>
              <Header>Info</Header>
              <Footer>info</Footer>

              <Column accessor="age" id="age" togglerLabel="Ages">
                <Header>Age</Header>
                <Footer>age</Footer>
              </Column>

              <ColumnGroup>
                <Header>More info</Header>
                <Column accessor="visits" id="visits" togglerLabel="Visits">
                  <Header>Visits</Header>
                  <Footer>visits</Footer>
                </Column>
                <Column accessor="status" id="status" togglerLabel="Statuses" summary={1000}>
                  <Header>Status</Header>
                  <Footer>status</Footer>
                </Column>
                <Column
                  accessor="progress"
                  id="progress"
                  width={50}
                  sortable={false}
                  togglerLabel="Progresses"
                  summary={1000}
                >
                  <Header>Progress</Header>
                  <Footer>progress</Footer>
                </Column>
              </ColumnGroup>
            </ColumnGroup>
          </>
        )}
      </Table>
    </>
  )
}
