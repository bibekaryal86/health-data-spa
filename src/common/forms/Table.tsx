import React, { useCallback, useMemo, useState } from 'react'
import styled, { css } from 'styled-components'
import { CSVLink } from 'react-csv'
import { getCsvReport, getHeaderTitle, getSortData, getSortedData } from '../utils/table'
import { TABLE_DISPLAY_ONLY_SEPARATOR, TABLE_EXPORT_ONLY_SEPARATOR, TABLE_SORTED_NONE_CODE } from '../../constants'
import { DisplayCardWrapperRow, DisplayCardWrapperBody } from '../../styles'

const TableMaxWidthWrapper = styled.div.attrs({
  className: 'table-max-width-wrapper',
})`
  max-width: 100vw;
`

const TableScrollWrapper = styled.div.attrs({
  className: 'table-scroll-wrapper',
})`
  overflow-x: auto;
  overflow-y: auto;
  max-height: 500px;
`

const TableWrapper = styled.table.attrs({ className: 'table-wrapper' })`
  width: 100%;
  border-spacing: 0px;
`

const TableHeader = styled.thead`
  th {
    border-bottom: 2px solid #9e9e9e;
    position: sticky;
    top: 0;
    background-color: lightgrey;
  }
`

const TableFooter = styled.tfoot`
  td {
    border-top: 2px solid #9e9e9e;
    border-bottom: none;
    position: sticky;
    bottom: 0;
    background-color: lightgrey;
  }
`

const TableBody = styled.tbody``

const TableCell = css`
  padding: 5px;
  text-align: left;
  border-bottom: 1px solid #9e9e9e;
`

const TableRow = styled.tr<{
  verticalAlign?: string
}>`
  vertical-align: ${(props) => (props.verticalAlign ? props.verticalAlign : '')};
`

const TableHead = styled.th<{
  isSortAllowed?: boolean
}>`
  ${TableCell}
  &:first-child {
    padding-left: 0;
  }
  &:last-child {
    padding-right: 0;
  }
  cursor: ${(props) => (props.isSortAllowed ? 'pointer' : 'default')};
`

const TableCellData = styled.td`
  ${TableCell}

  &:first-child {
    padding-left: 0;
  }
  &:last-child {
    padding-right: 0;
`

const CSVLinkWrapper = styled.div.attrs({ className: 'csv-link-wrapper' })`
  padding: 7px 0px 3px 0px;
  font-size: 12px;
  a {
    color: brown;
  }
`

export type TableData = Record<string, string | JSX.Element>

export interface TableHeaderData {
  headerTitle: string
  isSortAllowed?: boolean
}

export interface SortData {
  header?: string
  index?: number
  sortDirection?: string
  sortKey: string
  sortedDirection: number
}

interface TableProps {
  title: string
  headers: TableHeaderData[]
  data: TableData[]
  footer?: string | TableData[]
  onHeaderClick?: (item: string) => void
  onRowClick?: (item: TableData) => void
  verticalAlign?: string
  isExportToCsv?: boolean
  exportToCsvFileName?: string
}

const Table = (props: TableProps): React.ReactElement | null => {
  const [sortData, setSortData] = useState<SortData>({
    sortKey: '',
    sortedDirection: TABLE_SORTED_NONE_CODE,
  })

  const sortTableData = useCallback(
    (header: string, index: number) => {
      const updatedSortData = getSortData(sortData, header, index, props.data?.[0])
      setSortData(updatedSortData)
    },
    [props.data, sortData],
  )

  const tableData = useMemo(() => {
    return getSortedData(sortData, props.data)
  }, [props.data, sortData])

  return (
    <DisplayCardWrapperBody>
      <DisplayCardWrapperRow fontWeight="bold">{props.title}</DisplayCardWrapperRow>
      <DisplayCardWrapperRow>
        <TableMaxWidthWrapper>
          <TableScrollWrapper>
            <TableWrapper>
              <TableHeader>
                <TableRow>
                  {props.headers.map((header, key) => {
                    return (
                      !header.headerTitle.includes(TABLE_EXPORT_ONLY_SEPARATOR) && (
                        <TableHead
                          key={key}
                          onClick={() => {
                            props.onHeaderClick && props.onHeaderClick(header.headerTitle)
                            header.isSortAllowed && sortTableData(header.headerTitle, key)
                          }}
                          isSortAllowed={header.isSortAllowed}
                        >
                          {getHeaderTitle(header.headerTitle, TABLE_DISPLAY_ONLY_SEPARATOR)}
                          {header.headerTitle === sortData.header && String.fromCharCode(sortData.sortedDirection)}
                        </TableHead>
                      )
                    )
                  })}
                </TableRow>
              </TableHeader>
              <TableBody>
                {tableData.length === 0 ? (
                  <TableRow>
                    <TableCellData colSpan={100} />
                  </TableRow>
                ) : (
                  tableData.map((item: TableData, index: number) => (
                    <TableRow
                      verticalAlign={props.verticalAlign}
                      key={index}
                      onClick={() => props.onRowClick && props.onRowClick(item)}
                    >
                      {(Object.keys(tableData[0]) as Array<keyof TableData>).map((key) => {
                        return (
                          !key.toString().includes(TABLE_EXPORT_ONLY_SEPARATOR) && (
                            <TableCellData key={key.toString()}>{item[key]}</TableCellData>
                          )
                        )
                      })}
                    </TableRow>
                  ))
                )}
              </TableBody>
              {props.footer &&
                (typeof props.footer === 'string' ? (
                  <TableFooter>
                    <TableRow>
                      <TableCellData colSpan={100}>{props.footer}</TableCellData>
                    </TableRow>
                  </TableFooter>
                ) : (
                  <TableFooter>
                    {props.footer.map((item: TableData, index: number) => (
                      <TableRow key={index} onClick={() => props.onRowClick && props.onRowClick(item)}>
                        {(Object.keys(tableData[0]) as Array<keyof TableData>).map((key) => (
                          <TableCellData key={key.toString()}>{item[key]}</TableCellData>
                        ))}
                      </TableRow>
                    ))}
                  </TableFooter>
                ))}
            </TableWrapper>
          </TableScrollWrapper>
          {props.isExportToCsv && tableData?.length && props.headers?.length && (
            <CSVLinkWrapper>
              <CSVLink {...getCsvReport(props.headers, tableData, props.exportToCsvFileName)}>Export to CSV</CSVLink>
            </CSVLinkWrapper>
          )}
        </TableMaxWidthWrapper>
      </DisplayCardWrapperRow>
    </DisplayCardWrapperBody>
  )
}

export default Table
