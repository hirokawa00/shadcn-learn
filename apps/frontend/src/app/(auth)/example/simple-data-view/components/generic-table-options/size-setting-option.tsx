'use client';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { TextAlignMiddleIcon } from '@radix-ui/react-icons';

/**
 * サイス設定オプションコンポーネントProps
 */
interface SizeSettingOptionProps {
  rowHeight: 'default' | 'compact' | 'large'; // rowHeight の型を 'default' | 'compact' | 'large' として定義
  onRowHeightChange: (size: 'default' | 'compact' | 'large') => void; // rowHeight の変更イベント
}

/**
 * サイス設定オプションコンポーネント
 * @summary テーブルのサイズ調整を行う機能を提供する。
 * @param param0
 * @returns
 */
export function SizeSettingOption({ rowHeight, onRowHeightChange }: SizeSettingOptionProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm">
          <TextAlignMiddleIcon className="mr-2 h-4 w-4" />
          <span className="hidden md:inline-block">サイズ</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>サイズ調整</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem
          checked={rowHeight === 'compact'}
          onCheckedChange={() => onRowHeightChange('compact')}
        >
          小
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={rowHeight === 'default'}
          onCheckedChange={() => onRowHeightChange('default')}
        >
          中
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem checked={rowHeight === 'large'} onCheckedChange={() => onRowHeightChange('large')}>
          大
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
