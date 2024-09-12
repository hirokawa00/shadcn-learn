'use client';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { cn } from '@/lib/utils';
import { ArrowDownIcon, ArrowUpIcon, CaretSortIcon, DrawingPinIcon } from '@radix-ui/react-icons';
import type {
  Column,
  ColumnDef,
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
import { DataTablePagination } from './data-table-pagination';
import { DataTableToolbar, type filterData } from './data-table-toolbar';

export { DataTableFacetedFilter } from './data-table-faceted-filter';

interface GenericTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  filters?: filterData[];
  pageSize?: number;
}

export function GenericTable<TData, TValue>({
  columns,
  data,
  filters,
  pageSize = 50,
}: GenericTableProps<TData, TValue>) {
  const [rowSelection, setRowSelection] = React.useState({});
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = React.useState<SortingState>([]);
  //
  const [rowHeight, setRowHeight] = React.useState<'default' | 'compact' | 'large'>('default');

  // カラムの固定状態を管理するState
  const [columnPinning, setColumnPinning] = React.useState<ColumnPinningState>({ left: ['select', 'id'], right: [] });
  // デフォルトのページネーション設定
  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0, // デフォルトのページ番号
    pageSize: pageSize, // デフォルトのページサイズ
  });

  const table = useReactTable({
    data,
    columns,
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

  return (
    <div className="w-full max-w-full px-2">
      {/* ヘッダーとツールバーのラッパー */}
      <div className="sticky top-[56px] z-10 bg-primary-foreground">
        <DataTableToolbar table={table} filters={filters} rowHeight={rowHeight} onRowHeightChange={setRowHeight} />
      </div>

      {/* テーブルヘッダーをstickyに設定しつつスクロール領域の外側に配置 */}
      <Table>
        <TableHeader className="sticky z-10 top-[91px] bg-primary-foreground">
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
                      rowHeight === 'compact' ? 'py-2' : rowHeight === 'default' ? 'py-3 text-base' : 'py-4 text-lg'
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
                      rowHeight === 'compact' ? 'py-2' : rowHeight === 'default' ? 'py-3 text-base' : 'py-4 text-lg'
                    }
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <DataTablePagination table={table} />
    </div>
  );
}

interface GenericTableColumnHeaderProps<TData, TValue> extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>;
  title: string;
}

export function GenericTableColumnHeader<TData, TValue>({
  column,
  title,
  className,
}: GenericTableColumnHeaderProps<TData, TValue>) {
  if (!column.getCanSort()) {
    return <div className={cn(className)}>{title}</div>;
  }

  return (
    <div className={cn('flex items-center space-x-2', className)}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm" className="-ml-3 h-8 data-[state=open]:bg-accent">
            <span>{title}</span>
            {column.getIsSorted() === 'desc' ? (
              <ArrowDownIcon className="ml-2 h-4 w-4" />
            ) : column.getIsSorted() === 'asc' ? (
              <ArrowUpIcon className="ml-2 h-4 w-4" />
            ) : column.getIsPinned() ? (
              <DrawingPinIcon className="ml-2 h-4 w-4" />
            ) : (
              <CaretSortIcon className="ml-2 h-4 w-4" />
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuItem onClick={() => column.toggleSorting(false)}>
            <ArrowUpIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
            昇順
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => column.toggleSorting(true)}>
            <ArrowDownIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
            降順
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => column.toggleSorting(true)}>
            <DrawingPinIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
            ピン
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
