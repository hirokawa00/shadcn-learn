'use client';

import { Button } from '@/components/ui/button';
import type { Table } from '@tanstack/react-table';
import { PencilIcon } from 'lucide-react';

/**
 * 編集オプションコンポーネントProps
 */
interface EditOptionProps<TData> {
  table: Table<TData>;
}

/**
 * 編集オプションコンポーネント
 * @summary テーブルのデータに対する編集機能を提供する。
 * @param param0
 * @returns
 */
export function EditOption<TData>({ table }: EditOptionProps<TData>) {
  return (
    table.getFilteredSelectedRowModel().rows.length >= 1 && (
      <Button variant="outline" onClick={() => table.resetRowSelection()} className="h-7 bg-blue-700">
        <PencilIcon className="h-4 w-4 mr-2" />
        Edit
      </Button>
    )
  );
}
