'use client';

import { Button } from '@/components/ui/button';
import type { Table } from '@tanstack/react-table';
import { RefreshCcw } from 'lucide-react';

/**
 * 削除オプションコンポーネントProps
 */
interface RefreshOption<TData> {
  table: Table<TData>;
}

/**
 * リフレッシュオプションコンポーネント
 * @summary テーブルのデータを再取得する能を提供する。
 * @param param0
 * @returns
 */
export function RefreshOption<TData>({ table }: RefreshOption<TData>) {
  return (
    table.getFilteredSelectedRowModel().rows.length === 0 && (
      <Button variant="ghost" size="sm">
        <RefreshCcw className="h-4 w-4 mr-2" />
        Refresh
      </Button>
    )
  );
}
