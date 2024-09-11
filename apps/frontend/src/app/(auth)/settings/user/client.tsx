'use client';

import { ContentLayout } from '@/components/admin-panel/content-layout';
import { GenericTable, GenericTableColumnHeader } from '@/components/generic-table';
import { Checkbox } from '@/components/ui/checkbox';
import type { User } from '@prisma/client';
import { ArrowDownIcon, ArrowRightIcon, ArrowUpIcon } from '@radix-ui/react-icons';
import type { ColumnDef } from '@tanstack/react-table';

interface ClientProps {
  user: User[];
}

export function Client({ user }: ClientProps) {
  // カラムの型定義
  const columns: ColumnDef<User>[] = [
    {
      id: 'select',
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected()} // ページ内すべての行が選択されているか確認
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)} // ページ内の全行を選択/解除
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()} // 行が選択されているか確認
          onCheckedChange={(value) => row.toggleSelected(!!value)} // 行を選択/解除
          aria-label={`Select row ${row.index + 1}`} // アクセシビリティ用のラベル
        />
      ),
      enableHiding: false, // チェックボックスのカラムが隠れないように
      enableSorting: false, // ソートを無効化
      size: 50, // カラムの幅を指定
    },
    {
      accessorKey: 'id',
      cell: (info) => info.getValue(),
      header: ({ column }) => <GenericTableColumnHeader column={column} title="ID" />,
      enableHiding: false,
    },
    {
      accessorKey: 'name',
      header: ({ column }) => <GenericTableColumnHeader column={column} title="氏名" />,
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: 'email',
      header: 'メールアドレス',
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: 'role',
      header: '役割',
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: 'store',
      header: '所属店舗',
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: 'lastLogin',
      header: '最終ログイン日時',
      cell: (info) => {
        const dateValue = info.getValue() as string | null;
        if (!dateValue) return '';

        // 日付フォーマットの指定（日本時間、YYYY-MM-DD HH:mm:ss）
        const formattedDate = new Intl.DateTimeFormat('ja-JP', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          timeZone: 'Asia/Tokyo', // 日本時間に変換
          hour12: false, // 24時間形式
        }).format(new Date(dateValue));

        return formattedDate;
      },
    },
  ];

  const priorities = [
    {
      label: 'Low',
      value: 'low',
      icon: ArrowDownIcon,
    },
    {
      label: 'Medium',
      value: 'medium',
      icon: ArrowRightIcon,
    },
    {
      label: 'High',
      value: 'high',
      icon: ArrowUpIcon,
    },
  ];

  return (
    <ContentLayout title="ユーザー管理">
      <GenericTable
        data={user}
        columns={columns}
        filters={[
          { columnName: 'store', title: '所属店舗', options: priorities },
          { columnName: 'store', title: '所属店舗', options: priorities },
        ]}
      />
    </ContentLayout>
  );
}
