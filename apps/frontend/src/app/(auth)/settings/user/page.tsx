'use client';

import { ContentLayout } from '@/components/admin-panel/content-layout';
import { GenericTable } from '@/components/generic-table';
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
  // 他のユーザーデータ...
];

export default function page() {
  // カラムの型定義
  const columns: ColumnDef<UserType>[] = [
    {
      accessorKey: 'id',
      header: 'ID',
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: 'name',
      header: '名前',
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

  return (
    <ContentLayout title="ユーザー管理">
      <GenericTable data={data} columns={columns} />
      {/*
      <Table className="">
        <TableHeader className=" sticky top-[60px] z-10 dark:bg-primary-foreground">
          <TableRow>
            <TableHead onClick={() => handleSort('name')} className="cursor-pointer">
              名前{' '}
              {sortColumn === 'name' &&
                (sortDirection === 'asc' ? <ChevronUp className="inline" /> : <ChevronDown className="inline" />)}
            </TableHead>
            <TableHead onClick={() => handleSort('email')} className="cursor-pointer">
              メールアドレス{' '}
              {sortColumn === 'email' &&
                (sortDirection === 'asc' ? <ChevronUp className="inline" /> : <ChevronDown className="inline" />)}
            </TableHead>
            <TableHead onClick={() => handleSort('role')} className="cursor-pointer">
              役割{' '}
              {sortColumn === 'role' &&
                (sortDirection === 'asc' ? <ChevronUp className="inline" /> : <ChevronDown className="inline" />)}
            </TableHead>
            <TableHead onClick={() => handleSort('store')} className="cursor-pointer">
              所属店舗{' '}
              {sortColumn === 'store' &&
                (sortDirection === 'asc' ? <ChevronUp className="inline" /> : <ChevronDown className="inline" />)}
            </TableHead>
            <TableHead onClick={() => handleSort('status')} className="cursor-pointer">
              ステータス{' '}
              {sortColumn === 'status' &&
                (sortDirection === 'asc' ? <ChevronUp className="inline" /> : <ChevronDown className="inline" />)}
            </TableHead>
            <TableHead>操作</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredUsers.map((user) => (
            <TableRow key={user.id}>
              <TableCell className="font-medium">
                <div className="flex items-center">
                  <Avatar className="mr-2">
                    <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${user.name}`} />
                    <AvatarFallback>
                      {user.name
                        .split(' ')
                        .map((n) => n[0])
                        .join('')}
                    </AvatarFallback>
                  </Avatar>
                  {user.name}
                </div>
              </TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>{user.store}</TableCell>
              <TableCell>{user.status}</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost">操作</Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>ユーザー操作</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Pencil className="mr-2 h-4 w-4" /> 編集
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-red-600">
                      <Trash2 className="mr-2 h-4 w-4" /> 削除
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table> */}
      {/* ページネーションコンポーネントをここに追加 */}
    </ContentLayout>
  );
}
