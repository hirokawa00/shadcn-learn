'use client';

import { Input } from '@/components/ui//input';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
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
import { Separator } from '@/components/ui/separator';
import {
  ClipboardCopyIcon,
  Cross2Icon,
  DotsHorizontalIcon,
  DownloadIcon,
  MixerHorizontalIcon,
  TextAlignMiddleIcon,
  UploadIcon,
} from '@radix-ui/react-icons';
import type { Table } from '@tanstack/react-table';
import { saveAs } from 'file-saver';
import { CircleCheckIcon, PencilIcon } from 'lucide-react';
import { toast } from 'sonner';
import * as XLSX from 'xlsx';
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

  // 選択されたデータをCSV形式に変換
  const downloadSelectedRowsAsCSV = () => {
    const selectedRows = table.getSelectedRowModel().rows.map((row) => row.original);
    if (selectedRows.length === 0) {
      alert('データが選択されていません');
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

  // 選択されたデータをTAB区切りに変換してクリップボードにコピー
  const copySelectedRowsToClipboard = async () => {
    const selectedRows = table.getSelectedRowModel().rows.map((row) => row.original);
    if (selectedRows.length === 0) {
      alert('データが選択されていません');
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
        style: { color: 'bg-green-500' },
      });
    } catch (err) {
      toast('クリップボードにコピーできませんでした。', {
        icon: <CircleCheckIcon className="w-4 h-4" />,
        style: { color: '#fff' },
      });
    }
  };

  // 選択されたデータを.xlsx形式でダウンロードする関数
  const downloadSelectedRowsAsExcel = () => {
    const selectedRows = table.getSelectedRowModel().rows.map((row) => row.original);

    if (selectedRows.length === 0) {
      alert('データが選択されていません');
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
    <div className="flex items-center justify-between pt-1">
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
        {table.getFilteredSelectedRowModel().rows.length >= 1 && (
          <>
            <Button variant="outline" onClick={() => table.resetRowSelection()} className="h-8 lg:px-3 mr-4">
              <Cross2Icon className="h-4 w-4 mr-2" />
              <span>{table.getFilteredSelectedRowModel().rows.length} row selected</span>
            </Button>
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

            <Button variant="outline" onClick={() => table.resetRowSelection()} className="h-7 bg-blue-700">
              <PencilIcon className="h-4 w-4 mr-2" />
              Edit
            </Button>
          </>
        )}

        {isFiltered && (
          <Button variant="ghost" onClick={() => table.resetColumnFilters()} className="h-8 px-2 lg:px-3">
            Reset
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>

      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>
            <TextAlignMiddleIcon className="mr-2 h-4 w-4" />
            <span className="hidden md:inline-block">サイズ</span>
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
            <span className="hidden md:inline-block">表示</span>
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
