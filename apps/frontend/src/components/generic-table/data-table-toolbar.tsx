'use client';

import { Input } from '@/components/ui//input';
import { Button } from '@/components/ui/button';
import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarItem,
  MenubarLabel,
  MenubarMenu,
  MenubarSeparator,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from '@/components/ui/menubar';
import {
  ClipboardCopyIcon,
  Cross2Icon,
  DotsHorizontalIcon,
  DownloadIcon,
  MixerHorizontalIcon,
  TextAlignMiddleIcon,
} from '@radix-ui/react-icons';
import type { Table } from '@tanstack/react-table';
import { DataTableFacetedFilter, type FilterOptions } from './data-table-faceted-filter';

export interface filterData {
  columnName: string;
  title: string;
  options: FilterOptions[];
}

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  filters?: filterData[];
  rowHeight: 'default' | 'compact' | 'large'; // rowHeight の型を 'default' | 'compact' | 'large' として定義
  onRowHeightChange: (size: 'default' | 'compact' | 'large') => void; // rowHeight の変更イベント
}

export function DataTableToolbar<TData>({
  table,
  filters,
  rowHeight,
  onRowHeightChange,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
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
        {isFiltered && (
          <Button variant="ghost" onClick={() => table.resetColumnFilters()} className="h-8 px-2 lg:px-3">
            Reset
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      {/* <Button variant="outline">Copy</Button>
      <Button variant="outline">Download</Button>
      <DataTableViewOptions table={table} /> */}

      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>
            <TextAlignMiddleIcon className="mr-2 h-4 w-4" />
            サイズ
          </MenubarTrigger>
          <MenubarContent>
            <MenubarLabel>行間調整</MenubarLabel>
            <MenubarSeparator />
            <MenubarCheckboxItem checked={rowHeight === 'compact'} onCheckedChange={() => onRowHeightChange('compact')}>
              小
            </MenubarCheckboxItem>
            <MenubarCheckboxItem checked={rowHeight === 'default'} onCheckedChange={() => onRowHeightChange('default')}>
              中
            </MenubarCheckboxItem>
            <MenubarCheckboxItem checked={rowHeight === 'large'} onCheckedChange={() => onRowHeightChange('large')}>
              大
            </MenubarCheckboxItem>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger>
            <MixerHorizontalIcon className="mr-2 h-4 w-4" />
            View
          </MenubarTrigger>
          <MenubarContent>
            <MenubarLabel>表示項目</MenubarLabel>
            <MenubarSeparator />
            {table
              .getAllColumns()
              .filter((column) => typeof column.accessorFn !== 'undefined' && column.getCanHide())
              .map((column) => {
                return (
                  <MenubarCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) => column.toggleVisibility(!!value)}
                  >
                    {column.id}
                  </MenubarCheckboxItem>
                );
              })}
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger>
            <DotsHorizontalIcon className="mr-2 h-4 w-4" />
          </MenubarTrigger>
          <MenubarContent>
            <MenubarSub>
              <MenubarSubTrigger>
                <DownloadIcon className="mr-2 h-4 w-4" />
                エクポート
              </MenubarSubTrigger>
              <MenubarSubContent>
                <MenubarItem>XSLX</MenubarItem>
                <MenubarItem>CSV</MenubarItem>
              </MenubarSubContent>
            </MenubarSub>
            <MenubarSeparator />
            <MenubarItem>
              <ClipboardCopyIcon className="mr-2 h-4 w-4" />
              クリップボードにコピー
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    </div>
  );
}
