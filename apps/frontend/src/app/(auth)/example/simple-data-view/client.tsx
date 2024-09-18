'use client';

import { ContentLayout } from '@/components/admin-panel/content-layout';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import type { User } from '@prisma/client';
import type {
  ColumnFiltersState,
  ColumnPinningState,
  PaginationState,
  SortingState,
  VisibilityState,
} from '@tanstack/react-table';
import {
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import * as React from 'react';
import { DataTablePagination, DataTableToolbar, columns } from './components/generic-table';

interface ClientProps {
  user: User[];
}

export function Client({ user }: ClientProps) {
  const [rowSelection, setRowSelection] = React.useState({});
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = React.useState<SortingState>([]);
  //
  const [rowHeight, setRowHeight] = React.useState<'default' | 'compact' | 'large'>('compact');

  // カラムの固定状態を管理するState
  const [columnPinning, setColumnPinning] = React.useState<ColumnPinningState>({ left: ['select', 'id'], right: [] });
  // デフォルトのページネーション設定
  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0, // デフォルトのページ番号
    pageSize: 100, // デフォルトのページサイズ
  });

  const table = useReactTable({
    data: user,
    columns: columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
      pagination: pagination,
      columnPinning: columnPinning,
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  const priorities = [
    {
      label: 'User',
      value: 'User',
    },
    {
      label: 'Manager',
      value: 'Manager',
    },
    {
      label: 'Admin',
      value: 'Admin',
    },
  ];

  return (
    <ContentLayout title="ユーザー管理">
      <div className="flex flex-col h-full">
        {/* ヘッダーとツールバーのラッパー */}
        <div className="bg-primary-foreground">
          <DataTableToolbar
            table={table}
            filters={[{ columnName: 'role', title: '役職', options: priorities }]}
            rowHeight={rowHeight}
            onRowHeightChange={setRowHeight}
          />
        </div>
        <div className="flex-1 overflow-y-auto">
          {/* テーブルヘッダーをstickyに設定しつつスクロール領域の外側に配置 */}
          <Table>
            <TableHeader className="sticky z-10 top-0 bg-primary-foreground">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id} colSpan={header.colSpan}>
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>

            {/* データ部分のスクロール可能領域 */}

            <TableBody className="dark:text-gray-300">
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && 'selected'}
                    // className="even:dark:bg-slate-950 even:bg-gray-100"
                  >
                    {/* 左側に固定されたカラムを表示 */}
                    {row.getLeftVisibleCells().map((cell) => (
                      <TableCell
                        key={cell.id}
                        className={
                          rowHeight === 'compact' ? 'py-1' : rowHeight === 'default' ? 'py-1 text-base' : 'py-2 text-lg'
                        }
                      >
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}

                    {/* 通常のカラムを表示 */}
                    {row.getCenterVisibleCells().map((cell) => (
                      <TableCell
                        key={cell.id}
                        className={
                          rowHeight === 'compact' ? 'py-1' : rowHeight === 'default' ? 'py-1 text-base' : 'py-2 text-lg'
                        }
                      >
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-full text-center">
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <DataTablePagination table={table} />
      </div>
    </ContentLayout>
  );
}
