'use client';

import { ContentLayout } from '@/components/admin-panel/content-layout';
import { GenericTable, GenericTableColumnHeader } from '@/components/generic-table';
import { ArrowDownIcon, ArrowRightIcon, ArrowUpIcon } from '@radix-ui/react-icons';
import type { ColumnDef } from '@tanstack/react-table';

type UserType = {
  id: number; // ユーザーのID
  name: string; // 名前
  email: string; // メールアドレス
  role: string; // 役割
  store: string; // 所属店舗
  status: string; // ステータス
};

// ダミーデータ
const data = [
  { id: 1, name: '山田 太郎', email: 'taro.yamada@example.com', role: 'スタッフ', store: '東京本店', status: '有効' },
  {
    id: 2,
    name: '佐藤 花子',
    email: 'hanako.sato@example.com',
    role: 'マネージャー',
    store: '大阪支店',
    status: '有効',
  },
  { id: 3, name: '鈴木 一郎', email: 'ichiro.suzuki@example.com', role: '本部', store: '本社', status: '無効' },
  { id: 4, name: '山田 太郎', email: 'taro.yamada@example.com', role: 'スタッフ', store: '東京本店', status: '有効' },
  {
    id: 5,
    name: '佐藤 花子',
    email: 'hanako.sato@example.com',
    role: 'マネージャー',
    store: '大阪支店',
    status: '有効',
  },
  { id: 6, name: '鈴木 一郎', email: 'ichiro.suzuki@example.com', role: '本部', store: '本社', status: '無効' },
  { id: 7, name: '山田 太郎', email: 'taro.yamada@example.com', role: 'スタッフ', store: '東京本店', status: '有効' },
  {
    id: 8,
    name: '佐藤 花子',
    email: 'hanako.sato@example.com',
    role: 'マネージャー',
    store: '大阪支店',
    status: '有効',
  },
  { id: 9, name: '鈴木 一郎', email: 'ichiro.suzuki@example.com', role: '本部', store: '本社', status: '無効' },
  { id: 10, name: '山田 太郎', email: 'taro.yamada@example.com', role: 'スタッフ', store: '東京本店', status: '有効' },
  {
    id: 11,
    name: '佐藤 花子',
    email: 'hanako.sato@example.com',
    role: 'マネージャー',
    store: '大阪支店',
    status: '有効',
  },
  { id: 12, name: '鈴木 一郎', email: 'ichiro.suzuki@example.com', role: '本部', store: '本社', status: '無効' },
  { id: 13, name: '山田 太郎', email: 'taro.yamada@example.com', role: 'スタッフ', store: '東京本店', status: '有効' },
  {
    id: 14,
    name: '佐藤 花子',
    email: 'hanako.sato@example.com',
    role: 'マネージャー',
    store: '大阪支店',
    status: '有効',
  },
  { id: 15, name: '鈴木 一郎', email: 'ichiro.suzuki@example.com', role: '本部', store: '本社', status: '無効' },
  {
    id: 11,
    name: '佐藤 花子',
    email: 'hanako.sato@example.com',
    role: 'マネージャー',
    store: '大阪支店',
    status: '有効',
  },
  { id: 12, name: '鈴木 一郎', email: 'ichiro.suzuki@example.com', role: '本部', store: '本社', status: '無効' },
  { id: 13, name: '山田 太郎', email: 'taro.yamada@example.com', role: 'スタッフ', store: '東京本店', status: '有効' },
  {
    id: 14,
    name: '佐藤 花子',
    email: 'hanako.sato@example.com',
    role: 'マネージャー',
    store: '大阪支店',
    status: '有効',
  },
  { id: 15, name: '鈴木 一郎', email: 'ichiro.suzuki@example.com', role: '本部', store: '本社', status: '無効' },
  {
    id: 11,
    name: '佐藤 花子',
    email: 'hanako.sato@example.com',
    role: 'マネージャー',
    store: '大阪支店',
    status: '有効',
  },
  { id: 12, name: '鈴木 一郎', email: 'ichiro.suzuki@example.com', role: '本部', store: '本社', status: '無効' },
  { id: 13, name: '山田 太郎', email: 'taro.yamada@example.com', role: 'スタッフ', store: '東京本店', status: '有効' },
  {
    id: 14,
    name: '佐藤 花子',
    email: 'hanako.sato@example.com',
    role: 'マネージャー',
    store: '大阪支店',
    status: '有効',
  },
  { id: 15, name: '鈴木 一郎', email: 'ichiro.suzuki@example.com', role: '本部', store: '本社', status: '無効' },
  { id: 13, name: '山田 太郎', email: 'taro.yamada@example.com', role: 'スタッフ', store: '東京本店', status: '有効' },
  {
    id: 14,
    name: '佐藤 花子',
    email: 'hanako.sato@example.com',
    role: 'マネージャー',
    store: '大阪支店',
    status: '有効',
  },
  { id: 15, name: '鈴木 一郎', email: 'ichiro.suzuki@example.com', role: '本部', store: '本社', status: '無効' },
  { id: 13, name: '山田 太郎', email: 'taro.yamada@example.com', role: 'スタッフ', store: '東京本店', status: '有効' },
  {
    id: 14,
    name: '佐藤 花子',
    email: 'hanako.sato@example.com',
    role: 'マネージャー',
    store: '大阪支店',
    status: '有効',
  },
  { id: 15, name: '鈴木 一郎', email: 'ichiro.suzuki@example.com', role: '本部', store: '本社', status: '無効' },
  { id: 13, name: '山田 太郎', email: 'taro.yamada@example.com', role: 'スタッフ', store: '東京本店', status: '有効' },
  {
    id: 14,
    name: '佐藤 花子',
    email: 'hanako.sato@example.com',
    role: 'マネージャー',
    store: '大阪支店',
    status: '有効',
  },
  { id: 15, name: '鈴木 一郎', email: 'ichiro.suzuki@example.com', role: '本部', store: '本社', status: '無効' },
  { id: 13, name: '山田 太郎', email: 'taro.yamada@example.com', role: 'スタッフ', store: '東京本店', status: '有効' },
  {
    id: 14,
    name: '佐藤 花子',
    email: 'hanako.sato@example.com',
    role: 'マネージャー',
    store: '大阪支店',
    status: '有効',
  },
  { id: 15, name: '鈴木 一郎', email: 'ichiro.suzuki@example.com', role: '本部', store: '本社', status: '無効' },
  // 他のユーザーデータ...
];

export function Client() {
  // カラムの型定義
  const columns: ColumnDef<UserType>[] = [
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
      accessorKey: 'status',
      header: 'ステータス',
      cell: (info) => info.getValue(),
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
        data={data}
        columns={columns}
        filters={[
          { columnName: 'store', title: '所属店舗', options: priorities },
          { columnName: 'store', title: '所属店舗', options: priorities },
        ]}
      />
    </ContentLayout>
  );
}
