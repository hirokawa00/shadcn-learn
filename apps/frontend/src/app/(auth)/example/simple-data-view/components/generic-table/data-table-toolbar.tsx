'use client';

import { Input } from '@/components/ui//input';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Cross2Icon, UploadIcon } from '@radix-ui/react-icons';
import type { Table } from '@tanstack/react-table';
import type * as React from 'react';
import { DataTableFacetedFilter, type FilterOptions } from './data-table-faceted-filter';

export interface filterData {
  columnName: string;
  title: string;
  options: FilterOptions[];
}

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  filters?: filterData[];
  startOptions?: React.ReactNode;
  endOptions?: React.ReactNode;
}

export function DataTableToolbar<TData>({ table, filters, startOptions, endOptions }: DataTableToolbarProps<TData>) {
  console.log(endOptions);
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex items-center justify-between py-2">
      <div className="flex flex-1 items-center space-x-3">
        {table.getFilteredSelectedRowModel().rows.length === 0 && (
          <>
            <Input
              placeholder="Filter tasks..."
              value={(table.getColumn('id')?.getFilterValue() as string) ?? ''}
              onChange={(event) => table.getColumn('id')?.setFilterValue(event.target.value)}
              className="h-8 w-[150px] lg:w-[250px]"
            />
            {filters?.map(
              (filter, index) =>
                table.getColumn(filter.columnName) && (
                  <DataTableFacetedFilter
                    key={index}
                    column={table.getColumn(filter.columnName)}
                    title={filter.title}
                    options={filter.options}
                  />
                ),
            )}
            <Separator orientation="vertical" className="h-5 border-x-2 border-gray-400" />
            <Button variant="outline" className="h-7 bg-green-700 ">
              <UploadIcon className="mr-2 h-4 w-4" />
              Import
            </Button>
          </>
        )}

        {isFiltered && (
          <Button variant="ghost" onClick={() => table.resetColumnFilters()} className="h-8 px-2 lg:px-3">
            Reset
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}

        {startOptions && <div className="space-x-1 flex items-center justify-between"> {startOptions}</div>}
      </div>
      {endOptions && <div className="space-x-1 mr-6">{endOptions}</div>}
    </div>
  );
}
