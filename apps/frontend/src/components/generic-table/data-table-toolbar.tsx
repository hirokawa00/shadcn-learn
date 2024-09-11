'use client';

import { Input } from '@/components/ui//input';
import { Button } from '@/components/ui/button';
import { Cross2Icon } from '@radix-ui/react-icons';
import type { Table } from '@tanstack/react-table';
// import { priorities, statuses } from '../data/data';
import { DataTableFacetedFilter, type FilterOptions } from './data-table-faceted-filter';
import { DataTableViewOptions } from './data-table-view-options';

export interface filterData {
  columnName: string;
  title: string;
  options: FilterOptions[];
}

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  filters?: filterData[];
}

export function DataTableToolbar<TData>({ table, filters }: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Filter tasks..."
          value={(table.getColumn('title')?.getFilterValue() as string) ?? ''}
          onChange={(event) => table.getColumn('title')?.setFilterValue(event.target.value)}
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {filters?.map(
          (filter) =>
            table.getColumn(filter.columnName) && (
              <DataTableFacetedFilter
                column={table.getColumn(filter.columnName)}
                title={filter.title}
                options={filter.options}
              />
            ),
        )}
        {isFiltered && (
          <Button variant="ghost" onClick={() => table.resetColumnFilters()} className="h-8 px-2 lg:px-3">
            Reset
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  );
}
