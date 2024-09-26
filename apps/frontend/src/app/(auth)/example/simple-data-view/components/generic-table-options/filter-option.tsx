'use client';

import { Input } from '@/components/ui//input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { MixerHorizontalIcon } from '@radix-ui/react-icons';
import type { Table } from '@tanstack/react-table';

/**
 *  フィルターオプションコンポーネントProps
 */
interface FilterOptionProps<TData> {
  table: Table<TData>;
}

/**
 * フィルターオプションコンポーネント
 * @summary 各列のフィルター機能を提供する。
 * @param param0
 * @returns
 */
export function FilterOption<TData>({ table }: FilterOptionProps<TData>) {
  return (
    <>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" size="sm">
            <MixerHorizontalIcon className="mr-2 h-4 w-4" />
            <span className="hidden md:inline-block">表示</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto">
          <div className="grid gap-2">
            {table
              .getAllColumns()
              .filter((column) => typeof column.accessorFn !== 'undefined' && column.getCanHide())
              .map((column) => {
                console.log(column);
                return (
                  <div key={column.id} className="capitalize grid grid-cols-3 items-center gap-4">
                    <Label htmlFor={column.id}>{column.id}</Label>
                    <Input
                      id={column.id}
                      value={(table.getColumn(column.id)?.getFilterValue() as string) ?? ''}
                      onChange={(event) => table.getColumn(column.id)?.setFilterValue(event.target.value)}
                      className="h-7 col-span-2"
                    />
                  </div>
                );
              })}
          </div>
        </PopoverContent>
      </Popover>
    </>
  );
}
