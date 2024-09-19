'use client';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { DownloadIcon } from '@radix-ui/react-icons';
import type { Table } from '@tanstack/react-table';
import { saveAs } from 'file-saver';
import { CircleCheckIcon, CircleXIcon } from 'lucide-react';
import { toast } from 'sonner';
import * as XLSX from 'xlsx';

/**
 * エクポートオプションコンポーネントProps
 */
interface ExportOptionProps<TData> {
  table: Table<TData>;
}

/**
 * エクポートオプションコンポーネント
 * @summary テーブルのデータの出力に関する機能を提供する。
 * @param param0
 * @returns
 */
export function ExportOption<TData>({ table }: ExportOptionProps<TData>) {
  /**
   * 選択済み行をCSV形式でDownloadするメソッド
   * @returns void
   */
  const downloadSelectedRowsAsCSV = () => {
    const selectedRows = table.getSelectedRowModel().rows.map((row) => row.original);
    if (selectedRows.length === 0) {
      toast('データが選択されていません。', {
        icon: <CircleXIcon className="w-4 h-4" />,
        position: 'top-center',
        style: { background: '#FF0000' },
      });
      return;
    }

    const csvData = [
      Object.keys(selectedRows[0] as Record<string, unknown>).join(','), // ヘッダー行
      ...selectedRows.map((row) => Object.values(row as Record<string, unknown>).join(',')), // 各データ行
    ].join('\n');

    // Blob を使ってファイルをダウンロード
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, 'selected_data.csv');
  };

  /**
   * 選択済み行をTAB区切りでクリップボードにコピーするメソッド
   * @returns void
   */
  const copySelectedRowsToClipboard = async () => {
    const selectedRows = table.getSelectedRowModel().rows.map((row) => row.original);
    if (selectedRows.length === 0) {
      toast('データが選択されていません。', {
        icon: <CircleXIcon className="w-4 h-4" />,
        position: 'top-center',
        style: { background: '#FF0000' },
      });
      return;
    }

    const tabSeparatedData = [
      Object.keys(selectedRows[0] as Record<string, unknown>).join('\t'),
      ...selectedRows.map((row) => Object.values(row as Record<string, unknown>).join('\t')),
    ].join('\n'); // 改行で行を区切る

    // クリップボードにコピー
    try {
      await navigator.clipboard.writeText(tabSeparatedData);
      toast(`${selectedRows.length}件 クリップボードにコピーしました。`, {
        icon: <CircleCheckIcon className="w-4 h-4" />,
        position: 'top-center',
        style: { background: '#808000' },
      });
    } catch (err) {
      toast('クリップボードにコピーできませんでした。', {
        icon: <CircleXIcon className="w-4 h-4" />,
        position: 'top-center',
        style: { background: '#FF0000' },
      });
    }
  };

  /**
   * 選択済み行をExcel形式としてDownloadするメソッド
   * @returns void
   */
  const downloadSelectedRowsAsExcel = () => {
    const selectedRows = table.getSelectedRowModel().rows.map((row) => row.original);
    if (selectedRows.length === 0) {
      toast('データが選択されていません。', {
        icon: <CircleXIcon className="w-4 h-4" />,
        position: 'top-center',
        style: { background: '#FF0000' },
      });
      return;
    }

    // ヘッダーとデータの準備
    const headers = Object.keys(selectedRows[0] as Record<string, unknown>);
    const dataForExcel = selectedRows.map((row) => Object.values(row as Record<string, unknown>));

    // シートデータ作成
    const worksheet = XLSX.utils.aoa_to_sheet([headers, ...dataForExcel]);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'SelectedData');

    // エクセルファイルをバイナリ形式でダウンロード
    XLSX.writeFile(workbook, 'selected_data.xlsx');
  };

  return (
    table.getFilteredSelectedRowModel().rows.length >= 1 && (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="h-7 bg-green-700">
            <DownloadIcon className="mr-2 h-4 w-4" />
            Export
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem className="py-1" onClick={downloadSelectedRowsAsExcel}>
            Export to Excel
          </DropdownMenuItem>
          <DropdownMenuItem className="py-1" onClick={downloadSelectedRowsAsCSV}>
            Export to CSV
          </DropdownMenuItem>
          <DropdownMenuItem className="py-1" onClick={copySelectedRowsToClipboard}>
            Export to Clipbord
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  );
}
