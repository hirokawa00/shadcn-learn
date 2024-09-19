'use client';

import { Button } from '@/components/ui/button';
import type { Table } from '@tanstack/react-table';
import { Trash2Icon } from 'lucide-react';

/**
 * 削除オプションコンポーネントProps
 */
interface DeleteOptionProps<TData> {
  table: Table<TData>;
}

/**
 * 削除オプションコンポーネント
 * @summary テーブルのデータに対する削除機能を提供する。
 * @param param0
 * @returns
 */
export function DeleteOption<TData>({ table }: DeleteOptionProps<TData>) {
  return (
    table.getFilteredSelectedRowModel().rows.length >= 1 && (
      <Button variant="destructive" size="sm" onClick={() => table.resetRowSelection()}>
        <Trash2Icon className="h-4 w-4 mr-2" />
        Delete
      </Button>
    )
  );
}
