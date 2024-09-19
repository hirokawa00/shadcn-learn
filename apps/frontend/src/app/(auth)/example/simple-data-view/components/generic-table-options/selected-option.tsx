'use client';

import { Button } from '@/components/ui/button';
import { Cross2Icon } from '@radix-ui/react-icons';
import type { Table } from '@tanstack/react-table';

/**
 *  選択オプションコンポーネントProps
 */
interface SelectedOptionProps<TData> {
  table: Table<TData>;
}

/**
 * 選択オプションコンポーネント
 * @summary テーブルの選択に関する機能を提供する。
 * @param param0
 * @returns
 */
export function SelectedOption<TData>({ table }: SelectedOptionProps<TData>) {
  return (
    table.getFilteredSelectedRowModel().rows.length >= 1 && (
      <>
        <Button variant="ghost" size="sm" onClick={() => table.resetRowSelection()}>
          <Cross2Icon className="h-4 w-4 mr-2" />
          <span>{table.getFilteredSelectedRowModel().rows.length}件</span>
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="text-green-300"
          onClick={() => table.toggleAllRowsSelected()}
          disabled={table.getIsAllRowsSelected()}
        >
          <span>{table.getIsAllRowsSelected() ? '選択済み' : '全件選択'}</span>
        </Button>
      </>
    )
  );
}
