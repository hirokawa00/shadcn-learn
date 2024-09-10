import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function page() {
  return (
    <div className="flex h-screen justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-semibold mb-6 text-center">Login</h1>
        <form>
          {/* ユーザー名入力フィールド */}
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              id="username"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          {/* パスワード入力フィールド */}
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          {/* ログインボタン */}
          <div className="flex justify-between items-center">
            <Button className="w-full" type="submit">
              Login
            </Button>
          </div>
        </form>

        {/* ルートページへのリンク */}
        <div className="mt-6 text-center">
          <Link href="/" passHref>
            <Button variant="link">Back to Home</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
