'use client';

import { ContentLayout } from '@/components/admin-panel/content-layout';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ChevronDown, ChevronUp, Pencil, Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';

// ダミーデータ
const users = [
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
  // 他のユーザーデータ...
];

export default function page() {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortColumn, setSortColumn] = useState('name');
  const [sortDirection, setSortDirection] = useState('asc');

  const handleSort = (column) => {
    if (column === sortColumn) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const sortedUsers = [...users].sort((a, b) => {
    if (a[sortColumn] < b[sortColumn]) return sortDirection === 'asc' ? -1 : 1;
    if (a[sortColumn] > b[sortColumn]) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  const filteredUsers = sortedUsers.filter((user) =>
    Object.values(user).some((value) => value.toString().toLowerCase().includes(searchTerm.toLowerCase())),
  );

  return (
    <ContentLayout title="ユーザー管理">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">ユーザー管理</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> 新規ユーザー登録
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>新規ユーザー登録</DialogTitle>
            </DialogHeader>
            {/* ユーザー登録フォームをここに配置 */}
          </DialogContent>
        </Dialog>
      </div>
      <div className="mb-4">
        <Input placeholder="ユーザーを検索..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
      </div>
      <Table>
        <TableHeader>
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
      </Table>
      {/* ページネーションコンポーネントをここに追加 */}
    </ContentLayout>
  );
}
